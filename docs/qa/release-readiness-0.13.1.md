# Release Readiness Verdict - 0.13.1

Date: **2026-04-16**
Target version: **0.13.1**
Comparison base: **`v0.13.0..origin/dev`**
Verdict: **GO** ✅

`0.13.1` is a narrow hotfix release for the detached tmux stdin startup regression introduced in `0.13.0`.

## Scope reviewed

### Detached startup regression
- `src/cli/index.ts` — detached leader wrapper startup path
- `src/cli/__tests__/index.test.ts` — detached leader stdin-preservation regression coverage

### Release collateral
- `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`
- `CHANGELOG.md`, `RELEASE_BODY.md`
- `docs/release-notes-0.13.1.md`

## Validation evidence

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS |
| Targeted lint | `npx biome lint src/cli/index.ts src/cli/__tests__/index.test.ts` | PASS |
| Targeted regression tests | `node --test dist/cli/__tests__/index.test.js dist/cli/__tests__/launch-fallback.test.js` | PASS |

## Risk assessment

- The code diff is intentionally narrow and localized to the detached leader wrapper plus focused tests.
- This is a release-critical startup fix; broader matrix validation is delegated to the release workflow triggered by the tag.

## Final verdict

Release **0.13.1** is **ready for release commit/tag cut from `origin/dev`** on the basis of the passing targeted hotfix validation above.
