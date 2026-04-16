# Release notes — 0.12.3

## Summary

`0.12.3` is a tight follow-up patch to `0.12.2`. It ships PR [#1364](https://github.com/Yeachan-Heo/oh-my-codex/pull/1364), which was intended to land in `0.12.2` but finished its conflict resolution after the `0.12.2` cut — `$team` prompt-routing correctness and duplicate team launch teardown — plus synchronized `0.12.3` release collateral.

## Included fixes and changes

- `$team` detected in `UserPromptSubmit` now seeds root `team-state.json` and nudges operators toward `omx team ...` / `omx team --help` instead of silently misrouting the prompt (#1364)
- `startTeam` rejects duplicate active same-name team launches with a `team_name_conflict` error before mutating team state or provisioning worktrees, keeping the existing team config and tasks intact (#1364)
- release metadata and collateral are aligned to `0.12.3` across Node, Cargo, changelog, release body, and release-readiness docs

## Verification evidence

- `npm run build` ✅
- `npm run lint` ✅
- `npm test` ✅
- `npm run smoke:packed-install` ✅

## Remaining risk

- This is a local verification pass, not a full CI matrix rerun.
- PR #1364 touches live `$team` keyword handling and `startTeam` state seeding; post-release monitoring should watch for regressions in prompt-driven team launch paths.
