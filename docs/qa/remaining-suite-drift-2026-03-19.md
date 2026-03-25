# Remaining Suite Drift Snapshot - 2026-03-19

Date: **2026-03-19**  
Baseline commit: **`8106d67`**  
Execution surface: active OMX team worker pane (`worker-3`) with local verification run from repository root after clearing `OMX_TEAM_*` env vars.

## Scope

This note captures the remaining local full-suite drift observed after the earlier Rust + TypeScript migration cleanup work. It is intentionally documentation-only for the current worker task.

## Fresh verification summary

Command sequence used from the repository root:

```bash
unset OMX_TEAM_STATE_ROOT OMX_TEAM_WORKER OMX_TEAM_LEADER_CWD
npm run build
npm run lint
npm test
node --test dist/cli/__tests__/exec.test.js
node --test dist/hooks/__tests__/codebase-map.test.js
```

Observed status:

- `npm run build` → **PASS**
- `npm run lint` → **PASS**
- `npm test` → **FAIL** (`2590` pass / `2` fail)
- `node --test dist/cli/__tests__/exec.test.js` → **FAIL** (`1` failing test)
- `node --test dist/hooks/__tests__/codebase-map.test.js` → **FAIL** (`1` failing test)

## Exact remaining failing buckets

### 1. `dist/cli/__tests__/exec.test.js`

Failing test:

- `runs codex exec with session-scoped instructions that preserve AGENTS and overlay content`

Observed mismatch:

- expected `instructions-path: .../.omx/state/sessions/omx-*/AGENTS.md`
- actual `instructions-path: .../.omx/team/continue-from-clean-commit-810/worktrees/worker-3/AGENTS.md`

Interpretation:

- The test expects the `omx exec` path to always use a generated session-scoped overlay file.
- Inside the active team worker pane, the invocation instead surfaces the worker worktree `AGENTS.md` path.
- This looks like a **test/contract expectation drift for worker-session execution context**, not evidence of a new product regression in the main clean-commit lane.

Evidence excerpt:

```text
expected: /instructions-path:.*\/\.omx\/state\/sessions\/omx-.*\/AGENTS\.md/
actual: fake-codex:exec --model gpt-5 say hi -c model_instructions_file="/home/.../.omx/team/continue-from-clean-commit-810/worktrees/worker-3/AGENTS.md"
```

### 2. `dist/hooks/__tests__/codebase-map.test.js`

Failing test:

- `includes non-src top-level directories`

Observed mismatch:

- the test creates `scripts/notify-hook.js`
- the helper then runs `git add dist/scripts/notify-hook.js`
- `git add` exits with status `128` before the assertion runs

Interpretation:

- This is a **stale test fixture path**.
- The fixture setup and the tracked-path argument do not match, so the test fails before it can validate `generateCodebaseMap()` behavior.

Evidence excerpt:

```text
✖ includes non-src top-level directories
Error: Command failed: git add dist/scripts/notify-hook.js
status: 128
```

## Classification

These two failures are the only remaining buckets seen in the fresh local suite run recorded for this task:

1. **worker-context contract drift** in `exec.test`
2. **stale fixture path drift** in `codebase-map.test`

No additional failure buckets were observed in the same `npm test` run.

## Changed files

- `docs/qa/remaining-suite-drift-2026-03-19.md` — captured the remaining failure buckets, reproduction commands, and verification evidence from the clean-commit rerun.

## Notes

- No runtime or product source files were changed for this documentation pass.
- The full-suite evidence for this snapshot is stored in `.omx/context/task-3-npm-test-20260319.log`.
- Focused repro logs were stored in:
  - `.omx/context/task-3-exec-test.log`
  - `.omx/context/task-3-codebase-map-test.log`
