# Release readiness: 0.21.28

`0.21.28` (patch). The release improves the user experience on JetBrains IDE terminals by emitting a startup diagnostic that names the `omx --no-alt-screen` workaround for trackpad scrolling interference.

## Compare range

**Range:** `v0.21.27...v0.21.28`

- **Previous:** `v0.21.27` (commit c017880c)
- **Candidate:** `60ae8e90090f41bb52487c13cc3152c1baf05428` (pinned dev, before version bump)
- **Ancestor check:** ✓ v0.21.27 is an ancestor of candidate

## Change summary

Pinned candidate (before version bump) `60ae8e90090f41bb52487c13cc3152c1baf05428`: 1 user-facing commit

- **Feature commits:** 1 commit (PR #3873)
- **CI evidence pinned to:** commit 60ae8e90090f41bb52487c13cc3152c1baf05428 (17 success, 8 skipped, 0 failures)
- **Ancestry verification:** ✓ v0.21.27 is ancestor of 60ae8e90090f41bb52487c13cc3152c1baf05428

Full release (with version bump) - commits counted from tag:

- **Commits:** 1 core commit + version bump commit = 2 total
- **Files changed:** 3 files in range (src/auth/hotswap.ts, src/cli/__tests__/jetbrains-scroll-diagnostic.test.ts, src/cli/index.ts)
- **Insertions:** +167
- **Deletions:** −0
- **Net change:** +167 lines

## Version numbers

All version surfaces have been bumped to `0.21.28`:
- `package.json` version field ✓
- `package-lock.json` version references ✓
- `Cargo.toml` workspace.package.version ✓
- `Cargo.lock` all 6 workspace crate versions ✓
- `plugins/oh-my-codex/.codex-plugin/plugin.json` version ✓

Verification:
```
cargo metadata --locked --format-version 1 --no-deps
```
confirms all six Rust workspace crates resolve to `0.21.28`.

## PR inventory

| PR | Author | Title | Type |
|---|---|---|---|
| [#3873](https://github.com/Yeachan-Heo/oh-my-codex/pull/3873) | @Yeachan-Heo | fix(cli): emit diagnostic for JetBrains trackpad scrolling issue (Fixes #3872) | Fix |

## Local gates

### Build

| Gate | Result | Evidence |
|---|---|---|
| `npm run build` | ✓ Pass | TypeScript compilation and production build successful |
| `npm run check:no-unused` | ✓ Pass | No unused variable warnings |
| `npm run lint` | ✓ Pass | Biome lint: 885 files checked, no issues |

## CI verification

### Pinned candidate CI status

Pinned SHA `60ae8e90090f41bb52487c13cc3152c1baf05428`:

| Status | Count |
|---|---|
| Success | 17 |
| Skipped | 8 |
| Failure | 0 |

**Latest-per-name checks:** All green at commit 60ae8e90090f41bb52487c13cc3152c1baf05428. No failures or re-runs needed.

## Known gaps

- None. All findings from prior releases remain documented in their respective release-readiness files.

## Validation checklist

- ✓ Candidate is an ancestor of the pinned commit
- ✓ All version surfaces bumped to 0.21.28
- ✓ Local build and typecheck pass
- ✓ Local lint checks pass (885 files)
- ✓ Dev CI green (17 success, 8 skipped, 0 failures)
- ✓ All PRs merged and accounted for
- ✓ Release notes match compare range
- ✓ CHANGELOG.md updated with new entry
- ✓ Release-readiness document prepared

Ready for merge to main and tag.
