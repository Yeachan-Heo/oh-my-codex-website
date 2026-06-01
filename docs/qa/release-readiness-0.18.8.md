# Release readiness: oh-my-codex 0.18.8

## Range

- Previous tag: `v0.18.7`.
- Candidate branch during prep: `release/0.18.8` from `dev`.
- Release tag to create after main CI and local tag validation: `v0.18.8`.
- Compare: `v0.18.7..HEAD` before tag, then `v0.18.7..v0.18.8` after tagging.
- Release-prep branch target: `dev`.
- Current dev tip at planning time: `1989cbc5` (`Show HUD late-gate status without changing workflow state (#2686)`).
- Dev HEAD CI evidence before release prep: run `26736590603`, completed/success.

## Release scope

`0.18.8` packages the post-`0.18.7` runtime reliability train:

- HUD/source-pane/session ownership hardening across native session drift, prompt revive, fallback authority, resize hooks, deleted cwd, and escaped tmux separator cases.
- Autopilot terminal replay prevention, context snapshot hardening, and task-seed provenance clarification.
- Plugin hook cache, setup-mode preservation, oversized Stop semantics, JSON fallback, and mirror metadata verification fixes.
- Team disablement and tmux worktree startup compatibility updates.
- Native subagent routing, native executor lane, state operation help, UltraQA harness guidance, and release/CI evidence improvements.
- README maintainer/contributor table and Discord invite updates.

## Merged PR inventory

- [#2686](https://github.com/Yeachan-Heo/oh-my-codex/pull/2686) — Show HUD late-gate status.
- [#2685](https://github.com/Yeachan-Heo/oh-my-codex/pull/2685) — Maintainer CI for PR #2682 HUD orphan reaping.
- [#2684](https://github.com/Yeachan-Heo/oh-my-codex/pull/2684) — Fix HUD dedupe across native session IDs.
- [#2677](https://github.com/Yeachan-Heo/oh-my-codex/pull/2677) — Fix stale plugin hook cache refresh.
- [#2676](https://github.com/Yeachan-Heo/oh-my-codex/pull/2676) — Scope HUD tmux splits to source panes.
- [#2675](https://github.com/Yeachan-Heo/oh-my-codex/pull/2675) — Prevent Autopilot terminal turn replay reactivation.
- [#2672](https://github.com/Yeachan-Heo/oh-my-codex/pull/2672) — Verify plugin hook metadata during mirror sync.
- [#2657](https://github.com/Yeachan-Heo/oh-my-codex/pull/2657) — ci: use gajae self-hosted linux runner.
- [#2652](https://github.com/Yeachan-Heo/oh-my-codex/pull/2652) — Fix session-authoritative HUD state.
- [#2671](https://github.com/Yeachan-Heo/oh-my-codex/pull/2671) — Clarify Autopilot task-seed provenance.
- [#2664](https://github.com/Yeachan-Heo/oh-my-codex/pull/2664) — Deduplicate legacy focused HUD panes on prompt revive.
- [#2660](https://github.com/Yeachan-Heo/oh-my-codex/pull/2660) — Prevent HUD fallback authority respawn storms.
- [#2670](https://github.com/Yeachan-Heo/oh-my-codex/pull/2670) — Seed and harden Autopilot context snapshots.
- [#2667](https://github.com/Yeachan-Heo/oh-my-codex/pull/2667) — Mirror oversized Stop semantics in plugin hook.
- [#2666](https://github.com/Yeachan-Heo/oh-my-codex/pull/2666) — Keep native executor lanes leaf-only.
- [#2661](https://github.com/Yeachan-Heo/oh-my-codex/pull/2661) — Fix plugin Stop hook launcher JSON fallback.
- [#2665](https://github.com/Yeachan-Heo/oh-my-codex/pull/2665) — Optimize CI lanes for GJC evidence artifacts.
- [#2656](https://github.com/Yeachan-Heo/oh-my-codex/pull/2656) — Scope HUD resize hooks by leader pane.
- [#2654](https://github.com/Yeachan-Heo/oh-my-codex/pull/2654) — Make Team mode disableable.
- [#2655](https://github.com/Yeachan-Heo/oh-my-codex/pull/2655) — Prevent HUD doctor panes from materializing deleted cwd.
- [#2651](https://github.com/Yeachan-Heo/oh-my-codex/pull/2651) — Clarify clean-context for code-review subagents.
- [#2643](https://github.com/Yeachan-Heo/oh-my-codex/pull/2643) — Harden UltraQA temporary harness guidance.
- [#2650](https://github.com/Yeachan-Heo/oh-my-codex/pull/2650) — Prevent planning-phase writes under native session drift.
- [#2649](https://github.com/Yeachan-Heo/oh-my-codex/pull/2649) — Preserve plugin setup mode during update refresh.
- [#2648](https://github.com/Yeachan-Heo/oh-my-codex/pull/2648) — Fix HUD duplicate pane race after prompt revive.
- [#2642](https://github.com/Yeachan-Heo/oh-my-codex/pull/2642) — Fix HUD pane detection with escaped tmux separators.
- [#2636](https://github.com/Yeachan-Heo/oh-my-codex/pull/2636) — Fix default native subagent routing guidance.
- [#2646](https://github.com/Yeachan-Heo/oh-my-codex/pull/2646) — Support state operation help.
- [#2640](https://github.com/Yeachan-Heo/oh-my-codex/pull/2640) — Fix team worker startup compatibility for tmux worktrees.
- [#2596](https://github.com/Yeachan-Heo/oh-my-codex/pull/2596) — Update README Discord invite on main.

## Internal/no-PR commits in compare range

- `ff17267b` — Use maintainer real names in README.
- `61593464` — Merge dev into main for 0.18.7 release docs.
- `b281a3b7` — Place iqdoctor in maintainer tables.
- `42654501` — List iqdoctor among top collaborators.

## Issue inventory

- No separately closed GitHub issues were found for the `v0.18.7..HEAD` release range during local release prep.
- The release scope is represented by the merged PR inventory above.

## Local validation evidence

All commands were run on `release/0.18.8` with `USE_OMX_EXPLORE_CMD` unset where relevant so deprecated compatibility routing does not contaminate release results.

- [x] Release workflow version-sync probe: `node dist/scripts/check-version-sync.js --tag v0.18.8` — PASS, `.omx/release-0.18.8/logs/version-sync-targeted-final.log`.
- [x] `npm run build` — PASS before and after test-script hardening, `.omx/release-0.18.8/logs/build.log` and `build-after-test-script-fix.log`.
- [x] `npm run lint` — PASS, `.omx/release-0.18.8/logs/lint-after-script-fix.log`.
- [x] `npm run check:no-unused` — PASS, `.omx/release-0.18.8/logs/no-unused-after-script-fix.log`.
- [x] `npm run verify:native-agents` — PASS via `.omx/release-0.18.8/logs/verify-native-agents.log` and full compiled CI.
- [x] `npm run sync:plugin` / `npm run sync:plugin:check` — PASS, `.omx/release-0.18.8/logs/sync-plugin.log`, `sync-plugin-check-targeted-final.log`.
- [x] `npm run verify:plugin-bundle` — PASS, `.omx/release-0.18.8/logs/verify-plugin-bundle.log` and full compiled CI.
- [x] `node dist/scripts/generate-catalog-docs.js --check` — PASS, `.omx/release-0.18.8/logs/catalog-docs-check.log` and full compiled CI.
- [x] `npm test` — PASS after unsetting `USE_OMX_EXPLORE_CMD`, `.omx/release-0.18.8/logs/npm-test-unset-explore-env.log` (`5745` tests, `5745` pass). Earlier contaminated attempts are retained in logs and were not used as final evidence.
- [x] `npm run test:ci:compiled` — PASS, `.omx/release-0.18.8/logs/test-ci-compiled-after-fix-2.log` (`5745` tests, `5745` pass).
- [x] `npm run test:compat:node` — PASS, `.omx/release-0.18.8/logs/test-compat-node.log`.
- [x] `npm run test:sparkshell` — PASS, `.omx/release-0.18.8/logs/test-sparkshell.log`.
- [x] `npm run test:explore` — PASS, `.omx/release-0.18.8/logs/test-explore.log`.
- [x] `ralph-prd-smoke` through `node dist/scripts/run-test-files.js dist/cli/__tests__/ralph-prd-smoke.test.js` — PASS, `.omx/release-0.18.8/logs/ralph-prd-smoke-sanitized.log`.
- [x] `node --test dist/scripts/__tests__/smoke-packed-install.test.js` — PASS, `.omx/release-0.18.8/logs/smoke-packed-install.log`.
- [x] `npm run test:team:cross-rebase-smoke:compiled` — PASS after routing through the runtime-env sanitizer, `.omx/release-0.18.8/logs/team-cross-rebase-smoke-compiled-official.log`.
- [x] `team-delivery-e2e-smoke` through `node dist/scripts/run-test-files.js dist/team/__tests__/delivery-e2e-smoke.test.js` — PASS, `.omx/release-0.18.8/logs/team-delivery-e2e-smoke-sanitized.log`.
- [x] `node --test dist/team/__tests__/hook-primary-e2e-contract.test.js` — PASS, `.omx/release-0.18.8/logs/team-hook-primary-e2e-contract.log`.
- [x] `WORKER_COUNT=5 bash src/scripts/demo-team-e2e.sh` — PASS after commit with the unrelated 0.18.7 note temporarily stashed/restored, `.omx/release-0.18.8/logs/demo-team-e2e-5-workers-final-2.log`. The default 6-worker demo could not fit the current tmux pane layout; 5 workers is the script-supported minimum.
- [x] `node dist/scripts/eval/eval-parity-smoke.js` — PASS after routing through the runtime-env sanitizer, `.omx/release-0.18.8/logs/eval-parity-smoke-official.log`.
- [x] `npm run test:recent-bug-regressions:compiled` — PASS after routing through the runtime-env sanitizer, `.omx/release-0.18.8/logs/recent-bug-regressions-compiled-official.log`.
- [x] `npm run test:team:worker-runtime-identity:compiled` — PASS after routing through the runtime-env sanitizer, `.omx/release-0.18.8/logs/team-worker-runtime-identity-compiled-official.log`.
- [x] `npm run test:plugin-boundaries:compiled` — PASS, `.omx/release-0.18.8/logs/plugin-boundaries-compiled-official.log`.
- [x] `npm run test:ralph-persistence:compiled` — PASS after routing through the runtime-env sanitizer, `.omx/release-0.18.8/logs/ralph-persistence-compiled-official.log`.
- [x] `npm run test:explicit-terminal-contract:compiled` — PASS after routing through the runtime-env sanitizer, `.omx/release-0.18.8/logs/explicit-terminal-contract-compiled-official.log`.
- [x] `omx doctor` — PASS, `.omx/release-0.18.8/logs/omx-doctor.log`.
- [x] `codex login status` — PASS, `.omx/release-0.18.8/logs/codex-login-status.log`.
- [x] `omx exec --skip-git-repo-check -C . "Reply with exactly OMX-EXEC-OK"` — PASS, `.omx/release-0.18.8/logs/omx-exec-ok.log`.
- [x] `npm run test:reply-listener:live` — PASS, `.omx/release-0.18.8/logs/reply-listener-live.log`.
- [x] tmux live team/HUD path — PASS via `WORKER_COUNT=5 bash src/scripts/demo-team-e2e.sh`, which created worker panes, reported leader/HUD/worker pane ids, exercised team API task/mailbox flow, and force-cleaned demo state.
- [ ] Generated release body check for `v0.18.7...v0.18.8` — pending local annotated tag after main CI.
- [x] `git diff --check` — PASS, `.omx/release-0.18.8/logs/git-diff-check-targeted-final.log`.
- [x] `npm pack --dry-run` — PASS, `.omx/release-0.18.8/logs/npm-pack-dry-run-targeted-final.log`.

### Validation notes

- Direct standalone `node --test` invocations for stateful OMX runtime tests can inherit live `.omx` session state and fail falsely inside an active OMX release session. The release candidate now routes the affected narrow compiled scripts and eval parity smoke through `dist/scripts/run-test-files.js`, matching the full-suite sanitizer that already underpins `npm test` and `npm run test:ci:compiled`.
- `docs/release-notes-0.18.7.md` remains untracked and intentionally excluded from release staging.

## CI / PR evidence

- PR targeting `dev`: pending.
- Release-prep PR CI: pending.
- Merge to `dev`: pending.
- Post-merge dev CI: pending.
- Promotion to `main`: pending.
- Main CI: pending.
- Local annotated tag validation: pending.
- Tag-triggered release workflow: pending.
- GitHub release proof: pending.
- npm latest proof: pending.
- Final dev sync CI: pending.

## No-publish / no-tag evidence before final tag

- Do not push `v0.18.8` until release collateral is complete, all mandatory local/e2e/live gates are pass or explicitly adjudicated, the release PR is merged, main CI is green, and local annotated tag release-body validation succeeds.
- No local `npm publish` command is intended; publication remains delegated to the release workflow after tag push.

## Current readiness verdict

Release prep local/e2e/live gates are complete for PR handoff. Publication remains blocked until PR/CI promotion, local tag validation, release workflow, GitHub release, npm, and final dev sync proof are recorded.
