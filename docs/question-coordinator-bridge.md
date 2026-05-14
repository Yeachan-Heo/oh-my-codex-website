# Question coordinator bridge

OMX structured questions are an OMX-owned blocking workflow surface. Coordinator
bridges such as Hermes may render those questions in an operator UI, then submit
a bounded structured answer by `question_id`.

## Event flow

1. A workflow creates a question record under `.omx/state/.../questions/`.
2. OMX appends a `question-created` JSONL event to
   `.omx/state/question-events.jsonl`.
3. A coordinator reads the event or uses the Hermes MCP question tools to render
   the prompt, options, source, session/run correlation, and timeout/state
   metadata.
4. The operator answers in the coordinator UI.
5. The coordinator calls the bounded answer submission tool with:
   - `question_id`
   - `session_id` when the question is session-scoped
   - one structured `answer` or an `answers[]` batch
   - explicit mutation opt-in
6. OMX validates that the id exists and is still `pending` or `prompting`,
   persists the answer, emits `question-answered`, and the waiting workflow
   resumes from the record state. When the question record includes a validated
   renderer `return_target`, OMX also sends the same bounded answer notice back
   to that tmux pane so the leader session is visibly resumed.

Terminal state or runtime failures emit `question-error` with a clear code and
message.

## Safety contract

- Unknown ids fail with `question_unknown`.
- Already answered, aborted, or errored records fail with `question_not_open`.
- Malformed answer payloads fail with `question_invalid_answer`.
- Coordinators receive structured prompt and option schema, not terminal
  scrollback.
- Coordinators submit structured answers to the question record, not arbitrary
  terminal stdin.
- Return-pane resume injection is record-authorized only: it uses persisted
  renderer metadata from OMX-created question records, not coordinator-supplied
  terminal targets.

## Non-goal

This bridge is not a remote terminal editor, shell relay, arbitrary stdin proxy,
or tmux scraping surface. It exists only for structured operator Q&A correlation
and the bounded OMX-owned return-pane resume notice while preserving OMX context
isolation.
