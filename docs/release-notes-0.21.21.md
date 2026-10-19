# oh-my-codex 0.21.21

`0.21.21` is a patch release for Windows shim path correctness, stale-launcher warning improvements, test coverage restoration, and dynamic version handling (5 commits, 7 files, +174/−104; PRs #3833, #3835, #3837).

Versioning continues the 0.21.x patch train. This release fixes filesystem path generation on POSIX systems when Windows shim paths are involved, and restores test coverage for stale-launcher diagnostic messaging split by provenance reason.

## Highlights

- **Windows shim path generation on POSIX (#3833):** Fix path generation for Windows shims on POSIX systems to use host paths instead of generating stray backslash-prefixed paths. Filesystem writes in setup/uninstall/codex-hooks no longer create unintended `\tmp\…` entries on POSIX. Authored by @Yeachan-Heo.
- **Stale-launcher warning diagnostics (#3837):** Restore test coverage for stale-launcher warnings and split messaging by provenance reason (missing-launcher vs. incompatible provenance). Consistent diagnostic output and improved test assertions. Authored by @Yeachan-Heo.

## Compatibility

- Setup/uninstall operations on POSIX systems now generate correct host paths for Windows shim artifacts.
- Stale-launcher warning behavior is unchanged; test coverage is restored and messaging is more specific.
- Existing configurations remain compatible; no changes required.

## Validation evidence

The pinned candidate `3a03651f0a989b7328987b5de9d1ee6ef89154dd` passed latest-per-name dev CI: 24 checks succeeded with 1 conditional check skipped, and no failures. Release branch CI passed with all required checks green.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3833](https://github.com/Yeachan-Heo/oh-my-codex/pull/3833) | @Yeachan-Heo | Fix Windows shim path generation on POSIX systems |
| [#3835](https://github.com/Yeachan-Heo/oh-my-codex/pull/3835) | @Yeachan-Heo | fix(team): enforce the readiness deadline after the final poll |
| [#3837](https://github.com/Yeachan-Heo/oh-my-codex/pull/3837) | @Yeachan-Heo | fix: restore tests and split stale-launcher warning by provenance reason |

## Contributors

Thanks to @Yeachan-Heo for the Windows shim fixes and test restoration.

**Full Changelog**: [`v0.21.20...v0.21.21`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.20...v0.21.21)
