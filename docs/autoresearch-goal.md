# Autoresearch Goal

`omx autoresearch-goal` is a durable goal-mode adapter for semantic research missions. It is intentionally separate from the hard-deprecated `omx autoresearch` direct launch command.

## Contract

- OMX writes durable artifacts under `.omx/goals/autoresearch/<slug>/`.
- The CLI does not mutate hidden Codex `/goal` state; it prints a handoff for the active Codex agent.
- The handoff instructs the agent to call `get_goal`, call `create_goal` only when no active goal exists, call `update_goal({status: "complete"})` only after the professor-critic pass and objective audit are true, then pass a fresh `get_goal` snapshot to `omx autoresearch-goal complete --codex-goal-json`.
- Completion requires a professor-critic `verdict=pass` artifact plus a fresh `get_goal` snapshot passed with `--codex-goal-json` so OMX can compare the objective and require Codex status `complete`.

## Commands

```sh
omx autoresearch-goal create --topic "Research migration risk" --rubric "Professor critic rubric" --critic-command "node scripts/critic.js"
omx autoresearch-goal handoff --slug research-migration-risk
omx autoresearch-goal verdict --slug research-migration-risk --verdict pass --evidence ".omx/specs/report.md approved by critic"
omx autoresearch-goal complete --slug research-migration-risk --codex-goal-json ./get-goal.json
```

## Artifacts

- `mission.json` — topic, rubric, status, paths, and optional critic command.
- `rubric.md` — semantic professor-critic rubric.
- `ledger.jsonl` — workflow and validation events.
- `completion.json` — latest pass/fail/blocked verdict and evidence.
