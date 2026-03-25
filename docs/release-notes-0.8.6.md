# oh-my-codex v0.8.6

Released: 2026-03-07

4 non-merge commits from `main..dev`.
Contributor: [@Yeachan-Heo](https://github.com/Yeachan-Heo).

## Highlights

### Event-aware team waiting and runtime coordination

OMX team orchestration can now wait on canonical team events in addition to terminal completion.

This release adds:
- additive `wake_on=event` / `after_event_id` support to `omx_run_team_wait`
- shared event reading, normalization, and cursor helpers in the team state layer
- canonical event typing across contracts, runtime state, and API interop
- `omx team await <team-name>` CLI support
- runtime emission of `worker_state_changed` while preserving legacy `worker_idle` compatibility
- stronger visibility into notify-fallback watcher dispatch/drain progress and deferred leader state

PR: [#609](https://github.com/Yeachan-Heo/oh-my-codex/pull/609)

### GPT-5.4 prompt-guidance rollout and expansion

OMX's prompt and workflow surfaces were updated in two passes to better reflect OpenAI's GPT-5.4 prompt-guidance patterns.

Core-surface pass ([#611](https://github.com/Yeachan-Heo/oh-my-codex/pull/611), addresses [#608](https://github.com/Yeachan-Heo/oh-my-codex/issues/608)):
- root `AGENTS.md`
- `templates/AGENTS.md`
- `prompts/executor.md`
- `prompts/planner.md`
- `prompts/verifier.md`
- generated `developer_instructions` text in `src/config/generator.ts`
- focused regression coverage for prompt-contract expectations

Expansion pass ([#612](https://github.com/Yeachan-Heo/oh-my-codex/pull/612), follow-up to [#611](https://github.com/Yeachan-Heo/oh-my-codex/pull/611)):
- the broader agent prompt catalog (`analyst`, `architect`, `debugger`, `researcher`, `security-reviewer`, `writer`, and many more)
- execution-heavy skills including `analyze`, `autopilot`, `build-fix`, `code-review`, `plan`, `ralph`, `ralplan`, `security-review`, `team`, and `ultraqa`
- additional regression coverage for prompt catalogs, scenario examples, wave-two guidance, and skill guidance contracts

Behavioral emphasis now more explicitly covers:
- compact, information-dense output by default
- automatic follow-through on clear, low-risk, reversible next steps
- localized handling of mid-task user overrides
- continued tool usage when correctness depends on retrieval, diagnostics, or verification
- scenario-style examples that reinforce the intended execution contract across prompts and skills

## Bug fixes

### team-ops gateway contract restoration

A post-merge follow-up restored the intended public export surface for the `team-ops` gateway after the event-aware wait changes landed.

Fix: remove the accidental `teamEventLogPath` re-export so the strict `team-ops` module contract test remains stable.

PR: [#610](https://github.com/Yeachan-Heo/oh-my-codex/pull/610)

## Compare stats

- Commit window: **4 non-merge commits** (`2026-03-07`)
- Diff snapshot (`main...dev`): **69 files changed, +1,745 / -71**

## Full commit log (v0.8.5..v0.8.6)

```
9d3e2a2 fix(team): harden leader follow-up and event-aware waiting (#609)
c13290a fix(team): keep team-ops gateway contract stable (#610)
9d4b1ea feat: apply GPT-5.4 prompt-guidance patterns
76e3918 feat: expand GPT-5.4 prompt guidance across prompts and skills
```
