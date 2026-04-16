# Release notes — 0.12.1

## Summary

`0.12.1` is the accumulated `v0.12.0..v0.12.1` patch train: clean machine-readable team status output, correct interactive worker PID metadata, launch-safe orphan cleanup, direct-launch follow-through, notify-fallback watcher hardening, tighter operator guidance, and synchronized `0.12.1` release collateral.

## Included fixes and changes

- leader mailbox pruning no longer replays duplicate delivered-message bridge calls, so `omx team status --json` stays parseable
- interactive team worker metadata now records the PID from the resolved pane id and persists it into config/identity state
- orphaned OMX MCP cleanup now preserves the live launcher/session tree
- fallback watcher once-mode logs rotate instead of growing silently
- leader launches now default to direct mode outside tmux unless detached tmux is explicitly requested
- release metadata and collateral are aligned to `0.12.1` across Node, Cargo, changelog, release body, and release-readiness docs

## Verification evidence

- `npm run build` ✅
- `npx biome lint src/cli/index.ts src/cli/cleanup.ts src/cli/__tests__/index.test.ts src/cli/__tests__/cleanup.test.ts src/scripts/notify-fallback-watcher.ts src/hooks/__tests__/notify-fallback-watcher.test.ts src/team/runtime.ts src/team/state/mailbox.ts src/team/__tests__/runtime.test.ts src/team/__tests__/state.test.ts package.json` ✅
- `node --test dist/cli/__tests__/cleanup.test.js dist/cli/__tests__/index.test.js dist/cli/__tests__/version-sync-contract.test.js` ✅
- `node --test dist/hooks/__tests__/notify-fallback-watcher.test.js` ✅
- `node --test dist/team/__tests__/state.test.js dist/team/__tests__/runtime.test.js` ✅
- `npm run smoke:packed-install` ✅

## Remaining risk

- This is a local verification pass, not a full CI matrix rerun.
- Post-release monitoring should keep an eye on team status JSON output, interactive worker lifecycle telemetry, and notify-fallback behavior.
