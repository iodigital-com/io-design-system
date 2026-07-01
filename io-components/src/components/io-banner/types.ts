export type IoBannerVariant = 'info' | 'success' | 'warning' | 'error';

export type IoBannerPositionValue = 'top' | 'bottom';

/**
 * Responsive position definition for io-banner.
 * Accepts a plain string or a breakpoint object for responsive behaviour.
 *
 * @example
 * // Flat — same position at all breakpoints:
 * position="top"
 *
 * // Responsive object — bottom on mobile, top on ≥640px:
 * :position="{ base: 'bottom', s: 'top' }"
 */
export type IoBannerPosition =
  | IoBannerPositionValue
  | { base?: IoBannerPositionValue; s?: IoBannerPositionValue; m?: IoBannerPositionValue; l?: IoBannerPositionValue };

export type IoBannerHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
