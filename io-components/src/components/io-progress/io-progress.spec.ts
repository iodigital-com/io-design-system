import { beforeEach, describe, expect, it } from 'vitest';

import { IoProgress } from './io-progress';

describe('io-progress — default props', () => {
  let component: IoProgress;

  beforeEach(() => {
    component = new IoProgress();
  });

  it('value defaults to 0', () => {
    expect(component.value).toBe(0);
  });

  it('color defaults to blue', () => {
    expect(component.color).toBe('blue');
  });

  it('size defaults to md', () => {
    expect(component.size).toBe('md');
  });

  it('animated defaults to true', () => {
    expect(component.animated).toBe(true);
  });

  it('showLabel defaults to false', () => {
    expect(component.showLabel).toBe(false);
  });

  it('label is undefined by default', () => {
    expect(component.label).toBeUndefined();
  });
});

describe('io-progress — render stability', () => {
  it('does not throw for value=0', () => {
    const component = new IoProgress();
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for value=100', () => {
    const component = new IoProgress();
    component.value = 100;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for value=-10 (clamped)', () => {
    const component = new IoProgress();
    component.value = -10;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for value=110 (clamped)', () => {
    const component = new IoProgress();
    component.value = 110;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with color=success', () => {
    const component = new IoProgress();
    component.color = 'success';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with size=lg', () => {
    const component = new IoProgress();
    component.size = 'lg';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with showLabel=true', () => {
    const component = new IoProgress();
    component.value = 72;
    component.showLabel = true;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with animated=false', () => {
    const component = new IoProgress();
    component.animated = false;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with a custom label', () => {
    const component = new IoProgress();
    component.label = 'Upload progress';
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-progress — no interactive methods', () => {
  it('does not expose click or keyboard handlers', () => {
    const methodNames = Object.getOwnPropertyNames(IoProgress.prototype);
    expect(methodNames).not.toContain('handleClick');
    expect(methodNames).not.toContain('handleKeyDown');
    expect(methodNames).not.toContain('handleChange');
  });
});
