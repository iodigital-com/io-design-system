/** Public value for `slidesPerPage`. */
export type IoCarouselSlidesPerPage = number | 'auto';

/** Detail payload emitted by the `update` event. */
export type IoCarouselUpdateDetail = {
	activeIndex: number;
	totalSlides: number;
};
