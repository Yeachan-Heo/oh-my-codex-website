# oh-my-codex 0.20.5 release notes

Release date: 2026-08-10

`0.20.5` is a patch release covering the exact frozen range `v0.20.4..13c08f84cb6c27750b8f5c4a4d5105faad074196`: 68 commits and 35 merged PRs, with no intentional breaking CLI or package-layout changes.

## Highlights

- Darwin detached launches now return control only after exact leader/HUD finalization, with live-pane readiness and atomic metadata binding (#3472).
- Session and native-hook authority is tightened around indeterminate bindings, directory capabilities, lock diagnostics, Stop handling, and authorization-failure reinjection (#3416, #3421, #3471, #3472).
- Ralplan preflight is state-preserving, emits structured version diagnostics, clears stale owner state, supports typed consensus delegation, and recognizes Codex 0.148 alpha versions (#3450, #3455, #3456, #3473).
- Windows setup tolerates directory durability and mode-synthesis differences while launch repair preserves user notify/reasoning settings and project scope (#3448, #3449, #3467, #3468).
- Team preserves tmux source-authority separator boundaries and explains foreign pane topology instead of claiming it (#3434, #3460).
- Packed-install/runtime checks are deterministic, detached state is launch-bound, and Doctor validates native process identity readiness (#3395, #3436, #3454, #3461, #3470).
- Dependencies update `windows-sys`, `tar-stream`, `@types/tar-stream`, `@biomejs/biome`, and `@types/node` (#3429–#3432).

## Inventory

The concise, reproducible range and PR inventory is recorded in `artifacts/release-0.20.5/inventory.md`. The merged PRs are [#3395](https://github.com/Yeachan-Heo/oh-my-codex/pull/3395), [#3396](https://github.com/Yeachan-Heo/oh-my-codex/pull/3396), [#3401](https://github.com/Yeachan-Heo/oh-my-codex/pull/3401), [#3402](https://github.com/Yeachan-Heo/oh-my-codex/pull/3402), [#3403](https://github.com/Yeachan-Heo/oh-my-codex/pull/3403), [#3404](https://github.com/Yeachan-Heo/oh-my-codex/pull/3404), [#3409](https://github.com/Yeachan-Heo/oh-my-codex/pull/3409), [#3410](https://github.com/Yeachan-Heo/oh-my-codex/pull/3410), [#3413](https://github.com/Yeachan-Heo/oh-my-codex/pull/3413), [#3416](https://github.com/Yeachan-Heo/oh-my-codex/pull/3416), [#3419](https://github.com/Yeachan-Heo/oh-my-codex/pull/3419), [#3421](https://github.com/Yeachan-Heo/oh-my-codex/pull/3421), [#3425](https://github.com/Yeachan-Heo/oh-my-codex/pull/3425), [#3429](https://github.com/Yeachan-Heo/oh-my-codex/pull/3429), [#3430](https://github.com/Yeachan-Heo/oh-my-codex/pull/3430), [#3431](https://github.com/Yeachan-Heo/oh-my-codex/pull/3431), [#3432](https://github.com/Yeachan-Heo/oh-my-codex/pull/3432), [#3434](https://github.com/Yeachan-Heo/oh-my-codex/pull/3434), [#3436](https://github.com/Yeachan-Heo/oh-my-codex/pull/3436), [#3446](https://github.com/Yeachan-Heo/oh-my-codex/pull/3446), [#3448](https://github.com/Yeachan-Heo/oh-my-codex/pull/3448), [#3449](https://github.com/Yeachan-Heo/oh-my-codex/pull/3449), [#3450](https://github.com/Yeachan-Heo/oh-my-codex/pull/3450), [#3453](https://github.com/Yeachan-Heo/oh-my-codex/pull/3453), [#3454](https://github.com/Yeachan-Heo/oh-my-codex/pull/3454), [#3455](https://github.com/Yeachan-Heo/oh-my-codex/pull/3455), [#3456](https://github.com/Yeachan-Heo/oh-my-codex/pull/3456), [#3460](https://github.com/Yeachan-Heo/oh-my-codex/pull/3460), [#3461](https://github.com/Yeachan-Heo/oh-my-codex/pull/3461), [#3467](https://github.com/Yeachan-Heo/oh-my-codex/pull/3467), [#3468](https://github.com/Yeachan-Heo/oh-my-codex/pull/3468), [#3470](https://github.com/Yeachan-Heo/oh-my-codex/pull/3470), [#3471](https://github.com/Yeachan-Heo/oh-my-codex/pull/3471), [#3472](https://github.com/Yeachan-Heo/oh-my-codex/pull/3472), and [#3473](https://github.com/Yeachan-Heo/oh-my-codex/pull/3473).

## Validation

Local release-blocking evidence is recorded in `docs/qa/release-readiness-0.20.5.md`. Broad platform CI, tagging, GitHub Release creation, and npm publication are intentionally left to the promotion lane.

## Contributors

Thanks to Bellman (@Yeachan-Heo) for the majority of commits in this range, with an additional contribution from @ev78394, plus @app/dependabot for dependency updates.

**Full Changelog**: [`v0.20.4...v0.20.5`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.20.4...v0.20.5)
