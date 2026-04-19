# Research Specialist Eval Surface - 2026-04-18

Date: **2026-04-18**
Scope: issue **#1712** — sharper boundary and handoff regression coverage for `researcher`, `dependency-expert`, and `explore`

## What this verification surface guarantees

- representative routing fixtures exist for:
  - `explore`
  - `researcher`
  - `dependency-expert`
  - mixed `explore + researcher`
  - mixed `explore + dependency-expert`
- role output-contract checks assert:
  - `researcher` keeps source URLs, official-doc preference, and version-note language
  - `researcher` stays on chosen-technology docs/behavior questions instead of silent dependency comparison
  - `dependency-expert` keeps candidate-comparison, maintenance/license/risk language
  - `dependency-expert` owns adopt / upgrade / replace / migrate decisions and hands chosen-tech docs questions back to `researcher`
  - `explore` stays local/read-only and returns absolute-path/relationship guidance
  - `explore` owns repo-local facts and hands external docs / dependency recommendations upward

## Current regression surfaces

| Surface | Files | Coverage |
|---|---|---|
| routing heuristics | `src/team/__tests__/role-router.test.ts` | direct role routing for local exploration, chosen-technology research, dependency evaluation, and mixed local-usage-plus-upgrade prompts |
| execution handoff staffing | `src/team/__tests__/followup-planner.test.ts` | mixed-lane staffing fixtures for `explore + researcher` and `explore + dependency-expert` |
| role output contracts | `src/hooks/__tests__/prompt-guidance-wave-two.test.ts` | prompt-level output-shape and boundary checks for the three specialist roles |

## Verification commands

- `npm run build`
- `node --test dist/team/__tests__/role-router.test.js dist/team/__tests__/followup-planner.test.js dist/hooks/__tests__/prompt-guidance-wave-two.test.js`

## Deliberate non-goals

- no new benchmark harness
- no live web-quality scoring
- no separate runtime/e2e infrastructure beyond existing test surfaces
