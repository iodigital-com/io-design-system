/**
 * Responsive breakpoint map for `slidesPerPage`.
 * Each key corresponds to a min-width breakpoint:
 *   sm → 640px, md → 768px, lg → 1024px, xl → 1280px.
 * Values are resolved at runtime using `matchMedia` — the largest matching
 * breakpoint wins. If no key matches the current viewport, falls back to `1`.
 */
export type IoCarouselResponsiveSlidesPerPage = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

/** Public value for `slidesPerPage`. */
export type IoCarouselSlidesPerPage = number | 'auto' | IoCarouselResponsiveSlidesPerPage;

/** Alignment for the carousel heading and description header area. */
export type IoCarouselAlignHeader = 'left' | 'center';

/** Detail payload emitted by the `update` event. */
export type IoCarouselUpdateDetail = {
	activeIndex: number;
	previousIndex: number;
	totalSlides: number;
};
