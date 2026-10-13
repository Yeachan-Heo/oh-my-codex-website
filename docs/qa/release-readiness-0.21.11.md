# Release readiness: 0.21.11

## Range

- Previous tag: `v0.21.10` (`2e3e629617899c867049e4979ef1355cdea94e9f`)
- Frozen candidate: `7e0b5f2330b9d85c5fdb9709ec0104e099836f4c` (dev CI candidate)
- Compare range: `v0.21.10..7e0b5f2330b9d85c5fdb9709ec0104e099836f4c`, 3 commits, 2 files, +68/−5
- PR: #3781 (fixes #3779). See `artifacts/release-0.21.11/inventory.md`.

## Version choice

`0.21.11` (patch). The release prevents stale inherited model-provider values in generated agent TOMLs without introducing breaking CLI or package-layout changes.

## Version carriers

`package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock` (omx-api, omx-explore-harness, omx-mux, omx-runtime, omx-runtime-core, omx-sparkshell), and `plugins/oh-my-codex/.codex-plugin/plugin.json` are set to `0.21.11`. `cargo metadata --locked --format-version 1 --no-deps` confirms all six Rust workspace crates resolve to `0.21.11`; `npm run sync:plugin:check` verifies plugin metadata and the canonical skill directories.

## Dev CI on the candidate

- Run: [38335651492](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/38335651492)
- Candidate SHA: `7e0b5f2330b9d85c5fdb9709ec0104e099836f4c`
- Conclusion: success; all latest-per-name checks completed with no failures. CI Status, lint, typecheck, build artifact, native-cache integrity, Ralph persistence, security preflight, coverage gate, and Node/Windows test lanes passed. Conditional Rust/Docs/Publish jobs were skipped.

## Local gates (Linux x64)

| Gate | Result |
|---|---|
| `npm ci` | pass (172 packages installed) |
| `npm run build` | pass |
| `npm run check:no-unused` | pass |
| `node dist/scripts/run-test-files.js dist/agents/__tests__/native-config.test.js` | pass (22 tests, 0 failures) |
| `cargo metadata --locked --format-version 1 --no-deps` | pass |
| `npm run sync:plugin:check` | pass (24 canonical skill directories and plugin metadata verified) |

The full local test suite was not rerun; the candidate's Node 20 grouped full-suite lane passed in CI. No host-environment failures were observed.

## Known gaps

None identified. Main promotion, tag publication, and registry/GitHub Release readback remain release steps, not candidate readiness gates.
