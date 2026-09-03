# Release readiness — 0.21.3

## Identity

- Release: `0.21.3` patch.
- Previous tag: `v0.21.2` (`020576d3071d70e72af7b9ddfd797e7281a87fea`).
- Frozen dev: `3902573ef309e54534d7388579f2a7243ca7f465`.
- Range: 15 commits, 20 files, +1,285/−101, PRs #3604/#3605/#3606/#3608/#3610/#3612, linked issues #3609/#3611.
- Owner authorization: direct `릴리즈 진행시켜라` in the OMX dev channel on 2026-09-03.
- Backlog at freeze: open PR 0, open issue 0.

## Version carriers

- package.json → 0.21.3
- package-lock.json (root + self entry) → 0.21.3
- Cargo.toml `[workspace.package]` → 0.21.3
- plugins/oh-my-codex/.codex-plugin/plugin.json → 0.21.3

## Gates

| Gate | Status |
|---|---|
| Frozen dev CI for `3902573e` | Passed (PR #3612 checks green on head `316084c2`, merged to dev) |
| Version sync / build / static / generated | Pending release-PR CI |
| Full tests and package/native smoke | Pending release-PR CI |
| Exact-head PR to main, CI, adversarial review | Pending |
| Main CI, tag `v0.21.3`, GitHub Release/native assets | Pending |
| Exact tag/SHA-bound OIDC npm trusted publish | Pending |
| npm `oh-my-codex@0.21.3` and latest | Pending |

## Included work

- #3608 — prevents duplicate Team wakes and retires terminal projections.
- #3612 — detached tmux scrollback clamp 500 → 5000 with `OMX_TMUX_HISTORY_LIMIT` override; fixes #3611. Root cause and fix verified against a live Codex TUI (`codex-cli 0.152.1`, `tmux 3.2a`) driven through the real `omx` overlay with a local Responses-API SSE server; scrollback retention measured at 200 vs 5000 (`220` vs `1500` of 1500 emitted lines recoverable).
- #3610 — troubleshooting entry for composer drift (#3609) with a four-round negative repro matrix: idle pane mutations, mid-stream mutations, `alternate-screen off` + `aggressive-resize on`, and a 40-turn session at the old 500-line scrollback boundary.
- #3606 / #3605 / #3604 — dependency bumps (`@types/node`, `zod`, `@biomejs/biome`).

## Known gaps

- `Cargo.lock` still records crate versions from `0.20.5`, unchanged from the `v0.21.2` shipped state; Rust lanes were green in that configuration and this release does not touch crate manifests.
- #3609 was closed as not reproducible on `dev` after four documented repro rounds, with a reopen path recorded on the issue. If it recurs on `0.21.3`, it returns as a fresh lane rather than a shipped regression.

## Publish contract

Merge the release PR using a two-parent merge commit. Immediately before merge, force-fetch `+refs/heads/release/0.21.3:refs/remotes/origin/release/0.21.3` and record the exact release head. Before tagging, verify that recorded release head and frozen dev `3902573e` are ancestors of the merged main commit. Use the tag-triggered Release workflow for GitHub assets and the CI workflow's exact `release_tag`/`release_sha` OIDC trusted-publish job for npm. No token/manual publisher.
