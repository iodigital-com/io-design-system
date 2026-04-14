---
applyTo: "io-components/src/components/**,io-storefront/src/**,docs/**"
description: "Use when doing UI/UX or design-system work in io-design-system. Enforces iO Digital brand constraints and blocks off-brand styles."
---

# iO Brand Design System Guardrails

This repository is the iO Digital design system. Any generated UI or UX output must preserve iO brand consistency.

## Non-negotiable Brand Rules

1. Use existing design tokens and CSS variables only (`var(--io-*)`).
2. Do not introduce new visual languages that contradict iO branding.
3. Do not apply random style systems (for example neumorphism, cyberpunk, vaporwave, glassmorphism) unless explicitly requested by maintainers for an experiment.
4. Keep component look-and-feel aligned with existing storefront and component patterns.
5. Prioritize clarity, accessibility, and system consistency over novelty.

## Design and Accessibility Baseline

1. Preserve WCAG AA targets and keyboard accessibility.
2. Preserve visible focus treatment and semantic structure.
3. Keep interaction behavior predictable and documentation aligned with implementation.
4. Respect reduced motion.

## Project-Scope Constraints

1. This guidance is scoped to io-design-system only.
2. Favor edits to source-of-truth component files in `io-components/src/components/`.
3. Do not introduce wrapper-only behavior in React/Vue/Angular packages.
4. Do not edit generated wrapper artifacts manually.

## Output Expectations

1. Explain brand-impacting decisions when proposing UI changes.
2. If a requested style conflicts with iO brand guardrails, propose the closest iO-aligned alternative.
3. Keep changes minimal and token-driven.
