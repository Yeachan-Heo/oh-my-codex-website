# oh-my-codex v0.8.5

Released: 2026-03-06

7 non-merge commits from `v0.8.4..dev`.
Contributors: [@Yeachan-Heo](https://github.com/Yeachan-Heo), [@HaD0Yun](https://github.com/HaD0Yun), [@sjals93](https://github.com/sjals93).

## Highlights

### Posture-aware agent routing (experimental)

Agents now carry Sisyphus-style posture metadata that separates three dimensions:

- **Role**: agent responsibility (`executor`, `planner`, `architect`)
- **Tier**: reasoning depth / cost (`LOW`, `STANDARD`, `THOROUGH`)
- **Posture**: operating style (`frontier-orchestrator`, `deep-worker`, `fast-lane`)

After `omx setup`, native agent configs in `~/.omx/agents/` include new sections:
`## OMX Posture Overlay`, `## Model-Class Guidance`, and `## OMX Agent Metadata`.

Representative routing:
- `planner` / `architect` / `critic` -> `frontier-orchestrator`
- `executor` / `build-fixer` / `test-engineer` -> `deep-worker`
- `explore` / `writer` -> `fast-lane`

PRs: [#588](https://github.com/Yeachan-Heo/oh-my-codex/pull/588), [#592](https://github.com/Yeachan-Heo/oh-my-codex/pull/592) ([@HaD0Yun](https://github.com/HaD0Yun))

## Bug fixes

### Windows ESM import crash

`bin/omx.js` failed on Windows with `ERR_UNSUPPORTED_ESM_URL_SCHEME` because `import()` received a bare absolute path (`C:\...`) instead of a `file://` URL.

Fix: convert the resolved path to a `file://` URL via `url.pathToFileURL()` before dynamic import.

PR: [#589](https://github.com/Yeachan-Heo/oh-my-codex/pull/589) ([@sjals93](https://github.com/sjals93))
Fixes: [#557](https://github.com/Yeachan-Heo/oh-my-codex/issues/557)

### tmux capture-pane returns empty output

`capture-pane` was called with `-l <N>` (invalid flag usage) instead of `-S -<N>`, so recent terminal output was never captured. This broke HUD recent-output display and notification content extraction.

Fix: use `-S -<N>` (negative start line offset) which is the correct tmux API for capturing the last N lines.

PR: [#593](https://github.com/Yeachan-Heo/oh-my-codex/pull/593)
Fixes: [#591](https://github.com/Yeachan-Heo/oh-my-codex/issues/591)

### Legacy model alias leakage

15 prompt files and the runtime native-config generator still referenced `gpt-5.3-codex` and `o3` model aliases that were removed from the config layer in v0.8.2. With posture routing active, these stale references could confuse tier/model-class guidance.

Fix: scrubbed all legacy alias references from prompts and `definitions.ts` metadata.

Part of PR: [#592](https://github.com/Yeachan-Heo/oh-my-codex/pull/592) ([@HaD0Yun](https://github.com/HaD0Yun))

## Other changes

- Added Maintainers section to README ([@Yeachan-Heo](https://github.com/Yeachan-Heo), [@HaD0Yun](https://github.com/HaD0Yun))
- Added benchmark comparison screenshot to docs (`docs/benchmarks/`)

## Full commit log (v0.8.4..v0.8.5)

```
07e2cfd chore: bump version to 0.8.5 and add maintainers to README
9bbe1e8 fix(notifications): use valid tmux capture-pane history flag
0ae60af docs(bench): add benchmark comparison screenshot
2f4862a docs(omx): remove remaining legacy model alias references
0d2115c fix(omx): remove legacy model aliases from prompts and runtime metadata
8fb3aa0 fix(bin): use file:// URL for dynamic import on Windows
f448108 feat(omx): add posture-aware agent routing metadata
```
