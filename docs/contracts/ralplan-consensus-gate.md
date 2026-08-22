# Ralplan consensus and Autopilot advisory contract

The hard `ralplan -> ultragoal` host-receipt gate was removed by #3492. Restoring
Autopilot's canonical chain does not restore a host-authority gate: ordinary
progression may continue when phase, review, or consensus evidence is incomplete,
but that omission must remain visible.

## Authority boundary

Local lifecycle evidence, repository files, environment variables, transcripts,
trackers, markers, task names, prompts, and review artifacts are not host-issued
authority. They are evidence for workflow quality, not security claims.

Identity, scope, and corruption checks remain fail-closed. A foreign session or
workspace, an invalid ownership/provenance binding, or malformed state must still
reject the write without mutation. The advisory policy never weakens those checks.

## Routing and lifecycle evidence

Review artifacts can describe native lifecycle observations using:

- `agent_role`: `architect` or `critic`
- `provenance_kind`: `native_subagent`; `omx_adapted` is rejected
- `session_id`: the transition session id
- `thread_id`: the native lane thread id
- `tracker_path`: `.omx/state/subagent-tracking.json`

`agent_type`, `agent_role`, `provenance_kind`, session/thread IDs, tracker
roles/modes/completion, task names, routing markers, transcripts, and local
review artifacts are routing, lifecycle, or diagnostic data only. They may inform
review, and missing or incomplete records produce an advisory rather than a
workflow refusal.

Typed `native_subagent` Architect and Critic lanes may still be tracked for
diagnostics and review quality. Their lifecycle does not create a host-security
boundary around ordinary progression.

## Visible advisory behavior

The Autopilot completion transition helper returns either `null` or exactly one
structured advisory:

```ts
interface AutopilotCompletionAdvisory {
  skippedGate: string;
  missingEvidence: string;
  message: string;
}
```

The first matching phase/review/consensus check wins. Each permitted-but-
incomplete transition appends that object to the persisted `skipped_gates` array
without duplicating an existing `skippedGate`. The mode update, state operation,
and keyword transports all expose the same advisory. A terminal state carrying a
skipped gate stores `completion_status: "complete-with-skipped-gates"` and must be
reported as **complete with skipped gates**, never clean success.

Diagnostics may report tracker schema, session/thread existence, completion,
distinctness, ordering, and remediation. They describe review quality only; they
must not be converted into a missing-receipt blocker or weaken authority-
decreasing recovery.

## Current contract

Keep typed routing and lifecycle records non-authoritative while allowing the
canonical Autopilot progression to proceed. Security-sensitive capabilities may
define their own documented authority checks, but they must not reintroduce the
retired project-wide Ralplan/Autopilot host-receipt gate.

See [ADR 3212](../adr/3212-same-user-native-child-auth-boundary.md) and [ADR 3194](../adr/3194-codex-01445-documented-leader-proof.md).
