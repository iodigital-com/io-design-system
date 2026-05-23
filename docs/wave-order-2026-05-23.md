# Wave Order Reference — 2026-05-23

Compiled from all open GitHub issues. Ordered by urgency, dependencies, and PR batching rules.
Generated after Wave I merge (PR #264, 2026-05-23).

---

## Status snapshot

| Wave | Status | Gate |
|------|--------|------|
| **Wave I** | ✅ MERGED (#264, 2026-05-23) | Unlocks II, IV |
| **Wave J** | 🔴 Active — P1 items must ship before next feature PR | Immediate |
| **Wave II** | 🟡 Unblocked (Wave I merged); #228 unblocked | Start after J P1s |
| **Wave III** | 🟢 Parallel-safe | Any time |
| **Wave IV** | 🟡 Unblocked (Wave I merged) | Start after J P1s |
| **Wave V** | ⏳ Blocked on Wave II | Wave II merged |
| **Wave VI** | 🟢 Mostly parallel-safe; #196 blocked on #228 | Any time except #196 |
| **Needs-spec** | 🔒 No spec — do not implement | Spec approved |

---

## Wave J — Audit Remediation (Immediate)

Source: full-depth audit 2026-05-22. P1 items must be resolved before the next feature PR to main.

### PR J-1 — Git + API hygiene `chore/wave-j/issue-272-273-275`

XS effort. Zero runtime risk. Ship first.

| # | Title | P | Effort |
|---|---|---|---|
| [#272](https://github.com/iodigital-com/io-design-system/issues/272) | Untrack `.claude/` CLI artifacts from git history | P1 | XS |
| [#273](https://github.com/iodigital-com/io-design-system/issues/273) | Update io-select api-surface snapshot (options prop removed in #226) | P1 | S |
| [#275](https://github.com/iodigital-com/io-design-system/issues/275) | Remove app.json Expo artifact from repo root | P2 | XS |

> **Note on #267** (deps: vulnerable next/fast-uri chain): resolved in Wave I rebase — `npm audit fix` bumped next 16.2.4→16.2.6 and fast-uri 3.1.0→3.1.2. Recommend closing #267 as resolved.

---

### PR J-2 — Security `security/wave-j/issue-266`

| # | Title | P | Effort |
|---|---|---|---|
| [#266](https://github.com/iodigital-com/io-design-system/issues/266) | Remove global innerHTML sink from AutoCodeHighlight | P1 | S |

---

### PR J-3 — Governance + a11y `fix/wave-j/issue-265-268`

| # | Title | P | Effort |
|---|---|---|---|
| [#265](https://github.com/iodigital-com/io-design-system/issues/265) | Block io-* custom events from bypassing events guard | P1 | S |
| [#268](https://github.com/iodigital-com/io-design-system/issues/268) | io-tag remove control: contextual + 44px touch target | P1 | S |

---

### PR J-4 — Test coverage `test/wave-j/issue-269-274`

| # | Title | P | Effort |
|---|---|---|---|
| [#269](https://github.com/iodigital-com/io-design-system/issues/269) | io-button-group: render + disabled-state spec | P2 | S |
| [#274](https://github.com/iodigital-com/io-design-system/issues/274) | io-divider: click + disabled-state spec | P2 | XS |

---

### PR J-5 — Publishing + token hygiene `chore/wave-j/issue-276-277-278`

| # | Title | P | Effort |
|---|---|---|---|
| [#276](https://github.com/iodigital-com/io-design-system/issues/276) | Commit GitHub Packages registry config + consumer .npmrc docs | P2 | S |
| [#277](https://github.com/iodigital-com/io-design-system/issues/277) | Audit 20-token gap (app.css 301 vs reconciliation table 281) | P2 | M |
| [#278](https://github.com/iodigital-com/io-design-system/issues/278) | Evaluate next-env.d.ts tracking + pin Next.js to stable | P2 | XS |

---

### PR J-6 — Docs `docs/wave-j/issue-270`

| # | Title | P | Effort |
|---|---|---|---|
| [#270](https://github.com/iodigital-com/io-design-system/issues/270) | Update component count copy on storefront homepage | P2 | XS |

---

### PR J-7 — Theme system (standalone, large) `feat/wave-j/issue-271`

⚠️ Large multi-file change. Never batch. Consider scheduling after Wave II #175 dark mode tokens for consistency.

| # | Title | P | Effort |
|---|---|---|---|
| [#271](https://github.com/iodigital-com/io-design-system/issues/271) | Light/dark theme switching — full light mode color palette | P2 | L |

---

## Wave II — Dark Mode + io-toast + io-tabs

**Gate:** Wave I merged ✅ — unblocked now.
**#228 status:** Was `blocked` on Wave I FACE (#166). Wave I is merged → now unblocked.

### PR II-1 — Dark mode tokens `feat/wave-ii/issue-175`

Standalone — touches all 18 component style files + new dark-mode token set. Never batch with other components.

| # | Title | P | Effort |
|---|---|---|---|
| [#175](https://github.com/iodigital-com/io-design-system/issues/175) | Dark mode token overrides across all 18 components | P1 | L |

---

### PR II-2 — FACE completion `fix/wave-ii/issue-228`

Wave I delivered basic FACE (formAssociated + syncFormValue + required validity). #228 adds the remaining work: form `reset` event handling and `:invalid` CSS pseudo-class support for io-checkbox and io-radio.

| # | Title | P | Effort |
|---|---|---|---|
| [#228](https://github.com/iodigital-com/io-design-system/issues/228) | io-checkbox/io-radio: form reset + :invalid support | P1 | M |

---

### PR II-3 — io-toast + io-tabs (safe to batch) `feat/wave-ii/issue-195-199`

| # | Title | P | Effort |
|---|---|---|---|
| [#195](https://github.com/iodigital-com/io-design-system/issues/195) | io-toast: position prop (6 positions) + persistent variant | P2 | M |
| [#199](https://github.com/iodigital-com/io-design-system/issues/199) | io-tabs: icon slot and badge slot for io-tab-item | P2 | M |

---

## Wave III — Documentation & Token APIs

**Gate:** Parallel-safe — can start any time after Wave I ✅.

### PR III-1 — README + CONTRIBUTING `docs/wave-iii/issue-154-207`

| # | Title | P | Effort |
|---|---|---|---|
| [#154](https://github.com/iodigital-com/io-design-system/issues/154) | Update README + add issue templates (bug, feature, implementation) | P2 | S |
| [#207](https://github.com/iodigital-com/io-design-system/issues/207) | CONTRIBUTING.md: token naming, governance scripts, PR checklist | P2 | S |

---

### PR III-2 — CSS custom properties docs `docs/wave-iii/issue-179`

Large — touches 17 storefront component API pages.

| # | Title | P | Effort |
|---|---|---|---|
| [#179](https://github.com/iodigital-com/io-design-system/issues/179) | Add CSS custom properties section to all 17 component API pages | P2 | M |

---

### PR III-3 — Token explorer `feat/wave-iii/issue-187`

New storefront page — standalone.

| # | Title | P | Effort |
|---|---|---|---|
| [#187](https://github.com/iodigital-com/io-design-system/issues/187) | Design token explorer — searchable, filterable, copyable | P2 | M |

---

### PR III-4 — Token API + wrapper READMEs `docs/wave-iii/issue-219-235`

| # | Title | P | Effort |
|---|---|---|---|
| [#219](https://github.com/iodigital-com/io-design-system/issues/219) | Document public vs. internal CSS override API | P2 | S |
| [#235](https://github.com/iodigital-com/io-design-system/issues/235) | Standalone README for React, Vue, Angular wrapper packages | P2 | S |

---

## Wave IV — New Components (First Batch)

**Gate:** Wave I merged ✅ (axe-core a11y infra required). Unblocked now.
**Rule:** Each new component is a standalone PR — never batch two components together.

| PR | # | Title | P | Effort |
|---|---|---|---|---|
| `feat/wave-iv/issue-171` | [#171](https://github.com/iodigital-com/io-design-system/issues/171) | io-skeleton: loading placeholder | P2 | M |
| `feat/wave-iv/issue-172` | [#172](https://github.com/iodigital-com/io-design-system/issues/172) | io-progress: linear progress bar | P2 | M |
| `feat/wave-iv/issue-173` | [#173](https://github.com/iodigital-com/io-design-system/issues/173) | io-breadcrumb: navigation component | P2 | M |
| `feat/wave-iv/issue-174` | [#174](https://github.com/iodigital-com/io-design-system/issues/174) | io-avatar: initials fallback + image support | P2 | M |
| `docs/wave-iv/issue-180-184` | [#180](https://github.com/iodigital-com/io-design-system/issues/180) + [#184](https://github.com/iodigital-com/io-design-system/issues/184) | Composition patterns page + configurator URL state | P2 | M |

---

## Wave V — New Components (Second Batch)

**Gate:** Wave II merged (dark mode required for new component theming).

| PR | # | Title | P | Effort |
|---|---|---|---|---|
| `feat/wave-v/issue-197` | [#197](https://github.com/iodigital-com/io-design-system/issues/197) | io-file-upload: drag-and-drop + validation (**P1**) | P1 | L |
| `feat/wave-v/issue-170` | [#170](https://github.com/iodigital-com/io-design-system/issues/170) | io-drawer: slide-out overlay | P2 | M |
| `feat/wave-v/issue-198` | [#198](https://github.com/iodigital-com/io-design-system/issues/198) | io-stepper: multi-step process indicator | P2 | M |

---

## Wave VI — Storefront UX & Content

**Gate:** Parallel-safe except #196 (blocked on Wave II #228).

### PR VI-1 — Developing docs `docs/wave-vi/issue-208-209`

| # | Title | P | Effort |
|---|---|---|---|
| [#208](https://github.com/iodigital-com/io-design-system/issues/208) | Document stories.ts interactive demo strategy | P2 | S |
| [#209](https://github.com/iodigital-com/io-design-system/issues/209) | Migration guide from MUI, Ant, Bootstrap | P2 | M |

---

### PR VI-2 — /designing page `feat/wave-vi/issue-155`

Standalone significant redesign.

| # | Title | P | Effort |
|---|---|---|---|
| [#155](https://github.com/iodigital-com/io-design-system/issues/155) | Redesign /designing as brand-asset gateway | P2 | M |

---

### PR VI-3 — Component examples `docs/wave-vi/issue-210`

| # | Title | P | Effort |
|---|---|---|---|
| [#210](https://github.com/iodigital-com/io-design-system/issues/210) | Improve io-spinner and io-carousel real-world examples | P2 | S |

---

### PR VI-4 — Compound components `feat/wave-vi/issue-196` ⚠️ BLOCKED

**Blocked on #228 (Wave II FACE completion).**

| # | Title | P | Effort |
|---|---|---|---|
| [#196](https://github.com/iodigital-com/io-design-system/issues/196) | io-form-field, io-radio-group, io-checkbox-group compound components | P2 | L |

---

## Needs-spec Backlog

Do not implement until a design doc is approved and the issue is relabelled.

| # | Title |
|---|---|
| [#152](https://github.com/iodigital-com/io-design-system/issues/152) | feat(io-wordmark): wordmark component |
| [#192](https://github.com/iodigital-com/io-design-system/issues/192) | feat(tokens): multi-brand CSS layer theming API |
| [#193](https://github.com/iodigital-com/io-design-system/issues/193) | feat(ssr): Stencil Hydrate + Next.js dynamic imports |
| [#218](https://github.com/iodigital-com/io-design-system/issues/218) | chore(tokens): Figma → token → code CI pipeline |
| [#220](https://github.com/iodigital-com/io-design-system/issues/220) | feat(tokens): component density system |
| [#221](https://github.com/iodigital-com/io-design-system/issues/221) | feat(tokens): gradient token system |
| [#233](https://github.com/iodigital-com/io-design-system/issues/233) | feat(io-table): accessible data table with sort + row selection |

---

## Recommended Sprint Sequence

```
NOW         Wave J P1: PR J-1 → J-2 → J-3  (fix before next feature PR)
SOON        Wave J P2: PR J-4 → J-5 → J-6  (next sprint)
PARALLEL    Wave III PRs (parallel-safe, any time)
PARALLEL    Wave IV new components (parallel-safe, standalone PRs)
AFTER J P1  Wave II begins: PR II-1 (#175 dark mode) → II-2 (#228 FACE) → II-3
AFTER II    Wave V begins: PR V-1 (#197 file-upload P1 first)
AFTER II    Wave VI #196 unblocked
DEFERRED    Wave J PR J-7 (#271 theme — consider after II-1 dark mode)
BACKLOG     Needs-spec issues — pending design approval
```

---

## Dependency Graph

```
Wave I ✅
  ├── Wave J (audit remediation — immediate)
  │     ├── J-1: git/API cleanup (#272 #273 #275)
  │     ├── J-2: security (#266)      ← #267 RESOLVED in Wave I
  │     ├── J-3: governance + a11y (#265 #268)
  │     ├── J-4: tests (#269 #274)
  │     ├── J-5: publishing + tokens (#276 #277 #278)
  │     ├── J-6: docs (#270)
  │     └── J-7: theme (#271) ─────── best after Wave II-1
  │
  ├── Wave II (now unblocked)
  │     ├── II-1: dark mode (#175)
  │     ├── II-2: FACE completion (#228) ← was blocked, now unblocked
  │     ├── II-3: io-toast + io-tabs (#195 #199)
  │     └── unlocks: Wave V + Wave VI #196
  │
  ├── Wave III (parallel-safe)
  │     ├── III-1: README + CONTRIBUTING (#154 #207)
  │     ├── III-2: CSS props docs (#179)
  │     ├── III-3: token explorer (#187)
  │     └── III-4: token API + wrapper READMEs (#219 #235)
  │
  └── Wave IV (now unblocked — standalone PRs)
        ├── io-skeleton (#171)
        ├── io-progress (#172)
        ├── io-breadcrumb (#173)
        ├── io-avatar (#174)
        └── storefront: composition + configurator (#180 #184)

Wave II ✅ (future)
  └── Wave V
        ├── io-file-upload (#197) P1
        ├── io-drawer (#170)
        └── io-stepper (#198)

Wave II #228 ✅ (future)
  └── Wave VI #196 (compound components)
```
