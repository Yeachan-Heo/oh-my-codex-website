#!/usr/bin/env node
/**
 * Auto-sync website metadata from the oh-my-codex source repo.
 *
 * Syncs:
 *   - version    -> index.html, docs.html, data/stats.json (from package.json)
 *   - prompts    -> count of prompts/*.md
 *   - skills     -> count of skills/<name>/ directories
 *   - mcpServers -> count of mcpServers in plugins/oh-my-codex/.mcp.json
 *
 * Static markup is only the no-JS fallback: js/services/stats.js resolves
 * version/downloads/stars live from npm + GitHub on every page load.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Candidate source-repo roots. The explicit override stays first so a stale
// sibling checkout cannot silently downgrade the website.
const candidateRoots = [
  process.env.OMX_SOURCE_DIR,
  process.env.OMX_SOURCE_PACKAGE_JSON
    ? dirname(process.env.OMX_SOURCE_PACKAGE_JSON)
    : null,
  join(ROOT, 'oh-my-codex-source'),
  join(ROOT, '..', 'oh-my-codex'),
  join(ROOT, '..', 'oh-my-codex-main')
].filter(Boolean);

let sourceRoot = null;
let pkg = null;

for (const root of candidateRoots) {
  const pkgPath = join(root, 'package.json');
  if (!existsSync(pkgPath)) continue;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    sourceRoot = root;
    console.log(`Found source repo at: ${root}`);
    break;
  } catch (e) {
    console.warn(`Failed to parse ${pkgPath}: ${e.message}`);
  }
}

// OMX_VERSION lets the stats workflow push the published npm version into the
// static markup without a source checkout (counts then stay as-is).
const requestedVersion = process.env.OMX_VERSION || pkg?.version;

if (!requestedVersion) {
  console.error('ERROR: Could not find the oh-my-codex source repo in:');
  candidateRoots.forEach((p) => console.error(`  - ${p}`));
  console.error('\nSet OMX_SOURCE_DIR to a checkout, or OMX_VERSION to a published version.');
  process.exit(1);
}
if (!/^\d+\.\d+\.\d+/.test(requestedVersion)) {
  console.error(`ERROR: Unexpected source version: ${requestedVersion}`);
  process.exit(1);
}

/** Compare dotted numeric versions; prerelease suffixes sort below the release. */
function compareVersions(a, b) {
  const parse = (v) => {
    const [core, pre] = String(v).split('-', 2);
    return { nums: core.split('.').map(Number), pre: pre || null };
  };
  const left = parse(a);
  const right = parse(b);
  for (let i = 0; i < 3; i++) {
    const diff = (left.nums[i] || 0) - (right.nums[i] || 0);
    if (diff !== 0) return diff;
  }
  if (left.pre === right.pre) return 0;
  if (!left.pre) return 1;
  if (!right.pre) return -1;
  return left.pre < right.pre ? -1 : 1;
}

/** Count markdown prompt files. */
function countPrompts() {
  const dir = join(sourceRoot, 'prompts');
  if (!existsSync(dir)) return null;
  return readdirSync(dir).filter((f) => f.endsWith('.md')).length;
}

/**
 * Count live skill directories.
 *
 * A removed skill keeps a `skills/<name>/SKILL.md` tombstone whose description
 * is a "Sunset stub" pointing at its successor (0.21 retired $ultrawork,
 * $ralph, $pipeline and $autoresearch-goal this way). Counting those would
 * advertise capabilities the runtime no longer routes.
 */
function countSkills() {
  const dir = join(sourceRoot, 'skills');
  if (!existsSync(dir)) return null;
  return readdirSync(dir).filter((entry) => {
    const path = join(dir, entry);
    if (!statSync(path).isDirectory()) return entry.endsWith('.md');
    return !isSunsetStub(join(path, 'SKILL.md'));
  }).length;
}

/** Report whether a SKILL.md is a sunset tombstone rather than a live skill. */
function isSunsetStub(skillPath) {
  if (!existsSync(skillPath)) return false;
  const front = readFileSync(skillPath, 'utf8').slice(0, 600);
  const description = front.match(/^description:\s*(.*)$/m);
  if (!description) return false;
  return /sunset stub|\bremoved\b/i.test(description[1]);
}

/** Count MCP servers declared by the bundled plugin manifest. */
function countMcpServers() {
  const path = join(sourceRoot, 'plugins', 'oh-my-codex', '.mcp.json');
  if (!existsSync(path)) return null;
  try {
    const manifest = JSON.parse(readFileSync(path, 'utf8'));
    return Object.keys(manifest.mcpServers || {}).length;
  } catch (e) {
    console.warn(`Failed to parse ${path}: ${e.message}`);
    return null;
  }
}

const counts = sourceRoot
  ? {
      prompts: countPrompts(),
      skills: countSkills(),
      mcpServers: countMcpServers()
    }
  : { prompts: null, skills: null, mcpServers: null };
console.log('Source counts:', counts);

// ---------------------------------------------------------------------------
// data/stats.json — canonical offline fallback consumed by js/services/stats.js
// ---------------------------------------------------------------------------
const statsPath = join(ROOT, 'data', 'stats.json');
let stats = {};
try {
  stats = JSON.parse(readFileSync(statsPath, 'utf8'));
} catch (e) {
  console.warn(`Recreating ${statsPath}: ${e.message}`);
}
// Never move the site backwards: the hourly source sync and the 2-hourly npm
// stats sync both write here, and either input can briefly be the older one.
const version =
  stats.version && compareVersions(stats.version, requestedVersion) > 0
    ? stats.version
    : requestedVersion;
console.log(
  `Target version: v${version}` +
    (version === requestedVersion ? '' : ` (kept ahead of requested v${requestedVersion})`)
);

const nextStats = {
  version,
  prompts: counts.prompts ?? stats.prompts ?? 0,
  skills: counts.skills ?? stats.skills ?? 0,
  mcpServers: counts.mcpServers ?? stats.mcpServers ?? 0,
  downloads: stats.downloads ?? 0,
  stars: stats.stars ?? 0,
  forks: stats.forks ?? 0,
  lastUpdated: new Date().toISOString()
};

const statsChanged = Object.keys(nextStats).some(
  (key) => key !== 'lastUpdated' && nextStats[key] !== stats[key]
);
if (statsChanged) {
  writeFileSync(statsPath, JSON.stringify(nextStats, null, 2) + '\n');
  console.log(`Updated ${statsPath}`);
} else {
  console.log('data/stats.json already up-to-date');
}

// ---------------------------------------------------------------------------
// HTML / JS version + count references
// ---------------------------------------------------------------------------
const countByStatKey = {
  version: `v${version}`,
  prompts: counts.prompts !== null ? String(counts.prompts) : null,
  skills: counts.skills !== null ? String(counts.skills) : null,
  'mcp-servers': counts.mcpServers !== null ? String(counts.mcpServers) : null
};

/** Rewrite the text of `<tag ... data-stat="key" ...>text</tag>` elements. */
function syncStatElements(content) {
  let updated = content;
  for (const [key, value] of Object.entries(countByStatKey)) {
    if (value === null) continue;
    const pattern = new RegExp(
      `(<(\\w+)([^>]*\\bdata-stat="${key}"[^>]*)>)[^<]*(</\\2>)`,
      'g'
    );
    updated = updated.replace(pattern, `$1${value}$4`);
  }
  return updated;
}

/**
 * Meta tags and social-card copy cannot carry a `data-stat` element, so the
 * capability counts embedded in that prose are rewritten by pattern instead.
 */
function syncProseCounts(content) {
  let updated = content;
  const prose = [
    [counts.prompts, /\b\d+ specialized prompts\b/g, (n) => `${n} specialized prompts`],
    [counts.prompts, /\b\d+ role prompts\b/g, (n) => `${n} role prompts`],
    [counts.skills, /\b\d+ skills\b/g, (n) => `${n} skills`],
    [counts.mcpServers, /\b\d+ MCP servers\b/g, (n) => `${n} MCP servers`]
  ];
  for (const [value, pattern, render] of prose) {
    if (value === null) continue;
    updated = updated.replace(pattern, render(value));
  }
  return updated;
}

const indexPath = join(ROOT, 'index.html');
const indexHtml = readFileSync(indexPath, 'utf8');
const versionMatch = indexHtml.match(/v(\d+\.\d+\.\d+)/);
const currentVersion = versionMatch ? versionMatch[1] : null;

if (!currentVersion) {
  console.error(`ERROR: Could not detect current website version in ${indexPath}`);
  process.exit(1);
}

if (currentVersion === version) {
  console.log(`Website version already up-to-date: v${version}`);
} else {
  console.log(`Updating version: v${currentVersion} -> v${version}`);
}

const prefixedVersionRegex = new RegExp(`v${currentVersion.replace(/\./g, '\\.')}`, 'g');
const bareVersionRegex = new RegExp(currentVersion.replace(/\./g, '\\.'), 'g');

for (const file of ['index.html', 'docs.html', 'js/config.js']) {
  const filePath = join(ROOT, file);
  if (!existsSync(filePath)) continue;

  const original = readFileSync(filePath, 'utf8');
  let content = original;

  if (currentVersion !== version) {
    content = content.replace(prefixedVersionRegex, `v${version}`);
    if (content.includes(`"${currentVersion}"`) || content.includes(`'${currentVersion}'`)) {
      content = content.replace(bareVersionRegex, version);
    }
  }

  content = syncProseCounts(syncStatElements(content));

  if (file === 'docs.html') {
    content = content
      .replace(
        /(<span class="sidebar-brand__version"[^>]*>)v\d+\.\d+\.\d+(<\/span>)/,
        `$1v${version}$2`
      )
      .replace(/(Oh My Codex )v\d+\.\d+\.\d+( Documentation)/, `$1v${version}$2`);
  }

  if (content !== original) {
    writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

console.log('Metadata sync complete!');
