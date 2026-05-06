# Draft PR body: slim CI redundant work

> Target base branch: `dev` for normal contributions, per `CONTRIBUTING.md` and `.github/PULL_REQUEST_TEMPLATE.md`.

## Summary

The CI workflow was doing repeated dependency install, typecheck, build, and report-only coverage work across multiple lanes. This cleanup keeps the release-safety signals while reducing duplicated work: one Node 20 build artifact feeds compiled test/coverage gates, TypeScript-only checks stay on a single runtime, Node 22 remains as a focused smoke lane for cross-runtime confidence, and expensive full TypeScript/Rust coverage artifact reports are no longer required in every CI run; a lean Rust coverage-summary lane still executes Rust tests, including the `crates/omx-sparkshell/Cargo.toml` manifest path.

## Changes

- Remove redundant runtime matrix work for TypeScript-only checks while preserving the `check:no-unused` gate.
- Reuse the prebuilt `dist` artifact for compiled test and team-critical coverage lanes instead of rebuilding in each coverage command.
- Remove report-only full TypeScript and Rust coverage artifact jobs from the required CI status path; keep a required Rust test/coverage-summary signal for the workspace and `crates/omx-sparkshell/Cargo.toml`, and keep the enforced team/state coverage gate.
- Keep CI lanes reviewable by documenting which local commands map to the PR template validation checklist.

## Validation

- [x] `python3 - <<'PY' ... yaml.safe_load('.github/workflows/ci.yml') ... PY` — parsed the workflow successfully and confirmed job metadata is present.
- [x] `npx tsc --noEmit` — TypeScript check passed.
- [x] `npm run check:no-unused` — no-unused TypeScript check passed.
- [x] `npm run lint` — Biome lint passed for `src`.
- [x] `npm run build` — compiled `dist` successfully.
- [x] `node --test dist/verification/__tests__/ci-rust-gates.test.js dist/cli/__tests__/package-bin-contract.test.js` — updated workflow/package contract tests passed, including the required Rust test/coverage-summary gate.
- [x] `python3 - <<'PY' ... assert workflow job graph ... PY` — confirmed report-only coverage jobs are absent and required gates remain.
- [ ] `npm test` — not run locally because this PR specifically removes redundant full-suite CI duplication; targeted workflow/package tests plus lint/typecheck/build were run.
- [ ] `npm run coverage:team-critical:compiled` — not run locally; the team-critical coverage gate remains wired in CI and unchanged semantically.
- [x] `cargo llvm-cov --workspace --summary-only` and `cargo llvm-cov --manifest-path crates/omx-sparkshell/Cargo.toml --summary-only` — Rust tests and coverage summaries passed locally, including the `omx-sparkshell` manifest path.
- [ ] `omx doctor` — not needed unless setup/config behavior changes.

## Checklist

- [x] PR is focused and avoids unrelated changes.
- [x] Docs updated: this PR evidence note records the CI cleanup rationale and validation commands.
- [x] Backward-compatibility impact considered: runtime behavior is unchanged; the change is CI orchestration/script wiring only.

## Reviewer notes

- Preserve the Node 22 smoke lane so the cleanup does not remove all cross-runtime signal.
- Prefer compiled coverage commands in CI after the build artifact is downloaded; source-level coverage scripts can still build first for local contributor convenience.
- If a future edit removes `npm ci` from artifact-consuming jobs, confirm every required CLI/dev dependency is available from artifacts or another explicit setup step before merging.
