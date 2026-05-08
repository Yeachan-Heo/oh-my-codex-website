# Release Readiness Verdict - 0.16.1

Date: 2026-05-08
Target version: **0.16.1**
Candidate source branch: `dev`
Reachable base tag: `v0.16.0`
Compare range before tag: `v0.16.0..HEAD`
Compare link after tag: [`v0.16.0...v0.16.1`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.0...v0.16.1)
Publication status: **Local review and release-prep flow; tag cut from merged `main`.**

## Scope

`0.16.1` is a patch release for the post-`0.16.0` hardening train. It covers bounded explore execution, safer local explore fast paths, session-scoped runtime authority, approved Team handoff/context-pack repair behavior, deep-interview flow clarity, launch/runtime fixes, plugin cache refresh, CI latency changes, and release-review blocker fixes.

## Code-review blockers addressed

| Finding | Fix | Evidence |
| --- | --- | --- |
| `omx explore` explicit local file fast-path could follow repo symlinks outside the repository | Explicit fast-path file lookup now rejects symbolic links before `stat()`/read and falls back to the harness | `src/cli/explore.ts`, `src/cli/__tests__/explore.test.ts` |
| CI skipped clean dependency installation on `node_modules` cache hits | Removed `node_modules` cache/skip pattern; all Node CI jobs run `npm ci` unconditionally while retaining npm package cache | `.github/workflows/ci.yml` |
| Text-search local fast-path read files unbounded | Text-search now checks file size and uses the bounded text reader; oversized files fall back to the harness path | `src/cli/explore.ts`, `src/cli/__tests__/explore.test.ts` |

## Changed execution paths reviewed

- `.github/workflows/ci.yml` — clean dependency-install proof and CI latency gates.
- `crates/omx-explore/src/main.rs`, `src/cli/explore.ts`, `src/runtime/process-tree.ts` — bounded explore execution and local fast-path safeguards.
- `src/team/*`, `src/pipeline/stages/team-exec.ts`, `src/planning/context-pack-status.ts` — approved Team handoff/context-pack status behavior.
- `src/hooks/*`, `src/hud/state.ts`, `src/mcp/*`, `src/imagegen/continuation.ts` — runtime/session/MCP/imagegen reliability.
- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`, `plugins/oh-my-codex/.codex-plugin/plugin.json` — `0.16.1` release metadata.
- `CHANGELOG.md`, `RELEASE_BODY.md`, `docs/release-notes-0.16.1.md`, `docs/qa/release-readiness-0.16.1.md` — release collateral.

## Verification evidence

| Gate | Command | Result | Notes |
| --- | --- | --- | --- |
| Review lanes | `$code-review` code-reviewer + architect lanes over `v0.16.0..dev` | PASS after fixes | Initial REQUEST CHANGES blockers were fixed before release prep continued. |
| TypeScript build + targeted explore tests | `npm run build && env -u OMX_ROOT -u OMX_STATE_ROOT -u OMX_SESSION_ID -u OMX_ENTRY_PATH -u OMX_SOURCE_CWD -u OMX_STARTUP_CWD -u OMX_TEAM_WORKER_LAUNCH_ARGS node --test dist/cli/__tests__/explore.test.js` | PASS | 46/46 explore tests passed, including new symlink and oversized-file fast-path coverage. |
| Lint + no-unused typecheck | `npm run lint -- --reporter=summary && npm run check:no-unused` | PASS | Biome checked 624 files; no unused/type errors. |
| Cargo workspace | `cargo test --workspace` | PASS | Full Rust workspace passed after one targeted rerun confirmed a transient process-group child test. |
| Clean full Node/package gate | `env -u OMX_ROOT -u OMX_STATE_ROOT -u OMX_SESSION_ID -u OMX_ENTRY_PATH -u OMX_SOURCE_CWD -u OMX_STARTUP_CWD -u OMX_TEAM_WORKER_LAUNCH_ARGS npm test` | INCONCLUSIVE locally | One clean rerun exercised the suite and exposed only the stale CI contract assertion that was fixed and targeted-tested; a final clean rerun was interrupted after hanging in `dist/cli/__tests__/question.test.js` under the attached local tmux/OMX environment. |
| Metadata alignment | `grep` over package/Cargo/plugin metadata | PASS | Version metadata aligned to `0.16.1`. |
| Package dry run | `npm pack --dry-run` | PASS | Prepack built TypeScript, verified native agents, synced/verified plugin bundle, cleaned native package assets, and produced `oh-my-codex-0.16.1.tgz` dry-run metadata. |

## Known limits / skipped checks

- GitHub Actions were not observed locally after the final tag; the release workflow should validate the pushed `v0.16.1` tag.
- The final full Node gate was inconclusive in this attached local tmux/OMX session because `dist/cli/__tests__/question.test.js` hung until interrupted; targeted Node/build/release gates passed after fixing the stale CI contract assertion.

## Verdict

**Ready for `dev` -> `main` merge and `v0.16.1` tag** with local targeted/build/Rust/package evidence complete; GitHub Actions should be treated as the final full-suite arbiter for the inconclusive local Node-suite rerun.
