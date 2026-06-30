import { describe, it, expect } from 'vitest';

import { IoBadge } from './io-badge';
import { getBadgeClassName } from './io-badge-utils';

describe('io-badge - disabled behavior (not applicable)', () => {
  it('renders as passive content without requiring disabled state handling', () => {
    const component = new IoBadge() as any;
    component.variant = 'warning';

    expect(() => component.render()).not.toThrow();
    expect(getBadgeClassName(component.variant, component.appearance, component.size)).toBe('badge badge--warning badge--soft badge--md');
    expect(component.click).toBeUndefined();
    expect(component.toggle).toBeUndefined();
  });

  it('keeps passive rendering behavior across semantic variants', () => {
    const component = new IoBadge();
    const variants = ['neutral', 'primary', 'info', 'success', 'warning', 'error', 'subtle'] as const;

    expect(() => {
      for (const variant of variants) {
        component.variant = variant;
        component.render();
      }
    }).not.toThrow();
  });

  it('keeps passive rendering behavior across deprecated brand-colour variants', () => {
    const component = new IoBadge();
    const legacyVariants = ['beige', 'blue', 'dark', 'orange', 'rouge', 'outline'] as const;

    expect(() => {
      for (const variant of legacyVariants) {
        component.variant = variant;
        component.render();
      }
    }).not.toThrow();
  });
});
