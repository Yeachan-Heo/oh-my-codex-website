# Release Readiness Verdict - 0.15.1

Date: 2026-04-29
Target version: **0.15.1**
Candidate source branch: `dev` / `origin/dev`
Candidate source SHA before local bump: `50b68ee5`
Reachable base tag from candidate source: `v0.14.3`
Compare link: [`v0.14.3...v0.15.1`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.14.3...v0.15.1)
Range note: `v0.15.0` exists but is not an ancestor of the current `dev` release train, so the tag-triggered release workflow must use `v0.14.3` as the reachable compare base.

## Scope

`0.15.1` is a patch release candidate covering direct/non-tmux launch controls, passive state reads, repo-aware Team DAG dependency remapping after task creation, setup/plugin-mode hardening, audited exec follow-ups, MCP/runtime reliability fixes, docs, and release collateral.

## Changed execution paths reviewed

- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`, `plugins/oh-my-codex/.codex-plugin/plugin.json` — release metadata aligned to `0.15.1`.
- `CHANGELOG.md`, `RELEASE_BODY.md`, `docs/release-notes-0.15.1.md`, `docs/qa/release-readiness-0.15.1.md` — release collateral aligned to `0.15.1`.
- `src/state/operations.ts` and state MCP tests — read-only state operations stay side-effect-free while mutating operations still initialize required runtime state.
- `src/team/repo-aware-decomposition.ts`, `src/team/runtime.ts`, and Team tests — symbolic DAG dependencies are remapped to concrete task IDs after task creation.
- `src/cli/index.ts`, README, release notes, and launch fallback tests — direct/detached-tmux launch policy and escape hatches are documented and tested.

## Verification evidence

| Gate | Command | Result | Notes |
| --- | --- | --- | --- |
| TypeScript build | `npm run build` | PASS | Rebuilt `dist/` after local 0.15.1 bump. |
| Native agent generation check | `npm run verify:native-agents` | PASS | `verified 20 installable native agents and 33 setup prompt assets`. |
| Plugin bundle / mirror check | `npm run verify:plugin-bundle` | PASS | `verified 29 canonical skill directories and plugin metadata`. |
| Lint | `npm run lint` | PASS | `Checked 581 files ... No fixes applied.` |
| No-unused typecheck | `npm run check:no-unused` | PASS | Completed with exit code `0`. |
| Focused recent regression lane | `npm run test:recent-bug-regressions:compiled` | PASS | 462 tests passed after local 0.15.1 metadata bump. |

## Known limits / skipped checks

- External GitHub CI, release tag creation, npm publish, and GitHub release publication are intentionally not run by this local prep step.
- Full `npm test`, packed install smoke, cross-OS manual checks, and Cargo workspace tests are recommended before external publication if GitHub CI is unavailable.

## Verdict

**Local release prep is ready after the final verification pass.** Do not tag or publish `v0.15.1` until CI is green and a maintainer intentionally runs the tag/publish release flow.
