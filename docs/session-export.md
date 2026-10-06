# Session export

`omx session export` turns a local Codex rollout into a Markdown conversation or
a structured JSON document, without starting Codex or changing session state.

```bash
omx session search "the deployment discussion" --json
omx session export <session-id> --output conversation.md
omx session export <session-id> --format json --include-tools --output conversation.json
omx session export <unique-prefix> --codex-home /path/to/codex-home
```

## Selecting a transcript

Export searches `sessions/` and `archived_sessions/` under the default Codex home
and the associated project runtime homes also used by session search. An explicit
`--codex-home` restricts discovery to that directory. Session search currently
searches active transcripts; an archived session can be exported using its known ID.

The selector is case-sensitive and matches the ID in the transcript's
`session_meta` record. An exact ID takes precedence over longer prefix matches.
If a prefix matches several sessions, or the same ID exists in several
transcripts, export reports an ambiguity instead of choosing a transcript.
Use the full ID and `--codex-home` to narrow the selection. Missing or unreadable
session metadata cannot establish an ID and is not exported by a filename guess.

## Exported content

- User and assistant `response_item` messages retain their text and order.
  System/developer messages, analysis-channel messages, and reasoning records
  are excluded. Images and audio are represented by placeholders; embedded
  binary data is not copied.
- Codex can record both event messages and response messages for a turn. Export
  uses response messages when present, and uses `user_message` / `agent_message`
  events for transcripts containing no exportable response messages. Repeated
  messages at distinct transcript locations remain distinct.
- `--include-tools` adds function/custom-tool calls and outputs in transcript
  order, including their names and call IDs when available. These records contain
  the stored arguments and outputs, without redaction.
- Blank lines are ignored. Malformed JSON records, including an incomplete final
  record in a running session, are skipped and counted in `skipped_records`.
  Exports of an active session include the records read during that invocation.

Markdown includes session metadata and separate message/tool sections. Tool data
is fenced so backticks in tool output do not close its code block. JSON has
`schema_version: 1`, `session_id`, `started_at`, `cwd`, `archived`,
`skipped_records`, and an ordered `entries` array. Entries include `kind`,
`timestamp`, `line_number`, and `text`, plus `role` for messages or `name` and
`call_id` for tools. Missing metadata values are `null`.

## Output

Markdown is the default; pass `--format json` to select JSON. Without `--output`,
stdout contains only the export, so it can be piped to another command. With
`--output`, the file is created exclusively and confirmation goes to stderr.
The parent directory must exist; existing files and symlinks are not overwritten.
New files request owner-only permissions on platforms supporting Unix modes.

The export contains conversation text and project metadata, not a redacted
support report. `omx session friction` provides the existing metadata-only view
when that is the desired output.
