import { describe, it, expect } from 'vitest';
import { IoBadge } from './io-badge';

describe('io-badge - event behavior (non-interactive by design)', () => {
  it('only exposes constructor and render methods on the prototype', () => {
    const methodNames = Object.getOwnPropertyNames(IoBadge.prototype);

    expect(methodNames).toEqual(['constructor', 'render']);
  });

  it('remains render-only when variant changes', () => {
    const component = new IoBadge();

    component.variant = 'error';
    expect(() => component.render()).not.toThrow();
  });
});
