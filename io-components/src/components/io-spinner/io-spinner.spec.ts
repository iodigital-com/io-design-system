import { describe, it, expect, beforeEach } from 'vitest';

import { IoSpinner } from './io-spinner';

describe('io-spinner — default props', () => {
  let component: IoSpinner;

  beforeEach(() => {
    component = new IoSpinner();
  });

  it('has md size by default', () => {
    expect(component.size).toBe('md');
  });

  it('has primary color by default', () => {
    expect(component.color).toBe('primary');
  });

  it('has "Loading" label by default', () => {
    expect(component.label).toBe('Loading');
  });
});

describe('io-spinner — interaction model consistency', () => {
  it('does not expose interactive handlers or event emitters', () => {
    const component = new IoSpinner() as any;
    const methodNames = Object.getOwnPropertyNames(IoSpinner.prototype);

    expect(methodNames).not.toContain('handleClick');
    expect(methodNames).not.toContain('handleKeydown');
    expect(methodNames).not.toContain('handleDismiss');
    expect(component.dismiss).toBeUndefined();
    expect(component.click).toBeUndefined();
  });

  it('stays render-only across visual prop changes', () => {
    const component = new IoSpinner();

    expect(() => {
      component.size = 'sm';
      component.color = 'white';
      component.render();

      component.size = 'lg';
      component.color = 'current';
      component.label = 'Saving';
      component.render();
    }).not.toThrow();
  });

  it('falls back to Loading when label is nullish at runtime', () => {
    const component = new IoSpinner() as any;

    expect(() => {
      component.label = undefined;
      component.render();
      component.label = null;
      component.render();
    }).not.toThrow();
  });
});
