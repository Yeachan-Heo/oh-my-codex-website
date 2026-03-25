# QA Plan — v0.4.2 (dev vs deployed main)

Date: 2026-02-18  
Scope: validate delta between `origin/main` (deployed, `v0.4.1`) and current `dev`.

## 1) Parity Validation Summary

Run:

```bash
git fetch origin --prune
git rev-list --left-right --count origin/main...dev
git log --oneline origin/main..dev
git diff --name-status origin/main...dev
```

Expected at time of writing:
- `origin/main` is deployed at `v0.4.1`.
- `dev` is ahead with feature/fix/test commits (auto-nudge improvements, all-workers-idle leader notification, tmux input/scrolling fixes, and coverage expansion).
- No non-merge functional commits were found on `main` that are missing from `dev`.

## 2) Risk-Based Focus Areas

1. **Notify hook behavior**
   - Expanded stall phrase detection and new hot-zone detection logic.
   - All-workers-idle leader notification with cooldown/event logging.
2. **Tmux team UX/reliability**
   - Mouse scrolling enabled by default for team sessions.
   - `sendToWorker` timing changes around submit rounds.
3. **Config compatibility**
   - `collab` -> `multi_agent` migration in generated config + tests/docs.
4. **Lifecycle/process handling**
   - `bin/omx.js` now awaits `main(...)` and exits explicitly.

## 3) Automated QA

```bash
npm run test:run
```

Pass criteria:
- Full suite passes.
- New/updated suites specifically pass:
  - `src/hooks/__tests__/notify-hook-all-workers-idle.test.ts`
  - `src/hooks/__tests__/notify-hook-auto-nudge.test.ts`
  - `src/team/__tests__/tmux-session.test.ts`
  - `src/config/__tests__/generator-notify.test.ts`
  - newly added extensibility/HUD/utils/verifier test files

## 4) Manual QA Checklist

### A. All workers idle notification
- Start a team session with >=2 workers.
- Let all workers transition to `idle` or `done`.
- Verify leader receives one idle-summary prompt.
- Re-trigger within cooldown window: verify no duplicate notification spam.
- Verify event/log entries are emitted.

### B. Auto-nudge pattern detection
- Feed outputs containing new phrases (e.g., "say go", "next I can", "keep driving").
- Verify stall detection triggers in the last-lines hot zone.
- Verify unrelated text does not false-trigger.

### C. Tmux input reliability + mouse scrolling
- In team mode, verify mouse wheel scrolls pane history.
- Confirm arrow keys still work for CLI input history.
- Send repeated worker prompts and verify submission consistency.
- Set `OMX_TEAM_MOUSE=0`, restart session, verify mouse mode is not forcibly enabled.

### D. Config generator migration
- Run setup/generator path on fresh and existing configs.
- Verify `[features]` includes `multi_agent = true` and `child_agents_md = true`.
- Verify deprecated `collab` key is not reintroduced.

### E. `/exit` process termination
- Launch `omx` and invoke `/exit`.
- Verify process exits cleanly without hanging.

## 5) Release Gate

Release is approved only if:
- [ ] Automated tests pass.
- [ ] Manual checklist A–E passes.
- [ ] Changelog entry matches shipped behavior.
- [ ] Version is bumped consistently (`package.json`, `package-lock.json`).
