import { describe, it, expect } from 'vitest';

import { IoBadge } from './io-badge';
import { getBadgeClassName } from './io-badge-utils';

describe('io-badge - default props and render contract', () => {
  it('has primary as the default variant', () => {
    const component = new IoBadge();
    expect(component.variant).toBe('primary');
  });

  it('has soft as the default appearance', () => {
    const component = new IoBadge();
    expect(component.appearance).toBe('soft');
  });

  it('maps variant+appearance to expected class name', () => {
    expect(getBadgeClassName('success', 'soft', 'sm')).toBe('badge badge--success badge--soft badge--sm');
    expect(getBadgeClassName('neutral', 'solid', 'md')).toBe('badge badge--neutral badge--solid badge--md');
    expect(getBadgeClassName('primary', 'frosted', 'lg')).toBe('badge badge--primary badge--frosted badge--lg');
  });

  it('uses md as the default size', () => {
    const component = new IoBadge();
    expect(component.size).toBe('md');
  });

  it('renders without throwing for each supported semantic variant', () => {
    const variants = ['neutral', 'primary', 'info', 'success', 'warning', 'error', 'subtle'] as const;

    for (const variant of variants) {
      const component = new IoBadge();
      component.variant = variant;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('includes badge--lg class when size is lg', () => {
    expect(getBadgeClassName('success', 'soft', 'lg')).toBe('badge badge--success badge--soft badge--lg');
  });

  it('stores ariaLabel prop when provided', () => {
    const component = new IoBadge();
    component.ariaLabel = 'New feature';
    expect(component.ariaLabel).toBe('New feature');
  });

  it('stores ariaLabel as undefined when not provided', () => {
    const component = new IoBadge();
    expect(component.ariaLabel).toBeUndefined();
  });

  it('has no icon by default', () => {
    const component = new IoBadge();
    expect(component.icon).toBeUndefined();
  });

  it('has no iconSource by default', () => {
    const component = new IoBadge();
    expect(component.iconSource).toBeUndefined();
  });
});
