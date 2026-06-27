# Release readiness: oh-my-codex 0.18.16

## Scope

- Previous released tag: `v0.18.15` (`e9e3bcc7`, published 2026-06-25T11:15:41Z).
- Candidate branch during prep: `dev` / `origin/dev`.
- Frozen candidate at intake: `5ea96e6c` (`Guard stale Ralph stop continuations (#2975)`) plus local release metadata/collateral updates to `0.18.16`.
- Selected release version: `0.18.16`.
- Release tag to create after local gates and dev/main promotion: `v0.18.16`.

This file is the release-prep readiness record for the `0.18.16` candidate. Publication proof is appended after CI, tag workflow, GitHub release creation, and npm publication complete.

## Release summary

`0.18.16` packages the post-`0.18.15` patch train:

- local session friction reporting for resume/search diagnostics;
- stale HUD review status and Ralph Stop continuation guards;
- safer doctor warnings for root-owned repository artifacts.

No breaking CLI/package/plugin layout changes are intended.

## Compare-range inventory

Exact compare range used for release notes:

```sh
git log --oneline v0.18.15..dev
```

Inventory at release prep:

- `5ea96e6c` — Guard stale Ralph stop continuations (#2975)
- `8f40e9e1` — Fix root-owned artifact warning in omx doctor (#2973)
- `1097da93` — Fix HUD stale review status (#2972)
- `32d90a79` — Add local session friction report (#2970)

Merged PRs:

- [#2970](https://github.com/Yeachan-Heo/oh-my-codex/pull/2970) — Add local session friction report — merged 2026-06-25T12:39:07Z by `Yeachan-Heo`.
- [#2972](https://github.com/Yeachan-Heo/oh-my-codex/pull/2972) — Fix HUD stale review status — merged 2026-06-25T16:49:10Z by `Yeachan-Heo`.
- [#2973](https://github.com/Yeachan-Heo/oh-my-codex/pull/2973) — Fix root-owned artifact warning in omx doctor — merged 2026-06-25T20:17:41Z by `iqdoctor`.
- [#2975](https://github.com/Yeachan-Heo/oh-my-codex/pull/2975) — Guard stale Ralph stop continuations — merged 2026-06-26T07:44:52Z by `Yeachan-Heo`.

## Version metadata

- Root `package.json` and `package-lock.json`: bumped to `0.18.16`.
- Root `Cargo.toml` workspace package version and root `Cargo.lock` workspace packages (`omx-api`, `omx-explore-harness`, `omx-mux`, `omx-runtime`, `omx-runtime-core`, `omx-sparkshell`): bumped to `0.18.16`.
- `plugins/oh-my-codex/.codex-plugin/plugin.json`: synced to `0.18.16`.
- Expected tag: `v0.18.16`.

## Local validation

Commands are run from `/Users/bellman/Documents/Workspace/oh-my-codex` on branch `dev`.

- [x] `node src/scripts/check-version-sync.ts --tag v0.18.16` — PASS (`package=0.18.16 workspace=0.18.16 tag=v0.18.16`).
- [x] `npm run build` — PASS.
- [x] `env -u OMX_SESSION_ID -u OMX_ROOT -u OMX_TEAM_STATE_ROOT -u CODEX_SESSION_ID node --test dist/cli/__tests__/doctor-artifact-ownership.test.js dist/cli/__tests__/session-search-help.test.js dist/cli/__tests__/session-search.test.js dist/hud/__tests__/state.test.js dist/scripts/__tests__/codex-native-hook.test.js dist/session-history/__tests__/friction.test.js` — PASS (`538` tests).
- [x] `npm run verify:native-agents` — PASS (`22` native agents, `37` setup prompt assets).
- [x] `npm run sync:plugin` — PASS (plugin mirror synced).
- [x] `npm run verify:plugin-bundle` — PASS.
- [x] `node dist/scripts/generate-catalog-docs.js --check` — PASS (`catalog check ok`).
- [ ] `node dist/scripts/generate-release-body.js --template RELEASE_BODY.md --out /tmp/RELEASE_BODY.0.18.16.generated.md --current-tag v0.18.16 --previous-tag v0.18.15 --repo Yeachan-Heo/oh-my-codex` — pending until the release tag/ref exists; the pre-tag attempt correctly failed with `unable to verify current tag ref for release compare: v0.18.16`.
- [x] `npm pack --dry-run` — PASS (`oh-my-codex-0.18.16.tgz`, package size `4.1 MB`, unpacked size `26.1 MB`, `3133` files).
- [x] `git diff --check` — PASS.

## Publication-stage validation

- [ ] `dev` CI is green for the release-prep commit.
- [ ] `main` CI is green after promotion.
- [ ] Annotated tag `v0.18.16` points to the intended shipped commit.
- [ ] Tag-triggered release workflow succeeds.
- [ ] GitHub release `v0.18.16` exists and is non-draft/non-prerelease.
- [ ] Native assets and manifest are attached.
- [ ] `npm view oh-my-codex version` returns `0.18.16` and `latest` points to `0.18.16`.

## Known gaps before publication

Publication-stage gates remain pending until the candidate is committed, promoted, tagged, and published.

## Release collateral

- `CHANGELOG.md`
- `RELEASE_BODY.md`
- `docs/release-notes-0.18.16.md`
- `docs/qa/release-readiness-0.18.16.md`
