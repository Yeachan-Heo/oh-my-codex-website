# Release Readiness Verdict - 0.17.0

Target version: **0.17.0**

Compare link: [`v0.16.4...v0.17.0`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.16.4...v0.17.0)

## Verdict

**LOCAL RELEASE PREP PASS, EXTERNAL PUBLICATION PENDING.** `0.17.0` is the correct target because `v0.16.4...HEAD` adds new user-visible workflow/integration surfaces: Hermes MCP, canonical `$design`, plugin-mode skill discovery, plugin MCP metadata, and adversarial UltraQA guidance. Local release-review patching has resolved the reproducibility issue found in MCP/Hermes state-path tests, bounded-read issues in Hermes artifact tooling, and Hermes symlink-containment gaps in artifact listing/session-history tail reads. External CI, tag workflow, GitHub release publication, and npm publication remain pending until the release commit is merged/tagged.

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
| GitHub CI | PENDING. |
| GitHub release / npm publish | PENDING. |

## Known gaps before publication

- External CI has not run for the final release commit yet.
- GitHub release and npm publication require the normal tag-triggered trusted publishing path.
- GitHub Actions may still warn about Node.js action runtime deprecations even when required jobs pass.
- Release-body generation was validated with a temporary local `v0.17.0` tag because the public release tag is intentionally not created until after CI on the release commit.

## Stop condition

Do not tag or publish until final local gates pass, `$code-review` is clean, CI is green on the release commit, release body generation is verified, and the tag-triggered release workflow publishes GitHub/npm artifacts successfully.
