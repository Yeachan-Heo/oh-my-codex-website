# Release Readiness Verdict - 0.8.2

Date: **2026-03-06**
Target version: **0.8.2**
Verdict: **GO** ✅

## Scope reviewed

- Version bump to `0.8.2` (`package.json`, `package-lock.json`)
- Changelog update (`CHANGELOG.md`)
- Release note draft (`docs/release-notes-0.8.2.md`)
- Final release candidate aligned to `main`

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS (`0:07.48`) |
| Full test suite | `npm test` | PASS (`1933` pass / `0` fail, `2:19.38`) |
| No-unused type gate | `npm run check:no-unused` | PASS (`0:04.48`) |
| CLI help smoke | `node bin/omx.js --help` | PASS |
| Version smoke | `node bin/omx.js version` | PASS (`oh-my-codex v0.8.2`) |
| Status smoke | `node bin/omx.js status` | PASS |
| Doctor smoke | `node bin/omx.js doctor` | PASS (`9 passed, 0 warnings, 0 failed`) |
| Setup dry-run smoke | `node bin/omx.js setup --dry-run` | PASS |
| Cancel smoke | `node bin/omx.js cancel` | PASS |

## Risk notes

- No failing checks were observed in final release validation.
- `npm test` includes long-running notification/tmux/team integration coverage, but all suites completed successfully.
- Release details tag merged PRs `#571`, `#572`, `#575`, `#576`, `#579`, `#580`, `#581`, `#582`, `#583`, `#584` and related issues `#564`, `#573`, `#574`, `#578`.

## Final verdict

Release **0.8.2** is **ready to publish** based on current local verification evidence.
