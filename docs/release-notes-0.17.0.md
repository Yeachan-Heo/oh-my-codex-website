# Release notes — 0.17.0

`0.17.0` is a minor release after `0.16.4` because the shipped delta adds new product surfaces: the bounded Hermes MCP bridge, the canonical `$design` workflow, plugin-mode skill marketplace exposure, and stronger UltraQA adversarial testing guidance. It also hardens Windows native hooks, tmux ownership, startup shell isolation, committed project memory loading, and Ultragoal completion reconciliation.

## Highlights

- **Hermes MCP bridge** — adds a bounded, opt-in MCP coordination bridge for session listing/status, audited follow-up dispatch, safe artifact reads, session starts, log tails, and final coordination reports without exposing tmux scrollback or raw private state.
- **Canonical design workflow** — establishes `DESIGN.md` plus mirrored `$design` skill guidance as the primary design workflow, while deprecating the older `frontend-ui-ux` shortcut.
- **Plugin-mode discovery is more complete** — local Codex plugin marketplace setup now exposes OMX skills through plugin discovery, materializes and verifies the plugin cache, and adds plugin-scoped MCP metadata including Hermes.
- **UltraQA is adversarial by contract** — `$ultraqa` guidance now requires hostile scenario modeling, prompt-injection attempts, interrupt/cancel/resume cases, stale state checks, temporary harnesses when useful, and explicit cleanup evidence.

## Fixes and compatibility notes

- **Windows native hooks** now launch through a PowerShell `ProcessStartInfo` shim that preserves stdin/stdout/stderr and exit codes for paths with spaces or quoting-sensitive characters.
- **Tmux continuations** now verify mode/session/window ownership before injecting follow-up prompts, preventing continuations from crossing into stale or unrelated Codex panes.
- **Startup launch safety** avoids tmux shell rc fan-out before Codex launch and clarifies CLI-first runtime authority.
- **Ultragoal completion** can reconcile completed task-scoped aggregate Codex goals back to the active OMX story while preserving strict evidence and final quality-gate requirements.
- **Project memory** is loaded at session start when committed project memory exists, keeping cross-session context available without relying on local-only runtime state.
- **Release-review fix**: MCP/Hermes state-path tests now isolate inherited OMX runtime environment and use canonical temp roots on macOS so the symlink-root security checks stay meaningful and release gates are reproducible from attached OMX sessions.

## Merged PR inventory

- [#2267](https://github.com/Yeachan-Heo/oh-my-codex/pull/2267) — Prevent tmux continuations from crossing owned Codex panes
- [#2268](https://github.com/Yeachan-Heo/oh-my-codex/pull/2268) — Expose plugin-mode skills in Codex local marketplace
- [#2270](https://github.com/Yeachan-Heo/oh-my-codex/pull/2270) — Fix Windows native hook launch with PowerShell shim
- [#2272](https://github.com/Yeachan-Heo/oh-my-codex/pull/2272) — Fix ultragoal legacy completion loop
- [#2274](https://github.com/Yeachan-Heo/oh-my-codex/pull/2274) — Load committed project memory at session start
- [#2276](https://github.com/Yeachan-Heo/oh-my-codex/pull/2276) — Ensure UltraQA catches adversarial e2e regressions
- [#2283](https://github.com/Yeachan-Heo/oh-my-codex/pull/2283) — Avoid tmux shell rc fan-out before Codex launch
- [#2293](https://github.com/Yeachan-Heo/oh-my-codex/pull/2293) — Fix ultragoal task-scoped goal reconciliation
- Direct dev commits — expose Hermes MCP, establish `DESIGN.md`, clarify CLI-first runtime authority, and apply release-review test isolation fixes.

## Validation

Release readiness evidence is recorded in `docs/qa/release-readiness-0.17.0.md`.

## Why this is a minor release

The release adds new user-visible workflow and integration surfaces (`$design`, Hermes MCP, plugin-mode skill discovery, and plugin MCP metadata) rather than only correcting existing behavior. Existing `0.16.x` users should treat this as a safe minor upgrade with backward-compatible setup and runtime hardening.

**Full Changelog**: [`v0.16.4...v0.17.0`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.4...v0.17.0)
