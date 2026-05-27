---
mode: agent
description: >
  Full-cycle wave implementation workflow for io-design-system.
  Covers ticket analysis → branch → implement → test → PR → self-review
  → fix loop → high-confidence merge. Invoke with one or more issue numbers.
tools:
  - run_in_terminal
  - read_file
  - file_search
  - grep_search
  - semantic_search
  - replace_string_in_file
  - multi_replace_string_in_file
  - create_file
  - get_errors
  - runTests
  - manage_todo_list
  - vscode_askQuestions
---

# Wave Implementation Prompt — io-design-system

You are a senior Stencil / Next.js developer implementing a wave of tickets for **io-design-system** — an accessibility-first design-system monorepo built on Stencil 4 web components and a Next.js 16 storefront. Follow every phase in order. Do not skip phases. Do not merge without passing the review loop.

---

## INPUTS

Before starting, confirm the following with the user if not already provided:

- **Issue number(s):** Which issue(s) from the wave to implement in this run? (e.g. `#175`, or `#195 #199` for a batch)
- **Base branch:** Default is `main`. Confirm if different.
- **Scope:** `component`, `storefront`, `tokens`, `wrappers`, `chore`, or `all`

---

## PHASE 0 — AGENT INVOCATION

Invoke the following agents in parallel before writing a single line of code. Use their outputs to inform your implementation plan. Do not proceed to Phase 2 until you have read all agent responses.

| Agent | Purpose |
|---|---|
| **Frontend Developer** | Stencil component implementation, Shadow DOM contracts, FACE patterns |
| **Software Architect** | Cross-package design (core → wrappers → storefront), API surface impact |
| **Accessibility Auditor** | WCAG AA compliance, keyboard interaction, focus management, reduced-motion |
| **Code Reviewer** | Convention enforcement, governance gate requirements, test scenario identification |

For tokens-only issues, invoke **Frontend Developer** + **Code Reviewer** only.
For documentation-only issues, invoke **Code Reviewer** + **Technical Writer** only.
For chore/infra issues, invoke **DevOps Automator** + **Code Reviewer** only.

### ⚠️ MANDATORY — Create issues for every bug surfaced by agents

If any Phase 0 agent identifies a bug, security gap, or correctness problem not already tracked as a GitHub issue, **create the issue immediately — before writing any code**:

```bash
gh issue create \
  --repo iodigital-com/io-design-system \
  --title "{type}({scope}): {short description}" \
  --label "bug,wave-{N},{priority}" \
  --body "## Summary\n{what the problem is}\n\n## Impact\n{what goes wrong}\n\n## Fix\n{what needs to change}\n\nTo be closed by this wave's PR."
```

Do not implement a fix without a tracking issue. Every line of code in the PR must map back to a `Closes #N` reference.

---

## PHASE 1 — TICKET ANALYSIS

For each issue number provided:

1. Run: `gh issue view {NUMBER} --repo iodigital-com/io-design-system`
2. Read the full issue body — problem statement, acceptance criteria, blockers, dependencies.
3. Check if any blocking issue is listed and not yet closed:
   ```bash
   gh issue view {BLOCKER_NUMBER} --repo iodigital-com/io-design-system --json state -q .state
   ```
   If a blocker is still `OPEN`, **stop and notify the user**. Do not implement a blocked issue.
4. Pull all referenced files into context using `grep_search` and `read_file`.
5. Identify every file the implementation will touch. List them explicitly.

---

## PHASE 2 — IMPLEMENTATION PLAN

Before touching any file, write your plan as a `manage_todo_list` with specific, file-level tasks. Each todo must name:
- The exact file to change
- What changes (component class, token, CSS, test, storefront page, etc.)
- Whether it has a test that needs updating

**Required plan sections (adapt per issue domain):**

```
[ ] 1. Component source changes       (io-components/src/components/io-{name}/*.tsx, *-styles.ts, *-utils.ts)
[ ] 2. Type definition changes        (io-components/src/components/io-{name}/types.ts)
[ ] 3. Token / CSS changes            (io-components/src/global/app.css)
[ ] 4. Token reconciliation update    (docs/token-runtime-reconciliation.json)
[ ] 5. API snapshot update            (run npm run api:snapshot if props added/removed)
[ ] 6. Storefront page updates        (io-storefront/src/app/components/io-{name}/*.tsx)
[ ] 7. New component registration     (IoTagNames, custom-elements.d.ts, sitemap.ts)
[ ] 8. Test additions                 (*.spec.ts, *.click.spec.ts, *.disabled.spec.ts)
[ ] 9. Wrapper package verification   (io-components-react, -vue, -angular — auto-generated, verify after build)
```

Confirm the plan with the user before proceeding if:
- Any new component is being added (requires 4-step registration)
- Any prop, method, or event is being added or removed from a stable component (breaking change gate)
- Any new `--io-*` CSS custom property is being added to `app.css`
- Any new npm package is required

---

## PHASE 3 — BRANCH

Create a branch following the naming convention:

```
{type}/wave-{WAVE}/issue-{NUMBER}[-{NUMBER}]
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `security`

Examples:
- `fix/wave-j/issue-272`
- `feat/wave-ii/issue-175-199`
- `chore/wave-j/issue-272-273`

```bash
git checkout main && git pull origin main
git checkout -b {type}/wave-{WAVE}/issue-{NUMBER}
```

---

## PHASE 4 — IMPLEMENTATION

Work through each todo in your plan sequentially. Mark each as `in-progress` when you start it, `completed` immediately when done.

**Non-negotiable rules during implementation:**

### Component architecture

- **Token-first**: Never hardcode hex, px, border-radius, or motion values. Always use `var(--io-*)`.
- **Token hierarchy**: Primitive → semantic → consumer API. All tokens defined in `io-components/src/global/app.css`.
- **Shadow DOM boundary**: Only CSS custom properties and slotted content cross the boundary. No JS manipulation from outside the component.
- **Focus rings**: Use `var(--io-focus-ring-active)` set by `initFocusVisible()`. Never hardcode focus colors.
- **IDs**: Generate in `componentWillLoad()`, never in `render()`.
- **No `io`-prefixed custom event names**: Custom events must NOT start with `io`. Enforced by `npm run events:guard`.
- **Arrow and motion**: `var(--io-motion-base)` for transitions. No active press effect (`translateY` must not be added).

### FACE (Form-Associated Custom Elements)

For io-input, io-textarea, io-select, io-checkbox, io-radio:

- `formAssociated: true` in `@Component` decorator
- `@AttachInternals() internals!: ElementInternals`
- **Double optional-chain ALL `internals` method calls**: `this.internals?.setFormValue?.()` — jsdom returns a partial `ElementInternals` with methods as `undefined`; single `?.` on the object does NOT prevent the call and throws
- In tests: `el.internals = { setFormValue: vi.fn(), setValidity: vi.fn(), ... }` assigned manually in `beforeEach`
- **`@State() faceInvalid = false`** must be declared on every FACE component — this reactive state enables re-render when validity changes, required for WCAG 4.1.3
- **`formResetCallback()` must set `this.faceInvalid = false` BEFORE calling `this.syncFormValue()`** — skipping this leaves stale error state visible after `form.reset()` when the restored default value is valid
- **`formResetCallback` must be a plain synchronous method** — never decorated with `@Method()`, never `async`; it is a browser lifecycle hook invoked by the browser, not a Stencil public method

### Dialog focus trap (for `role="dialog"` + `aria-modal="true"` components)

Any component that sets `role="dialog"` and `aria-modal="true"` **must** implement Tab/Shift+Tab focus containment:

```ts
private handlePanelKeyDown = (ev: KeyboardEvent) => {
  if (ev.key !== 'Tab') return;
  const shadow = this.el?.shadowRoot;
  if (!shadow) return;
  const panel = shadow.querySelector<HTMLElement>('.popover__panel'); // adjust selector per component
  if (!panel) return;
  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), ' +
    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector))
    .filter(el => !el.closest('[aria-hidden="true"]'));
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = shadow.activeElement as HTMLElement | null;
  if (ev.shiftKey) {
    if (active === first) { ev.preventDefault(); last.focus(); }
  } else {
    if (active === last) { ev.preventDefault(); first.focus(); }
  }
};
```

Attach via `onKeyDown={this.handlePanelKeyDown}` on the panel element in `render()`. **Not** via `@Listen('keydown', { target: 'window' })` — that handler is for Escape key only and must remain separate.

WCAG criteria requiring focus trap: **2.1.1 Keyboard** (A) + **4.1.2 Name, Role, Value** (A — `aria-modal="true"` asserts containment not implemented).

### Wrapper packages

- `io-components-react`, `io-components-vue`, `io-components-angular` are auto-generated — **never hand-edit**
- After running `npm run build`, verify the generated wrappers include any new props/events

### Token reconciliation

- Every new `--io-*` property added to `app.css` **must** have a matching entry in `docs/token-runtime-reconciliation.json`
- `npm run token-runtime:check` will fail in CI if you forget
- Format: `{ "cssvar": "--io-name", "disposition": "documented", "documentationScope": "app-css-runtime", "notes": "..." }`

### API surface contract

- After any prop/method/event **addition or removal**, run:
  ```bash
  npm run build:components
  npm run api:snapshot
  git add docs/api-surface.json
  ```
- Intentional breaking changes require `CHANGELOG.md` entry

### Code quality

- TypeScript strict mode — no `any` types
- No `console.log` in production code
- Accessibility: keyboard navigation, visible focus, semantic HTML, `aria-*` attributes, reduced-motion

After each file change, verify TypeScript compiles:
```bash
cd <repo-root>
npm run type-check 2>&1 | tail -30
```
Fix type errors before moving to the next file.

---

## PHASE 5 — TESTS

Run existing tests first:

```bash
cd <repo-root>
npm run test 2>&1 | tail -40
```

For issues that add new functionality, write at minimum:
- `io-{name}.spec.ts` — default props, render output, ARIA attributes
- `io-{name}.click.spec.ts` — event emission for user interactions
- `io-{name}.disabled.spec.ts` — disabled-state rendering and blocked interactions
- For utilities: `io-{name}-utils.spec.ts`

Follow the AAA pattern (Arrange → Act → Assert). Test file location:
```
io-components/src/components/io-{name}/io-{name}.spec.ts
io-components/src/components/io-{name}/io-{name}.click.spec.ts
io-components/src/components/io-{name}/io-{name}.disabled.spec.ts
```

For storefront changes, add to:
```
io-storefront/src/app/components/io-{name}/__tests__/
```

---

## PHASE 6 — PRE-PR VERIFICATION

Run the full verification checklist:

```bash
cd <repo-root>

# Governance gate — must pass before any commit
npm run governance:check 2>&1 | tail -20

# Custom event guard
npm run events:guard 2>&1 | tail -10

# Full build (components + wrappers)
npm run build 2>&1 | tail -20

# Tests
npm run test 2>&1 | tail -30

# Type check
npm run type-check 2>&1 | tail -20

# Storefront build
npm run build:storefront 2>&1 | tail -20

# Or all-in-one:
npm run build:quality-gates 2>&1 | tail -40
```

All must pass. Fix any failures before creating the PR.

**If you added or removed a CSS custom property:**
```bash
npm run token-runtime:check 2>&1 | tail -10
```

**If you added or removed a prop/method/event:**
```bash
node scripts/check-api-surface.cjs 2>&1 | tail -10
# If it fails with [prop-added] or [prop-removed], update the snapshot:
npm run build:components && npm run api:snapshot
```

---

## PHASE 7 — CREATE PR

### ⚠️ MANDATORY — Every change must reference a `Closes #N`

Before writing the PR body, verify that every bug, feature, or change in this PR has a corresponding GitHub issue. If any do not:

1. Create the missing issue now (see Phase 0 template)
2. Add `Closes #N` for it in the PR body

Write the PR body to a temp file, then create:

```bash
cat > /tmp/pr-body-{NUMBER}.md << 'EOF'
## Linked Issues
Closes #{NUMBER}
<!-- Add one Closes line per issue. If multiple: -->
<!-- Closes #N1 -->
<!-- Closes #N2 -->

## What changed
- [file]: [what changed]

## Why
[one paragraph — the business/technical reason]

## Acceptance criteria coverage
| AC | Status | Evidence |
|---|---|---|
| [copy each AC from issue] | ✅/❌ | [file:line or test output] |

## Quality gates
- [ ] `npm run governance:check` ✅
- [ ] `npm run events:guard` ✅
- [ ] `npm run build` ✅
- [ ] `npm run test` ✅
- [ ] `npm run type-check` ✅
- [ ] `npm run build:storefront` ✅
- [ ] Token reconciliation updated (if new `--io-*` tokens added)
- [ ] API snapshot updated (if props/methods/events added or removed)

## Guardrail compliance
- [ ] Token-first — no hardcoded hex, px, or radii
- [ ] No `io`-prefixed custom event names
- [ ] FACE double optional-chaining on all `internals` method calls (if applicable)
- [ ] Focus rings use `var(--io-focus-ring-active)` (if applicable)
- [ ] IDs generated in `componentWillLoad()` not `render()` (if applicable)
- [ ] No hand-edits to auto-generated wrapper packages
- [ ] No active press `translateY` effect added
EOF

gh pr create \
  --repo iodigital-com/io-design-system \
  --base main \
  --title "{TYPE}({SCOPE}): {short description}" \
  --body-file /tmp/pr-body-{NUMBER}.md
```

After the PR is created, capture the PR number and request Copilot code review. Copilot reviews automatically on push in this repo, but request it explicitly to guarantee it runs:

```bash
PR_NUMBER=$(gh pr view --repo iodigital-com/io-design-system --json number -q .number)

# Request Copilot as reviewer
gh api \
  --method POST \
  "repos/iodigital-com/io-design-system/pulls/${PR_NUMBER}/requested_reviewers" \
  -f "reviewers[]=copilot"
```

---

## PHASE 8 — SELF-REVIEW

Read your own PR diff:

```bash
gh pr diff {PR_NUMBER} --repo iodigital-com/io-design-system
```

Review against these dimensions:

**Accessibility**
- All interactive elements have keyboard equivalents?
- Focus rings visible via `var(--io-focus-ring-active)`?
- ARIA roles and states correct?
- Reduced-motion respected?

**Token compliance**
- No hardcoded colors, spacing, border-radius, or motion values?
- All new `--io-*` tokens in reconciliation table?
- Token naming follows `io-{category}-{role}[-{modifier}]`?

**Component contracts**
- Props use correct types from `types.ts`?
- Events use correct names (no `io-` prefix)?
- Shadow DOM boundary respected (no direct host manipulation)?

**API surface**
- If props changed: was `npm run api:snapshot` run?
- If breaking change: `CHANGELOG.md` updated?

Write findings as:
```
SELF-REVIEW FINDINGS
1. [ACCESSIBILITY] ...
2. [TOKENS] ...
3. [CONTRACTS] ...
4. [API SURFACE] ...
```

---

## PHASE 9 — REVIEW-FIX LOOP

Merge findings from **all three sources** before fixing anything. Do not start fixing until you have read all three.

| Source | How to fetch |
|---|---|
| Self-review | Phase 8 findings |
| Agent outputs | Phase 0 findings |
| **Copilot code review** | See fetch commands below — **mandatory** |

### Step 9a — Wait for and fetch Copilot findings

Wait for the Copilot code review CI check to complete:

```bash
gh pr checks ${PR_NUMBER} --repo iodigital-com/io-design-system --watch
```

Then fetch all Copilot review comments:

```bash
# High-level verdict and summary comments
gh pr view ${PR_NUMBER} --repo iodigital-com/io-design-system --json reviews \
  --jq '.reviews[] | select(.author.login | ascii_downcase | test("copilot")) | {state, body}'

# Inline file-level comments (specific line findings)
gh api "repos/iodigital-com/io-design-system/pulls/${PR_NUMBER}/comments" \
  --jq '[.[] | select(.user.login | ascii_downcase | test("copilot")) | {path, line, body, id}]'
```

Read every Copilot finding in full. Do not skip any.

### Step 9b — Classify all findings

For every finding from all three sources, classify:

| Category | Disposition |
|---|---|
| Correctness bug, broken contract, wrong API | **must-fix** — fix before merge |
| Accessibility or WCAG violation | **must-fix** — fix before merge |
| Missing `@Watch`, wrong optional-chaining, governance gap | **must-fix** — fix before merge |
| Security issue (XSS, injection, leaking internals) | **must-fix** — fix before merge |
| Style preference, speculative refactor, cosmetic suggestion | **defer** — create follow-up issue, do not block merge |

### Step 9c — Fix all must-fix items

Work through every **must-fix** finding. After each fix batch:

```bash
git add {specific files}
git commit -m "fix({scope}): address Copilot/review findings — {brief description}"
git push origin {BRANCH}
```

Re-run Phase 6 (full quality gate) after every push.

### Step 9d — Respond to Copilot inline comments

After pushing, reply to every Copilot inline comment to confirm resolution. Use the comment ID from Step 9a:

```bash
gh api "repos/iodigital-com/io-design-system/pulls/comments/{COMMENT_ID}/replies" \
  --method POST \
  -f body="Fixed in {COMMIT_SHA}: {one-line explanation of what was changed and why}"
```

For deferred findings, reply with the follow-up issue link:

```bash
-f body="Deferred to #{ISSUE_NUMBER} — not blocking this PR."
```

### Step 9e — Repeat until clean

Re-fetch Copilot comments after each push to confirm no new findings were introduced. If Copilot re-reviews and raises new issues, repeat Steps 9b–9d.

Do not advance to Phase 10 until:
- All **must-fix** findings from all three sources are resolved
- All Copilot inline comments have a reply

---

## PHASE 10 — FINAL REVIEW PASS

**Merge confidence checklist — all must be YES:**

- [ ] Every AC from the issue is implemented and evidenced
- [ ] All self-review findings (Phase 8) addressed or deferred with issue link
- [ ] All Copilot inline comments have a reply (fixed or deferred with issue link)
- [ ] All agent findings (Phase 0) addressed or deferred with issue link
- [ ] All 6 quality gates pass (governance, events:guard, build, test, type-check, build:storefront)
- [ ] Token reconciliation updated (if applicable)
- [ ] API snapshot updated (if applicable)
- [ ] PR body is complete with AC coverage table and guardrail compliance
- [ ] No auto-generated wrapper files hand-edited

If all YES: notify the user that the PR is ready to merge. **After merge, proceed to Phase 11.**

```bash
gh pr comment {PR_NUMBER} \
  --repo iodigital-com/io-design-system \
  --body "Implementation complete. All ACs addressed. Quality gates green. Awaiting merge approval."
```

⚠️ **Do NOT run `gh pr merge`. Leave the merge to the repo owner.**

---

## PHASE 11 — POST-MERGE SYNC

Run this phase immediately after the PR is confirmed merged. Never skip it.

### Step 1 — Sync local main

```bash
git checkout main && git pull origin main
```

### Step 2 — Update AGENTS.md (repo-level AI instructions)

Read `AGENTS.md` and update it with any new patterns, conventions, or guardrails introduced by this PR. **Required triggers:**

| What changed in the PR | What to update in AGENTS.md |
|---|---|
| New FACE pattern or fix | Update / extend **Form-Associated Custom Elements** section |
| New test type or helper | Update **Component File Layout** table + **Tests** convention block |
| New slot pattern | Update **Conventions** — slot change detection rule |
| New token or token rule | Update **Conventions** — token-first section |
| New component method API | Update or add component-specific notes section |
| New release / publish workflow | Update **Changesets** section |
| New CI job or quality gate | Update **Quality Gates** section |
| Any other non-obvious guardrail | Add to **Conventions** or a dedicated section |

Commit the AGENTS.md update with:
```bash
git add AGENTS.md
git commit -m "docs(agents): document {scope} patterns from wave {N} PR #{N}"
```

### Step 3 — Update wave-implementation.prompt.md (this file)

- Mark merged waves as **MERGED** in the Release Roadmap table and the wave's own section header
- Update gates for the next wave (e.g., "Wave I must be merged" → "Wave I ✅ merged")
- If new issues were created during the wave, add them to the relevant sprint plan

### Step 4 — Update session memory

Write or update memory files under `.claude/projects/.../memory/`:

| Memory type | When to write/update |
|---|---|
| **project** — wave-{N}-patterns.md | After every merged wave: capture every non-obvious pattern that caused a CI failure, review rejection, or required deliberate design. Include rule + **Why:** + **How to apply:** |
| **project** — general MEMORY.md | Update Wave History entry; update component file layout if test types changed; update Key Conventions if new rules were added |
| **feedback** | If a review cycle surfaced a systematic mistake (wrong optional-chaining depth, wrong event wiring, etc.) — write a feedback memory so it doesn't repeat |
| **reference** | If a new external resource, dashboard, or doc URL was established during the wave |

Minimum memory update for every merged PR:
1. MEMORY.md — mark wave as MERGED with date
2. MEMORY.md — apply any convention or file-layout changes
3. Create or update `wave-{N}-patterns.md` with any anti-regression patterns discovered

### Step 5 — Update CONTRIBUTING.md (if needed)

If the PR introduced a new required practice for contributors — new test type, new script, new release step — update the matching section in `CONTRIBUTING.md`. Examples:
- New `.face.spec.ts` or `.a11y.spec.ts` requirement → update the Tests section
- New `changeset:add` step → already covered in release section; verify it's still accurate
- New governance check → add to the Quality Gates table

Commit if changed:
```bash
git add CONTRIBUTING.md
git commit -m "docs(contributing): reflect {scope} changes from wave {N} PR #{N}"
```

### Step 6 — Update agency-agents docs (if component API changed)

If any component's public API changed (props, events, methods, slots added/removed), update:
- `docs/agency-agents/curated-io-design-system.json` — component registry entry
- `docs/agency-agents/ADAPTATION_LAYER.md` — if behavioral guardrails changed

Verify drift check still passes:
```bash
npm run governance:check 2>&1 | tail -5
```

### Post-merge sync checklist

- [ ] `git pull origin main` — local main is up-to-date
- [ ] `AGENTS.md` updated with all new patterns and guardrails
- [ ] `wave-implementation.prompt.md` — merged wave marked as MERGED; next-wave gates updated
- [ ] `MEMORY.md` updated (wave entry, layout, conventions)
- [ ] `wave-{N}-patterns.md` created/updated with anti-regression rules
- [ ] `CONTRIBUTING.md` updated if new contributor-facing practices were added
- [ ] `docs/agency-agents/` updated if public component API changed
- [ ] All doc commits pushed to main

---

## PHASE 12 — POST-MERGE RELEASE

Run this phase immediately after Phase 11 sync is complete. It is conditional:

- **Always run:** Steps 1 and 4 (Changesets status check + storefront deploy).
- **Run only when this PR included a changeset:** Steps 2 and 3 (Release PR verification).
- **Run after the Release PR is merged by the repo owner:** Steps 5 and 6 (publish verification + smoke test).
- **Run after Issue #276 is implemented:** Step 7 (GitHub Packages mirror).

---

### Step 1 — Check Changesets release workflow

`release.yml` triggers automatically on every push to `main`. Check its outcome:

```bash
# List the most recent release.yml runs
gh run list --repo iodigital-com/io-design-system \
  --workflow release.yml --limit 5 \
  --json status,conclusion,displayTitle,createdAt \
  --jq '.[] | {conclusion, displayTitle, createdAt}'
```

Two outcomes:

| Outcome | Meaning | What to do |
|---|---|---|
| A **"chore(release): version packages"** PR was opened or updated | Changesets found pending entries. Normal. | Verify the Release PR version bumps (Step 2), then notify the repo owner to merge it when ready. |
| The release workflow **published packages directly** | The Release PR was already open and was just merged. | Skip to Step 5 (verify publish). |

Check whether a Release PR is currently open:

```bash
gh pr list --repo iodigital-com/io-design-system \
  --search "chore(release): version packages in:title" \
  --json number,title,state \
  --jq '.[] | {number, title, state}'
```

---

### Step 2 — Add a changeset (if omitted during development)

> Skip this step if you ran `npm run changeset:add` during Phase 4–6 and the changeset file is already merged with this PR.

A changeset is required whenever a PR changes user-facing behaviour in a published package (`@io-digital/components`, `@io-digital/components-react`, `@io-digital/components-vue`, `@io-digital/components-angular`). If the PR had no changeset, add one to `main` now:

```bash
git checkout main && git pull origin main

npm run changeset:add
```

Select the packages that changed. Bump level guide:

| Change type | Bump level |
|---|---|
| Bug fix, a11y fix, token fix, internal refactor | `patch` |
| New prop, slot, method, event, or new component | `minor` |
| Removed/renamed prop, event, or method; incompatible API change | `major` |

After completing the interactive prompt, commit and push:

```bash
git add .changeset/
git commit -m "chore(changeset): add release entry for #{ISSUE_NUMBER}"
git push origin main
```

This re-triggers `release.yml` and updates the open Release PR.

---

### Step 3 — Verify Release PR version bumps

Fetch the Release PR and confirm that every bumped package and version is expected:

```bash
RELEASE_PR=$(gh pr list --repo iodigital-com/io-design-system \
  --search "chore(release): version packages in:title" \
  --json number -q '.[0].number')

echo "Release PR: #${RELEASE_PR}"

# Preview which packages will be bumped and to which version
npm run changeset:status 2>&1 | tail -30

# Review the diff in the Release PR
gh pr diff ${RELEASE_PR} --repo iodigital-com/io-design-system | \
  grep -E "^\+.*\"version\"" | head -10
```

Confirm:
- Only packages that changed in this wave are bumped.
- `@io-digital/storefront` is **not** in the changeset (it is ignored in `.changeset/config.json`).
- The bump level matches the change type (patch for fixes, minor for new API surface, major for breaking).

⚠️ **Do NOT merge the Release PR yourself.** Leave that to the repo owner. Your job is to verify correctness and notify.

```bash
gh pr comment ${RELEASE_PR} \
  --repo iodigital-com/io-design-system \
  --body "Version bumps verified for wave {N} / PR #{ISSUE_PR_NUMBER}. Correct bump levels confirmed. Ready to merge when repo owner approves."
```

---

### Step 4 — Deploy storefront to Firebase Hosting

Run this step independently of package releases. Deploy whenever `main` has storefront or component source changes. The storefront is a static Next.js export deployed to Firebase project `io-design-system-showcase`.

**Build the release-quality storefront** (builds components → syncs Stencil assets → builds Next.js static export):

```bash
cd <repo-root>
npm run build:storefront:release 2>&1 | tail -30
```

**Verify the output is complete before deploying:**

```bash
# These files must exist — if any are missing, the build failed
test -f io-storefront/out/index.html \
  && test -d io-storefront/out/_next \
  && test -f io-storefront/out/stencil/io-components.esm.js \
  && echo "✅ Build output verified" \
  || echo "❌ Build output incomplete — fix build errors before deploying"
```

**Deploy to Firebase Hosting** (run from the `io-storefront/` directory where `.firebaserc` and `firebase.json` live):

```bash
cd io-storefront
firebase deploy --only hosting
```

If Firebase CLI is not authenticated, authenticate first:

```bash
# Interactive login (for local dev)
firebase login

# Or for headless/CI environments
firebase login --no-localhost
```

**Verify the live site** after deploy completes:

```bash
# Firebase Hosting preview URL (always available)
open https://io-design-system-showcase.web.app

# Custom domain (once DNS mapping is active)
open https://io-design-system.iodigital.com
```

Confirm: the deployed site renders the correct component version number in the footer or component API pages. If a new component was added this wave, navigate to its storefront page to confirm it renders.

#### CI automation for storefront deploy

To automate storefront deploys after merge to `main`, create `.github/workflows/deploy-storefront.yml`. This requires the `FIREBASE_SERVICE_ACCOUNT_IO_DESIGN_SYSTEM_SHOWCASE` secret configured in GitHub repo settings (Settings → Secrets → Actions → New repository secret, value from: Firebase Console → Project Settings → Service accounts → Generate new private key).

```yaml
name: Deploy Storefront

on:
  push:
    branches: [main]
    paths:
      - 'io-storefront/**'
      - 'io-components/src/**'
      - 'scripts/sync-stencil-assets.cjs'
      - 'scripts/sync-stencil-types.cjs'

concurrency:
  group: deploy-storefront
  cancel-in-progress: true   # newest main push wins; abort stale in-flight deploys

jobs:
  deploy:
    name: Build and deploy storefront
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write   # for provenance / OIDC if needed later

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build storefront (components + asset sync + Next.js static export)
        run: npm run build:storefront:release

      - name: Verify build output
        run: |
          test -f io-storefront/out/index.html \
            && test -f io-storefront/out/stencil/io-components.esm.js \
            || { echo "Build output missing"; exit 1; }

      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_IO_DESIGN_SYSTEM_SHOWCASE }}
          projectId: io-design-system-showcase
          entryPoint: ./io-storefront
          channelId: live
```

---

### Step 5 — Verify package publish (post Release PR merge)

After the repo owner merges the Release PR, `release.yml` runs `npx changeset publish`, which publishes all bumped packages to the GitHub Packages registry (`https://npm.pkg.github.com`).

Verify the release workflow succeeded:

```bash
# Wait for and watch the release.yml run triggered by the Release PR merge
gh run list --repo iodigital-com/io-design-system \
  --workflow release.yml --limit 3 \
  --json status,conclusion,displayTitle,createdAt \
  --jq '.[] | {conclusion, displayTitle, createdAt}'
```

Confirm each bumped package is live. Replace `x.y.z` with the version from the Release PR:

```bash
RELEASED_VERSION="x.y.z"   # e.g. 2.1.2

for pkg in \
  "@io-digital/components" \
  "@io-digital/components-react" \
  "@io-digital/components-vue" \
  "@io-digital/components-angular"; do
  result=$(npm view "${pkg}@${RELEASED_VERSION}" version \
    --registry https://npm.pkg.github.com 2>/dev/null)
  if [ "$result" = "$RELEASED_VERSION" ]; then
    echo "✅ ${pkg}@${RELEASED_VERSION}"
  else
    echo "❌ ${pkg}@${RELEASED_VERSION} — NOT FOUND (got: ${result:-empty})"
  fi
done
```

---

### Step 6 — Smoke-test the published package

Install the just-published `@io-digital/components` in a clean temporary directory to verify the package is complete and importable:

```bash
RELEASED_VERSION="x.y.z"   # replace with the released version

SMOKE_DIR=$(mktemp -d)
cd "${SMOKE_DIR}"
npm init -y

# Configure @io-digital scoped registry to GitHub Packages
cat > .npmrc << 'EOF'
@io-digital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
EOF

# Install the just-published core package
npm install "@io-digital/components@${RELEASED_VERSION}"

# Verify key exports and version integrity
node -e "
const loaderPath  = require.resolve('@io-digital/components/loader');
const mainPath    = require.resolve('@io-digital/components');
const pkgJson     = require('@io-digital/components/package.json');
const expected    = '${RELEASED_VERSION}';

console.log('✅ Main entry:  ', mainPath);
console.log('✅ Loader entry:', loaderPath);

if (pkgJson.version === expected) {
  console.log('✅ Version:     ', pkgJson.version);
} else {
  console.error('❌ Version mismatch: got', pkgJson.version, 'expected', expected);
  process.exit(1);
}
"

# Clean up
cd - && rm -rf "${SMOKE_DIR}"
```

---

### Step 7 — Mirror to GitHub Packages (Issue #276 dual-registry)

> **Prerequisite — Issue #276 must be implemented first.** Skip this step until the dual-registry configuration is in place. See "Issue #276 implementation notes" below for exact changes required.

After the primary publish to npmjs.com succeeds (Step 5), push the release tags that trigger `release-packages.yml` to mirror to GitHub Packages. Only push tags for packages that were actually bumped in this release:

```bash
RELEASED_VERSION="x.y.z"   # replace with the released version

# Check which packages were bumped in this release
npm run changeset:status 2>&1

# Push the release tags for each bumped package.
# release-packages.yml fires on push of: release/components/v*, release/components-react/v*, etc.
# These tags must target a protected main-branch commit; the workflow enforces this.

git tag "release/components/v${RELEASED_VERSION}"
git push origin "release/components/v${RELEASED_VERSION}"

# Repeat for each other bumped package:
git tag "release/components-react/v${RELEASED_VERSION}"
git push origin "release/components-react/v${RELEASED_VERSION}"

git tag "release/components-vue/v${RELEASED_VERSION}"
git push origin "release/components-vue/v${RELEASED_VERSION}"

git tag "release/components-angular/v${RELEASED_VERSION}"
git push origin "release/components-angular/v${RELEASED_VERSION}"
```

Verify `release-packages.yml` ran and the packages are on GitHub Packages:

```bash
gh run list --repo iodigital-com/io-design-system \
  --workflow release-packages.yml --limit 8 \
  --json status,conclusion,displayTitle \
  --jq '.[] | {conclusion, displayTitle}'
```

---

### Issue #276 implementation notes — chore(publishing): dual-registry config

These are the exact changes needed to implement Issue #276. Do not apply them until the issue is being actioned.

#### 1. `.npmrc` (repo root) — add auth token entries for both registries

```
# .npmrc
# @io-digital packages: npm for consumers; GitHub Packages as mirror
@io-digital:registry=https://registry.npmjs.org
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Note: changing `@io-digital:registry` from `npm.pkg.github.com` to `registry.npmjs.org` means consumers who install via npm no longer need a GitHub token. This is the desired end state.

#### 2. `publishConfig` in all four package.json files — point primary to npmjs.com

Change in `io-components/package.json`, `io-components-react/package.json`, `io-components-vue/package.json`, `io-components-angular/package.json`:

```json
"publishConfig": {
  "access": "public",
  "registry": "https://registry.npmjs.org",
  "provenance": true
}
```

#### 3. `.github/workflows/release.yml` — point Changesets to npmjs.com

Replace the `setup-node` registry-url and `NODE_AUTH_TOKEN`:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
    registry-url: 'https://registry.npmjs.org'   # changed from npm.pkg.github.com
    scope: '@io-digital'

- name: Create Release PR or publish
  uses: changesets/action@v1
  with:
    publish: npx changeset publish
    version: npm run changeset:version
    title: 'chore(release): version packages'
    commit: 'chore(release): version packages'
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}   # changed from secrets.GITHUB_TOKEN
```

The `release-packages.yml` workflow (GitHub Packages mirror via tags) stays unchanged — it already uses `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` pointing to `npm.pkg.github.com`.

#### 4. GitHub Actions secrets required

| Secret name | Where to get it | Purpose |
|---|---|---|
| `NPM_TOKEN` | npmjs.com → Account → Access Tokens → Generate New Token → Automation | Publishes to npmjs.com from `release.yml` |
| `GITHUB_TOKEN` | Auto-provided by GitHub Actions | Already configured; used by `release-packages.yml` for GitHub Packages |

Add `NPM_TOKEN` at: GitHub repo → Settings → Secrets and variables → Actions → New repository secret.

---

### Phase 12 checklist

- [ ] `release.yml` outcome confirmed — Release PR opened or packages already published
- [ ] Changeset committed to `main` (if PR had user-facing changes and none was added during dev)
- [ ] `npm run changeset:status` — version bumps verified correct; no unexpected packages bumped
- [ ] Release PR comment posted notifying repo owner it is ready for merge
- [ ] `npm run build:storefront:release` — completed with no errors
- [ ] `io-storefront/out/index.html` and `io-storefront/out/stencil/io-components.esm.js` exist
- [ ] Storefront deployed: `cd io-storefront && firebase deploy --only hosting`
- [ ] Live site verified at `https://io-design-system-showcase.web.app`
- [ ] (Post Release PR merge) All bumped packages verified on GitHub Packages registry
- [ ] (Post Release PR merge) Smoke test passed for `@io-digital/components`
- [ ] (Post Issue #276) `release-packages.yml` tags pushed; GitHub Packages mirror verified

---

## WAVE PHASING REFERENCE

### Release Roadmap

| Wave | GitHub Label | Description | Status | Gate |
|------|-------------|-------------|--------|------|
| **Wave I** | `wave-i` | FACE forms, io-modal methods, io-input slots, axe-core a11y, Changesets | ✅ **MERGED** (#264, 2026-05-23) | — |
| **Wave J** | `wave-j` | Audit remediation — 41 issues: CI health, P1 token+FACE bugs, a11y, docs, tests, stable promotions | 🔴 **Active** — 24-PR sprint, J-01 CI gate first | Immediate |
| **Wave II** | `wave-ii` | Dark mode tokens, io-toast positions, io-tabs slots, FACE reset/:invalid | 🟡 **Unblocked** (Wave I merged); #228 unblocked | After J P1s |
| **Wave III** | `wave-iii` | Docs: CSS overrides API, token explorer, CONTRIBUTING.md, wrapper READMEs | 🟢 **Parallel-safe** | Any time |
| **Wave IV** | `wave-iv` | New components: io-skeleton, io-progress, io-breadcrumb, io-avatar | 🟡 **Unblocked** (Wave I merged) | After J P1s |
| **Wave V** | `wave-v` | New components: io-drawer, io-file-upload (P1), io-stepper | ⏳ Blocked on Wave II | Wave II merged |
| **Wave VI** | `wave-vi` | Storefront UX: /designing, docs, migration guide; #196 blocked on #228 | 🟢 Mostly parallel-safe | Any time; #196 after #228 |

---

### Wave I — FACE + Changesets + a11y infra (PR #264)

**GitHub label:** `wave-i`
**Status:** ✅ MERGED 2026-05-23
**Gate:** Unlocks Wave II and Wave IV.

| # | Title | Priority |
|---|---|---|
| #164 | feat(io-modal): add programmatic `show()` / `close()` `@Methods` | P1 |
| #165 | feat(io-input): add readonly prop and prefix/suffix icon slots | P1 |
| #166 | feat(forms): FACE across all form components | P1 |
| #168 | test(accessibility): integrate axe-core automated WCAG AA testing in Vitest | P1 |
| #169 | chore(release): add Changesets for automated versioning and changelog | P1 |
| #230 | fix(a11y): systematic WCAG 1.4.11 non-text contrast audit | P1 |

**Notes:**
- `io-modal` methods: `show()` and `close()` — NOT `open()` (TypeScript duplicate identifier with `@Prop() open`)
- FACE: double optional-chain all `internals` method calls — see guardrails in Phase 4
- axe-core: `vitest-axe`, `renderAndCheckA11y()` helper, `*.a11y.spec.ts` per component

---

### Wave II — Dark Mode + io-toast + io-tabs

**GitHub label:** `wave-ii`
**Gate:** Wave I merged ✅ — unblocked. Start after Wave J P1s are cleared.

| # | Title | Priority | Status |
|---|---|---|---|
| #175 | feat(tokens): dark mode token overrides across all 18 components | P1 | Ready |
| #228 | fix(io-checkbox/io-radio): complete FACE — form reset + :invalid support | P1 | ✅ MERGED (#290, 2026-05-23) |
| #195 | feat(io-toast): position prop (6 positions) + persistent variant | P2 | Ready |
| #199 | feat(io-tabs): icon slot and badge slot for io-tab-item | P2 | Ready |

**Notes on #228:** Wave I delivered basic FACE (formAssociated + syncFormValue + required validity). #228 adds the remaining work: `form.reset()` event handling and `:invalid` CSS pseudo-class support for io-checkbox and io-radio.

**Batching rules:**
- #175 — standalone; touches all component style files + new dark-mode token set
- #228 — standalone; targeted FACE completion
- #195 + #199 — safe to batch (different components, no shared files)

---

### Wave III — Documentation & Token APIs

**GitHub label:** `wave-iii`
**Gate:** Parallel-safe — can start any time after Wave I.

| # | Title | Priority |
|---|---|---|
| #154 | docs(repo): update README + issue templates | P2 |
| #179 | docs(storefront): CSS custom properties section on all 17 API pages | P2 |
| #187 | feat(storefront): design token explorer — searchable, filterable, copyable | P2 |
| #207 | docs(contributing): token naming, governance scripts, PR checklist | P2 |
| #219 | refactor(tokens): document public vs. internal CSS override API | P2 |
| #235 | docs(wrappers): standalone README for React, Vue, Angular packages | P2 |

**Batching rules:**
- #154 + #207 — both are docs-only changes, batch safely
- #179 — touches 17 storefront pages; implement as one PR with a script if possible
- #187 — new storefront page; standalone
- #219 + #235 — both docs; can batch if small

---

### Wave IV — New Components (First Batch)

**GitHub label:** `wave-iv`
**Gate:** Wave I must be merged (axe-core a11y infra needed for new components).

| # | Title | Priority |
|---|---|---|
| #171 | feat(io-skeleton): skeleton loading placeholder | P2 |
| #172 | feat(io-progress): linear progress bar | P2 |
| #173 | feat(io-breadcrumb): breadcrumb navigation | P2 |
| #174 | feat(io-avatar): avatar with initials fallback + image support | P2 |
| #180 | docs(storefront): cross-component composition pattern examples page | P2 |
| #184 | feat(storefront): shareable URL state for component configurator | P2 |

**New component checklist (4 required steps):**
1. Create `io-components/src/components/io-{name}/` with all required files
2. Create `io-storefront/src/app/components/io-{name}/` with all 5 tab pages
3. Register in `IoTagNames` union + `custom-elements.d.ts`
4. Add to `sitemap.ts` alphabetically (only after all 5 tab pages exist)

**Batching rules:**
- Each new component is a standalone PR — never batch new components together
- #180 + #184 — storefront-only changes, safe to batch

---

### Wave V — New Components (Second Batch)

**GitHub label:** `wave-v`
**Gate:** Wave II must be merged (dark mode required for new component theming).

| # | Title | Priority |
|---|---|---|
| #170 | feat(io-drawer): slide-out drawer overlay | P2 |
| #197 | feat(io-file-upload): drag-and-drop file upload with validation | P1 |
| #198 | feat(io-stepper): multi-step process indicator | P2 |

**Notes:**
- Each is a standalone PR — never batch new components
- #197 io-file-upload is P1 (accessibility and UX critical)

---

### Wave VI — Storefront UX & Content

**GitHub label:** `wave-vi`
**Gate:** Parallel-safe — can start any time.

| # | Title | Priority |
|---|---|---|
| #155 | storefront(/designing): redesign as brand-asset gateway | P2 |
| #196 | feat(architecture): compound components — io-form-field, io-radio-group, io-checkbox-group | P2 | ⚠️ `blocked` (depends on Wave II FACE) |
| #208 | docs(storefront/developing): document stories.ts interactive demo strategy | P2 |
| #209 | docs(storefront/developing): migration guide from MUI, Ant, Bootstrap | P2 |
| #210 | docs(storefront/components): improve io-spinner and io-carousel examples | P2 |

**Batching rules:**
- #208 + #209 — both storefront/developing docs, safe to batch
- #155 — standalone; significant page redesign
- #196 — blocked; do not start until Wave II FACE (#228) is merged

---

### Wave J — Audit Remediation (2026-05-27 Updated)

**GitHub label:** `wave-j`  
**Source:** Full-depth end-to-end audit 2026-05-27 — 41 open issues  
**Post-audit readiness score:** 7.5 / 10  

> **Authoritative sprint plan:** see [WAVE J — SPRINT PLAN (2026-05-27 audit)](#wave-j--sprint-plan-2026-05-27-audit) for the full 41-issue tracker, 24-PR batching table, merge sequence, and exit criteria.

#### All Wave J Issues (41 total)

| # | Title | Type | Effort | Priority |
|---|---|---|---|---|
| #455 | fix(ci): type-check crashes on stale `.next/types` | fix | XS | 🔴 P0 — CI blocker |
| #265 | fix(governance): block io-* events from events guard bypass | fix | XS | 🔴 P1 |
| #268 | fix(a11y): io-tag remove control contextual + 44px target | fix | S | 🔴 P1 |
| #272 | chore(git): untrack `.claude/` from git history | chore | XS | 🔴 P1 |
| #452 | fix(io-switch): thumb shadow uses hardcoded value not token | fix | S | 🔴 P1 |
| #453 | fix(io-switch): formResetCallback does not clear faceInvalid | fix | XS | 🔴 P1 |
| #454 | fix: hardcoded hex fallbacks in io-multi-select + io-text var() | fix | S | 🔴 P1 |
| #456 | fix(io-heading): console.warn fires on every render cycle | fix | XS | 🟡 P2 |
| #457 | chore(io-heading): tag prop — keep optional at beta, defer required to stable | chore | XS | 🟡 P2 |
| #458 | fix(io-alert): focus ring uses outline not box-shadow | fix | XS | 🟡 P2 |
| #459 | fix(io-alert): transition uses hardcoded 0.15s ease | fix | XS | 🟡 P2 |
| #460 | fix(io-switch): remove extraneous componentWillLoad console.warn | fix | XS | 🟡 P2 |
| #461 | design-gate: io-pin-code — should `warning` stay in variant API? | design | — | 💬 Gate A |
| #462 | fix(io-popover): label required + componentWillLoad warning | fix | S | 🟡 P2 |
| #463 | fix(io-carousel): rename private `scrollLeft` — shadows HTMLElement | fix | XS | 🟡 P2 |
| #464 | design-gate: align error/errorMessage API across beta components | design | M | 💬 Gate B |
| #465 | docs(api-surface.json): add 6 Wave XI beta components | docs | S | 🟡 P2 |
| #466 | docs(public-css-api.json): register missing beta component tokens | docs | S | 🟡 P2 |
| #467 | docs: component count shows 22/19 should be 37 | docs | XS | 🟡 P2 |
| #468 | docs: stability doc claims io-form-field pages exist (false) | docs | XS | 🟡 P2 |
| #469 | docs(io-carousel): storefront API page missing slot docs | docs | S | 🟡 P2 |
| #470 | docs(storefront): configurator propDefinitions missing for 3 components | docs | S | 🟡 P2 |
| #471 | docs(io-text/io-heading): examples pages sparse | docs | S | 🟡 P2 |
| #472 | docs(io-pin-code): usage page incomplete + wrong primitive import | docs | M | 🟡 P2 |
| #269 | test(io-button-group): render + disabled-state coverage | test | S | 🟡 P2 |
| #274 | test(io-divider): click + disabled-state spec coverage | test | XS | 🟡 P2 |
| #275 | chore: delete app.json Expo artifact | chore | XS | 🟡 P2 |
| #276 | chore(publishing): GitHub Packages .npmrc config | chore | S | 🟡 P2 |
| #278 | chore(storefront): next-env.d.ts + pin Next.js version | chore | XS | 🟡 P2 |
| #473 | a11y(io-alert): dismiss button accessible name not unique | a11y | XS | 🟡 P3 |
| #474 | test(io-tabs-bar): event tests in wrong spec file | test | XS | 🟡 P3 |
| #475 | a11y(io-switch): redundant aria-checked on host | a11y | XS | 🟡 P3 |
| #476 | a11y(io-multi-select): "Clear all" name not unique per instance | a11y | XS | 🟡 P3 |
| #477 | docs(io-text): missing datetime prop WCAG note | docs | S | 🟡 P3 |
| #478 | docs(io-tabs-bar): aria-controls compliance not documented | docs | XS | 🟡 P3 |
| #479 | docs(io-popover): dismiss event JSDoc missing | docs | XS | 🟡 P3 |
| #480 | chore: close resolved issues #266 #267 #273 | chore | XS | 🟡 P3 |
| #481 | chore: promote io-tabs-bar to stable | chore | XS | 🟡 P3 |
| #483 | fix(io-popover): focus trap — Tab escapes open dialog (WCAG 2.1.1) | fix | S | 🔴 P2 (blocks stable) |
| #484 | fix(io-multi-select): grouped options role=group+aria-labelledby (WCAG 1.3.1) | fix | M | 🔴 P2 (blocks stable) |
| #271 | feat(theme): light/dark theme switching + full palette | feat | L | 🔵 Deferred / Wave K |

> ~~#266 #267 #273 #277~~ — all resolved/closed. Do not reopen.

---

### Needs-Spec / Future Backlog

These issues require design specification or architectural decision before implementation:

| # | Title | Labels |
|---|---|---|
| #152 | feat(io-wordmark): wordmark component | needs-spec |
| #192 | feat(tokens): multi-brand theming CSS layer API | needs-spec |
| #193 | feat(ssr): SSR/SSG Stencil Hydrate + Next.js dynamic imports | needs-spec |
| #218 | chore(tokens): Figma → token → code CI pipeline | needs-spec |
| #220 | feat(tokens): component density system (compact/default/comfortable) | needs-spec |
| #221 | feat(tokens): gradient token system | needs-spec |
| #233 | feat(io-table): accessible data table with sort + row selection | needs-spec |

Do not implement needs-spec issues until a design doc is approved and the issue is relabelled.

---

### Branch Naming Convention

Pattern: `{type}/wave-{N}/issue-{M}` or `{type}/wave-{N}/issue-{M}-{M2}` for batches.

**Types:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `security`

**Wave identifiers:** `wave-i`, `wave-ii`, `wave-iii`, `wave-iv`, `wave-v`, `wave-vi`, `wave-j`

Examples:
```bash
feat/wave-i/issue-164                 # io-modal show/close methods
feat/wave-iv/issue-171                # io-skeleton component (standalone)
fix/wave-ii/issue-175                 # dark mode tokens
fix/wave-j/issue-455                  # CI gate unblock (P0 — merge first)
fix/wave-j/issue-452-453-460          # io-switch P1 batch
fix/wave-j/issue-462-483              # io-popover label + focus trap
test/wave-j/issue-269-274             # test coverage batch
```

**Batching rules:**
- P1 / security issues — one PR each, never batch across priority levels
- New components — always standalone, never batched with other components
- Documentation-only changes — safe to batch across issues
- Test-only changes — safe to batch if they touch different components
- Chore/infra changes — batch if they share a CI run (e.g., git cleanup + snapshot)
- Never batch changes that touch the same file (risk of merge conflict)

Always check blocker status (Phase 1, step 3) before starting any issue.

---

### Quality Gate Commands Reference

```bash
# Individual gates
npm run governance:check          # Validate workspace invariants (run first — fast)
npm run events:guard              # Guard against io-prefixed event names
npm run token-runtime:check       # Verify all CSS vars are in reconciliation table
npm run build                     # Components + all wrappers
npm run test                      # Vitest (components + storefront)
npm run type-check                # Storefront TypeScript (tsc --noEmit)
npm run build:storefront          # Next.js full build + Lighthouse CI

# All-in-one
npm run build:quality-gates       # Full CI pipeline locally

# API surface
node scripts/check-api-surface.cjs   # Check for breaking prop changes
npm run api:snapshot               # Update snapshot after intentional changes
```

### Governance Rules (enforced by `npm run governance:check`)

1. `.claude/` is excluded from the deprecated-paths check (Claude Code CLI tooling). Do NOT add it to `requirePathAbsent()`.
2. `docs/agency-agents/README.md` must contain "CI is active" language (not "CI is intentionally disabled").
3. All package.json scripts must include the required governance sub-commands.
4. Curated agent manifests must match their expected agent counts (9 Claude, 12 Copilot, 14 Copilot-extended).

### CI Pipeline Summary (`.github/workflows/pr.yml`)

```
governance ─────────────────────────────────────────────────────┐
api-contract ───────────────────────────────────────────────────┤
                                                                 ▼
                              test ──────────────────────────── storefront (Lighthouse CI)
                              size-limit ─────────────────────┘
                              type-check ─────────────────────┘
                              security-audit ──────────────────┘
```

All 7 jobs must be green before merge.

---

## WAVE J — SPRINT PLAN (2026-05-27 audit)

> Use this section when implementing Wave J issues. Reference it to determine correct branch name, which issues to batch, and which gates must resolve before a PR can start.

### Step 0 — Verify untracked issues already filed

The following issues were created on 2026-05-27 during the agent audit phase. **Do not re-create them.**

| Scope | Title | GitHub # |
|-------|-------|----------|
| io-popover focus trap | fix(io-popover): missing focus trap — Tab escapes open dialog (WCAG 2.1.1) | **#483** |
| io-multi-select grouped options | fix(io-multi-select): grouped options use role=presentation — replace with role=group + aria-labelledby (WCAG 1.3.1) | **#484** |

Verify both issues are open before proceeding:

```bash
gh issue view 483 --repo iodigital-com/io-design-system --json state -q .state
gh issue view 484 --repo iodigital-com/io-design-system --json state -q .state
```

---

### Design Decision Gates (async — resolve before Phase 4 PRs)

These are not PRs. They produce a written decision recorded in `docs/DECISIONS.md` and the issue comment.

**Gate A — Issue #461: Should `'warning'` remain in `io-pin-code` variant API?**

Resolution process:
1. Lead maintainer: does any storefront example or documented use case require `'warning'` as a distinct state separate from `error`?
2. Check `io-pin-code.tsx` for any `'warning'`-specific rendering branch.
3. Options: (a) Keep — add explicit JSDoc semantics; (b) Remove before API lock; (c) Rename to `'caution'`.
4. Record outcome in `docs/DECISIONS.md` → `## Wave J — io-pin-code warning state`.
5. Close #461 with `resolution/accepted` or `resolution/wont-fix`.

Unblocks: Gate B and PR J-11.

**Gate B — Issue #464: Align `error`/`errorMessage` prop API**

Resolution process (depends on Gate A):
1. Reference AGENTS.md standard: `@Prop({ reflect: true }) error = false` + `@Prop() errorMessage: string | undefined`.
2. Diff `io-pin-code.tsx` and `io-multi-select.tsx` current props against the standard.
3. If Gate A kept `'warning'`, decide whether `error` stays `boolean` or becomes a union.
4. Map exact prop rename/add/remove operations for each component.
5. Record in `docs/DECISIONS.md` and close #464 after J-11 merges.

---

### PR Batching Table

| PR | Branch | Issues | Description | Effort | Phase | Gates / Merge Dependencies |
|----|--------|--------|-------------|--------|-------|---------------------------|
| **J-01** | `fix/wave-j/issue-455` | #455 | ci: fix stale `.next/types` breaking type-check quality gate | XS | **0 — merge first** | None. Must merge before CI run results are trustworthy. |
| **J-02** | `fix/wave-j/issue-265` | #265 | governance: block `io-*` event names from `events:guard` bypass | XS | **0** | Independent; parallel with J-01. |
| **J-03** | `chore/wave-j/issue-272` | #272 | git: untrack `.claude/` + `.gitignore` entry | XS | **0** | Independent; `git rm --cached` only. |
| **J-04** | `fix/wave-j/issue-452-453-460` | #452, #453, #460 | io-switch: token thumb shadow + FACE reset clears `faceInvalid` + remove `componentWillLoad` warn | S | **1** | J-01 CI green. `#452` → `io-switch-styles.ts`; `#453`+`#460` → `io-switch.tsx` — no same-file conflict. |
| **J-05** | `fix/wave-j/issue-454` | #454 | io-multi-select + io-text: remove hardcoded hex fallbacks in `var()` | S | **1** | J-01. Two different style files — no conflict. |
| **J-06** | `fix/wave-j/issue-268` | #268 | a11y(io-tag): contextual remove-button label + 44 × 44 px touch target | S | **1** | J-01. Standalone component. |
| **J-07** | `fix/wave-j/issue-456-457` | #456, #457 | io-heading: fix render-cycle `console.warn` + make `tag` required pre-stable | S | **2** | J-01. `#457` is a breaking change — run `npm run api:snapshot` after. Same component, non-overlapping lines. |
| **J-08** | `fix/wave-j/issue-458-459` | #458, #459 | io-alert: focus ring `outline` → `box-shadow` + `0.15s ease` → `var(--io-motion-fast)` | XS | **2** | J-01. Both changes in `io-alert-styles.ts` only. |
| **J-09** | `fix/wave-j/issue-462` | #462 | io-popover: `componentWillLoad` runtime warning when `label` missing (WCAG 4.1.2) | XS | **2** | J-01. Standalone; companion to J-12. |
| **J-10** | `fix/wave-j/issue-463` | #463 | io-carousel: rename private `scrollLeft` field — shadows `HTMLElement.scrollLeft` | XS | **2** | J-01. Single-file rename in `io-carousel.tsx`. |
| **J-11** | `fix/wave-j/issue-464-476-484` | #464, #476, #484 | io-pin-code + io-multi-select: align error/errorMessage API + "Clear all" unique name + grouped options `role="group"+aria-labelledby` | M | **4 — post-Gate B** | Gate A + Gate B resolved. Bundles #476 and #484 (both inside `io-multi-select.tsx`). Run `npm run api:snapshot`. |
| **J-12** | `fix/wave-j/issue-483` | #483 | io-popover: Tab/Shift-Tab focus trap while open (see focus trap pattern in Phase 4) | S | **4** | J-09 merged (label warning lands first). Standalone — too significant to bundle with #462. |
| **J-13** | `docs/wave-j/issue-465-466` | #465, #466 | docs: add 6 beta components to `api-surface.json` + missing tokens in `public-css-api.json` | S | **5** | J-04, J-05, J-07, J-08, J-11 all merged (API surface stable). |
| **J-14** | `docs/wave-j/issue-467-468` | #467, #468 | docs: component count 22/19 → 37 in README + `page.tsx` + fix false io-form-field storefront claim | XS | **5** | J-11 merged (count correct once io-pin-code API is stable). |
| **J-15** | `docs/wave-j/issue-469-470` | #469, #470 | docs: io-carousel API page slot docs + configurator `propDefinitions` for 3 beta components | S | **5** | J-10, J-11. |
| **J-16** | `docs/wave-j/issue-471-472` | #471, #472 | docs: io-text + io-heading examples (≥ 3 each) + io-pin-code usage page + correct primitive import | M | **5** | J-07 (io-heading `tag` required), J-11 (io-pin-code API stable). |
| **J-17** | `test/wave-j/issue-269-274` | #269, #274 | tests: io-button-group render + disabled-state + io-divider click + disabled-state specs | S | **3** | J-01. No component changes — safe to run in parallel with Phase 2. |
| **J-18** | `fix/wave-j/issue-473` | #473 | a11y(io-alert): unique accessible name on dismiss button | XS | **3** | J-08 merged first (same `io-alert.tsx` file). |
| **J-19** | `fix/wave-j/issue-475` | #475 | a11y(io-switch): remove redundant `aria-checked` (`role=switch` carries it natively) | XS | **3** | J-04 merged first (same `io-switch.tsx` file). |
| **J-20** | `test/wave-j/issue-474-481` | #474, #481 | io-tabs-bar: add `click.spec.ts` + promote to stable + update `component-stability-recommendations.md` | S | **3** | J-01. Tests must pass before `stable` label applies. |
| **J-21** | `docs/wave-j/issue-477-479` | #477, #478, #479 | docs: io-text `datetime` WCAG note + io-tabs-bar `aria-controls` consumer doc + io-popover dismiss JSDoc | S | **6** | J-09 (popover), J-20 (tabs-bar stable). |
| **J-22** | `chore/wave-j/issue-275-276` | #275, #276 | chore: delete `app.json` Expo artifact + GitHub Packages `publishConfig` + `.npmrc` | XS | **Any** | Independent. |
| **J-23** | `chore/wave-j/issue-480` | #480 | chore: close resolved issues #266, #267, #273 via `gh issue close`; verify #277 + #278 already closed | XS | **Any** | No code changes. #277 + #278 were closed before this audit — confirm via `gh issue view 277 278`. |
| **J-24** | `feat/wave-j/issue-271` | #271 | feat(theme): full light/dark mode palette + theme-switching | L | **Deferred** | All others merged. Recommend Wave K Issue 1 or standalone sprint. Must be explicitly scoped — not silently carried over. |

---

### Merge Sequence

```
Phase 0 — prerequisites (J-01, J-02, J-03 in parallel)
  J-01 ── CI unblock
  J-02 ── Events guard
  J-03 ── Git hygiene

Phase 1 — P1 bugs (after J-01; J-04/J-05/J-06 in parallel)
  J-01 ──> J-04, J-05, J-06

Phase 2 — P2 component fixes (after J-01; J-07/J-08/J-09/J-10 in parallel)
  J-01 ──> J-07, J-08, J-09, J-10
  J-01 ──> J-17              (tests, no component dep)
  J-01 ──> J-20              (tabs-bar, no component dep)
  J-08 ──> J-18              (io-alert same file)
  J-04 ──> J-19              (io-switch same file)

Phase 2 (async, not code)
  resolve Gate A (#461) ──> resolve Gate B (#464)

Phase 4 — post-design-gate
  Gate B  ──> J-11           (io-pin-code + io-multi-select error API)
  J-09    ──> J-12           (io-popover focus trap #483)

Phase 5 — docs (wait for API surface stable)
  J-04, J-05, J-07, J-08, J-11 ──> J-13
  J-11                           ──> J-14
  J-10, J-11                     ──> J-15
  J-07, J-11                     ──> J-16

Phase 6 — remaining docs
  J-09, J-20 ──> J-21

Phase 7 — chores (any time)
  J-22, J-23

Phase 8 — deferred (all others → J-24 or Wave K)
```

---

### Wave J Exit Criteria

**P1 — all must be green:**
- [ ] `npm run build:quality-gates` passes on `main` with no type-check failures (J-01)
- [ ] `npm run events:guard` catches `io-`-prefixed event names in CI (J-02)
- [ ] `.claude/` untracked and in `.gitignore` (J-03)
- [ ] `io-switch` thumb shadow uses `var(--io-*)`, `formResetCallback` resets `faceInvalid`, no `componentWillLoad` warn (J-04)
- [ ] `io-multi-select` and `io-text` have zero hardcoded hex in `var()` fallback positions (J-05)
- [ ] `io-tag` remove button: contextual accessible name + 44 × 44 px touch target (J-06)

**Design decisions:**
- [ ] #461 closed with outcome in `docs/DECISIONS.md`
- [ ] #464 closed with prop alignment plan in `docs/DECISIONS.md`

**P2 components:**
- [ ] `io-heading`: `tag` required; no render-cycle warn (J-07)
- [ ] `io-alert`: focus ring is `box-shadow`; transition token (J-08)
- [ ] `io-popover`: runtime warning when `label` absent; Tab/Shift-Tab trapped while open (J-09, J-12)
- [ ] `io-carousel`: private field no longer shadows `HTMLElement.scrollLeft` (J-10)
- [ ] `io-pin-code` + `io-multi-select`: `error`/`errorMessage` aligned; grouped options `role="option"`; "Clear all" unique name (J-11)

**Documentation:**
- [ ] `docs/api-surface.json`: all 6 Wave XI beta components present (J-13)
- [ ] `docs/public-css-api.json`: `io-switch`, `io-pin-code`, `io-multi-select` tokens registered (J-13)
- [ ] README + storefront `page.tsx` show component count 37 (J-14)
- [ ] `component-stability-recommendations.md` no longer claims io-form-field storefront pages exist (J-14)
- [ ] `io-carousel` storefront API page documents all slots (J-15)
- [ ] Configurator `propDefinitions` complete for 3 beta components (J-15)
- [ ] `io-text` + `io-heading` examples: ≥ 3 examples each (J-16)
- [ ] `io-pin-code` usage page accurate + correct primitive import (J-16)
- [ ] `io-text` storefront: `datetime` prop for `tag="time"` WCAG note (J-21)
- [ ] `io-tabs-bar`: `aria-controls` consumer compliance documented (J-21)
- [ ] `io-popover` dismiss event JSDoc: trigger-click-to-close path documented (J-21)

**Tests + a11y:**
- [ ] `io-button-group`: render + disabled-state specs (J-17)
- [ ] `io-divider`: click + disabled-state specs (J-17)
- [ ] `io-alert` dismiss button: unique accessible name (J-18)
- [ ] `io-switch`: no redundant `aria-checked` (J-19)
- [ ] `io-tabs-bar`: `click.spec.ts` exists + promoted to `stable` (J-20)

**Chores:**
- [ ] `app.json` deleted (J-22)
- [ ] GitHub Packages `publishConfig` + `.npmrc` committed (J-22)
- [ ] Issues #266, #267, #273 confirmed closed + #277 + #278 verified closed on GitHub (J-23)
- [ ] `#483` (io-popover focus trap) and `#484` (io-multi-select grouped options ARIA) filed and tracked — verify both are open with `gh issue list --state open --repo iodigital-com/io-design-system --label wave-j`

**J-24 disposition (mandatory, one of two states):**
- [ ] #271 completed as Wave J extended sprint, OR
- [ ] #271 explicitly scoped as Wave K Issue 1 with rationale in `docs/DECISIONS.md`
