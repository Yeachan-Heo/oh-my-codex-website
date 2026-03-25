# oh-my-codex v0.8.8

Released: 2026-03-08

5 non-merge commits from `main..dev`.
Contributor: [@Yeachan-Heo](https://github.com/Yeachan-Heo).

## Highlights

### Anti-slop workflow rollout

OMX now ships an anti-slop workflow across its guidance/catalog surfaces.

This release:
- adds anti-slop workflow guidance to root and template `AGENTS.md`
- introduces the dedicated `skills/ai-slop-cleaner/SKILL.md` surface
- updates catalog manifests and generated catalog output for the new workflow
- adds regression coverage for the anti-slop workflow contract

PR: [#634](https://github.com/Yeachan-Heo/oh-my-codex/pull/634)

### Team reasoning effort can be allocated per teammate

Team execution now carries reasoning-effort decisions deeper into runtime and worker-launch paths instead of treating worker configuration as one undifferentiated default.

This release:
- extends team model-contract logic for teammate-specific reasoning effort
- updates runtime, scaling, and tmux-session behavior to propagate those settings
- adds regression coverage for runtime, tmux session, and model-contract paths
- refreshes README and team skill guidance to reflect the new behavior

PR: [#642](https://github.com/Yeachan-Heo/oh-my-codex/pull/642)

## Bug fixes and operational polish

### Deep-interview auto-approval lock hardening

Notify-hook and keyword-detection logic were tightened so deep-interview auto-approval injection stays lock-protected and better covered by tests.

PR: [#637](https://github.com/Yeachan-Heo/oh-my-codex/pull/637)

### Packaging and routing contract fixes

This release also includes smaller contract corrections:
- normalizes the published npm bin path and updates package-bin regression coverage ([#638](https://github.com/Yeachan-Heo/oh-my-codex/pull/638))
- explicitly reserves the worker role for team mode in prompt-guidance routing, with regression coverage via PR [#641](https://github.com/Yeachan-Heo/oh-my-codex/pull/641)

## Compare stats

- Commit window: **5 non-merge commits** (`2026-03-08` to `2026-03-08`)
- Diff snapshot (`main...dev`): **29 files changed, +1,061 / -203**

## Full commit log (`main..dev`)

```text
d6dae26 feat(team): allocate reasoning effort per teammate (#642)
ac675d0 feat: add anti-slop workflow (#634)
a4e6e35 fix(pkg): normalize npm bin path (#638)
4352f30 fix: lock deep-interview auto-approval injection (#637)
274d5e7 fix: reserve worker role for team mode
```
