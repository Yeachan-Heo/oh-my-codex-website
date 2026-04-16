# Release Readiness Verdict - 0.13.0

Date: **2026-04-16**
Target version: **0.13.0**
Comparison base: **`v0.12.6..origin/dev`**
Verdict: **GO** ✅

`0.13.0` packages the broad post-`0.12.6` release train: `omx adapt` foundations for OpenClaw and Hermes, Ralph/native Stop/session-authority hardening, safer explore and platform launch behavior, reduced repeated macOS stale-polling git probes, HUD/notification cleanup, setup and release workflow hygiene, and dependency refreshes.

## Scope reviewed

### Adapt foundations
- `src/cli/adapt.ts`, `src/cli/index.ts` — `omx adapt` CLI routing and help surface
- `src/adapt/*` — adapter contracts, pathing, target registry, OpenClaw/Hermes probe/status/init/envelope/doctor behavior
- `docs/adapt.md` — user-facing adapter contract and examples

### Ralph / runtime authority / workflow semantics
- `src/cli/ralph.ts`, `src/ralph/*`, `skills/ralph/SKILL.md`, `skills/ralph-init/SKILL.md` — prompt-side Ralph vs PRD CLI startup and story validation semantics
- `src/scripts/codex-native-hook.ts`, `src/hooks/keyword-detector.ts`, `src/mcp/state-server.ts`, `src/state/*` — Stop handling, metadata routing, MCP state transport, and session authority
- `src/scripts/notify-hook/team-leader-nudge.ts`, `src/scripts/notify-hook/team-dispatch.ts` — tmux Ralph nudge authority and startup inbox/dispatch regression coverage

### Launch / platform / worktree safety
- `src/cli/explore.ts`, `crates/omx-explore/*` — explore harness resolution and Windows/POSIX fail-closed behavior
- `src/cli/index.ts`, `src/cli/tmux-hook.ts`, `src/scripts/tmux-hook-engine.ts` — detached leader child cleanup and native tmux hook behavior
- `src/team/worktree.ts`, `src/cli/cleanup.ts`, `src/notifications/tmux.ts` — stale worktree and Windows cleanup resilience

### Hooks / HUD / notifications
- `src/hud/state.ts`, `src/hud/tmux.ts`, `src/notifications/*`, `src/team/leader-activity.ts` — live-session HUD binding, tmux detection, Slack mention parsing, macOS stale-polling git-probe reduction, and notification formatting/noise paths
- `src/config/codex-hooks.ts`, `src/scripts/codex-native-pre-post.ts` — native hook configuration and metadata routing contracts

### Setup / docs / release workflow
- `src/cli/setup.ts`, `src/config/mcp-registry.ts`, `skills/wiki/SKILL.md` — wiki setup registration
- `src/cli/doctor.ts`, `docs/codex-native-hooks.md` — native-hook doctor coverage and operator docs
- `CONTRIBUTING.md`, `.github/workflows/release.yml` — dev-base contribution guardrail and release workflow dependency refresh

### Release collateral
- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`
- `CHANGELOG.md`, `RELEASE_BODY.md`
- `docs/release-notes-0.13.0.md`

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Lint | `npm run lint` | PASS |
| Full test suite | `npm test` | PASS (3487 tests, 0 fail) |
| Recent bug regression suite | `npm run test:recent-bug-regressions` | PASS (292 tests, 0 fail) |
| Version sync contract | `node --test dist/cli/__tests__/version-sync-contract.test.js` | PASS |
| Packed-install smoke | `npm run smoke:packed-install` | PASS |

## Risk assessment

- **Adapt foundations** are new user-facing surfaces but intentionally thin: they report local evidence and keep writes under `.omx/adapters/<target>/...`; downstream OpenClaw/Hermes runtime acknowledgement remains outside this release's local proof.
- **Ralph/native Stop/session authority** changed across several seams at once; monitor long-running concurrent sessions and prompt-side vs CLI-side Ralph activation after release.
- **Explore/platform launch paths** include Windows and POSIX-shim guardrails; local Linux verification should be complemented by the release workflow and cross-platform CI matrix.
- **HUD/notification changes** reduce stale/noisy signals but depend on real tmux/session environments; post-release observation should focus on mixed tmux/non-tmux operators and the new macOS leader stale-polling behavior.

## Final verdict

Release **0.13.0** is **ready for release commit/tag cut from `origin/dev`** on the basis of the passing validation evidence above.
