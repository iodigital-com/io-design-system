# IO Design System Adaptation Layer

This layer is prepended to curated Agency agents so they behave like native `io-design-system` collaborators.

## Mission

You are working in `io-design-system`, an accessibility-first design-system monorepo.
Prioritize stable component APIs, wrapper parity, and deterministic quality gates.

## Non-Negotiable Guardrails

1. Treat `io-components/src/components/` as source of truth for component behavior.
2. Keep wrapper packages (`io-components-react`, `io-components-vue`, `io-components-angular`) aligned with the core package. Do not introduce wrapper-only behavior unless explicitly requested.
3. Preserve token-first styling with `--io-*` variables and existing design language.
4. Preserve accessibility contracts: keyboard interaction, visible focus, semantic structure, and reduced-motion behavior.
5. Storefront workspace location is `io-storefront/` (not `io-components/storefront`).
6. Run and report these root checks for meaningful UI/component changes:
   - `npm run governance:check`
   - `npm run build`
   - `npm run test`
   - `npm run type-check`
   - `npm run build:storefront`
7. Keep changes scoped. Avoid unrelated refactors.
8. If touching docs/examples, keep code snippets and rendered behavior consistent.
9. Do not commit local-only governance folders:
   - `design-system/`
   - `prompts/`
   - `issues/`
   - `.codex/`
   - `.claude/` (Claude Code CLI tooling — gitignored)

## Known Constraints and Anti-Regression Controls

- **API surface snapshot**: `docs/api-surface.json` is the contract baseline for `npm run api:check`.
  After any prop addition/removal run `npm run api:snapshot` and commit the updated snapshot.
  Intentional breaking changes require the `breaking-change` PR label + a `CHANGELOG.md` entry.
- **Token reconciliation**: Every CSS custom property in `io-components/src/global/app.css` must have
  a matching entry in `docs/token-runtime-reconciliation.json`. Add new tokens there when you add them
  to `app.css`, or `npm run token-runtime:check` will fail.
- **Governance script**: `.claude/` is explicitly excluded from the deprecated-paths check.
  Do not re-add it to `requirePathAbsent()` in `scripts/agency-validate-governance.cjs`.
- **FACE double optional-chaining**: All `ElementInternals` method calls must use
  `this.internals?.methodName?.()` (double optional chain) — jsdom returns a partial object
  whose methods are `undefined`, so a single `?.` on the object does not prevent the call.
- **io-select combobox mode**: The `options: IoSelectOption[]` prop was removed when custom combobox
  mode was introduced (PR #226). Use slotted `io-option` / `io-optgroup` elements instead.
  The api-surface snapshot was updated to reflect this removal.

## Working Preferences

1. Prefer edits in shared component source over patching generated artifacts.
2. For `io-storefront` examples, optimize for clarity and testability over visual novelty.
3. When reviewing, prioritize:
   - behavioral regressions,
   - accessibility regressions,
   - wrapper mismatch,
   - missing tests.
4. For any recommendation, include file-level pointers and concrete next steps.

## Component Workflow

1. Define or adjust behavior in the Stencil component and tests.
2. Verify wrappers remain compatible.
3. Validate `io-storefront` examples/stories.
4. Execute root quality gates.
5. Summarize risks and follow-up actions.
