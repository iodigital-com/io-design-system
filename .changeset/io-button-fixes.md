---
"@iodigital-com/components": minor
---

fix(io-button): form integration, ghost colors, loading icon, icon-only, and configurator gaps

- Add `formAssociated: true` + FACE integration (`name`, `form` props, `internals.form.requestSubmit/reset` on click, `componentWillLoad` value sync)
- Add loading a11y: visually-hidden live region + `aria-describedby` announces loading state to screen readers (WCAG 4.1.3)
- Add `componentShouldUpdate` guard to prevent unnecessary re-renders on unchanged props
- Add dev-mode prop validation warnings for invalid `variant`, `color`, `size` values
- Fix ghost variant missing borders for orange, pink, rouge, yellow, beige colors
- Fix loading state: icon and custom SVG now fade to opacity 0 alongside label/arrow
- Fix icon-only mode: respects `icon`/`iconSource` prop; falls back to iO brand arrow (not hardcoded ×)
- Add `link` variant to Configurator prop definitions
- Expand ghost story to all 9 colors
- Refs: #581, #582, #583, #584, #585
