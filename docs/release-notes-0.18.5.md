# oh-my-codex 0.18.5

`0.18.5` is a patch release after `0.18.4` for the Ultragoal/HUD operator-experience fixes that landed on `dev`. It focuses on making durable Ultragoal completion safer and more visible: HUD summaries are more compact and less duplicative, pane convergence is more reliable, `omx question` preserves operator decisions, doctor warning copy is narrower, and final Ultragoal completion now requires independent review evidence.

## Highlights

- **Ultragoal completion requires stronger final review evidence** — final aggregate completion now requires independent code-reviewer and architect subagent evidence before the Codex goal can be marked complete.
- **Ultragoal HUD is easier to read during long runs** — summaries are compact, duplicate combined team/Ultragoal summaries are suppressed, and HUD output can show useful next-item context beyond the active item.
- **HUD pane convergence is more reliable** — Team/Ultragoal HUD panes no longer duplicate, and convergence still works when pane environment variables are missing.
- **Autopilot question handling preserves decisions** — `omx question`/deep-interview waiting keeps explicit user decisions intact while Autopilot intake is paused for operator input.
- **Doctor warning copy is narrower** — shared skill-root warnings are scoped to the ownership boundary that actually matters.
- **Codex goal storage gaps are clearer** — Ultragoal status reports unavailable Codex goal storage as recovery evidence rather than implying the durable plan is complete.

## Fixes / compatibility

- Existing Ultragoal aggregate plans continue to use the durable `.omx/ultragoal/goals.json` and `.omx/ultragoal/ledger.jsonl` audit trail.
- `omx explore` remains deprecated for new lookup guidance; this release keeps the post-`0.18.4` runtime contract intact.
- No separately closed GitHub issues were found for this release window; the scope is represented by the merged PR inventory.

## Merged PR inventory

#2531, #2532, #2535, #2539, #2544, #2545, #2546, #2549, #2553, #2554.

## Validation

Release readiness evidence is recorded in `docs/qa/release-readiness-0.18.5.md`.

Local gates completed before tagging:

- release workflow version-sync probe
- `npm run build`
- `npm run lint`
- `npm run check:no-unused`
- `npm run verify:native-agents`
- `npm run sync:plugin`
- `npm run verify:plugin-bundle`
- `node dist/scripts/generate-catalog-docs.js --check`
- `git diff --check`
- `npm pack --dry-run`

The GitHub release workflow remains the authoritative cross-platform native asset and npm publication gate after tag push.

## Contributors

Thanks to the contributors who landed the `v0.18.4...v0.18.5` delta:

- [@Yeachan-Heo](https://github.com/Yeachan-Heo) — #2531, #2532, #2535, #2539, #2544, #2546, #2549, #2553, #2554
- [@iqdoctor](https://github.com/iqdoctor) — #2545

**Full Changelog**: [`v0.18.4...v0.18.5`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.18.4...v0.18.5)
