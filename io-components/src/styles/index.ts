/**
 * @io-digital/components/styles
 * ==============================
 * JavaScript-accessible design-token utilities.
 * Import from '@io-digital/components/styles' in host apps.
 *
 * All values mirror the CSS custom properties in src/global/app.css.
 * Use these when you need token values in JS/TS (e.g. canvas rendering,
 * animation libraries, styled-components, inline styles in tests).
 *
 * ⚠️  GOVERNANCE: Do not add hardcoded values here.
 *     Helpers should reference var(--io-*) custom properties.
 */

// ─── Border Radius ───────────────────────────────────────────────────────────

export const borderRadiusXs   = '4px';
export const borderRadiusSm   = '9px';
export const borderRadiusMd   = '12px';
export const borderRadiusLg   = '14px';
export const borderRadiusXl   = '24px';
export const borderRadiusPill = '9999px';

// ─── Touch Target ─────────────────────────────────────────────────────────────

export const touchTargetMin = '44px';

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const space1  = '0.25rem';   /* 4px  */
export const space2  = '0.5rem';    /* 8px  */
export const space3  = '0.75rem';   /* 12px */
export const space4  = '1rem';      /* 16px */
export const space5  = '1.25rem';   /* 20px */
export const space6  = '1.5rem';    /* 24px */
export const space8  = '2rem';      /* 32px */
export const space10 = '2.5rem';    /* 40px */
export const space12 = '3rem';      /* 48px */
export const space14 = '3.5rem';    /* 56px */
export const space15 = '3.75rem';   /* 60px */
export const space16 = '4rem';      /* 64px */
export const space20 = '5rem';      /* 80px */
export const space24 = '6rem';      /* 96px */
export const space28 = '7rem';      /* 112px */
export const space32 = '8rem';      /* 128px */
export const space36 = '9rem';      /* 144px */
export const space40 = '10rem';     /* 160px */

// ─── Typography ──────────────────────────────────────────────────────────────

export const fontPrimary    = "'Manrope', sans-serif";
export const fontSizeXs     = '0.75rem';
export const fontSizeXs2    = '0.8125rem';  /* 13px */
export const fontSizeSm     = '0.875rem';
export const fontSizeBase   = '1rem';
export const fontSizeLg     = '1.125rem';
export const fontSizeXl     = '1.25rem';
export const fontSize2xl    = '1.5rem';
export const fontSize3xl    = '1.875rem';
export const fontSize4xl    = '2rem';
export const fontSize5xl    = '2.25rem';
export const fontSize6xl    = '3rem';
export const fontSize7xl    = '4rem';

export const fontWeightExtraLight = 200;
export const fontWeightLight      = 300;
export const fontWeightRegular    = 400;
export const fontWeightMedium     = 500;
export const fontWeightSemibold   = 600;
export const fontWeightBold       = 700;
export const fontWeightExtraBold  = 800;

// ─── Line Heights ────────────────────────────────────────────────────────────────────────────────

export const lineHeightNone    = 1;
export const lineHeightTight   = 1.2;
export const lineHeightSnug    = 1.25;
export const lineHeightNormal  = 1.5;
export const lineHeightRelaxed = 1.6;
export const lineHeightLoose   = 1.75;

// ─── Letter Spacing ───────────────────────────────────────────────────────────────────────────

export const letterSpacingTight   = '0.025em';
export const letterSpacingWide    = '0.08em';
export const letterSpacingWider   = '0.1em';
export const letterSpacingWidest  = '0.12em';

// ─── Motion ──────────────────────────────────────────────────────────────────

export const motionFast = '200ms ease';
export const motionBase = '300ms ease';
export const motionSlow = '500ms ease-in-out';

export const motionEasingStandard = 'ease';
export const motionEasingInOut    = 'ease-in-out';
export const motionEasingSnappy   = 'cubic-bezier(0.075, 0.82, 0.165, 1)';
export const motionEasingBounce   = 'cubic-bezier(0.645, 0.045, 0.355, 1)';export const motionEasingEaseOut  = 'cubic-bezier(0.4, 0, 0.2, 1)';
// ─── Z-Index ─────────────────────────────────────────────────────────────────

export const zOverlay  = 10;
export const zAbove    = 20;
export const zDropdown = 30;
export const zFixed    = 40;
export const zModal    = 50;
export const zSticky   = 60;
export const zToast    = 70;

// ─── Opacity ─────────────────────────────────────────────────────────────────

export const opacityDisabled = 0.5;
export const opacityMuted    = 0.7;

// ─── Icon Sizes ──────────────────────────────────────────────────────────────

export const iconSizeSm = '1rem';
export const iconSizeMd = '1.25rem';
export const iconSizeLg = '1.5rem';

// ─── Focus ───────────────────────────────────────────────────────────────────

/**
 * Returns inline styles for the io double-ring focus indicator.
 * Uses the io-brand dark-red inner ring + light-pink outer halo pattern.
 *
 * Apply in component :focus-visible rules or via JS style assignment.
 */
export function getFocusStyle(offset = '2px') {
  return {
    outline: 'none',
    boxShadow: `0 0 0 2px var(--io-focus-inner), 0 0 0 5px var(--io-focus-outer)`,
    outlineOffset: offset,
  } as const;
}

// ─── Reduced Motion ──────────────────────────────────────────────────────────

/**
 * Returns a CSS string that disables transitions/animations for
 * users who prefer reduced motion. Embed in component style templates.
 */
export function getReducedMotionStyle(): string {
  return `@media (prefers-reduced-motion: reduce) {
    transition: none !important;
    animation: none !important;
  }`;
}

// ─── Hover ───────────────────────────────────────────────────────────────────

export function getHoverStyle() {
  return {
    backgroundColor: 'var(--io-state-hover)',
  } as const;
}

// ─── Media Query helpers ──────────────────────────────────────────────────────

const breakpoints = {
  xs:    375,
  sm:    600,
  md:    768,
  lg:    1024,
  xl:    1200,
  '2xl': 1440,
  '3xl': 1920,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Returns a `min-width` media query string for the given breakpoint. */
export function getMediaQueryMin(bp: Breakpoint): string {
  return `@media (min-width: ${breakpoints[bp]}px)`;
}

/** Returns a `max-width` media query string (exclusive — 1px below next bp). */
export function getMediaQueryMax(bp: Breakpoint): string {
  return `@media (max-width: ${breakpoints[bp] - 1}px)`;
}

// ─── Grid ────────────────────────────────────────────────────────────────────

/**
 * Returns an inline style object for a standard io responsive grid.
 * Defaults: 12-column, 24px gap.
 */
export function gridStyle(columns = 12, gap = '24px') {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
  } as const;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

/**
 * Returns inline styles for a skeleton loading placeholder.
 */
export function getSkeletonStyle(width = '100%', height = '1rem') {
  return {
    width,
    height,
    borderRadius: 'var(--io-border-radius-sm)',
    background: 'var(--io-color-grey-2)',
    backgroundImage: 'var(--io-skeleton-bg)',
    backgroundSize: 'var(--io-skeleton-bg-size)',
    animation: `io-skeleton-pulse var(--io-skeleton-duration) var(--io-motion-easing-standard) infinite`,
  } as const;
}
