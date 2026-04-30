import { describe, it, expect } from 'vitest';

import { IoBadge } from './io-badge';
import { getBadgeClassName } from './io-badge-utils';

describe('io-badge - default props and render contract', () => {
  it('has blue as the default variant', () => {
    const component = new IoBadge();
    expect(component.variant).toBe('blue');
  });

  it('maps variant to expected class name', () => {
    expect(getBadgeClassName('success', 'sm')).toBe('badge badge--success badge--sm');
    expect(getBadgeClassName('outline', 'md')).toBe('badge badge--outline badge--md');
  });

  it('uses md as the default size', () => {
    const component = new IoBadge();
    expect(component.size).toBe('md');
  });

  it('renders without throwing for each supported variant', () => {
    const variants = ['beige', 'blue', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'] as const;

    for (const variant of variants) {
      const component = new IoBadge();
      component.variant = variant;
      expect(() => component.render()).not.toThrow();
    }
  });
});
