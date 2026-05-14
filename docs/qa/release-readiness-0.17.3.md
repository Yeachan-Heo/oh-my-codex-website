# Release readiness: 0.17.3

## Scope

Hotfix for `omx team` launch failures introduced in the `0.17.0` -> `0.17.1` worker MCP suppression path and observed after `0.17.2` in CLI-first/plugin Codex configs.

## Compare range

- Previous tag: `v0.17.2`
- Candidate tag: `v0.17.3`
- Candidate branch: `dev` including Team launch hotfix commit `3bc4dc32` plus release metadata bump.
- Ancestry check: PASS — `git merge-base --is-ancestor v0.17.2 dev`.

## Commit / PR inventory

- `906b37ec` — Protect AGENTS contract from silent overwrites.
- `318bd2e6` — Fix plugin metadata and question return injection test.
- `3bc4dc32` — Keep Team worker MCP suppression from inventing servers.
- Release metadata commit — bump package/Cargo/plugin metadata and release collateral to `0.17.3`.

## Local gates

- PASS — `npm run build`
- PASS — `node --test dist/team/__tests__/tmux-session.test.js` (186 passing)
- PASS — `npm run check:no-unused`
- PASS — default live Team smoke: `OMX_TEAM_READY_TIMEOUT_MS=12000 OMX_TEAM_STARTUP_EVIDENCE_TIMEOUT_MS=1500 ./dist/cli/omx.js team 1:explore "default smoke launch fixed"`
- PASS — compat live Team smoke: `OMX_TEAM_WORKER_MCP_COMPAT=1 OMX_TEAM_READY_TIMEOUT_MS=12000 OMX_TEAM_STARTUP_EVIDENCE_TIMEOUT_MS=1500 ./dist/cli/omx.js team 1:explore "compat smoke launch still fixed"`
- PASS — `node --test dist/team/__tests__/tmux-session.test.js dist/cli/__tests__/version-sync-contract.test.js` (188 passing)
- PASS — `npm run verify:plugin-bundle`
- PASS — `npm run verify:native-agents`
- PASS — version metadata aligned across `package.json`, `Cargo.toml`, `Cargo.lock`, and plugin metadata.
- PASS — release body generated and reviewed before tag push: `node dist/scripts/generate-release-body.js --template RELEASE_BODY.md --out /tmp/RELEASE_BODY.0.17.3.generated.md --current-tag v0.17.3 --previous-tag v0.17.2 --repo Yeachan-Heo/oh-my-codex`.

## CI / publication evidence

- Pending — push `dev` with release metadata commit.
- Pending — `dev` CI for the release candidate.
- Pending — main promotion and `main` CI.
- Pending — tag workflow, GitHub release, native assets, and npm publication proof.

## Known gaps

- Full `npm test` was not rerun locally for the hotfix; targeted Team launch tests, version-sync contract tests, typecheck, plugin/native verification, and live Team smokes cover the regression surface.
- `dist/scripts/check-version-sync.js --tag v0.17.3` could not run before local tag creation and still references obsolete `native/*/Cargo.toml` paths; the authoritative version-sync contract test passed against current `crates/*` paths.
- Final publication evidence must be filled after GitHub Actions and npm complete.
