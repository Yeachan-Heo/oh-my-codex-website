# Release notes — 0.15.1

## Summary

`0.15.1` is a patch release for the `0.15.x` train focused on direct/non-tmux leader launch controls, passive read-only state operations, concrete repo-aware Team DAG dependency remapping, setup/plugin-mode recovery, audited exec follow-ups, and runtime/hook reliability fixes.

## Highlights

- `omx --direct` and `OMX_LAUNCH_POLICY=direct|tmux|detached-tmux|auto` make leader launch policy explicit and operator-controllable.
- State read/list/status operations are passive and no longer initialize `.omx/state` or tmux-hook config as a read side effect.
- Repo-aware Team DAG handoffs now remap symbolic dependencies to concrete task IDs after task creation and patch runtime task dependency fields before worker inbox/bootstrap generation.
- Setup/plugin-mode paths preserve explicit choices, restore explicit legacy mode, archive stale legacy assets safely, and wire plugin marketplace discovery.
- Runtime/hook fixes improve canonical Stop lifecycle reads, MCP state persistence after transport disconnects, prompt resume PID handling, hook diagnostic false positives, and macOS startup polling behavior.

## Compatibility

- Default supported interactive launches remain detached-tmux managed. Use `omx --direct` or `OMX_LAUNCH_POLICY=direct` to bypass tmux/HUD management, or `OMX_LAUNCH_POLICY=tmux|detached-tmux` to force tmux-managed startup.
- Existing model overrides and setup install-mode choices remain respected.
- No release tag or npm publication is performed as part of this preparation step.

## Verification

Release verification evidence is recorded in `docs/qa/release-readiness-0.15.1.md`.
