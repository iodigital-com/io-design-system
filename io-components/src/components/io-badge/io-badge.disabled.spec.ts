import { describe, it, expect } from 'vitest';
import { IoBadge } from './io-badge';
import { getBadgeClassName } from './io-badge-utils';

describe('io-badge - disabled behavior (not applicable)', () => {
  it('does not implement interactive state props because badge is presentational', () => {
    const component = new IoBadge() as any;

    expect('disabled' in component).toBe(false);
    expect('selected' in component).toBe(false);
  });

  it('still renders semantic variants as passive content', () => {
    const component = new IoBadge();
    component.variant = 'warning';

    expect(() => component.render()).not.toThrow();
    expect(getBadgeClassName(component.variant)).toBe('badge badge--warning');
  });
});
