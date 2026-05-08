# Release notes — 0.16.1

## Summary

`0.16.1` is a broad post-`0.16.0` hardening release. It improves `omx explore` safety and bounded execution, session-scoped runtime authority, Team approved-handoff repair paths, Codex goal-mode durability, plugin/cache behavior, native launch portability, CI reliability, and release-install proof.

This release was built from `v0.16.0..v0.16.1` and includes 25 merged PRs plus final release-review blocker fixes for explore local fast paths and CI dependency installation.

## Highlights

- **Explore safety and bounded execution** — Codex-backed explore runs are bounded before semantic fallback, process storms are capped before host OOM, symlinked local fast-path file reads no longer leak outside the repo, and oversized local text-search reads fall back to bounded handling.
- **Runtime/session authority** — session-scoped runtime state is now the active authority, stale root skill-active/HUD state is cleaned up after terminal workflows, and project-scoped Codex goal state stays durable.
- **Team approved-handoff hardening** — approved Team execution preserves ambiguous bindings, binding transport, selected handoffs, invalid context-pack diagnostics, nonready repair-only behavior, DAG fallback status, and read-only context-pack status visibility.
- **Goal-mode and interview flow** — planning handoffs steer toward goal-mode follow-ups, blocked `ultragoal` Codex goal handoffs are handled, and deep-interview routing separates facts from judgment.
- **Plugin, launch, and platform fixes** — plugin MCP launch behavior is clearer, plugin skill cache refresh works, managed helpers use the current JS runtime, Windows OMX root launch paths are fixed, Darwin launch fallback worktree assertions are path-stable, and disposable launch worktree state remains durable.
- **CI and release integrity** — CI critical-path latency was reduced while preserving release gates, Node jobs now prove clean lockfile installs with unconditional `npm ci`, version sync is verified across Node/Cargo/plugin metadata, and native release artifacts build through the tag workflow.

## Merged PRs

### Explore and execution safety

- [#2120](https://github.com/Yeachan-Heo/oh-my-codex/pull/2120) — Bound explore execution before semantic fallback
- [#2146](https://github.com/Yeachan-Heo/oh-my-codex/pull/2146) — Bound explore process storms before host OOM

### Runtime, session state, and goal durability

- [#2136](https://github.com/Yeachan-Heo/oh-my-codex/pull/2136) — Fix stale root skill state after terminal ralplan/Ralph
- [#2138](https://github.com/Yeachan-Heo/oh-my-codex/pull/2138) — Guide planning handoffs toward goal-mode follow-ups
- [#2140](https://github.com/Yeachan-Heo/oh-my-codex/pull/2140) — Handle blocked ultragoal Codex goal handoffs
- [#2141](https://github.com/Yeachan-Heo/oh-my-codex/pull/2141) — Keep session-scoped runtime state authoritative
- [#2151](https://github.com/Yeachan-Heo/oh-my-codex/pull/2151) — Keep Codex goal state durable in project-scoped sessions

### Team approved-handoff and context-pack reliability

- [#2169](https://github.com/Yeachan-Heo/oh-my-codex/pull/2169) — Keep nonready approved handoffs repair-only
- [#2170](https://github.com/Yeachan-Heo/oh-my-codex/pull/2170) — Preserve invalid context-pack role diagnostics
- [#2171](https://github.com/Yeachan-Heo/oh-my-codex/pull/2171) — Close remaining approved handoff fallback gaps
- [#2172](https://github.com/Yeachan-Heo/oh-my-codex/pull/2172) — Keep Team DAG fallbacks aligned with handoff status

### Launch, plugin, MCP, and platform fixes

- [#2122](https://github.com/Yeachan-Heo/oh-my-codex/pull/2122) — Clarify plugin MCP launch truth
- [#2134](https://github.com/Yeachan-Heo/oh-my-codex/pull/2134) — Keep solo/disposable launch worktree state durable
- [#2135](https://github.com/Yeachan-Heo/oh-my-codex/pull/2135) — Preserve Ralph continuity around imagegen interrupts
- [#2144](https://github.com/Yeachan-Heo/oh-my-codex/pull/2144) — Fix first-party MCP app-server pre-traffic leaks
- [#2152](https://github.com/Yeachan-Heo/oh-my-codex/pull/2152) — Fix plugin skill cache refresh
- [#2153](https://github.com/Yeachan-Heo/oh-my-codex/pull/2153) — Use current JS runtime for managed OMX helpers
- [#2154](https://github.com/Yeachan-Heo/oh-my-codex/pull/2154) — Tighten launch-policy help output
- [#2155](https://github.com/Yeachan-Heo/oh-my-codex/pull/2155) — Quiet native hook background output
- [#2157](https://github.com/Yeachan-Heo/oh-my-codex/pull/2157) — Fix Windows OMX root launch paths
- [#2178](https://github.com/Yeachan-Heo/oh-my-codex/pull/2178) — Normalize Darwin launch-fallback worktree root assertion

### Models, CI, docs, and workflow polish

- [#2131](https://github.com/Yeachan-Heo/oh-my-codex/pull/2131) — Add config-level xhigh reasoning overrides for agents
- [#2158](https://github.com/Yeachan-Heo/oh-my-codex/pull/2158) — Reduce CI critical-path latency
- [#2159](https://github.com/Yeachan-Heo/oh-my-codex/pull/2159) — Improve deep-interview fact routing
- [#2168](https://github.com/Yeachan-Heo/oh-my-codex/pull/2168) — Add UI design anti-slop signals

## Additional release-prep commits

- `f5e1e79e` — Fix stale autopilot skill-active HUD state
- `e1711433` — Preserve ambiguous approved Team bindings
- `c6f5d46a` — Preserve team-exec approved binding transport
- `3e8767bb` — Keep selected approved Team handoffs amid incomplete drafts
- `8c8d2ed5` — Add read-only context-pack handoff status
- `9e4d118b` — Harden the post-0.16.0 train for 0.16.1
- `cfc29185` — Promote the reviewed 0.16.1 train to main

## Upgrade notes

- `omx explore` local fast-path file reads no longer follow symlinks; symlinked paths fall back to the harness path.
- Local explore text search skips oversized files in the fast path and lets bounded fallback handling cover broader searches.
- CI no longer restores/skips a cached `node_modules` tree; `npm ci` runs in each Node job to prove lockfile install integrity.

## Verification

- Dev CI for `9e4d118b`: passed.
- Main CI for `cfc29185`: passed.
- Release tag workflow for `v0.16.1`: passed, including version sync, native artifact publication, native asset smoke verification, packed global install smoke test, and npm package publication.
- Local release-prep gates included Rust workspace tests, TypeScript build, lint/no-unused checks, targeted Node tests, and `npm pack --dry-run`.

## Contributors

Thanks to @Yeachan-Heo, @lkraider, @HaD0Yun, @pgagarinov, and @qzzqzzb for the PRs and fixes that made up the `0.16.1` train, plus the release-prep/review work that hardened the final tag.

**Full Changelog**: [`v0.16.0...v0.16.1`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.0...v0.16.1)
