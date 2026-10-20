# oh-my-codex 0.21.25

`0.21.25` is a patch release for team mailbox isolation hardening (2 commits, 3 files, +205/−4; PR #3857).

Versioning continues the 0.21.x patch train. This release hardens team delivery by enforcing fail-closed behavior on unconfirmed mailbox creation, ensuring team isolation is never breached by partial creation or orphaned state.

## Highlights

- **Team mailbox isolation hardening (#3857):** The team delivery system now fails closed on unconfirmed mailbox creation, rejecting runtime state, persistence, timeout, and invalid acknowledgement failures instead of publishing a successful JSON-only fallback. The hardening includes:
  1. **Fail-closed on creation failure:** Runtime rejections, persistence failures, timeouts, and invalid acknowledgements no longer produce a JSON-only mailbox record; the creation call fails and returns error status.
  2. **Partial event reconciliation:** Partially persisted creation events are reconciled before assigning another ID, preventing duplicate mailbox IDs within a team scope.
  3. **Deduplication across refresh races:** The same verified projection is used across refresh races to prevent concurrent creation races from producing multiple mailboxes for the same request.
  
  These changes strengthen the delivery state contract (documented in `docs/contracts/team-delivery-state-contract.md`) and ensure team isolation holds even when runtime integration fails. Authored by @shenyankm with @gaebal-gajae.

## Compatibility

- Team mailbox creation now fails when runtime confirmation fails; existing integrations must handle creation failures gracefully.
- Existing delivered mailboxes and team dispatch records remain compatible.
- The team delivery state contract has been updated to reflect the new fail-closed semantics.

## Known gaps

- None. All findings from prior releases remain documented in their respective release-readiness files.

## Validation evidence

The pinned candidate `9aa3e7066291a47d1427ad274ed47e0511712ee7` passed latest-per-name dev CI: 18 checks succeeded with 7 conditional checks skipped, and no failures.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3857](https://github.com/Yeachan-Heo/oh-my-codex/pull/3857) | @shenyankm | fix(team): Fail closed on unconfirmed mailbox creation |

## Contributors

Thanks to @shenyankm for the team mailbox isolation hardening, with collaboration from @gaebal-gajae.

**Full Changelog**: [`v0.21.24...v0.21.25`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.24...v0.21.25)
