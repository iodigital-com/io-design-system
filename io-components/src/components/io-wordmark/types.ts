/** Which visual representation the wordmark renders */
export type IoWordmarkVariant = 'mark' | 'lockup';

/**
 * Colour applied to the wordmark.
 * 'beige' is only valid for variant='mark' — the lockup variant
 * has no official beige brand asset.
 */
export type IoWordmarkColor = 'blue' | 'black' | 'white' | 'beige';

/** Wordmark size scale — controls SVG height for mark and lockup variants */
export type IoWordmarkSize = 'sm' | 'md' | 'lg' | 'xl' | 'inherit';
