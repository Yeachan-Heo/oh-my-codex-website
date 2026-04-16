# Release notes — 0.12.6

## Summary

`0.12.6` is the `v0.12.5..v0.12.6` patch train: 32 PR merges focused on wiki-first knowledge workflows, notification and hook delivery hardening, dirty-worktree and approval-flow reliability, plus new automation that closes explicitly linked issues after `dev` merges.

## Highlights

- **OMX wiki becomes a first-class workflow** — this release adds a local markdown wiki with CLI/MCP parity, query/lint/refresh flows, storage and ingest primitives, and explore integration that can inject wiki context before broader repository search (#1481).
- **Session visibility and notification hardening** — reply-listener/session-status state, lifecycle dedupe, idle cooldown, and tmux notification behavior are all tightened so live session state is clearer and less noisy (#1495, #1518, #1520, #1527, #1538).
- **Hook and team-delivery reliability** — native-hook, notify-hook dispatch, leader nudge, managed tmux, fallback watcher, and startup/runtime paths received another stabilization pass to reduce stale state, duplicate nudges, and mailbox/delivery races (#1487, #1491, #1493, #1496, #1514, #1525).
- **Launch and operator safety** — dirty worktree launch handling now warns before reuse but still preserves hard failure outside the caution flow, while Claude issue sessions can proceed through obvious repository reads without stalling for unnecessary approval prompts (#1532, #1536).
- **Dev merge issue auto-close** — merged PRs into `dev` can now automatically close explicitly linked local issues with a maintainer comment, tightening the dev→issue workflow (#1541).

## Included fixes and changes

### Added
- **OMX wiki workflow and storage** — local wiki pages, index/log management, query/lint/refresh helpers, wiki MCP server + CLI parity, and wiki-aware explore fallback behavior. (PR [#1481](https://github.com/Yeachan-Heo/oh-my-codex/pull/1481))
- **Discord job-control primitive** — tracked OMX Discord sessions now support a safe first control layer plus better session/message reuse handling. (PR [#1530](https://github.com/Yeachan-Heo/oh-my-codex/pull/1530), issue [#1528](https://github.com/Yeachan-Heo/oh-my-codex/issues/1528))
- **Dev merge issue auto-close workflow** — merged `dev` PRs can close explicitly linked repo issues automatically after merge. (PR [#1541](https://github.com/Yeachan-Heo/oh-my-codex/pull/1541), issue [#1540](https://github.com/Yeachan-Heo/oh-my-codex/issues/1540))

### Fixed — Hooks / notifications / session state
- **Array-backed assistant prompts now trigger needs-input watching correctly.** (PR [#1487](https://github.com/Yeachan-Heo/oh-my-codex/pull/1487), issue [#1486](https://github.com/Yeachan-Heo/oh-my-codex/issues/1486))
- **Local worker runtime startup no longer stalls behind stale queued drafts or misleading scrollback.** (PRs [#1491](https://github.com/Yeachan-Heo/oh-my-codex/pull/1491), [#1493](https://github.com/Yeachan-Heo/oh-my-codex/pull/1493), issue [#1490](https://github.com/Yeachan-Heo/oh-my-codex/issues/1490), issue [#1492](https://github.com/Yeachan-Heo/oh-my-codex/issues/1492))
- **Hook cwd alias mismatches no longer break managed-session logic or ownership tracking.** (PR [#1495](https://github.com/Yeachan-Heo/oh-my-codex/pull/1495))
- **Ralph steer/handoff and release-readiness finalize logic stay scoped and non-sticky across sessions.** (PRs [#1496](https://github.com/Yeachan-Heo/oh-my-codex/pull/1496), [#1514](https://github.com/Yeachan-Heo/oh-my-codex/pull/1514), issue [#1494](https://github.com/Yeachan-Heo/oh-my-codex/issues/1494), issue [#1513](https://github.com/Yeachan-Heo/oh-my-codex/issues/1513))
- **Lifecycle broadcasts, follow-up keyword alerts, metadata-derived false positives, and post-stop keyword replay are deduplicated or suppressed.** (PRs [#1518](https://github.com/Yeachan-Heo/oh-my-codex/pull/1518), [#1520](https://github.com/Yeachan-Heo/oh-my-codex/pull/1520), [#1526](https://github.com/Yeachan-Heo/oh-my-codex/pull/1526), [#1529](https://github.com/Yeachan-Heo/oh-my-codex/pull/1529), issues [#1515](https://github.com/Yeachan-Heo/oh-my-codex/issues/1515), [#1519](https://github.com/Yeachan-Heo/oh-my-codex/issues/1519), [#1525](https://github.com/Yeachan-Heo/oh-my-codex/issues/1525), [#1527](https://github.com/Yeachan-Heo/oh-my-codex/issues/1527))
- **Stale dead-session HUD residue is cleared before follow-up tooling reads it.** (PR [#1539](https://github.com/Yeachan-Heo/oh-my-codex/pull/1539), issue [#1538](https://github.com/Yeachan-Heo/oh-my-codex/issues/1538))

### Fixed — CLI / setup / launch behavior
- **Worktree dependency bootstrap** now reuses parent repo dependencies for safe launch worktrees instead of forcing fresh installs. (PR [#1510](https://github.com/Yeachan-Heo/oh-my-codex/pull/1510), issue [#1507](https://github.com/Yeachan-Heo/oh-my-codex/issues/1507))
- **Malformed native-hook stdin JSON** is handled defensively instead of cascading into runtime instability. (PR [#1504](https://github.com/Yeachan-Heo/oh-my-codex/pull/1504), issue [#1503](https://github.com/Yeachan-Heo/oh-my-codex/issues/1503))
- **User-authored AGENTS content survives setup refreshes.** (PR [#1524](https://github.com/Yeachan-Heo/oh-my-codex/pull/1524), issue [#1521](https://github.com/Yeachan-Heo/oh-my-codex/issues/1521))
- **tmux team workers preserve proxy environment access.** (PR [#1523](https://github.com/Yeachan-Heo/oh-my-codex/pull/1523), issue [#1522](https://github.com/Yeachan-Heo/oh-my-codex/issues/1522))
- **Dirty worktree caution flow** now warns on reusable dirty worktrees while still preserving hard failure semantics outside the launch caution path. (PR [#1535](https://github.com/Yeachan-Heo/oh-my-codex/pull/1535), issue [#1532](https://github.com/Yeachan-Heo/oh-my-codex/issues/1532))
- **Claude issue sessions** can continue through obvious repository reads without stalling on unnecessary approval prompts. (PR [#1537](https://github.com/Yeachan-Heo/oh-my-codex/pull/1537), issue [#1536](https://github.com/Yeachan-Heo/oh-my-codex/issues/1536))

### Fixed — MCP / wiki / app-server surfaces
- **Superseded MCP stdio siblings** no longer accumulate under live Codex app-server parents. (PR [#1517](https://github.com/Yeachan-Heo/oh-my-codex/pull/1517), issue [#1516](https://github.com/Yeachan-Heo/oh-my-codex/issues/1516))
- **State and wiki MCP parity surfaces** are now available through dedicated CLI routing and bootstrap registration. (PR [#1481](https://github.com/Yeachan-Heo/oh-my-codex/pull/1481))

### Changed
- **Release metadata sync** — Node/Cargo package metadata, lockfiles, changelog, release body, and release notes aligned to `0.12.6`.
- **README and localized docs** now document the canonical mixed OMX + Codex skill root and the new wiki workflow entry points. (PR [#1534](https://github.com/Yeachan-Heo/oh-my-codex/pull/1534), issue [#1531](https://github.com/Yeachan-Heo/oh-my-codex/issues/1531))

## Verification evidence

- `npm run build` ✅
- `npm run lint` ✅
- `npm test` ✅
- `npm run test:recent-bug-regressions` ✅
- `node --test dist/cli/__tests__/version-sync-contract.test.js` ✅
- `npm run smoke:packed-install` ✅
