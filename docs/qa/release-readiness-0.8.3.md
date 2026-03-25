# Release Readiness Verdict - 0.8.3

Date: **2026-03-06**
Target version: **0.8.3**
Verdict: **GO** ✅

## Scope reviewed

- Version bump to `0.8.3` (`package.json`, `package-lock.json`)
- Changelog update (`CHANGELOG.md`)
- Release note draft (`docs/release-notes-0.8.3.md`)
- Gemini worker hotfix already merged on `dev` via PR `#585`
- Test-only hardening for `src/hooks/__tests__/notify-fallback-watcher.test.ts` to stabilize full-suite verification under load

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS (`real 9.15`) |
| Full test suite | `npm test` | PASS (`1926` pass / `0` fail, `real 498.76`, after clean `dist/` rebuild) |
| No-unused type gate | `npm run check:no-unused` | PASS (`real 4.73`) |
| CLI help smoke | `node bin/omx.js --help` | PASS (`real 0.10`) |
| Version smoke | `node bin/omx.js version` | PASS (`oh-my-codex v0.8.3`, `real 0.10`) |
| Status smoke | `node bin/omx.js status` | PASS (`ultrawork: ACTIVE (phase: debugging-verification)`, `real 0.13`) |
| Doctor smoke | `node bin/omx.js doctor` | PASS (`9 passed, 0 warnings, 0 failed`, `real 0.21`) |
| Setup dry-run smoke | `node bin/omx.js setup --dry-run` | PASS (`real 0.58`) |
| Cancel smoke | `node bin/omx.js cancel` | PASS (`Cancelled: ultrawork`) |
| Gemini worker targeted tests | `node --test dist/team/__tests__/tmux-session.test.js --test-name-pattern='gemini|buildWorkerProcessLaunchSpec returns command/args/env for prompt process spawn'` | PASS (`127` pass / `0` fail, `real 1.80`) |
| Gemini runtime targeted tests | `node --test dist/team/__tests__/runtime.test.js --test-name-pattern='startTeam launches gemini workers with startup prompt and no default model passthrough'` | PASS (`54` pass / `0` fail, `real 66.40`) |
| Gemini tmux demo targeted tests | `node --test dist/team/__tests__/tmux-claude-workers-demo.test.js --test-name-pattern='gemini'` | PASS (`18` pass / `0` fail, `real 0.38`) |

## Risk notes

- This is a focused patch release centered on the Gemini worker startup hotfix after the `0.8.2` dev release line.
- Primary regression surface is the team runtime / tmux-session Gemini worker startup path.
- A secondary validation risk was a flaky watcher test under full-suite load; that test was hardened to wait for watcher readiness and the full clean suite now passes.

## Final verdict

Release **0.8.3** is **ready to publish** based on the fresh local verification evidence above.
