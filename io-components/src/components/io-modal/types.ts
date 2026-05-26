export type IoModalSize = 'sm' | 'md' | 'lg';

/**
 * Background surface level for the io-modal panel.
 * - canvas:   var(--io-bg-page) — default page background
 * - surface:  var(--io-bg-surface) — slightly elevated surface
 * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
 */
export type IoModalBackground = 'canvas' | 'surface' | 'elevated';
