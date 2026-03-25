# Ralph Cancellation Contract (Normative)

This contract defines required post-conditions for Ralph cancellation when
Ralph was started directly or as a standalone follow-up after other workflows.

## Required post-conditions

After cancelling Ralph, implementations MUST ensure:

1. Targeted Ralph state is terminal and non-active:
   - `active=false`
   - `current_phase='cancelled'`
   - `completed_at` is set (ISO8601)
2. Linked mode behavior:
   - If Ralph is linked to Ultrawork/Ecomode in the same scope, that linked mode MUST also be terminal/non-active.
   - Unrelated unlinked modes in the same scope SHOULD remain unchanged.
3. Cross-session safety:
   - Cancellation MUST NOT mutate mode state in unrelated sessions.

## Implementation alignment points

- `src/cli/index.ts` (`cancelModes`) enforces scoped cancellation and linked cleanup ordering.
- `skills/cancel/SKILL.md` documents scope-aware cancellation behavior and compatibility fallback policy.
