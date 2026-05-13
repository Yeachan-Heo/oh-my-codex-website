#!/usr/bin/env node
/**
 * Auto-sync website version from package.json
 * Reads from oh-my-codex source repo and updates version references
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Try multiple possible locations for the source repo
const possibleSourcePaths = [
  // Explicit override for release/sync jobs and local recovery. Keep this first so
  // a stale sibling checkout cannot silently downgrade the website.
  process.env.OMX_SOURCE_PACKAGE_JSON,
  // GitHub Actions path (checked out as oh-my-codex-source)
  join(ROOT, 'oh-my-codex-source', 'package.json'),
  // Local development path (sibling directory)
  join(ROOT, '..', 'oh-my-codex', 'package.json'),
  // Alternative sibling path with different name
  join(ROOT, '..', 'oh-my-codex-main', 'package.json'),
].filter(Boolean);

let sourcePkgPath = null;
let pkg = null;

for (const path of possibleSourcePaths) {
  if (existsSync(path)) {
    sourcePkgPath = path;
    try {
      pkg = JSON.parse(readFileSync(path, 'utf8'));
      console.log(`Found source package.json at: ${path}`);
      break;
    } catch (e) {
      console.warn(`Failed to parse ${path}: ${e.message}`);
    }
  }
}

if (!pkg) {
  console.error('ERROR: Could not find oh-my-codex package.json in any known location:');
  possibleSourcePaths.forEach(p => console.error(`  - ${p}`));
  console.error('\nTo specify a custom path, set OMX_SOURCE_PACKAGE_JSON environment variable.');
  process.exit(1);
}

const version = pkg.version;
console.log(`Source repo version: v${version}`);

// Update index.html
const indexPath = join(ROOT, 'index.html');
let indexHtml = readFileSync(indexPath, 'utf8');

// Extract current version to check if update needed
const versionMatch = indexHtml.match(/v(\d+\.\d+\.\d+)/);
const currentVersion = versionMatch ? versionMatch[1] : null;

if (!currentVersion) {
  console.error(`ERROR: Could not detect current website version in ${indexPath}`);
  process.exit(1);
}

if (currentVersion === version) {
  console.log(`Index version already up-to-date: v${version}`);
} else {
  console.log(`Updating version: v${currentVersion} -> v${version}`);
}

// Replace all version occurrences
const versionRegex = new RegExp(`v${currentVersion.replace(/\./g, '\\.')}`, 'g');
if (currentVersion !== version) {
  indexHtml = indexHtml.replace(versionRegex, `v${version}`);
  writeFileSync(indexPath, indexHtml);
  console.log(`Updated ${indexPath}`);
}

// Also update any other files that might have version references
const filesToCheck = ['docs.html', 'js/config.js', 'data/stats.json'];
// Bare version regex for JSON/JS files that store version without the "v" prefix
const bareVersionRegex = new RegExp(currentVersion.replace(/\./g, '\\.'), 'g');
for (const file of filesToCheck) {
  const filePath = join(ROOT, file);
  try {
    let content = readFileSync(filePath, 'utf8');
    let updated = false;
    if (content.includes(`v${currentVersion}`)) {
      const next = content.replace(versionRegex, `v${version}`);
      if (next !== content) {
        content = next;
        updated = true;
      }
    }
    if (content.includes(`"${currentVersion}"`) || content.includes(`'${currentVersion}'`)) {
      const next = content.replace(bareVersionRegex, version);
      if (next !== content) {
        content = next;
        updated = true;
      }
    }
    if (file === 'docs.html') {
      const next = content
        .replace(/(<span class="sidebar-brand__version">)v\d+\.\d+\.\d+(<\/span>)/, `$1v${version}$2`)
        .replace(/(Oh My Codex )v\d+\.\d+\.\d+( Documentation)/, `$1v${version}$2`);
      if (next !== content) {
        content = next;
        updated = true;
      }
    }
    if (updated) {
      writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  } catch (e) {
    // File might not exist
  }
}

console.log('Version sync complete!');
