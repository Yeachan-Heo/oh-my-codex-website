# Ralph Persistence Release Gate

This checklist is a hard gate for Ralph persistence rollout.
CI/release validation MUST fail when any required scenario below is missing or failing.

## Rollout policy (fixed for this port)

- Release N: behind explicit opt-in flag `OMX_RALPH_PERSISTENCE_PORT=1`.
- Release N+1 default enablement decision only after:
  - parity drift remains clean,
  - cancellation metrics show no cross-session corruption,
  - gate scenarios V1–V10 stay green in CI.

## Verification matrix gate

| ID | Scenario | Required evidence | Status |
|---|---|---|---|
| V1 | Session-scoped Ralph lifecycle + bounded same-session adoption into empty current scope | `src/cli/__tests__/session-scoped-runtime.test.ts` + `src/mcp/__tests__/trace-server.test.ts` + `src/hooks/__tests__/notify-hook-ralph-resume.test.ts` + `src/hooks/__tests__/notify-hook-session-scope.test.ts` + `src/modes/__tests__/base-session-scope.test.ts` | [x] |
| V2 | Root fallback compatibility (HUD) | `src/hud/__tests__/state.test.ts` | [x] |
| V3 | Canonical PRD/progress precedence + migration | `src/ralph/__tests__/persistence.test.ts` | [x] |
| V4 | Phase vocabulary enforcement | `src/mcp/__tests__/state-server-ralph-phase.test.ts` | [x] |
| V5 | Cancel standalone Ralph terminalization | `src/cli/__tests__/session-scoped-runtime.test.ts` | [x] |
| V6 | Cancel Ralph linked mode behavior | `src/cli/__tests__/session-scoped-runtime.test.ts` | [x] |
| V7 | Team/Ralph lifecycle separation | Standalone-team deprecation covered by team CLI/runtime tests and Ralph persistence gate contract checks | [x] |
| V8 | Cross-session safety + single-owner migration without replacing an existing current-scope Ralph file | `src/cli/__tests__/session-scoped-runtime.test.ts` + `src/mcp/__tests__/trace-server.test.ts` + `src/hooks/__tests__/notify-hook-ralph-resume.test.ts` + `src/hooks/__tests__/notify-hook-session-scope.test.ts` + `src/modes/__tests__/base-session-scope.test.ts` | [x] |
| V9 | Upstream parity evidence | `docs/reference/ralph-upstream-baseline.md` + `docs/reference/ralph-parity-matrix.md` | [x] |
| V10 | CI/release gate enforcement | `.github/workflows/ci.yml` + `src/verification/__tests__/ralph-persistence-gate.test.ts` | [x] |

### Explicit scenario checklist

- [x] V1 Session-scoped Ralph lifecycle + bounded same-session adoption into empty current scope
- [x] V2 Root fallback compatibility (HUD)
- [x] V3 Canonical PRD/progress precedence + migration
- [x] V4 Phase vocabulary enforcement
- [x] V5 Cancel standalone Ralph terminalization
- [x] V6 Cancel Ralph linked mode behavior
- [x] V7 Team-linked terminal propagation
- [x] V8 Cross-session safety + single-owner migration without replacing an existing current-scope Ralph file
- [x] V9 Upstream parity evidence
- [x] V10 CI/release gate enforcement

## Required docs

- `docs/contracts/ralph-state-contract.md`
- `docs/contracts/ralph-cancel-contract.md`
- `docs/reference/ralph-upstream-baseline.md`
- `docs/reference/ralph-parity-matrix.md`

## Release note requirements

Every release touching Ralph persistence MUST mention:

1. session-authoritative scope policy,
2. bounded same-Codex-session adoption behavior for empty current scope only,
3. legacy compatibility window (`.omx/prd.json` and `.omx/progress.txt`),
4. opt-in flag behavior for the current release.
