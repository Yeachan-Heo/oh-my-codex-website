# Release notes — 0.12.0

## Summary

`0.12.0` is a minor release after `0.11.13` because the shipped delta is broad and user-visible across native Codex hook behavior, team/runtime delivery, Windows/tmux supervision, and workflow documentation.

## Included fixes and changes

- native Codex hook ownership now lives in the repo/runtime contract for non-team OMX sessions
- first-party Bash `PreToolUse` / `PostToolUse` guidance is shipped and documented
- team runtime delivery, mailbox handling, pane-status visibility, and next-action steering are more robust
- leader nudge, reminder, session continuity, and persist-error paths are hardened across live operator flows
- Windows/tmux launch reliability and command resolution are improved
- prompt / AGENTS defaults now emphasize quality-first, evidence-backed execution
- translated README/docs collateral is expanded and reorganized under `docs/readme/`
- release metadata and collateral are aligned to `0.12.0`

## Why this is a minor release

- the release train since `v0.11.13` spans `185` changed files, `65` non-merge commits, and `26` merge commits
- it introduces new first-party native hook behavior rather than only patch-level correctness fixes
- it meaningfully changes operator-facing docs/guidance and release/runtime ergonomics

## Verification evidence

### Release-focused verification suite

- `npm ci` ✅
- `npm run build` ✅
- `node dist/cli/omx.js version` ✅ (`oh-my-codex v0.12.0`)
- `node --test dist/cli/__tests__/version-sync-contract.test.js` ✅
- `npm run lint` ✅
- `npm test` ✅
- `cargo test -p omx-runtime-core` ✅
- `npm run smoke:packed-install` ✅
- `git diff --check origin/main...HEAD` ✅

## Remaining risk

- This is still a local release-readiness pass, not a full GitHub Actions matrix rerun.
- The release touches native hooks, notify/runtime flows, and team orchestration together, so post-release monitoring should pay extra attention to setup refresh, stop-state continuity, and team delivery behavior.
