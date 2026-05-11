# Release Readiness Verdict - 0.16.4

Target version: **0.16.4**
Date: 2026-05-11
Compare link: [`v0.16.3...v0.16.4`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.3...v0.16.4)
Release: https://github.com/Yeachan-Heo/oh-my-codex/releases/tag/v0.16.4

## Verdict

**IN PROGRESS.** `0.16.4` is the release candidate for the post-`0.16.3` approved-execution, hook/setup, runtime-visibility, Ralph audit, and Ultragoal proof train. CI, release-body generation, tag workflow, and publication evidence must be filled before this becomes a final release-readiness record.

## Release surface

- Approved execution/planning: approved context refs, canonical PRD aliases, tightened context-pack diagnostics, visible hint lineage fallback, multiline launch-hint matching, private context-pack entry metadata, and approved handoff preservation during Team scale-up.
- Hook/setup/notify: setup legacy hook-state dedupe, supported Codex hooks feature flag migration, hooks retained after clear resets, stale PostCompact wiring detection, and recursive notify dispatcher prevention.
- Runtime/workflow completion: boxed Team state-root precedence, HUD state-root visualization, plugin-mode skill discovery, plugin MCP cleanup, Ralph completion audit evidence, and Ultragoal final cleanup/review proof requirements.
- Release metadata: Node/Cargo metadata, lockfiles, changelog, release body, release notes, and release-readiness collateral aligned to `0.16.4`.

## PR inventory

- #2222 — feat(ralph): add approved context refs
- #2223 — fix: accept canonical approved PRD aliases
- #2224 — fix: tighten context pack handoff diagnostics
- #2226 — Fix setup legacy hook-state dedupe
- #2229 — Fix Codex hooks feature flag
- #2241 — fix(planning): keep lineage fallback on visible hints
- #2242 — fix(team): preserve approved handoffs during scale-up
- #2243 — fix: preserve multiline approved launch-hint matching
- #2245 — feat(planning): read private context-pack entry metadata
- #2248 — Keep OMX hooks active after clear resets
- #2251 — Detect stale PostCompact hook wiring
- #2256 — Prevent recursive OMX notify dispatcher wrapping
- #2259 — Fix OMX HUD state-root visualization
- #2262 — Guard Ralph completion on audit evidence
- #2263 — Avoid stale Codex hook flags across CLI releases

## Verification evidence

| Gate | Result |
| --- | --- |
| Compare range ancestry | PASS — `git merge-base --is-ancestor v0.16.3 HEAD`. |
| Version metadata sync | PASS — package, lockfile, Cargo workspace, and Cargo lockfile are aligned to `0.16.4`. |
| Code review | PASS — `$code-review` final recheck approved the release-body evidence language and Ralph completion-audit hardening; architect re-review cleared symlink/path artifact handling and runtime-artifact cleanup. |
| Local build/lint/no-unused | PASS — `npm run build`, `npm run lint`, and `npm run check:no-unused`. |
| Targeted release tests | PASS — `node --test dist/cli/__tests__/version-sync-contract.test.js` plus release-focused setup/planning/Team/Ralph/Ultragoal/hook suites. |
| Rust tests | PASS — `cargo test`. |
| Package dry run | PASS — `npm pack --dry-run`. |
| Release body generation | PENDING — run `generate-release-body.js` against the local annotated `v0.16.4` tag before pushing the tag, then record the generated output path/checksum. |
| Diff hygiene | PASS — `git diff --check`. |
| Dev CI | PASS — GitHub Actions CI run `25647673921` on `dev` commit `ae09fd9e` completed successfully on 2026-05-11. |
| Main CI | PENDING — verify after promotion. |
| Release workflow | PENDING — verify after pushing tag `v0.16.4`. |
| GitHub release | PENDING — verify non-draft/non-prerelease release and native assets. |
| npm | PENDING — verify `npm view oh-my-codex version` returns `0.16.4`. |

## Known gaps / pending gates

- Final `$code-review` approval must be recorded after the Ralph audit and readiness evidence fixes are validated.
- Release body generation evidence must be recorded after the local annotated tag exists and before it is pushed.
- Dev CI run ID and result must be recorded after the release-prep commit is pushed.
- Main CI run ID and result must be recorded after promotion to `main`.
- Tag-triggered release workflow run ID, GitHub release URL/assets, and `npm view oh-my-codex version` proof must be recorded after `v0.16.4` is pushed.
- Until those external gates are green, this document is a local release-candidate readiness record, not final publication proof.

## Notes

- Local npm credentials are not used by this prep step; publication is expected to run through the repository release workflow/trusted publishing path after the annotated tag is pushed.
- If post-publish evidence is committed after the tag, document the deliberate docs-only divergence per `RELEASE_PROTOCOL.md`.
