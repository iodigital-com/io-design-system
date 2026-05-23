import { describe, it, expect } from 'vitest';

import { IoWordmark } from './io-wordmark';

describe('io-wordmark - default props and render contract', () => {
  it('has md as the default size', () => {
    const component = new IoWordmark();
    expect(component.size).toBe('md');
  });

  it('has false as the default mono value', () => {
    const component = new IoWordmark();
    expect(component.mono).toBe(false);
  });

  it('has "io Digital" as the default ariaLabel', () => {
    const component = new IoWordmark();
    expect(component.ariaLabel).toBe('io Digital');
  });

  it('renders without throwing for each supported size', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    for (const size of sizes) {
      const component = new IoWordmark();
      component.size = size;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing in mono mode', () => {
    const component = new IoWordmark();
    component.mono = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with custom ariaLabel', () => {
    const component = new IoWordmark();
    component.ariaLabel = 'iO Digital wordmark';
    expect(() => component.render()).not.toThrow();
  });
});
