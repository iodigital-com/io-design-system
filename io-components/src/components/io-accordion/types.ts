/** Emitted when the accordion item is toggled */
export interface IoAccordionUpdateDetail {
  /** Whether the accordion is now open */
  open: boolean;
}

/** Allowed heading tag names */
export type IoAccordionHeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/** Size preset — controls trigger padding and title font size */
export type IoAccordionSize = 'sm' | 'md' | 'lg';

/**
 * Background fill variant for the accordion item.
 * - `transparent`: no background fill (default)
 * - `surface`: uses `var(--io-bg-surface)` — subtle fill for card/nested layouts
 * - `canvas`: uses `var(--io-bg-page)` — page-level fill
 */
export type IoAccordionBackground = 'transparent' | 'surface' | 'canvas';

/** Position of the expand/collapse marker icon relative to the trigger title */
export type IoAccordionAlignMarker = 'start' | 'end';
