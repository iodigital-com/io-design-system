import { describe, it, expect } from 'vitest';

import { IoBadge } from './io-badge';
import { getBadgeClassName } from './io-badge-utils';

describe('io-badge - event behavior (non-interactive by design)', () => {
  it('does not expose interactive handlers or event emitters', () => {
    const component = new IoBadge() as any;
    const methodNames = Object.getOwnPropertyNames(IoBadge.prototype);

    expect(methodNames).not.toContain('handleClick');
    expect(methodNames).not.toContain('handleToggle');
    expect(methodNames).not.toContain('handleKeydown');
    expect(component.click).toBeUndefined();
    expect(component.toggle).toBeUndefined();
  });

  it('remains render-only when variants change', () => {
    const component = new IoBadge();

    expect(() => {
      component.variant = 'error';
      component.render();

      component.variant = 'success';
      component.render();

      component.variant = 'warning';
      component.render();
    }).not.toThrow();

    expect(getBadgeClassName(component.variant)).toBe('badge badge--warning');
  });
});
