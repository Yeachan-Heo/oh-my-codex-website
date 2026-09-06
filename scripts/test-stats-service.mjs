import { readFileSync } from 'fs';
import vm from 'vm';

function makeEl(key, initial) {
  return { getAttribute: () => key, textContent: initial, _key: key };
}

function runCase(name, { fetchImpl, statsJson }) {
  const els = [
    makeEl('version', 'v0.17.0'),
    makeEl('npm-downloads', '—'),
    makeEl('github-stars', '—'),
    makeEl('prompts', '33'),
    makeEl('skills', '36'),
    makeEl('mcp-servers', '5')
  ];
  const listeners = {};
  const sandbox = {
    console,
    fetch: fetchImpl,
    sessionStorage: {
      store: {},
      getItem(k) { return this.store[k] ?? null; },
      setItem(k, v) { this.store[k] = v; }
    },
    document: {
      readyState: 'complete',
      querySelectorAll: () => els,
      addEventListener: (t, f) => { listeners[t] = f; }
    }
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync('js/services/stats.js', 'utf8'), sandbox);
  return sandbox.window.OMXStats.hydrate().then(() => {
    console.log(`\n[${name}]`);
    els.forEach((e) => console.log(`  ${e._key} = ${e.textContent}`));
    return els;
  });
}

const localStats = JSON.parse(readFileSync('data/stats.json', 'utf8'));
const liveFetch = (url) => {
  if (url.includes('registry.npmjs.org')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ version: '9.1.2' }) });
  if (url.includes('api.npmjs.org')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ downloads: 123456 }) });
  if (url.includes('api.github.com')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ stargazers_count: 40100, forks_count: 2600 }) });
  return Promise.resolve({ ok: true, json: () => Promise.resolve(localStats) });
};
const offlineFetch = (url) => {
  if (url.includes('data/stats.json')) return Promise.resolve({ ok: true, json: () => Promise.resolve(localStats) });
  return Promise.resolve({ ok: false, status: 503 });
};
const deadFetch = () => Promise.reject(new Error('network down'));

const live = await runCase('live APIs win', { fetchImpl: liveFetch });
if (live[0].textContent !== 'v9.1.2') throw new Error('live version not applied');
if (live[1].textContent !== '123.5k') throw new Error('live downloads not applied');
if (live[2].textContent !== '40.1k') throw new Error('live stars not applied');

const offline = await runCase('APIs down -> data/stats.json', { fetchImpl: offlineFetch });
if (offline[0].textContent !== 'v' + localStats.version) throw new Error('fallback version not applied');
if (offline[1].textContent !== '22.2k') throw new Error('fallback downloads not applied');
if (offline[3].textContent !== String(localStats.prompts)) throw new Error('fallback prompts not applied');

const dead = await runCase('everything down -> static markup preserved', { fetchImpl: deadFetch });
if (dead[0].textContent !== 'v0.17.0') throw new Error('static markup should be preserved');

console.log('\nALL ASSERTIONS PASSED');
