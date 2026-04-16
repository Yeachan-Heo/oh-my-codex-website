# Release notes — 0.13.0

## Summary

`0.13.0` is a minor release after `0.12.6` because the shipped delta adds the new `omx adapt` foundation while also hardening Ralph/session authority, native Stop routing, HUD state binding, macOS stale polling, explore launch paths, and release/operator workflows across 56 first-parent PR merges plus the latest `dev` follow-up commit in the `v0.12.6..origin/dev` train.

## Highlights

- **`omx adapt` becomes the next persistent-target foundation** — OMX now has a first-party adapter surface for external targets, starting with OpenClaw and Hermes. Adapter artifacts stay under `.omx/adapters/<target>/...`, link to canonical planning artifacts, and report local/read-only runtime evidence without claiming a bidirectional control plane (#1600, #1599, #1598).
- **Ralph/session authority is stricter** — Ralph assignment, tmux Ralph nudges, prompt-side activation, PRD CLI semantics, and native Stop handoffs now all respect session ownership more consistently (#1604, #1608, #1591, #1590, #1611).
- **Cross-platform launch paths fail safer** — explore/codex resolution skips unusable PATH entries, handles pnpm-style POSIX shims under sandboxed PATHs, avoids Windows-to-POSIX wrapper confusion, and cleans detached leader children on signal exit (#1562, #1610, #1605).
- **Hooks, HUD, and notification state are quieter and more accurate** — live-session HUD binding, startup/dispatch regression coverage, Slack mention parsing, macOS stale-polling git-probe reduction, metadata routing, and receiving-agent ownership guidance reduce stale or user-facing noise (#1573, #1595, #1585, #1619, #1611).
- **Setup and release workflows are more explicit** — wiki setup registration, native-hook doctor coverage, dev-base contribution guidance, and dependency refreshes keep release/operator paths aligned (#1571, #1546, #1567, #1575, #1576, #1577, #1578).

## Included fixes and changes

### Added — Adapt foundations
- `omx adapt <target> <probe|status|init|envelope|doctor>` exposes an OMX-owned adapter surface for persistent external targets. (PR [#1600](https://github.com/Yeachan-Heo/oh-my-codex/pull/1600))
- OpenClaw adaptation observes local config, gateway, hook mapping, and lifecycle bridge evidence while preserving command-gateway opt-in gates. (PR [#1599](https://github.com/Yeachan-Heo/oh-my-codex/pull/1599))
- Hermes adaptation reads ACP, gateway, persistent-session, and bootstrap evidence while keeping writes under adapter-owned OMX paths. (PR [#1598](https://github.com/Yeachan-Heo/oh-my-codex/pull/1598))

### Fixed — Ralph / runtime authority / workflow semantics
- Ralph assignment no longer leaks across concurrent OMX sessions. (PR [#1604](https://github.com/Yeachan-Heo/oh-my-codex/pull/1604))
- Prompt-side `$ralph` activation is explicitly distinct from the PRD-gated `omx ralph --prd ...` CLI startup path. (PR [#1608](https://github.com/Yeachan-Heo/oh-my-codex/pull/1608))
- Tmux Ralph nudges now validate canonical session workflow state before acting. (PR [#1591](https://github.com/Yeachan-Heo/oh-my-codex/pull/1591))
- Native Stop resumes permission-seeking handoffs and remains stable across session-id drift. (PR [#1590](https://github.com/Yeachan-Heo/oh-my-codex/pull/1590), direct commit `4377e1e`)
- Native hook metadata no longer hijacks routing intended for real user prompts. (PR [#1611](https://github.com/Yeachan-Heo/oh-my-codex/pull/1611))
- Resumed MCP state writers survive duplicate reconcile/self-teardown paths. (PR [#1596](https://github.com/Yeachan-Heo/oh-my-codex/pull/1596))

### Fixed — Launch / platform / worktree safety
- `omx explore` now skips unusable node PATH entries and resolves sandboxed POSIX Codex shims correctly. (PRs [#1562](https://github.com/Yeachan-Heo/oh-my-codex/pull/1562), [#1610](https://github.com/Yeachan-Heo/oh-my-codex/pull/1610))
- Windows explore fails closed before POSIX allowlist fallback can run against Windows paths. (direct commit `72b1e5d`)
- Detached leader signal exits terminate their Codex child processes and carry regression coverage. (PR [#1605](https://github.com/Yeachan-Heo/oh-my-codex/pull/1605))
- Windows OMX cleanup discovers real orphaned servers again. (PR [#1589](https://github.com/Yeachan-Heo/oh-my-codex/pull/1589))
- Detached team startup tolerates stale missing worktree records. (PR [#1582](https://github.com/Yeachan-Heo/oh-my-codex/pull/1582))

### Fixed — Hooks / HUD / notifications
- HUD state stays anchored to the live OMX session instead of stale/root fallback. (PR [#1573](https://github.com/Yeachan-Heo/oh-my-codex/pull/1573))
- Leader stale polling now reduces repeated git probes on macOS, lowering high-CPU churn during long-running sessions. (PR [#1619](https://github.com/Yeachan-Heo/oh-my-codex/pull/1619))
- Queued Codex startup banner and inbox dispatch behavior is locked behind regression coverage. (PR [#1595](https://github.com/Yeachan-Heo/oh-my-codex/pull/1595))
- Slack mention env parsing has dedicated notification coverage. (PR [#1585](https://github.com/Yeachan-Heo/oh-my-codex/pull/1585))
- Safe reversible OMX/runtime work is now treated as receiving-agent owned work in generated guidance. (direct commit `76e808e`)

### Fixed — Setup / docs / release workflow
- Wiki setup registration now stays aligned with shipped assets. (PR [#1571](https://github.com/Yeachan-Heo/oh-my-codex/pull/1571))
- Native hook doctor/config checks surface missing coverage before users mistake config drift for OMX breakage. (PR [#1546](https://github.com/Yeachan-Heo/oh-my-codex/pull/1546))
- Normal contributor guidance now makes `dev` the explicit PR base. (PR [#1567](https://github.com/Yeachan-Heo/oh-my-codex/pull/1567))

### Changed
- Release workflow/tooling dependencies were refreshed: `actions/github-script@9`, `softprops/action-gh-release@3`, `@types/node@25.6.0`, and `@biomejs/biome@2.4.11`. (PRs [#1575](https://github.com/Yeachan-Heo/oh-my-codex/pull/1575), [#1576](https://github.com/Yeachan-Heo/oh-my-codex/pull/1576), [#1577](https://github.com/Yeachan-Heo/oh-my-codex/pull/1577), [#1578](https://github.com/Yeachan-Heo/oh-my-codex/pull/1578))
- Node/Cargo package metadata, lockfiles, changelog, release body, and release notes are aligned to `0.13.0`.

## Why this is a minor release

- It adds a new user-facing `omx adapt` CLI surface and target-specific adapter foundations rather than only patch-level fixes.
- The release train is broad: 56 first-parent PR merges in `v0.12.6..origin/dev`, with 99 files changed relative to the main `v0.12.6` tag.
- Runtime ownership, native hook/Stop behavior, and cross-platform launch safety changed in operator-visible ways.

## Verification evidence

Release verification evidence is recorded in `docs/qa/release-readiness-0.13.0.md`.

- `npm run build` ✅
- `npm run lint` ✅
- `npm test` ✅
- `npm run test:recent-bug-regressions` ✅
- `node --test dist/cli/__tests__/version-sync-contract.test.js` ✅
- `npm run smoke:packed-install` ✅

## Remaining risk

- This is a local release-readiness pass, not a full GitHub Actions matrix rerun.
- `omx adapt` is intentionally a thin, local-evidence foundation; downstream Hermes/OpenClaw runtime acceptance remains post-release observation territory.
- The release touches native hooks, Ralph/session scoping, Windows/explore launch paths, and notification/HUD state together, so post-release monitoring should focus on long-running OMX sessions and mixed tmux/non-tmux environments.
