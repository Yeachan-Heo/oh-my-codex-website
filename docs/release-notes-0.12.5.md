# Release notes — 0.12.5

## Summary

`0.12.5` is a broad stability patch across 25 PRs (74 files changed). It resolves a cluster of inter-related session-scoping, team startup/shutdown, Windows worker-path, and tmux cwd bugs that accumulated since `0.12.4`, introduces current-task baseline branch guardrails for team workers, and tightens multi-workflow state management.

## Highlights

- **Multi-skill planning state preserved** — `ralplan`/`ralph` planning state is no longer dropped when a mixed-workflow prompt is re-routed mid-flight. This was a silent regression where `ralPlan`/deep-interview state would be wiped on the second routing pass of a compound skill prompt. Fixed by PR [#1471](https://github.com/Yeachan-Heo/oh-my-codex/pull/1471).
- **Team startup recovery** — workers that stall early during boot no longer hang the entire team launch sequence. The runtime now detects stall conditions and falls back to recoverable state instead of deadlocking. Fixed by PR [#1444](https://github.com/Yeachan-Heo/oh-my-codex/pull/1444).
- **Windows reliability cluster** — four independent Windows fixes land together: stale leader-pane shutdown targeting (#1470), psmux worker launcher path resolution (#1469), MCP orphan cleanup on parent exit (#1437), and retired-MCP-config repair on upgrade (#1436).
- **tmux/shell cwd correctness** — detached tmux panes, supported-shell worker launches, and Homebrew zsh paths now all honour the requested working directory. Fixes a long-standing class of "worker starts in wrong directory" bugs (#1468, #1460, #1462).
- **HUD and session anchoring** — HUD state is now strictly scoped to the active OMX session; native session-id drift no longer causes transport failures to silently disappear from the HUD (#1453, #1458).
- **Ralph stop-hook session isolation** — stop-hook leakage across sessions is eliminated. The stop hook now validates session authority before gating (#1466, issue #1461).
- **Current-task baseline guardrails** — new per-task baseline branch tracking keeps team workers anchored to their correct starting commit, preventing branch-skew during long-running tasks (#1419, issue #1407).

## Included fixes and changes

### Added
- Current-task baseline branch guardrails for team workers (PR [#1419](https://github.com/Yeachan-Heo/oh-my-codex/pull/1419), issue [#1407](https://github.com/Yeachan-Heo/oh-my-codex/issues/1407))
- Approved multi-workflow overlap support in canonical state without corrupting session visibility (PR [#1427](https://github.com/Yeachan-Heo/oh-my-codex/pull/1427))
- Windows `ps` fallback for notify hooks on systems without native `ps` (PR [#1457](https://github.com/Yeachan-Heo/oh-my-codex/pull/1457))

### Fixed — Team startup / shutdown
- Stalled-worker startup no longer hangs team boot (PR [#1444](https://github.com/Yeachan-Heo/oh-my-codex/pull/1444))
- Cross-session stale root team Stop blocking eliminated (PR [#1451](https://github.com/Yeachan-Heo/oh-my-codex/pull/1451))
- Linux tmux startup handoff and shutdown-state persistence (PR [#1438](https://github.com/Yeachan-Heo/oh-my-codex/pull/1438))
- `session.json` ownership and fallback semantics tightened; stale pointers can no longer revive the wrong runtime state (PR [#1447](https://github.com/Yeachan-Heo/oh-my-codex/pull/1447))

### Fixed — Multi-skill / workflow state
- Planning state preserved in mixed workflow prompt routing (PR [#1471](https://github.com/Yeachan-Heo/oh-my-codex/pull/1471), issue [#1353](https://github.com/Yeachan-Heo/oh-my-codex/issues/1353))
- Workflow handoff correctness: malformed state rejected during reconciliation; stale state no longer blocks real handoffs (PR [#1442](https://github.com/Yeachan-Heo/oh-my-codex/pull/1442))
- Flaky hook and HUD state scope resolved; CI-aligned session-scoped hook contract enforced (PR [#1446](https://github.com/Yeachan-Heo/oh-my-codex/pull/1446))

### Fixed — Windows
- Split-pane shutdown: stale leader-pane ID no longer misdirects shutdown signals (PR [#1470](https://github.com/Yeachan-Heo/oh-my-codex/pull/1470), issue [#1353](https://github.com/Yeachan-Heo/oh-my-codex/issues/1353))
- Native psmux worker startup: workers now start on the resolved Codex launcher path (PR [#1469](https://github.com/Yeachan-Heo/oh-my-codex/pull/1469), issue [#1361](https://github.com/Yeachan-Heo/oh-my-codex/issues/1361))
- MCP orphan cleanup: Windows MCP child processes no longer survive parent shutdown (PR [#1437](https://github.com/Yeachan-Heo/oh-my-codex/pull/1437), issue [#1435](https://github.com/Yeachan-Heo/oh-my-codex/issues/1435))
- Retired team MCP config repair: `omx doctor` and launch path realign retired entries on upgrade (PR [#1436](https://github.com/Yeachan-Heo/oh-my-codex/pull/1436))

### Fixed — tmux / macOS / shell
- Detached tmux launch cwd: panes now start in the requested directory (PR [#1468](https://github.com/Yeachan-Heo/oh-my-codex/pull/1468), issue [#1374](https://github.com/Yeachan-Heo/oh-my-codex/issues/1374))
- Worker cwd preserved on supported-shell launches (zsh, bash) (PR [#1460](https://github.com/Yeachan-Heo/oh-my-codex/pull/1460))
- Homebrew zsh normalization on macOS: paths normalized before tmux pane launch (PR [#1462](https://github.com/Yeachan-Heo/oh-my-codex/pull/1462), issue [#1439](https://github.com/Yeachan-Heo/oh-my-codex/issues/1439))
- tmux startup PID resolution hardened; copy-mode cleaned up after attach (PR [#1459](https://github.com/Yeachan-Heo/oh-my-codex/pull/1459))

### Fixed — HUD / session anchoring
- HUD state anchored to active OMX session; cross-session HUD drift eliminated (PR [#1453](https://github.com/Yeachan-Heo/oh-my-codex/pull/1453))
- Native session-id drift no longer hides team transport failures from HUD (PR [#1458](https://github.com/Yeachan-Heo/oh-my-codex/pull/1458))

### Fixed — deep-interview
- Stop auto-continuation no longer fires during the deep-interview intent-first questioning phase; that phase is now treated as planning for native stall detection instead of forcing continuation. (PR [#1473](https://github.com/Yeachan-Heo/oh-my-codex/pull/1473), issue [#1472](https://github.com/Yeachan-Heo/oh-my-codex/issues/1472))

### Fixed — Explore harness
- `omx explore` now emits a clear actionable error when cargo is a rustup shim with no default toolchain configured, instead of surfacing the raw rustup error. Users are directed to `rustup default stable`, `OMX_EXPLORE_BIN`, or `omx doctor`. (`src/cli/explore.ts`)

### Fixed — Hooks / auth / notify
- Ralph stop-hook leakage across sessions eliminated; session authority enforced before gating (PR [#1466](https://github.com/Yeachan-Heo/oh-my-codex/pull/1466), issue [#1461](https://github.com/Yeachan-Heo/oh-my-codex/issues/1461))
- Auto-nudge authorization leaks: read-only and planning flows no longer receive full-execution nudges (PR [#1434](https://github.com/Yeachan-Heo/oh-my-codex/pull/1434), issue [#1416](https://github.com/Yeachan-Heo/oh-my-codex/issues/1416))
- Notify hooks stay tracking live teams through coarse state drift (PR [#1428](https://github.com/Yeachan-Heo/oh-my-codex/pull/1428))
- Launcher-backed MCP restart stalls bounded (PR [#1408](https://github.com/Yeachan-Heo/oh-my-codex/pull/1408))

### Docs
- Removed stale `prompts/` invocation guidance from README (PR [#1417](https://github.com/Yeachan-Heo/oh-my-codex/pull/1417))

## Verification evidence

- `npm run build` ✅
- `npm run lint` ✅
- `npm test` ✅
- `node --test dist/cli/__tests__/version-sync-contract.test.js` ✅
- `npm run smoke:packed-install` ✅
