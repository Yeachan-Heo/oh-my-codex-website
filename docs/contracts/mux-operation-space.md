# OMX ↔ mux canonical operation space

This document defines the mux boundary owned by OMX core semantics.

## Canonical operations

| Operation | Purpose |
|---|---|
| `resolve-target` | Convert a logical delivery target into an adapter-specific endpoint. |
| `send-input` | Forward literal input to a resolved target. |
| `capture-tail` | Read a bounded tail of adapter output. |
| `inspect-liveness` | Check whether a target is still alive. |
| `attach` | Attach the operator to a live target. |
| `detach` | Detach the operator from a live target. |

## Target kinds
- `delivery-handle`
- `detached`

## Transport primitives
- `SubmitPolicy` controls how many isolated `C-m` submissions the adapter emits.
- `InputEnvelope` holds literal text plus newline-normalization rules.
- `InjectionPreflight` captures readiness checks before delivery.
- `PaneReadinessReason` explains why a target is or is not injectable.
- `DeliveryConfirmation` records whether a send was confirmed, active-task confirmed, or left unconfirmed.
- `ConfirmationPolicy` defines the retry/verification window used by the adapter.

## Rules
- The semantic contract must not depend on tmux-native nouns.
- Tmux is the first adapter, not the model.
- Adapter results may include tmux identifiers for debugging, but those identifiers are not semantic truth.
- Retry, confirmation, and delivery decisions belong to the runtime contract, not the adapter implementation.

## TmuxAdapter implementation

`TmuxAdapter` is fully implemented in `crates/omx-mux/src/tmux.rs`. All six canonical operations are supported. All `MuxOperation`, `MuxOutcome`, `MuxTarget`, and related types derive `Serialize`/`Deserialize`.

Exact tmux CLI invocations per operation:

| Operation | tmux command |
|---|---|
| `ResolveTarget` | `tmux list-panes -a -F '#{session_name}:#{window_index}.#{pane_index}'` — verifies the handle appears in the pane list |
| `SendInput` | `tmux send-keys -t <target> -l '<text>'` (literal text), then one `tmux send-keys -t <target> C-m` per press defined by `SubmitPolicy::Enter { presses, delay_ms }` |
| `CaptureTail` | `tmux capture-pane -t <target> -p -S -<lines>` |
| `InspectLiveness` | `tmux has-session -t <session>` (session name extracted from the handle, e.g. `"mysess:0.1"` → `"mysess"`) |
| `Attach` | `tmux attach-session -t <target>` |
| `Detach` | `tmux detach-client -t <target>` |

Target handles use the format `session_name:window_index.pane_index` (e.g. `"omx:0.1"`). `MuxTarget::Detached` is rejected for all operations that require a real pane.
