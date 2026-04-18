# Release notes — 0.13.2

## Summary

`0.13.2` is a patch release after `0.13.1` focused on security hardening, persistent-hook and Stop-handling correctness, Ralph activation and recovery safety, explore reentry guards, worker runtime identity preservation, skill UX refinements, and release-workflow metadata polish.

## Fixed

### Security / hardening
- **Path traversal in identifier handling** — validated identifiers before they reach team/session joins and closed the parent path-traversal surface. (PRs [#1658](https://github.com/Yeachan-Heo/oh-my-codex/pull/1658), [#1674](https://github.com/Yeachan-Heo/oh-my-codex/pull/1674), issue [#1650](https://github.com/Yeachan-Heo/oh-my-codex/issues/1650))
- **HUD shell and regex injection** — async `execFile` replaces synchronous `execFileSync` in leader git polling, and git helpers now reject shell/regex metacharacters. (PRs [#1662](https://github.com/Yeachan-Heo/oh-my-codex/pull/1662), [#1652](https://github.com/Yeachan-Heo/oh-my-codex/pull/1652))
- **Reply acknowledgement redaction** — notification reply acknowledgements no longer leak quoted or multi-part secrets. (PR [#1670](https://github.com/Yeachan-Heo/oh-my-codex/pull/1670))
- **Transitive dependency CVEs** — `npm audit fix` applied to patch transitive dependencies. (PR [#1669](https://github.com/Yeachan-Heo/oh-my-codex/pull/1669))

### Stop / persistent hooks
- **Native Stop auto-nudge persistence** — native Stop auto-nudge runs without being gated by the OMX runtime, while active OMX workflows still block Stop until they truly finish. (PR [#1707](https://github.com/Yeachan-Heo/oh-my-codex/pull/1707))

### Ralph / runtime authority
- **Conversational Ralph mention gating** — casual mentions of Ralph in conversation no longer seed workflow state. (PR [#1697](https://github.com/Yeachan-Heo/oh-my-codex/pull/1697), issue [#1696](https://github.com/Yeachan-Heo/oh-my-codex/issues/1696))
- **Ralph continuation recovery** — Ralph stays visibly active across continuation recovery. (PR [#1681](https://github.com/Yeachan-Heo/oh-my-codex/pull/1681), issue [#1677](https://github.com/Yeachan-Heo/oh-my-codex/issues/1677))
- **Ralph steer-lock retry cap** — `withRalphSteerLock` retries are capped against unbounded stale-lock loops. (PR [#1663](https://github.com/Yeachan-Heo/oh-my-codex/pull/1663))
- **Worker runtime identity** — worker runtime role identity survives startup and scaling. (PR [#1676](https://github.com/Yeachan-Heo/oh-my-codex/pull/1676))

### Explore / launch safety
- **Explore shell-startup re-entry fail-closed** — `omx explore` fails closed on shell-startup re-entry. (PR [#1700](https://github.com/Yeachan-Heo/oh-my-codex/pull/1700), issue [#1698](https://github.com/Yeachan-Heo/oh-my-codex/issues/1698))
- **Explore allowlist wrapper self-resolution** — `omx explore` allowlist wrappers no longer recurse into themselves. (PR [#1695](https://github.com/Yeachan-Heo/oh-my-codex/pull/1695), issue [#1692](https://github.com/Yeachan-Heo/oh-my-codex/issues/1692))

### Hooks / notifications / session state
- **Forked notify-hook routing** — forked notify-hook activity stays attached to the active fork session. (PR [#1680](https://github.com/Yeachan-Heo/oh-my-codex/pull/1680), issue [#1679](https://github.com/Yeachan-Heo/oh-my-codex/issues/1679))
- **Stale watcher PID reuse** — notify-fallback-watcher verifies process identity before reaping stale PIDs. (PR [#1672](https://github.com/Yeachan-Heo/oh-my-codex/pull/1672), issue [#1657](https://github.com/Yeachan-Heo/oh-my-codex/issues/1657))
- **tmux extended-keys stale lock recovery** — tmux extended-keys lease lock recovers from stale holders. (PR [#1668](https://github.com/Yeachan-Heo/oh-my-codex/pull/1668), issue [#1655](https://github.com/Yeachan-Heo/oh-my-codex/issues/1655))
- **MCP duplicate sibling cleanup** — post-traffic duplicate MCP siblings self-exit after extended idle. (PR [#1666](https://github.com/Yeachan-Heo/oh-my-codex/pull/1666))
- **Project-root discovery** — OMX resolves the project root by walking to `.omx` instead of a hardcoded depth. (PR [#1664](https://github.com/Yeachan-Heo/oh-my-codex/pull/1664))
- **AGENTS.md preservation on setup refresh** — local `AGENTS.md` content is preserved during auto-update refresh. (PR [#1673](https://github.com/Yeachan-Heo/oh-my-codex/pull/1673), issue [#1671](https://github.com/Yeachan-Heo/oh-my-codex/issues/1671))
- **Fresh-session context isolation** — new sessions are isolated from stale task-scoped startup context. (PR [#1634](https://github.com/Yeachan-Heo/oh-my-codex/pull/1634), issue [#1624](https://github.com/Yeachan-Heo/oh-my-codex/issues/1624))

### HUD / worker startup
- **Canonical team phase over stale HUD** — HUD prefers canonical team phase over stale startup state. (PR [#1646](https://github.com/Yeachan-Heo/oh-my-codex/pull/1646))
- **Wiki Unicode slug preservation** — `wiki.titleToSlug` preserves Unicode characters. (PR [#1645](https://github.com/Yeachan-Heo/oh-my-codex/pull/1645))
- **Worker shell startup command quoting** — `processSpec.command` is properly quoted during worker shell startup. (PR [#1644](https://github.com/Yeachan-Heo/oh-my-codex/pull/1644))

### Release workflow / docs
- **Release contributor metadata range** — release contributor metadata stays aligned with the actual release commit range. (PR [#1639](https://github.com/Yeachan-Heo/oh-my-codex/pull/1639), issue [#1623](https://github.com/Yeachan-Heo/oh-my-codex/issues/1623))
- **Doctor readiness clarity** — doctor output clarifies when setup is done versus when Codex can really run. (PR [#1630](https://github.com/Yeachan-Heo/oh-my-codex/pull/1630), issue [#1626](https://github.com/Yeachan-Heo/oh-my-codex/issues/1626))

## Added
- **Analyze skill revival** — the `analyze` skill returns as a read-only, truth-telling investigation surface. (PR [#1687](https://github.com/Yeachan-Heo/oh-my-codex/pull/1687))
- **OMX skill display prefix** — OMX-installed skills are marked in `/skills` without being renamed. (PR [#1686](https://github.com/Yeachan-Heo/oh-my-codex/pull/1686))
- **Shift+Enter tmux triage docs** — documented Shift+Enter newline behavior for tmux triage. (PR [#1683](https://github.com/Yeachan-Heo/oh-my-codex/pull/1683), issue [#1682](https://github.com/Yeachan-Heo/oh-my-codex/issues/1682))

## Verification evidence

Release verification evidence is recorded in `docs/qa/release-readiness-0.13.2.md`.

- `npm run build` ✅
- `npm run lint` ✅
- `npx tsc --noEmit` ✅

## Remaining risk

- The release packs ~25 merged PRs across security, runtime, notifications, and HUD surfaces; the strongest evidence is focused per-PR regression coverage that was added alongside each fix plus a local build+lint+typecheck pass.
- Full GitHub Actions matrix validation is delegated to the tag-triggered release workflow.
