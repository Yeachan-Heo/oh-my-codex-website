# Runtime authority, backlog, replay, and readiness semantics

This document captures the Rust-owned runtime semantics that replace JS-side truth.

## Authority
- The runtime has one active authority lease at most.
- A lease has:
  - `owner`
  - `lease_id`
  - `leased_until`
- A stale or expired lease must be marked stale before another owner is granted authority.
- `AuthorityLease` (in `crates/omx-runtime-core/src/authority.rs`) implements the state machine with three transitions:
  - `acquire(owner, lease_id, leased_until)` — succeeds if no lease is held or the requesting owner already holds it; fails with `AlreadyHeldByOther` otherwise.
  - `renew(owner, lease_id, leased_until)` — succeeds only if the same owner currently holds the lease; fails with `NotHeld` or `OwnerMismatch`.
  - `force_release()` — unconditionally clears all lease fields including stale state.

## Backlog
- New work enters the backlog as `pending`.
- Notification moves work from `pending` to `notified`.
- Completion moves work from `notified` to either `delivered` or `failed`.
- `pending`, `notified`, `delivered`, and `failed` are counts in the runtime snapshot.
- `DispatchLog` (in `crates/omx-runtime-core/src/dispatch.rs`) tracks individual `DispatchRecord` entries, each carrying `request_id`, `target`, `status`, and timestamps (`created_at`, `notified_at`, `delivered_at`, `failed_at`). Status transitions are enforced — invalid transitions (e.g. `pending -> delivered`) return `DispatchError::InvalidTransition`.

## Replay / recovery
- Replay is cursor-based and durable.
- Replayed items must be deduplicated.
- Deferred leader notification is tracked explicitly so observers can tell why delivery has not been surfaced yet.
- `ReplayState` (in `crates/omx-runtime-core/src/replay.rs`) tracks the current `cursor`, deduplicates by `event_id` via an internal `HashSet`, and records whether leader notification was intentionally deferred via `defer_leader_notification()` / `clear_deferred()`.

## Readiness
- Readiness is a Rust-authored snapshot, not an inferred CLI opinion.
- The runtime is not ready when the lease is missing, stale, or otherwise invalid.
- The snapshot should include the exact blockers so operators can see why recovery is paused.
- `derive_readiness()` (in `crates/omx-runtime-core/src/engine.rs`) computes `ReadinessSnapshot` from the current `AuthorityLease`, `DispatchLog`, and `ReplayState`. It returns `ReadinessSnapshot::ready()` only when the authority lease is held and not stale, and there are no pending replay events. All blocking reasons are collected into `readiness.reasons`.

## Dispatch classification
- `WorkerCli` selects the submit policy (`Claude` => 1 press, `Codex`/other => 2 presses).
- `DispatchOutcomeReason` and `QueueTransition` classify send success, retry, pending, and failure outcomes.
- Deferred leader-missing cases stay pending so the runtime can retry when a pane becomes available.
- Unconfirmed sends can stay pending while retries remain; otherwise they fail with an unconfirmed reason.
