# oh-my-codex v0.8.3

Released: **2026-03-06**

This is a **focused hotfix release** for the Gemini team-worker path shipped in the `0.8.2` dev release line.

---

## TL;DR

- Fixes Gemini worker startup in team prompt mode by launching workers with `--approval-mode yolo -i "<initial inbox prompt>"` instead of depending on stdin for the first instruction (`#585`).
- Prevents non-Gemini default models such as `gpt-5.3-codex-spark` from being passed through to Gemini workers unless the configured model is explicitly a Gemini model (`#585`).
- Adds targeted runtime and tmux-session regression coverage for the Gemini prompt-launch path (`#585`).
- Includes a small test-only hardening for the notify-fallback watcher so full-suite release validation remains stable under load.

---

## What changed

### 1) Gemini prompt-mode workers now start with an explicit initial prompt

Gemini workers launched through OMX team prompt mode are now started with an explicit initial instruction:

- `--approval-mode yolo`
- `-i "Read and follow the instructions in .../inbox.md"`

**Why this matters:**
- removes dependence on stdin-delivered bootstrap text for Gemini startup
- aligns worker bootstrap with Gemini CLI expectations in prompt mode
- fixes the broken worker bring-up path reported in the hotfix PR

### 2) Non-Gemini default model passthrough is filtered for Gemini workers

Gemini workers no longer inherit non-Gemini default models by accident.

Current behavior from this release:
- explicit Gemini models still pass through
- non-Gemini defaults are omitted for Gemini workers
- mixed-provider team configs avoid invalid startup argument combinations

**Why this matters:**
- prevents invalid provider/model pairings during worker launch
- preserves cleaner mixed-provider CLI interoperability
- reduces surprising failures in prompt-mode and mapped-worker setups

### 3) Regression coverage was expanded for the hotfix path

This release adds focused tests covering:
- prompt-mode Gemini startup argument construction
- runtime startup behavior for prompt-launched Gemini workers
- translation behavior when default models are non-Gemini

### 4) Full-suite verification was stabilized

Release validation also hardened a flaky watcher test so the full suite reliably waits for watcher readiness before asserting streaming EOF-tail behavior.

**Why this matters:**
- keeps release verification deterministic under heavy suite load
- preserves the intended watcher behavior instead of relying on fixed sleeps
- does not change shipped Gemini runtime behavior

---

## Related PRs and issues

### Merged PRs in this release
- #585 — fix(team): seed gemini workers with prompt-interactive launch

### Scope note
- Functional release scope is centered on PR `#585`, the Gemini worker startup hotfix after the `0.8.2` dev release line.
- Release validation also includes a small test-only stabilization in `src/hooks/__tests__/notify-fallback-watcher.test.ts` so the full suite remains reliable under load.
- Final tracked change set for the release branch: `package.json`, `package-lock.json`, `CHANGELOG.md`, and the watcher test hardening.

---

## Verification summary

Release verification evidence is recorded in `docs/qa/release-readiness-0.8.3.md`.

Planned release gates:
- `npm run build`
- `npm test`
- `npm run check:no-unused`
- CLI smoke checks (`--help`, `version`, `status`, `doctor`, `setup --dry-run`, `cancel`)
- Gemini-targeted regression checks from PR `#585`

---

Thanks for using **oh-my-codex**. If anything regresses, please open an issue with reproduction steps, logs, and your CLI/runtime details.
