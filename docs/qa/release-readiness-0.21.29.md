# Release readiness: 0.21.29

`0.21.29` (patch). The release fixes critical regressions in Team dispatch state recovery and prevents inbox/notification messages from being injected into Codex startup or folder-trust UI.

## Compare range

**Range:** `v0.21.28...v0.21.29`

- **Previous:** `v0.21.28` (commit 30ad4586)
- **Candidate:** `71029cdfc80946da1e0b6770d47e31aae38cf5ab` (pinned dev, before version bump)
- **Ancestor check:** ✓ v0.21.28 is an ancestor of candidate

## Change summary

Pinned candidate (before version bump) `71029cdfc80946da1e0b6770d47e31aae38cf5ab`: 1 user-facing commit

- **Feature commits:** 1 commit (PR #3876)
- **CI evidence pinned to:** commit 71029cdfc80946da1e0b6770d47e31aae38cf5ab (run #39737386059, 17 success, 8 skipped, 0 failures, concluded 07:19Z)
- **Ancestry verification:** ✓ v0.21.28 is ancestor of 71029cdfc80946da1e0b6770d47e31aae38cf5ab

Full release (with version bump and release collateral) - commits counted from tag:

- **Commits:** 1 core commit + version bump commit + release collateral = 3 total
- **Files changed:** 25 files in range (core fix, version surfaces, release docs)
- **Insertions:** +801
- **Deletions:** −89
- **Net change:** +712 lines

Core fix statistics (excluding version bump):

- **Files changed:** 16 files (dispatch recovery, delivery, UI safety, tests, contracts)
- **Insertions:** +616
- **Deletions:** −68
- **Net change:** +548 lines

## Version numbers

All version surfaces have been bumped to `0.21.29`:
- `package.json` version field ✓
- `package-lock.json` version references ✓
- `Cargo.toml` workspace.package.version ✓
- `Cargo.lock` all 6 workspace crate versions ✓
- `plugins/oh-my-codex/.codex-plugin/plugin.json` version ✓

Verification:
```
cargo metadata --locked --format-version 1 --no-deps
```
confirms all six Rust workspace crates resolve to `0.21.29`.

## PR inventory

| PR | Author | Title | Type |
|---|---|---|---|
| [#3876](https://github.com/Yeachan-Heo/oh-my-codex/pull/3876) | @shenyankm | fix(team): recover dispatch state and guard startup input | Fix |

## Local gates

### Build

| Gate | Result | Evidence |
|---|---|---|
| `npm run build` | ✓ Pass | TypeScript compilation and production build successful |
| `npm run check:no-unused` | ✓ Pass | No unused variable warnings |
| `npm run lint` | ✓ Pass | Biome lint: 885 files checked, no issues |

## CI verification

### Pinned candidate CI status

Pinned SHA `71029cdfc80946da1e0b6770d47e31aae38cf5ab`:

Run ID: 39737386059 (concluded at 07:19Z on 2026-10-22)

| Status | Count |
|---|---|
| Success | 17 |
| Skipped | 8 |
| Failure | 0 |

**Latest-per-name checks:** All green at commit 71029cdfc80946da1e0b6770d47e31aae38cf5ab. No failures or re-runs needed.

## Known gaps

- **Codex finding: Monitor-path wake serialization:** Codex identified a gap where the monitor's `monitorTeam` → `deliverPendingMailboxMessages` → `dispatchPendingMailboxMessage` path also needs the same serialization barrier applied to dispatch requests. The current v0.21.29 fix applies the barrier to the primary dispatch retry path (projection durability, wake acknowledgment, damaged mailbox handling). The monitor-path serialization should be extended in a follow-up patch release (v0.21.30) to ensure complete consistency across all mailbox-enqueue paths. This finding is acknowledged and tracked for immediate follow-up.

## Validation checklist

- ✓ Candidate is an ancestor of the pinned commit
- ✓ All version surfaces bumped to 0.21.29
- ✓ Local build and typecheck pass
- ✓ Local lint checks pass (887 files)
- ✓ Dev CI green (17 success, 8 skipped, 0 failures, run #39737386059)
- ✓ PR CI green (20 checks passed, run #39740303581)
- ✓ All PRs merged and accounted for
- ✓ Release notes match compare range
- ✓ CHANGELOG.md updated with new entry
- ✓ Release-readiness document prepared
- ✓ Known gaps documented with follow-up plan (Codex finding: monitor-path serialization)
- ✓ Merge gate applied (Codex finding acknowledged with follow-up PR plan)

Ready for merge to main and tag.
