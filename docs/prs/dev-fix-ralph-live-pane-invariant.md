# PR Draft: Preserve verified Ralph pane anchors and avoid tmux-hook target drift

## Target branch
`dev`

## Summary
This follow-up fixes pane rebinding drift in the managed tmux recovery paths that showed up during review of the Ralph resume / continue work.

The main issue was stored-pane drift. Once a Ralph pane anchor had already been verified as part of the correct managed session, recovery could still rescan the whole tmux session and rebind to whichever Codex pane was currently focused, or fall back to a shell-degraded pane that only historically started as Codex. In multi-pane Codex sessions that could silently move future watcher or auto-nudge injections onto the wrong lane.

On current `dev`, the pre-guard tmux-hook target drift path is already absent in production code. This branch keeps that invariant covered with a focused regression so the repo-scoped session target does not get rewritten on skipped turns.

## Changes
- split managed-pane heuristics so `TMUX_PANE` detection can stay permissive while stored-anchor retention stays strict
- keep the verified anchor pane in `resolveManagedPaneFromAnchor()` only when it still looks like a live Codex-managed pane instead of a shell that merely started as Codex, while still retaining a verified anchor on transient command-state lookup failure
- teach the Ralph continue watcher to re-resolve stored pane anchors against the current managed session before sending continue nudges
- only rescan the tmux session when the anchor is gone or no longer looks agent-owned, and fail closed when no live managed sibling exists
- add regressions for the direct managed-pane helper, watcher rebinding behavior, auto-nudge anchor retention / node-shell upgrade paths, and pre-guard config-drift handling

## Why this is good
- prevents Ralph continue / resume state from jumping between Codex panes just because focus changed
- keeps watcher and auto-nudge behavior aligned with the stored managed anchor contract
- keeps the current `dev` pre-guard skip invariant locked by test so repo-scoped session targets do not drift back to pane ids
- makes watcher recovery follow the same live-anchor contract as notify-hook / auto-nudge

## Validation
- [x] `npx biome lint src/scripts/notify-hook/managed-tmux.ts src/scripts/notify-fallback-watcher.ts src/scripts/notify-hook/auto-nudge.ts src/hooks/__tests__/notify-hook-managed-tmux.test.ts src/hooks/__tests__/notify-hook-tmux-heal.test.ts src/hooks/__tests__/notify-fallback-watcher.test.ts src/hooks/__tests__/notify-hook-auto-nudge.test.ts docs/prs/dev-fix-ralph-live-pane-invariant.md`
- [x] `npm run build`
- [x] `node --test dist/hooks/__tests__/notify-fallback-watcher.test.js dist/hooks/__tests__/notify-hook-auto-nudge.test.js dist/hooks/__tests__/notify-hook-managed-tmux.test.js dist/hooks/__tests__/notify-hook-tmux-heal.test.js`

## Related
- follow-up to the Ralph resume / managed tmux healing review pass
