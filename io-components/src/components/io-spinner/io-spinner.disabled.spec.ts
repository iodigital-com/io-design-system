import { describe, it, expect } from 'vitest';

import { IoSpinner } from './io-spinner';

describe('io-spinner — disabled behavior (N/A: no disabled state)', () => {
  it('does not expose a disabled prop', () => {
    const component = new IoSpinner() as any;
    expect('disabled' in component).toBe(false);
  });

  it('keeps status semantics regardless of visual props', () => {
    const component = new IoSpinner();
    component.size = 'lg';
    component.color = 'current';

    expect(() => component.render()).not.toThrow();
  });
});
