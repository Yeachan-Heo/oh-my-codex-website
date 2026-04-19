# Release notes — 0.14.0

## Summary

`0.14.0` is a minor release after `0.13.2` focused on interactive orchestration changes: `omx question` becomes the OMX-owned blocking-question surface, deep-interview now runs through structured question obligations, autoresearch becomes skill-first and validator-gated, advisory triage routing lands for non-keyword prompts, and runtime run outcomes are normalized so Stop/continuation behavior stays consistent.

## Highlights

- **`omx question` is now the interactive question surface** — agent-invoked user questions go through a structured OMX entrypoint with JSON input, UI rendering, persistent question state, and structured answers.
- **Deep-interview interactions are explicit and enforceable** — each interview round now creates/satisfies a question obligation instead of relying on plain-text fallback.
- **Autoresearch is stricter and safer** — direct `omx autoresearch` is hard-deprecated, and completion now requires validator evidence rather than best-effort progress alone.
- **Prompt routing has a lighter advisory lane** — PASS/LIGHT/HEAVY triage hints can steer non-keyword prompts without activating a workflow implicitly.
- **Release validation is reproducible again in dev workspaces** — lint now targets tracked source roots so nested local Biome roots under runtime/worktree dirs do not break release gating.

## Added

- `omx question` CLI support for structured question payloads, UI execution, state-path integration, and JSON output.
- Deep-interview question-obligation state transitions for create/satisfy/clear flows.
- Advisory triage heuristics and persisted follow-up suppression.

## Changed

- Deep-interview rounds now require `omx question` rather than fallback ad-hoc prompting.
- Autoresearch CLI entry is hard-deprecated in favor of `$deep-interview --autoresearch` and `$autoresearch`.
- Runtime run outcomes are normalized into shared terminal/non-terminal semantics.
- Specialist routing guidance and role-router ownership boundaries are tighter.
- `npm run lint` now runs `biome lint src bin`.

## Fixed

- Stop gating now respects pending interactive question obligations and incomplete autoresearch validation.
- Question renderer/injection lifecycle now runs through one owned question path.
- Release metadata and lockfiles are synchronized to `0.14.0`.

## Verification evidence

Release verification evidence is recorded in `docs/qa/release-readiness-0.14.0.md`.

- `npm run build` ✅
- `npm run lint` ✅
- `npx tsc --noEmit --pretty false --project tsconfig.json` ✅
- Affected interactive/runtime regression suites ✅
- `node --test dist/cli/__tests__/version-sync-contract.test.js` ✅
- `node dist/scripts/generate-catalog-docs.js --check` ✅
- `npm run smoke:packed-install` ✅
- `npm pack --dry-run` ✅

## Remaining risk

- This is still a local release-readiness pass rather than a full CI matrix rerun.
- Interactive tmux/UI behavior is well-covered by targeted tests, but real multi-session operator behavior remains the highest-value post-release observation surface.
