# Release readiness: oh-my-codex 0.18.10

## Range

- Previous tag: `v0.18.9`.
- Candidate branch during prep: `origin/dev` in clean release worktree `/home/bellman/Workspace/oh-my-codex-release-0.18.10`.
- Frozen dev candidate at intake: `bd365573f0cee7dfb300c71de447482fc5356f5d` (`Debloat generated AGENTS bootstrap`).
- Release tag to create after branch CI and main promotion: `v0.18.10`.
- Dev HEAD CI evidence before release prep: GitHub Actions run `27067833038`, completed/success for `bd365573`.
- Open backlog at intake: no open issues; one external draft PR (`2737`) on `dev`, not merge-ready and not part of this release.

## Release scope

`0.18.10` packages the post-`0.18.9` reliability train:

- Stop hook reliability: malformed stdin recovery, planning null-device redirects, side-conversation Stop hook isolation, and hook plugin runner stdin `EAGAIN` handling.
- Team/HUD reliability: worker Stop nudges routed as team steering, duplicate tmux HUD ownership fixed, and worker startup scripts prevented from owning HUD panes.
- Autopilot/Ultragoal/ralplan guardrails: Autopilot execution contract foundation, explicit Ultragoal team context fail-closed behavior, and ralplan native subagent leader gate fix.
- Auth and generated-agent guidance: subscription Codex defaults seeded, ultrawork docs routing clarified, and generated AGENTS bootstrap debloated while preserving required contracts.
- Release hygiene: Biome `2.4.16` plus `0.18.9` post-publish evidence commits included in the compare range.

## Merged PR inventory

- [#2715](https://github.com/Yeachan-Heo/oh-my-codex/pull/2715) — Bump @biomejs/biome from 2.4.15 to 2.4.16.
- [#2717](https://github.com/Yeachan-Heo/oh-my-codex/pull/2717) — Clarify ultrawork docs routing and guarantees.
- [#2719](https://github.com/Yeachan-Heo/oh-my-codex/pull/2719) — Route worker Stop nudges as team steering.
- [#2720](https://github.com/Yeachan-Heo/oh-my-codex/pull/2720) — Add Autopilot execution contract foundation.
- [#2722](https://github.com/Yeachan-Heo/oh-my-codex/pull/2722) — Fix hook plugin runner stdin EAGAIN (#2721).
- [#2725](https://github.com/Yeachan-Heo/oh-my-codex/pull/2725) — fix(auth): seed subscription Codex defaults.
- [#2730](https://github.com/Yeachan-Heo/oh-my-codex/pull/2730) — Fix planning hook null-device redirects.
- [#2731](https://github.com/Yeachan-Heo/oh-my-codex/pull/2731) — Fix Stop malformed stdin recovery.
- [#2735](https://github.com/Yeachan-Heo/oh-my-codex/pull/2735) — Fix ralplan native subagent leader gate.
- [#2736](https://github.com/Yeachan-Heo/oh-my-codex/pull/2736) — fix: fail closed explicit Ultragoal team context.
- [#2738](https://github.com/Yeachan-Heo/oh-my-codex/pull/2738) — Fix duplicate tmux HUD ownership for team workers.
- [#2739](https://github.com/Yeachan-Heo/oh-my-codex/pull/2739) — Stop team worker startup scripts from owning HUD panes.
- [#2743](https://github.com/Yeachan-Heo/oh-my-codex/pull/2743) — Fix side conversation Stop hook isolation.
- [#2741](https://github.com/Yeachan-Heo/oh-my-codex/pull/2741) — Debloat generated AGENTS bootstrap.

## Internal/no-PR commits in compare range

- `1bc3f9d0` — Add temporary npm fallback for 0.18.9 Fulcio outage.
- `f2efc145` — Record 0.18.9 publication fallback evidence.
- `75bc9f97` — Name native manifest in release notes.
- `73935230` — Prepare final 0.18.9 CI evidence gate.

## Issue inventory

- Open issues at release prep: none.
- Open PRs at release prep: external draft PR `2737`, `dev` base, green checks, not merge-ready, not a release blocker.

## Version and lockfile audit

- Root `package.json` and `package-lock.json`: bumped to `0.18.10`.
- Root `Cargo.toml` workspace package version and root `Cargo.lock` workspace packages: bumped to `0.18.10`.
- `plugins/oh-my-codex/.codex-plugin/plugin.json`: synced to `0.18.10`.

## Local validation evidence

Commands were run from `/home/bellman/Workspace/oh-my-codex-release-0.18.10`.

- [x] `npm ci` — PASS; installed 151 packages, retained existing audit warnings from dependency graph.
- [x] `npm run build` — PASS, `.omx/release-0.18.10/logs/build.log`.
- [x] `node dist/scripts/check-version-sync.js --tag v0.18.10` — PASS, `.omx/release-0.18.10/logs/version-sync.log`.
- [x] `npm run lint` — PASS, `.omx/release-0.18.10/logs/lint.log`.
- [x] `npm run check:no-unused` — PASS, `.omx/release-0.18.10/logs/no-unused.log`.
- [x] `npm run verify:native-agents` — PASS, `.omx/release-0.18.10/logs/verify-native-agents.log`.
- [x] `npm run sync:plugin:check` — PASS, `.omx/release-0.18.10/logs/sync-plugin-check.log`.
- [x] `npm run verify:plugin-bundle` — PASS, `.omx/release-0.18.10/logs/verify-plugin-bundle.log`.
- [x] `node dist/scripts/generate-catalog-docs.js --check` — PASS, `.omx/release-0.18.10/logs/catalog-docs-check.log`.
- [x] `npm run test:recent-bug-regressions:compiled` — PASS, `.omx/release-0.18.10/logs/test-recent-bug-regressions-compiled.log` (`runtime` sub-suite took about 139s; all pass).
- [x] `npm run test:team:worker-runtime-identity:compiled` — PASS, `.omx/release-0.18.10/logs/test-team-worker-runtime-identity-compiled.log`.
- [x] `npm run test:plugin-boundaries:compiled` — PASS, `.omx/release-0.18.10/logs/test-plugin-boundaries-compiled.log`.
- [x] `npm run test:explicit-terminal-contract:compiled` — PASS, `.omx/release-0.18.10/logs/test-explicit-terminal-contract-compiled.log`.
- [x] `npm pack --dry-run` — PASS, `.omx/release-0.18.10/logs/npm-pack-dry-run.log` (`oh-my-codex-0.18.10.tgz`, package size `3.9 MB`, unpacked size `24.3 MB`, `3045` files).
- [x] `npm run smoke:packed-install` — PASS, `.omx/release-0.18.10/logs/smoke-packed-install.log`.
- [x] `git diff --check` — PASS, `.omx/release-0.18.10/logs/git-diff-check.log`.

## CI / publication evidence

- [ ] Release-prep `dev` CI green — pending after push.
- [ ] Main promotion CI green — pending after main fast-forward.
- [ ] Tag-triggered release workflow — pending after `v0.18.10` tag push.
- [ ] GitHub release proof — pending.
- [ ] npm proof — pending.

## Current readiness verdict

Local release prep for `0.18.10` is ready to push: version sync, targeted release gates, package dry-run, and packed-install smoke all passed. Remote branch CI, main promotion, tag workflow, GitHub release proof, and npm proof remain the final publication gates.
