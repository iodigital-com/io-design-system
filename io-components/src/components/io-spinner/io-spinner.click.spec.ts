import { describe, it, expect } from 'vitest';
import { IoSpinner } from './io-spinner';

describe('io-spinner — click behavior (N/A: no click contract)', () => {
  it('does not expose click handlers or click events', () => {
    const component = new IoSpinner() as any;
    const methodNames = Object.getOwnPropertyNames(IoSpinner.prototype);

    expect(methodNames).not.toContain('handleClick');
    expect(component.click).toBeUndefined();
  });

  it('remains render-only when props change', () => {
    const component = new IoSpinner();

    expect(() => {
      component.size = 'sm';
      component.color = 'white';
      component.render();
    }).not.toThrow();
  });
});
