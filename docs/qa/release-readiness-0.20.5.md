# Release readiness — 0.20.5

## Release identity

- Release: `0.20.5` (patch; no intentional breaking contract).
- Date: 2026-08-10.
- Previous tag: `v0.20.4` (`a62d5bd77bef6d2bc7df467dcae68082b8616239`).
- Frozen dev base: `13c08f84cb6c27750b8f5c4a4d5105faad074196`.
- Exact compare range: `v0.20.4..13c08f84cb6c27750b8f5c4a4d5105faad074196`.
- Range size: 68 commits and 35 merged PRs.
- Merge base: `229d5dc4fd82aa87e274ddf22dbe197987f2778e`.
- Compatibility: no intentional breaking CLI or package-layout changes.

## Boundary note

`v0.20.4` is not an ancestor of the frozen `dev` base; both descend from `229d5dc4fd82aa87e274ddf22dbe197987f2778e`. The owner explicitly froze the compare expression above. The promotion lane must reconcile the release-tag/main ancestry before tagging `v0.20.5`; this lane does not merge main or create tags.

## Required gates

| Gate | Evidence | Status |
|---|---|---|
| Version carriers | `package.json`, `package-lock.json`, `Cargo.toml`, `Cargo.lock`, and `plugins/oh-my-codex/.codex-plugin/plugin.json` are `0.20.5`; `cargo check --workspace` built all six workspace packages as `0.20.5`. | Passed locally |
| Version sync | `node dist/scripts/check-version-sync.js --tag v0.20.5` reported `OK package=0.20.5 workspace=0.20.5 tag=v0.20.5`. | Passed locally |
| Build | `npm ci`; `npm run build`. | Passed locally |
| Static check | `npm run check:no-unused`; `npm run lint` (793 files, no fixes). | Passed locally |
| Bundle/catalog | Native-agent verification (22 agents, 37 prompt assets), plugin mirror verification (29 skill directories), and catalog check. | Passed locally |
| Release body | `RELEASE_BODY.md` has the required Contributors section and compare line. The generator correctly refused because `v0.20.5` does not exist and `v0.20.4` is not an ancestor of the candidate; generation must run after ancestry reconciliation and tag creation in the promotion lane. | Blocked by recorded ancestry boundary |
| Package dry run | `npm pack --dry-run` completed for `oh-my-codex@0.20.5`, including prepack bundle checks. | Passed locally |
| Focused high-risk tests | Launch fallback/session, Ralplan, setup install mode, Team/tmux, real tmux source-authority, and plugin layout: 291 tests passed, 0 failed. | Passed locally |
| Diff hygiene | `git diff --check`. | Passed locally |
| Adversarial review | Carrier values, 68-commit/35-PR counts, dependency claims, contributor sentence, no-publication language, and compare links checked; only the explicit ancestry/generator boundary remains. | Passed with recorded boundary |
| CI / tag / npm | Promotion-lane responsibility; no publication is claimed here. | Pending external gates |

## Known gaps

- Broad cross-platform and native-build matrices are CI-authoritative.
- No tag, GitHub Release, main merge, or npm publication is performed or claimed by this release-preparation lane.

## Publish boundary

After this PR is green on `dev`, the owner-authorized promotion lane must reconcile ancestry, promote to `main`, wait for green CI, tag `v0.20.5`, verify release assets and npm, and record external evidence here.
