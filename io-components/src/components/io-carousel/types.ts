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

/**
 * Internationalisation strings for io-carousel.
 * All keys are optional — provide only those that need translation.
 * When an `intl` prop is supplied, its keys take precedence over the
 * individual string props (`prevLabel`, `nextLabel`, `label`, `skipLabel`).
 */
export type IoCarouselIntl = {
  /** Label for the "previous slide" button. */
  prev?: string;
  /** Label for the "next slide" button. */
  next?: string;
  /** Accessible label for the carousel region (`aria-label` / `aria-roledescription`). */
  label?: string;
  /** Text for the skip link that lets keyboard users bypass the carousel. */
  skip?: string;
};

/** Trims whitespace from the start and/or end of the carousel slide track. */
export type IoCarouselTrimSpace = 'start' | 'end' | 'both' | 'none';
