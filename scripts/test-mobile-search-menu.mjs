#!/usr/bin/env node
/**
 * Regression test (playwright-core): selecting a search result on mobile must close the
 * mobile menu (no inert .docs-main, no body scroll lock) and still navigate to the anchor.
 * Also covers the mobile -> desktop resize reset.
 * Usage: [CHROMIUM_BIN=/path] [PLAYWRIGHT_CORE=/path/to/playwright-core] node scripts/test-mobile-search-menu.mjs
 */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

const server = http.createServer(async (req, res) => {
  try {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root)) throw new Error('escape');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}/docs.html`;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_BIN || undefined });

const state = page => page.evaluate(() => ({
  open: document.querySelector('#sidebar').classList.contains('open'),
  expanded: document.querySelector('#mobile-menu-btn').getAttribute('aria-expanded'),
  overlayActive: document.querySelector('#sidebar-overlay').classList.contains('active'),
  inert: document.querySelector('.docs-main').hasAttribute('inert'),
  bodyOverflow: document.body.style.overflow,
  bodyComputedOverflow: getComputedStyle(document.body).overflowY,
  hash: location.hash,
  scrollY: window.scrollY,
}));

async function openMenuAndSearch(page) {
  await page.goto(url);
  await page.waitForFunction(() => document.querySelector('#search-input') && document.readyState === 'complete');
  await page.click('#mobile-menu-btn');
  let s = await state(page);
  assert.ok(s.open && s.inert && s.bodyOverflow === 'hidden', 'menu did not open');
  await page.fill('#search-input', 'autopilot');
  await page.waitForSelector('#search-results .search-result', { state: 'visible' });
}

async function assertSelectedAndClosed(page, label) {
  const s = await state(page);
  assert.equal(s.open, false, `${label}: sidebar still open`);
  assert.equal(s.expanded, 'false', `${label}: aria-expanded not reset`);
  assert.equal(s.overlayActive, false, `${label}: overlay still active`);
  assert.equal(s.inert, false, `${label}: .docs-main still inert`);
  assert.equal(s.bodyOverflow, '', `${label}: body scroll still locked`);
  assert.notEqual(s.bodyComputedOverflow, 'hidden', `${label}: body computed overflow hidden`);
  assert.ok(s.hash && s.hash !== '#', `${label}: hash did not change`);
  await page.waitForFunction(() => window.scrollY > 0);
  const top = await page.evaluate(() => document.getElementById(decodeURIComponent(location.hash.slice(1))).getBoundingClientRect().top);
  assert.ok(top < 600 && top > -200, `${label}: target not near viewport (top=${top})`);
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 300);
  await page.waitForFunction(y => window.scrollY !== y, before, { timeout: 3000 });
}

let failed = false;
const run = async (name, fn) => {
  const context = await browser.newContext({ viewport: { width: 800, height: 900 } });
  const page = await context.newPage();
  try { await fn(page); console.log(`ok - ${name}`); }
  catch (error) { failed = true; console.log(`not ok - ${name}\n  ${error.message.split('\n')[0]}`); }
  await context.close();
};

await run('click on search result closes mobile menu and navigates', async page => {
  await openMenuAndSearch(page);
  await page.click('#search-results .search-result');
  await assertSelectedAndClosed(page, 'click');
});
await run('Enter in search input closes mobile menu and navigates', async page => {
  await openMenuAndSearch(page);
  await page.press('#search-input', 'Enter');
  await assertSelectedAndClosed(page, 'enter');
});
await run('resize to desktop resets open mobile menu', async page => {
  await page.goto(url);
  await page.waitForFunction(() => document.readyState === 'complete');
  await page.click('#mobile-menu-btn');
  assert.equal((await state(page)).inert, true);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForFunction(() => !document.querySelector('.docs-main').hasAttribute('inert'));
  const s = await state(page);
  assert.equal(s.open, false);
  assert.equal(s.bodyOverflow, '');
});

await browser.close();
await new Promise(resolve => server.close(resolve));
process.exit(failed ? 1 : 0);
