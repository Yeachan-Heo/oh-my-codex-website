# Release notes — 0.17.1

`0.17.1` is a post-`0.17.0` release-readiness and runtime-coordination patch. It keeps the new `0.17.x` workflow surfaces intact while tightening Team/Ultragoal handoffs, question coordination, setup MCP migration behavior, HUD/tmux ownership, native session overlays, and release security gates.

## Highlights

- **Team + Ultragoal coordination is explicit** — planning, ralplan, Team, and Ultragoal guidance now document the intended split: Ultragoal remains leader-owned durable goal/ledger state while Team runs parallel execution lanes and returns checkpoint-ready evidence.
- **Question bridge events are auditable** — the question coordinator bridge now emits structured events and supports bounded Hermes/MCP coordination around pending/answered question state.
- **Setup MCP defaults are safer** — setup no longer silently removes managed MCP defaults; removal requires explicit confirmation and doctor output distinguishes plugin-mode `none` state correctly.
- **Release train is audit-clean** — package and Cargo metadata are aligned to `0.17.1`, and transitive npm advisories in `fast-uri`, `hono`, `ip-address`, and `express-rate-limit` are resolved in the lockfile.

## Fixes and compatibility notes

- **Team worker startup** avoids redundant MCP startup and protects launch behavior from idle Ultragoal plans.
- **Team readiness** fails draft-only startup after the ready timeout instead of continuing with ambiguous execution state.
- **Approved execution handoff** removes the older context-pack handoff path in favor of approved repository context. This is a workflow-contract migration: release operators should treat approved PRD/test-spec artifacts and Team evidence as the handoff source of truth.
- **Ralph completion examples** now require auditable completion evidence before marking work complete.
- **HUD/tmux behavior** is more stable across resize events and avoids hook ownership collisions between windows.
- **Native session overlays** preserve user-generated AGENTS guidance while keeping generated project boilerplate out of session instructions.
- **Lore commit guard** accepts compact compliant messages while still requiring the OmX co-author trailer.

## Merged PR inventory

- [#2287](https://github.com/Yeachan-Heo/oh-my-codex/pull/2287) — emit question bridge events
- [#2290](https://github.com/Yeachan-Heo/oh-my-codex/pull/2290) — require Ralph examples to record auditable completion evidence
- [#2292](https://github.com/Yeachan-Heo/oh-my-codex/pull/2292) — remove context-pack approved execution handoff
- [#2296](https://github.com/Yeachan-Heo/oh-my-codex/pull/2296) — preserve user-generated AGENTS guidance
- [#2301](https://github.com/Yeachan-Heo/oh-my-codex/pull/2301) — bound ordinary working loops with diagnostics
- [#2303](https://github.com/Yeachan-Heo/oh-my-codex/pull/2303) — bump `@types/node`
- [#2304](https://github.com/Yeachan-Heo/oh-my-codex/pull/2304) — bump `@biomejs/biome`
- [#2305](https://github.com/Yeachan-Heo/oh-my-codex/pull/2305) — enforce HUD pane height on terminal resize
- [#2306](https://github.com/Yeachan-Heo/oh-my-codex/pull/2306) — prevent HUD resize hook ownership collisions
- [#2312](https://github.com/Yeachan-Heo/oh-my-codex/pull/2312) — fail draft-only Team startup after ready timeout
- [#2319](https://github.com/Yeachan-Heo/oh-my-codex/pull/2319) — deprecate default MCP setup removal behavior
- Direct dev commits — link Ultragoal goals with Team execution, keep Team workers out of redundant MCP startup, fix plugin MCP `none` doctor state, preserve OMX owner across native session replacement, and prepare audit-clean `0.17.1` release metadata.

## Validation

Release readiness evidence is recorded in `docs/qa/release-readiness-0.17.1.md`.

Local pre-tag gates passed for version sync, lint, no-unused typecheck, Cargo workspace check, npm high-level audit, and whitespace checks. The full Node suite was not rerun in the attached OMX/tmux runtime because prior attempts showed ambient runtime contamination and leaked question test children; the release tag workflow remains the authoritative clean CI/publication gate.

**Full Changelog**: [`v0.17.0...v0.17.1`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.17.0...v0.17.1)
