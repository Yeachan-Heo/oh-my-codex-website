# Recent bug regression hardening — 2026-04-11

Focused regression additions for the compiled recent-bug suite on this branch:

1. **Planning-precedence follow-ups** — keeps approved short `ralph` follow-ups from being re-gated back into `ralplan` after planning artifacts already exist.
2. **Stop-hook stale-root vs current-session** — treats an explicitly inactive session-scoped deep-interview mode state as authoritative over an active root fallback, so auto-nudge is not suppressed by stale root state.
3. **Detached tmux launch shell drift fallback** — confirms detached tmux launch preserves the requested cwd when an unsupported `SHELL` value forces OMX to fall back away from rc-driven cwd drift.
4. **Team startup worker-state evidence** — accepts malformed external worker status inputs without breaking the hardening-e2e coverage, and accepts `blocked` worker status as real startup progress before a worker has persisted `current_task_id`.

Covered files:

- `src/hooks/__tests__/keyword-detector.test.ts`
- `src/scripts/__tests__/codex-native-hook.test.ts`
- `src/cli/__tests__/launch-fallback.test.ts`
- `src/team/__tests__/runtime.test.ts`

Verification target:

- `npm run build`
- `node --test dist/hooks/__tests__/keyword-detector.test.js dist/scripts/__tests__/codex-native-hook.test.js dist/cli/__tests__/launch-fallback.test.js dist/team/__tests__/runtime.test.js dist/team/__tests__/hardening-e2e.test.js`
- `npm run test:recent-bug-regressions:compiled`
