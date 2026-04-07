# Release Readiness Verdict - 0.12.1

Date: **2026-04-07**
Target version: **0.12.1**
Comparison base: **`v0.12.0..HEAD`**
Verdict: **GO** ✅

`0.12.1` is a focused patch release that addresses the three findings from the `release/0.12.1` review pass: machine-readable team status output, interactive worker PID metadata, and release-collateral alignment.

## Scope reviewed

- team mailbox delivery idempotence during leader-mail pruning (`src/team/state/mailbox.ts`, `src/team/__tests__/state.test.ts`)
- interactive worker PID capture and persistence (`src/team/runtime.ts`, `src/team/__tests__/runtime.test.ts`)
- release metadata and collateral (`package.json`, `package-lock.json`, `Cargo.toml`, `CHANGELOG.md`, `RELEASE_BODY.md`, `docs/release-notes-0.12.1.md`)

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Mailbox delivery regression | `node --test dist/team/__tests__/state.test.js` | PASS |
| Interactive PID regression | `node --test --test-name-pattern="startTeam captures interactive worker pid from the resolved pane id" dist/team/__tests__/runtime.test.js` | PASS |
| Targeted lint | `npx biome lint src/team/state/mailbox.ts src/team/__tests__/state.test.ts src/team/runtime.ts src/team/__tests__/runtime.test.ts` | PASS |
| Version sync contract | `node --test dist/cli/__tests__/version-sync-contract.test.js` | PASS |

## Final verdict

Release **0.12.1** is **ready for branch push and PR handoff**.
