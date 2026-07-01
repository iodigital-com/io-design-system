/**
 * Position of the flyout panel.
 *
 * - 'start' — logical inline-start edge (left in LTR, right in RTL)
 * - 'end'   — logical inline-end edge (right in LTR, left in RTL)
 * - 'top'   — anchor to top edge
 * - 'bottom' — anchor to bottom edge
 */
export type IoFlyoutPosition = 'start' | 'end' | 'top' | 'bottom';

/**
 * Footer behaviour for io-flyout.
 * - sticky: header and footer remain in view while content scrolls (default)
 * - fixed:  footer is position:fixed at the bottom of the viewport
 */
export type IoFlyoutFooterBehavior = 'sticky' | 'fixed';
