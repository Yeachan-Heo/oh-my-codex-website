# Release readiness: 0.21.21

## Range

- Previous tag: `v0.21.20` (`b5410bf8`)
- Frozen candidate: `3a03651f0a989b7328987b5de9d1ee6ef89154dd` (dev CI candidate)
- Compare range: `v0.21.20..3a03651f0a989b7328987b5de9d1ee6ef89154dd`, 5 commits, 7 files, +174/−104
- PRs: #3833 (Windows shim path generation), #3835 (team readiness deadline), #3837 (stale-launcher warning diagnostics)

## Version choice

`0.21.21` (patch). The release fixes Windows shim path generation on POSIX systems and restores test coverage for stale-launcher diagnostic messaging without introducing breaking CLI or package-layout changes.

## Version carriers

`package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock` (omx-api, omx-explore-harness, omx-mux, omx-runtime, omx-runtime-core, omx-sparkshell), and `plugins/oh-my-codex/.codex-plugin/plugin.json` are set to `0.21.21`. `cargo metadata --locked --format-version 1 --no-deps` confirms all six Rust workspace crates resolve to `0.21.21`; `npm run sync:plugin:check` verifies plugin metadata and the canonical skill directories.

## Dev CI on the candidate

- Candidate SHA: `3a03651f0a989b7328987b5de9d1ee6ef89154dd`
- Check runs: 24 success, 1 skipped
- Conclusion: success; all latest-per-name checks completed with no failures. Build (Full Source), Build dist artifact, CI Status, Lint, Typecheck, Docs Check, Coverage Gate, and Node/platform lanes passed. Conditional Rust/Publish jobs were skipped.
- Timestamp: 2026-10-19T11:53:16Z (gate verified at 12:17Z, none failing)

## Local gates (Linux x64, gate verified 2026-10-19 12:17Z)

| Gate | Result |
|---|---|
| `npm ci` | pass (installed dependencies) |
| `npm run build` | pass (TypeScript compilation successful) |
| `npm run check:no-unused` | pass (no unused types) |
| `cargo metadata --locked --format-version 1 --no-deps` | pass |
| `npm run sync:plugin:check` | pass (plugin metadata verified) |

Relevant test lanes (unit tests for affected setup/uninstall code and stale-launcher diagnostics) were passed in CI. No host-environment failures observed.

## Known gaps

None identified. Main promotion, tag publication, and registry/GitHub Release readback remain release steps, not candidate readiness gates.
