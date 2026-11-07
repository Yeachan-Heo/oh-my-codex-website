# Configure Custom Quality Gates

OMX can invoke custom skill-based checks at supported workflow stages. Configure them in `.omx-config.json`; quality gates are not a Codex `config.toml` setting.

## Configuration file location

The Quality Gates reader checks:

- **User scope:** `${CODEX_HOME:-~/.codex}/.omx-config.json`
- **Project scope:** `<current working directory>/.omx-config.json`, when the CLI supplies a working directory

If both files define gates for the same stage, project entries replace the user entries for that stage. The reader does not use `./.codex/.omx-config.json` as a Quality Gates source. See the [configuration schema and scope reference](./omx-config-schema-routing.md) for broader config-resolution details.

## Add gates

A stage maps to a list of gate entries. Entries can be a skill-name string or an object with a required `skill` and optional `mode` and `model`:

- A string defaults to `blocking`.
- `mode` is `blocking` or `advisory`; the default is `blocking`.
- `model` optionally overrides the gate subagent’s model.

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

## Supported stages and timing

| Stage key | When the gate runs |
| --- | --- |
| `deep-interview` | At the final-spec stage, after the specification is complete and before handoff. |
| `ralplan` | In the Ralplan consensus flow, after the Critic approves a draft. A Critic `iterate` or `reject` skips custom gates for that draft. Lightweight `$plan` does not run the Ralplan gate stage. |
| `code-review` | After the built-in independent `code-reviewer` and `architect` reviews. |

Custom gates supplement the owning workflow’s built-in reviews; they do not replace them.

## Skill names

Use lowercase kebab-case names containing letters, digits, and hyphens, with an optional leading `$` for skill references (for example, `my-custom-gate`, `analysis-check-v2`, or `$security-audit`). Names such as `MySkill`, `my_skill`, or `my.skill` are invalid.

Some names are reserved for built-in OMX behavior, including `ai-slop-cleaner`, `verification`, `code-review`, and `deep-interview`. Removed/sunset skill names are also unavailable as gates; examples include `ask-claude`, `deepsearch`, `ralph`, `ecomode`, and `swarm`.

## Verdicts and availability

Gate verdicts use the owning workflow’s review vocabulary: `approve`, `iterate`, or `reject`. Blocking `iterate`/`reject` findings enter that workflow’s revision path where supported; advisory findings are recorded without independently blocking progression. `unavailable` means the gate did not provide a valid review—it is not an approval.

Unavailable-gate handling differs by workflow guidance and current runtime:

| Workflow | Unavailable blocking gate |
| --- | --- |
| Deep Interview and Code Review skill guidance | Requires blocking evidence before readiness or handoff; unavailable evidence is not approval. |
| Ralplan skill guidance | Also specifies fail-closed handling before handoff. |
| Current Ralplan runtime | Records an unavailable gate and skips it, including in blocking mode. Consensus may still complete if its other requirements pass. |

**Important:** current Ralplan runtime behavior does not enforce its skill’s fail-closed guidance for unavailable gates. A configured blocking gate alone is therefore not proof of fail-closed enforcement. Consult the full behavior reference for the current implementation details.

## Inspect configured gates

```bash
omx quality-gates list --stage code-review --json
```

The command lists normalized entries for the selected stage; it does not run gates or enforce a workflow. Invalid configuration entries may be filtered from the normalized output, so this is not a comprehensive validation or diagnostic command.
Use `omx doctor` to diagnose configuration issues where applicable.

Example output:

```json
{
  "gates": [
    { "skill": "security-audit", "mode": "advisory" },
    { "skill": "custom-reviewer", "mode": "blocking", "model": "claude-sonnet" }
  ],
  "stage": "code-review"
}
```

## References

- [Full Quality Gates behavior reference](https://github.com/Yeachan-Heo/oh-my-codex/blob/dev/docs/reference/omx-config-quality-gates.md)
- [Configuration schema and scope reference](./omx-config-schema-routing.md) — broader configuration-resolution details, not the full Quality Gates guide
- [Skills reference](../skills.html)
