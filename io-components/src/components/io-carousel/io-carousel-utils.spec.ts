import { describe, it, expect } from 'vitest';
import { clampSlideIndex, getCarouselFallbackDistance, getCarouselTargetIndex, getCarouselStepSize, normalizeSlidesPerPage, shouldUseTargetScroll } from './io-carousel-utils';

describe('io-carousel-utils', () => {
  it('normalizes slidesPerPage values safely', () => {
    expect(normalizeSlidesPerPage('auto')).toBe('auto');
    expect(normalizeSlidesPerPage(2.9)).toBe(2);
    expect(normalizeSlidesPerPage(0)).toBe(1);
    expect(normalizeSlidesPerPage(Number.NaN as any)).toBe(1);
  });

  it('derives step size from normalized slidesPerPage', () => {
    expect(getCarouselStepSize('auto')).toBe(1);
    expect(getCarouselStepSize(3)).toBe(3);
  });

  it('clamps slide index to bounds', () => {
    expect(clampSlideIndex(5, 3)).toBe(2);
    expect(clampSlideIndex(-1, 3)).toBe(0);
    expect(clampSlideIndex(2, 0)).toBe(0);
  });

  it('returns safe target index across rewind and empty-list edges', () => {
    expect(getCarouselTargetIndex(0, 1, 0, true, 'prev')).toBe(0);
    expect(getCarouselTargetIndex(0, 1, 5, true, 'prev')).toBe(4);
    expect(getCarouselTargetIndex(4, 1, 5, true, 'next')).toBe(0);
    expect(getCarouselTargetIndex(4, 2, 5, false, 'next')).toBe(4);
  });

  it('detects target scroll threshold and fallback distance', () => {
    expect(shouldUseTargetScroll(10, 9)).toBe(false);
    expect(shouldUseTargetScroll(12, 9)).toBe(true);
    expect(getCarouselFallbackDistance(100)).toBe(120);
    expect(getCarouselFallbackDistance(500)).toBe(450);
  });
});
