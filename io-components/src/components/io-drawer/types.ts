export type IoDrawerPlacement = 'left' | 'right' | 'bottom';
export type IoDrawerSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Background surface level for the io-drawer panel.
 * - canvas:   var(--io-bg-page) — default page background
 * - surface:  var(--io-bg-surface) — slightly elevated surface
 * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
 */
export type IoDrawerBackground = 'canvas' | 'surface' | 'elevated';
