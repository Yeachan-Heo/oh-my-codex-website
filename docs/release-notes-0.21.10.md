# oh-my-codex 0.21.10

`0.21.10` is a patch release for the frozen range `v0.21.9..72fee0236cf8a4b45e6dd9b3d826871f402b84ae` (16 commits, 15 files, +1067/−82): astra-defaults evaluation infrastructure hardening, configuration merge robustness, and npm registry-visibility diagnostics.

Versioning: this ships fixes and evaluation infrastructure improvements as a patch, following the established 0.21.x train convention. No breaking CLI or package-layout changes are included.

## Highlights

- **TOML configuration merge robustness (#3777, fixes #3776):** multi-line arrays in the `[tui]` configuration section are now correctly preserved during config merge operations, preventing loss of array elements and enabling complex TUI customization without manual repair.
- **Astra-defaults evaluation infrastructure (#3655, #3765, #3772):** the astra-defaults RunRecord collector gains base URL support for flexible test fixture hosting and implements repository cloning with fixture context, enabling live cost and quality evaluation across model configurations. Collector is now hermetic with bounded Codex v0.162+ JSON-line parsing and includes CI integration (#3768).
- **npm registry-visibility diagnostics (#3771):** registry-visibility checks now include extended timeout windows and improved diagnostics to surface transient publication issues earlier and support troubleshooting of npm registry visibility failures in CI pipelines.

## Fixes and compatibility

- Fix preservation of multi-line arrays in TOML `[tui]` configuration sections during merge operations (#3777, fixes #3776).
- Harden astra-defaults collector for hermetic operation with correct handling of Codex v0.162+ JSON-line output format and repository cloning (#3772, #3774).
- Extend npm registry-visibility check window and improve diagnostics for faster visibility confirmation (#3771).
- Patch release with no intentional breaking changes.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3765](https://github.com/Yeachan-Heo/oh-my-codex/pull/3765) | @Yeachan-Heo | feat(#3655): add base URL support to astra-defaults collector and record evaluation results |
| [#3768](https://github.com/Yeachan-Heo/oh-my-codex/pull/3768) | @Yeachan-Heo | fix(#3766): fix astra-defaults eval test failures and add to CI |
| [#3771](https://github.com/Yeachan-Heo/oh-my-codex/pull/3771) | @Yeachan-Heo | fix(ci): extend npm registry-visibility check window and improve diagnostics |
| [#3772](https://github.com/Yeachan-Heo/oh-my-codex/pull/3772) | @Yeachan-Heo | fix(#3655): implement repository cloning and fixture context in collector |
| [#3774](https://github.com/Yeachan-Heo/oh-my-codex/pull/3774) | @Yeachan-Heo | fix: remove unused imports and update registry retry test for #3771 changes |
| [#3775](https://github.com/Yeachan-Heo/oh-my-codex/pull/3775) | @Yeachan-Heo | perf: record astra-defaults eval results for #3655 |
| [#3777](https://github.com/Yeachan-Heo/oh-my-codex/pull/3777) | @Yeachan-Heo | fix: preserve multi-line arrays in [tui] section during config merge |

## Validation evidence

Frozen candidate `72fee0236cf8a4b45e6dd9b3d826871f402b84ae` is green on dev CI. Local build, typecheck, and full compiled test suite results are recorded in `docs/qa/release-readiness-0.21.10.md`.

## Contributors

Thanks to [@Yeachan-Heo](https://github.com/Yeachan-Heo) and [@gaebal-gajae](https://github.com/gaebal-gajae).

## Inventory

The reproducible range is recorded in `artifacts/release-0.21.10/inventory.md`.

**Full Changelog**: [`v0.21.9...v0.21.10`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.9...v0.21.10)
