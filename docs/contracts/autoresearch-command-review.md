# `omx autoresearch` Full-Parity Review Notes

Date: 2026-03-14  
Reviewer lane: worker-3

## Scope reviewed

Compared the implementation and operator-facing docs against:

- `.omx/plans/prd-autoresearch-full-parity.md`
- `.omx/plans/test-spec-autoresearch-full-parity.md`

Reviewed code and docs:

- `src/cli/autoresearch.ts`
- `src/autoresearch/contracts.ts`
- `src/autoresearch/runtime.ts`
- `src/team/worktree.ts`
- `src/modes/base.ts`
- `README.md`
- `docs/contracts/autoresearch-command-contract.md`
- focused autoresearch tests under `src/**/__tests__`

## Current status

**Status:** parity-critical behavior appears implemented and the previously noted shared help/test wording mismatch is now resolved.

The branch now matches the PRD/test-spec shape much more closely than the earlier scaffold review:

- `omx autoresearch` exposes both fresh launch and `--resume <run-id>` flows.
- the runtime owns a thin-supervisor loop boundary via repo-root candidate handoff + post-session evaluator decisions.
- repo-root active-run locking and authoritative per-run manifests are present.
- fresh launches create run-tagged autoresearch lanes instead of silently reusing one long-lived lane.
- docs/help/contracts describe keep/discard/reset semantics instead of the earlier v1 scaffold.

## Verified evidence

### Build
- `npm run build` → PASS

### Focused tests
- `node --test dist/autoresearch/__tests__/runtime.test.js dist/cli/__tests__/autoresearch.test.js dist/cli/__tests__/index.test.js dist/cli/__tests__/nested-help-routing.test.js dist/team/__tests__/worktree.test.js dist/modes/__tests__/base-autoresearch-contract.test.js` → PASS
- `node --test dist/cli/__tests__/session-search-help.test.js` → PASS

### Code/doc alignment observed
- CLI help documents fresh launch + `--resume <run-id>`: `src/cli/autoresearch.ts`
- top-level help advertises thin-supervisor parity semantics: `src/cli/index.ts`, `src/compat/fixtures/help.stdout.txt`
- README now explains baseline seeding, repo-root per-run artifacts, candidate handoff, keep/discard/reset, relaunch loop, and resume behavior: `README.md`
- contract doc now defines run-tagged lanes, repo-root authority split, candidate artifact schema, decision policy, and resume failure conditions: `docs/contracts/autoresearch-command-contract.md`
- runtime implements active-run lock, per-run manifest files, allowlisted runtime excludes, candidate parsing, evaluator-backed decisions, reset-to-last-kept behavior, and resume validation: `src/autoresearch/runtime.ts`
- worktree planning test locks run-tagged autoresearch branch/path naming: `src/team/__tests__/worktree.test.ts`

## Parity checklist

### 1. Thin-supervisor iteration model
**Pass.**
- `buildAutoresearchInstructions()` tells the launched Codex session to perform exactly one experiment cycle and write the candidate artifact before exit.
- `runAutoresearchLoop()` relaunches Codex after `processAutoresearchCandidate()` unless the run aborts/errors.

### 2. Repo-root state authority
**Pass.**
- repo-root active-run lock lives at `.omx/state/autoresearch-state.json`.
- per-run manifest, candidate, ledger, and latest evaluator files live under `.omx/logs/autoresearch/<run-id>/`.
- worktree-local runtime artifacts are limited to `results.tsv` and allowlisted logs.

### 3. Fresh-run semantics
**Pass.**
- fresh launches compute a run tag and plan `autoresearch/<mission-slug>/<run-tag>` plus `autoresearch-<mission-slug>-<run-tag>`.
- focused worktree coverage now asserts run-tagged branch/path naming.

### 4. Resume contract
**Pass.**
- CLI parses `--resume <run-id>`.
- runtime rejects missing manifest, missing worktree, dirty worktree, and terminal runs.

### 5. Keep/discard/reset decision policy
**Pass.**
- baseline row is seeded.
- evaluator failure/error discards.
- `pass_only` keeps any pass.
- `score_improvement` requires comparable numeric scores and improvement; otherwise ambiguous/discard.
- discard paths reset to `last_kept_commit`.

### 6. Docs/help/contracts alignment
**Pass.**
- README, command help, top-level help, fixture help text, and the contract doc now describe the parity loop rather than a one-shot bootstrap scaffold.
- Shared help/test wording now matches the thin-supervisor parity wording.

## Remaining review notes / risks

1. `runAutoresearchLoop()` currently reads the run id back from the manifest file via `execFileSync('cat', ...)` + `JSON.parse(...)` on each iteration. That works, but it is a slightly awkward implementation detail and could be simplified to avoid shelling out to `cat`.
2. Focused tests cover the main parity surfaces, but there is still room for broader runtime coverage around `noop`, `abort`, `interrupted`, and explicit `pass_only` policy branches if the lead wants even tighter semantic locking.
3. I verified focused parity coverage and build status, not the entire repository-wide test suite/lint suite.

## Reviewer conclusion

This lane no longer looks like the earlier v1 scaffold. The reviewed implementation and docs now appear largely consistent with the requested thin-supervisor autoresearch parity model; the previously noted shared top-level help/test wording mismatch is resolved; remaining follow-ups are optional cleanup/coverage improvements.
