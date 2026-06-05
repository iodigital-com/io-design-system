## Token sync

This PR was opened automatically by the Figma Token Sync workflow.

### What changed

Replace this section with a summary from Style Dictionary or your token tooling once a real Figma integration is wired in. Until then this PR carries a `docs/last-token-sync.json` marker that records the sync run metadata.

### Governance checks

All of the following passed before this PR was opened:

- Token naming conventions
- Token runtime reconciliation
- Token doc coverage
- Style-literal allowlist
- Dark-mode token completeness
- Public CSS API surface
- Events guard
- Agency governance

### Review checklist

- [ ] Token values correct and match Figma source of truth
- [ ] No existing semantic token aliases broken
- [ ] `docs/token-runtime-reconciliation.json` updated if new tokens were added
- [ ] Dark-mode overrides added for any new semantic tokens
- [ ] Changeset created if any published package changed

### Reviewer

Token PRs must be reviewed by a Design Ops owner or @io-design-system/maintainers member before merge.
