# oh-my-codex 0.21.29

`0.21.29` is a patch release for Team dispatch state recovery and Codex startup UI protection (1 commit, 16 files, +616/−68; PR #3876).

Versioning continues the 0.21.x patch train. This release fixes critical regressions in Team event delivery recovery and prevents inbox/notification messages from being injected into Codex startup or folder-trust UI prompts.

## Highlights

- **Team dispatch state recovery and startup UI protection (#3876):** This release fixes three related regressions that can occur under dispatch retry and multiple-message scenarios:
  - **Dispatch retry correctness:** A runtime dispatch event can commit before its JSON projection is published. Retrying against an empty, missing, or stale projection can duplicate a request, coalesce into an already delivered request, or leave requests behind during worker retirement. The fix ensures dispatch retries use consistent, durable projections.
  - **Mailbox wake handling:** Multiple mailbox messages can share one wake condition. Acknowledging the wake's original message before other messages are delivered can leave the wake active after the mailbox is fully delivered, preventing further message processing. The fix ensures wake acknowledgment only after all messages from that wake are complete.
  - **Damaged mailbox recovery:** A damaged or unreadable per-worker mailbox was previously treated as empty, allowing a later send to recreate it with inconsistent state. The fix treats damaged mailboxes as undeliverable, preventing silent message loss and worker proliferation.
  - **Codex startup UI safety:** Inbox/notification text can be injected into Codex startup or folder-trust screens, disrupting the initial prompt. The fix prevents notification payload from being rendered during Codex startup and folder-trust UI phases.
  - **Readiness record accuracy:** The Codex startup screen and folder-trust screen are no longer misidentified as a ready prompt, improving diagnostics and state tracking.

## Compatibility

- No breaking API changes; all fixes are internal recovery and UI isolation improvements.
- Existing sessions and dispatch workflows remain unaffected; recovery is transparent.
- Codex startup and folder-trust workflows are now more robust against concurrent notifications.

## Known gaps

- Codex review on this release was not completed due to usage limit constraints (quota reached at 06:09Z and 06:55Z on 2026-10-22). The dispatch and UI safety fixes were validated by code review and the green CI gate. See release-readiness documentation for details.

## Validation evidence

The pinned candidate `71029cdfc80946da1e0b6770d47e31aae38cf5ab` (pinned dev HEAD before version bump) passed latest-per-name pinned-dev CI: 17 checks succeeded with 8 conditional checks skipped, and no failures (run #39737386059, concluded at 07:19Z).

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3876](https://github.com/Yeachan-Heo/oh-my-codex/pull/3876) | @shenyankm | fix(team): recover dispatch state and guard startup input |

## Contributors

Thanks to @shenyankm for the Team dispatch recovery and Codex startup safety fixes.

**Full Changelog**: [`v0.21.28...v0.21.29`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.28...v0.21.29)
