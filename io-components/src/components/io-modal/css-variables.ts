/**
 * Typed CSS custom property name constants for io-modal.
 *
 * These are the public override tokens exposed by io-modal.
 * Reference these constants in stylesheets and documentation
 * instead of string literals — rename-safe and auto-documented.
 *
 * Classification: public-api
 * All changes to these names are breaking changes (semver major).
 */

/** Width of the small modal variant. Default: 400px. */
export const cssVarModalWidthSm = '--io-modal-width-sm' as const;

/** Width of the medium modal variant. Default: 560px. */
export const cssVarModalWidthMd = '--io-modal-width-md' as const;

/** Width of the large modal variant. Default: 768px. */
export const cssVarModalWidthLg = '--io-modal-width-lg' as const;

/** Maximum height of the modal panel. Default: 90vh. */
export const cssVarModalMaxHeight = '--io-modal-max-height' as const;
