# oh-my-codex v0.9.0

Drafted: 2026-03-12

Pre-release draft based on unreleased `dev` changes since `v0.8.15`.

55 non-merge commits from `v0.8.15..dev`.
Contributors: Yeachan-Heo, Bellman, 2233admin, Seunghwan Eom, hoky1227.

## Highlights

### Spark Initiative: `omx explore` and `omx sparkshell`

OMX now has a stronger native fast path for repository discovery and shell-native inspection.

This release:
- introduces `omx explore` as the default read-only exploration entrypoint
- adds the Rust-backed explore harness plus packaging and source-fallback flow
- introduces `omx sparkshell <command> [args...]` as an explicit operator-facing native sidecar
- allows qualifying read-only shell-native `omx explore` tasks to route through `omx sparkshell`
- keeps the explore path intentionally constrained: shell-only, read-only, and allowlisted

Representative changes:
- `fb07c3c` — feat: add omx explore harness and packaging flow
- `71858c3` — feat: add omx sparkshell and team inspection metadata
- `e8e7594` — feat(explore): route qualifying read-only shell tasks via sparkshell
- `dc83dfd` — fix(explore): harden sparkshell fallback paths
- `25bdd23` — docs(guidance): refine explore and sparkshell usage

### Important Spark Initiative notes

For `0.9.0`, the important distribution contract is:

- users can install OMX normally with `npm install -g oh-my-codex`
- the npm package intentionally does **not** bundle all native binaries directly
- tagged releases publish cross-platform native archives for:
  - `omx-explore-harness`
  - `omx-sparkshell`
- packaged installs hydrate the matching native binary from the GitHub Release assets through `native-release-manifest.json`
- CI now validates the Rust path more directly with:
  - explicit Rust toolchain setup in the full build lane
  - `cargo fmt --all --check`
  - `cargo clippy --workspace --all-targets -- -D warnings`

This keeps npm installs simple for users while still shipping verified cross-platform native helpers.

### Native release assets are now first-class

`0.9.0` also upgrades OMX's release shape so the new native surfaces are publishable and consumable across platforms.

This release:
- unifies cross-platform native publishing for `omx-explore-harness` and `omx-sparkshell`
- generates a native release manifest with per-target metadata and checksums
- adds packed-install smoke verification to the release workflow
- validates `build:full` directly in CI
- keeps runtime fallback order explicit across env overrides, hydrated cache, packaged artifacts, and repo-local builds

Representative changes:
- `23d1cf5` — feat(release): unify cross-platform native publishing
- `559089f` — ci(release): add packed install smoke gate
- `99ce264` — ci: validate build:full in workflow
- `d12e5f4` — build: add build:full and document full vs TS-only builds
- `7aee91d` — fix(native-assets): soften missing manifest fallback

### Sparkshell is useful both directly and inside team operations

The sparkshell line is not just a hidden backend. It is now part of the operator story.

This release:
- exposes `omx sparkshell --tmux-pane <pane-id> --tail-lines <100-1000>` for explicit pane summarization
- surfaces sparkshell inspection metadata in team status flows
- makes long-output summarization more predictable
- adds stress coverage for noisy and adversarial output

Representative changes:
- `71858c3` — feat: add omx sparkshell and team inspection metadata
- `b890123` — fix: force low reasoning for sparkshell summaries (#781)
- `a653376` — test: add explore and sparkshell stress coverage

### Supporting runtime and operator polish

Alongside the spark-focused work, `dev` also picked up supporting improvements that make the release feel more complete:

- worker mailbox/trigger wording now nudges workers to report progress and continue execution instead of stopping after a reply (`#805`)
- centralized default model resolution (`94769c1`, PR `#787`)
- local help routing cleanup for `ask` and `hud` (`6b0b560`, `6dc245e`, PR `#786`)
- team runtime lifecycle and cleanup hardening (`a0a9626`, PR `#785`)
- Windows Codex command shim probing fix (`8fc859c`, PR `#793`)
- aspect-task distribution fix for team workers (`ce35d37`, PR `#789`)

## Upgrade notes

- If you use project-scoped OMX installs, rerun:

```bash
omx setup --force --scope project
```

- Expect `omx explore` and `omx sparkshell` packaged installs to rely on release-asset hydration when no explicit binary override or repo-local artifact is present.
- `npm pack` intentionally does **not** ship staged native binaries; native archives are attached to the GitHub Release and consumed through the native-asset workflow.

## Compare stats

- Commit window: **55 non-merge commits** (`2026-03-10` to `2026-03-12`)
- Diff snapshot (`v0.8.15...dev`): **149 files changed, +12,325 / -254**

## Merged PRs in the release window

- [#782](https://github.com/Yeachan-Heo/oh-my-codex/pull/782) — explore routes qualifying read-only shell tasks via sparkshell
- [#784](https://github.com/Yeachan-Heo/oh-my-codex/pull/784) — cross-platform native publishing and release-pipeline follow-through
- [#785](https://github.com/Yeachan-Heo/oh-my-codex/pull/785) — team runtime lifecycle and cleanup hardening
- [#786](https://github.com/Yeachan-Heo/oh-my-codex/pull/786) — nested help routing cleanup
- [#787](https://github.com/Yeachan-Heo/oh-my-codex/pull/787) — centralized OMX default model resolution
- [#788](https://github.com/Yeachan-Heo/oh-my-codex/pull/788) — HUD branch/config loading hardening
- [#789](https://github.com/Yeachan-Heo/oh-my-codex/pull/789) — distribute generated aspect tasks across workers
- [#793](https://github.com/Yeachan-Heo/oh-my-codex/pull/793) — Windows Codex command shim probing fix
- [#794](https://github.com/Yeachan-Heo/oh-my-codex/pull/794) — merge `experimental/dev` into `dev`
- [#805](https://github.com/Yeachan-Heo/oh-my-codex/pull/805) — keep workers running after mailbox replies

## Related issues highlighted in this release

- [#781](https://github.com/Yeachan-Heo/oh-my-codex/pull/781) — force low reasoning for sparkshell summaries
- [#744](https://github.com/Yeachan-Heo/oh-my-codex/issues/744) — persist lifecycle profiles for linked Ralph vs default team runs
- [#745](https://github.com/Yeachan-Heo/oh-my-codex/issues/745) — team cleanup policy hardening
- [#746](https://github.com/Yeachan-Heo/oh-my-codex/issues/746) — team policy/governance split follow-through
- [#741](https://github.com/Yeachan-Heo/oh-my-codex/issues/741) — release-readiness / linked team-Ralph runtime follow-up
- [#732](https://github.com/Yeachan-Heo/oh-my-codex/issues/732) — related team stall/lifecycle cleanup follow-up
