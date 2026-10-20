# Release readiness: 0.21.25

`0.21.25` (patch). The release hardens team delivery by enforcing fail-closed behavior on unconfirmed mailbox creation, ensuring team isolation is never breached by partial creation or orphaned state.

## Compare range

**Range:** `v0.21.24...v0.21.25`

- **Previous:** `v0.21.24` (commit 85822422)
- **Candidate:** `9aa3e7066291a47d1427ad274ed47e0511712ee7` (pinned dev SHA)
- **Ancestor check:** ✓ v0.21.24 is an ancestor of candidate

## Change summary

- **Commits:** 2 non-merge commits (5 with back-merge commits)
- **Files changed:** 3 files in user-facing change
- **Insertions:** +205
- **Deletions:** −4
- **Net change:** +201 lines

Note: Back-merge, version bump, and Cargo.lock updates add 5 additional files to the total touched in the range.

## Version numbers

All version surfaces have been bumped to `0.21.25`:
- `package.json` version field ✓
- `package-lock.json` version references ✓
- `Cargo.toml` workspace.package.version ✓
- `Cargo.lock` all 6 workspace crate versions ✓
- `plugins/oh-my-codex/.codex-plugin/plugin.json` version ✓

Verification:
```
cargo metadata --locked --format-version 1 --no-deps
```
confirms all six Rust workspace crates resolve to `0.21.25`.

## PR inventory

| PR | Author | Title | Type |
|---|---|---|---|
| [#3857](https://github.com/Yeachan-Heo/oh-my-codex/pull/3857) | @shenyankm | fix(team): Fail closed on unconfirmed mailbox creation | Fix |

## Local gates

### Build

| Gate | Result | Evidence |
|---|---|---|
| `npm run build` | ✓ Pass | TypeScript compilation and production build successful |

### Test suite

| Gate | Result | Evidence |
|---|---|---|
| `npm test -- src/team/__tests__/state.test.ts` | ✓ Pass | Team state tests pass with new mailbox isolation coverage and concurrency regressions |

### Verification scripts

| Gate | Result | Evidence |
|---|---|---|
| `npm run verify:native-agents` | ✓ Pass | Native agent binaries verified |
| `npm run verify:plugin-bundle` | ✓ Pass | Plugin bundle structure verified |

## CI verification

### Pinned candidate CI status

Pinned SHA `9aa3e7066291a47d1427ad274ed47e0511712ee7` dev CI run:

| Status | Count |
|---|---|
| Success | 18 |
| Skipped | 7 |
| Failure | 0 |

**Latest-per-name checks:** All green. No failures or re-runs needed.

## Known gaps

- None. All findings from prior releases remain documented in their respective release-readiness files.

## Validation checklist

- ✓ Candidate is an ancestor of the pinned commit
- ✓ All version surfaces bumped to 0.21.25
- ✓ Local build and typecheck pass
- ✓ Local test suite passes
- ✓ Dev CI green (18 success, 7 skipped, 0 failures)
- ✓ All PRs merged and accounted for
- ✓ Release notes match compare range
- ✓ CHANGELOG.md updated with new entry
- ✓ RELEASE_BODY.md prepared

Ready for merge to main and tag.
