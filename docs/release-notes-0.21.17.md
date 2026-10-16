# oh-my-codex 0.21.17

`0.21.17` is a patch release for the frozen range `v0.21.16..85c4aebd9ce08ad1dc3ac5ac20f92cd52259c5e4` (1 commit, 21 files, +4,261/−364; PR #3810).

Versioning continues the 0.21.x patch train. This release isolates mailbox delivery scope by team to prevent cross-team message interference in multi-team sessions.

## Highlights

- **Team-scoped mailbox delivery (#3810):** isolate mailbox messages and recovery by team, preventing cross-team mailbox interference in multi-team sessions and preserving message identity across recovery (#3810, authored by @Yeachan-Heo).

## Compatibility

- Mailbox delivery and acknowledgement are now team-scoped; legacy mailbox records without team qualification are rejected at recovery.
- Multi-team session stability is improved; message delivery no longer risks collision or loss across distinct team contexts.

## Validation evidence

- Frozen candidate `85c4aebd9ce08ad1dc3ac5ac20f92cd52259c5e4` will be validated by CI and local verification before release.
- Release follows the standard v0.21.x test, lint, and integration gates.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3810](https://github.com/Yeachan-Heo/oh-my-codex/pull/3810) | @Yeachan-Heo | fix(team): isolate mailbox messages by team |

## Contributors

Thanks to @Yeachan-Heo for implementation and release integration.

**Full Changelog**: [`v0.21.16...v0.21.17`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.16...v0.21.17)
