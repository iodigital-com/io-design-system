import { describe, it, expect, vi } from 'vitest';

import { IoCarousel } from './io-carousel';

describe('io-carousel - navigation guard behavior (disabled not applicable)', () => {
  it('navigation handlers are safe no-ops when track is unavailable', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };

    expect(() => {
      (component as any).onPrev();
      (component as any).onNext();
    }).not.toThrow();
  });

  it('rewinds at boundaries when configured', () => {
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
});
