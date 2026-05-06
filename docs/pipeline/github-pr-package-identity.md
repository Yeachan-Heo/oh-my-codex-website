# GitHub / PR / package identity pipeline

This guide documents the public contract for turning GitHub or community reports into traceable OMX work packages, worktrees, pull requests, reviews, and merge decisions. It is intentionally infrastructure-neutral: repositories may implement the glue with GitHub Actions, bots, scheduled scripts, or manual maintainer commands, but the artifacts and gates below are the source of truth.

## Public scope and source of truth

- **Repo-available contract:** the Markdown templates in [`docs/pipeline/templates/`](./templates/) and this workflow contract are safe to copy, review, and version in the repository.
- **External orchestration glue:** webhook listeners, Discord bots, queue workers, credential stores, deployment targets, and scheduler internals live outside this contract. Do not document secrets, hostnames, queue names, tokens, private channels, or operational topology here.
- **Truth model:** chat messages are coordination hints, not truth. The truth lives in GitHub issues, pull requests, and package artifacts committed to branches or attached to issues/PRs.
- **Mutation safety:** any state-changing action must pass an explicit gate. Only one active mutating runtime may own a worktree at a time; observers and reviewers may read concurrently.

## Pipeline overview

1. **GitHub/Discord intake**
   - Accept reports from GitHub issues and optional Discord/community threads.
   - Mirror external context into the GitHub issue when it is needed for future maintainers.
   - Record the canonical identity with [`issue-package-identity.md`](./templates/issue-package-identity.md).
2. **Classify, dedupe, reproduce, and risk-gate**
   - Classify as bug, feature/contract proposal, duplicate, support question, or invalid/spam.
   - Search for existing issues and PRs before creating a package.
   - Ask for a minimal reproduction when a bug report is not actionable.
   - Apply a risk gate before any mutating runtime starts: branch target, affected surfaces, expected tests, and whether credentials or destructive commands are involved.
3. **Package identity**
   - Create a stable `package_id` for actionable work, usually `issue-<number>-<short-slug>`.
   - Bind the package to one repo, one issue, one branch, one worktree, and optional external thread reference.
   - Store package state transitions in the issue/PR/package artifacts, not only in chat.
4. **Worktree/session/branch mapping**
   - Branch: `<kind>/issue-<number>-<short-slug>` such as `fix/issue-1234-repro-timeout` or `docs/issue-2087-pipeline-templates`.
   - Worktree: a deterministic path containing the `package_id`, for example `../oh-my-codex-worktrees/<package_id>`.
   - OMX session: a runtime label containing or linking to the `package_id`; it may be implementation-specific, but the package artifact must say which runtime owned mutation.
5. **Execution artifacts**
   - `package.md` records identity, scope, gates, and state.
   - `plan.md` records planned changes and validation.
   - `execution-result.md` records what changed and evidence.
   - `review.md` records review findings and approval/rejection.
   - `merge-decision.md` records final gate outcome.
6. **PR, review, and merge gates**
   - PRs target the agreed base branch, usually `dev`.
   - The PR links the issue and package artifacts.
   - Review checks traceability, validation, risk, and single-owner worktree mutation.
   - Merge only after validation evidence and review approval are recorded.

## States

Recommended package states:

- `intake`: report received; no package created yet.
- `needs_repro`: bug-like report needs exact reproduction details.
- `duplicate`: closed or redirected to canonical issue.
- `proposal`: feature/contract idea needs maintainer scope gate.
- `ready`: package identity exists and mutation has not started.
- `executing`: one mutating runtime owns the worktree.
- `review`: implementation submitted; mutation paused except requested fixes.
- `merge_ready`: review and validation gates passed.
- `merged`: PR merged and issue closure recorded.
- `closed`: no further work planned.

## Issue/package identity

Use [`templates/issue-package-identity.md`](./templates/issue-package-identity.md) in the issue body, a package artifact, or both. Required fields are:

- `source`
- `repo`
- `issue`
- `package_id`
- `branch`
- `worktree`
- `discord_thread`
- `state`

## Triage policy templates

Use the templates in [`templates/triage/`](./templates/triage/) for common issue outcomes:

- [`needs-repro-question.md`](./templates/triage/needs-repro-question.md)
- [`timeout-close.md`](./templates/triage/timeout-close.md)
- [`duplicate-close.md`](./templates/triage/duplicate-close.md)
- [`reproducible-bug-package.md`](./templates/triage/reproducible-bug-package.md)
- [`feature-contract-proposal-gate.md`](./templates/triage/feature-contract-proposal-gate.md)

## Execution artifact templates

Use the templates in [`templates/execution/`](./templates/execution/) for package lifecycle records:

- [`package.md`](./templates/execution/package.md)
- [`plan.md`](./templates/execution/plan.md)
- [`execution-result.md`](./templates/execution/execution-result.md)
- [`review.md`](./templates/execution/review.md)
- [`merge-decision.md`](./templates/execution/merge-decision.md)

## Coordinator skeleton

The coordinator is orchestration glue. Keep implementation-specific endpoints, credentials, process managers, queue names, and private channel identifiers outside public docs.

```ts
type IntakeEvent = {
  source: "github" | "discord";
  repo: string;
  issue?: number;
  externalThread?: string;
  title: string;
  body: string;
  author: string;
  receivedAt: string;
};

type Classification = {
  kind: "bug" | "feature" | "contract" | "duplicate" | "support" | "invalid";
  confidence: number;
  canonicalIssue?: number;
  needsRepro: boolean;
  risk: "low" | "medium" | "high";
  rationale: string;
  suggestedPackageId?: string;
};

async function intakeLoop() {
  for await (const event of pollOrReceiveWebhookEvents()) {
    const issue = await ensureCanonicalGitHubIssue(event);
    const classification = await classify(issue);

    if (classification.kind === "duplicate") {
      await commentFromTemplate(issue, "triage/duplicate-close.md", classification);
      await closeIssue(issue, "not planned");
      continue;
    }

    if (classification.needsRepro) {
      await commentFromTemplate(issue, "triage/needs-repro-question.md", classification);
      await label(issue, ["needs-repro"]);
      continue;
    }

    if (classification.kind === "feature" || classification.kind === "contract") {
      await commentFromTemplate(issue, "triage/feature-contract-proposal-gate.md", classification);
      await label(issue, ["proposal", "needs-maintainer-gate"]);
      continue;
    }

    if (classification.kind === "bug") {
      await createPackageIdempotently(issue, classification);
    }
  }
}

async function createPackageIdempotently(issue: Issue, classification: Classification) {
  const packageId = classification.suggestedPackageId ?? `issue-${issue.number}-${slug(issue.title)}`;
  const existing = await findPackageByIssue(issue.repo, issue.number);
  if (existing) return existing;

  const branch = `fix/${packageId}`;
  const worktree = `../oh-my-codex-worktrees/${packageId}`;
  const session = `tmux-or-omx-${packageId}`;

  await requireGate("risk", {
    issue: issue.number,
    packageId,
    risk: classification.risk,
    mutationOwner: session,
  });

  await run(`git fetch origin dev`);
  await run(`git worktree add ${shellQuote(worktree)} -b ${shellQuote(branch)} origin/dev`);
  await writeTemplate(`${worktree}/package.md`, "execution/package.md", {
    source: "github",
    repo: issue.repo,
    issue: issue.number,
    package_id: packageId,
    branch,
    worktree,
    discord_thread: "n/a",
    state: "ready",
  });

  await commentFromTemplate(issue, "triage/reproducible-bug-package.md", {
    packageId,
    branch,
    worktree,
    session,
  });

  // Dispatch is explicit: the coordinator records the command it asked a runtime to run.
  const prompt = `Implement ${packageId}; keep package.md and execution-result.md current.`;
  const command = `OMX_PACKAGE_ID=${packageId} omx team 1:executor ${shellQuote(prompt)}`;
  await runInWorktree(worktree, command);
  await recordDispatch(issue, {
    command,
    worktree,
    branch,
    packageId,
  });
}
```

## Explicit dispatch command examples

These examples are placeholders; adapt them to the public CLI commands available in your environment and record the actual command in `package.md` or `execution-result.md`.

```sh
# Create a deterministic worktree for the package.
git fetch origin dev
git worktree add ../oh-my-codex-worktrees/issue-2087-pipeline-templates \
  -b docs/issue-2087-pipeline-templates origin/dev

# Start exactly one mutating runtime for that worktree and record the command.
cd ../oh-my-codex-worktrees/issue-2087-pipeline-templates
OMX_PACKAGE_ID=issue-2087-pipeline-templates \
  omx team 1:executor "Implement issue-2087; keep package artifacts current."

# Open a pull request after validation evidence exists.
gh pr create --base dev --head docs/issue-2087-pipeline-templates \
  --title "docs: add issue package pipeline templates" \
  --body-file .github/pr-body.md
```

## Public safety checklist

Before dispatch:

- [ ] A canonical GitHub issue exists.
- [ ] Duplicate search completed.
- [ ] Reproduction or proposal scope is sufficient.
- [ ] Risk gate is recorded.
- [ ] `package_id`, branch, worktree, and optional external thread are recorded.
- [ ] No secret, credential, private URL, queue name, or host-specific topology is present in public artifacts.
- [ ] Exactly one mutating runtime owns the worktree.

Before merge:

- [ ] PR links the issue and package artifacts.
- [ ] Validation evidence is current.
- [ ] Review decision is recorded.
- [ ] Merge decision states whether the PR closes the issue.
