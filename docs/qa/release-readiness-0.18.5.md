# Release readiness: oh-my-codex 0.18.5

## Range

- Previous tag: `v0.18.4`.
- Candidate branch during prep: `dev` at `a31cf5d7` before the `0.18.5` release-prep metadata commit.
- Release tag to create after local gates: `v0.18.5`.
- Compare: `v0.18.4..HEAD` before tag, then `v0.18.4..v0.18.5` after tagging.
- Compare shape before release prep: `10` non-merge commits, `0` merge commits, `33` changed files.

## Release scope

`0.18.5` packages the post-`0.18.4` patch train:

- Ultragoal status and recovery clarity when Codex goal storage is unavailable.
- Ultragoal HUD readability, compaction, duplicate-summary suppression, and next-item context.
- Team/Ultragoal HUD pane convergence when pane environment variables are absent.
- Autopilot deep-interview / `omx question` user-decision preservation.
- Doctor shared skill-root warning narrowing.
- Mandatory independent code-reviewer and architect evidence for final Ultragoal completion.

## Merged PR inventory

- #2531 — clarify Ultragoal completion/status when Codex goal DB is unavailable.
- #2532 — keep Ultragoal HUD status readable.
- #2535 — fix Ultragoal HUD and Team pane duplication.
- #2539 — narrow doctor shared skill-root warnings.
- #2544 — preserve user decisions during Autopilot deep-interview intake.
- #2545 — compact Ultragoal HUD summaries.
- #2546 — require independent Ultragoal review evidence.
- #2549 — preserve HUD pane convergence when pane env is absent.
- #2553 — prevent duplicate HUD summaries for combined Ultragoal team state.
- #2554 — keep Ultragoal HUD useful beyond the active item.

## Issue inventory

- `gh issue list --state closed --limit 50 --search "closed:>2026-05-26" --json number,title,closedAt,url,author` returned `[]` during release prep.
- No separately closed issue required an additional release-note entry beyond the merged PR inventory.

## Local validation evidence

Completed final gates for this cut:

- [x] Release workflow version-sync probe — PASS (`package=0.18.5`, `workspace=0.18.5`, `tag=v0.18.5`); `Cargo.lock` crate package entries are updated to `0.18.5`. Log: `.omx/logs/release-0.18.5-workflow-version-sync.log`.
- [x] `npm run build` — PASS. Log: `.omx/logs/release-0.18.5-build.log`.
- [x] `npm run lint` — PASS. Log: `.omx/logs/release-0.18.5-lint.log`.
- [x] `npm run check:no-unused` — PASS. Log: `.omx/logs/release-0.18.5-no-unused.log`.
- [x] `npm run verify:native-agents` — PASS. Log: `.omx/logs/release-0.18.5-verify-native-agents.log`.
- [x] `npm run sync:plugin` — PASS. Log: `.omx/logs/release-0.18.5-sync-plugin.log`.
- [x] `npm run verify:plugin-bundle` — PASS. Log: `.omx/logs/release-0.18.5-verify-plugin-bundle.log`.
- [x] `node dist/scripts/generate-catalog-docs.js --check` — PASS. Log: `.omx/logs/release-0.18.5-catalog-docs-check.log`.
- [x] `git diff --check` — PASS (`PASS: git diff --check produced no whitespace errors.`). Log: `.omx/logs/release-0.18.5-diff-check.log`.
- [x] `npm pack --dry-run` — PASS (`oh-my-codex-0.18.5.tgz`, package size `3.6 MB`, unpacked size `22.2 MB`, `2974` files). Log: `.omx/logs/release-0.18.5-npm-pack-dry-run.log`.
- [x] `npm run test` — LOCAL ENV-CONTAMINATED FULL RUN: `5404` pass / `3` fail / `1` skipped. The failures were isolated to active-session environment contamination (`USE_OMX_EXPLORE_CMD`, boxed `OMX_ROOT`, symlinked TMPDIR) and one timeout race in the combined run. Log: `.omx/logs/release-0.18.5-npm-test.log`.
- [x] Failed-test clean-environment rerun — PASS for `dist/cli/__tests__/auth.test.js`, `dist/hooks/extensibility/__tests__/dispatcher.test.js`, and after unsetting boxed OMX env, `dist/compat/__tests__/doctor-contract.test.js`. Logs: `.omx/logs/release-0.18.5-failed-tests-clean-env.log`, `.omx/logs/release-0.18.5-compat-clean-env.log`.

## CI validation evidence

- `dev` candidate CI for pre-release-prep commit `a31cf5d7866c02fe00cc18c420ae823ecdc352bc` completed successfully.
- Workflow: `CI`.
- Run ID: `26455278920`.
- URL: https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/26455278920
- Created: `2026-05-26T14:42:12Z`; updated: `2026-05-26T14:48:21Z`.
- Conclusion: `success`.
- Known gap: the release-prep commit itself changes only version metadata and release collateral, so post-prep local gates plus the tag-triggered release workflow remain the final publication gates.

## No-publish / no-tag evidence before final tag

- `git tag --list 'v0.18.5'` showed no local `v0.18.5` tag before tagging.
- `git tag --points-at HEAD` showed no tag at the release-prep worktree HEAD before the release commit.
- No `npm publish` command was run by local prep; publication is delegated to the release workflow after `v0.18.5` tag push.

## External release actions

1. Commit release prep using the Lore commit protocol.
2. Push `dev` with the release prep.
3. Merge `dev` to `main`.
4. Create/push tag `v0.18.5` from merged `main`.
5. Verify GitHub release workflow assets and npm publication.
6. Fill CI/publish evidence in this document after publication if needed.

## Current readiness verdict

Local release prep is ready for commit, merge to `main`, and tag cut. Do not claim `0.18.5` is published until the tag workflow and npm/GitHub release evidence are verified.
