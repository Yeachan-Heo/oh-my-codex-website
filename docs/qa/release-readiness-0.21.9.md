# Release readiness — 0.21.9

## Range

- Previous tag: `v0.21.8` (`2db7d5136b22252e83091a12ea27567b2fdd5971`)
- Frozen candidate: `e4653cd8e115f923014be72cf0f7fb6645384246` (dev tip at cut; `v0.21.8` is an ancestor through the `origin/main` merge on the release branch)
- Compare range: `v0.21.8..e4653cd8e115f923014be72cf0f7fb6645384246`, 10 commits, 24 files, +1693/−96
- PRs: #3751, #3753, #3754, #3755, #3757, #3760, #3761, #3762, #3763 (reverts #3762), #3764. See `artifacts/release-0.21.9/inventory.md`.

## Version choice

`0.21.9` (patch). The task brief proposed `0.22.0` because features are present, but the repo convention ships additive features as patches. Examples: 0.21.2 shipped the GitGuardex HUD and the Indonesian README, 0.21.8 shipped session export, and 0.21.6 shipped the eval suite. Minors are reserved for breaking or consolidation trains such as 0.21.0. This range has no breaking changes.

## Version carriers

`package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock` (omx-api, omx-explore-harness, omx-mux, omx-runtime, omx-runtime-core, omx-sparkshell) and `plugins/oh-my-codex/.codex-plugin/plugin.json` were bumped from 0.21.8 to 0.21.9. Afterwards, `git grep 0.21.8` matches only historical 0.21.8 collateral (CHANGELOG entry, release notes, readiness, inventory) and the intentional `v0.21.8...v0.21.9` compare links.

## Dev CI on the candidate

- CI run `38131956555` (push, dev, `e4653cd8e1`): success.

## Local gates (release branch, Linux x64, Node from host)

| Gate | Result |
|---|---|
| `npm ci` | pass |
| `npm run build` | pass |
| `tsc --noEmit` | pass |
| `npm run lint` | pass |
| `npm run check:no-unused` | pass |
| `cargo metadata --locked` | pass |
| `npm run build:runtime` | pass |
| verify:native-agents / plugin-bundle / capabilities-lock / prompt-guidance, `sync:plugin:check` | pass |
| `generate-catalog-docs.js --check`, `prompt-inventory.js --check` | pass |
| `npm test` (full `test:node`, 457 files) | 8528 tests, 8519 pass, **3 fail**, 6 skipped |

Host environment note: the host's `~/.cargo/bin` has no `cargo` shim. The first run without cargo on `PATH` could not build `omx-runtime`, which caused 403 failures with `canonical mode binding native mutex process error`. The final run used the installed stable toolchain at `~/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/bin`.

## Known gaps

#3766 tracks three test failures in `dist/evals/astra-defaults/__tests__`, all introduced by #3764. They are not host-environment issues:

- `stage-transition.test.ts`: two deterministic failures. The comparison configs added by #3764 raise the config count of the default mission from 3 to 6.
- `collector.test.ts` "records latency even on error": flaky because `Date.now()` only measures whole milliseconds (failed 2 of 6 isolated runs). The file also does not exit after its tests report.

No CI lane runs `dist/evals/**/__tests__`, so dev CI did not catch these. The failures are confined to the maintainer-only astra-defaults evaluation harness and do not affect CLI, hooks, state, or team paths. The release ships the pinned SHA unchanged; the fixes belong to the #3655 work.

## Publication evidence

Recorded after publication.
