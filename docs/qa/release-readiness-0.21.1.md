# Release readiness — 0.21.1

## Release identity

- Release: `0.21.1` (patch).
- Date: 2026-08-31.
- Previous tag: `v0.21.0` (`3ad79a8a6fe6e95fdbb8c00e40716fffe4011ce2`).
- Frozen dev base: `abf2393af1e1f9355adfe43166432462a86d2e54`.
- Exact range: `v0.21.0..abf2393af1e1f9355adfe43166432462a86d2e54`.
- Range size: 125 commits, 116 changed files (+23,996/−1,141), 28 commit-subject references plus linked issues #3587/#3589 (30 tracked references).
- Backlog at freeze: 0 open PRs, 0 open issues.
- Owner authorization: direct `ㄱ` in the OmX release-candidate thread, reaffirmed on 2026-08-31.

## Version carriers

- `package.json` → `0.21.1`
- `package-lock.json` root and package entry → `0.21.1`
- `Cargo.toml` workspace package → `0.21.1`
- `plugins/oh-my-codex/.codex-plugin/plugin.json` → `0.21.1`
- Workspace crates remain `version.workspace = true`.

## Required gates

| Gate | Evidence | Status |
|---|---|---|
| Ancestry | `git merge-base --is-ancestor v0.21.0 abf2393a` | Pending recorded run |
| Inventory | `artifacts/release-0.21.1/inventory.md` | Prepared |
| Version sync | `GITHUB_REF_NAME=v0.21.1 node dist/scripts/check-version-sync.js` | Pending validation |
| Build/static/generated | build, no-unused, lint, native/plugin/capability/prompt parity | Pending validation |
| Full tests | `npm test` under supported Node | Pending validation |
| Package smoke | `npm pack --dry-run` and packed install smoke | Pending validation |
| Main promotion | one release PR targeting `main`; merge-commit strategy required; the exact release PR head (resolved live immediately before merge) and frozen dev `abf2393a` must both be ancestors of merged main | Pending |
| Tag/publish | annotated `v0.21.1`; tag-triggered GitHub Release/assets; exact tag/SHA-bound `CI` workflow dispatch for OIDC npm trusted publishing | Pending |
| External verification | GitHub Release assets and npm `oh-my-codex@0.21.1` | Pending |

## Publish contract

The release PR must be merged with a two-parent merge commit, never squash or rebase, so the frozen dev history and its contributors remain reachable from the release tag. Immediately before merge, fetch the exact remote ref with `git fetch origin +refs/heads/release/0.21.1:refs/remotes/origin/release/0.21.1`, then resolve `RELEASE_HEAD=$(git rev-parse refs/remotes/origin/release/0.21.1)` and record it in the signed merge evidence. Before tagging, require both `git merge-base --is-ancestor "$RELEASE_HEAD" <merged-main>` and `git merge-base --is-ancestor abf2393a <merged-main>` to pass. The annotated tag is created only after that exact main commit is green. The tag-triggered `.github/workflows/release.yml` publishes and verifies GitHub Release/native assets. npm publication uses the current `.github/workflows/ci.yml` `publish-npm-trusted` job via an explicit `workflow_dispatch` bound to both immutable `release_tag=v0.21.1` and the exact peeled 40-character main SHA. This is the repository's OIDC trusted-publishing path; no npm token or retired standalone Manual npm publish workflow is used.
