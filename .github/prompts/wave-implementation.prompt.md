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

You are a senior Stencil / Next.js developer implementing a wave of tickets for **io-design-system** — an accessibility-first design-system monorepo built on Stencil 4 web components and a Next.js 15 storefront. Follow every phase in order. Do not skip phases. Do not merge without passing the review loop.

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
cd /Users/jakeortega/Documents/Projects/io-design-system
npm run type-check 2>&1 | tail -30
```
Fix type errors before moving to the next file.

---

## PHASE 5 — TESTS

Run existing tests first:

```bash
cd /Users/jakeortega/Documents/Projects/io-design-system
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
cd /Users/jakeortega/Documents/Projects/io-design-system

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

## WAVE PHASING REFERENCE

### Release Roadmap

| Wave | GitHub Label | Description | Status | Gate |
|------|-------------|-------------|--------|------|
| **Wave I** | `wave-i` | FACE forms, io-modal methods, io-input slots, axe-core a11y, Changesets | ✅ **MERGED** (#264, 2026-05-23) | — |
| **Wave J** | `wave-j` | Audit remediation — CI health, security, token gaps, git hygiene | 🔴 **Active** — P1s before next feature PR | Immediate |
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
| #228 | fix(io-checkbox/io-radio): complete FACE — form reset + :invalid support | P1 | ✅ Unblocked (Wave I FACE merged) |
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

### Wave J — Audit Remediation (2026-05-22)

**GitHub label:** `wave-j`
**Source:** Full-depth end-to-end audit 2026-05-22 — [docs/audit-report-2026-05-22.md](../../docs/audit-report-2026-05-22.md)
**Post-audit readiness score:** 7.5 / 10

---

#### P1 — Fix before next PR to main

| # | Title | Type | Effort | Status |
|---|---|---|---|---|
| #272 | chore(git): untrack `.claude/` CLI tooling artifacts from git history | chore | XS | Open |
| #273 | chore(api-surface): update io-select snapshot — options prop removed in PR #226 | chore | S | Open |
| #265 | fix(governance): block io-* custom events from bypassing events guard | fix | S | Open |
| #266 | security(storefront): remove global innerHTML sink from AutoCodeHighlight | security | S | Open |
| ~~#267~~ | ~~chore(deps): refresh storefront dependency tree — vulnerable next/fast-uri chain~~ | chore | — | ✅ **Resolved in Wave I** (npm audit fix bumped next→16.2.6, fast-uri→3.1.2) — close this issue |
| #268 | fix(accessibility): make io-tag remove control contextual and 44px minimum | fix | S | Open |

#### P2 — Next sprint

| # | Title | Type | Effort |
|---|---|---|---|
| #269 | test(io-button-group): add render and disabled-state coverage | test | S |
| #271 | feat(theme): implement light/dark theme switching with full light mode palette | feat | L |
| #274 | test(io-divider): add click and disabled-state spec coverage | test | XS |
| #275 | chore(repo): remove app.json Expo artifact from repo root | chore | XS |
| #276 | chore(publishing): commit GitHub Packages registry config + .npmrc docs | chore | S |
| #277 | chore(tokens): audit 20-token gap (app.css 301 vs reconciliation table 281) | chore | M |
| #278 | chore(storefront): evaluate next-env.d.ts and pin Next.js to stable | chore | XS |

#### P3 — Backlog / post Wave I

| # | Title | Type | Effort |
|---|---|---|---|
| #270 | docs(home): update component count copy on storefront homepage | docs | XS |

---

#### Wave J Sprint Plan

**PR J-1 — Git + API hygiene** `chore/wave-j/issue-272-273-275`
Zero runtime logic. Pure cleanup. ~1h.

| # | Title | Effort |
|---|---|---|
| #272 | Untrack `.claude/` from git history | XS |
| #273 | Update io-select api-surface snapshot | S |
| #275 | Delete app.json Expo artifact | XS |

**Steps for #272:**
```bash
git rm --cached .claude/scheduled_tasks.lock
git rm --cached ".claude/worktrees/agent-a5795f59"
git rm --cached ".claude/worktrees/agent-a953aeca"
```

**Steps for #273:**
```bash
npm run build:components
npm run api:snapshot
git add docs/api-surface.json
```

---

**PR J-2 — Security** `security/wave-j/issue-266`
#267 resolved in Wave I (npm audit fix). #266 is the remaining security item.

| # | Title | Effort |
|---|---|---|
| #266 | Remove innerHTML sink from AutoCodeHighlight | S |

---

**PR J-3 — Governance + a11y fixes** `fix/wave-j/issue-265-268`
Both are component/governance fixes.

| # | Title | Effort |
|---|---|---|
| #265 | Block io-* events bypassing events guard | S |
| #268 | io-tag remove control: contextual + 44px touch target | S |

---

**PR J-4 — Test coverage** `test/wave-j/issue-269-274`
Both are test-only PRs with no runtime impact.

| # | Title | Effort |
|---|---|---|
| #269 | io-button-group: render + disabled-state specs | S |
| #274 | io-divider: click + disabled-state specs | XS |

---

**PR J-5 — Publishing + token hygiene** `chore/wave-j/issue-276-277-278`

| # | Title | Effort |
|---|---|---|
| #276 | Commit GitHub Packages config + .npmrc docs | S |
| #277 | Audit 20-token gap | M |
| #278 | Evaluate next-env.d.ts + pin Next.js version | XS |

---

**PR J-6 — Docs** `docs/wave-j/issue-270`
Tiny content update — can batch with any other docs PR.

| # | Title | Effort |
|---|---|---|
| #270 | Update component count copy on storefront homepage | XS |

---

**PR J-7 — Theme system (standalone)** `feat/wave-j/issue-271`
⚠️ Large multi-file change — implement standalone, never batch.

| # | Title | Effort |
|---|---|---|
| #271 | Light/dark theme switching with full light mode color palette | L |

> **Note:** Consider sequencing this after Wave II (#175 dark mode tokens) for consistency.

---

#### Wave J Branch Naming

```bash
# P1 — fix before next PR to main
chore/wave-j/issue-272-273-275       # PR J-1: git + API hygiene
security/wave-j/issue-266-267        # PR J-2: security hardening
fix/wave-j/issue-265-268             # PR J-3: governance + a11y fixes

# P2 — next sprint
test/wave-j/issue-269-274            # PR J-4: test coverage
chore/wave-j/issue-276-277-278       # PR J-5: publishing + token hygiene

# P3 — backlog
docs/wave-j/issue-270                # PR J-6: homepage copy

# Standalone (large)
feat/wave-j/issue-271                # PR J-7: theme system (design review first)
```

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
chore/wave-j/issue-272-273-275        # git hygiene batch
security/wave-j/issue-266-267         # security fixes batch
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
