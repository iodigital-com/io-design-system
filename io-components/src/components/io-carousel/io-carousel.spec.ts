import { describe, it, expect, vi } from 'vitest';
import { IoCarousel } from './io-carousel';

describe('io-carousel — default props', () => {
  let component: IoCarousel;

  beforeEach(() => {
    component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
  });

  it('has empty items array by default', () => {
    expect(component.items).toHaveLength(0);
  });

  it('defaults prevLabel to "Previous"', () => {
    expect(component.prevLabel).toBe('Previous');
  });

  it('defaults nextLabel to "Next"', () => {
    expect(component.nextLabel).toBe('Next');
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
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(track) };
    (component as any).el = { shadowRoot };
  });

  it('sets isDragging true on mousedown', () => {
    const track = (component as any).el.shadowRoot.querySelector('.carousel-track');
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

describe('io-carousel — slideWidth fallback', () => {
  it('returns 390 when track has no slides', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(track) };
    (component as any).el = { shadowRoot };
    expect((component as any).slideWidth()).toBe(390);
  });
});
