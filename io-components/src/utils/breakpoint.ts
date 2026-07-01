/**
 * Breakpoint utility for BreakpointCustomizable props.
 *
 * Accepts a fixed string value OR an object mapping breakpoint keys to values:
 *   'sm'                         → always 'sm'
 *   { base: 'sm', l: '2xl' }     → 'sm' on mobile, '2xl' on large+ viewports
 *   '{"base":"sm","l":"2xl"}'    → JSON-string form (from HTML attribute binding)
 *
 * Breakpoint keys follow the iO token scale:
 *   base  — no min-width (mobile-first default)
 *   xs    — min-width: 375px
 *   sm    — min-width: 600px
 *   md    — min-width: 768px
 *   l     — min-width: 1024px  (alias: lg)
 *   xl    — min-width: 1200px
 *   2xl   — min-width: 1440px
 *   3xl   — min-width: 1920px
 */

export type BreakpointKey = 'base' | 'xs' | 'sm' | 'md' | 'l' | 'lg' | 'xl' | '2xl' | '3xl';

export type BreakpointValue<T extends string> = T | Partial<Record<BreakpointKey, T>>;

/**
 * A value that can be either a fixed scalar or a responsive object mapping
 * breakpoint keys to values. The type parameter T should be a string union.
 *
 * @example
 * // Fixed scalar — always 'md'
 * const size: BreakpointCustomizable<IoButtonSize> = 'md';
 *
 * // Responsive — 'sm' on mobile, 'lg' on large+ viewports
 * const size: BreakpointCustomizable<IoButtonSize> = { base: 'sm', l: 'lg' };
 *
 * // JSON-string form (used when setting HTML attributes from HTML/template strings)
 * const size: BreakpointCustomizable<IoButtonSize> = '{"base":"sm","l":"lg"}';
 */
export type BreakpointCustomizable<T extends string> = T | Partial<Record<BreakpointKey, T>>;

/** Maps breakpoint key to min-width px value (same values as --io-breakpoint-* tokens) */
const BREAKPOINT_PX: Record<Exclude<BreakpointKey, 'base'>, number> = {
  xs: 375,
  sm: 600,
  md: 768,
  l: 1024,
  lg: 1024,
  xl: 1200,
  '2xl': 1440,
  '3xl': 1920,
};

/** Ordered list for generating @media queries smallest-first */
const BREAKPOINT_ORDER: BreakpointKey[] = ['base', 'xs', 'sm', 'md', 'l', 'lg', 'xl', '2xl', '3xl'];

export interface ParsedBreakpoint<T extends string> {
  /** True when the value is a fixed scalar — no @media needed */
  isFixed: true;
  value: T;
}

export interface ParsedBreakpointResponsive<T extends string> {
  /** True when multiple breakpoints are specified */
  isFixed: false;
  entries: Array<{ key: BreakpointKey; value: T }>;
}

export type ParsedBreakpointResult<T extends string> = ParsedBreakpoint<T> | ParsedBreakpointResponsive<T>;

/**
 * Parse a BreakpointCustomizable value.
 * Returns either a fixed scalar or an ordered list of breakpoint entries.
 */
export function parseBreakpoint<T extends string>(
  raw: BreakpointValue<T> | undefined | null,
  fallback: T,
): ParsedBreakpointResult<T> {
  if (raw === undefined || raw === null) {
    return { isFixed: true, value: fallback };
  }

  // Parse JSON string form from HTML attributes
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed) as Partial<Record<BreakpointKey, T>>;
        return buildResponsive(parsed, fallback);
      } catch {
        // Fall through — treat as plain scalar
      }
    }
    // Plain scalar string
    return { isFixed: true, value: raw as T };
  }

  // Object form passed from JS/JSX
  if (typeof raw === 'object') {
    return buildResponsive(raw as Partial<Record<BreakpointKey, T>>, fallback);
  }

  return { isFixed: true, value: fallback };
}

function buildResponsive<T extends string>(
  obj: Partial<Record<BreakpointKey, T>>,
  fallback: T,
): ParsedBreakpointResult<T> {
  const entries = BREAKPOINT_ORDER
    .filter((key) => key in obj)
    .map((key) => ({ key, value: obj[key] as T }));

  if (entries.length === 0) {
    return { isFixed: true, value: fallback };
  }

  if (entries.length === 1 && entries[0].key === 'base') {
    return { isFixed: true, value: entries[0].value };
  }

  return { isFixed: false, entries };
}

/**
 * Build a CSS `@media` block string for a single breakpoint entry + property.
 *
 * @param key      - The breakpoint key (e.g. 'l', '2xl')
 * @param cssProps - The CSS declarations to inject (e.g. 'font-size: var(--io-font-size-2xl);')
 * @param selector - CSS selector to scope the rules under (e.g. '#bp-abc123')
 */
export function buildMediaBlock(key: BreakpointKey, cssProps: string, selector: string): string {
  if (key === 'base') {
    return `${selector} { ${cssProps} }`;
  }
  const px = BREAKPOINT_PX[key as Exclude<BreakpointKey, 'base'>];
  return `@media (min-width: ${px}px) { ${selector} { ${cssProps} } }`;
}

/**
 * Resolve a BreakpointCustomizable<T> value to the current T at render time.
 *
 * Uses window.matchMedia to check which breakpoint is currently active,
 * then returns the value for the largest matching breakpoint. Falls back to
 * `fallback` when no matching entry is found.
 *
 * This is a static read — it does NOT subscribe to viewport changes. The
 * component is responsible for triggering re-renders on resize if live
 * breakpoint tracking is required. For the initial release, static resolution
 * on each render() call is sufficient because Stencil will re-render when
 * the prop changes.
 *
 * Safe in SSR/jsdom environments: when `window` or `matchMedia` is not
 * available, returns the `base` value (or `fallback`).
 *
 * @param raw      - The BreakpointCustomizable value (scalar, object, or JSON string)
 * @param fallback - Value to return when `raw` is undefined/null or no match found
 */
export function resolveBreakpoint<T extends string>(
  raw: BreakpointCustomizable<T> | undefined | null,
  fallback: T,
): T {
  const parsed = parseBreakpoint<T>(raw as BreakpointValue<T> | undefined | null, fallback);

  if (parsed.isFixed) {
    return parsed.value;
  }

  // Responsive: find the last (largest) active breakpoint. BREAKPOINT_ORDER is
  // smallest-first so iterating in reverse gives us largest-first priority.
  const { entries } = parsed;

  // Guard: no window.matchMedia (SSR / jsdom without mock)
  const canMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia === 'function';

  // Walk from largest breakpoint to smallest (reverse of BREAKPOINT_ORDER).
  // Return the first entry whose media query matches.
  for (let i = entries.length - 1; i >= 0; i--) {
    const { key, value } = entries[i];
    if (key === 'base') {
      return value;
    }
    if (canMatchMedia) {
      const px = BREAKPOINT_PX[key as Exclude<BreakpointKey, 'base'>];
      if (window.matchMedia(`(min-width: ${px}px)`).matches) {
        return value;
      }
    }
  }

  // Fallback: use `base` entry if present, otherwise the provided fallback
  const baseEntry = entries.find((e) => e.key === 'base');
  return baseEntry ? baseEntry.value : fallback;
}
