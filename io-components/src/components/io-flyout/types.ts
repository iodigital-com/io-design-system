/**
 * Position of the flyout panel.
 *
 * Preferred values:
 * - 'start' — logical inline-start edge (left in LTR, right in RTL)
 * - 'end'   — logical inline-end edge (right in LTR, left in RTL)
 *
 * Legacy aliases (deprecated — will be removed in a future minor release):
 * - 'left'  → normalised to 'start' with a console.warn
 * - 'right' → normalised to 'end'   with a console.warn
 */
export type IoFlyoutPosition = 'start' | 'end' | 'left' | 'right';

/**
 * Footer behaviour for io-flyout.
 * - sticky: header and footer remain in view while content scrolls (default)
 * - fixed:  footer is position:fixed at the bottom of the viewport
 */
export type IoFlyoutFooterBehavior = 'sticky' | 'fixed';
