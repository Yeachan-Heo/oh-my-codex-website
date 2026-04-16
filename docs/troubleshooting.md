# Troubleshooting execution readiness

Use this page when OMX appears installed but real Codex execution still fails.

## Install success vs real execution success

`omx setup` and `omx doctor` validate OMX's local install surface: prompts, skills, AGENTS scaffolding, config files, hooks, and runtime prerequisites. They do not guarantee that the active Codex profile can authenticate and complete a model request.

After `omx doctor`, run a real smoke test from the same shell, HOME, and project directory you will use for OMX:

```bash
codex login status
omx exec --skip-git-repo-check -C . "Reply with exactly OMX-EXEC-OK"
```

Treat the boundary this way:

- `omx doctor` green: install and local runtime wiring look sane.
- `codex login status` green: the active Codex profile can see login state.
- `omx exec ...` returns `OMX-EXEC-OK`: real execution, auth, provider routing, and current working-directory assumptions are working together.

## Green doctor, but `omx exec` fails with auth errors

Common failure strings include `401 Unauthorized`, `Missing bearer or basic authentication in header`, or `Incorrect API key provided`.

Check the active runtime profile, not only your normal login shell:

1. Print `HOME` and `CODEX_HOME` in the shell that launches OMX.
2. Confirm that the active `~/.codex` or `CODEX_HOME` contains the expected auth and `config.toml`.
3. Re-run `codex login status` from that same shell.

Custom HOME, container, profile, CI, and service-user environments often have a different `~/.codex` from the machine's main user. A working Codex setup in one home does not automatically make another home ready.

## Local proxy or `openai_base_url` mismatch

If your setup depends on an OpenAI-compatible local proxy or gateway, verify that the active runtime config contains the matching base URL:

```toml
openai_base_url = "http://localhost:8317/v1"
```

Use your actual proxy URL. If the profile-local `~/.codex/config.toml` is missing `openai_base_url`, Codex may send the proxy-issued key to the default endpoint. That can make setup and doctor look fine while real execution fails with 401-style auth errors.

## Stale `doctor --team` or dead tmux session state

`omx doctor --team`, `omx team resume`, or startup diagnostics can fail when a previous team state references a tmux session that no longer exists. The state may mention `resume_blocker`, or the dead session may be recorded under `.omx/state/team/<team-name>/config.json` or `manifest.v2.json`.

If the team is intentionally abandoned and no live tmux session remains, clean it up with:

```bash
omx team shutdown <team-name> --force --confirm-issues
omx cancel
omx doctor --team
```

Do not force-shutdown a team that may still have useful live panes or worker state. Prefer `omx team status <team-name>` and `tmux ls` first when unsure.
