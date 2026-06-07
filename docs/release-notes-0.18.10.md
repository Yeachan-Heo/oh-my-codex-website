# oh-my-codex 0.18.10

`0.18.10` is a patch release after `0.18.9` focused on Stop hook reliability, tmux/team HUD ownership, Ultragoal/ralplan guardrails, auth defaults, and lean generated AGENTS guidance. It keeps the existing CLI/package contract while tightening failure handling for native hooks, worker startup, and maintainer-facing release/runtime surfaces.

## Highlights

- **Stop hooks fail safer and stay isolated** — native Stop handling now recovers malformed stdin, avoids null-device redirect regressions, keeps side-conversation Stop hooks isolated, and handles hook plugin runner stdin `EAGAIN` more robustly.
- **Team worker HUD ownership is tighter** — duplicate tmux HUD ownership is fixed, worker startup scripts no longer claim HUD panes, and worker Stop nudges route as team steering instead of leaking into the wrong runtime lane.
- **Autopilot, Ultragoal, and ralplan gates are stricter** — Autopilot execution contract foundations are in place, explicit Ultragoal team context fails closed, and ralplan native subagent leader gating is fixed.
- **Auth and generated-agent guidance are cleaner** — subscription Codex defaults are seeded, ultrawork docs routing is clarified, and generated AGENTS bootstrap output is debloated while preserving required contracts.
- **Dependency and release hygiene** — Biome is bumped to `2.4.16`, and the `0.18.9` post-publish evidence commits are included in the compare range as release hygiene.

## Fixes / compatibility

- Existing runtime state, hook plugin, team worker, Autopilot, Ultragoal, and generated AGENTS contracts remain compatible; this release narrows unsafe fallback behavior without intentional breaking changes.
- Open PR #2737 remains an external draft and is not part of this release.
- The release retains npm/package layout compatibility with `0.18.9`.

## Merged PR inventory

#2715, #2717, #2719, #2720, #2722, #2725, #2730, #2731, #2735, #2736, #2738, #2739, #2743, #2741.

- [#2715](https://github.com/Yeachan-Heo/oh-my-codex/pull/2715) — Bump @biomejs/biome from 2.4.15 to 2.4.16.
- [#2717](https://github.com/Yeachan-Heo/oh-my-codex/pull/2717) — Clarify ultrawork docs routing and guarantees.
- [#2719](https://github.com/Yeachan-Heo/oh-my-codex/pull/2719) — Route worker Stop nudges as team steering.
- [#2720](https://github.com/Yeachan-Heo/oh-my-codex/pull/2720) — Add Autopilot execution contract foundation.
- [#2722](https://github.com/Yeachan-Heo/oh-my-codex/pull/2722) — Fix hook plugin runner stdin EAGAIN (#2721).
- [#2725](https://github.com/Yeachan-Heo/oh-my-codex/pull/2725) — fix(auth): seed subscription Codex defaults.
- [#2730](https://github.com/Yeachan-Heo/oh-my-codex/pull/2730) — Fix planning hook null-device redirects.
- [#2731](https://github.com/Yeachan-Heo/oh-my-codex/pull/2731) — Fix Stop malformed stdin recovery.
- [#2735](https://github.com/Yeachan-Heo/oh-my-codex/pull/2735) — Fix ralplan native subagent leader gate.
- [#2736](https://github.com/Yeachan-Heo/oh-my-codex/pull/2736) — fix: fail closed explicit Ultragoal team context.
- [#2738](https://github.com/Yeachan-Heo/oh-my-codex/pull/2738) — Fix duplicate tmux HUD ownership for team workers.
- [#2739](https://github.com/Yeachan-Heo/oh-my-codex/pull/2739) — Stop team worker startup scripts from owning HUD panes.
- [#2743](https://github.com/Yeachan-Heo/oh-my-codex/pull/2743) — Fix side conversation Stop hook isolation.
- [#2741](https://github.com/Yeachan-Heo/oh-my-codex/pull/2741) — Debloat generated AGENTS bootstrap.

## Internal/no-PR commits in compare range

- `1bc3f9d0` — Add temporary npm fallback for 0.18.9 Fulcio outage.
- `f2efc145` — Record 0.18.9 publication fallback evidence.
- `75bc9f97` — Name native manifest in release notes.
- `73935230` — Prepare final 0.18.9 CI evidence gate.

## Issues

No open GitHub issues remain for the release range at release prep time. Closed issue coverage is represented by the merged PR inventory above.

## Validation

Release readiness evidence is recorded in `docs/qa/release-readiness-0.18.10.md`.

Release gates include version sync, build, lint/no-unused, native-agent and plugin-bundle verification, catalog docs check, targeted Stop/team/runtime tests, `git diff --check`, `npm pack --dry-run`, packed-install smoke, branch CI, tag-triggered release workflow, GitHub release proof, and npm publication proof.

**Full Changelog**: [`v0.18.9...v0.18.10`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.18.9...v0.18.10)
