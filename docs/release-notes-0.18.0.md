# Release notes: 0.18.0

`0.18.0` is the release that turns the post-`0.17.3` work into a safer local-generation and operator-runtime baseline. It ships the OMX API gateway, SparkShell summary routing and diagnostics, real/local generation compatibility, and the reliability fixes needed to make Team, Ralph, Autoresearch, hooks, notify dispatch, tmux, HUD, and Windows MCP behavior safer under real use.

## Highlights

- **Local generation has an OMX-owned API path** — `omx api` now exposes the local gateway used by SparkShell and generation flows, while `omx api --help` and real-private backend guidance make the experimental boundary explicit.
- **SparkShell is more useful and safer for operators** — summaries can inspect team panes, cache observations incrementally, preserve passthrough behavior, and avoid leaking raw secrets into summary prompts.
- **Workflow loops are less sticky** — stale Ralph, ralplan, autoresearch-goal, MCP transport, and tmux diagnostic states no longer trigger false lifecycle loops after Stop, completion, or diagnostics.
- **Notification and tmux process storms are blocked** — recursive notify wrappers, `previousNotify` self-reference, fallback watcher respawns, and worker tmux rc fan-out are fixed.
- **Team/HUD/Windows reliability improved** — wrapped drafts are no longer trusted as submitted tmux input, HUD resize hooks survive tmux reflow, provider environment is preserved for direct tmux launches, and Windows MCP siblings avoid duplicate watchdog collisions.
- **Release evidence is clearer** — the release train includes targeted CI lanes, API CLI reliability work, version metadata alignment, API/SparkShell smoke commands, and release-body validation.

## Fixes / compatibility notes

- `omx api` is intentionally local-first. The real-private backend is experimental, requires an explicit `--real-private` opt-in, and now generates a token by default instead of opening unauthenticated by accident.
- SparkShell redaction now protects summary prompts and observable automation paths; passthrough contracts are preserved for callers that expect raw command behavior.
- Existing Team and tmux flows keep their readiness semantics; the fixes remove false trust in drafts and runaway startup behavior rather than weakening failure detection.
- Current open lifecycle-notification grouping work remains outside this release: [#2353](https://github.com/Yeachan-Heo/oh-my-codex/issues/2353).

## Merged PR inventory

- [#2295](https://github.com/Yeachan-Heo/oh-my-codex/pull/2295) — Add bounded best-practice research workflow.
- [#2332](https://github.com/Yeachan-Heo/oh-my-codex/pull/2332) — Add OMX API gateway and route SparkShell summaries through it.
- [#2334](https://github.com/Yeachan-Heo/oh-my-codex/pull/2334) — Ignore stale Ralph state in native stop hook.
- [#2335](https://github.com/Yeachan-Heo/oh-my-codex/pull/2335) — Fix Ralph Stop session drift.
- [#2338](https://github.com/Yeachan-Heo/oh-my-codex/pull/2338) — Fix advisor prompts that start with frontmatter.
- [#2339](https://github.com/Yeachan-Heo/oh-my-codex/pull/2339) — Preserve responses metadata through OMX API.
- [#2341](https://github.com/Yeachan-Heo/oh-my-codex/pull/2341) — Fix MCP transport false positives in PostToolUse.
- [#2342](https://github.com/Yeachan-Heo/oh-my-codex/pull/2342) — Ensure HUD resize hooks survive tmux reflow.
- [#2344](https://github.com/Yeachan-Heo/oh-my-codex/pull/2344) — Stop stale session ralplan loops.
- [#2345](https://github.com/Yeachan-Heo/oh-my-codex/pull/2345) — Fix Team tmux submit confirmation for wrapped drafts.
- [#2347](https://github.com/Yeachan-Heo/oh-my-codex/pull/2347) — Prevent stale notify wrapper recursion.
- [#2349](https://github.com/Yeachan-Heo/oh-my-codex/pull/2349) — Fix Windows MCP duplicate sibling watchdog.
- [#2351](https://github.com/Yeachan-Heo/oh-my-codex/pull/2351) — Prevent notify dispatcher fork bombs.
- [#2357](https://github.com/Yeachan-Heo/oh-my-codex/pull/2357) — Fix PreToolUse false positive for tmux question diagnostics.
- [#2359](https://github.com/Yeachan-Heo/oh-my-codex/pull/2359) — Stop worker tmux rc fan-out.
- [#2360](https://github.com/Yeachan-Heo/oh-my-codex/pull/2360) — Reduce dev PR CI waste with targeted lanes.
- [#2361](https://github.com/Yeachan-Heo/oh-my-codex/pull/2361) — Keep omx-api CLI tests reliable under load.
- [#2365](https://github.com/Yeachan-Heo/oh-my-codex/pull/2365) — Preserve provider env for interactive tmux launches.
- [#2367](https://github.com/Yeachan-Heo/oh-my-codex/pull/2367) — Preserve autopilot review across compaction.
- [#2372](https://github.com/Yeachan-Heo/oh-my-codex/pull/2372) — Polish SparkShell safety and operator UX.
- [#2374](https://github.com/Yeachan-Heo/oh-my-codex/pull/2374) — Fix notify dispatcher recursive `previousNotify` forks.
- [#2375](https://github.com/Yeachan-Heo/oh-my-codex/pull/2375) — Fix autoresearch-goal Stop reconciliation loops.
- [#2376](https://github.com/Yeachan-Heo/oh-my-codex/pull/2376) — Support local real generation compatibility.

## Issue-backed fixes

- [#2254](https://github.com/Yeachan-Heo/oh-my-codex/issues/2254), [#2350](https://github.com/Yeachan-Heo/oh-my-codex/issues/2350), [#2373](https://github.com/Yeachan-Heo/oh-my-codex/issues/2373) — notify dispatcher recursion and fork-bomb regressions.
- [#2333](https://github.com/Yeachan-Heo/oh-my-codex/issues/2333), [#2343](https://github.com/Yeachan-Heo/oh-my-codex/issues/2343) — stale Ralph/ralplan Stop state.
- [#2337](https://github.com/Yeachan-Heo/oh-my-codex/issues/2337) — advisor prompts beginning with YAML frontmatter.
- [#2340](https://github.com/Yeachan-Heo/oh-my-codex/issues/2340), [#2356](https://github.com/Yeachan-Heo/oh-my-codex/issues/2356) — overly broad hook diagnostics around MCP/tmux output.
- [#2348](https://github.com/Yeachan-Heo/oh-my-codex/issues/2348) — Windows MCP sibling watchdog compatibility.
- [#2358](https://github.com/Yeachan-Heo/oh-my-codex/issues/2358) — worker tmux rc fan-out/OOM regression.
- [#2363](https://github.com/Yeachan-Heo/oh-my-codex/issues/2363) — provider environment loss in directly launched tmux sessions.
- [#2366](https://github.com/Yeachan-Heo/oh-my-codex/issues/2366) — autopilot review lost across compaction.
- [#2378](https://github.com/Yeachan-Heo/oh-my-codex/issues/2378) — release-blocker review fixes and smoke coverage for 0.18.0.

## Validation evidence

- `git merge-base --is-ancestor v0.17.3 dev` — PASS.
- `npm run build`
- `npm run lint`
- `npm run check:no-unused`
- `node --test dist/cli/__tests__/version-sync-contract.test.js dist/cli/__tests__/api.test.js`
- `npm run verify:native-agents`
- `npm run verify:plugin-bundle`
- `npm run build:full`
- `npm run smoke:packed-install`
- `cargo fmt --all --check`
- `cargo clippy --workspace --all-targets -- -D warnings`
- `cargo test -p omx-api -p omx-sparkshell -p omx-explore-harness`
- `git diff --check`
- Release-body validation: `node dist/scripts/generate-release-body.js --template RELEASE_BODY.md --out /tmp/RELEASE_BODY.0.18.0.generated.md --current-tag v0.18.0 --previous-tag v0.17.3 --repo Yeachan-Heo/oh-my-codex`.

## Full changelog

**Full Changelog**: https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.17.3...v0.18.0
