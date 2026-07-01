/**
 * Typed CSS custom property name constants for io-toast-item.
 *
 * These are the public override tokens exposed by io-toast-item.
 * Reference these constants in stylesheets and documentation
 * instead of string literals — rename-safe and auto-documented.
 *
 * Classification: public-api
 * All changes to these names are breaking changes (semver major).
 */

/** Backdrop blur applied to the toast item surface. Default: 12px. */
export const cssVarToastItemBlur = '--io-toast-item-blur' as const;

/** Top offset for the status icon within the toast item. Default: 1px. */
export const cssVarToastItemIconOffsetTop = '--io-toast-item-icon-offset-top' as const;

/** Size (min-width and min-height) of the close button. Default: 1.5rem (24px). */
export const cssVarToastItemCloseSize = '--io-toast-item-close-size' as const;

/** Top offset for the close button within the toast item. Default: -2px. */
export const cssVarToastItemCloseOffsetTop = '--io-toast-item-close-offset-top' as const;

/** Enter animation duration for toast item appearance. Default: 250ms. */
export const cssVarToastItemEnterDuration = '--io-toast-item-enter-duration' as const;
