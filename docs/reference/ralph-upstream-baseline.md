# Ralph Upstream Semantic Baseline

- Upstream repository: https://github.com/Yeachan-Heo/oh-my-codex
- Pinned branch ref at retrieval: `main`
- Pinned commit SHA: `165c3688bfde275560c001a0de4c7563cf82ad69`
- Retrieved at (UTC): `2026-02-22T06:55:19Z`
- Baseline file: `skills/ralph/SKILL.md`
- Raw URL: `https://raw.githubusercontent.com/Yeachan-Heo/oh-my-codex/165c3688bfde275560c001a0de4c7563cf82ad69/skills/ralph/SKILL.md`
- SHA256 (baseline file content): `2a16d9dd55a78ae9edf192fa36ab8370cb5f2dee4958fc458432429a36000917`

## Semantics extracted from baseline

1. **Iteration semantics**
   - Ralph is an iterative loop with persisted lifecycle state (`iteration`, `max_iterations`, `current_phase`).
   - Iteration progress is updated on each pass and moves between execute/verify/fix phases.

2. **Retry semantics**
   - If verification rejects completion, Ralph keeps running and re-enters fix/verify rather than exiting early.
   - Ralph is explicitly persistence-first (do not stop at partial completion).

3. **Completion semantics**
   - Completion requires fresh verification evidence and explicit architect approval.
   - Terminal success sets `active=false`, `current_phase=complete`, and writes `completed_at`.

4. **Cancellation semantics**
   - Cancellation is treated as lifecycle terminalization, not silent deletion.
   - Linked cleanup is expected (`ralph` + linked execution mode cleanup via cancel workflow).

## Audit notes

- This baseline is commit-pinned. Any parity update MUST reference a new commit SHA and hash.
- The parity mapping for each rule is tracked in `docs/reference/ralph-parity-matrix.md`.
