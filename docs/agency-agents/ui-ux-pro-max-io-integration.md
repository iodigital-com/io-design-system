# UI UX Pro Max in io-design-system

This guide explains how to evaluate and use `nextlevelbuilder/ui-ux-pro-max-skill` safely in this repository.

## Quick Assessment

`ui-ux-pro-max-skill` is broad and multi-style by default. That is useful for ideation, but this repository is a governed design system with strict iO brand consistency requirements.

Use it only with project guardrails layered on top.

## Install Options

### VS Code / GitHub Copilot (CLI method from upstream)

From the upstream README, Copilot installation is:

```bash
npm install -g uipro-cli
cd /path/to/your/project
uipro init --ai copilot
```

Invocation mode for Copilot is slash-command based:

```text
/ui-ux-pro-max <your request>
```

### Important for this repository

This repo has curated managed files in `.github/agents` with drift checks:

- `npm run agents:check:copilot-drift`
- `npm run agents:check:copilot-extended-drift`

Direct `uipro init --ai copilot` may add or overwrite `.github/*` files and can break governance drift checks.

## Recommended Safe Usage Here

1. Keep curated managed agents as source of truth.
2. Use repo-local instruction guardrails in `.github/instructions/io-brand-design-system.instructions.md` to constrain UI generation to iO brand.
3. If trialing UI UX Pro Max assets, do so in a temporary branch and re-run:
   - `npm run governance:check`
   - `npm run agents:check:copilot-drift`
   - `npm run agents:check:copilot-extended-drift`
4. Remove any conflicting managed-agent changes before merge.

## iO Tailoring Requirements

When UI UX Pro Max is used for this repo, enforce these overrides:

1. Token-first styling only (`--io-*`).
2. No off-brand style pivots unless explicitly approved.
3. Accessibility and component contract parity take priority over visual novelty.
4. Changes must fit existing component architecture and storefront documentation patterns.

## Decision

For io-design-system, treat UI UX Pro Max as optional ideation support only, not as an authoritative design source.
The authoritative source remains this repository's component code, tokens, and governance docs.

## PR Evidence Checklist: /styles/motion

Use this concise checklist in PR descriptions for any implementation touching `/styles/motion`.

- [ ] Route proof (not 404)
   - Include one screenshot showing `/styles/motion` loaded successfully (browser URL visible).
   - Include one screenshot or short log snippet confirming no 404 in browser network panel for page load.
- [ ] Desktop visual proof
   - Include one full-page desktop screenshot (for example 1440px+ width).
   - Include one viewport screenshot focusing on motion examples and control UI.
- [ ] Mobile visual proof
   - Include one full-page mobile screenshot (for example 375x667).
   - Include one screenshot with mobile navigation state relevant to reaching `/styles/motion`.
- [ ] Reduced motion behavior proof
   - Include before/after screenshots or short video/GIF showing normal motion vs reduced motion.
   - Confirm behavior when `prefers-reduced-motion: reduce` is active.
   - Confirm motion-essential content remains understandable when animation is reduced/disabled.
- [ ] Token mapping proof
   - Include a short table mapping each motion value used on the page to its `--io-*` token.
   - Include links to the exact source lines where tokens are consumed.
   - Confirm no hardcoded duration/easing values were introduced.
