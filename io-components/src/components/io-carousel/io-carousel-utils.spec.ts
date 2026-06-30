import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import {
  clampSlideIndex,
  getCarouselFallbackDistance,
  getCarouselPageCount,
  getCarouselStepSize,
  getCarouselTargetIndex,
  getPageStartIndex,
  isResponsiveSlidesPerPage,
  normalizeSlidesPerPage,
  resolveEffectiveSlidesPerPage,
  resolveResponsiveSlidesPerPage,
  shouldUseTargetScroll,
} from './io-carousel-utils';

describe('io-carousel-utils', () => {
  it('normalizes slidesPerPage values safely', () => {
    expect(normalizeSlidesPerPage('auto')).toBe('auto');
    expect(normalizeSlidesPerPage(2.9)).toBe(2);
    expect(normalizeSlidesPerPage(0)).toBe(1);
    expect(normalizeSlidesPerPage(Number.NaN as any)).toBe(1);
  });

  it('normalizes responsive map through (returns the object as-is)', () => {
    const map = { sm: 1, md: 2 };
    expect(normalizeSlidesPerPage(map)).toBe(map);
  });

  it('derives step size from normalized slidesPerPage', () => {
    expect(getCarouselStepSize('auto')).toBe(1);
    expect(getCarouselStepSize(3)).toBe(3);
  });

  it('returns step size 1 for responsive map (navigation always 1 step)', () => {
    expect(getCarouselStepSize({ sm: 2, md: 3 })).toBe(1);
  });

  it('clamps slide index to bounds', () => {
    expect(clampSlideIndex(5, 3)).toBe(2);
    expect(clampSlideIndex(-1, 3)).toBe(0);
    expect(clampSlideIndex(2, 0)).toBe(0);
    expect(clampSlideIndex(Number.NaN, 3)).toBe(0);
  });

  it('returns safe target index across rewind and empty-list edges', () => {
    expect(getCarouselTargetIndex(0, 1, 0, true, 'prev')).toBe(0);
    expect(getCarouselTargetIndex(0, 1, 5, true, 'prev')).toBe(4);
    expect(getCarouselTargetIndex(4, 1, 5, true, 'next')).toBe(0);
    expect(getCarouselTargetIndex(4, 2, 5, false, 'next')).toBe(4);
  });

  it('returns 0 when prev direction wraps below 0 with rewind=false (line 34 false branch)', () => {
    expect(getCarouselTargetIndex(0, 1, 5, false, 'prev')).toBe(0);
  });

  it('returns rawTarget when prev direction does not underflow (line 37 branch)', () => {
    expect(getCarouselTargetIndex(2, 1, 5, false, 'prev')).toBe(1);
  });

  it('detects target scroll threshold and fallback distance', () => {
    expect(shouldUseTargetScroll(10, 9)).toBe(false);
    expect(shouldUseTargetScroll(12, 9)).toBe(true);
    expect(getCarouselFallbackDistance(100)).toBe(120);
    expect(getCarouselFallbackDistance(500)).toBe(450);
  });
});

describe('isResponsiveSlidesPerPage', () => {
  it('returns true for an object map', () => {
    expect(isResponsiveSlidesPerPage({ sm: 1, md: 2 })).toBe(true);
  });

  it('returns false for a number', () => {
    expect(isResponsiveSlidesPerPage(2)).toBe(false);
  });

  it('returns false for "auto"', () => {
    expect(isResponsiveSlidesPerPage('auto')).toBe(false);
  });
});

describe('resolveResponsiveSlidesPerPage', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    matchMediaMock = vi.fn();
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the xl value when viewport >= 1280px', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 1280px)' || query === '(min-width: 1024px)' || query === '(min-width: 768px)' || query === '(min-width: 640px)',
    }));
    expect(resolveResponsiveSlidesPerPage({ sm: 1, md: 2, lg: 3, xl: 4 })).toBe(4);
  });

  it('returns the lg value when viewport is 1024px–1279px', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 1024px)' || query === '(min-width: 768px)' || query === '(min-width: 640px)',
    }));
    expect(resolveResponsiveSlidesPerPage({ sm: 1, md: 2, lg: 3, xl: 4 })).toBe(3);
  });

  it('returns the md value when viewport is 768px–1023px', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 768px)' || query === '(min-width: 640px)',
    }));
    expect(resolveResponsiveSlidesPerPage({ sm: 1, md: 2, lg: 3, xl: 4 })).toBe(2);
  });

  it('returns the sm value when viewport is 640px–767px', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 640px)',
    }));
    expect(resolveResponsiveSlidesPerPage({ sm: 2, md: 3 })).toBe(2);
  });

  it('falls back to 1 when no breakpoint matches', () => {
    matchMediaMock.mockImplementation(() => ({ matches: false }));
    expect(resolveResponsiveSlidesPerPage({ sm: 2, md: 3 })).toBe(1);
  });

  it('skips undefined keys and uses the next matching breakpoint', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 1280px)' || query === '(min-width: 1024px)',
    }));
    // xl is undefined, so lg should win
    expect(resolveResponsiveSlidesPerPage({ lg: 3 })).toBe(3);
  });

  it('clamps invalid values to 1', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === '(min-width: 640px)',
    }));
    expect(resolveResponsiveSlidesPerPage({ sm: 0 })).toBe(1);
  });
});

describe('resolveEffectiveSlidesPerPage', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false }));
  });

  it('returns "auto" for slidesPerPage="auto"', () => {
    expect(resolveEffectiveSlidesPerPage('auto')).toBe('auto');
  });

  it('returns clamped number for numeric slidesPerPage', () => {
    expect(resolveEffectiveSlidesPerPage(3)).toBe(3);
    expect(resolveEffectiveSlidesPerPage(0)).toBe(1);
    expect(resolveEffectiveSlidesPerPage(2.7)).toBe(2);
  });

  it('resolves responsive map to a number', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false }));
    expect(resolveEffectiveSlidesPerPage({ md: 2 })).toBe(1);
  });
});

describe('getCarouselPageCount', () => {
  it('returns 0 when totalSlides is 0', () => {
    expect(getCarouselPageCount(0, 2)).toBe(0);
  });

  it('returns totalSlides when effectiveSlidesPerPage is "auto"', () => {
    expect(getCarouselPageCount(5, 'auto')).toBe(5);
  });

  it('returns totalSlides when effectiveSlidesPerPage is 1', () => {
    expect(getCarouselPageCount(5, 1)).toBe(5);
  });

  it('returns ceil(total / N) pages for N > 1', () => {
    expect(getCarouselPageCount(6, 2)).toBe(3);
    expect(getCarouselPageCount(5, 2)).toBe(3);
    expect(getCarouselPageCount(9, 3)).toBe(3);
    expect(getCarouselPageCount(10, 3)).toBe(4);
  });
});

describe('getPageStartIndex', () => {
  it('returns 0 for page 0', () => {
    expect(getPageStartIndex(0, 3)).toBe(0);
  });

  it('returns pageIndex * slidesPerPage', () => {
    expect(getPageStartIndex(1, 3)).toBe(3);
    expect(getPageStartIndex(2, 3)).toBe(6);
    expect(getPageStartIndex(3, 2)).toBe(6);
  });
});
