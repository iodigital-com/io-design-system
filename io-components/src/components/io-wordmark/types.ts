/**
 * Which visual representation the wordmark renders.
 * - 'mark'   → geometric iO mark SVG (i + O)
 * - 'lockup' → full official brand lockup SVG (mark + "io digital" text)
 * - 'badge'  → square brand mark for app icons, avatars, and watermarks
 */
export type IoWordmarkVariant = 'mark' | 'lockup' | 'badge';

/**
 * Colour applied to the wordmark.
 * 'beige' is only valid for variant='mark' — the lockup variant
 * has no official beige brand asset.
 */
export type IoWordmarkColor = 'blue' | 'black' | 'white' | 'beige';

/** Wordmark size scale — controls SVG height for mark and lockup variants */
export type IoWordmarkSize = 'sm' | 'md' | 'lg' | 'xl' | 'inherit';
