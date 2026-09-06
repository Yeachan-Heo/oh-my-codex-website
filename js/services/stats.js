/**
 * OMX Stats Service
 * Resolves live release/version/download metadata at runtime.
 *
 * Resolution order per field:
 *   1. Live API (npm registry, npm downloads, GitHub repo)
 *   2. data/stats.json (kept fresh by the scheduled sync workflows)
 *   3. Whatever static markup already contains (left untouched)
 *
 * Rendering targets are declarative: any element carrying
 * `data-stat="<key>"` is filled in. Keys:
 *   version | prompts | skills | mcp-servers
 *   github-stars | github-forks | npm-downloads | last-updated
 */
(function () {
  'use strict';

  const CONFIG = (typeof window !== 'undefined' && window.OMX_CONFIG) || {};
  const API = CONFIG.api || {};
  const CACHE_KEY = 'omx-stats-v2';
  const CACHE_TTL = 5 * 60 * 1000;

  const ENDPOINTS = {
    githubRepo: API.githubRepo || 'https://api.github.com/repos/Yeachan-Heo/oh-my-codex',
    npmLatest: API.npmLatest || 'https://registry.npmjs.org/oh-my-codex/latest',
    npmDownloads:
      API.npmDownloads || 'https://api.npmjs.org/downloads/point/last-month/oh-my-codex',
    localStats: API.localStats || 'data/stats.json'
  };

  function formatNumber(num) {
    if (typeof num !== 'number' || !isFinite(num)) return null;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return String(num);
  }

  function formatDate(iso) {
    const date = new Date(iso);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(url + ' -> HTTP ' + response.status);
    return response.json();
  }

  function readCache() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const entry = JSON.parse(raw);
      if (!entry || Date.now() - entry.timestamp > CACHE_TTL) return null;
      return entry.data;
    } catch (err) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      /* sessionStorage unavailable — live without caching */
    }
  }

  function normalizeLocal(raw) {
    if (!raw || typeof raw !== 'object') return {};
    const stats = {};
    if (typeof raw.version === 'string') stats.version = raw.version;
    if (typeof raw.prompts === 'number') stats.prompts = raw.prompts;
    if (typeof raw.skills === 'number') stats.skills = raw.skills;
    if (typeof raw.mcpServers === 'number') stats.mcpServers = raw.mcpServers;
    if (typeof raw.downloads === 'number') stats.downloads = raw.downloads;
    if (typeof raw.stars === 'number') stats.stars = raw.stars;
    if (typeof raw.forks === 'number') stats.forks = raw.forks;
    if (typeof raw.lastUpdated === 'string') stats.lastUpdated = raw.lastUpdated;
    return stats;
  }

  async function resolve() {
    const [local, npmLatest, npmDownloads, github] = await Promise.all([
      fetchJson(ENDPOINTS.localStats).catch(() => null),
      fetchJson(ENDPOINTS.npmLatest).catch(() => null),
      fetchJson(ENDPOINTS.npmDownloads).catch(() => null),
      fetchJson(ENDPOINTS.githubRepo).catch(() => null)
    ]);

    // Static baseline (counts only exist here), then let live data win.
    const stats = normalizeLocal(local);

    if (npmLatest && typeof npmLatest.version === 'string') {
      stats.version = npmLatest.version;
    }
    if (npmDownloads && typeof npmDownloads.downloads === 'number') {
      stats.downloads = npmDownloads.downloads;
    }
    if (github && typeof github.stargazers_count === 'number') {
      stats.stars = github.stargazers_count;
      stats.forks = github.forks_count;
    }
    if (npmLatest || npmDownloads || github) {
      stats.lastUpdated = new Date().toISOString();
    }

    return stats;
  }

  function render(stats) {
    if (!stats) return;

    const values = {
      version: typeof stats.version === 'string' ? 'v' + stats.version : null,
      prompts: formatNumber(stats.prompts),
      skills: formatNumber(stats.skills),
      'mcp-servers': formatNumber(stats.mcpServers),
      'github-stars': formatNumber(stats.stars),
      'github-forks': formatNumber(stats.forks),
      'npm-downloads': formatNumber(stats.downloads),
      'last-updated': stats.lastUpdated ? formatDate(stats.lastUpdated) : null
    };

    document.querySelectorAll('[data-stat]').forEach((el) => {
      const value = values[el.getAttribute('data-stat')];
      if (value) el.textContent = value;
    });
  }

  async function hydrate() {
    const cached = readCache();
    if (cached) {
      render(cached);
      return cached;
    }

    try {
      const stats = await resolve();
      writeCache(stats);
      render(stats);
      return stats;
    } catch (err) {
      console.error('[OMX] Stats hydration failed:', err);
      return null;
    }
  }

  window.OMXStats = { hydrate, resolve, render, formatNumber };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate, { once: true });
  } else {
    hydrate();
  }
})();
