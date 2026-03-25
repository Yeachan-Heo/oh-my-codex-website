# Release Readiness Verdict - 0.8.1

Date: **2026-03-05**
Target version: **0.8.1**
Verdict: **GO** ✅

## Scope reviewed

- Version bump to `0.8.1` (`package.json`, `package-lock.json`)
- Changelog update (`CHANGELOG.md`)
- Release note draft (`docs/release-notes-0.8.1.md`)

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Full test suite | `npm test` | PASS (`1908` pass / `0` fail) |
| No-unused type gate | `npm run check:no-unused` | PASS |
| CLI help smoke | `node bin/omx.js --help` | PASS |
| Version smoke | `node bin/omx.js version` | PASS (`oh-my-codex v0.8.1`) |
| Status smoke | `node bin/omx.js status` | PASS |
| Doctor smoke | `node bin/omx.js doctor` | PASS (`9 passed, 0 warnings, 0 failed`) |
| Setup dry-run smoke | `node bin/omx.js setup --dry-run` | PASS |
| Cancel smoke | `node bin/omx.js cancel` | PASS |

## Risk notes

- No failing checks observed in release validation.
- `npm test` runtime was long (~721s) due expected long-running notification/tmux integration tests; all completed successfully.

## Final verdict

Release **0.8.1** is **ready to publish** based on current local verification evidence.
