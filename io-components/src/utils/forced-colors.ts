/**
 * forced-colors utility — Windows High Contrast Mode support.
 *
 * Returns a CSS string block wrapped in `@media (forced-colors: active) { ... }`.
 * Use in component -styles.ts files to add WCAG 1.4.1 / 1.4.11 / 2.4.7 coverage.
 *
 * In forced-colors mode the browser overrides most fill/border/shadow rules with
 * system colors. Components must:
 *   - Use CSS system color keywords (ButtonText, Highlight, Canvas, etc.)
 *   - Use `outline` instead of `box-shadow` for focus rings (box-shadow is stripped)
 *   - Ensure interactive borders are expressed with `border` or `outline`
 *
 * @param selectors  CSS selector(s) to target inside the media query
 * @param styles     Raw CSS declarations to apply
 *
 * Usage:
 *   forcedColors('.btn', 'border: 1px solid ButtonText; color: ButtonText;')
 *   forcedColors('.btn:focus-visible', 'outline: 2px solid Highlight; outline-offset: 2px;')
 */
export function forcedColors(selectors: string, styles: string): string {
  return `
    @media (forced-colors: active) {
      ${selectors} {
        ${styles}
      }
    }
  `;
}
