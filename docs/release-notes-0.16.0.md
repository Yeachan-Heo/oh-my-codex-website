# Release notes — 0.16.0

## Summary

`0.16.0` is a minor release focused on skill deprecation and native Codex goal-mode integration. It retires obsolete plugin-delivered skill surfaces, adds durable goal-mode workflows for long-running work, and hardens the boundary between OMX-owned artifacts and Codex-owned active goal state.

This release is prepared from `v0.15.3..HEAD` with candidate SHA `e134967863352955feb477e7c4bd2a52b82eeb19`; local release prep also includes uncommitted metadata/docs updates and verification-stability fixes captured in the readiness diff.

## Highlights

- **Native goal-mode workflows** — `omx ultragoal`, `omx performance-goal`, and `omx autoresearch-goal` now provide durable repo-native artifacts, explicit handoffs, validation ledgers, and completion reconciliation against fresh Codex `get_goal` snapshots.
- **False-completion protection** — shared goal workflow helpers compare expected objectives and goal status before accepting durable completion checkpoints.
- **Ralph and Team handoff alignment** — Ralph completion and approved Team execution now preserve goal-mode truth boundaries instead of treating shell artifacts as hidden Codex goal mutation.
- **Skill deprecation cleanup** — obsolete skills retired from installable/plugin delivery where catalog-deprecated; deprecated root wrappers may remain as compatibility stubs.
- **Autoresearch migration path** — direct `omx autoresearch` remains hard-deprecated; use `$autoresearch` or `omx autoresearch-goal` for goal-mode-backed research workflows.
- **Operational hardening** — question batch handshakes, notification proxy support, explore startup bounds, boxed state routing, stale Stop handling, and CI/package template coverage were tightened across the release range.

## Goal-mode upgrade note

`ultragoal`, `performance-goal`, and `autoresearch-goal` require fresh Codex goal snapshots for durable completion reconciliation; OMX does not mutate hidden Codex goal state directly. Operators should expect these workflows to print model-facing handoffs for `get_goal`, `create_goal`, and `update_goal`, then require the resulting fresh `get_goal` JSON when checkpointing completion.

## Compatibility / migration

- The plugin bundle no longer installs catalog-deprecated obsolete skill surfaces such as legacy split ask/review/helper entries. Prefer the unified `ask` workflow and the goal-mode workflow skills.
- Deprecated root skill wrappers may remain for compatibility, but they should not be treated as active installable/plugin delivery surfaces.
- Existing Team/Ralph users should see stricter completion behavior when a Codex goal is active: completion claims must match objective and status evidence.
- No tag, npm publish, or GitHub release publication is performed by this local prep step.

## Verification

Release verification evidence is recorded in `docs/qa/release-readiness-0.16.0.md`. Local gates passed; publication remains blocked until GitHub CI is green and tag/npm/GitHub release publication is explicitly authorized.
