# Release Readiness Verdict - 0.12.6

Date: **2026-04-13**
Target version: **0.12.6**
Comparison base: **`v0.12.5..origin/dev`**
Verdict: **GO** ✅

`0.12.6` packages 32 PR merges beyond `v0.12.5`, centered on the new local wiki workflow, deeper notification/hook/session-state hardening, launch/worktree safety improvements, Discord job-control primitives, and automatic closing of explicitly linked issues after `dev` merges.

## Scope reviewed

### Wiki / MCP / CLI parity
- `src/wiki/*` — local markdown wiki storage, ingest, query, lint, lifecycle, and storage tests
- `src/mcp/wiki-server.ts`, `src/mcp/bootstrap.ts` — wiki MCP surface and bootstrap wiring
- `src/cli/index.ts`, `src/cli/mcp-parity.ts`, `README.md`, `skills/wiki/SKILL.md` — CLI parity and user-facing workflow entry points

### Hooks / notifications / session state
- `src/scripts/codex-native-hook.ts` — native hook session-state and release-readiness guardrails
- `src/scripts/notify-hook/team-dispatch.ts`, `src/scripts/notify-hook/team-leader-nudge.ts`, `src/scripts/notify-fallback-watcher.ts` — delivery / fallback / nudge stability
- `src/notifications/*`, `src/hooks/session.ts`, `src/hud/state.ts` — session visibility, lifecycle dedupe, reply listener, tmux, idle cooldown, and HUD cleanup

### Launch / setup / operator safety
- `src/cli/index.ts`, `src/team/worktree.ts`, `src/utils/repo-deps.ts` — reusable dependency bootstrap and dirty worktree caution flow
- `src/cli/setup.ts`, `src/utils/agents-md.ts` — AGENTS preservation through setup refresh
- `src/cli/team.ts`, `src/team/runtime.ts`, `src/team/progress-evidence.ts` — runtime/leader safety and current progress evidence improvements

### Workflow / issue automation
- `.github/scripts/dev-merge-issue-close.cjs`, `.github/workflows/dev-merge-issue-close.yml` — close explicitly linked local issues after `dev` merges
- `src/openclaw/*`, `src/cli/__tests__/ask.test.ts` — Discord session control and tracked-message stability

### Release collateral
- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`
- `CHANGELOG.md`, `RELEASE_BODY.md`
- `docs/release-notes-0.12.6.md`

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Lint | `npm run lint` | PASS |
| Full test suite | `npm test` | PASS |
| Recent bug regression suite | `npm run test:recent-bug-regressions` | PASS |
| Version sync contract | `node --test dist/cli/__tests__/version-sync-contract.test.js` | PASS |
| Packed-install smoke | `npm run smoke:packed-install` | PASS |

## Risk assessment

- **Wiki workflow** is the largest new surface in this release; storage/index and docs-contract coverage are strong, but post-release observation should focus on real-world query quality and auto-capture ergonomics.
- **Notification/session-state hardening** touches broad hook/runtime surfaces; the dedicated recent-bug regression suite and full test suite reduce risk, but long-running tmux/team sessions remain the most likely source of follow-up edge cases.
- **Dirty-worktree caution flow** changes launch ergonomics without removing hard failures outside the intended path; monitor for false-positive or false-negative caution prompts.
- **Dev merge issue auto-close** intentionally only targets explicit same-repo issue references from merged PR title/body; monitor first few dev merges for overly broad or missed matches.

## Final verdict

Release **0.12.6** is **ready for release commit/tag cut from `origin/dev`** on the basis of the verified `v0.12.5..origin/dev` scope above.
