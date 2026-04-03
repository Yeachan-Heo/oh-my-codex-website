#!/usr/bin/env node
/**
 * Auto-sync website version from package.json
 * Reads ../oh-my-codex/package.json and updates index.html version references
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Read version from source repo
const sourcePkgPath = join(ROOT, '..', 'oh-my-codex', 'package.json');
const pkg = JSON.parse(readFileSync(sourcePkgPath, 'utf8'));
const version = pkg.version;

console.log(`Source repo version: v${version}`);

// Update index.html
const indexPath = join(ROOT, 'index.html');
let indexHtml = readFileSync(indexPath, 'utf8');

// Extract current version to check if update needed
const versionMatch = indexHtml.match(/v(\d+\.\d+\.\d+)/);
const currentVersion = versionMatch ? versionMatch[1] : null;

if (currentVersion === version) {
  console.log(`Version already up-to-date: v${version}`);
  process.exit(0);
}

console.log(`Updating version: v${currentVersion} -> v${version}`);

// Replace all version occurrences
const versionRegex = new RegExp(`v${currentVersion.replace(/\./g, '\\.')}`, 'g');
indexHtml = indexHtml.replace(versionRegex, `v${version}`);

writeFileSync(indexPath, indexHtml);
console.log(`Updated ${indexPath}`);

// Also update any other files that might have version references
const filesToCheck = ['docs.html'];
for (const file of filesToCheck) {
  const filePath = join(ROOT, file);
  try {
    let content = readFileSync(filePath, 'utf8');
    if (content.includes(`v${currentVersion}`)) {
      content = content.replace(versionRegex, `v${version}`);
      writeFileSync(filePath, content);
      console.log(`Updated ${filePath}`);
    }
  } catch (e) {
    // File might not exist
  }
}

console.log('Version sync complete!');
