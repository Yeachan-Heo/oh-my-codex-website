# Release notes — 0.16.2

`0.16.2` is a release-review patch for the `0.16.1` train. It preserves the `0.16.1` hardening surface while fixing a Codex native-hook setup blocker found during pre-ship review.

## Fixed

- Restored the official Codex lifecycle-hook feature flag to `[features].codex_hooks = true` in generated setup config. The unsupported `[features].hooks = true` alias is repaired during setup instead of being emitted.
- Added plugin-mode hook trust-state generation in `config.toml` for setup-owned `codex-native-hook.js` wrappers, matching legacy/full setup behavior while preserving user hooks and user-owned hook state.
- Updated setup, uninstall, docs, and plugin-skill mirrors so runtime feature-flag guidance consistently names `codex_hooks`.

## Validation

- `npm run build`
- `npm run check:no-unused`
- Targeted Node release-blocker tests: `dist/config/__tests__/codex-hooks.test.js`, `dist/cli/__tests__/setup-install-mode.test.js`, `dist/config/__tests__/generator-notify.test.js`, `dist/config/__tests__/generator-idempotent.test.js`, `dist/cli/__tests__/setup-scope.test.js`, `dist/cli/__tests__/uninstall.test.js`
- `npm run verify:native-agents`
- `npm run verify:plugin-bundle`
- `node dist/scripts/generate-catalog-docs.js --check`
- `cargo test`

**Full Changelog**: [`v0.16.1...v0.16.2`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.1...v0.16.2)
