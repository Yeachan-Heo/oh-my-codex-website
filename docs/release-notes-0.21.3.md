# oh-my-codex 0.21.3

Patch release for `v0.21.2..3902573ef309e54534d7388579f2a7243ca7f465` (15 commits, 20 changed files, +1,285/−101, PRs #3604/#3605/#3606/#3608/#3610/#3612, linked issues #3609/#3611).

## Highlights

- **Team wake de-duplication** — duplicate Team wakes are prevented and terminal projections are retired instead of lingering, so a completed worker no longer re-triggers coordination work (#3608).

## Fixed

- **Long-session transcripts stay readable** — OMX clamped `history-limit` on its own detached tmux leader session/pane to 500 lines, so in a long session (~5h / 54 turns in the report) multi-line assistant responses were discarded out of scrollback while the session still held the text: the response looked cut to one line even though `/copy` copied all of it. The clamp is now 5000 lines and is overridable with `OMX_TMUX_HISTORY_LIMIT` (500–200000; unparseable values fall back to the default rather than shrinking a transcript) (#3612, fixes #3611).

## Documentation

- **Composer drift triage** — `docs/troubleshooting.md` documents the "prompt input line drifts into the middle of the pane" symptom: what OMX does and does not do to the pane, the measured negative repro matrix across idle/streaming/detach/reattach/tmux-option cases, the `tmux resize-pane -D 1 && tmux resize-pane -U 1` recovery, and the fields to attach when reporting a persistent drift (#3610, documents #3609).
- **Scrollback semantics** — the same file now records that `history-limit` is captured when a pane is created, so raising it afterwards does not grow an existing pane's scrollback.

## Dependencies

- `@types/node` 26.2.0 → 26.4.0 (#3606).
- `zod` 4.4.3 → 4.5.2 (#3605).
- `@biomejs/biome` 2.5.10 → 2.5.11 (#3604).

## Compatibility

Patch release, no breaking changes. The scrollback clamp change only raises the ceiling for OMX-owned detached leader sessions and adds an opt-in override; panes already created keep the scrollback size they were born with.

## Merged PR inventory

- [#3612](https://github.com/Yeachan-Heo/oh-my-codex/pull/3612) — fix(tmux): raise detached scrollback clamp so long responses stay readable.
- [#3610](https://github.com/Yeachan-Heo/oh-my-codex/pull/3610) — docs: prompt composer drift triage + recovery.
- [#3608](https://github.com/Yeachan-Heo/oh-my-codex/pull/3608) — fix: prevent duplicate Team wakes and retire terminal projections.
- [#3606](https://github.com/Yeachan-Heo/oh-my-codex/pull/3606) — build(deps-dev): bump @types/node.
- [#3605](https://github.com/Yeachan-Heo/oh-my-codex/pull/3605) — build(deps): bump zod.
- [#3604](https://github.com/Yeachan-Heo/oh-my-codex/pull/3604) — build(deps-dev): bump @biomejs/biome.

## Validation evidence

Recorded in `docs/qa/release-readiness-0.21.3.md`; range inventory in `artifacts/release-0.21.3/inventory.md`.

**Full Changelog**: [`v0.21.2...v0.21.3`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.2...v0.21.3)
