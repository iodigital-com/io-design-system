/** Which visual representation the wordmark renders */
export type IoWordmarkVariant = 'mark' | 'text' | 'lockup';

/**
 * Colour applied to the wordmark.
 * 'beige' is only valid for variant='mark' — the lockup and text variants
 * have no official beige brand asset.
 */
export type IoWordmarkColor = 'blue' | 'black' | 'white' | 'beige';

/** Wordmark size scale — controls font-size (text) or SVG height (mark/lockup) */
export type IoWordmarkSize = 'sm' | 'md' | 'lg' | 'xl';
