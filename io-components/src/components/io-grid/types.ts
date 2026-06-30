/**
 * io-grid / io-grid-item type unions.
 * =====================================
 * Exported so storefront pages and wrapper generators can reference them.
 */

/** Number of grid columns the container should span (1–12). */
export type IoGridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Align-items value for the grid container. */
export type IoGridAlign = 'start' | 'center' | 'end' | 'stretch';

/** Justify-items value for the grid container. */
export type IoGridJustify = 'start' | 'center' | 'end' | 'stretch';

/** Gap size preset. Maps to --io-grid-gap-* tokens. */
export type IoGridGap = 'none' | 'sm' | 'md' | 'lg';

/** Number of columns a grid-item should span (1–12). */
export type IoGridItemColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Number of rows a grid-item should span. */
export type IoGridItemRowSpan = 1 | 2 | 3 | 4 | 5 | 6;

/** Starting column line for a grid-item (1–12). */
export type IoGridItemColStart = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';

export const IO_GRID_ALIGN_VALUES: IoGridAlign[] = ['start', 'center', 'end', 'stretch'];
export const IO_GRID_JUSTIFY_VALUES: IoGridJustify[] = ['start', 'center', 'end', 'stretch'];
export const IO_GRID_GAP_VALUES: IoGridGap[] = ['none', 'sm', 'md', 'lg'];
