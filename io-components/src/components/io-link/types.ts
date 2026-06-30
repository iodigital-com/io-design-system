/** Underline animation behaviour */
export type IoLinkVariant =
  | 'standalone'  // no underline at rest → grows from left on hover (CTA use)
  | 'inline';     // underline at rest → slides out on hover (body text use)

/** Text colour theme */
export type IoLinkColor = 'blue' | 'black' | 'white';

/** Valid aria-current attribute values for navigation links */
export type IoLinkAriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';

/**
 * Explicit underline override that decouples underline state from variant.
 * When set, overrides the variant-driven underline behaviour.
 *
 * - `'always'` — underline visible at rest regardless of variant
 * - `'hover'`  — underline appears only on hover (same as standalone default)
 * - `'none'`   — underline suppressed in all states
 */
export type IoLinkUnderline = 'always' | 'hover' | 'none';
