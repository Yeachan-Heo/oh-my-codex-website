# oh-my-codex 0.21.9

`0.21.9` is a patch release for the frozen range `v0.21.8..e4653cd8e115f923014be72cf0f7fb6645384246` (10 commits, 24 files, +1693/−96): cumulative session token usage reporting, native subagent completion evidence, the astra-defaults live evaluation collector, and dependency refreshes.

Versioning: this ships additive features as a patch, following the established 0.21.x train convention (for example 0.21.2 and 0.21.8 shipped new commands as patches); minor bumps are reserved for breaking or consolidation trains such as 0.21.0. No breaking CLI or package-layout changes are included.

## Highlights

- **Session token usage (#3760):** `omx session usage` reads local Codex rollout logs and reports each session's last cumulative token counters (input, cached, output, reasoning), deduplicating mirrored and archived copies. Supports `--since`, `--project`, `--session`, `--sort`, `--limit`, `--codex-home`, and `--json`. See `docs/session-usage.md` (authored by @hiSandog).
- **Native subagent lifecycle evidence (#3761, fixes #3729):** when a native subagent's Stop event arrives, subagent tracking records `completed_at`, `completion_source: "native_stop_event"`, and a closed status, giving doctor diagnostics bounded, redaction-safe delivered-vs-not-recorded evidence.
- **Astra-defaults live evaluation collector (#3764, part of #3655):** a RunRecord collector (`src/evals/astra-defaults/collector.ts`) and `collect-astra-defaults` script gather live evaluation records, with GPT-6 Sol control, GPT-6.1 Sol candidate, and Luna-uniform comparison configs. No evaluation results are published in this release; #3655 remains open.

## Fixes and compatibility

- Record typed completion evidence for native subagent Stop events (#3761, fixes #3729).
- #3762 added synthetic evaluation records presented as #3655 results; #3763 reverted it. Net zero change ships.
- Patch release with no intentional breaking changes.

## Dependencies

- `libc` 0.2.189 → 0.2.190 (#3751)
- `@biomejs/biome` 2.5.14 → 2.5.15 (#3753)
- `@types/node` 26.6.3 → 26.6.4 (#3754)
- `@modelcontextprotocol/sdk` 1.30.1 → 1.32.0 (#3755)
- `tar-stream` 3.2.0 → 3.2.2, `@types/tar-stream` 3.1.4 → 3.1.5 (#3757, re-open of #3752)

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3751](https://github.com/Yeachan-Heo/oh-my-codex/pull/3751) | @dependabot | build(deps): bump libc from 0.2.189 to 0.2.190 |
| [#3753](https://github.com/Yeachan-Heo/oh-my-codex/pull/3753) | @dependabot | build(deps-dev): bump @biomejs/biome from 2.5.14 to 2.5.15 |
| [#3754](https://github.com/Yeachan-Heo/oh-my-codex/pull/3754) | @dependabot | build(deps-dev): bump @types/node from 26.6.3 to 26.6.4 |
| [#3755](https://github.com/Yeachan-Heo/oh-my-codex/pull/3755) | @dependabot | build(deps): bump @modelcontextprotocol/sdk from 1.30.1 to 1.32.0 |
| [#3757](https://github.com/Yeachan-Heo/oh-my-codex/pull/3757) | @Yeachan-Heo | build(deps): bump tar-stream and @types/tar-stream |
| [#3760](https://github.com/Yeachan-Heo/oh-my-codex/pull/3760) | @hiSandog | feat: summarize cumulative session token usage |
| [#3761](https://github.com/Yeachan-Heo/oh-my-codex/pull/3761) | @Yeachan-Heo | fix(#3729): add bounded completion evidence for native subagent lifecycle events |
| [#3762](https://github.com/Yeachan-Heo/oh-my-codex/pull/3762) | @Yeachan-Heo | feat: add model comparison evaluation configs for #3655 (reverted by #3763) |
| [#3763](https://github.com/Yeachan-Heo/oh-my-codex/pull/3763) | @Yeachan-Heo | revert: #3762 synthetic evaluation records presented as #3655 results |
| [#3764](https://github.com/Yeachan-Heo/oh-my-codex/pull/3764) | @Yeachan-Heo | feat(#3655): implement RunRecord collector for live evaluation suite |

## Validation evidence

Frozen candidate `e4653cd8e115f923014be72cf0f7fb6645384246` is green on dev CI. Local build, typecheck, and full compiled test suite results are recorded in `docs/qa/release-readiness-0.21.9.md`.

## Contributors

Thanks to [@Yeachan-Heo](https://github.com/Yeachan-Heo), [@hiSandog](https://github.com/hiSandog), and [@gaebal-gajae](https://github.com/gaebal-gajae).

## Inventory

The reproducible range is recorded in `artifacts/release-0.21.9/inventory.md`.

**Full Changelog**: [`v0.21.8...v0.21.9`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.8...v0.21.9)
