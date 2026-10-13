# oh-my-codex 0.21.11

`0.21.11` is a patch release for the frozen range `v0.21.10..7e0b5f2330b9d85c5fdb9709ec0104e099836f4c` (3 commits, 2 files, +68/−5). It fixes stale model-provider state in generated native agent TOMLs.

Versioning: this is a backward-compatible fix on the established 0.21.x patch train. No breaking CLI or package-layout changes are included.

## Highlights

- **Fresh provider inheritance (#3781, fixes #3779):** native agent TOMLs no longer include `model_provider` when it merely mirrors the root `config.toml` default. Users can change the configured provider without stale per-agent values or running `omx setup --force`; explicit per-agent overrides remain supported.

## Fixes and compatibility

- Avoid baking inherited root `model_provider` values into native agent TOMLs, preventing stale agent configuration after provider changes (#3781, fixes #3779).
- Preserve explicit per-agent model overrides.
- Patch release with no intentional breaking CLI or package-layout changes.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3781](https://github.com/Yeachan-Heo/oh-my-codex/pull/3781) | @Yeachan-Heo | fix: do not bake model_provider into agent TOMLs for default inheritance (fixes #3779) |

## Validation evidence

Frozen candidate `7e0b5f2330b9d85c5fdb9709ec0104e099836f4c` is green on dev CI. Local build, typecheck, and relevant test results are recorded in `docs/qa/release-readiness-0.21.11.md`.

## Contributors

Thanks to [@Yeachan-Heo](https://github.com/Yeachan-Heo) and co-author [@gaebal-gajae](https://github.com/gaebal-gajae).

## Inventory

The reproducible range is recorded in `artifacts/release-0.21.11/inventory.md`.

**Full Changelog**: [`v0.21.10...v0.21.11`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.10...v0.21.11)
