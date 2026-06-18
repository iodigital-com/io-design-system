/** Public value for `slidesPerPage`. */
export type IoCarouselSlidesPerPage = number | 'auto';

/** Alignment for the carousel heading and description header area. */
export type IoCarouselAlignHeader = 'left' | 'center';

/** Detail payload emitted by the `update` event. */
export type IoCarouselUpdateDetail = {
	activeIndex: number;
	previousIndex: number;
	totalSlides: number;
};
