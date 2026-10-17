# oh-my-codex 0.21.18

`0.21.18` is a patch release for the frozen range `v0.21.17..8edbeb8686a9f7288b45f03d8f553a72216832f1` (2 commits, 4 files, +358/−27; PR #3819).

Versioning continues the 0.21.x patch train. This release corrects managed hook-trust range handling so foreign approved hook trust remains intact when repeated OMX banners appear in `config.toml`.

## Highlights

- **Preserve foreign hook trust (#3819, fixing #3818):** close managed-marker ranges at their first matching end, deduplicate repeated fences during refresh, and constrain coordinate-family trust matching to indices OMX manages. Tampered managed hashes remain fail-closed.

## Compatibility

- Setup and doctor no longer misclassify Codex-approved foreign hook trust as a tampered managed-trust key after repeated managed-marker banners.
- Refresh normalizes repeated managed fences without widening the trust range beyond OMX-managed coordinates.

## Validation evidence

- Pinned candidate `8edbeb8686a9f7288b45f03d8f553a72216832f1`: 17 latest-per-name check runs succeeded and 8 were skipped; none failed or remained incomplete.
- Local checks passed: `npm run build:full`, `npm run build:runtime`, `npm run check:no-unused`, `npm run lint`, `npm run sync:plugin:check`, and `cargo metadata --locked --format-version 1 --no-deps`.
- Focused generator, setup-refresh, doctor-invalid-config, and plugin-cache regression tests: 105 passed.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3819](https://github.com/Yeachan-Heo/oh-my-codex/pull/3819) | @Yeachan-Heo | fix(config): clamp managed marker ranges and preserve foreign hook trust |

Issue #3818 was reported by @hetingyi.

## Contributors

Thanks to @Yeachan-Heo for the fix and @hetingyi for reporting the issue.

**Full Changelog**: [`v0.21.17...v0.21.18`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.17...v0.21.18)
