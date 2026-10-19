# Release readiness: 0.21.20

## Range

- Previous tag: `v0.21.19` (a66a988)
- Frozen candidate: `3a7ae367a5d8c75ffd6df591f83e08f5c79a849a` (dev CI candidate)
- Compare range: `v0.21.19..v0.21.20`, 2 commits, 8 files, +110/−18
- PR: #3835 (team readiness deadline enforcement)

## Version choice

`0.21.20` (patch). The release enforces the configured readiness timeout deadline on the final team worker readiness poll without introducing breaking CLI or package-layout changes.

## Version carriers

`package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock` (omx-api, omx-explore-harness, omx-mux, omx-runtime, omx-runtime-core, omx-sparkshell), and `plugins/oh-my-codex/.codex-plugin/plugin.json` are set to `0.21.20`. All Rust workspace crates resolve to `0.21.20`; plugin metadata verified.

## Dev CI on the candidate

- Candidate SHA: `3a7ae367a5d8c75ffd6df591f83e08f5c79a849a`
- Check runs: 17 success, 8 conditional skipped
- Conclusion: success; all latest-per-name checks completed with no failures.

## Release validation

- Release run: [39232500921](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/39232500921)
- npm gitHead: `b5410bf8` (main merge commit)
- npm version: `0.21.20` (published successfully)

## Known gaps

None identified.
