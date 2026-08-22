# oh-my-codex 0.21.0 release notes

Release date: 2026-08-22

`0.21.0` is a minor release covering the exact frozen range `v0.20.5..0f2bbb704b83f94a69622b1915f555498e0dd283`: 99 commits and 44 referenced PRs (36 merged into the range; three window PRs — #3503, #3511, #3524 — were main-only and are intentionally excluded). This is the post-epic consolidation train and it intentionally removes deprecated skills and MCP state writer tools with explicit migration errors.

## Highlights

- **Removed skills with migration stubs** — 25 removed skills fail fast through a uniform sunset-stub resolver: `$ralph` → `$ultragoal` (the `omx ralph` CLI and ralph persistence runtime are unaffected), `$ultrawork`/`$ecomode`/`$swarm` → `$team`, `$prometheus-strict` → `$plan`, `$review`/`$security-review` → `$code-review`, `$ask-claude`/`$ask-gemini` → `$ask`, `$deepsearch` → `$analyze`, `$frontend-ui-ux` → `$design`, `$visual-verdict`/`$web-clone` → `$visual-ralph`, `$help` → `$omx-setup`; `$tdd`, `$note`, `$trace`, `$build-fix` have no direct replacement (#3506, #3502, #3508).
- **`omx autopilot` returns as the canonical orchestrator** — a first-class CLI command restoring the staged `$deep-interview` → `$ralplan` → `$ultragoal` chain (#3518, #3517), with Ultragoal gaining ordinary/strict modes and an advisory completion cohort gate in ordinary mode (#3500, #3505).
- **Hard workflow gates removed** — the Autopilot/Ralplan consensus-receipt gate is gone; workflow transitions no longer require a host-issued consensus receipt, and PreToolUse hooks are advisory-only with Codex App capability warnings (#3492, #3497).
- **State single source of truth** — sole-writer state model, read-only MCP projection (`state_write`/`state_clear` removed with explicit deprecation errors), shared handoff-carrier invariants, explicit stale-projection retirement via `omx doctor --repair-state`, and fail-closed corrupt-carrier handling (#3507, #3498).
- **Bounded plugin lifecycle** — plugin snapshots are bounded with a hook escape hatch, and deprecated-skill retirement is keyed to install badges (#3499, #3512).
- **Session authority hardened** — read/write authority split for identity-indeterminate pointers, bounded unproven-pointer adoption, verified-dead pointer quarantine with forensic preservation, and team worker provenance verification for external state roots (#3527, #3541, #3528, #3537).

## Fixes / compatibility notes

- Detached `--madmax` root identity on macOS: path-alias canonicalization, post-create re-resolution, path-alias-insensitive launch keys (#3550/#3551).
- Detached tmux owner race retried under an unchanged authority fence (#3540, #3541); team scale-down claim-boundary coverage made load-tolerant (#3548, #3549).
- `omx-runtime` hydration and discovery on macOS arm64 npm installs (#3519, #3520).
- URL reader no longer false-truncates at the exact size limit (#3546); notification zero/invalid durations handled (#3544); HUD tolerates Fish `export` (#3480).
- Worker triggers use tmux named `Enter` with Claude 2.1.x prompt detection (#3531); guarded split receipts reject format-string injection (#3489).
- Ralplan → Ultragoal handoff reachable via user-authorized execution handoff (#3463, #3483); Conductor delegation lanes unblocked (#3482); workflow/hook recovery contracts aligned (#3514, #3486).
- Version display prefers `OMX_VERSION_REVISION` over `OMX_GIT_REVISION` (#3417); dependencies: `@biomejs/biome` 2.5.8 (#3532), `@types/node` 26.2.0 (#3485).

**Upgrade notes for 0.20.x users:** invocations of removed skills now hard-error with the replacement name in the message; MCP clients calling `state_write`/`state_clear` must move to CLI/programmatic state operations; stale 0.20.x state projections should be retired with `omx doctor --repair-state` (archives under `.omx/archive/`). A 0.20→0.21 upgrade fixture and generator drift tests ship in `npm test` (#3509).

## Inventory

The concise, reproducible range and PR inventory is recorded in `artifacts/release-0.21.0/inventory.md`. Merged PRs in the range: [#3417](https://github.com/Yeachan-Heo/oh-my-codex/pull/3417), [#3463](https://github.com/Yeachan-Heo/oh-my-codex/pull/3463), [#3480](https://github.com/Yeachan-Heo/oh-my-codex/pull/3480), [#3482](https://github.com/Yeachan-Heo/oh-my-codex/pull/3482), [#3483](https://github.com/Yeachan-Heo/oh-my-codex/pull/3483), [#3484](https://github.com/Yeachan-Heo/oh-my-codex/pull/3484), [#3485](https://github.com/Yeachan-Heo/oh-my-codex/pull/3485), [#3486](https://github.com/Yeachan-Heo/oh-my-codex/pull/3486), [#3489](https://github.com/Yeachan-Heo/oh-my-codex/pull/3489), [#3492](https://github.com/Yeachan-Heo/oh-my-codex/pull/3492), [#3497](https://github.com/Yeachan-Heo/oh-my-codex/pull/3497), [#3499](https://github.com/Yeachan-Heo/oh-my-codex/pull/3499), [#3502](https://github.com/Yeachan-Heo/oh-my-codex/pull/3502), [#3505](https://github.com/Yeachan-Heo/oh-my-codex/pull/3505), [#3506](https://github.com/Yeachan-Heo/oh-my-codex/pull/3506), [#3507](https://github.com/Yeachan-Heo/oh-my-codex/pull/3507), [#3508](https://github.com/Yeachan-Heo/oh-my-codex/pull/3508), [#3509](https://github.com/Yeachan-Heo/oh-my-codex/pull/3509), [#3510](https://github.com/Yeachan-Heo/oh-my-codex/pull/3510), [#3512](https://github.com/Yeachan-Heo/oh-my-codex/pull/3512), [#3513](https://github.com/Yeachan-Heo/oh-my-codex/pull/3513), [#3514](https://github.com/Yeachan-Heo/oh-my-codex/pull/3514), [#3516](https://github.com/Yeachan-Heo/oh-my-codex/pull/3516), [#3517](https://github.com/Yeachan-Heo/oh-my-codex/pull/3517), [#3518](https://github.com/Yeachan-Heo/oh-my-codex/pull/3518), [#3519](https://github.com/Yeachan-Heo/oh-my-codex/pull/3519), [#3520](https://github.com/Yeachan-Heo/oh-my-codex/pull/3520), [#3523](https://github.com/Yeachan-Heo/oh-my-codex/pull/3523), [#3527](https://github.com/Yeachan-Heo/oh-my-codex/pull/3527), [#3528](https://github.com/Yeachan-Heo/oh-my-codex/pull/3528), [#3531](https://github.com/Yeachan-Heo/oh-my-codex/pull/3531), [#3532](https://github.com/Yeachan-Heo/oh-my-codex/pull/3532), [#3533](https://github.com/Yeachan-Heo/oh-my-codex/pull/3533), [#3537](https://github.com/Yeachan-Heo/oh-my-codex/pull/3537), [#3539](https://github.com/Yeachan-Heo/oh-my-codex/pull/3539), [#3541](https://github.com/Yeachan-Heo/oh-my-codex/pull/3541), [#3544](https://github.com/Yeachan-Heo/oh-my-codex/pull/3544), [#3546](https://github.com/Yeachan-Heo/oh-my-codex/pull/3546), [#3547](https://github.com/Yeachan-Heo/oh-my-codex/pull/3547), [#3548](https://github.com/Yeachan-Heo/oh-my-codex/pull/3548), [#3549](https://github.com/Yeachan-Heo/oh-my-codex/pull/3549), [#3550](https://github.com/Yeachan-Heo/oh-my-codex/pull/3550), and [#3551](https://github.com/Yeachan-Heo/oh-my-codex/pull/3551).

## Validation

Local release-blocking evidence is recorded in `docs/qa/release-readiness-0.21.0.md`. Broad platform CI, tagging, GitHub Release creation, and npm publication are intentionally left to the owner-authorized promotion lane (issue #3552).

## Contributors

Thanks to Bellman (@Yeachan-Heo) for the majority of commits in this range, with additional contributions from @hiSandog (#3417, #3544, #3546), @jason931225 (#3528), @NagyVikt (#3480), and the gaebal-gajae (clawdbot) release bot, plus @app/dependabot for dependency updates (#3484, #3485, #3532).

**Full Changelog**: [`v0.20.5...v0.21.0`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.20.5...v0.21.0)
