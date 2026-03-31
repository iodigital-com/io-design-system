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
