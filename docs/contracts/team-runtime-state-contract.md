# Team runtime state contract

Issue: #1243 workstream A

This document records the currently authoritative owners for the team-runtime states that repeatedly drifted across team state, notify-hook, mailbox shadows, tmux observations, and runtime bridge compatibility files.

## Authoritative owners

### `pending`, `notified`, `delivered`, `failed`
- Durable owner: team dispatch request state.
- Primary TypeScript entry points:
  - `src/team/state/dispatch.ts`
  - `src/team/state.ts`
- Rust bridge shape:
  - `crates/omx-runtime-core/src/dispatch.rs`
  - `src/runtime/bridge.ts`
- Rule: dispatch `status` is authoritative. Timestamp fields are supporting evidence and must not contradict `status`.

### `integrated`
- Durable owner: monitor snapshot `integrationByWorker` written by team runtime.
- Primary entry points:
  - `src/team/runtime.ts`
  - `src/team/state/monitor.ts`
  - `src/team/state.ts`
- Rule: a worker is only `integrated` after leader-head advancement / containment checks succeed. Mailbox delivery and tmux activity are not sufficient.

### `stale`
- No single shared owner yet; this remains split by boundary.
- Runtime authority stale:
  - `crates/omx-runtime-core/src/lib.rs`
  - `src/runtime/bridge.ts`
- Leader activity stale:
  - `src/team/leader-activity.ts`
- Session stale:
  - `src/hooks/session.ts`
- Rule: stale is currently boundary-specific and must not be inferred from dispatch/integration state alone.

## Notify-hook boundary

`notify-hook` may observe mailbox/tmux evidence, but dispatch success is still represented through dispatch-request state transitions. Mailbox `notified_at` / `delivered_at` are derivative evidence, not the dispatch contract itself.

## Workstream A first change

1. Centralize dispatch and integration status enums in `src/team/contracts.ts`.
2. Sanitize persisted dispatch timestamps so they cannot contradict the authoritative dispatch `status`.
3. Sanitize persisted integration snapshot statuses so readers only consume contract-approved values.

This keeps the first fix narrow while making the contract explicit at the read/normalize boundary.
