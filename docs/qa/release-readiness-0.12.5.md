# Release Readiness Verdict - 0.12.5

Date: **2026-04-11**
Target version: **0.12.5**
Comparison base: **`v0.12.4..HEAD`**
Verdict: **GO** ✅

`0.12.5` ships 25 PRs across team-runtime startup/shutdown hardening, multi-skill/workflow state correctness, Windows reliability, tmux/shell cwd fixes, HUD session anchoring, and hook/auth/notify hardening. One new feature (current-task baseline branch guardrails) and one docs cleanup are included.

## Scope reviewed

### Team startup / shutdown
- `src/team/runtime.ts` — stalled-worker recovery, cross-session Stop guard, Linux handoff persistence
- `src/team/state.ts` — `session.json` ownership, fallback semantics
- `src/team/worktree.ts` — baseline branch guardrail wiring

### Multi-skill / workflow state
- `src/hooks/keyword-detector.ts`, `src/skills/state.ts` — planning-state preservation during mixed prompt routing
- `src/modes/workflow-state.ts`, `src/modes/reconcile.ts` — handoff correctness, malformed-state rejection
- `src/scripts/codex-native-hook.ts` — session-scoped hook contract enforcement

### Windows
- `src/team/mux/psmux.ts` — launcher path resolution
- `src/notifications/process.ts` — `ps` fallback
- `src/mcp/cleanup.ts` — orphan cleanup on parent exit
- `src/installer/index.ts` — retired MCP config repair

### tmux / macOS / shell
- `src/team/tmux.ts` — detached cwd, PID resolution, copy-mode cleanup
- `src/team/shell.ts` — worker cwd on supported-shell launch, Homebrew zsh normalization

### HUD / session anchoring
- `src/hud/state.ts` — session scope anchor
- `src/hud/transport.ts` — native session-id drift guard

### Hooks / auth / notify
- `src/hooks/stop.ts` — Ralph stop-hook session authority
- `src/hooks/auth-nudge.ts` — read-only/planning authorization leak
- `src/notify/hooks.ts` — coarse-state drift tracking
- `src/mcp/launcher.ts` — restart stall bound

### Release collateral
- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`
- `CHANGELOG.md`, `RELEASE_BODY.md`
- `docs/release-notes-0.12.5.md`

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Lint | `npm run lint` | PASS |
| Full test suite | `npm test` | PASS |
| Version sync contract | `node --test dist/cli/__tests__/version-sync-contract.test.js` | PASS |
| Packed-install smoke | `npm run smoke:packed-install` | PASS |

## Risk assessment

- **Team startup recovery** is a new execution path in `runtime.ts`; monitor for edge cases with very slow worker environments.
- **Planning-state preservation** (#1471) touches the skill-state routing path; mixed-skill prompts should be tested post-release.
- **Windows worker path** (#1469) was verified via the contract test added in that PR; cross-platform CI matrix will provide final confirmation.
- No pre-existing test failures introduced by this release; the 2 contract-test failures from `3a193cfb` on `main` remain pre-existing and unrelated.

## Final verdict

Release **0.12.5** is **ready for branch push and PR handoff** on the basis of the verified `v0.12.4..HEAD` patch scope above.
