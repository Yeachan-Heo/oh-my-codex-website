# Release notes — 0.16.4

`0.16.4` is a post-`0.16.3` reliability release for approved execution handoffs, context-pack metadata, Codex hook feature-flag migration, setup/notify ownership, HUD/runtime state-root visibility, Ralph completion audit evidence, and Ultragoal completion proof requirements.

## Highlights

- **Approved execution handoffs are more durable** — Ralph, Team, and planning now preserve approved context references, ready context-pack role refs, private context-pack entry metadata, canonical approved PRD aliases, multiline launch hints, visible hint lineage, and approved handoffs during Team scale-up.
- **Codex hook setup stays compatible across CLI releases** — setup probes supported Codex feature flags, writes `[features].hooks = true` when available, retains the legacy `codex_hooks` fallback for older CLIs, dedupes stale hook aliases, keeps hooks active after clear resets, and detects stale PostCompact wiring.
- **Runtime ownership and visibility are safer** — OMX notify dispatch avoids recursive wrapper chains, setup mode switches avoid duplicate hook state, plugin-mode skill discovery and plugin MCP cleanup are hardened, boxed Team state-root precedence is corrected, and HUD visualization stays rooted in runtime authority.
- **Completion gates are harder to overclaim** — Ralph completion requires audit evidence, and Ultragoal final completion requires cleanup/review proof before accepting done state.

## Fixes and compatibility notes

- Existing older Codex installs remain supported through the legacy `codex_hooks` fallback path, but current generated configuration prefers `[features].hooks = true` when the installed CLI advertises it.
- Approved execution parsing now handles canonical approved PRD aliases, multiline launch hints, visible hint lineage fallback, and private context-pack metadata without dropping readiness evidence.
- The release includes skill/doc guidance updates for Ultragoal, UltraQA, Ultrawork, setup, planning, and related runtime workflows so generated/plugin mirrors stay aligned with the runtime behavior.

## Merged PR inventory

- [#2222](https://github.com/Yeachan-Heo/oh-my-codex/pull/2222) — feat(ralph): add approved context refs
- [#2223](https://github.com/Yeachan-Heo/oh-my-codex/pull/2223) — fix: accept canonical approved PRD aliases
- [#2224](https://github.com/Yeachan-Heo/oh-my-codex/pull/2224) — fix: tighten context pack handoff diagnostics
- [#2226](https://github.com/Yeachan-Heo/oh-my-codex/pull/2226) — Fix setup legacy hook-state dedupe
- [#2229](https://github.com/Yeachan-Heo/oh-my-codex/pull/2229) — Fix Codex hooks feature flag
- [#2241](https://github.com/Yeachan-Heo/oh-my-codex/pull/2241) — fix(planning): keep lineage fallback on visible hints
- [#2242](https://github.com/Yeachan-Heo/oh-my-codex/pull/2242) — fix(team): preserve approved handoffs during scale-up
- [#2243](https://github.com/Yeachan-Heo/oh-my-codex/pull/2243) — fix: preserve multiline approved launch-hint matching
- [#2245](https://github.com/Yeachan-Heo/oh-my-codex/pull/2245) — feat(planning): read private context-pack entry metadata
- [#2248](https://github.com/Yeachan-Heo/oh-my-codex/pull/2248) — Keep OMX hooks active after clear resets
- [#2251](https://github.com/Yeachan-Heo/oh-my-codex/pull/2251) — Detect stale PostCompact hook wiring
- [#2256](https://github.com/Yeachan-Heo/oh-my-codex/pull/2256) — Prevent recursive OMX notify dispatcher wrapping
- [#2259](https://github.com/Yeachan-Heo/oh-my-codex/pull/2259) — Fix OMX HUD state-root visualization
- [#2262](https://github.com/Yeachan-Heo/oh-my-codex/pull/2262) — Guard Ralph completion on audit evidence
- [#2263](https://github.com/Yeachan-Heo/oh-my-codex/pull/2263) — Avoid stale Codex hook flags across CLI releases
- Release-review fixes — require Ultragoal final cleanup/review proof before completion and align release metadata/collateral to `0.16.4`.

## Validation

- Local release-review gates: `npm run build`, `npm run lint`, `npm run check:no-unused`, `node --test dist/cli/__tests__/version-sync-contract.test.js`, release-focused targeted Node suites, `cargo test`, `npm pack --dry-run`, and `git diff --check`.
- Release body generation is a pending pre-tag gate tracked in `docs/qa/release-readiness-0.16.4.md`; run `generate-release-body.js` against the local annotated `v0.16.4` tag before pushing the tag.
- GitHub CI and publication evidence are tracked in `docs/qa/release-readiness-0.16.4.md`; pending gates must be filled after CI, tag workflow, GitHub release, and npm verification complete.

**Full Changelog**: [`v0.16.3...v0.16.4`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.3...v0.16.4)
