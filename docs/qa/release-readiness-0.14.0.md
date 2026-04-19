# Release Readiness Verdict - 0.14.0

Date: **2026-04-19**
Target version: **0.14.0**
Comparison base: **`v0.13.2..origin/dev`**
Verdict: **GO** ✅

`0.14.0` packages the current `dev` release train as a minor release: the new `omx question` interactive entrypoint, deep-interview question-obligation enforcement, skill-first validator-gated autoresearch, advisory triage routing, explicit runtime run outcomes, specialist-routing cleanup, and release-gating hardening for the shipped package.

## Scope reviewed

### Interactive question flow
- `src/cli/question.ts`, `src/question/*`, `src/cli/index.ts` — question CLI contract, policy, renderer/UI behavior, and help surface
- `skills/deep-interview/SKILL.md`, `src/question/deep-interview.ts` — deep-interview obligation creation and completion semantics

### Autoresearch and Stop gating
- `src/cli/autoresearch.ts`, `src/autoresearch/skill-validation.ts` — hard deprecation and validator completion requirements
- `src/scripts/codex-native-hook.ts` — Stop blocking for deep-interview/autoresearch pending work

### Prompt routing and runtime semantics
- `src/hooks/triage-heuristic.ts`, `src/hooks/triage-state.ts` — advisory triage classifier and persistence
- `src/runtime/run-outcome.ts`, `src/runtime/run-loop.ts` — terminal/non-terminal outcome normalization
- `src/team/role-router.ts` — specialist-routing ownership boundaries

### Release collateral / packaging
- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`
- `CHANGELOG.md`, `RELEASE_BODY.md`, `docs/release-notes-0.14.0.md`
- lint release gate and packaged-install/publish-path checks

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Lint | `npm run lint` | PASS |
| TypeScript diagnostics | `npx tsc --noEmit --pretty false --project tsconfig.json` | PASS |
| Affected interactive/runtime suites | `node --test dist/cli/__tests__/question.test.js dist/question/__tests__/deep-interview.test.js dist/question/__tests__/renderer.test.js dist/question/__tests__/ui.test.js dist/cli/__tests__/autoresearch-guided.test.js dist/autoresearch/__tests__/skill-validation.test.js dist/hooks/__tests__/keyword-detector.test.js dist/hooks/__tests__/triage-heuristic.test.js dist/hooks/__tests__/triage-state.test.js dist/runtime/__tests__/run-outcome.test.js dist/runtime/__tests__/run-loop.test.js dist/scripts/__tests__/codex-native-hook.test.js dist/team/__tests__/role-router.test.js dist/cli/__tests__/question-helpers.test.js dist/question/__tests__/policy.test.js` | PASS |
| Secondary affected coverage | `node --test dist/catalog/__tests__/schema.test.js dist/catalog/__tests__/generator.test.js dist/cli/__tests__/autoresearch.test.js dist/hooks/__tests__/analyze-routing-contract.test.js dist/hooks/__tests__/analyze-skill-contract.test.js dist/hooks/__tests__/notify-fallback-watcher.test.js dist/hooks/__tests__/notify-hook-auto-nudge.test.js dist/hooks/__tests__/notify-hook-cross-worktree.test.js dist/hooks/__tests__/notify-hook-managed-tmux.test.js dist/hooks/__tests__/notify-hook-ralph-resume.test.js dist/hooks/__tests__/notify-hook-tmux-heal.test.js dist/prompts/__tests__/guidance-contract.test.js dist/prompts/__tests__/orchestration-boundary-contract.test.js dist/prompts/__tests__/team-routing-contract.test.js` | PASS |
| Version sync contract | `node --test dist/cli/__tests__/version-sync-contract.test.js` | PASS |
| Catalog drift check | `node dist/scripts/generate-catalog-docs.js --check` | PASS |
| Packed-install smoke | `npm run smoke:packed-install` | PASS |
| Publish-path packaging | `npm pack --dry-run` | PASS |

## Risk assessment

- **Interactive UI/runtime behavior** changed materially; targeted tests are strong, but the highest-value follow-up observation remains real tmux and multi-session operator flows.
- **Lint gating** is now scoped to tracked source roots to avoid nested local Biome roots; this makes release proof reproducible, but broad repo hygiene still relies on CI and targeted checks for generated artifacts.
- **Autoresearch/deep-interview Stop semantics** are stricter and should be monitored after release for any operator surprise in long-running sessions.

## Final verdict

Release **0.14.0** is **ready for release commit/tag cut from `dev`** on the basis of the passing validation evidence above.
