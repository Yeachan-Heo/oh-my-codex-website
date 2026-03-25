# Release Notes - 0.7.6

Status: Prepared on **2026-03-02**.

Current package version: **0.7.6**.

## Scope policy

This release note is based strictly on:

- `git log --no-merges main..dev`
- `git diff --shortstat main...dev`

## Sections

### Highlights
- Team reliability hardening across tmux/session targeting, cleanup flows, and role-based decomposition.
- MCP team runtime extraction and improved CI gate visibility.
- OpenClaw and notify-hook reliability/documentation updates.

### Added
- `feat(team): add dedicated ralph auto-run cleanup policy` (#407, #412)
- `feat(team): add dedicated tmux session mode for worker isolation` (#416)
- `feat(team): add per-worker role routing and task decomposition`

### Changed
- `docs: OpenClaw integration guide for notifications` (#413)
- `ci: add CI Status gate job for branch protection` (#423)
- `refactor(mcp): extract omx_run_team_* to dedicated team-server.ts` (#431)
- `docs(changelog): update unreleased notes for main...dev`

### Fixed
- OpenClaw native gateway notification path.
- Tmux startup/injection/session-targeting regressions.
- Team cleanup, scale-up layout preservation, and shutdown/resume regressions.
- Ralph CLI task parsing option-value leakage.
- Skills canonical OMX path normalization.

### Reverts
- Revert for opt-in dedicated tmux-session hint change (#432) followed by corrected fix.
- Revert for visual-verdict guidance restoration change followed by path normalization fix.

### Verification for release readiness
- [x] `npm run build` passes
- [x] `npm test` passes
- [x] `npm run check:no-unused` passes
- [x] smoke checks from `DEMO.md` pass (or are documented if environment-limited)

### Smoke verification evidence (2026-03-02)

| Command | Exit | Evidence |
|---|---:|---|
| `npm run build` | 0 | build completed |
| `npm test` | 0 | test pipeline completed |
| `npm run check:no-unused` | 0 | `tsc -p tsconfig.no-unused.json` succeeded |
| `node bin/omx.js --help` | 0 | CLI usage rendered |
| `node bin/omx.js doctor` | 0 | `Results: 9 passed, 0 warnings, 0 failed` |
| `node bin/omx.js version` | 0 | `oh-my-codex v0.7.6` |
| `node bin/omx.js status` | 0 | mode status rendered |
| `node bin/omx.js setup --dry-run` | 0 | dry-run setup completed |
| `node bin/omx.js cancel` | 0 | cancel command completed |

### Commit ledger (from `main..dev`, `git log --reverse` order)
- `2026-02-28 c235a5a feat(team): add dedicated ralph auto-run cleanup policy (#407) (#412)`
- `2026-02-28 8d3fef0 fix(notifications): native OpenClaw gateway support (#414) (#415)`
- `2026-03-01 1653aa7 feat(team): add dedicated tmux session mode for worker isolation (#416)`
- `2026-03-01 0c68a02 docs: OpenClaw integration guide for notifications (#413)`
- `2026-03-01 383d79d fix(tmux): source shell profile (.zshrc/.bashrc) for detached session launch`
- `2026-03-01 d4f6803 fix(team): revert dedicated tmux session mode, restore split-pane default`
- `2026-03-01 56091a4 ci: add CI Status gate job for branch protection (#423)`
- `2026-03-01 576ec9c fix(ralph): exclude option values from CLI task description (#424)`
- `2026-03-01 6eed3c6 fix(notify-hook): add structured logging for visual-verdict parse/persist failures (#428)`
- `2026-03-01 b5dc657 fix(team): fix 3 regressions in team/ralph shutdown and resume paths (#430)`
- `2026-03-01 3f6b3fd refactor(mcp): extract omx_run_team_* to dedicated team-server.ts (#431)`
- `2026-03-02 c3d1220 fix(team): switch dedicated tmux session to opt-in with worker location hint (#432)`
- `2026-03-01 ee72e1f Revert "fix(team): switch dedicated tmux session to opt-in with worker location hint (#432)"`
- `2026-03-02 454e69d fix(team): force cleanup on failed/cancelled runs, await worktree rollback, refresh dead-worker panes (#438)`
- `2026-03-02 c8632fa fix(team): fix leader pane targeting in notify-hook dispatch and runtime fallback (#433, #437) (#439)`
- `2026-03-01 587ec94 fix(team): harden autoscaling pane cleanup and teardown`
- `2026-03-02 12dea24 fix(team): preserve layout during scale-up and add regression test`
- `2026-03-02 f5d47f4 fix(tmux): skip injection when pane returns to shell (#441) (#442)`
- `2026-03-02 7413fe3 feat(team): add per-worker role routing and task decomposition`
- `2026-03-02 cc64635 fix(tmux): target correct session when spawning team panes`
- `2026-03-02 d33ecfc fix(team): remove unused symbols flagged in PR review`
- `2026-03-02 f0cc833 fix(tmux): restore injection when scoped mode state is missing`
- `2026-03-02 baeb8e7 fix(skills): restore visual-verdict contract and ralph visual-loop guidance`
- `2026-03-02 a5f2b77 Revert "fix(skills): restore visual-verdict contract and ralph visual-loop guidance"`
- `2026-03-02 6c1c4eb docs(changelog): update unreleased notes for main...dev`
- `2026-03-02 e0c5974 fix(skills): normalize forked OMC references to OMX canonical paths`
