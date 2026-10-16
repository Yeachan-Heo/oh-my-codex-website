# oh-my-codex 0.21.16

`0.21.16` is a patch release for the frozen range `v0.21.15..00d06af4cac8663f409e66576f1719da28199ff0` (43 commits, 15 files, +6,158/−267; PRs #3792 and #3813).

Versioning continues the 0.21.x patch train. This release protects live Codex plugin sessions from cache retirement and provides scoped recovery for stale snapshots.

## Highlights

- **Live plugin cache safety (#3792):** pin active Codex sessions to the plugin-cache snapshots they use, retain live-pinned snapshots during recovery, and provide scoped repair for verified, managed, unpinned snapshots. Fixes #3790, reported by @spicysharkco.

## Compatibility

- Cache recovery preserves active sessions and fails closed on untrusted pin state.
- The scoped `omx setup --plugin --repair-plugin-cache` repair path is additive; existing plugin commands and package layout remain unchanged.
- Back-merging v0.21.15 restores main ancestry in dev (#3813).

## Validation evidence

- Frozen candidate `00d06af4cac8663f409e66576f1719da28199ff0` passed latest-per-name dev CI: 24 checks succeeded, 1 was skipped, and none failed or remained incomplete.
- Local validation passed: `npm run build:full`, `npm run build:runtime`, `npm run check:no-unused`, `npm run lint`, `cargo metadata --locked --format-version 1 --no-deps`, and `npm run sync:plugin:check`. The 706 targeted Node tests passed: 687 across the 9 test files changed by PR #3792, plus 19 version/release tests. `git diff --check` passed.
- `npm run smoke:packed-install` passed; its installed-Codex trust leg was skipped because the Codex executable is absent from this Linux host.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3792](https://github.com/Yeachan-Heo/oh-my-codex/pull/3792) | @Yeachan-Heo | Fixes #3790; live plugin cache pinning and safe recovery (reported by @spicysharkco) |
| [#3813](https://github.com/Yeachan-Heo/oh-my-codex/pull/3813) | @Yeachan-Heo | chore(release): back-merge v0.21.15 into dev |

## Contributors

Thanks to @Yeachan-Heo for implementation and release integration, and @spicysharkco for reporting the plugin-cache recovery regression.

**Full Changelog**: [`v0.21.15...v0.21.16`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.15...v0.21.16)
