# Release notes — 0.12.2

## Summary

`0.12.2` is the accumulated `v0.12.1..v0.12.2` patch train: native Windows + psmux team worker boot and shutdown safety, postLaunch mode-state shutdown-race recovery, canonical HUD skill-state visibility across HUD/overlay/keyword-detector/MCP state, team state preservation on monitor-driven runtime-cli exits, and synchronized `0.12.2` release collateral.

## Included fixes and changes

- native Windows + psmux split-pane shutdown preserves the leader pane by skipping process-tree prekill when leader/client ancestry overlaps (#1358)
- `postLaunch` mode-state cleanup now recovers empty or truncated shutdown-race JSON into a minimal inactive record, while structurally complete malformed JSON is warned and left untouched (#1360)
- native Windows team worker panes boot through an encoded PowerShell command with env + PATH bootstrap instead of POSIX `/bin/sh -lc`, so workers actually report ready (#1362)
- HUD workflow visibility is canonicalized through session-scoped skill-active state across HUD, overlay, keyword activation, and MCP state; stale root-only mode badges no longer outlive their session, and legacy single-skill readers remain compatible (#1367)
- monitor-detected terminal and failure conditions in `runtime-cli` stay on the report-only path, so team state is preserved until operators explicitly request shutdown (#1369)
- release metadata and collateral are aligned to `0.12.2` across Node, Cargo, changelog, release body, and release-readiness docs

## Verification evidence

- `npm run build` ✅
- `npm run lint` ✅
- `npm test` ✅
- `npm run smoke:packed-install` ✅

## Remaining risk

- This is a local verification pass, not a full CI matrix rerun.
- The Windows-specific fixes (#1358, #1362) ship without a live native Windows 11 + psmux smoke run; post-release monitoring should track native Windows team worker boot and split-pane shutdown telemetry.
- The HUD canonicalization change (#1367) touches several visibility surfaces at once; post-release monitoring should watch for drift in legacy single-skill readers and multi-workflow badge rendering.
