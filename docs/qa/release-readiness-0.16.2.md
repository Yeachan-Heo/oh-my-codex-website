# Release Readiness Verdict - 0.16.2

Target version: **0.16.2**
Date: 2026-05-08
Compare link after tag: [`v0.16.1...v0.16.2`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.1...v0.16.2)

## Verdict

**READY after CI is green.** Local review found and fixed a release-blocking Codex hook feature-flag regression before tagging.

## Release blocker resolved

- Generated setup config now emits `[features].codex_hooks = true`, matching current official Codex docs for lifecycle hooks.
- Plugin-mode setup now emits setup-owned hook trust-state tables for generated `codex-native-hook.js` wrappers.
- Setup cleanup strips stale OMX-owned hook trust state and legacy/unreleased `hooks = true` aliases before re-upserting supported config.

## Local verification evidence

| Gate | Result |
| --- | --- |
| Official Codex docs check | PASS — docs state hooks are enabled with `[features].codex_hooks = true`. |
| `npm run build` | PASS |
| `npm run check:no-unused` | PASS |
| Targeted Node tests for config/setup/uninstall/hooks | PASS — 136/136 |
| `npm run verify:native-agents` | PASS |
| `npm run verify:plugin-bundle` | PASS |
| Catalog docs check | PASS |
| `cargo test` | PASS |

## Remaining external gate

GitHub CI must pass on pushed `dev` before merging to `main` and pushing `v0.16.2`.
