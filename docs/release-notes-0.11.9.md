# Release notes — 0.11.9

## Summary

`0.11.9` is a focused patch release after `0.11.8` that hardens deep-interview / ralplan coordination, repairs setup behavior around Codex-managed TUI configs, and keeps live worker supervision / HUD state visibility aligned with active sessions.

## Included fixes and changes

- deep-interview lock state now suppresses fallback tmux-pane nudges
- planning handoff applies stronger deep-interview pressure before execution
- live ralplan consensus planning exposes observable runtime state for HUD / pipeline visibility
- setup no longer rebreaks Codex-managed TUI configs, and default explore-routing guidance stays aligned with setup adoption
- active stateful modes are visible in the HUD again during live sessions
- fallback orchestration stays alive while live team workers remain active
- team flows auto-accept the Claude bypass prompt when required
- the shipped analyze skill now follows the OmC trace methodology with restored execution-policy contract wording
- release metadata is bumped to `0.11.9` across Node and Cargo packages

## Verification evidence

### Targeted release regression suite

- `npm run build` ✅
- `npm run lint` ✅
- `npm run check:no-unused` ✅
- `node --test --test-reporter=spec dist/cli/__tests__/version-sync-contract.test.js` ✅
- `node --test --test-reporter=spec dist/cli/__tests__/setup-refresh.test.js dist/cli/__tests__/setup-scope.test.js dist/cli/__tests__/doctor-warning-copy.test.js` ✅
- `node --test --test-reporter=spec dist/hooks/__tests__/explore-routing.test.js dist/hooks/__tests__/explore-sparkshell-guidance-contract.test.js dist/hooks/__tests__/deep-interview-contract.test.js dist/hooks/__tests__/notify-fallback-watcher.test.js dist/hooks/__tests__/notify-hook-auto-nudge.test.js dist/hooks/__tests__/agents-overlay.test.js` ✅
- `node --test --test-reporter=spec dist/hud/__tests__/index.test.js dist/hud/__tests__/render.test.js dist/hud/__tests__/state.test.js` ✅
- `node --test --test-reporter=spec dist/pipeline/__tests__/stages.test.js dist/ralplan/__tests__/runtime.test.js` ✅

## Remaining risk

- This release verification is intentionally targeted to the post-`0.11.8` surfaces that changed; it is not a full GitHub Actions matrix rerun.
- Future nudge entrypoints must preserve the same deep-interview lock suppression check to keep the behavior consistent.
- Future HUD / pipeline readers should preserve the new ralplan runtime field names if they depend on the live observability surface.
