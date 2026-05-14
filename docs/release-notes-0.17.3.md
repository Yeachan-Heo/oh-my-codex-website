# Release notes: 0.17.3

`0.17.3` is a hotfix release after `0.17.2` focused on restoring default `omx team` launch for Codex CLI-first/plugin configurations while preserving the worker MCP isolation added in `0.17.1`.

## Highlights

- **Default Team launch works again** — Codex team workers now only add `mcp_servers.<omx>.enabled=false` overrides for first-party OMX MCP servers that are already declared in `CODEX_HOME/config.toml`. This prevents current Codex from failing startup with `invalid transport` for synthetic server tables.
- **Worker MCP isolation is preserved for legacy configs** — if a user config still declares first-party OMX MCP servers (`omx_state`, `omx_memory`, `omx_code_intel`, `omx_trace`, `omx_wiki`, or `omx_hermes`), Team still disables them for Codex workers by default.
- **Release-train hardening included** — the compare range also carries AGENTS contract overwrite protection and the plugin/question metadata alignment commits already on `dev` after `0.17.2`.

## Fixes / compatibility notes

- `OMX_TEAM_WORKER_MCP_COMPAT=1|true|on|compat` remains the explicit opt-in that suppresses Team's worker MCP disable overrides.
- CLI-first/plugin Codex configs that do not contain first-party OMX MCP tables no longer fail before worker readiness.
- Team readiness semantics were not relaxed; failed workers still fail instead of being reported as started.

## Merged PR / commit inventory

- Commit `906b37ec` — protect existing `AGENTS.md` content from silent overwrite when the full OMX contract is missing.
- Commit `318bd2e6` — align plugin metadata and isolate the question return injection test.
- Commit `3bc4dc32` — keep Team worker MCP suppression from inventing absent Codex MCP server tables.

## Validation evidence

- `npm run build`
- `node --test dist/team/__tests__/tmux-session.test.js`
- `npm run check:no-unused`
- Default live Team smoke: `OMX_TEAM_READY_TIMEOUT_MS=12000 OMX_TEAM_STARTUP_EVIDENCE_TIMEOUT_MS=1500 ./dist/cli/omx.js team 1:explore "default smoke launch fixed"`
- Compat live Team smoke: `OMX_TEAM_WORKER_MCP_COMPAT=1 OMX_TEAM_READY_TIMEOUT_MS=12000 OMX_TEAM_STARTUP_EVIDENCE_TIMEOUT_MS=1500 ./dist/cli/omx.js team 1:explore "compat smoke launch still fixed"`

## Full changelog

**Full Changelog**: https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.17.2...v0.17.3
