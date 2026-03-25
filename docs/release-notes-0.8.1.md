# oh-my-codex v0.8.1

Released: **2026-03-05**

This is a **stability + usability** release focused on team orchestration reliability, notification setup simplicity, and safer OpenClaw operations.

---

## TL;DR

If you use `$team`/`omx team` heavily, this release makes the runtime more consistent by standardizing around **CLI-first interop**.

If you are setting up notifications, onboarding is now cleaner through a **unified `configure-notifications` flow**.

If you use OpenClaw integrations, timeout handling now has **safe configurable bounds**.

---

## What changed

### 1) Team runtime: CLI-first interop is now the default direction

- Added and finalized team API interop through:
  - `omx team api ...`
- Legacy `team_*` MCP tools are now treated as deprecated paths in favor of the CLI-first contract.

**Why this matters:**
- More predictable behavior across team orchestration flows
- Cleaner compatibility surface for worker/leader interactions
- Better long-term maintainability around team runtime contracts

### 2) Notifications: setup is now unified

- Notification setup guidance has been refactored into a single workflow:
  - `configure-notifications`

**Why this matters:**
- Fewer fragmented setup paths
- Easier onboarding for new users
- Lower chance of config drift between notification providers

### 3) OpenClaw safety + operability improvements

- OpenClaw command timeout is now configurable with bounded safety limits.
- Documentation was expanded with stronger token/command safety guidance and a practical dev runbook.

**Why this matters:**
- Safer operation in automation-heavy environments
- Better operational clarity for development and incident follow-up

---

## Compatibility / migration notes

- If you previously relied on legacy `team_*` MCP workflows, migrate to:
  - `omx team api <operation> ...`
- For notification setup, prefer:
  - `omx configure-notifications` (or skill equivalent)

No breaking package-level API changes were introduced in this patch release.

---

## Verification summary

All release gates passed before publish:

- ✅ `npm run build`
- ✅ `npm test` (`1908` pass / `0` fail)
- ✅ `npm run check:no-unused`
- ✅ CLI smoke checks (`--help`, `version`, `status`, `doctor`, `setup --dry-run`, `cancel`)

---

## Scope and commit window

Release scope was prepared from non-merge commits in:
- `4141fd6..HEAD`

Snapshot at preparation time:
- **11 non-merge commits** (2026-03-04 to 2026-03-05)
- **51 files changed** (`+5,454 / -2,420`)

Key commits included:

- `6a318b2` feat(team): add CLI interop API and hard-deprecate team_* MCP tools
- `c0c5d82` feat(team): finalize CLI-first team interop and dispatch reliability
- `2d3b14f` refactor: notifications setup into unified configure-notifications flow
- `0ccea70` fix(openclaw): make command timeout configurable with safe bounds

---

Thanks for using **oh-my-codex**. If anything regresses, please open an issue with repro steps and logs.
