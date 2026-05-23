import { describe, it, expect } from 'vitest';

import { IoSkeleton } from './io-skeleton';

describe('io-skeleton — default props', () => {
  it('has variant=text by default', () => {
    const component = new IoSkeleton();
    expect(component.variant).toBe('text');
  });

  it('has animated=true by default', () => {
    const component = new IoSkeleton();
    expect(component.animated).toBe(true);
  });

  it('has label="Loading" by default', () => {
    const component = new IoSkeleton();
    expect(component.label).toBe('Loading');
  });

  it('has width=undefined by default', () => {
    const component = new IoSkeleton();
    expect(component.width).toBeUndefined();
  });

  it('has height=undefined by default', () => {
    const component = new IoSkeleton();
    expect(component.height).toBeUndefined();
  });
});

describe('io-skeleton — render stability', () => {
  it('does not throw for variant=text', () => {
    const component = new IoSkeleton();
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for variant=circular', () => {
    const component = new IoSkeleton();
    component.variant = 'circular';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for variant=rectangular', () => {
    const component = new IoSkeleton();
    component.variant = 'rectangular';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for variant=rounded', () => {
    const component = new IoSkeleton();
    component.variant = 'rounded';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw when animated=false', () => {
    const component = new IoSkeleton();
    component.animated = false;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw when width and height are set', () => {
    const component = new IoSkeleton();
    component.width = '200px';
    component.height = '80px';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with a custom label', () => {
    const component = new IoSkeleton();
    component.label = 'Loading articles';
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-skeleton — no interactive methods', () => {
  it('does not expose click or keyboard handlers', () => {
    const methodNames = Object.getOwnPropertyNames(IoSkeleton.prototype);
    expect(methodNames).not.toContain('handleClick');
    expect(methodNames).not.toContain('handleKeyDown');
    expect(methodNames).not.toContain('handleChange');
  });
});
