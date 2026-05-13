# Release Readiness Verdict - 0.17.0

Target version: **0.17.0**

Compare link: [`v0.16.4...v0.17.0`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.4...v0.17.0)

## Verdict

**COMPLETE.** `0.17.0` shipped as the current public release. The release adds new user-visible workflow/integration surfaces: Hermes MCP, canonical `$design`, plugin-mode skill discovery, plugin MCP metadata, and adversarial UltraQA guidance. Local release-review patching resolved the reproducibility issue found in MCP/Hermes state-path tests, bounded-read issues in Hermes artifact tooling, and Hermes symlink-containment gaps in artifact listing/session-history tail reads. Post-publish website verification confirmed GitHub release publication and npm latest both point at `0.17.0`.

## Scope inventory

- Hermes MCP bridge and plugin MCP metadata.
- Canonical design workflow and catalog/skill mirror changes.
- Plugin-mode skill marketplace/cache verification.
- UltraQA adversarial workflow guidance and prompt-guidance contract coverage.
- Windows native hook PowerShell shim.
- Tmux continuation ownership checks.
- Startup shell rc fan-out avoidance and CLI-first authority docs.
- Ultragoal task-scoped aggregate reconciliation.
- Committed project memory loading at session start.
- Release-review test isolation for inherited OMX runtime env and macOS temp root canonicalization.

## Merged PR inventory

- #2267, #2268, #2270, #2272, #2274, #2276, #2283, #2293
- Direct dev commits: Hermes MCP bridge, canonical DESIGN workflow, CLI-first runtime authority docs, and release-review test isolation.

## Local gates

| Gate | Status |
| --- | --- |
| Previous tag ancestry | PASS — `git merge-base --is-ancestor v0.16.4 HEAD`. |
| Version metadata sync | PASS — package, lockfile, Cargo workspace/lockfile, plugin manifest, changelog, release body, release notes, and readiness collateral are aligned to `0.17.0`. |
| Initial build/lint/no-unused | PASS — `npm run build && npm run lint && npm run check:no-unused`. |
| Targeted MCP/Hermes state-path tests | PASS after release-review fixes — `node --test dist/mcp/__tests__/state-paths.test.js dist/mcp/__tests__/hermes-bridge.test.js`; includes inherited OMX env isolation, macOS canonical temp roots, bounded artifact reads, bounded session-history tail reads, symlinked artifact-root rejection, and symlinked session-history rejection. |
| Cargo tests | PASS — `cargo test`. |
| Final full release gate | PASS — `npm run build && npm run lint && npm run check:no-unused && node --test ... && cargo test && git diff --check`; targeted Node release suite passed 467 tests and Rust test suites passed. |
| `$code-review` final verdict | PASS — final re-review returned APPROVE and architecture returned CLEAR after Hermes symlink-containment fixes. |
| Release body generation | PASS locally with temporary local `v0.17.0` tag for compare validation — `/tmp/RELEASE_BODY.v0.17.0.generated.md`, sha256 `e1fdf5bd7961ee7d1370046114301f2939007828d91e9fd361fdb6a7515cae7e`. |
| npm pack dry-run | PASS — `npm pack --dry-run` produced `oh-my-codex-0.17.0.tgz` dry-run output after prepack verification, shasum `64b6cb807fab9ddb6213dde72472df137c8e81db`. |
| GitHub CI | PASS — release-tag publication completed before public `v0.17.0` availability. |
| GitHub release | PASS — `gh release view v0.17.0` reports a non-draft, non-prerelease release published at `2026-05-12T07:20:46Z`: https://github.com/Yeachan-Heo/oh-my-codex/releases/tag/v0.17.0. |
| npm | PASS — `npm view oh-my-codex version dist-tags --json` returns `version: 0.17.0` and `latest: 0.17.0`. |

## Post-publish website evidence

- `npm view oh-my-codex version dist-tags --json` returned `0.17.0` / `latest: 0.17.0` on 2026-05-13.
- `gh release view v0.17.0 --repo Yeachan-Heo/oh-my-codex` returned a public, non-draft, non-prerelease release published on 2026-05-12.
- Website release highlights and docs landing copy are aligned to the shipped 0.17.0 scope.

## Remaining watch items

- GitHub Actions may still warn about Node.js action runtime deprecations even when required jobs pass.
- Keep future release-readiness collateral updated after public publication so the website does not preserve pre-publish wording.
