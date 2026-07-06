import type { IoFlagName } from './types';

/**
 * Human-readable country name for the given ISO 3166-1 alpha-2 code.
 * Used as the default accessible label when no explicit `label` prop is set.
 */
export const FLAG_COUNTRY_NAMES: Record<IoFlagName, string> = {
  // EU member states
  at: 'Austria',
  be: 'Belgium',
  bg: 'Bulgaria',
  cy: 'Cyprus',
  cz: 'Czech Republic',
  de: 'Germany',
  dk: 'Denmark',
  ee: 'Estonia',
  es: 'Spain',
  fi: 'Finland',
  fr: 'France',
  gr: 'Greece',
  hr: 'Croatia',
  hu: 'Hungary',
  ie: 'Ireland',
  it: 'Italy',
  lt: 'Lithuania',
  lu: 'Luxembourg',
  lv: 'Latvia',
  mt: 'Malta',
  nl: 'Netherlands',
  pl: 'Poland',
  pt: 'Portugal',
  ro: 'Romania',
  se: 'Sweden',
  si: 'Slovenia',
  sk: 'Slovakia',
  // Key client / iO presence regions
  gb: 'United Kingdom',
  us: 'United States',
  tr: 'Turkey',
  no: 'Norway',
  ch: 'Switzerland',
  au: 'Australia',
  ca: 'Canada',
  jp: 'Japan',
  cn: 'China',
  in: 'India',
  br: 'Brazil',
  za: 'South Africa',
  ae: 'United Arab Emirates',
};

/**
 * Returns the accessible label for the given flag name.
 * - If label is an explicit empty string, returns '' (decorative flag).
 * - If label is a non-empty string, returns that string.
 * - Falls back to the country name from the catalogue, or uppercased ISO code.
 */
export function getFlagLabel(name: string, label?: string): string {
  if (label !== undefined) return label;
  return FLAG_COUNTRY_NAMES[name as IoFlagName] ?? name.toUpperCase();
}

/** Fixed set of pixel widths flagcdn.com actually serves; other widths 404/ORB-block. */
const FLAGCDN_WIDTH_BUCKETS = [20, 40, 80, 160, 320, 640, 1280, 2560];

/** Snaps an arbitrary pixel size up to the nearest width flagcdn.com serves. */
function snapToFlagcdnWidth(sizePx: number): number {
  return FLAGCDN_WIDTH_BUCKETS.find((bucket) => bucket >= sizePx) ?? FLAGCDN_WIDTH_BUCKETS[FLAGCDN_WIDTH_BUCKETS.length - 1];
}

/** Returns the CDN URL for a flag image using flagcdn.com. */
export function getFlagSrc(name: string, sizePx: number): string {
  // flagcdn.com only serves fixed width buckets — snap up to the nearest one.
  return `https://flagcdn.com/w${snapToFlagcdnWidth(sizePx)}/${name.toLowerCase()}.png`;
}

/** Maps IoIconSize values to pixel widths for the flag image. */
export const FLAG_SIZE_PX: Record<string, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  inherit: 24,
};
