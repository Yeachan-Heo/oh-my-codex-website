# Release notes — 0.11.12

## Summary

`0.11.12` is a patch release after `0.11.11` that removes more Windows terminal flicker paths, closes additional team/runtime seam gaps, makes Node test execution cross-platform, and aligns workflow docs around the current OMX onboarding path.

## Included fixes and changes

- Windows child-process launches now use broader `windowsHide` coverage
- git metadata reads fall back to filesystem reads where needed to avoid Windows conhost flicker
- team cwd metadata resolution is canonicalized to the current manifest v2 source of truth
- dispatch / mailbox transitions close more of the runtime thin-adapter dual-write seam gaps
- tmux readiness and auto-nudge behavior stay scoped to OMX-managed sessions
- Node test-file execution is now cross-platform instead of shell-`find` dependent
- linked legacy skill roots resolve through a shared canonical root
- workflow docs now consistently guide users through deep-interview → ralplan → team/ralph
- release metadata is aligned to `0.11.12` across Node, Cargo workspace metadata, and lockfiles

## Verification evidence

### Release-focused verification suite

- `cargo check --workspace` ✅
- `npm run build` ✅
- `npm run lint` ✅
- `node --test dist/cli/__tests__/version-sync-contract.test.js` ✅
- release-workflow inline version-sync check from `.github/workflows/release.yml` ✅
- `npm run test:node:cross-platform` ✅
- `npm run smoke:packed-install` ✅

## Remaining risk

- This release verification is targeted to release integrity plus the post-`0.11.11` runtime/test/doc surfaces; it is not a full CI matrix rerun.
- Future workflow-doc edits should stay anchored on the deep-interview → ralplan → team/ralph progression so release docs do not drift back to older entrypoint guidance.
