# oh-my-codex 0.21.1 release notes

Release date: 2026-08-31

`0.21.1` is a patch release covering `v0.21.0..abf2393af1e1f9355adfe43166432462a86d2e54`: 125 commits, 116 changed files (+23,996/−1,141), 28 commit-subject issue/PR references, and two additional linked issues (#3587, #3589). It hardens release authority, detached HUD/session cleanup, state and plugin provenance, and introduces Ralplan Advisory as a cooperative, non-authorizing planning workflow.

## Highlights

- **Ralplan Advisory / Contract A** — adds cooperative Planner → Architect → Critic review evidence without granting execution authority, installing a global tool fence, suppressing unrelated workflows, or automatically handing off to implementation. Lifecycle evidence, reviewer-time artifact bytes, crash recovery, canonical mode/skill mirrors, generation CAS, and cross-platform durability fail closed (#3594).
- **HUD ownership and layout reconciliation** — keeps each HUD adjacent to its owning pane across split, join, move, swap, and layout changes; hook identity, cleanup, contention re-arming, detached ownership, and real-tmux behavior are regression-tested (#3577, #3578, #3584, #3587, #3588, #3595).
- **Team legacy HUD compatibility** — Team startup recognizes both session-only and leader-only legacy HUD ownership before freezing window topology (#3597).
- **Trusted release and package authority** — tag publication is bound to `main` ancestry and exact SHA, npm publishing uses trusted publishing, manual token publishing is retired, release assets are verified, and plugin/cache provenance rejects symlink and namespace confusion (#3552, #3566, #3570, #3571, #3572).
- **Cross-platform state and process identity** — state writes, canonical leases, lock recovery, session pointers, and detached cleanup distinguish exact process incarnations and preserve Windows/macOS path and durability semantics (#3558, #3561, #3581, #3582).
- **Runtime and configuration reliability** — fixes Ralph native-app deadlock recovery, malformed SparkShell tail-line parsing, empty hooks-state recovery, and generated config trust checks (#3589, #3590, #3592).

## Compatibility

This is a patch release. Ralplan Advisory is additive and intentionally non-authorizing. Existing standard Ralplan, Team, Ultragoal, plugins, goals, and global side effects remain independent. The release workflow no longer supports the retired manual npm-token path.

## Inventory

The reproducible release inventory is recorded in `artifacts/release-0.21.1/inventory.md`.

## Contributors

Thanks to Bellman (@Yeachan-Heo), @FacuVCanale, @NagyVikt, @berahac, @XCRobert, @colanx, @wangxingzhen, @chenjiaming-kezaihui, @app/dependabot, and the gaebal-gajae (clawdbot) release and repair lanes.

**Full Changelog**: [`v0.21.0...v0.21.1`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.0...v0.21.1)
