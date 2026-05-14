# Release readiness — 0.17.1

Date: 2026-05-14
Branch: `main`
Target tag: `v0.17.1`
Previous tag: `v0.17.0`

## Release doctrine checklist

- Release metadata is aligned to `0.17.1` across `package.json`, `package-lock.json`, `Cargo.toml`, and workspace crate entries in `Cargo.lock`.
- Release collateral is aligned: `CHANGELOG.md`, `RELEASE_BODY.md`, `docs/release-notes-0.17.1.md`, and this readiness note.
- The release body template contains the 0.17.1 highlights, compatibility notes, validation summary, contributors anchor, and full-changelog anchor expected by `src/scripts/generate-release-body.ts`.
- Tag publication is expected to trigger `.github/workflows/release.yml`, which verifies version/tag sync, builds native assets, generates the GitHub release body, attaches native assets, smoke-verifies native assets, and publishes npm.

## Local verification

Passed before tagging:

- `npm run lint`
- `npm run check:no-unused`
- `cargo check --workspace`
- `npm audit --audit-level=high`
- `git diff --check`
- `git diff --cached --check`

Security audit result: `npm audit --audit-level=high` reports `found 0 vulnerabilities` after the lockfile-only audit fix updated vulnerable transitive packages (`fast-uri`, `hono`, `ip-address`, `express-rate-limit`).

## Known validation boundary

The complete `npm test` suite was not claimed as a clean local gate in this attached OMX/tmux runtime. Earlier release review attempts in this runtime encountered ambient `OMX_*` contamination and leaked question-test child processes. The tag workflow remains the clean CI/publication gate for the final release verdict.

## Release notes summary

`0.17.1` is a patch release for release readiness and runtime coordination hardening after `0.17.0`: Team + Ultragoal handoff guidance, structured question bridge events, setup MCP removal confirmation, HUD/tmux resize ownership fixes, Team startup readiness, native session overlay preservation, and audit-clean release metadata.

## Post-tag evidence to fill from automation

- GitHub release workflow: pending until `v0.17.1` tag push.
- Native asset publication: pending until release workflow completes.
- npm publication: pending until release workflow completes.
- Public package verification: pending after npm publish.
