# Release Readiness Verdict - 0.16.0

Date: 2026-05-06
Target version: **0.16.0**
Candidate source branch: `dev`
Candidate source SHA: `e134967863352955feb477e7c4bd2a52b82eeb19`
Reachable base tag: `v0.15.3`
Compare range before tag: `v0.15.3..HEAD`
Compare link after tag: [`v0.15.3...v0.16.0`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.15.3...v0.16.0)
Commit count in reviewed range: **77**
Changed-file count in reviewed range: **216**
Publication status: **Local candidate ready; publication remains blocked until GitHub CI passes and tag/npm/GitHub release are explicitly authorized.**

## Scope

`0.16.0` is a minor release candidate for skill deprecation and native Codex goal-mode integration. It covers durable `ultragoal`, `performance-goal`, and `autoresearch-goal` workflows; Codex goal snapshot reconciliation; Ralph/Team goal-mode handoff safety; catalog/plugin skill delivery cleanup; and supporting reliability/docs/tooling changes since `v0.15.3`. Local prep includes uncommitted release metadata, release notes, readiness evidence, and three verification-stability fixes listed in the post-pack diff.

## Mandatory compatibility statement

obsolete skills retired from installable/plugin delivery where catalog-deprecated; deprecated root wrappers may remain as compatibility stubs.

## Mandatory goal-mode upgrade note

`ultragoal`, `performance-goal`, and `autoresearch-goal` require fresh Codex goal snapshots for durable completion reconciliation; OMX does not mutate hidden Codex goal state directly.

## Release evidence ledger

| Headline claim | Source evidence | Verification evidence | Status |
| --- | --- | --- | --- |
| Native goal-mode workflows are first-class release surfaces | `src/cli/ultragoal.ts`, `src/cli/performance-goal.ts`, `src/cli/autoresearch-goal.ts`, `docs/ultragoal.md`, `docs/performance-goal.md`, `docs/autoresearch-goal.md`, commits `5277152f`, `f7fbb97b`, `9814c162` | Clean `npm test` passed 4564/4564, with targeted goal workflow suite passed 46/46 | Verified locally |
| Completion requires fresh Codex goal snapshot reconciliation | `src/goal-workflows/codex-goal-snapshot.ts`, `src/goal-workflows/validation.ts`, commits `448f17d3`, `8e6650d8` | Covered by clean `npm test` and targeted goal workflow suite | Verified locally |
| Ralph/Team handoffs respect goal-mode truth boundaries | `src/cli/ralph.ts`, `src/team/goal-workflow.ts`, `src/team/approved-execution.ts`, commits `ed3c2ace`, `1e99d1d0`, `f5abbec9` | Clean `npm test` passed; Team approved-execution targeted rerun passed 4/4 after explicit state-root fixture fix | Verified locally |
| Obsolete skills retired from installable/plugin delivery where catalog-deprecated; deprecated root wrappers may remain as compatibility stubs. | `src/catalog/manifest.json`, `templates/catalog-manifest.json`, `src/scripts/sync-plugin-mirror.ts`, plugin skill deletions/additions in `plugins/oh-my-codex/skills/`, commit `fa5a6430` | `npm run verify:plugin-bundle`, generated catalog-doc check, clean `npm test`, and `npm pack --dry-run` passed | Verified locally |
| Direct `omx autoresearch` remains deprecated with goal-mode replacement path | `src/cli/autoresearch.ts`, `src/autoresearch/goal.ts`, `skills/autoresearch-goal/SKILL.md`, `plugins/oh-my-codex/skills/autoresearch-goal/SKILL.md` | Covered by clean `npm test` and targeted goal workflow suite | Verified locally |
| Notification transports honor proxy environments | `src/notifications/http-client.ts`, `src/notifications/dispatcher.ts`, commit `a43b1b7f`, PR `#2113` | Covered by clean `npm test`; notify dispatch targeted rerun passed 27/27 after legacy fallback fixture correction | Verified locally |
| Explore startup environment and timeout behavior are bounded | `crates/omx-explore/src/main.rs`, `src/cli/explore.ts`, commit `3b4274f3` | `cargo test --workspace` passed after process-group timeout fixture stabilization | Verified locally |
| Release metadata aligned to 0.16.0 | `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`, `plugins/oh-my-codex/.codex-plugin/plugin.json` | Metadata grep after edits | Verified locally before gates |

## Commit / PR buckets

- **Skill deprecation/catalog delivery:** `fa5a6430`, `9814c162`, plugin skill removals/additions, catalog manifest updates.
- **Goal-mode native integration:** `ed3c2ace`, `1e99d1d0`, `5277152f`, `f7fbb97b`, `448f17d3`, `8e6650d8`.
- **Tests/QA/tooling:** `9208af54`, `b47f1ea1`, CI split/coverage changes, added goal workflow and CLI tests.
- **Documentation:** `34aa3884`, `18e0df55`, `24cb8cfb`, goal workflow docs, Discord/proxy docs, pipeline templates.
- **Operational reliability:** `a43b1b7f`, `3b4274f3`, `dffc5761`, `0eb91249`, `dc3f475a`, `e3569b3d`.
- **Release/package metadata:** local `0.16.0` metadata updates in this prep branch.

## Changed execution paths reviewed

- `src/goal-workflows/*`, `src/ultragoal/*`, `src/performance-goal/*`, `src/autoresearch/goal.ts` — durable goal artifacts and Codex snapshot reconciliation.
- `src/cli/{index,ultragoal,performance-goal,autoresearch-goal,autoresearch}.ts` — goal workflow commands and autoresearch deprecation surface.
- `src/team/{goal-workflow,approved-execution,runtime}.ts`, `src/cli/ralph.ts` — approved execution and Ralph goal-mode handoffs.
- `skills/*`, `plugins/oh-my-codex/skills/*`, `src/catalog/manifest.json`, `templates/catalog-manifest.json` — skill catalog/plugin delivery changes.
- `src/notifications/*`, `crates/omx-explore/*`, `.github/workflows/ci.yml` — operational and verification hardening.
- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`, `plugins/oh-my-codex/.codex-plugin/plugin.json` — release metadata.

## Verification evidence

| Gate | Command | Result | Notes |
| --- | --- | --- | --- |
| Metadata alignment | `grep -R "0\.15\.3" -n package.json package-lock.json Cargo.toml Cargo.lock plugins/oh-my-codex/.codex-plugin/plugin.json .agents/plugins/marketplace.json` | PASS | No stale `0.15.3` in version metadata surfaces after local bump. |
| Build | `npm run build` | PASS | Ran as part of `npm test` and `npm pack --dry-run`; package version reported `0.16.0`. |
| Native agents | `npm run verify:native-agents` | PASS | `verified 18 installable native agents and 33 setup prompt assets`. |
| Plugin bundle | `npm run verify:plugin-bundle` | PASS | `verified 26 canonical skill directories and plugin metadata`. |
| Lint | `npm run lint` | PASS | `Checked 614 files in 100ms. No fixes applied.` Log: `.omx/logs/release-0.16.0-final-local-gates.log`. |
| No-unused typecheck | `npm run check:no-unused` | PASS | Completed with exit code `0`. Log: `.omx/logs/release-0.16.0-final-local-gates.log`. |
| Generated catalog-doc check | `node dist/scripts/generate-catalog-docs.js --check` | PASS | `catalog check ok`; also covered by final clean `npm test`. Log: `.omx/logs/release-0.16.0-local-gates.log`. |
| Pack smoke | `npm pack --dry-run` | PASS | Produced `oh-my-codex-0.16.0.tgz`; prepack built, synced plugin mirror, verified native agents/plugin bundle, and cleaned native package assets. Log: `.omx/logs/release-0.16.0-final-local-gates.log`. |
| Goal workflow targeted tests | `node --test dist/cli/__tests__/ultragoal.test.js ... dist/catalog/__tests__/plugin-bundle-ssot.test.js` | PASS | 46/46 passed after approved-execution fixture/root handling fixes. Log: `.omx/logs/release-0.16.0-targeted-goal-tests-after-fixes.log`. |
| Team approved-execution targeted rerun | `node --test dist/team/__tests__/approved-execution.test.js` | PASS | 4/4 passed after unboxing `OMX_ROOT` for explicit state-root assertions. Log: `.omx/logs/release-0.16.0-approved-execution-rerun2.log`. |
| Notify dispatch targeted rerun | `node --test dist/hooks/__tests__/notify-hook-team-dispatch.test.js` | PASS | 27/27 passed after making the legacy fallback fixture queue a real legacy request before corrupting dispatch state. Log: `.omx/logs/release-0.16.0-notify-dispatch-rerun-after-fix.log`. |
| Full Node/package gate | `env -u OMX_ROOT -u OMX_STATE_ROOT -u OMX_SESSION_ID -u OMX_ENTRY_PATH -u OMX_SOURCE_CWD -u OMX_STARTUP_CWD -u OMX_TEAM_WORKER_LAUNCH_ARGS npm test` | PASS | Clean release-gate environment passed 4564/4564 tests and `catalog check ok`. Earlier live OMX/tmux-session runs failed/terminated because state/tmux-sensitive tests observed active runtime contamination; the clean release gate passed after fixture fixes. Log: `.omx/logs/release-0.16.0-npm-test-clean-final.log`. |
| Cargo workspace verification | `cargo test --workspace` | PASS | Workspace passed after stabilizing the `omx-explore` timeout/process-group child readiness fixture. Log: `.omx/logs/release-0.16.0-cargo-test-after-fixes.log`. |
| Post-pack status/diff review | `git status --short --branch && git diff --name-only` | PASS | Intended local prep diff only: release metadata/docs plus verification-stability fixes in `crates/omx-explore/src/main.rs`, `src/hooks/__tests__/notify-hook-team-dispatch.test.ts`, and `src/team/__tests__/approved-execution.test.ts`. Log: `.omx/logs/release-0.16.0-final-local-gates.log`. |
| GitHub CI | GitHub Actions on release candidate | NOT RUN | Required before tag/npm/GitHub publication. |

## Known limits / skipped checks

- GitHub CI, tag creation, npm publish, and GitHub release publication have not been run by this local prep step.
- Publication remains blocked until GitHub CI is green and a human explicitly authorizes tag creation, npm publication, and GitHub release publication.

## Verdict

**Local release candidate ready.** The release collateral, metadata, targeted suites, clean full Node/package gate, Cargo workspace tests, lint, no-unused check, generated catalog-doc check, pack smoke, and post-pack diff review are complete for `0.16.0`. Do not publish until GitHub CI is green and tag/npm/GitHub release are explicitly authorized.
