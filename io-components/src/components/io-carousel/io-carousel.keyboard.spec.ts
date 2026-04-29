import { describe, it, expect, vi } from 'vitest';

import { IoCarousel } from './io-carousel';

describe('io-carousel - keyboard and accessibility contracts', () => {
  it('exposes configurable previous and next navigation labels', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.prevLabel = 'Previous carousel item';
    component.nextLabel = 'Next carousel item';

    expect(component.prevLabel).toBe('Previous carousel item');
    expect(component.nextLabel).toBe('Next carousel item');
  });

  it('keeps drag interaction pointer-based (no keyboard drag handler on track)', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };

    expect(typeof (component as any).onMouseDown).toBe('function');
    expect((component as any).onKeyDown).toBeUndefined();
  });

  it('supports button-driven navigation handlers without throwing', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };

    expect(() => {
      (component as any).onPrev();
      (component as any).onNext();
    }).not.toThrow();
  });
});
