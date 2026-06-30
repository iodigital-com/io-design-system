import type { IoCarouselResponsiveSlidesPerPage, IoCarouselSlidesPerPage } from './types';

/**
 * Min-width breakpoints (px) for the responsive map keys.
 * Order matters — largest first so the first match wins.
 */
const CAROUSEL_BREAKPOINTS: { key: keyof IoCarouselResponsiveSlidesPerPage; minWidth: number }[] = [
  { key: 'xl', minWidth: 1280 },
  { key: 'lg', minWidth: 1024 },
  { key: 'md', minWidth: 768 },
  { key: 'sm', minWidth: 640 },
];

/**
 * Returns true when the value is a responsive breakpoint map object
 * (not a number and not 'auto').
 */
export function isResponsiveSlidesPerPage(
  value: IoCarouselSlidesPerPage,
): value is IoCarouselResponsiveSlidesPerPage {
  return typeof value === 'object' && value !== null;
}

/**
 * Resolves a responsive `slidesPerPage` map to a concrete number or `'auto'`
 * by evaluating each breakpoint in descending order with `matchMedia`.
 * Falls back to `1` when no breakpoint matches or value is invalid.
 *
 * Must only be called in browser environments.
 */
export function resolveResponsiveSlidesPerPage(
  map: IoCarouselResponsiveSlidesPerPage,
): number {
  for (const { key, minWidth } of CAROUSEL_BREAKPOINTS) {
    const val = map[key];
    if (val !== undefined && typeof window !== 'undefined' && window.matchMedia(`(min-width: ${minWidth}px)`).matches) {
      const parsed = Number(val);
      if (Number.isFinite(parsed) && parsed >= 1) return Math.floor(parsed);
    }
  }
  return 1;
}

export function normalizeSlidesPerPage(slidesPerPage: IoCarouselSlidesPerPage): IoCarouselSlidesPerPage {
  if (slidesPerPage === 'auto') return 'auto';
  if (isResponsiveSlidesPerPage(slidesPerPage)) return slidesPerPage;
  const parsed = Number(slidesPerPage);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export function getCarouselStepSize(slidesPerPage: IoCarouselSlidesPerPage): number {
  if (slidesPerPage === 'auto' || isResponsiveSlidesPerPage(slidesPerPage)) return 1;
  return slidesPerPage;
}

/**
 * Resolves the effective (concrete) `slidesPerPage` value for layout and
 * pagination purposes. Handles numeric, `'auto'`, and responsive map forms.
 *
 * Returns `'auto'` for `slidesPerPage='auto'`, a number ≥ 1 otherwise.
 */
export function resolveEffectiveSlidesPerPage(
  slidesPerPage: IoCarouselSlidesPerPage,
): number | 'auto' {
  if (slidesPerPage === 'auto') return 'auto';
  if (isResponsiveSlidesPerPage(slidesPerPage)) {
    return resolveResponsiveSlidesPerPage(slidesPerPage);
  }
  const parsed = Number(slidesPerPage);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

/**
 * Computes the number of pagination pages for a given total slide count and
 * effective `slidesPerPage` value.
 *
 * - `'auto'` → one dot per slide (total pages = totalSlides)
 * - numeric N → `ceil(totalSlides / N)` pages
 */
export function getCarouselPageCount(
  totalSlides: number,
  effectiveSlidesPerPage: number | 'auto',
): number {
  if (totalSlides <= 0) return 0;
  if (effectiveSlidesPerPage === 'auto' || effectiveSlidesPerPage <= 1) return totalSlides;
  return Math.ceil(totalSlides / effectiveSlidesPerPage);
}

/**
 * Returns the slide index that is the start of page `pageIndex` given a
 * numeric `slidesPerPage`.
 */
export function getPageStartIndex(pageIndex: number, slidesPerPage: number): number {
  return pageIndex * Math.max(1, slidesPerPage);
}

export function clampSlideIndex(index: number, totalSlides: number): number {
  if (totalSlides === 0) return 0;
  const parsed = Number(index);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(Math.floor(parsed), totalSlides - 1));
}

export function getCarouselTargetIndex(
  currentIndex: number,
  stepSize: number,
  totalSlides: number,
  rewind: boolean,
  direction: 'prev' | 'next',
): number {
  if (totalSlides <= 0) {
    return 0;
  }

  const safeStep = Number.isFinite(stepSize) && stepSize >= 1 ? Math.floor(stepSize) : 1;

  if (direction === 'prev') {
    const rawTarget = currentIndex - safeStep;
    if (rawTarget < 0) {
      return rewind ? totalSlides - 1 : 0;
    }
    return rawTarget;
  }

  const rawTarget = currentIndex + safeStep;
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
