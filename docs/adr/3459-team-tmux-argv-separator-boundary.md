# ADR 3459: Preserve the Team source-authority tmux argv separator boundary

**Status:** Accepted

## Decision

Change the success branch passed by `runSourceAuthorizedTmux()` from `\;` to `;` before the receipt `display-message` command. Export the helper and its `SourcePaneAuthority` input type so a private real-tmux regression can drive the product Node argv construction directly.

The helper continues to send exactly one server-side `if-shell` authority transaction per effect. Its success branch executes the guarded effect and prints the receipt; its failure branch prints an empty receipt; the existing exact-receipt check remains fail-closed. No shell layer is added.

## Drivers

- Real tmux command-string parsing treats `\;` in the single success-branch argv element as an escaped literal semicolon, not a command-list separator. `display-message` is then parsed as surplus effect arguments and real tmux reports `too many arguments`.
- The shipped detached-launch sibling already uses a literal `;` separator. Matching that behavior fixes the Team transport with a one-line product change.
- Fake tmux fixtures alone cannot prove the Node argv to real tmux parser boundary. A private-server regression must prove the product helper's exact `if-shell` argv and actual effect behavior.

## Alternatives

1. **Replicate the argv in a test without exporting the helper.** Rejected: test-side construction can drift from production and cannot prove the product receipt path.
2. **Rewrite every `\;` occurrence in Team, HUD, and scaling into a shared builder.** Rejected: broadens #3459 beyond the affected Team source-authority transport and overlaps separate work.
3. **Use a shell or `run-shell` indirection.** Rejected: adds an injection-relevant parsing layer and changes the transport contract.

## Why chosen

A literal `;` is the tmux command-list separator required inside the existing Node argv success-branch string. It preserves the single authority transaction, both branches, and receipt behavior while matching the established sibling fix. The exported seam keeps the regression drift-free: it reaches `runTmux()` and `spawnPlatformCommandSync()` instead of recreating their argv in a test.

## Consequences

- Guarded Team effects such as `set-option`, `select-layout`, and `send-keys` execute correctly on real tmux 3.x and still emit the exact receipt.
- Fake fixtures are updated to parse the same separator form.
- The real-tmux regression creates a private-server PATH shim, saves/restores and prepends `process.env.PATH` before calling the exported helper, and asserts the exact logged `if-shell` argv. A bounded pane-readiness poll limits fixture startup flakiness without changing production behavior.
- Literal values remain protected by the existing `shellQuoteSingle` caller discipline; the fix does not introduce shell execution. Hostile receipt and quoted literal-value cases are regression-tested.
- `runSourceAuthorizedSplit`, Team scaling, HUD helpers, CLI helpers, and #3457/#3458 work remain out of scope.

## Follow-ups

Track the independent real-tmux probes for same-pattern sites in Team scaling and HUD before considering any broader command-list abstraction.