/**
 * Typed CSS custom property name constants for io-button.
 *
 * These are the public override tokens exposed by io-button.
 * Reference these constants in stylesheets and documentation
 * instead of string literals — rename-safe and auto-documented.
 *
 * Classification: public-api
 * All changes to these names are breaking changes (semver major).
 */

/** Spinner animation duration. Default: 600ms. */
export const cssVarButtonSpinnerDuration = '--io-button-spinner-duration' as const;

/** Spinner border width. Default: 2px. */
export const cssVarButtonSpinnerBorderWidth = '--io-button-spinner-border-width' as const;

/** Vertical padding for the XL size variant. Default: 1.125rem. */
export const cssVarButtonXlPaddingY = '--io-button-xl-padding-y' as const;

/** Width of the default arrow icon. Default: 0.875rem. */
export const cssVarButtonArrowWidthDefault = '--io-button-arrow-width-default' as const;

/** Height of the default arrow icon. Default: 0.54rem. */
export const cssVarButtonArrowHeightDefault = '--io-button-arrow-height-default' as const;

/** Width of the XL arrow icon. Default: 1.5rem. */
export const cssVarButtonArrowXlWidth = '--io-button-arrow-xl-width' as const;

/** Height of the XL arrow icon. Default: 0.923rem. */
export const cssVarButtonArrowXlHeight = '--io-button-arrow-xl-height' as const;

/** Height of the underline decoration on link-variant buttons. Default: 1px. */
export const cssVarButtonLinkUnderlineHeight = '--io-button-link-underline-height' as const;

/** Horizontal shift applied to the arrow on hover (forward direction). Default: 6px. */
export const cssVarButtonArrowShiftForward = '--io-button-arrow-shift-forward' as const;

/** Vertical shift applied to the arrow on hover (down direction). Default: 5px. */
export const cssVarButtonArrowShiftDown = '--io-button-arrow-shift-down' as const;

/** Padding applied to icon-only button variants. */
export const cssVarButtonIconPadding = '--io-button-icon-padding' as const;
