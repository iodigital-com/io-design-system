/**
 * Background surface level for the io-sheet panel.
 * Matches the sibling overlay API (io-modal, io-drawer, io-flyout).
 * - canvas:   var(--io-bg-page) — default page background
 * - surface:  var(--io-bg-surface) — slightly elevated surface
 * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
 */
export type IoSheetBackground = 'canvas' | 'surface' | 'elevated';
