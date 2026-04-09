import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoCarousel } from './io-carousel';

describe('io-carousel - click handling', () => {
  let component: IoCarousel;

  beforeEach(() => {
    component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 900 });
    Object.defineProperty(track, 'scrollWidth', { value: 3000 });
    Object.defineProperty(track, 'scrollLeft', { value: 100, writable: true });
    (track as any).scrollTo = vi.fn();
    (track as any).scrollBy = vi.fn();

    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };

    Object.defineProperty(component as any, 'totalSlides', { get: () => 5 });
    (component as any).getNearestSlideIndex = vi.fn(() => 1);
    (component as any).getSlideLeft = vi.fn(() => 500);
    component.slidesPerPage = 1;
  });

  it('next navigation scrolls to target slide boundary', () => {
    (component as any).onNext();

    const track = (component as any).track;
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 500, behavior: 'smooth' });
  });

  it('previous navigation scrolls to target slide boundary', () => {
    (component as any).getNearestSlideIndex = vi.fn(() => 3);
    (component as any).getSlideLeft = vi.fn(() => 50);

    (component as any).onPrev();

    const track = (component as any).track;
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 50, behavior: 'smooth' });
  });
});
