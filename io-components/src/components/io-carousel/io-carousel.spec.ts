import { describe, it, expect, vi } from 'vitest';
import { IoCarousel } from './io-carousel';

describe('io-carousel — default props', () => {
  let component: IoCarousel;

  beforeEach(() => {
    component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
  });

  it('defaults prevLabel to "Previous"', () => {
    expect(component.prevLabel).toBe('Previous');
  });

  it('defaults nextLabel to "Next"', () => {
    expect(component.nextLabel).toBe('Next');
  });

  it('defaults slidesPerPage to 1', () => {
    expect(component.slidesPerPage).toBe(1);
  });

  it('defaults rewind to false', () => {
    expect(component.rewind).toBe(false);
  });

  it('defaults activeSlideIndex to 0', () => {
    expect(component.activeSlideIndex).toBe(0);
  });

  it('is not dragging by default', () => {
    expect((component as any).isDragging).toBe(false);
  });
});

describe('io-carousel — drag interaction', () => {
  let component: IoCarousel;

  beforeEach(() => {
    component = new IoCarousel();
    const track = document.createElement('div');
    track.className = 'carousel-track';
    Object.defineProperty(track, 'offsetLeft', { value: 0 });
    track.scrollLeft = 100;
    const slot = document.createElement('slot');
    const shadowRoot = {
      querySelector: vi.fn((sel: string) => {
        if (sel === '.carousel-track') return track;
        if (sel === 'slot') return slot;
        return null;
      }),
    };
    (component as any).el = { shadowRoot };
  });

  it('sets isDragging true on mousedown', () => {
    const ev = { pageX: 200 } as MouseEvent;
    (component as any).onMouseDown(ev);
    expect((component as any).isDragging).toBe(true);
  });

  it('clears isDragging on mouseup', () => {
    (component as any).isDragging = true;
    component.onMouseUp();
    expect((component as any).isDragging).toBe(false);
  });
});

describe('io-carousel — behavior helpers', () => {
  it('normalizes invalid slidesPerPage values to 1', () => {
    const component = new IoCarousel();
    component.slidesPerPage = 0 as any;
    expect((component as any).normalizedSlidesPerPage).toBe(1);
  });

  it('accepts slidesPerPage auto', () => {
    const component = new IoCarousel();
    component.slidesPerPage = 'auto';
    expect((component as any).normalizedSlidesPerPage).toBe('auto');
  });

  it('clamps active index to last slide', () => {
    const component = new IoCarousel();
    Object.defineProperty(component as any, 'totalSlides', { get: () => 4 });
    expect((component as any).clampIndex(99)).toBe(3);
  });

  it('computes page for numeric slidesPerPage', () => {
    const component = new IoCarousel();
    component.slidesPerPage = 2;
    expect((component as any).stepSize).toBe(2);
  });

  it('onNext scrolls to target slide boundary', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollWidth', { value: 2000 });
    Object.defineProperty(track, 'scrollLeft', { value: 100, writable: true });
    (track as any).scrollTo = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 5 });
    (component as any).getNearestSlideIndex = vi.fn(() => 1);
    (component as any).getSlideLeft = vi.fn(() => 500);
    component.slidesPerPage = 1;
    (component as any).onNext();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 500, behavior: 'smooth' });
  });

  it('onPrev rewinds to end when enabled and at first slide', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollWidth', { value: 1600 });
    Object.defineProperty(track, 'scrollLeft', { value: 0, writable: true });
    (track as any).scrollTo = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 0 });
    component.rewind = true;
    (component as any).onPrev();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 800, behavior: 'smooth' });
  });

  it('uses step size against nearest slide index for mixed-width content', () => {
    const component = new IoCarousel();
    Object.defineProperty(component as any, 'totalSlides', { get: () => 6 });
    (component as any).getNearestSlideIndex = vi.fn(() => 2);
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollWidth', { value: 2000 });
    Object.defineProperty(track, 'scrollLeft', { value: 100, writable: true });
    (track as any).scrollTo = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    (component as any).getSlideLeft = vi.fn(() => 900);
    component.slidesPerPage = 2;

    (component as any).onNext();

    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 900, behavior: 'smooth' });
  });

  it('falls back to scrollBy when target boundary equals current scrollLeft', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 900 });
    Object.defineProperty(track, 'scrollWidth', { value: 3000 });
    Object.defineProperty(track, 'scrollLeft', { value: 500, writable: true });
    (track as any).scrollBy = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 5 });
    (component as any).getNearestSlideIndex = vi.fn(() => 1);
    (component as any).getSlideLeft = vi.fn(() => 500);
    component.slidesPerPage = 1;

    (component as any).onNext();

    expect((track as any).scrollBy).toHaveBeenCalledWith({ left: 810, behavior: 'smooth' });
  });
});
