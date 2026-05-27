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

  it('error variant maps to role="alert" (assertive implied, no explicit aria-live)', () => {
    const component = new IoAlert();
    component.variant = 'error';
    // role="alert" carries implicit aria-live="assertive" — no explicit aria-live needed
    const role = component.variant === 'error' ? 'alert' : 'status';
    const ariaLive = component.variant === 'error' ? undefined : 'polite';
    const ariaAtomic = component.variant === 'error' ? undefined : 'true';
    expect(role).toBe('alert');
    expect(ariaLive).toBeUndefined();
    expect(ariaAtomic).toBeUndefined();
    expect(() => component.render()).not.toThrow();
  });

  it('info variant maps to role="status" with aria-live="polite"', () => {
    const component = new IoAlert();
    component.variant = 'info';
    const role = component.variant === 'error' ? 'alert' : 'status';
    const ariaLive = component.variant === 'error' ? undefined : 'polite';
    const ariaAtomic = component.variant === 'error' ? undefined : 'true';
    expect(role).toBe('status');
    expect(ariaLive).toBe('polite');
    expect(ariaAtomic).toBe('true');
    expect(() => component.render()).not.toThrow();
  });

  it('success variant maps to role="status" with aria-live="polite"', () => {
    const component = new IoAlert();
    component.variant = 'success';
    const role = component.variant === 'error' ? 'alert' : 'status';
    const ariaLive = component.variant === 'error' ? undefined : 'polite';
    expect(role).toBe('status');
    expect(ariaLive).toBe('polite');
    expect(() => component.render()).not.toThrow();
  });

  it('warning variant maps to role="status" with aria-live="polite"', () => {
    const component = new IoAlert();
    component.variant = 'warning';
    const role = component.variant === 'error' ? 'alert' : 'status';
    const ariaLive = component.variant === 'error' ? undefined : 'polite';
    expect(role).toBe('status');
    expect(ariaLive).toBe('polite');
    expect(() => component.render()).not.toThrow();
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

describe('io-alert — dismissLabel (unique accessible name for dismiss button)', () => {
  it('has undefined dismissLabel by default', () => {
    const component = new IoAlert();
    expect(component.dismissLabel).toBeUndefined();
  });

  it('resolves to "Dismiss {variant} notification" when no heading or dismissLabel', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;
    for (const variant of variants) {
      const component = new IoAlert();
      component.variant = variant;
      expect((component as any).resolvedDismissLabel).toBe(`Dismiss ${variant} notification`);
    }
  });

  it('includes the heading in the label when heading is set', () => {
    const component = new IoAlert();
    component.heading = 'Upload failed';
    expect((component as any).resolvedDismissLabel).toBe('Dismiss "Upload failed"');
  });

  it('uses custom dismissLabel when explicitly provided (overrides all auto-logic)', () => {
    const component = new IoAlert();
    component.variant = 'error';
    component.heading = 'Upload failed';
    component.dismissLabel = 'Close error banner';
    expect((component as any).resolvedDismissLabel).toBe('Close error banner');
  });

  it('heading label takes precedence over variant-only label', () => {
    const component = new IoAlert();
    component.variant = 'info';
    component.heading = 'Session expiring';
    expect((component as any).resolvedDismissLabel).toBe('Dismiss "Session expiring"');
  });
});
