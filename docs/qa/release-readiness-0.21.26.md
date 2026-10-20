# Release readiness: 0.21.26

`0.21.26` (patch). The release hardens team dispatch recovery by isolating degraded state from runtime projections and optimizes dispatch identity ledger access for improved mailbox efficiency.

## Compare range

**Range:** `v0.21.25...v0.21.26`

- **Previous:** `v0.21.25` (commit 38a4a81b)
- **Candidate:** `cf72bbc1f0dc0bbcc4a627e8d0b9c34fbadc8c73` (release branch HEAD)
- **Ancestor check:** ✓ v0.21.25 is an ancestor of candidate

## Change summary

Pinned candidate (before version bump) `8910439a`: 6 commits

- **Feature commits:** 4 commits (PRs #3859, #3862, #3863, #3861 back-merge)
- **CI evidence pinned to:** commit 8910439a (17 success, 8 skipped, 0 failures)
- **Ancestry verification:** ✓ v0.21.25 is ancestor of 8910439a

Full release (with version bump) `cf72bbc1`: 7 commits

- **Commits:** 6 commits + 1 version bump commit = 7 total
- **Files changed:** 19 files in range
- **Insertions:** +722
- **Deletions:** −269
- **Net change:** +453 lines

Note: Back-merge and version bump add to the total touched files; core changes are in team dispatch and state files.

## Version numbers

All version surfaces have been bumped to `0.21.26`:
- `package.json` version field ✓
- `package-lock.json` version references ✓
- `Cargo.toml` workspace.package.version ✓
- `Cargo.lock` all 6 workspace crate versions ✓
- `plugins/oh-my-codex/.codex-plugin/plugin.json` version ✓

Verification:
```
cargo metadata --locked --format-version 1 --no-deps
```
confirms all six Rust workspace crates resolve to `0.21.26`.

## PR inventory

| PR | Author | Title | Type |
|---|---|---|---|
| [#3859](https://github.com/Yeachan-Heo/oh-my-codex/pull/3859) | @dependabot | chore(deps): bump zod from 4.6.5 to 4.6.7 | Maintenance |
| [#3862](https://github.com/Yeachan-Heo/oh-my-codex/pull/3862) | @shenyankm | fix(team): isolate degraded dispatch state from runtime projections | Fix |
| [#3863](https://github.com/Yeachan-Heo/oh-my-codex/pull/3863) | @Yeachan-Heo | perf(team): load the dispatch identity ledger once per merge | Performance |

## Local gates

### Build

| Gate | Result | Evidence |
|---|---|---|
| `npm run build` | ✓ Pass | TypeScript compilation and production build successful |
| `npm run check:no-unused` | ✓ Pass | No unused variable warnings |
| `npm run lint` | ✓ Pass | Biome lint: 885 files checked, no issues (195ms) |

## CI verification

### Pinned candidate CI status

Pinned SHA `8910439aa4598f1a4e9819b45e11934b0116ab06` (pinned dev candidate before version bump):

| Status | Count |
|---|---|
| Success | 17 |
| Skipped | 8 |
| Failure | 0 |

**Latest-per-name checks:** All green at commit 8910439a. No failures or re-runs needed.

Release branch version-bump commit `cf72bbc1f0dc0bbcc4a627e8d0b9c34fbadc8c73` added documentation updates, and merge commit `5a4f8e81` (v0.21.26 tag target) finalized the release.

## Known gaps

- None. All findings from prior releases remain documented in their respective release-readiness files.

## Validation checklist

- ✓ Candidate is an ancestor of the pinned commit
- ✓ All version surfaces bumped to 0.21.26
- ✓ Local build and typecheck pass
- ✓ Local lint checks pass (885 files)
- ✓ Dev CI green (17 success, 8 skipped, 0 failures)
- ✓ All PRs merged and accounted for
- ✓ Release notes match compare range
- ✓ CHANGELOG.md updated with new entry
- ✓ Release-readiness document prepared

Ready for merge to main and tag.
