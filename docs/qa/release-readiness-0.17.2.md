# Release readiness: 0.17.2

## Scope

Hotfix for `omx question` leader-pane resume injection after structured question / Hermes coordination integration.

## Compare range

- Previous tag: `v0.17.1`
- Candidate tag: `v0.17.2`
- Candidate branch: `dev` at `7c4958a3dd049b0ca8390e26431250ad55e9b118` after PR #2330 merge plus metadata alignment follow-up.
- Ancestry check: `v0.17.1` is an ancestor of `dev` before main promotion.

## PR inventory

- PR #2330 — restore safe return-pane resume injection for `omx question` structured answer paths.
- Follow-up commit `7c4958a3` — align plugin manifest metadata to `0.17.2` and keep the explicit-return-pane CLI test isolated from real tmux during synthetic answer completion.

## Local gates

- PASS — `npm run build`
- PASS — `env -u OMX_STATE_ROOT -u OMX_ROOT -u OMX_SESSION_ID -u CODEX_SESSION_ID -u SESSION_ID node --test dist/question/__tests__/state.test.js dist/question/__tests__/ui.test.js dist/mcp/__tests__/hermes-bridge.test.js dist/question/__tests__/renderer.test.js`
- PASS — `npm run check:no-unused`
- PASS — `npx biome lint src/question src/mcp/hermes-bridge.ts`
- PASS — `env -u OMX_STATE_ROOT -u OMX_ROOT -u OMX_SESSION_ID -u CODEX_SESSION_ID -u SESSION_ID node --test dist/catalog/__tests__/plugin-bundle-ssot.test.js dist/cli/__tests__/codex-plugin-layout.test.js dist/cli/__tests__/question.test.js`
- PASS — `npx biome lint src/cli/__tests__/question.test.ts plugins/oh-my-codex/.codex-plugin/plugin.json`

## CI / publication evidence

- PASS — PR #2330 merged to `dev`: merge commit `98a35939f69985ad9ba10487c723954154402265`.
- PASS — `dev` CI run `25841016418` passed on commit `7c4958a3dd049b0ca8390e26431250ad55e9b118`.
- Pending — `main` promotion, `main` CI, tag workflow, GitHub release, and npm publication.

## Known gaps

- Full `npm test` was not rerun locally after the targeted hotfix; targeted changed-surface tests and type/lint gates passed.
- Final release publication requires CI evidence per `RELEASE_PROTOCOL.md`.
