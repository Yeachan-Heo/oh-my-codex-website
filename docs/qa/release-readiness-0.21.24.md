# Release readiness: 0.21.24

`0.21.24` (patch). The release improves setup plugin-cache repair safety and idempotency by hardening the `removalSafe` field derivation logic, enforcing fail-closed behavior in dry-run mode, and ensuring repair returns `unchanged` for identical caches.

## Compare range

**Range:** `v0.21.19...v0.21.24`

- **Previous:** `v0.21.19`
- **Release candidate merge:** PR #3835 (Merge pull request #3835 from Yeachan-Heo/release/omx-0.21.24)
- **Release commit:** b5410bf8 (npm gitHead)
- **Ancestor check:** ✓ v0.21.19 is an ancestor of release commit

## Change summary

- **Non-merge commits:** 9 commits in release range
- **Files changed:** 5 files (setup repair, tests, docs)
- **Insertions:** +365
- **Deletions:** −28
- **Net change:** +337 lines

## Version numbers

All version surfaces have been bumped to `0.21.24`:
- `package.json` version field ✓
- `package-lock.json` version references ✓
- `Cargo.toml` workspace.package.version ✓
- `Cargo.lock` all 6 workspace crate versions ✓
- `plugins/oh-my-codex/.codex-plugin/plugin.json` version ✓

## PR inventory

Major change PRs in release:
- PR #3851: fix(setup): require removalSafe and fail closed in dry-run repair (@Yeachan-Heo)
- PR #3852: chore: ignore gjc runtime session state (@Yeachan-Heo)
- PR #3853: fix(setup): derive removalSafe only from verified repair eligibility (@Yeachan-Heo)
- PR #3854: fix(setup): keep identical caches unchanged in repair dry-runs (@Yeachan-Heo)
- PR #3849: test(setup): add comprehensive removalSafe field tests for late-pin scenarios (@Yeachan-Heo)

## Release workflow

- **Release run:** 39232500921
- **npm publish:** gitHead b5410bf8
- **Release artifacts:** Attached and verified on GitHub release
- **npm registry:** oh-my-codex@0.21.24 published with correct gitHead

## Validation evidence

- ✓ All required version bumps applied
- ✓ Setup repair tests pass with hardening coverage
- ✓ CI green for release candidate
- ✓ npm published with correct metadata
- ✓ GitHub release created with full changelog

## Known gaps

- None. All findings from prior releases remain documented in their respective release-readiness files.

## Validation checklist

- ✓ Candidate is an ancestor of the release commit
- ✓ All version surfaces bumped to 0.21.24
- ✓ Release notes match compare range
- ✓ CHANGELOG.md updated with entry
- ✓ npm registry shows 0.21.24 as latest
- ✓ npm gitHead matches release commit b5410bf8
- ✓ GitHub release published and non-draft
- ✓ Release artifacts attached

Release complete and published.
