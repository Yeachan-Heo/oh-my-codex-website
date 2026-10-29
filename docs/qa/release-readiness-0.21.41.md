# Release Readiness: v0.21.41

**Release Date:** 2026-10-29<br>
**Released By:** gaebal-gajae (autonomous release)<br>
**Pinned dev candidate:** `4a0f645b898e74d381ee7d4da1ced0bf26280896`<br>
**Range:** [`v0.21.40...v0.21.41`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.40...v0.21.41)

## Summary

This patch release adds per-stage custom skill gates for `deep-interview`, `ralplan`, and `code-review`, configured through `.omx-config.json` `qualityGates`. Entries are skill names or `{ skill, mode?, model? }` objects; blocking gates supplement each stage's standard review flow, and advisory findings are recorded without blocking. Ralplan persists custom gate verdicts with its consensus evidence and sends blocking `reject`/`iterate` verdicts through the revise loop. Reserved built-in and sunset skill names are rejected. The feature implements issue #3955, requested by @iqdoctor, and landed in #3956.

The range also includes the model-selection documentation correction (#3951), v0.21.40 publication evidence (#3952), the v0.21.40 main-to-dev back-merge and `0.21.41` version synchronization (#3953), and the follow-up back-merge (#3954).

## Compare-range metrics

The pinned dev range `v0.21.40..4a0f645b898e74d381ee7d4da1ced0bf26280896` contains **6 commits, 31 files changed, 1,838 insertions(+), and 64 deletions(-)**. The release candidate now contains **8 commits, 35 files changed, 1,998 insertions(+), and 84 deletions(-)** (`git diff --stat v0.21.40..release/omx-0.21.41`), including release collateral and the main-CI Windows history-race correction.

## PR inventory

| PR | Author | Title | Impact |
|---|---|---|---|
| [#3951](https://github.com/Yeachan-Heo/oh-my-codex/pull/3951) | @Yeachan-Heo | docs: fix model selection documentation to match implementation | Documentation now matches the implemented model-selection precedence |
| [#3952](https://github.com/Yeachan-Heo/oh-my-codex/pull/3952) | @Yeachan-Heo | docs: record v0.21.40 publication evidence | Carry previous-release publication evidence onto dev |
| [#3953](https://github.com/Yeachan-Heo/oh-my-codex/pull/3953) | @Yeachan-Heo | chore: back-merge main (v0.21.40) to dev and bump to 0.21.41 | Back-merge shipped main and synchronize package/plugin/Cargo version surfaces |
| [#3954](https://github.com/Yeachan-Heo/oh-my-codex/pull/3954) | @Yeachan-Heo | back-merge: main to dev for v0.21.40 | Internal follow-up merge aligning main and dev |
| [#3956](https://github.com/Yeachan-Heo/oh-my-codex/pull/3956) | @Yeachan-Heo | feat(#3955): Add configurable custom quality gates via .omx-config | Add validated stage-specific gates, listing CLI, Ralplan integration, tests, and skill guidance |

The six pre-release compare-range commits are represented by these PRs and their merge commits; the seventh commit is this release preparation, which adds the required release collateral. PRs #3939, #3900, #3907, #3915, and #3919 are excluded. #3898 remains held for the owner design decision.

## Version synchronization

All coupled release surfaces are already at `0.21.41`; this release candidate does not double-bump.

| Surface | Verified value |
|---|---|
| `package.json` | `0.21.41` |
| `package-lock.json` root package and root package entry | `0.21.41` |
| `Cargo.toml` workspace package | `0.21.41` |
| `Cargo.lock` six OMX workspace packages | `0.21.41` |
| `plugins/oh-my-codex/.codex-plugin/plugin.json` | `0.21.41` |
| `omx-capabilities.lock.json` | Does not embed a package version |
| Version constants/tests | No hard-coded `0.21.40` or `0.21.41` display-version constant; `src/cli/__tests__/version-sync-contract.test.ts` checks package/plugin/Cargo alignment and lockfile format |

`node dist/scripts/check-version-sync.js --tag v0.21.41` passed. `cargo metadata --locked --format-version 1 --no-deps` reports all six OMX workspace crates at `0.21.41`. The remaining `0.21.40` occurrences are historical release collateral and references to the prior tag/PR, not current version surfaces.

## Local gates

- ✓ `npm ci` completed successfully.
- ✓ `npm run build` passed.
- ✓ `npm run check:no-unused` passed.
- ✓ `npm run lint` passed across 895 source files. Biome printed the existing deprecation notice for `linter.rules.recommended` in `biome.json`.
- ✓ `npm run build:runtime` built the native `omx-runtime` binary required by the focused Ralplan runtime tests.
- ✓ Focused tests passed: `quality-gates.test.js`, `quality-gates-cli.test.js`, `ralplan/runtime.test.js`, and `code-review-skill-contract.test.js` (all four files passed).
- ✓ `npm run verify:generated` passed: plugin bundle, capabilities lock, prompt-guidance fragments, and generated catalog all match.
- ✓ Version sync check and six-crate Cargo metadata verification passed.
- ✓ `git diff --cached --check` passed after staging release collateral.

## CI gates

Pinned dev candidate: `4a0f645b898e74d381ee7d4da1ced0bf26280896`.

- Dev push CI run [40910124408](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40910124408) completed successfully. It has **24 success, 1 skipped, 0 failures, 0 pending** across **25 unique job names**.
- macOS Ralplan preflight security passed on Node 20 (job [123575656924](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40910124408/job/123575656924)) and Node 26.5.1 (job [123575656997](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40910124408/job/123575656997)).
- CI Status passed (job [123586747505](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40910124408/job/123586747505)).

## Release PR, publication, and back-merge

The initial release PR [#3957](https://github.com/Yeachan-Heo/oh-my-codex/pull/3957) merged at `b4a02c194acb0a344c7c3f7254e71740fb368932`. Its exact-head Codex review completed with zero findings, the in-thread reply gate printed `[]`, and PR CI passed (run [40922096829](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40922096829): 24 success, 1 skipped, 0 failed; both macOS preflights and CI Status passed).

Main push CI run [40924728006](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40924728006) failed the Windows history-materialization test `skips same-inode history content mutations during file publication`: same-size content was changed and the original modification time restored, while the implementation compared only file identity, size, and modification time. This exposed a real race-detection gap even though the test passed on the first dev and release-PR runs. Follow-up PR [#3958](https://github.com/Yeachan-Heo/oh-my-codex/pull/3958) includes `ctimeMs` in history file-version comparisons. The focused regression test passes locally; the PR's exact-head Windows job and subsequent main CI must pass before tagging. No tag or publication has occurred.

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
