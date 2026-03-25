# QA Execution Report — v0.4.2

Date: 2026-02-18

## Team Execution

- Team run executed via `$team`.
- Initial stale workers were detected and cleaned (`%1749`, `%1750` panes removed).
- QA team completed with all tasks terminal (`completed=3, failed=0`) and was shut down cleanly.

## Parity Validation (deployed `main` vs `dev`)

Commands:

```bash
git rev-list --left-right --count origin/main...dev
git rev-list --left-right --count --no-merges origin/main...dev
git log --oneline --no-merges dev..origin/main
```

Result:
- Merge-aware divergence: `6 18`
- Non-merge divergence: `0 15`
- No non-merge commits on `main` missing from `dev`.

## Automated QA

Command executed:

```bash
npm test
```

Result:
- PASS — `664` tests passed, `0` failed.

Notes:
- `npm run test:run` is referenced in the QA plan but is not a script in current `package.json`.

## Release-Metadata Checks

- `package.json` version: `0.4.2`
- `package-lock.json` version: `0.4.2`
- `CHANGELOG.md` contains `## [0.4.2] - 2026-02-18`

## Manual QA Checklist (A–E)

- A/B/C/E require interactive runtime validation and were only partially validated through automated tests + code-path checks in this execution.
- D (config migration) covered by automated tests (`generator-notify` + config generator suite) and passed.

## Overall

- Automated quality gate: **PASS**
- Parity validation gate: **PASS**
- Manual interactive gate: **PARTIAL (requires explicit interactive pass if required before release)**
