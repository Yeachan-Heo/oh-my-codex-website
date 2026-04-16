# Multi-state transition compatibility review notes

Date: 2026-04-09  
Reviewer lane: worker-3

## Scope reviewed

Compared the branch state against:

- `.omx/plans/prd-multi-state-compat.md`
- `.omx/plans/test-spec-multi-state-compat.md`

Reviewed brownfield surfaces:

- `src/state/skill-active.ts`
- `src/hooks/keyword-detector.ts`
- `src/modes/base.ts`
- `src/mcp/state-server.ts`
- `src/hud/state.ts`
- `src/hooks/agents-overlay.ts`
- `src/scripts/codex-native-hook.ts`

## Current branch snapshot

**Status:** the repository already contains partial multi-state foundations, but
it does not yet expose one documented canonical transition contract.

Observed strengths:

- `src/state/skill-active.ts` already persists `active_skills[]`, normalizes
  visible entries, and can sync more than one tracked workflow into the
  canonical state file.
- `src/hud/state.ts` and `src/hooks/agents-overlay.ts` already read canonical
  skill-active state and are structurally closer to a peer-state model than a
  strict single-owner model.
- `src/modes/base.ts` already preserves key standalone restrictions:
  `autopilot` and `autoresearch` remain exclusive; `ralph` and `ultrawork`
  remain mutually exclusive with each other.

Primary gaps relative to the PRD/test-spec:

1. **No explicit transition-rule helper exists yet.**
   - Transition semantics are still distributed across mode lifecycle,
     keyword detection, MCP writes, HUD/overlay readers, and native-stop logic.
2. **Keyword activation is still effectively single-owner.**
   - `recordSkillActivation()` uses `detectPrimaryKeyword()` and writes a fresh
     one-entry `active_skills` array for the selected skill, so prompt-side
     activation still overwrites rather than validating/appending approved peer
     combinations.
3. **Invalid-transition guidance is not standardized.**
   - `src/modes/base.ts` still throws `Run cancel first.` for exclusivity
     failures, which does not meet the new requirement to mention explicit
     clearing paths via `omx state` and `omx_state.*`.
4. **The contract is not documented in one operator-facing place.**
   - The PRD and test spec define the rollout, but the repo lacked a dedicated
     contract doc describing the allowed set, the denied set, and the required
     recovery UX.

## Brownfield review details

### `src/state/skill-active.ts`

- Good base for canonical peer state: it already deduplicates `active_skills[]`
  and can retain multiple active entries.
- Still needs a shared allowlist-aware transition layer above persistence so the
  state file cannot drift into unsupported combinations.

### `src/hooks/keyword-detector.ts`

- Main brownfield risk for this feature.
- The prompt-side path currently records only the primary detected keyword and
  seeds one active skill at a time.
- This is the clearest remaining single-owner assumption in the review sample.

### `src/modes/base.ts`

- Current exclusivity rules are partly aligned with the rollout goals, because
  `team` is not exclusive while `autopilot`/`autoresearch` are.
- However, the rules are encoded as a hard-coded exclusive set and generic error
  text, not as a canonical transition model with machine-testable guidance.

### `src/mcp/state-server.ts`

- Already syncs canonical skill-active state for mode writes/clears.
- Needs to consume the same allowlist/error builder as every other writer so
  MCP state writes cannot permit combinations the keyword or mode path denies.

### `src/hud/state.ts` and `src/hooks/agents-overlay.ts`

- These consumers already appear structurally ready for a combined active set.
- They still depend on upstream writers to keep the canonical state valid and to
  stop relying on top-level legacy fields as semantic truth.

### `src/scripts/codex-native-hook.ts`

- Stop handling already reads canonical skill-active state plus mode files.
- It still needs the finalized transition contract so combined-state blocking and
  clearing behavior stay aligned with the eventual allowlist.

## Documentation action taken in this lane

Added a dedicated contract doc:

- `docs/contracts/multi-state-transition-contract.md`

This freezes the rollout expectations for:

- approved first-pass overlaps
- standalone-only workflows
- denial UX requirements
- brownfield consumer responsibilities
- regression expectations

Also clarified two adjacent operator-facing docs so the approved overlap is not
misread as the old linked `team ralph` lifecycle:

- `docs/contracts/ralph-state-contract.md`
- `docs/codex-native-hooks.md`

Added concrete recovery examples to the compatibility contract so denial
messages can point operators at exact parity surfaces instead of vague
placeholders:

- `omx state clear --input '{"mode":"team"}' --json`
- `omx_state.state_clear({ mode: "team" })`

## Reviewer conclusion

The branch already has meaningful peer-state groundwork, but the PRD is correct
that behavior is still fragmented. The main implementation risk is not raw state
storage; it is inconsistent transition ownership across keyword activation, mode
start validation, MCP writes, and stop/overlay consumers. The new contract doc
should give the implementation lanes a stable operator-facing target while the
code is migrated to a single allowlist-driven transition model.
