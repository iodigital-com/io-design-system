---
'@iodigital-com/components': minor
---

feat(io-button): B27 enhancements — press feedback, token transitions, download prop, deprecate iconOnly, iconSource sizing, loading-finished announcement

- #1134 Add `scale(0.98)` `:active` press feedback on `.btn`; skipped under `prefers-reduced-motion`. Transition uses new `--io-duration-xs`/`--io-ease-out` tokens. translateY remains prohibited; scale is a separate primitive.
- #1153 Replace all hardcoded `500ms`/`150ms` values in `io-button-styles.ts` and `--io-button-group-transition` in `app.css` with new split duration/easing tokens (`--io-duration-xs`, `--io-duration-lg`, `--io-ease-snappy`, `--io-ease-standard`, `--io-ease-out`).
- #1101 Add `min-width`/`min-height: var(--io-button-sm-icon-only-min, 24px)` to `.btn--sm.btn--icon-only` so the sm icon-only button cannot be CSS-overridden below the WCAG 2.5.5 AA floor of 24px.
- #1065 Add `download` prop for anchor mode (`boolean true` → empty attribute, `string` → filename suggestion). Auto-set `rel="noopener noreferrer"` when `target="_blank"` and no `rel` is provided, matching `io-wordmark`.
- #1047 Deprecate `iconOnly` prop with a `console.warn` pointing to `hideLabel`. `hideLabel=true` + icon/iconSource now renders a square icon-only layout with an sr-only label span. `hideLabel=true` without any icon emits `console.error`.
- #1043 Size `iconSource` raw-SVG wrapper (`.btn__icon-wrap`) via `data-size` attribute so it matches `io-icon`'s size map at each button size, unifying visual sizing.
- #1110 Replace the transient live-region pattern with a stable `loadingAnnouncement` state (`'loading'` | `'finished'` | `'idle'`). Screen readers now hear 'Loading' on start and 'Loading finished' once after `loading` transitions `true→false`. Re-run cycles correctly announce both states.

New tokens registered in `docs/public-css-api.json` and `docs/token-runtime-reconciliation.json`:
`--io-button-sm-icon-only-min`, `--io-duration-xs`, `--io-duration-sm`, `--io-duration-md`, `--io-duration-lg`, `--io-ease-standard`, `--io-ease-out`, `--io-ease-snappy`
