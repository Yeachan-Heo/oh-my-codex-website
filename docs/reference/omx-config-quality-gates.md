# Configure Custom Quality Gates

OMX can run skill-based checks at selected workflow stages. Configure them in `.omx-config.json`—**not** in Codex's `config.toml` and not in a `.js` file.

## Configuration file location

- **User scope:** `${CODEX_HOME:-~/.codex}/.omx-config.json`
- **Project scope:** `./.codex/.omx-config.json` when project setup is active and `CODEX_HOME` is not set.

Use the path for the scope where you ran `omx setup`. See the [configuration schema reference](./omx-config-schema-routing.md) for resolution details.

## Add a gate

Add a top-level `qualityGates` object. For example, to run the `greek-scholastic` skill as a blocking reviewer during code review:

```json
{
  "qualityGates": {
    "code-review": [
      { "skill": "greek-scholastic", "mode": "blocking" }
    ]
  }
}
```

Supported stage keys are `deep-interview`, `ralplan`, and `code-review`. Entries can be plain skill names or objects:

```json
{
  "qualityGates": {
    "deep-interview": ["requirements-check"],
    "ralplan": [
      { "skill": "architecture-check", "mode": "blocking", "model": "claude-sonnet" }
    ],
    "code-review": [
      { "skill": "security-audit", "mode": "advisory" }
    ]
  }
}
```

- A plain skill name is **blocking** by default.
- `mode` may be `blocking` or `advisory`. Blocking findings can send the owning workflow through its revision path; advisory findings are recorded without independently blocking progression.
- `model` is optional and overrides the model for that gate.
- Use discoverable custom skills with kebab-case names. Reserved built-in and sunset skill names are rejected.
- Custom gates supplement the workflow's built-in reviewers; they do not replace them.

In the current Ralplan runtime, custom gates run after Critic approval. An unavailable gate is recorded as unavailable and skipped by that runtime; it is not approving evidence. Do not rely on a configured gate alone as a fail-closed release check.

## Inspect the configuration

```bash
omx quality-gates list --stage code-review --json
```

This command reports normalized configuration; it does not execute the gate. Replace `code-review` with `deep-interview` or `ralplan` to inspect another stage.

See also: [Skills reference](../skills.html), and the [full configuration reference](./omx-config-schema-routing.md).

