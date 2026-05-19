# Release readiness: 0.18.0

## Scope

Minor release after `0.17.3` that ships the OMX API gateway, SparkShell summary/diagnostic safety, local real generation compatibility, targeted CI improvements, and the release-blocker fixes needed to make the 0.18.0 train safe to publish.

## Compare range

- Previous tag: `v0.17.3` (`acb0206be66e4eeb4ca4b7071efdbe0a810cce97`).
- Candidate tag: `v0.18.0`.
- Candidate branch: `dev` at `2eda73bd` before release-collateral commit.
- Ancestry check: PASS — `git merge-base --is-ancestor v0.17.3 dev`.
- Commit inventory source: `git log --reverse --format='%H%x09%h%x09%cI%x09%s' v0.17.3..dev` returned 49 commits.
- PR inventory source: `gh pr list --state merged --base dev --limit 120 --json number,title,mergedAt,author,url,mergeCommit,labels`, filtered to merge commits inside `v0.17.3..dev`.
- Issue inventory source: `gh issue list --state all --limit 120 --json number,title,state,closedAt,createdAt,author,url,labels`, filtered to issues closed after the `v0.17.3` tag date.

## Merged PR inventory

| PR | Merged | Evidence commit | Release note |
| --- | --- | --- | --- |
| [#2295](https://github.com/Yeachan-Heo/oh-my-codex/pull/2295) | 2026-05-15 | `6375dc22` | Bounded best-practice research workflow. |
| [#2332](https://github.com/Yeachan-Heo/oh-my-codex/pull/2332) | 2026-05-15 | `1be84833` | OMX API gateway and SparkShell summary routing. |
| [#2334](https://github.com/Yeachan-Heo/oh-my-codex/pull/2334) | 2026-05-14 | `b12f14e0` | Ignore stale Ralph state in native Stop hook. |
| [#2335](https://github.com/Yeachan-Heo/oh-my-codex/pull/2335) | 2026-05-14 | `b58d815f` | Fix Ralph Stop session drift. |
| [#2338](https://github.com/Yeachan-Heo/oh-my-codex/pull/2338) | 2026-05-14 | `feeee2d5` | Advisor prompt frontmatter compatibility. |
| [#2339](https://github.com/Yeachan-Heo/oh-my-codex/pull/2339) | 2026-05-14 | `baa8e120` | Responses metadata through OMX API. |
| [#2341](https://github.com/Yeachan-Heo/oh-my-codex/pull/2341) | 2026-05-14 | `52a6c474` | MCP transport false-positive fix. |
| [#2342](https://github.com/Yeachan-Heo/oh-my-codex/pull/2342) | 2026-05-15 | `13f68d1c` | HUD resize hooks survive tmux reflow. |
| [#2344](https://github.com/Yeachan-Heo/oh-my-codex/pull/2344) | 2026-05-14 | `83ae0099` | Stop stale session ralplan loops. |
| [#2345](https://github.com/Yeachan-Heo/oh-my-codex/pull/2345) | 2026-05-15 | `c3286781` | Team tmux submit confirmation for wrapped drafts. |
| [#2347](https://github.com/Yeachan-Heo/oh-my-codex/pull/2347) | 2026-05-15 | `8c570831` | Stale notify wrapper recursion prevention. |
| [#2349](https://github.com/Yeachan-Heo/oh-my-codex/pull/2349) | 2026-05-15 | `8180edfa` | Windows MCP sibling watchdog compatibility. |
| [#2351](https://github.com/Yeachan-Heo/oh-my-codex/pull/2351) | 2026-05-15 | `e12950c3` | Notify dispatcher fork-bomb prevention. |
| [#2357](https://github.com/Yeachan-Heo/oh-my-codex/pull/2357) | 2026-05-15 | `3c1b9a24` | Tmux question diagnostic false-positive fix. |
| [#2359](https://github.com/Yeachan-Heo/oh-my-codex/pull/2359) | 2026-05-15 | `356c03d3` | Worker tmux rc fan-out fix. |
| [#2360](https://github.com/Yeachan-Heo/oh-my-codex/pull/2360) | 2026-05-16 | `ad232242` | Targeted CI lanes. |
| [#2361](https://github.com/Yeachan-Heo/oh-my-codex/pull/2361) | 2026-05-16 | `de73174b` | Reliable omx-api CLI tests under load. |
| [#2365](https://github.com/Yeachan-Heo/oh-my-codex/pull/2365) | 2026-05-16 | `47ce122e` | Provider env preservation for direct tmux launches. |
| [#2367](https://github.com/Yeachan-Heo/oh-my-codex/pull/2367) | 2026-05-16 | `c82b488c` | Autopilot review survives compaction. |
| [#2372](https://github.com/Yeachan-Heo/oh-my-codex/pull/2372) | 2026-05-18 | `7c1b9735` | SparkShell safety and operator UX. |
| [#2374](https://github.com/Yeachan-Heo/oh-my-codex/pull/2374) | 2026-05-18 | `55737aab` | Recursive `previousNotify` fork fix. |
| [#2375](https://github.com/Yeachan-Heo/oh-my-codex/pull/2375) | 2026-05-18 | `d25c6c70` | Autoresearch-goal Stop reconciliation loop fix. |
| [#2376](https://github.com/Yeachan-Heo/oh-my-codex/pull/2376) | 2026-05-19 | `9cf66f11` | Local real generation compatibility. |

## Issue-backed closure inventory

- [#2254](https://github.com/Yeachan-Heo/oh-my-codex/issues/2254), [#2350](https://github.com/Yeachan-Heo/oh-my-codex/issues/2350), [#2373](https://github.com/Yeachan-Heo/oh-my-codex/issues/2373) — notify dispatcher recursion/fork-bomb failures.
- [#2333](https://github.com/Yeachan-Heo/oh-my-codex/issues/2333), [#2343](https://github.com/Yeachan-Heo/oh-my-codex/issues/2343) — stale Ralph/ralplan Stop state.
- [#2337](https://github.com/Yeachan-Heo/oh-my-codex/issues/2337) — advisor prompt frontmatter parsing.
- [#2340](https://github.com/Yeachan-Heo/oh-my-codex/issues/2340), [#2356](https://github.com/Yeachan-Heo/oh-my-codex/issues/2356) — hook diagnostics false positives for MCP/tmux output.
- [#2348](https://github.com/Yeachan-Heo/oh-my-codex/issues/2348) — Windows MCP sibling watchdog behavior.
- [#2358](https://github.com/Yeachan-Heo/oh-my-codex/issues/2358) — worker tmux rc fan-out/OOM regression.
- [#2363](https://github.com/Yeachan-Heo/oh-my-codex/issues/2363) — provider env unavailable in directly launched tmux sessions.
- [#2366](https://github.com/Yeachan-Heo/oh-my-codex/issues/2366) — autopilot review can be skipped after compaction.
- [#2378](https://github.com/Yeachan-Heo/oh-my-codex/issues/2378) — 0.18.0 release-blocker review findings and smoke coverage.

## Local gates

- PASS — `git merge-base --is-ancestor v0.17.3 dev`.
- PASS — version metadata aligned across `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`, and plugin metadata at `0.18.0`.
- PASS — `npm run build`.
- PASS — `npm run lint`.
- PASS — `npm run check:no-unused`.
- PASS — `node --test dist/cli/__tests__/version-sync-contract.test.js dist/cli/__tests__/api.test.js`.
- PASS — `npm run verify:native-agents`.
- PASS — `npm run verify:plugin-bundle`.
- PASS — `npm run build:full`.
- PASS — `npm run smoke:packed-install`.
- PASS — `cargo fmt --all --check`.
- PASS — `cargo clippy --workspace --all-targets -- -D warnings`.
- PASS — `cargo test -p omx-api -p omx-sparkshell -p omx-explore-harness`.
- PASS — `git diff --check`.
- PASS — release body generated and reviewed before tag push: `node dist/scripts/generate-release-body.js --template RELEASE_BODY.md --out /tmp/RELEASE_BODY.0.18.0.generated.md --current-tag v0.18.0 --previous-tag v0.17.3 --repo Yeachan-Heo/oh-my-codex`.

## CI / publication evidence

- PASS — release-collateral commit `fd7e4779` pushed to `dev`.
- PASS — `dev` CI run [26071952665](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/26071952665) completed successfully for `fd7e4779`.
- PASS — `main` fast-forwarded to `fd7e4779`.
- PASS — `main` CI run [26071975871](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/26071975871) completed successfully for `fd7e4779`.
- PASS — annotated tag `v0.18.0` pushed at `fd7e4779`.
- PASS — release workflow run [26072175376](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/26072175376) completed successfully.
- PASS — GitHub release published: <https://github.com/Yeachan-Heo/oh-my-codex/releases/tag/v0.18.0>.
- PASS — GitHub release contains 57 assets, including `native-release-manifest.json` and per-target archives/checksums for `omx-api`, `omx-explore-harness`, `omx-runtime`, and `omx-sparkshell`.
- PASS — npm registry reports `oh-my-codex@0.18.0` via `npm view oh-my-codex version`.
- PASS — `dev` and `main` both point at shipped commit `fd7e4779`; the pre-tag `dev` CI run for that commit is green.

## Known gaps

- Full `npm run test:ci:compiled` was attempted during release-blocker resolution but stopped after existing attached-OMX/tmux environment-sensitive failures unrelated to the 0.18.0 fixes. The release is covered by targeted compiled tests, full build/lint/no-unused gates, native/plugin verification, packed-install smoke, and Cargo fmt/clippy/test gates.
- Lifecycle-notification grouping remains open as [#2353](https://github.com/Yeachan-Heo/oh-my-codex/issues/2353); this release focuses on preventing recursive notification process storms rather than grouping benign child-agent lifecycle messages.
- GitHub Actions emitted the repository's Node.js 20 deprecation annotation for `actions/checkout@v4`; it did not fail CI or the release workflow.
