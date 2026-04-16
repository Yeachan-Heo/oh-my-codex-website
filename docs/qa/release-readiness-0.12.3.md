# Release Readiness Verdict - 0.12.3

Date: **2026-04-08**
Target version: **0.12.3**
Comparison base: **`v0.12.2..HEAD`**
Verdict: **GO** ✅

`0.12.3` is a tight follow-up to `0.12.2` that ships PR [#1364](https://github.com/Yeachan-Heo/oh-my-codex/pull/1364) (`$team` prompt-routing correctness and duplicate team launch teardown), which was intended for `0.12.2` but finished its conflict resolution after the `0.12.2` cut, plus release-collateral alignment.

## Scope reviewed

- `$team` keyword detection and prompt-routing seam (`src/hooks/keyword-detector.ts`, `src/hooks/__tests__/keyword-detector.test.ts`, `src/scripts/codex-native-hook.ts`, `src/scripts/__tests__/codex-native-hook.test.ts`)
- `startTeam` duplicate same-name team guard (`src/team/runtime.ts`, `src/team/__tests__/runtime.test.ts`)
- release metadata and release docs (`package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`, `CHANGELOG.md`, `RELEASE_BODY.md`, `docs/release-notes-0.12.3.md`)

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Lint | `npm run lint` | PASS |
| Full test suite | `npm test` | PASS |
| Packed-install smoke | `npm run smoke:packed-install` | PASS |

## Final verdict

Release **0.12.3** is **ready for branch push and PR handoff** on the basis of the verified `v0.12.2..HEAD` patch scope above.
