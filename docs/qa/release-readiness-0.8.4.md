# Release Readiness Verdict - 0.8.4

Date: **2026-03-06**
Target version: **0.8.4**
Verdict: **GO** ✅

## Scope reviewed

- Version bump to `0.8.4` (`package.json`, `package-lock.json`)
- Changelog update (`CHANGELOG.md`)
- Release note draft (`docs/release-notes-0.8.4.md`)
- Setup refresh improvements already merged on `dev` via commits `fed035b` and `6aa577d`
- Release-validation hardening for watcher shutdown cleanup and `check:no-unused` cleanup in setup

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Full test suite | `npm test` | PASS (`1940` pass / `0` fail, `duration_ms 206426.374278`) |
| No-unused type gate | `npm run check:no-unused` | PASS |
| CLI help smoke | `node bin/omx.js --help` | PASS |
| Version smoke | `node bin/omx.js version` | PASS (`oh-my-codex v0.8.4`) |
| Doctor smoke | `node bin/omx.js doctor` | PASS (`9 passed, 0 warnings, 0 failed`) |
| Setup dry-run smoke | `node bin/omx.js setup --dry-run` | PASS |
| Targeted watcher regression | `node --test dist/hooks/__tests__/notify-fallback-watcher.test.js` | PASS (`6` pass / `0` fail) |

## Risk notes

- This is a focused patch release centered on `omx setup` refresh behavior and managed model upgrade prompting.
- Primary regression surface is setup/config refresh behavior across repeat runs and scoped installs.
- Release validation uncovered two additional quality issues during final gating: a watcher shutdown cleanup race in one streaming test and an unused setup prompt path caught by the strict no-unused check. Both were resolved and the full release gates were rerun cleanly.

## Final verdict

Release **0.8.4** is **ready to publish** based on the fresh local verification evidence above.
