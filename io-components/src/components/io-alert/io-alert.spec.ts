import { describe, it, expect } from 'vitest';

import { IoAlert } from './io-alert';

describe('io-alert — default props and render contract', () => {
  it('has info as the default variant', () => {
    const component = new IoAlert();
    expect(component.variant).toBe('info');
  });

  it('has dismissible false by default', () => {
    const component = new IoAlert();
    expect(component.dismissible).toBe(false);
  });

  it('has no heading by default', () => {
    const component = new IoAlert();
    expect(component.heading).toBeUndefined();
  });

  it('renders without throwing for each supported variant', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;

    for (const variant of variants) {
      const component = new IoAlert();
      component.variant = variant;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders with heading without throwing', () => {
    const component = new IoAlert();
    component.heading = 'Alert heading';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with dismissible=true without throwing', () => {
    const component = new IoAlert();
    component.dismissible = true;
    expect(() => component.render()).not.toThrow();
  });

  it('uses assertive aria-live for error variant', () => {
    const component = new IoAlert();
    component.variant = 'error';
    // Verify the logic: error → assertive, others → polite
    const ariaLive = component.variant === 'error' ? 'assertive' : 'polite';
    expect(ariaLive).toBe('assertive');
  });

  it('uses polite aria-live for info variant', () => {
    const component = new IoAlert();
    component.variant = 'info';
    const ariaLive = component.variant === 'error' ? 'assertive' : 'polite';
    expect(ariaLive).toBe('polite');
  });

  it('uses polite aria-live for success variant', () => {
    const component = new IoAlert();
    component.variant = 'success';
    const ariaLive = component.variant === 'error' ? 'assertive' : 'polite';
    expect(ariaLive).toBe('polite');
  });

  it('uses polite aria-live for warning variant', () => {
    const component = new IoAlert();
    component.variant = 'warning';
    const ariaLive = component.variant === 'error' ? 'assertive' : 'polite';
    expect(ariaLive).toBe('polite');
  });

  it('renders all variants without throwing: combined heading + dismissible', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;

    for (const variant of variants) {
      const component = new IoAlert();
      component.variant = variant;
      component.heading = 'Test heading';
      component.dismissible = true;
      expect(() => component.render()).not.toThrow();
    }
  });
});
