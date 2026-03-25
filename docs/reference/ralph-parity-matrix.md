# Ralph Upstream → OMX Parity Matrix

Baseline source: `docs/reference/ralph-upstream-baseline.md` (`165c3688bfde275560c001a0de4c7563cf82ad69`)

| Rule ID | Upstream semantic rule | OMX implementation point(s) | Status | Verification reference |
|---|---|---|---|---|
| R1 | Ralph iterations are persisted (`iteration`, `max_iterations`, phase progression). | `src/mcp/state-server.ts` (`state_write`), `src/cli/__tests__/session-scoped-runtime.test.ts` | adopted | V1, V4 |
| R2 | Legacy phase labels must be normalized to canonical Ralph phases. | `src/mcp/state-server.ts` (Ralph phase normalizer), `src/mcp/__tests__/state-server-ralph-phase.test.ts` | adapted | V4 |
| R3 | Completion is terminal (`active=false`, terminal phase, `completed_at`). | `src/cli/index.ts` (`cancelModes` terminalization), notify/team sync path in `scripts/notify-hook.js` | adopted | V5, V7 |
| R4 | Cancellation propagates to linked mode state (Ralph ↔ Ultrawork/Ecomode/Team). | `src/cli/index.ts` linked cancel handling, `scripts/notify-hook.js` team→ralph terminal sync | adapted | V6, V7 |
| R5 | Session scope is authoritative when active session exists. Root is compatibility fallback. | `src/mcp/state-paths.ts`, `src/hud/state.ts`, `src/cli/index.ts` | adopted | V1, V2, V8 |
| R6 | Legacy PRD/progress artifacts need deterministic one-way migration into canonical files. | `src/ralph/persistence.ts`, `src/ralph/__tests__/persistence.test.ts` | adapted | V3 |
| R7 | Release is blocked if contract scenarios are not covered by tests/docs gate. | `docs/qa/ralph-persistence-gate.md`, `src/verification/__tests__/ralph-persistence-gate.test.ts` | adopted | V10 |
| R8 | Upstream internal agent-tier policy text should remain informational only. | docs and skills text only; no runtime behavior coupling | out-of-scope | N/A |

## Status legend

- **adopted**: behavior implemented directly in OMX runtime.
- **adapted**: behavior implemented with OMX-specific contract/scope adjustments.
- **out-of-scope**: documented but intentionally not implemented as runtime behavior.


References: `docs/contracts/ralph-state-contract.md`, `docs/contracts/ralph-cancel-contract.md`, `docs/qa/ralph-persistence-gate.md`
