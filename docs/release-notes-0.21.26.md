# oh-my-codex 0.21.26

`0.21.26` is a patch release for team dispatch state isolation and performance improvements (7 commits, 19 files, +722/−269; PRs #3859, #3862, #3863).

Versioning continues the 0.21.x patch train. This release hardens team dispatch recovery by isolating degraded state from runtime projections and optimizes dispatch identity ledger access for improved mailbox efficiency.

## Highlights

- **Team dispatch state isolation (#3862):** The team dispatch recovery system now isolates degraded observations from authoritative runtime projections, preventing stale state from contaminating recovery paths. Key improvements include:
  1. **Fallback request isolation:** Fallback requests, retries, and delivery observations are stored in each Team's dispatch directory, preventing TypeScript writers from overwriting shared runtime projections.
  2. **Fresh state on retry:** The merged dispatch reader supplements authoritative state only with proven local fallback requests or durable finalization receipts, ensuring recovery does not reinject stale requests.
  3. **Lifecycle preservation:** Retry counts and local reasons are preserved after runtime transitions, while authoritative lifecycle timestamps and foreign-Team isolation remain intact.
  
  This hardening strengthens the team delivery state contract and ensures dispatch isolation holds even when runtime bridges are degraded. Authored by @shenyankm.

- **Dispatch identity ledger optimization (#3863):** The dispatch identity ledger (`dispatch-seen.json`) is now loaded once per merge instead of per fallback request, reducing file I/O from O(fallbacks) reads to a single read and O(fallbacks) lookups. This improves team mailbox efficiency, especially with high fallback counts. Authored by @Yeachan-Heo.

## Compatibility

- Team dispatch recovery now uses fresh fallback state instead of stale observations; recovery behavior may differ for edge cases involving runtime bridge failures and local fallbacks.
- Existing dispatch records and team delivery state remain compatible.
- The team delivery state contract has been updated to reflect the new state isolation semantics.

## Known gaps

- None. All findings from prior releases remain documented in their respective release-readiness files.

## Validation evidence

The pinned candidate `cf72bbc1f0dc0bbcc4a627e8d0b9c34fbadc8c73` (release branch HEAD) passed latest-per-name pinned-dev CI: 17 checks succeeded with 8 conditional checks skipped, and no failures.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3859](https://github.com/Yeachan-Heo/oh-my-codex/pull/3859) | @dependabot | chore(deps): bump zod from 4.6.5 to 4.6.7 |
| [#3862](https://github.com/Yeachan-Heo/oh-my-codex/pull/3862) | @shenyankm | fix(team): isolate degraded dispatch state from runtime projections |
| [#3863](https://github.com/Yeachan-Heo/oh-my-codex/pull/3863) | @Yeachan-Heo | perf(team): load the dispatch identity ledger once per merge |

## Contributors

Thanks to @shenyankm for team dispatch state isolation, @Yeachan-Heo for dispatch ledger optimization, and @dependabot for dependency updates.

**Full Changelog**: [`v0.21.25...v0.21.26`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.25...v0.21.26)
