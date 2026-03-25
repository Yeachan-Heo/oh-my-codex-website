# oh-my-codex v0.8.7

Released: 2026-03-08

12 non-merge commits from `v0.8.6..dev`.
Contributors: [@Yeachan-Heo](https://github.com/Yeachan-Heo), [@HaD0Yun](https://github.com/HaD0Yun), [@marlocarlo](https://github.com/marlocarlo).

## Highlights

### Prompt-system contract cleanup and XML normalization

OMX's instruction surfaces now have a cleaner shared contract across the root orchestrator, templates, generated guidance, and the prompt catalog.

This release:
- centralizes prompt-guidance contract validation
- extracts reusable prompt-guidance fragments and a sync script
- converts the agent prompt catalog from Markdown-style headings to XML-tag structure
- clarifies the 2-layer orchestrator / role-prompt model in docs and templates
- documents the GPT-5.4 prompt-guidance contract directly in the repo

Representative PRs:
- [#619](https://github.com/Yeachan-Heo/oh-my-codex/pull/619) — XML-tag prompt migration
- [#620](https://github.com/Yeachan-Heo/oh-my-codex/pull/620) — prompt-guidance contract documentation
- [#623](https://github.com/Yeachan-Heo/oh-my-codex/pull/623) — 2-layer orchestrator / role-prompt documentation
- [#625](https://github.com/Yeachan-Heo/oh-my-codex/pull/625) — leader-only orchestration boundaries

### Team runtime hardening

Team orchestration received a hardening pass focused on expired-claim recovery, worktree hygiene, and stronger regression coverage.

Notable effects:
- safer claim recovery behavior when leases expire
- better worktree cleanup and hygiene paths
- broader runtime/state/worktree/end-to-end regression coverage
- a dedicated hardening benchmark script

PR: [#624](https://github.com/Yeachan-Heo/oh-my-codex/pull/624)

### MCP server stdio teardown unification

OMX's MCP stdio entrypoints now share one idempotent shutdown path instead of duplicating raw transport bootstrap logic in each server.

This release:
- adds `autoStartStdioMcpServer` in `src/mcp/bootstrap.ts`
- migrates state, memory, code-intel, trace, and team MCP entrypoints to the shared helper
- routes stdin close, transport close, `SIGTERM`, and `SIGINT` through one lifecycle path
- adds regression coverage for idle teardown across the MCP server entrypoints

PRs: [#626](https://github.com/Yeachan-Heo/oh-my-codex/pull/626), [#627](https://github.com/Yeachan-Heo/oh-my-codex/pull/627)

### npm global-install bin contract fix

This release also includes a last-minute packaging fix for global installation behavior.

It:
- corrects the published npm bin path contract in `package.json`
- adds `src/cli/__tests__/package-bin-contract.test.ts` so the global-install `omx` entrypoint stays covered in CI

PR: [#633](https://github.com/Yeachan-Heo/oh-my-codex/pull/633)

## Bug fixes and operational polish

### Windows / tmux capability handling

OMX no longer blocks native Windows purely because the platform is `win32`.

Instead, it now:
- checks actual tmux capability
- supports `psmux`
- uses `where` where appropriate on Windows
- documents platform-specific setup paths more clearly in the README

PR: [#616](https://github.com/Yeachan-Heo/oh-my-codex/pull/616)

### Fast-path agent posture tuning

Analyst, planner, and other fast-path agent defaults were tuned downward to better match the intended routing posture for lightweight work.

Commits:
- `3c461ba` chore: lower analyst and planner reasoning effort
- `4a93de1` chore: lower fast-path agent reasoning effort

## Compare stats

- Commit window: **12 non-merge commits** (`2026-03-07` to `2026-03-08`)
- Diff snapshot (`v0.8.6...dev`): **91 files changed, +3,486 / -1,747**

## Full commit log (`v0.8.6..dev`)

```text
3a42dc6 refactor: centralize prompt guidance contract validation
9b3b336 fix(platform): replace win32 hard-block with tmux capability check; add psmux support
379f52e refactor: extract shared prompt guidance fragments
9ab2f55 refactor: convert all agent prompts from Markdown headers to XML tag structure
e53c915 docs: document GPT-5.4 prompt guidance contract (#620)
3c461ba chore: lower analyst and planner reasoning effort
4a93de1 chore: lower fast-path agent reasoning effort
810549a docs(prompt): clarify 2-layer orchestrator and role prompt model
7b193d7 fix(prompts): enforce leader-only orchestration boundaries
adcc5b6 feat(team): harden expired-claim recovery and worktree hygiene (#624)
577c416 fix(mcp): centralize stdio lifecycle teardown for OMX servers (#626) (#627)
50619d7 Fix npm bin path contract for global install (#633)
```
