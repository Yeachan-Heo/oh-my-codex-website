# Release Readiness Verdict - 0.13.2

Date: **2026-04-18**
Target version: **0.13.2**
Comparison base: **`v0.13.1..origin/dev`**
Verdict: **GO** ✅

`0.13.2` is a patch release after `0.13.1` covering security hardening, persistent-hook and Stop-handling correctness, Ralph activation and recovery safety, explore reentry guards, worker runtime identity preservation, skill UX refinements, and release-workflow metadata polish. Around 25 merged PRs are included.

## Scope reviewed

### Security / hardening
- Identifier path validation and path-traversal closure (`src/team/**`, PRs [#1658](https://github.com/Yeachan-Heo/oh-my-codex/pull/1658), [#1674](https://github.com/Yeachan-Heo/oh-my-codex/pull/1674))
- HUD git helper shell/regex injection and async `execFile` migration (`src/hud/**`, PRs [#1662](https://github.com/Yeachan-Heo/oh-my-codex/pull/1662), [#1652](https://github.com/Yeachan-Heo/oh-my-codex/pull/1652))
- Reply-listener acknowledgement redaction (`src/notifications/reply-listener.ts`, PR [#1670](https://github.com/Yeachan-Heo/oh-my-codex/pull/1670))
- Transitive dependency CVE patches (`package-lock.json`, PR [#1669](https://github.com/Yeachan-Heo/oh-my-codex/pull/1669))

### Stop / persistent hooks / Ralph authority
- Native Stop auto-nudge + OMX workflow gating (`src/scripts/codex-native-hook.ts`, PR [#1707](https://github.com/Yeachan-Heo/oh-my-codex/pull/1707))
- Conversational Ralph activation gating (PR [#1697](https://github.com/Yeachan-Heo/oh-my-codex/pull/1697))
- Ralph continuation recovery + cooldown-state cleanup (PR [#1681](https://github.com/Yeachan-Heo/oh-my-codex/pull/1681))
- Ralph steer-lock retry cap (PR [#1663](https://github.com/Yeachan-Heo/oh-my-codex/pull/1663))
- Worker runtime role identity preservation and verification path (`src/team/runtime.ts`, `src/team/scaling.ts`, PR [#1676](https://github.com/Yeachan-Heo/oh-my-codex/pull/1676))

### Explore / launch safety
- Explore shell-startup re-entry fail-closed (PR [#1700](https://github.com/Yeachan-Heo/oh-my-codex/pull/1700))
- Explore allowlist wrapper self-resolution fix (PR [#1695](https://github.com/Yeachan-Heo/oh-my-codex/pull/1695))

### Hooks / notifications / session state
- Forked notify-hook routing (PR [#1680](https://github.com/Yeachan-Heo/oh-my-codex/pull/1680))
- Notify-fallback-watcher PID reuse / liveness (PR [#1672](https://github.com/Yeachan-Heo/oh-my-codex/pull/1672))
- tmux extended-keys stale-lock recovery (PR [#1668](https://github.com/Yeachan-Heo/oh-my-codex/pull/1668))
- MCP duplicate-sibling cleanup (PR [#1666](https://github.com/Yeachan-Heo/oh-my-codex/pull/1666))
- Project-root discovery (PR [#1664](https://github.com/Yeachan-Heo/oh-my-codex/pull/1664))
- AGENTS.md preservation during auto-update (PR [#1673](https://github.com/Yeachan-Heo/oh-my-codex/pull/1673))
- Fresh-session context isolation (PR [#1634](https://github.com/Yeachan-Heo/oh-my-codex/pull/1634))

### HUD / worker startup / wiki
- Canonical team phase over stale HUD (PR [#1646](https://github.com/Yeachan-Heo/oh-my-codex/pull/1646))
- Wiki Unicode slug preservation (PR [#1645](https://github.com/Yeachan-Heo/oh-my-codex/pull/1645))
- Worker shell-startup command quoting (PR [#1644](https://github.com/Yeachan-Heo/oh-my-codex/pull/1644))

### Skills / UX / docs
- Analyze skill revival (PR [#1687](https://github.com/Yeachan-Heo/oh-my-codex/pull/1687))
- OMX skill display prefix (PR [#1686](https://github.com/Yeachan-Heo/oh-my-codex/pull/1686))
- Shift+Enter tmux triage docs (PR [#1683](https://github.com/Yeachan-Heo/oh-my-codex/pull/1683))
- Release contributor metadata range (PR [#1639](https://github.com/Yeachan-Heo/oh-my-codex/pull/1639))
- Doctor readiness clarity (PR [#1630](https://github.com/Yeachan-Heo/oh-my-codex/pull/1630))

### Release collateral
- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`
- `CHANGELOG.md`, `RELEASE_BODY.md`
- `docs/release-notes-0.13.2.md`

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Lint | `npm run lint` | PASS |
| Typecheck | `npx tsc --noEmit` | PASS |

## Risk assessment

- Broader change set than `0.13.1`, but each PR ships with its own focused regression coverage and the local build / lint / typecheck pass is clean on `origin/dev`.
- Full GitHub Actions matrix validation is delegated to the tag-triggered release workflow.

## Final verdict

Release **0.13.2** is **ready for release commit/tag cut from `origin/dev`** on the basis of the passing targeted validation above.
