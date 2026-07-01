/**
 * Breakpoint values as bare numbers (no px suffix).
 *
 * Use these in JS/TS contexts where a numeric value is required:
 *
 *   import { breakpointMd } from '@iodigital-com/components/global/breakpoints';
 *   const mql = window.matchMedia(`(min-width: ${breakpointMd}px)`);
 *
 * For CSS @media rules, use the CSS custom properties instead:
 *   @media (min-width: var(--io-breakpoint-md)) { ... }
 *
 * Values mirror the --io-breakpoint-* CSS custom properties in app.css.
 * Update both locations when adding or changing breakpoints.
 */

export const breakpointXs = 375;
export const breakpointSm = 600;
export const breakpointMd = 768;
export const breakpointLg = 1024;
export const breakpointXl = 1200;
export const breakpoint2xl = 1440;
export const breakpoint3xl = 1920;

/**
 * Record of all breakpoints for programmatic iteration.
 * Keys match the CSS custom property suffix (e.g. "md" → --io-breakpoint-md).
 */
export const breakpoints: Record<string, number> = {
  xs: breakpointXs,
  sm: breakpointSm,
  md: breakpointMd,
  lg: breakpointLg,
  xl: breakpointXl,
  '2xl': breakpoint2xl,
  '3xl': breakpoint3xl,
} as const;
