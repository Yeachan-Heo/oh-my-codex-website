#!/usr/bin/env node
/**
 * Fail if a published page advertises a capability the source no longer ships.
 *
 * Retired names are not hardcoded: they are derived from the source repo's own
 * removed-skill resolver (`src/hooks/sunset-stub.ts`) plus the sunset-stub
 * SKILL.md tombstones, and the live inventory comes from
 * `omx-capabilities.lock.json`. That means this check tracks the product
 * instead of needing an update every time a skill is retired.
 *
 * Usage:
 *   OMX_SOURCE_DIR=../oh-my-codex node scripts/check-doc-parity.mjs
 *
 * A name is allowed to appear when the surrounding text marks it as gone
 * (removed / retired / sunset / deprecated / superseded / legacy / "use X
 * instead"), and historical release notes are skipped entirely.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const candidateRoots = [
  process.env.OMX_SOURCE_DIR,
  join(ROOT, 'oh-my-codex-source'),
  join(ROOT, '..', 'oh-my-codex')
].filter(Boolean);

const sourceRoot = candidateRoots.find((r) => existsSync(join(r, 'package.json')));
if (!sourceRoot) {
  console.error('ERROR: source repo not found; set OMX_SOURCE_DIR');
  process.exit(1);
}

/** Names the runtime answers with a removal notice. */
function removedSkillNames() {
  const path = join(sourceRoot, 'src', 'hooks', 'sunset-stub.ts');
  if (!existsSync(path)) return [];
  const text = readFileSync(path, 'utf8');
  const block = text.slice(text.indexOf('REMOVED_SKILLS'));
  return [...block.matchAll(/^\s{2}"?([a-z][a-z0-9-]*)"?:\s*\{/gm)].map((m) => m[1]);
}

/** Skill directories that are only tombstones pointing at a successor. */
function sunsetStubNames() {
  const dir = join(sourceRoot, 'skills');
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((entry) => {
    const skillPath = join(dir, entry, 'SKILL.md');
    if (!statSync(join(dir, entry)).isDirectory() || !existsSync(skillPath)) return false;
    const front = readFileSync(skillPath, 'utf8').slice(0, 600);
    const description = front.match(/^description:\s*(.*)$/m);
    return description ? /sunset stub|\bremoved\b/i.test(description[1]) : false;
  });
}

/** MCP tool names the plugin actually configures. */
function configuredToolNames() {
  const path = join(sourceRoot, 'omx-capabilities.lock.json');
  if (!existsSync(path)) return null;
  const lock = JSON.parse(readFileSync(path, 'utf8'));
  const tools = lock?.surfaces?.configured_tools?.tools;
  if (!tools) return null;
  return new Set(Array.isArray(tools) ? tools.map((t) => t.name || t.id || t) : Object.keys(tools));
}

const retired = [...new Set([...removedSkillNames(), ...sunsetStubNames()])].sort();
const configuredTools = configuredToolNames();

// Tool names that documentation has historically invented or that moved off the
// MCP surface. Verified against the lock rather than assumed.
const toolCandidates = [
  'state_write',
  'state_clear',
  'lsp_goto_definition',
  'lsp_rename',
  'lsp_code_actions',
  'python_repl'
];
const phantomTools = configuredTools
  ? toolCandidates.filter((t) => !configuredTools.has(t))
  : [];

// Wording that marks a name as gone. Localized READMEs state the retirement in
// their own language, so the removal vocabulary has to cover them too.
const CLEARED = new RegExp(
  [
    // English
    'removed', 'retired', 'sunset', 'deprecat', 'superseded', 'legacy',
    'no longer', 'instead', 'replaces', 'not part of', 'not in the', 'read-only',
    'use \\$', 'use <code>',
    // CJK
    '移除', '移除了', '廢除', '廃止', '削除', '제거', '삭제', '폐지',
    // Latin/Cyrillic scripts
    'eliminado', 'retirado', 'supprim', 'entfernt', 'rimosso', 'removido',
    'удал', 'kaldır', 'dihapus', 'wycofan', 'видалено', 'loại bỏ', 'đã xo'
  ].join('|'),
  'i'
);
const HISTORICAL_PATH =
  /release-notes|changelog|\/prs\/|\/qa\/|\/issues\/|\/design\/|\/recipes\/|\/audit\/|regression|handoff/i;

function publishedFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (
      entry === '.git' ||
      entry === 'node_modules' ||
      entry === '.omx' ||
      entry === '.gjc' ||
      entry.startsWith('oh-my-codex-source')
    ) {
      continue;
    }
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) publishedFiles(path, acc);
    else if (/\.(html|md)$/.test(entry)) acc.push(path);
  }
  return acc;
}

const findings = [];
for (const path of publishedFiles(ROOT)) {
  const rel = relative(ROOT, path);
  if (HISTORICAL_PATH.test(rel)) continue;

  const raw = readFileSync(path, 'utf8');
  // Collapsed release-note blocks legitimately name their own era.
  const text = raw.replace(/<details>[\s\S]*?<\/details>/g, '');

  const hits = new Set();
  // OMX skills are invoked as `$name`. The `/name` form is not a skill
  // invocation here and would collide with ordinary file paths.
  for (const name of retired) {
    const form = `$${name}`;
    let index = text.indexOf(form);
    while (index !== -1) {
      // Reject a longer name that merely starts with this one.
      const next = text[index + form.length];
      if (!next || !/[a-z0-9-]/i.test(next)) {
        const context = text.slice(Math.max(0, index - 300), index + 220);
        if (!CLEARED.test(context)) hits.add(form);
      }
      index = text.indexOf(form, index + 1);
    }
  }
  for (const tool of phantomTools) {
    let index = text.indexOf(tool);
    while (index !== -1) {
      const context = text.slice(Math.max(0, index - 300), index + 220);
      if (!CLEARED.test(context)) hits.add(tool);
      index = text.indexOf(tool, index + 1);
    }
  }

  if (hits.size) {
    // A page mirrored from the source repo cannot be fixed here: the sync
    // overwrites it on every run. Report it, but only fail on pages this
    // repository actually owns.
    const mirrored = existsSync(join(sourceRoot, rel));
    findings.push({ rel, hits: [...hits].sort(), mirrored });
  }
}

console.log(`Source: ${sourceRoot}`);
console.log(`Retired skill names tracked: ${retired.length}`);
console.log(`Tool names absent from the configured surface: ${phantomTools.join(', ') || 'none'}`);

if (!findings.length) {
  console.log('\nOK: no published page advertises a retired capability or phantom MCP tool.');
  process.exit(0);
}

const owned = findings.filter((f) => !f.mirrored);
const mirrored = findings.filter((f) => f.mirrored);

if (mirrored.length) {
  console.warn('\nWARNING: mirrored source pages still name retired capabilities.');
  console.warn('These are overwritten by the sync, so they must be fixed upstream in oh-my-codex:');
  for (const { rel, hits } of mirrored) {
    console.warn(`  ${rel}: ${hits.join(', ')}`);
  }
}

if (!owned.length) {
  console.log('\nOK: every page this repository owns is clean.');
  process.exit(0);
}

console.error('\nFAIL: website-owned pages advertise capabilities the source no longer ships:');
for (const { rel, hits } of owned) {
  console.error(`  ${rel}: ${hits.join(', ')}`);
}
console.error(
  '\nEither point the text at the current replacement, or mark the name as removed/retired in the surrounding sentence.'
);
process.exit(1);
