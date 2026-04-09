import type { IoCarouselSlidesPerPage } from './types';

export function normalizeSlidesPerPage(slidesPerPage: IoCarouselSlidesPerPage): IoCarouselSlidesPerPage {
  if (slidesPerPage === 'auto') return 'auto';
  const parsed = Number(slidesPerPage);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export function getCarouselStepSize(slidesPerPage: IoCarouselSlidesPerPage): number {
  return slidesPerPage === 'auto' ? 1 : slidesPerPage;
}

export function clampSlideIndex(index: number, totalSlides: number): number {
  if (totalSlides === 0) return 0;
  return Math.max(0, Math.min(index, totalSlides - 1));
}

export function getCarouselTargetIndex(
  currentIndex: number,
  stepSize: number,
  totalSlides: number,
  rewind: boolean,
  direction: 'prev' | 'next',
): number {
  if (direction === 'prev') {
    const rawTarget = currentIndex - stepSize;
    if (rawTarget < 0) {
      return rewind ? totalSlides - 1 : 0;
    }
    return rawTarget;
  }

  const rawTarget = currentIndex + stepSize;
  if (rawTarget >= totalSlides) {
    return rewind ? 0 : totalSlides - 1;
  }
  return rawTarget;
}

export function shouldUseTargetScroll(targetLeft: number, currentLeft: number): boolean {
  return Math.abs(targetLeft - currentLeft) > 1;
}

export function getCarouselFallbackDistance(clientWidth: number): number {
  return Math.max(clientWidth * 0.9, 120);
}
