# Release notes — 0.12.1

## Summary

`0.12.1` is a patch release after `0.12.0` that closes the three findings surfaced in the release branch review: clean machine-readable team status output, correct interactive worker PID metadata, and synchronized `0.12.1` release collateral.

## Included fixes and changes

- leader mailbox pruning no longer replays duplicate delivered-message bridge calls, so `omx team status --json` stays parseable
- interactive team worker metadata now records the PID from the resolved pane id and persists it into config/identity state
- release metadata and collateral are aligned to `0.12.1` across Node, Cargo, changelog, release body, and release-readiness docs

## Verification evidence

- `npm run build` ✅
- `node --test dist/team/__tests__/state.test.js` ✅
- `node --test --test-name-pattern="startTeam captures interactive worker pid from the resolved pane id" dist/team/__tests__/runtime.test.js` ✅
- `npx biome lint src/team/state/mailbox.ts src/team/__tests__/state.test.ts src/team/runtime.ts src/team/__tests__/runtime.test.ts` ✅
- `node --test dist/cli/__tests__/version-sync-contract.test.js` ✅

## Remaining risk

- This is a targeted local patch verification pass, not a full CI matrix rerun.
- Post-release monitoring should keep an eye on team status JSON output and interactive worker lifecycle telemetry.
