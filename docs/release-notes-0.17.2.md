# Release notes: 0.17.2

`0.17.2` is a hotfix release after `0.17.1` focused on restoring `omx question` leader-pane resume behavior for structured answers, including the Hermes/MCP question bridge path.

## Highlights

- **Leader-pane resume restored for structured question answers** — when an OMX-created question record has persisted renderer `return_target` metadata, answering the question now sends the bounded `[omx question answered]` notice back to that pane using the shared tmux-send-keys helper.
- **Hermes bridge participates in the same answer path** — Hermes/MCP bounded answer submission still validates and writes question state first, then uses the record-authorized return target when present.

## Fixes / compatibility notes

- The bridge remains structured and bounded: coordinators do not provide terminal targets and do not gain arbitrary stdin proxy behavior.
- Records without a valid `%pane` return target still persist answers without attempting unsafe injection.
- Existing stale, duplicate, and malformed answer validation remains unchanged.

## Merged PR inventory

- PR #2330 — restore safe `omx question` answer resume injection for structured/Hermes paths.

## Validation evidence

- `npm run build`
- `env -u OMX_STATE_ROOT -u OMX_ROOT -u OMX_SESSION_ID -u CODEX_SESSION_ID -u SESSION_ID node --test dist/question/__tests__/state.test.js dist/question/__tests__/ui.test.js dist/mcp/__tests__/hermes-bridge.test.js dist/question/__tests__/renderer.test.js`
- `npm run check:no-unused`
- `npx biome lint src/question src/mcp/hermes-bridge.ts`

## Full changelog

**Full Changelog**: https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.17.1...v0.17.2
