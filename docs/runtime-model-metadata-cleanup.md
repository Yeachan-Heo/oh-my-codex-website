# Runtime Model Metadata Cleanup

## Why

Benchmark runs showed spawned child agents being labeled with legacy model aliases such as `sonnet`, even when OMX was launched under Codex with GPT-5.x reasoning settings.

The prompt/skill layer was already sanitized, but runtime metadata still used historical aliases in `src/agents/definitions.ts`. Those aliases were also used when generating native agent configs, which made legacy labels leak into spawned-agent UX and benchmark output.

## What changed

### 1. Agent runtime metadata
- Replaced `model: haiku|sonnet|opus` with `reasoningEffort: low|medium|high` in `src/agents/definitions.ts`.
- Kept posture and model-class concepts intact.

### 2. Native agent config generation
- Updated `src/agents/native-config.ts` to derive `model_reasoning_effort` directly from `agent.reasoningEffort`.
- Removed the legacy alias translation table.

### 3. Tests
- Updated `src/agents/__tests__/definitions.test.ts` and `src/agents/__tests__/native-config.test.ts` to match the new runtime metadata shape.
- Existing prompt/skill sanitization test remains as a guard against old aliases reappearing in prompt content.

### 4. Supporting cleanup
- Updated `src/verification/verifier.ts` comment wording from legacy alias names to low/medium/high reasoning wording.

## Expected effect

After rebuilding and rerunning `omx setup --force`, spawned-agent metadata should stop surfacing `haiku` / `sonnet` / `opus` as if they were active runtime models for Codex-based OMX runs.

## Re-test steps

```bash
npm run build   # TypeScript build
node bin/omx.js setup --scope project --force
```

Then rerun the fork benchmark and watch for any remaining `Model: sonnet` lines. If they still appear after this cleanup, the remaining source is likely outside prompt/skill/runtime metadata generation and should be investigated in Codex display integration or cached/generated config artifacts.
