/**
 * BreakpointCustomizable — responsive prop utility
 * =================================================
 * Allows a prop to accept either a static value or a breakpoint map:
 *
 *   size="md"
 *   size='{"base":"sm","l":"lg"}'   ← stringified JSON on HTML attributes
 *   .size={{ base: 'sm', l: 'lg' }} ← object form in JS/framework bindings
 *
 * Breakpoints mirror the tokens defined in src/global/app.css:
 *   xs: 375px | sm: 600px | md: 768px | lg: 1024px | xl: 1200px
 */

/** Named responsive breakpoints (mobile-first, min-width). */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Pixel values for each breakpoint — kept in sync with app.css tokens. */
export const BREAKPOINT_PX: Record<Breakpoint, number> = {
  xs:  375,
  sm:  600,
  md:  768,
  lg:  1024,
  xl:  1200,
};

/**
 * A prop value that can be a plain `T` or an object mapping breakpoint keys
 * (plus `base` for the default/no-query value) to `T`.
 */
export type BreakpointCustomizable<T> = T | BreakpointMap<T>;

/** Breakpoint map — `base` sets the default; named breakpoints set overrides. */
export type BreakpointMap<T> = {
  base?: T;
} & Partial<Record<Breakpoint, T>>;

/**
 * Parse a BreakpointCustomizable prop from either an already-parsed object
 * or a stringified-JSON attribute value.
 *
 * Returns the original value unchanged when it is already a plain `T` (not
 * an object or a JSON-serialised object).
 *
 * @example
 * parseBreakpointValue<IoButtonSize>('md')
 *   // → 'md'
 *
 * parseBreakpointValue<IoButtonSize>('{"base":"sm","l":"lg"}')
 *   // → { base: 'sm', l: 'lg' }
 *
 * parseBreakpointValue<IoButtonSize>({ base: 'sm', lg: 'lg' })
 *   // → { base: 'sm', lg: 'lg' }
 */
export function parseBreakpointValue<T>(
  value: BreakpointCustomizable<T>,
): BreakpointCustomizable<T> {
  if (typeof value === 'string') {
    const trimmed = (value as string).trim();
    if (trimmed.startsWith('{')) {
      try {
        return JSON.parse(trimmed) as BreakpointMap<T>;
      } catch {
        // Not valid JSON — treat as a plain string value
      }
    }
  }
  return value;
}

/**
 * Returns `true` when a BreakpointCustomizable value is a breakpoint map
 * (has a `base` key OR any Breakpoint key), `false` when it is a plain value.
 */
export function isBreakpointMap<T>(
  value: BreakpointCustomizable<T>,
): value is BreakpointMap<T> {
  if (typeof value !== 'object' || value === null) return false;
  const keys = Object.keys(value as object);
  return keys.some((k) => k === 'base' || k in BREAKPOINT_PX);
}

/**
 * Resolve the effective value for a given breakpoint.
 * Returns `fallback` when the map has no matching entry.
 */
export function resolveBreakpointValue<T>(
  map: BreakpointMap<T>,
  breakpoint: Breakpoint | 'base',
  fallback: T,
): T {
  return (map as Record<string, T | undefined>)[breakpoint] ?? fallback;
}

/**
 * Generate one CSS `@media` block per named breakpoint in the map.
 *
 * @param prop  - The CSS property/selector fragment to update.
 * @param map   - The breakpoint map.
 * @param toCss - Maps a value `T` to one or more CSS declarations.
 * @returns A concatenated CSS string with `@media (min-width: …)` rules.
 *
 * @example
 * generateBreakpointCss(
 *   { base: false, lg: true },
 *   (v) => v ? '.btn__label { display: none; }' : '.btn__label { display: inline; }',
 * )
 * // Produces:
 * // .btn__label { display: inline; }
 * // @media (min-width: 1024px) { .btn__label { display: none; } }
 */
export function generateBreakpointCss<T>(
  map: BreakpointMap<T>,
  toCss: (value: T) => string,
): string {
  const parts: string[] = [];

  if (map.base !== undefined) {
    parts.push(toCss(map.base));
  }

  const bpOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  for (const bp of bpOrder) {
    const val = (map as Record<string, T | undefined>)[bp];
    if (val !== undefined) {
      parts.push(`@media (min-width: ${BREAKPOINT_PX[bp]}px) { ${toCss(val)} }`);
    }
  }

  return parts.join('\n');
}
