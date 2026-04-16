# `omx adapt`

`omx adapt <target>` is the OMX-owned surface for persistent external-agent adaptation.

Shared foundation behavior:

- CLI scaffold for `probe`, `status`, `init`, `envelope`, and `doctor`
- shared capability reporting with explicit ownership (`omx-owned`, `shared-contract`, `target-observed`)
- adapter-owned paths under `.omx/adapters/<target>/...`
- shared envelope/status/doctor/init behavior that does not touch `.omx/state/...`

OpenClaw follow-on behavior:

- `omx adapt openclaw probe` observes existing local OpenClaw config/env/gateway evidence
- `omx adapt openclaw status` synthesizes local adapter status from env gates, config source, hook mappings, and command-gateway opt-in
- `omx adapt openclaw envelope` includes lifecycle bridge metadata for the existing OMX to OpenClaw event mapping
- `omx adapt openclaw init --write` still writes only under `.omx/adapters/openclaw/...`

Current targets:

- `openclaw`
- `hermes`

Hermes follow-on behavior in this worktree:

- `probe` inspects external Hermes ACP, gateway, and session-store evidence
- `status` synthesizes `unavailable` / `installed` / `degraded` / `running` from observable Hermes files only
- `envelope` includes Hermes bootstrap metadata for ACP commands, lifecycle bridge guidance, and status commands
- `init --write` still writes only under `.omx/adapters/hermes/...`; Hermes runtime files remain read-only inputs

Examples:

```bash
omx adapt openclaw probe
omx adapt hermes status --json
omx adapt openclaw init --write
omx adapt hermes envelope --json
```

Foundation constraints:

- thin adapter surface only, not a bidirectional control plane
- no direct writes to `.omx/state/...`
- no direct writes to external runtime internals
- target capability reporting stays asymmetric; OMX reports what it owns, what is shared, and what is only target-observed
- OpenClaw status is local evidence only; it does not claim downstream runtime acknowledgement or execution
- command-gateway readiness still requires `OMX_OPENCLAW_COMMAND=1`

Hermes-specific evidence discovery uses `HERMES_HOME` plus an overrideable Hermes source root (`OMX_ADAPT_HERMES_ROOT`) so OMX can inspect an external runtime without vendoring or mutating it.
