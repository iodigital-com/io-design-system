/**
 * Token Explorer utility — transforms raw CSS custom property names into
 * typed TokenEntry records for the /styles/tokens page.
 *
 * Data is sourced from the actual CSS variable names defined in app.css
 * (the authoritative source of truth for runtime tokens).
 */

export type TokenCategory =
  | 'color'
  | 'typography'
  | 'spacing'
  | 'shadow'
  | 'border-radius'
  | 'motion'
  | 'other';

export interface TokenEntry {
  /** Display name, e.g. "color-primary" */
  name: string;
  /** Full CSS custom property, e.g. "--io-color-primary" */
  cssVar: string;
  /** Raw value string, e.g. "#0000D2" or "0.875rem" */
  value: string;
  category: TokenCategory;
}

/** Raw token tuple: [cssVar, value] */
type RawToken = readonly [string, string];

// ── Raw token registry ────────────────────────────────────────────────────────
// Sourced from io-components/src/global/app.css — updated whenever tokens change.

const COLOR_TOKENS: readonly RawToken[] = [
  ['--io-color-primary', '#0000D2'],
  ['--io-color-primary-hover', '#0000a8'],
  ['--io-color-primary-active', '#000080'],
  ['--io-color-primary-muted', 'rgba(0, 0, 210, 0.12)'],
  ['--io-color-primary-bg', 'rgba(0, 0, 210, 0.06)'],
  ['--io-color-beige', '#DCCFC2'],
  ['--io-color-beige-hover', '#cdb99e'],
  ['--io-color-off-white', '#EBE8E3'],
  ['--io-color-calm-beige', '#e1cfbf'],
  ['--io-color-calm-pink', '#dcc8c2'],
  ['--io-color-calm-blue', '#bdcad1'],
  ['--io-color-calm-green', '#c4d1ce'],
  ['--io-color-orange', '#ed7f53'],
  ['--io-color-orange-hover', '#d96a3b'],
  ['--io-color-pink', '#DCC8C2'],
  ['--io-color-pink-hover', '#c9afa8'],
  ['--io-color-rouge', '#a13865'],
  ['--io-color-rouge-hover', '#8a2e54'],
  ['--io-color-yellow', '#fdbc75'],
  ['--io-color-yellow-hover', '#f0a952'],
  ['--io-color-lavendel', '#868ada'],
  ['--io-color-white', '#ffffff'],
  ['--io-color-black', '#000000'],
  ['--io-color-grey-1', '#f7f7f7'],
  ['--io-color-grey-2', '#ebebeb'],
  ['--io-color-grey-3', '#C4C4C4'],
  ['--io-color-grey-4', '#747474'],
  ['--io-color-grey-5', '#F4F4F4'],
  ['--io-color-grey-6', '#242424'],
  ['--io-color-antraciet', '#454545'],
  ['--io-color-antraciet-hover', '#333333'],
  ['--io-color-success', '#30c58e'],
  ['--io-color-success-soft', 'rgba(48, 197, 142, 0.1)'],
  ['--io-color-warning', '#ffa100'],
  ['--io-color-warning-soft', 'rgba(255, 161, 0, 0.1)'],
  ['--io-color-error', '#ff6161'],
  ['--io-color-error-soft', 'rgba(255, 97, 97, 0.1)'],
  ['--io-color-error-on-blue', '#FF9E9A'],
  ['--io-color-error-dark', '#D35454'],
  ['--io-color-info', '#1565C0'],
  ['--io-color-info-soft', 'rgba(21, 101, 192, 0.1)'],
  ['--io-color-system-blue', '#0019FF'],
  ['--io-focus-inner', '#7D0034'],
  ['--io-focus-outer', '#FFE4EE'],
] as const;

const TYPOGRAPHY_TOKENS: readonly RawToken[] = [
  ['--io-font-primary', "'Manrope', sans-serif"],
  ['--io-font-size-xs', '0.75rem'],
  ['--io-font-size-xs2', '0.8125rem'],
  ['--io-font-size-sm', '0.875rem'],
  ['--io-font-size-base', '1rem'],
  ['--io-font-size-lg', '1.125rem'],
  ['--io-font-size-xl', '1.25rem'],
  ['--io-font-size-2xl', '1.5rem'],
  ['--io-font-size-3xl', '1.875rem'],
  ['--io-font-size-4xl', '2rem'],
  ['--io-font-size-5xl', '2.25rem'],
  ['--io-font-size-6xl', '3rem'],
  ['--io-font-size-7xl', '4rem'],
  ['--io-font-weight-extra-light', '200'],
  ['--io-font-weight-light', '300'],
  ['--io-font-weight-regular', '400'],
  ['--io-font-weight-medium', '500'],
  ['--io-font-weight-semibold', '600'],
  ['--io-font-weight-bold', '700'],
  ['--io-font-weight-extra-bold', '800'],
] as const;

const SPACING_TOKENS: readonly RawToken[] = [
  ['--io-space-1', '0.25rem'],
  ['--io-space-2', '0.5rem'],
  ['--io-space-3', '0.75rem'],
  ['--io-space-4', '1rem'],
  ['--io-space-5', '1.25rem'],
  ['--io-space-6', '1.5rem'],
  ['--io-space-8', '2rem'],
  ['--io-space-10', '2.5rem'],
  ['--io-space-12', '3rem'],
  ['--io-space-14', '3.5rem'],
  ['--io-space-15', '3.75rem'],
  ['--io-space-16', '4rem'],
  ['--io-space-20', '5rem'],
  ['--io-space-24', '6rem'],
  ['--io-space-28', '7rem'],
  ['--io-space-32', '8rem'],
  ['--io-space-36', '9rem'],
  ['--io-space-40', '10rem'],
] as const;

const SHADOW_TOKENS: readonly RawToken[] = [
  ['--io-shadow-sm', '0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)'],
  ['--io-shadow-md', '0px 0px 10px rgba(0,0,0,0.04), 0px 0px 25px rgba(0,0,0,0.02)'],
  ['--io-shadow-lg', '0px 0px 24px rgba(36,36,36,0.25)'],
  ['--io-shadow-xl', '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)'],
  ['--io-shadow-2xl', '0px 25px 50px -12px rgba(0,0,0,0.25)'],
  ['--io-shadow-focus-blue', '0 0 0 2px rgba(54,95,217,0.7)'],
] as const;

const BORDER_RADIUS_TOKENS: readonly RawToken[] = [
  ['--io-border-radius-xs', '4px'],
  ['--io-border-radius-sm', '9px'],
  ['--io-border-radius-md', '12px'],
  ['--io-border-radius-lg', '14px'],
  ['--io-border-radius-xl', '24px'],
  ['--io-border-radius-pill', '9999px'],
] as const;

const MOTION_TOKENS: readonly RawToken[] = [
  ['--io-motion-fast', '200ms ease'],
  ['--io-motion-base', '300ms ease'],
  ['--io-motion-slow', '500ms ease-in-out'],
  ['--io-motion-easing-standard', 'ease'],
  ['--io-motion-easing-in-out', 'ease-in-out'],
  ['--io-motion-easing-snappy', 'cubic-bezier(0.075, 0.82, 0.165, 1)'],
  ['--io-motion-easing-bounce', 'cubic-bezier(0.645, 0.045, 0.355, 1)'],
  ['--io-motion-easing-ease-out', 'cubic-bezier(0.4, 0, 0.2, 1)'],
] as const;

// ── Transform helpers ─────────────────────────────────────────────────────────

function toEntry(cssVar: string, value: string, category: TokenCategory): TokenEntry {
  return {
    name: cssVar.replace(/^--io-/, ''),
    cssVar,
    value,
    category,
  };
}

function buildEntries(
  tokens: readonly RawToken[],
  category: TokenCategory,
): TokenEntry[] {
  return tokens.map(([cssVar, value]) => toEntry(cssVar, value, category));
}

// ── Public API ────────────────────────────────────────────────────────────────

export const ALL_TOKENS: readonly TokenEntry[] = [
  ...buildEntries(COLOR_TOKENS, 'color'),
  ...buildEntries(TYPOGRAPHY_TOKENS, 'typography'),
  ...buildEntries(SPACING_TOKENS, 'spacing'),
  ...buildEntries(SHADOW_TOKENS, 'shadow'),
  ...buildEntries(BORDER_RADIUS_TOKENS, 'border-radius'),
  ...buildEntries(MOTION_TOKENS, 'motion'),
];

export const CATEGORY_LABELS: Record<TokenCategory, string> = {
  color: 'Color',
  typography: 'Typography',
  spacing: 'Spacing',
  shadow: 'Shadow',
  'border-radius': 'Border Radius',
  motion: 'Motion',
  other: 'Other',
};

export const TOKEN_CATEGORIES: readonly TokenCategory[] = [
  'color',
  'typography',
  'spacing',
  'shadow',
  'border-radius',
  'motion',
];

/**
 * Returns true when the token is a color that can be rendered as a CSS swatch.
 * Excludes focus/motion/layout tokens that don't render as solid colors.
 */
export function isColorToken(entry: TokenEntry): boolean {
  return entry.category === 'color';
}

/**
 * Filters ALL_TOKENS by search query and active category.
 * Search is case-insensitive and matches against name, cssVar, or value.
 */
export function filterTokens(
  tokens: readonly TokenEntry[],
  query: string,
  category: TokenCategory | 'all',
): TokenEntry[] {
  const q = query.trim().toLowerCase();

  return tokens.filter((token) => {
    const matchesCategory = category === 'all' || token.category === category;

    if (!matchesCategory) return false;
    if (!q) return true;

    return (
      token.name.toLowerCase().includes(q) ||
      token.cssVar.toLowerCase().includes(q) ||
      token.value.toLowerCase().includes(q)
    );
  });
}
