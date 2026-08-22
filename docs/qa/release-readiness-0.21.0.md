# Release readiness — 0.21.0

## Release identity

- Release: `0.21.0` (minor; intentional, migration-pathed removals of deprecated skills and MCP state writer tools).
- Date: 2026-08-22.
- Previous tag: `v0.20.5` (`27b3a91c2ea630c2a82cdbcd45a1f1de30d9bb2a`).
- Frozen dev base: `0f2bbb704b83f94a69622b1915f555498e0dd283`.
- Exact compare range: `v0.20.5..0f2bbb704b83f94a69622b1915f555498e0dd283`.
- Range size: 99 commits, 310 changed files (+31,779/−69,216), 44 referenced PRs (36 merged into the range; window PRs #3503/#3511/#3524 were main-only and are intentionally excluded).
- Merge base: `v0.20.5` itself — `git merge-base --is-ancestor v0.20.5 0f2bbb70` exits 0 (no ancestry boundary this release, unlike 0.20.5).
- Compatibility: minor with documented removals; upgrade notes in `docs/release-notes-0.21.0.md`.
- Tracking issue: #3552 (owner-authorized 2026-08-22).

## Semver decision record

`0.21.0`, not `0.20.6`: the range removes 25 catalog skills behind hard-error sunset stubs (docs in-range self-identify as "Removed in OMX 0.21"), removes the advertised MCP `state_write`/`state_clear` tools, and adds the first-class `omx autopilot` command plus `--disable-hooks`/`--repair-state` flags. Removals of reachable consumer surfaces cannot ship as a patch; additions rule out calling it merely a fix train. Repo precedent: `0.16.0` shipped as a "minor release focused on skill deprecation".

## Version carriers

- `package.json` → `0.21.0`
- `package-lock.json` (top-level and `packages."`) → `0.21.0` (2-line diff)
- `Cargo.toml` `[workspace.package]` → `0.21.0` (all six crates are `version.workspace = true`)
- `plugins/oh-my-codex/.codex-plugin/plugin.json` → `0.21.0`
- `packages/vscode-extension/package.json` stays `0.5.7` (independently versioned, unchanged in range)

## Tag-ordering correction (2026-08-22)

During G2, a **local-only** annotated `v0.21.0` tag was briefly created at the frozen dev candidate `0f2bbb70` because `dist/scripts/generate-release-body.js` requires the current-tag ref to resolve (`verifyGitCommitRef`). It was never pushed; the operator verified `origin` has no `refs/tags/v0.21.0` and deleted the local tag. Generator validation evidence from that window is preserved (`/tmp/RELEASE_BODY.generated.md`: correct Full Changelog line, `## Contributors`, all six major compare-range highlights present). **No tag will be recreated for generation.** The real annotated `v0.21.0` tag is created exactly once, only after: release collateral committed → release-prep PR merged to `dev` → frozen dev CI green → candidate promoted to `main` → exact `main` CI green; and it must point to the shipped `main` commit, not `0f2bbb70`. Recorded on issue #3552.

## Required gates

| Gate | Evidence | Status |
|---|---|---|
| Ancestry | `git merge-base --is-ancestor v0.20.5 0f2bbb70` → exit 0. | Passed locally |
| Inventory | 99 commits; 17/17 merge commits PR-attributed; 0 unattributed/direct-push; window cross-check done. `artifacts/release-0.21.0/inventory.md`. | Passed locally |
| Version sync | `node dist/scripts/check-version-sync.js --tag v0.21.0` (to run after build in G3). | Pending G3 |
| Build / static / bundle | `npm run build`, `npm run check:no-unused`, `npm run lint`, native-agent + plugin-mirror + catalog checks (G3). | Pending G3 |
| Package dry run | `npm pack --dry-run` (G3; full pack+install dogfood already passed at base 0f2bbb70 with 0.20.5 carriers — lane evidence 2026-08-22). | Pending G3 |
| Focused high-risk tests | G3 selection: session/pointer authority, state SSOT + handoff carrier, compat upgrade fixture, team scaling, url-reader, version display. | Pending G3 |
| Release body | `RELEASE_BODY.md` contains `## Contributors` and the Full Changelog line; generator validation runs in G3 after `dist/` build. | Pending G3 |
| Diff hygiene | `git diff --check`. | Pending G3 |
| CI on candidate | dev@0f2bbb70 CI green (run 32520444919, CI Status required check). Release-prep PR CI pending G4. | Base green; PR pending G4 |
| Tag / GitHub Release / npm | Owner-authorized promotion lane (G5); v0.20.5 precedent shows npm publish may need the manual workflow if the packed-install smoke gate fails. | Pending G5 |

## Known gaps

- Broad cross-platform and native-build matrices are CI-authoritative (7-target cargo-dist matrix in `release.yml`).
- No tag, GitHub Release, main merge, or npm publication is performed by this release-preparation lane; they belong to G5 under issue #3552's authorization.

## Publish boundary

After the release-prep PR is green on `dev` (G4), the promotion lane must merge to `main`, wait for main CI, tag `v0.21.0` (annotated), wait for the tag-triggered release workflow, verify the GitHub Release (non-draft, non-prerelease, native assets + manifest) and `npm view oh-my-codex version`, then fast-forward `dev` and bump the next development base (G6). External evidence is recorded back into this file and on issue #3552.
