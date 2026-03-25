# `omx autoresearch` parity contract

`omx autoresearch` is a thin supervisor that drives one Codex experiment session per iteration while OMX owns the durable keep/discard/reset loop.

## CLI

```bash
omx autoresearch <mission-dir> [codex-args...]
omx autoresearch --resume <run-id> [codex-args...]
omx autoresearch --help
```

- Fresh launch always creates a new run-tagged lane.
- `--resume <run-id>` loads `.omx/logs/autoresearch/<run-id>/manifest.json`.
- A second launch is rejected while repo-root `.omx/state/autoresearch-state.json` points at an active run.

## Mission / sandbox contract

`<mission-dir>` must be inside a git repo and contain `mission.md` plus `sandbox.md`.

`sandbox.md` YAML frontmatter must define:
- `evaluator.command`
- `evaluator.format: json`
- optional `evaluator.keep_policy: score_improvement | pass_only`

Evaluator stdout must be JSON with required boolean `pass` and optional numeric `score`.

## Runtime model

Fresh launch creates:
- branch `autoresearch/<mission-slug>/<run-tag>`
- worktree `<repo>.omx-worktrees/autoresearch-<mission-slug>-<run-tag>`
- repo-root run artifacts under `.omx/logs/autoresearch/<run-id>/`

Repo-root state responsibilities:
- `.omx/state/autoresearch-state.json` = active-run pointer/lock only
- `.omx/logs/autoresearch/<run-id>/manifest.json` = authoritative per-run state
- `.omx/logs/autoresearch/<run-id>/candidate.json` = candidate handoff from the just-finished Codex session
- `.omx/logs/autoresearch/<run-id>/iteration-ledger.json` = durable iteration history
- `.omx/logs/autoresearch/<run-id>/latest-evaluator-result.json` = latest evaluator output

Worktree-local state responsibilities:
- `results.tsv`
- optional evaluator logs such as `run.log`
- these runtime-generated files must be excluded via worktree-local `.git/info/exclude`

## Candidate artifact

The launched session must write repo-root `candidate.json` with:
- `status`: `candidate | noop | abort | interrupted`
- `candidate_commit`: string or `null`
- `base_commit`: string
- `description`: string
- `notes`: string[]
- `created_at`: ISO timestamp

Integrity rules:
- `status=candidate` requires a non-null `candidate_commit`
- `candidate_commit` must resolve in git and match the worktree `HEAD` commit on exit
- `base_commit` must resolve in git and match the supervisor-provided `last_kept_commit`

Supervisor behavior:
- `candidate` → run evaluator, classify keep/discard/ambiguous/error, update manifest/ledger/results, reset if discarded
- `noop` → log noop iteration and continue by default
- `abort` → stop run without reset
- `interrupted` → if dirty, stop for operator intervention; if clean, log interrupted/noop style outcome

## Decision policy

- Baseline row is always recorded.
- `pass=false` => discard.
- evaluator error/crash => discard.
- `keep_policy=score_improvement` => keep only when `pass=true` and score improves over last kept score; pass without comparable score is `ambiguous` and discarded.
- `keep_policy=pass_only` => any `pass=true` candidate is kept.
- Discard / ambiguous / error paths must reset to the last kept commit.

## Resume

`--resume <run-id>` must fail with actionable errors when:
- manifest is missing
- referenced worktree is missing
- worktree is dirty outside allowlisted runtime artifacts
- manifest is terminal

Successful resume continues from the last kept commit and existing results history.

## Iteration handoff context

Each launched worker session receives a supervisor-written instruction snapshot including:
- current iteration number
- baseline commit
- last kept commit
- last kept score when known
- previous iteration outcome
- bounded recent ledger summary
- keep policy

## Verification targets

Parity-aligned implementation should prove:
1. fresh launches create distinct run-tagged lanes
2. repo-root active-run lock rejects concurrent launches
3. candidate handoff artifact drives keep/discard/reset decisions
4. discarded candidates reset to `last_kept_commit`
5. `--resume <run-id>` reloads authoritative manifest/worktree state
6. README/help/contracts describe the thin-supervisor parity loop
