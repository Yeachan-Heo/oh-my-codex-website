# Release Readiness Verdict - 0.16.4

Target version: **0.16.4**
Date: 2026-05-11
Compare link: [`v0.16.3...v0.16.4`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.3...v0.16.4)
Release: https://github.com/Yeachan-Heo/oh-my-codex/releases/tag/v0.16.4

## Verdict

**COMPLETE.** `0.16.4` shipped from tag `v0.16.4` at commit `0f77c608` with dev/main CI green, tag release workflow green, GitHub release assets attached, and npm publication verified. This file includes post-publish docs-only evidence recorded after the immutable release tag.

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
| Release body generation | PASS — local pre-tag generation wrote `/tmp/RELEASE_BODY.v0.16.4.generated.md` with sha256 `a8e0d1812cf012ec62d8ccdb785a2fbb6f5a3f9d557a20f90a998aba70bb3c23`; release workflow `25648158495` also generated and attached the GitHub release body. |
| Diff hygiene | PASS — `git diff --check`. |
| Dev CI | PASS — GitHub Actions CI run `25647833872` on `dev` commit `0f77c608` completed successfully on 2026-05-11 before tag publication. |
| Main CI | PASS — GitHub Actions CI run `25647985176` on `main` commit `0f77c608` completed successfully on 2026-05-11 before tag publication. |
| Release workflow | PASS — tag-triggered Release run `25648158495` for `v0.16.4` completed successfully on 2026-05-11. |
| GitHub release | PASS — `gh release view v0.16.4` reports non-draft, non-prerelease release at https://github.com/Yeachan-Heo/oh-my-codex/releases/tag/v0.16.4 with 43 native assets. |
| npm | PASS — `npm view oh-my-codex version` returned `0.16.4` after workflow publication. |

## Known gaps / pending gates

- None for the shipped `v0.16.4` tag.
- This readiness update is a deliberate post-publish docs-only evidence commit; the release tag remains at `0f77c608`.

## Notes

- npm publication ran through the repository release workflow trusted-publishing path; local npm credentials were not used.
- This post-publish evidence commit documents the deliberate docs-only divergence from tag `v0.16.4` per `RELEASE_PROTOCOL.md`.
