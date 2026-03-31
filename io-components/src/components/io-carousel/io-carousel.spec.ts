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

describe('io-carousel — slideWidth', () => {
  it('returns 390 when slot has no assigned elements', () => {
    const component = new IoCarousel();
    const slot = document.createElement('slot');
    vi.spyOn(slot, 'assignedElements').mockReturnValue([]);
    const shadowRoot = {
      querySelector: vi.fn((sel: string) => {
        if (sel === 'slot') return slot;
        return null;
      }),
    };
    (component as any).el = { shadowRoot };
    expect((component as any).slideWidth()).toBe(390);
  });

  it('uses first assigned element width + gap', () => {
    const component = new IoCarousel();
    const child = document.createElement('div');
    Object.defineProperty(child, 'offsetWidth', { value: 376 });
    const slot = document.createElement('slot');
    vi.spyOn(slot, 'assignedElements').mockReturnValue([child]);
    const shadowRoot = {
      querySelector: vi.fn((sel: string) => {
        if (sel === 'slot') return slot;
        return null;
      }),
    };
    (component as any).el = { shadowRoot };
    expect((component as any).slideWidth()).toBe(376 + 16);
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

  it('onNext scrolls track by one step', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'scrollWidth', { value: 1600 });
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollLeft', { value: 0, writable: true });
    (track as any).scrollBy = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    (component as any).slideWidth = vi.fn(() => 300);
    component.slidesPerPage = 1;
    (component as any).onNext();
    expect((track as any).scrollBy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });

  it('onPrev rewinds to end when enabled and at start', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'scrollWidth', { value: 1600 });
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollLeft', { value: 0, writable: true });
    (track as any).scrollTo = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    (component as any).slideWidth = vi.fn(() => 300);
    component.rewind = true;
    (component as any).onPrev();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 800, behavior: 'smooth' });
  });
});
