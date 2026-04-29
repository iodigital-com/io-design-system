import { describe, it, expect } from 'vitest';

import { IoBadge } from './io-badge';
import { getBadgeClassName } from './io-badge-utils';

describe('io-badge - disabled behavior (not applicable)', () => {
  it('renders as passive content without requiring disabled state handling', () => {
    const component = new IoBadge() as any;
    component.variant = 'warning';

    expect(() => component.render()).not.toThrow();
    expect(getBadgeClassName(component.variant)).toBe('badge badge--warning');
    expect(component.click).toBeUndefined();
    expect(component.toggle).toBeUndefined();
  });

  it('keeps passive rendering behavior across semantic variants', () => {
    const component = new IoBadge();
    const variants = ['beige', 'blue', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'] as const;

    expect(() => {
    for (const variant of variants) {
      component.variant = variant;
      component.render();
    }
    }).not.toThrow();
  });
});
