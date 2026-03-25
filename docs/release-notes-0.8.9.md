# oh-my-codex v0.8.9

Released: 2026-03-08

2 non-merge commits from `v0.8.8..dev`.
Contributor: [@Yeachan-Heo](https://github.com/Yeachan-Heo).

## Highlights

### Team worker startup now honors routed role prompts end-to-end

This hotfix release finishes the team worker startup path so routed task roles are not just inferred during planning — they are carried into the actual worker startup instruction surface and live worker metadata.

This release:
- persists routed worker roles into live team config and worker identity
- composes per-worker startup `AGENTS.md` files from the resolved role prompt
- keeps role-based default reasoning allocation active unless an explicit launch override is present
- verifies the live worker launch path with runtime, tmux-session, and worker-bootstrap coverage

PR: [#643](https://github.com/Yeachan-Heo/oh-my-codex/pull/643)

### Scale-up task bootstrap now preserves canonical task identity

Dynamic scaling now writes new tasks through canonical team state before worker bootstrap, so scaled workers receive stable task ids, persisted roles, and inbox/task metadata that matches the runtime contract used by initial team startup.

This release:
- persists scaled tasks before worker bootstrap instead of reconstructing synthetic inbox-only task metadata
- preserves role/owner/task-id fidelity during scale-up
- adds regression coverage for canonical scale-up task state and inbox ids

## Upgrade note

If you use project-scoped OMX installs, rerun:

```bash
omx setup --force --scope project
```

after upgrading so managed project config/native-agent paths are refreshed.

## Full commit log (`v0.8.8..dev`)

```text
11b2640 fix(team): persist scaled tasks before worker bootstrap
5591cf6 fix(team): persist routed roles into startup instructions (#643)
```
