/**
 * Screen-reader-only (visually hidden) utility.
 *
 * Returns the canonical CSS-in-JS block that hides an element visually while
 * keeping it accessible to assistive technology.
 *
 * Usage in component -styles.ts:
 *
 *   import { getSrOnlyStyles } from '../../utils/sr-only';
 *
 *   export function getMyComponentStyles(): string {
 *     return `
 *       .my-label--sr-only {
 *         ${getSrOnlyStyles()}
 *       }
 *     `;
 *   }
 *
 * The global `.io-sr-only` class in app.css uses the same rule block for
 * consumers that need it outside of Shadow DOM.
 */
export function getSrOnlyStyles(): string {
  return `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
      white-space: nowrap;
      border-width: 0;
  `;
}
