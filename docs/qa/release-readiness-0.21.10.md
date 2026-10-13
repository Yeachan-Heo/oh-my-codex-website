## Range

- Previous tag: `v0.21.9` (`e4653cd8e115f923014be72cf0f7fb6645384246`)
- Frozen candidate: `72fee0236cf8a4b45e6dd9b3d826871f402b84ae` (release/omx-0.21.10 branch tip; `v0.21.9` is an ancestor)
- Compare range: `v0.21.9..72fee0236cf8a4b45e6dd9b3d826871f402b84ae`, 16 commits, 15 files, +1067/−82
- PRs: #3765, #3768, #3771, #3772, #3774, #3775, #3777 (plus related issues #3655, #3766, #3776). See `artifacts/release-0.21.10/inventory.md`.

## Version choice

`0.21.10` (patch). The release includes evaluation infrastructure improvements and configuration robustness fixes with no breaking changes, following the established 0.21.x train convention. Minor bumps are reserved for breaking or consolidation trains.

## Version carriers

`package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock` (omx-api, omx-explore-harness, omx-mux, omx-runtime, omx-runtime-core, omx-sparkshell) and `plugins/oh-my-codex/.codex-plugin/plugin.json` were bumped from 0.21.9 to 0.21.10 via the post-release development bump (#3770 on dev). Afterwards, `git grep 0.21.9` matches only historical 0.21.9 collateral (CHANGELOG entry, release notes, readiness, inventory) and the intentional compare links.

## Dev CI on the candidate

- CI run not yet collected (will populate after PR merge approval).

## Local gates (release branch, Linux x64, Node from host, Rust stable)

| Gate | Result |
|---|---|
| `npm ci` | pass |
| `npm run build` | pass |
| `npm run lint` | pass |
| `npm run verify:native-agents` | pass (18 installable native agents, 32 setup prompt assets verified) |
| `npm run verify:plugin-bundle` | included in verify:native-agents |
| `npm run verify:capabilities-lock` | included in verify:native-agents |
| `npm run verify:prompt-guidance` | included in verify:native-agents |
| `npm run sync:plugin:check` | pass (24 canonical skill directories and plugin metadata verified) |
| `node dist/scripts/generate-catalog-docs.js --check` | pass (catalog check ok) |
| `node dist/scripts/prompt-inventory.js --check` | pass (29 skill cards checked) |
| `cargo metadata --locked` | pass |
| `npm test` (full suite) | **1066 tests pass, 0 fail** across 67 test suites |

## Known gaps

None. All local gates pass with full test suite success.

## Publication evidence

Recorded after publication.
