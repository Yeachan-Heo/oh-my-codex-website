# Private terminal pane-teardown residue E2E

This gate covers the process-residue half of the parent-provenance/rollback incident matrix without contacting an installed lterm daemon or the default tmux server.

## Safety model

- The lterm case requires `LTERM_BIN` to name a newly built local binary. It creates unique `HOME`, `LTERM_RUNTIME_DIR`, `LTERM_SOCKET`, `LTERM_DATA_DIR`, `TMPDIR`, and `TMUX_TMPDIR` paths, starts a disposable daemon, verifies `doctor --json` reports that exact private socket, and places a temporary `tmux` shim (`lterm tmux-compat`) first on `PATH`.
- The tmux case uses the existing `withTempTmuxSession` fixture, which creates a uniquely named private `-L` server with `/dev/null` configuration and destroys that server afterward.
- Both cases tag only the attempt pane with `@omx_team_pane_owner_id`, freeze its exact pane PID, protect the leader/control panes, and call the production `teardownWorkerPanes` primitive with a final owner-tag authorization check.
- The shared rollback call is instrumented so any direct `process.kill` attempt fails the test. No process-tree, `pkill`, `killall`, or shared PID fallback is allowed.
- A deliberately detached (`setsid`-equivalent) child is expected to survive pane deletion. The test emits a residue warning, then sends a nonce over the residue's private attempt-owned control socket only while its bounded PID/PGID/start-time identity is unchanged; the residue validates the nonce and exits itself. No PID signal is sent after pane death, and command text is never captured. This exact-owned fixture cleanup is outside the shared rollback primitive. Ordinary descendants are never directly signaled by the test harness; their fallback cleanup remains the private pane/server teardown.

## Coverage

For both private real tmux and disposable real lterm, the test proves:

1. the exact owner-tagged attempt pane is removed;
2. the protected leader and independent control pane survive;
3. the foreground worker, ordinary child, and ordinary grandchild exit within a bounded poll timeout;
4. the intentionally detached residue is reported and handled by exact-owned cleanup; and
5. shared rollback issues no direct process signal.

## Reproduce

```bash
cargo build \
  --manifest-path /path/to/light_terminal/Cargo.toml \
  --bin lterm

cd /path/to/oh-my-codex
npm run build
LTERM_BIN=/path/to/light_terminal/target/debug/lterm \
  node dist/scripts/run-test-files.js \
  dist/team/__tests__/pane-teardown-residue-e2e.test.js
```

The normal suite skips only the lterm case when `LTERM_BIN` is absent. Release evidence must run the command above with an explicit local binary and confirm that both subtests pass rather than skip.

Related regression gate:

```bash
node dist/scripts/run-test-files.js \
  dist/team/__tests__/tmux-session.test.js \
  dist/team/__tests__/runtime.test.js
```

The fixture is disposable-only. Do not point `LTERM_BIN` at an installed wrapper that can select a live daemon, do not remove the private tmux server boundary, and do not use this test as authority to publish, deploy, restart live services, or run an unsafe mixed-version destructive cell.
