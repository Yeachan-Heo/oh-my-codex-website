#!/usr/bin/env node
/**
 * Dependency-free Chromium/CDP verifier for the docs layout.
 * Usage: CHROMIUM_BIN=/path/to/chromium node scripts/verify-docs-layout.mjs --mode=postfix --expected-main=<sha>
 */
import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, realpath, rm, mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { once } from 'node:events';

const mode = process.argv.find(argument => argument.startsWith('--mode='))?.slice(7);
const expectedMain = process.argv.find(argument => argument.startsWith('--expected-main='))?.slice(16);
const expectedHead = process.argv.find(argument => argument.startsWith('--expected-head='))?.slice(16);
if (!['baseline', 'postfix'].includes(mode) || !expectedMain || !expectedHead) {
  throw new Error('Usage: --mode=baseline|postfix --expected-main=<frozen-sha> --expected-head=<tested-sha>');
}
const root = await realpath(process.env.DOCS_ROOT || path.resolve(import.meta.dirname, '..'));
const evidenceRoot = process.env.EVIDENCE_ROOT || await mkdtemp(path.join(os.tmpdir(), 'issue-3200-'));
const keepArtifacts = process.env.KEEP_DOCS_LAYOUT_ARTIFACTS === '1';
await mkdir(evidenceRoot, { recursive: true });
const logs = [];
const failures = [];
const record = (event, detail = {}) => logs.push({ at: new Date().toISOString(), event, ...detail });
const assert = (condition, message) => { if (!condition) failures.push(message); };
const underRoot = candidate => candidate === root || candidate.startsWith(`${root}${path.sep}`);
async function resolveGitRef(ref) {
  const child = spawn('git', ['-C', root, 'rev-parse', ref], { stdio: ['ignore', 'pipe', 'pipe'] });
  const output = [];
  child.stdout.on('data', chunk => output.push(chunk));
  const [code] = await once(child, 'exit');
  if (code !== 0) throw new Error(`Unable to resolve repository ${ref}`);
  return Buffer.concat(output).toString('utf8').trim();
}

async function gitOutput(args) {
  const child = spawn('git', ['-C', root, ...args], { stdio: ['ignore', 'pipe', 'pipe'] });
  const stdout = [];
  const stderr = [];
  child.stdout.on('data', chunk => stdout.push(chunk));
  child.stderr.on('data', chunk => stderr.push(chunk));
  const [code] = await once(child, 'exit');
  if (code !== 0) throw new Error(`git ${args.join(' ')} failed: ${Buffer.concat(stderr).toString('utf8').trim()}`);
  return Buffer.concat(stdout).toString('utf8').trim();
}

async function waitFor(predicate, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  throw new Error(`${label} timeout`);
}

function isSameOrigin(url) {
  return new URL(url).origin === `http://127.0.0.1:${server.address().port}`;
}

async function writeScreenshot(name, base64) {
  const bytes = Buffer.from(base64, 'base64');
  const file = path.join(evidenceRoot, name);
  await writeFile(file, bytes);
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  const sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
  record('screenshot', { name, path: file, sha256, width, height });
}


function mime(file) {
  const extension = path.extname(file).toLowerCase();
  return ({ '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' })[extension] || 'application/octet-stream';
}

async function startServer() {
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405).end(); record('server', { url: url.pathname, status: 405 }); return;
    }
    if (url.pathname === '/favicon.ico') {
      response.writeHead(204).end(); record('server', { url: url.pathname, status: 204, browserDecoration: 'favicon' }); return;
    }
    let decoded;
    try { decoded = decodeURIComponent(url.pathname); } catch { response.writeHead(400).end(); return; }
    if (decoded.includes('\0')) { response.writeHead(400).end(); return; }
    const lexical = path.resolve(root, `.${decoded}`);
    if (!underRoot(lexical)) { response.writeHead(403).end(); record('server', { url: url.pathname, status: 403 }); return; }
    try {
      const file = await realpath(lexical);
      if (!underRoot(file)) throw new Error('symlink escape');
      const body = await readFile(file);
      response.writeHead(200, { 'content-type': mime(file), 'content-length': body.length });
      response.end(request.method === 'HEAD' ? undefined : body);
      record('server', { url: url.pathname, realpath: file, status: 200 });
    } catch {
      response.writeHead(404).end(); record('server', { url: url.pathname, status: 404 });
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return server;
}

class Cdp {
  constructor(child) {
    this.child = child; this.nextId = 1; this.pending = new Map(); this.events = []; this.handlers = new Map(); this.terminalError = null;
    let buffer = Buffer.alloc(0);
    child.stdio[4].on('data', chunk => {
      buffer = Buffer.concat([buffer, chunk]);
      for (;;) {
        const end = buffer.indexOf(0); if (end < 0) break;
        const frame = buffer.subarray(0, end).toString('utf8'); buffer = buffer.subarray(end + 1);
        let message; try { message = JSON.parse(frame); } catch { this.failAll(new Error('Malformed CDP frame')); return; }
        if (message.id) { const pending = this.pending.get(message.id); if (!pending) { this.failAll(new Error(`Unknown CDP response ${message.id}`)); return; } this.pending.delete(message.id); message.error ? pending.reject(new Error(message.error.message)) : pending.resolve(message.result); }
        else if (message.method) {
          this.events.push(message);
          for (const handler of this.handlers.get(message.method) || []) Promise.resolve(handler(message.params, message.sessionId)).catch(error => this.failAll(error));
        }
        else this.failAll(new Error('Malformed CDP message'));
      }
    });
    child.once('exit', (code, signal) => this.failAll(new Error(`Chromium exited (${code ?? signal})`)));
  }
  failAll(error) { this.terminalError ||= error; for (const { reject } of this.pending.values()) reject(error); this.pending.clear(); }
  on(method, handler) {
    const handlers = this.handlers.get(method) || [];
    handlers.push(handler);
    this.handlers.set(method, handlers);
  }
  send(method, params = {}, sessionId) {
    if (this.terminalError) return Promise.reject(this.terminalError);
    const id = this.nextId++; const message = { id, method, params }; if (sessionId) message.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => { this.pending.delete(id); reject(new Error(`CDP command timeout: ${method}`)); }, 5000);
      this.pending.set(id, { resolve: value => { clearTimeout(timeout); resolve(value); }, reject: error => { clearTimeout(timeout); reject(error); } });
      this.child.stdio[3].write(`${JSON.stringify(message)}\0`, error => { if (error) { this.pending.delete(id); clearTimeout(timeout); this.failAll(error); reject(error); } });
    });
  }
}

function evaluate(cdp, sessionId, expression) {
  return cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId).then(result => {
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  });
}

async function runViewport(cdp, sessionId, label, width, height, deviceScaleFactor) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor, mobile: width < 500 }, sessionId);
  const lifecycleStart = cdp.events.length;
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${server.address().port}/docs.html` }, sessionId);
  await evaluate(cdp, sessionId, `new Promise((resolve, reject) => { const timer = setTimeout(() => reject(new Error('page readiness timeout')), 4000); const ready = async () => { if (document.readyState !== 'complete') return; await document.fonts?.ready; clearTimeout(timer); requestAnimationFrame(() => requestAnimationFrame(resolve)); }; if (document.readyState === 'complete') ready(); else addEventListener('load', ready, { once: true }); })`);
  await waitFor(() => {
    const names = new Set(cdp.events.slice(lifecycleStart).filter(event => event.method === 'Page.lifecycleEvent').map(event => event.params.name));
    return names.has('load') && names.has('networkAlmostIdle');
  }, 5000, `${label} lifecycle readiness`);
  const initial = await evaluate(cdp, sessionId, `new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve({
    ids: [...document.querySelectorAll('[id]')].map(node => node.id),
    links: [...document.querySelectorAll('.sidebar-link[href^="#"]')].map(link => link.getAttribute('href')),
    cards: [...document.querySelectorAll('#execution-modes > div > article.mode-card')].length,
    wrappers: ['autopilot', 'ralph', 'ultrawork'].every(id => { const wrapper = document.getElementById(id); return wrapper?.parentElement?.id === 'execution-modes' && wrapper.querySelectorAll(':scope > article.mode-card').length === 1; }),
    teamContained: (() => { const team = document.getElementById('team-compositions'); return team?.parentElement?.id === 'execution-modes' && team.closest('article.mode-card') === null; })(),
    execution: document.querySelector('#execution-modes')?.parentElement?.className,
    contentInMain: document.querySelector('.docs-content')?.parentElement?.matches('main.docs-main') === true,
    sidebar: document.querySelector('#sidebar')?.getBoundingClientRect().toJSON(),
    sidebarPosition: getComputedStyle(document.querySelector('#sidebar')).position,
    main: document.querySelector('.docs-main')?.getBoundingClientRect().toJSON(),
    overflow: document.documentElement.scrollWidth - innerWidth,
    codeBlocks: [...document.querySelectorAll('.code-block-wrapper pre')].map(pre => ({ overflowX: getComputedStyle(pre).overflowX, clientWidth: pre.clientWidth, scrollWidth: pre.scrollWidth })),
    mobile: { expanded: document.querySelector('#mobile-menu-btn')?.getAttribute('aria-expanded'), controls: document.querySelector('#mobile-menu-btn')?.getAttribute('aria-controls') }
  }))))`);
  if (label === 'desktop' && mode === 'baseline') {
    initial.perspectiveExperiment = await evaluate(cdp, sessionId, `new Promise(resolve => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo({ top: 1200, behavior: 'instant' }); requestAnimationFrame(() => requestAnimationFrame(() => { const sidebar = document.querySelector('#sidebar'); const before = sidebar.getBoundingClientRect().toJSON(); const original = document.body.style.perspective; document.body.style.perspective = 'none'; requestAnimationFrame(() => requestAnimationFrame(() => { const after = sidebar.getBoundingClientRect().toJSON(); document.body.style.perspective = original; const result = Math.abs(before.top) > 1 && Math.abs(after.top) <= 1 ? 'causal' : 'not_causal'; resolve({ before, after, result }); })); })); })`);
  }
  const screenshot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
  await writeScreenshot(`${mode}-${label}.png`, screenshot.data);
  if (label === 'desktop') {
    initial.searchAccordion = await evaluate(cdp, sessionId, `(() => {
      const service = window.__docsLayoutSearchService;
      const input = document.querySelector('#search-input');
      const results = document.querySelector('#search-results');
      const overlay = document.querySelector('#search-overlay');
      if (!service) return { service: false, autopilot: [], debugging: [], sentinel: [], sentinelText: '', sentinelElement: false, sentinelImage: false, escapeClosed: false, initialAccordion: {}, openedAccordion: {}, restoredAccordion: {} };
      const query = term => { service.search(term); return [...results.querySelectorAll('a')].map(link => link.getAttribute('href')); };
      const autopilot = query('autopilot');
      const debugging = query('debugging');
      service.rebuildIndexForTest([{ id: 'safe-render-sentinel', title: 'safe-render-probe-<img id="safe-render-sentinel-node" src="x">', text: 'safe-render-token' }]);
      const sentinel = query('safe-render-token');
      const sentinelText = results.textContent;
      const sentinelElement = document.getElementById('safe-render-sentinel-node');
      const sentinelImage = results.querySelector('img');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      const escapeClosed = results.style.display === 'none' && overlay.style.display === 'none';
      service.rebuildIndexForTest([]);
      const button = document.querySelector('.collapsible-toggle');
      const panel = document.getElementById(button?.getAttribute('aria-controls'));
      const initialAccordion = { expanded: button?.getAttribute('aria-expanded'), hidden: panel?.hidden };
      button?.click(); const openedAccordion = { expanded: button?.getAttribute('aria-expanded'), hidden: panel?.hidden };
      button?.click(); const restoredAccordion = { expanded: button?.getAttribute('aria-expanded'), hidden: panel?.hidden };
      return { service: Boolean(service?.rebuildIndexForTest), autopilot, debugging, sentinel, sentinelText, sentinelElement: Boolean(sentinelElement), sentinelImage: Boolean(sentinelImage), escapeClosed, initialAccordion, openedAccordion, restoredAccordion };
    })()`);
    initial.graph = await evaluate(cdp, sessionId, `(() => {
      const ids = [...new Set([...document.querySelectorAll('.sidebar-link[href^="#"]')].map(link => decodeURIComponent(link.hash.slice(1))))];
      const workflowIds = ['wf-full-auto', 'wf-no-brainer', 'wf-fix-debug', 'wf-parallel-issues'];
      const links = id => [...document.querySelectorAll('.sidebar-link')].filter(link => link.hash === '#' + id);
      const records = ids.map(id => ({ id, element: document.getElementById(id) }));
      const geometry = [...records].sort((left, right) => {
        const difference = left.element.getBoundingClientRect().top + scrollY - (right.element.getBoundingClientRect().top + scrollY);
        if (difference) return difference;
        const position = left.element.compareDocumentPosition(right.element);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return left.id.localeCompare(right.id);
      });
      const snapshot = { documentOrder: geometry.every((record, index) => index === 0 || geometry[index - 1].element.getBoundingClientRect().top + scrollY <= record.element.getBoundingClientRect().top + scrollY) };
      for (const id of ids) {
        history.replaceState(null, '', '#' + id);
        dispatchEvent(new HashChangeEvent('hashchange'));
        const selectedLinks = links(id);
        const active = [...document.querySelectorAll('.sidebar-link.active')];
        snapshot[id] = { selected: selectedLinks.length > 0 && selectedLinks.every(link => link.classList.contains('active')), onlySelected: active.length === selectedLinks.length && active.every(link => selectedLinks.includes(link)), activeCount: active.length };
      }
      history.replaceState(null, '', '#advanced-orchestration');
      dispatchEvent(new HashChangeEvent('hashchange'));
      const advancedLinks = links('advanced-orchestration');
      const active = [...document.querySelectorAll('.sidebar-link.active')];
      const advancedElement = document.getElementById('advanced-orchestration');
      const workflowElements = workflowIds.map(id => document.getElementById(id));
      snapshot['advanced-orchestration'].hashSelected = advancedLinks.every(link => link.classList.contains('active')) && active.length === advancedLinks.length;
      snapshot['advanced-orchestration'].workflowInactive = workflowIds.every(id => links(id).every(link => !link.classList.contains('active')));
      snapshot['advanced-orchestration'].afterWorkflows = workflowElements.every(element => advancedElement.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING);
      return snapshot;
    })()`);
    initial.advancedScroll = await evaluate(cdp, sessionId, `new Promise(resolve => { const target = document.getElementById('advanced-orchestration'); document.documentElement.style.scrollBehavior = 'auto'; scrollTo({ top: target.getBoundingClientRect().top + scrollY - 100, behavior: 'instant' }); dispatchEvent(new Event('scroll')); requestAnimationFrame(() => requestAnimationFrame(() => { const active = [...document.querySelectorAll('.sidebar-link.active')]; const selected = [...document.querySelectorAll('.sidebar-link[href="#advanced-orchestration"]')]; const workflows = [...document.querySelectorAll('.sidebar-link[href^="#wf-"]')]; resolve({ targetTop: target.getBoundingClientRect().top, selected: selected.length > 0 && selected.every(link => link.classList.contains('active')), onlySelected: active.length === selected.length && active.every(link => selected.includes(link)), workflowsInactive: workflows.every(link => !link.classList.contains('active')) }); })); })`);

    await evaluate(cdp, sessionId, `new Promise(resolve => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('#execution-modes')?.scrollIntoView({ block: 'start', behavior: 'instant' }); requestAnimationFrame(() => requestAnimationFrame(resolve)); })`);
    initial.executionSidebar = await evaluate(cdp, sessionId, `document.querySelector('#sidebar')?.getBoundingClientRect().toJSON()`);
    const executionScreenshot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
    await writeScreenshot(`${mode}-execution-modes.png`, executionScreenshot.data);
    initial.bottomSidebar = await evaluate(cdp, sessionId, `new Promise(resolve => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }); requestAnimationFrame(() => requestAnimationFrame(() => { const sidebar = document.querySelector('#sidebar'); resolve({ rect: sidebar?.getBoundingClientRect().toJSON(), scrollY, maxScroll: document.documentElement.scrollHeight - innerHeight, position: getComputedStyle(sidebar).position, bodyPerspective: getComputedStyle(document.body).perspective }); })); })`);
    const bottomScreenshot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
    await writeScreenshot(`${mode}-desktop-bottom.png`, bottomScreenshot.data);
  } else {
    initial.mobileInteraction = await evaluate(cdp, sessionId, `new Promise(resolve => { document.documentElement.style.scrollBehavior = 'auto'; const button = document.querySelector('#mobile-menu-btn'); const sidebar = document.querySelector('#sidebar'); const overlay = document.querySelector('#sidebar-overlay'); const main = document.querySelector('.docs-main'); const state = () => ({ expanded: button.getAttribute('aria-expanded'), sidebarOpen: sidebar.classList.contains('open'), overlayActive: overlay.classList.contains('active'), bodyOverflow: document.body.style.overflow, mainInert: main.hasAttribute('inert') }); button.click(); const open = state(); const mainBlocked = document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest('.docs-main') === null; document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); const escapeClosed = state(); button.click(); const link = sidebar.querySelector('.sidebar-link[href="#autopilot"]'); link.click(); requestAnimationFrame(() => requestAnimationFrame(() => { const linkClosed = state(); const hash = location.hash; const targetVisible = document.getElementById('autopilot').getBoundingClientRect().top < innerHeight; button.click(); overlay.click(); const overlayClosed = state(); resolve({ open, mainBlocked, escapeClosed, linkClosed, hash, targetVisible, overlayClosed }); })); })`);
  }
  return initial;
}


let server; let browser; let profile;
try {
  const actualMain = await resolveGitRef('origin/main');
  const actualHead = await resolveGitRef('HEAD');
  if (actualMain !== expectedMain) throw new Error(`--expected-main mismatch: expected ${expectedMain}, origin/main is ${actualMain}`);
  if (actualHead !== expectedHead) throw new Error(`--expected-head mismatch: expected ${expectedHead}, HEAD is ${actualHead}`);
  record('gitIdentity', { actualMain, actualHead });
  const mutableStatus = (await gitOutput(['status', '--porcelain=v1', '--untracked-files=all'])).split('\n').filter(Boolean).filter(line => !line.slice(3).startsWith('.gjc/'));
  const changedPaths = (await gitOutput(['diff', '--name-only', 'origin/main...HEAD'])).split('\n').filter(Boolean);
  const allowedPaths = ['docs.html', 'js/ui/accordion.js', 'js/ui/searchService.js', 'js/ui/sidebarSpy.js', 'scripts/verify-docs-layout.mjs'];
  if (mutableStatus.length) throw new Error(`served tree is dirty: ${mutableStatus.join(', ')}`);
  if (mode === 'baseline' && changedPaths.length) throw new Error(`baseline branch diff is not empty: ${changedPaths.join(', ')}`);
  if (mode === 'postfix' && (changedPaths.length !== allowedPaths.length || changedPaths.some(file => !allowedPaths.includes(file)))) throw new Error(`postfix branch diff violates allowlist: ${changedPaths.join(', ')}`);
  record('treeIdentity', { mutableStatus, changedPaths, allowedPaths: mode === 'postfix' ? allowedPaths : [] });

  server = await startServer();
  profile = await mkdtemp(path.join(os.tmpdir(), 'issue-3200-chromium-'));
  const chromium = process.env.CHROMIUM_BIN;
  if (!chromium) throw new Error('CHROMIUM_BIN is required');
  browser = spawn(chromium, ['--headless=new', '--remote-debugging-pipe', `--user-data-dir=${profile}`, '--disable-background-networking', '--disable-component-update', '--no-first-run'], { stdio: ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'] });
  const cdp = new Cdp(browser);
  const version = await cdp.send('Browser.getVersion'); record('chromium', version);
  const target = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const attached = await cdp.send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const sessionId = attached.sessionId;
  const localOrigin = `http://127.0.0.1:${server.address().port}`;
  cdp.on('Fetch.requestPaused', async params => {
    const url = new URL(params.request.url);
    if (url.origin === localOrigin) {
      await cdp.send('Fetch.continueRequest', { requestId: params.requestId }, sessionId);
    } else {
      record('externalFulfilled', { url: params.request.url, status: 204 });
      await cdp.send('Fetch.fulfillRequest', { requestId: params.requestId, responseCode: 204, responseHeaders: [{ name: 'content-type', value: 'text/plain' }], body: '' }, sessionId);
    }
  });
  await Promise.all(['Page.enable', 'Runtime.enable', 'Log.enable', 'Network.enable'].map(method => cdp.send(method, {}, sessionId)));
  await cdp.send('Page.setLifecycleEventsEnabled', { enabled: true }, sessionId);
  await cdp.send('Fetch.enable', { patterns: [{ urlPattern: '*', requestStage: 'Request' }] }, sessionId);
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }, sessionId);
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `window.__DOCS_LAYOUT_TEST__ = true; addEventListener('DOMContentLoaded', () => { const style = document.createElement('style'); style.textContent = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}'; document.head.append(style); }, { once: true });` }, sessionId);

  const desktop = await runViewport(cdp, sessionId, 'desktop', 1799, 1003, 2);
  const mobile = await runViewport(cdp, sessionId, 'mobile', 390, 844, 1);
  const allIdsUnique = new Set(desktop.ids).size === desktop.ids.length;
  const allFragmentsResolve = desktop.links.every(fragment => desktop.ids.includes(decodeURIComponent(fragment.slice(1))));
  const hardEvents = cdp.events.filter(event => event.method === 'Runtime.exceptionThrown' || (event.method === 'Runtime.consoleAPICalled' && ['error', 'assert'].includes(event.params.type)) || (event.method === 'Log.entryAdded' && event.params.entry.level === 'error' && (!event.params.entry.url || isSameOrigin(event.params.entry.url))));
  const requests = new Map(cdp.events.filter(event => event.method === 'Network.requestWillBeSent').map(event => [event.params.requestId, event.params.request.url]));
  const resourceFailures = cdp.events.filter(event => event.method === 'Network.responseReceived' && isSameOrigin(event.params.response.url) && !(new URL(event.params.response.url).pathname === '/favicon.ico' && event.params.response.status === 204) && (event.params.response.status < 200 || event.params.response.status >= 300)).map(event => `HTTP ${event.params.response.status} ${event.params.response.url}`);
  resourceFailures.push(...cdp.events.filter(event => event.method === 'Network.loadingFailed' && requests.has(event.params.requestId) && isSameOrigin(requests.get(event.params.requestId))).map(event => `load failed ${requests.get(event.params.requestId)}: ${event.params.errorText}`));
  record('network', { resourceFailures });
  if (mode === 'postfix') {
    assert(allIdsUnique, 'duplicate document IDs');
    assert(allFragmentsResolve, 'sidebar fragment does not resolve');
    assert(desktop.cards === 3 && desktop.wrappers && desktop.teamContained, 'Execution Modes containment is invalid');
    assert(desktop.execution === 'docs-content' && desktop.contentInMain, 'Execution Modes or docs content escaped main containment');
    assert(desktop.overflow <= 1, 'desktop horizontal overflow exceeds one CSS pixel');
    assert(desktop.codeBlocks.length > 0 && desktop.codeBlocks.every(block => block.overflowX === 'auto' && block.scrollWidth >= block.clientWidth), 'code blocks do not retain internal horizontal scrolling');
    assert(desktop.sidebarPosition === 'fixed' && desktop.sidebar.top === 0 && desktop.sidebar.left === 0 && desktop.sidebar.width > 0 && desktop.main.width > 0 && desktop.main.left >= desktop.sidebar.right - 1, 'desktop initial fixed-sidebar geometry is invalid');
    assert(desktop.bottomSidebar.position === 'fixed' && desktop.bottomSidebar.bodyPerspective === 'none' && Math.abs(desktop.bottomSidebar.rect.top - desktop.sidebar.top) <= 1 && Math.abs(desktop.bottomSidebar.rect.left - desktop.sidebar.left) <= 1 && Math.abs(desktop.bottomSidebar.rect.width - desktop.sidebar.width) <= 1, 'desktop sidebar does not remain viewport-fixed at page bottom');
    assert(Math.abs(desktop.executionSidebar.top - desktop.sidebar.top) <= 1 && Math.abs(desktop.executionSidebar.left - desktop.sidebar.left) <= 1 && Math.abs(desktop.executionSidebar.width - desktop.sidebar.width) <= 1, 'desktop sidebar geometry changed at Execution Modes');
    assert(desktop.searchAccordion.service && desktop.searchAccordion.autopilot.length >= 1 && desktop.searchAccordion.autopilot.length <= 8 && desktop.searchAccordion.autopilot.includes('#autopilot') && desktop.searchAccordion.debugging.length >= 1 && desktop.searchAccordion.debugging.length <= 8 && desktop.searchAccordion.debugging.includes('#wf-fix-debug'), 'live SearchService query contract failed');
    assert(desktop.searchAccordion.sentinel.length === 1 && desktop.searchAccordion.sentinelText.includes('safe-render-probe-<img id="safe-render-sentinel-node" src="x">') && !desktop.searchAccordion.sentinelElement && !desktop.searchAccordion.sentinelImage && desktop.searchAccordion.escapeClosed, 'SearchService test seam did not preserve text-only safe rendering or Escape close');
    assert(desktop.searchAccordion.initialAccordion.expanded === 'false' && desktop.searchAccordion.initialAccordion.hidden && desktop.searchAccordion.openedAccordion.expanded === 'true' && !desktop.searchAccordion.openedAccordion.hidden && desktop.searchAccordion.restoredAccordion.expanded === 'false' && desktop.searchAccordion.restoredAccordion.hidden, 'accordion ARIA and hidden toggle contract failed');
    assert(Object.entries(desktop.graph).filter(([id]) => id !== 'documentOrder').every(([, result]) => result.selected && result.onlySelected), 'graph target activation or duplicate-link activation failed');
    assert(desktop.graph.documentOrder && desktop.graph['advanced-orchestration'].hashSelected && desktop.graph['advanced-orchestration'].workflowInactive && desktop.graph['advanced-orchestration'].afterWorkflows, 'advanced orchestration did not deactivate earlier workflow links');
    assert(desktop.advancedScroll.targetTop <= 160 && desktop.advancedScroll.selected && desktop.advancedScroll.onlySelected && desktop.advancedScroll.workflowsInactive, 'scroll-driven Advanced Orchestration activation failed');
    assert(mobile.mobile.expanded === 'false' && mobile.mobile.controls === 'sidebar', 'mobile menu initial ARIA contract failed');
    assert(mobile.overflow <= 1, 'mobile horizontal overflow exceeds one CSS pixel');
    assert(mobile.mobileInteraction.escapeClosed.expanded === 'false' && !mobile.mobileInteraction.escapeClosed.sidebarOpen && !mobile.mobileInteraction.escapeClosed.mainInert && mobile.mobileInteraction.escapeClosed.bodyOverflow === '', 'mobile Escape close contract failed');
    assert(mobile.mobileInteraction.open.expanded === 'true' && mobile.mobileInteraction.open.sidebarOpen && mobile.mobileInteraction.open.overlayActive && mobile.mobileInteraction.open.mainInert && mobile.mobileInteraction.mainBlocked, 'mobile menu open contract failed');
    assert(mobile.mobileInteraction.linkClosed.expanded === 'false' && !mobile.mobileInteraction.linkClosed.sidebarOpen && !mobile.mobileInteraction.linkClosed.mainInert && mobile.mobileInteraction.linkClosed.bodyOverflow === '' && mobile.mobileInteraction.hash === '#autopilot' && mobile.mobileInteraction.targetVisible, 'mobile link close and hash navigation contract failed');
    assert(mobile.mobileInteraction.overlayClosed.expanded === 'false' && !mobile.mobileInteraction.overlayClosed.sidebarOpen && !mobile.mobileInteraction.overlayClosed.mainInert && mobile.mobileInteraction.overlayClosed.bodyOverflow === '', 'mobile menu overlay close contract failed');
    assert(hardEvents.length === 0, 'runtime or log errors observed');
    assert(resourceFailures.length === 0, `same-origin resource failures observed: ${resourceFailures.join(', ')}`);
  } else {
    const parserBroken = !(desktop.cards === 3 && desktop.wrappers && desktop.teamContained && desktop.execution === 'docs-content' && desktop.contentInMain);
    const missingModules = ['sidebarSpy.js', 'searchService.js', 'accordion.js'].every(name => resourceFailures.some(failure => failure.includes(name)));
    assert(parserBroken, 'baseline did not reproduce malformed Execution Modes containment');
    assert(missingModules && hardEvents.length > 0, 'baseline did not reproduce all missing module/runtime failures');
    assert(desktop.perspectiveExperiment?.result === 'causal', 'baseline did not prove body perspective causes fixed-sidebar drift');
    record('baselineExpectedFailure', { parserBroken, missingModules, cards: desktop.cards, wrappers: desktop.wrappers, teamContained: desktop.teamContained, execution: desktop.execution, hardEventCount: hardEvents.length, perspectiveExperiment: desktop.perspectiveExperiment, resourceFailures });
  }
  if (cdp.terminalError) throw cdp.terminalError;
  record('result', { mode, expectedMain, expectedHead, desktop, mobile, events: cdp.events });
  if (failures.length) throw new Error(failures.join('; '));
  console.log(JSON.stringify({ ok: true, mode, expectedMain, expectedHead, evidenceRoot }, null, 2));
} catch (error) {
  record('failure', { message: error.message });
  console.error(JSON.stringify({ ok: false, mode, expectedMain, expectedHead, evidenceRoot, error: error.message }, null, 2));
  process.exitCode = 1;
} finally {
  if (browser && browser.exitCode === null) {
    browser.kill('SIGTERM');
    await Promise.race([once(browser, 'exit'), new Promise(resolve => setTimeout(resolve, 2000))]);
    if (browser.exitCode === null) {
      browser.kill('SIGKILL');
      await Promise.race([once(browser, 'exit'), new Promise(resolve => setTimeout(resolve, 1000))]);
    }
      if (browser.exitCode === null) {
        record('cleanupFailure', { process: 'chromium', reason: 'survived SIGKILL timeout' });
        process.exitCode = 1;
      }
  }
  if (server) await new Promise(resolve => server.close(resolve));
  const payload = `${JSON.stringify({ mode, expectedMain, expectedHead, root, logs }, null, 2)}\n`;
  const digest = crypto.createHash('sha256').update(payload).digest('hex');
  await writeFile(path.join(evidenceRoot, `${mode}.json`), payload);
  await writeFile(path.join(evidenceRoot, `${mode}.sha256`), `${digest}  ${mode}.json\n`);
  if (!keepArtifacts && !process.exitCode) { await rm(evidenceRoot, { recursive: true, force: true }); }
  if (profile) await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
