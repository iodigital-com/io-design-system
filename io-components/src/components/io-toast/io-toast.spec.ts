import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { h } from '@stencil/core';
import { IoToast } from './io-toast';
import { toastManager } from './io-toast-manager';
import { getToastStyles } from './io-toast-styles';
import { isToastPersistent } from './io-toast-utils';

describe('io-toast — registration', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
    toastManager.unregister();
  });

  afterEach(() => {
    toastManager.unregister();
  });

  it('registers with toastManager on connectedCallback', () => {
    const registerSpy = vi.spyOn(toastManager, 'register');
    component.connectedCallback();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('unregisters with toastManager on disconnectedCallback', () => {
    const unregisterSpy = vi.spyOn(toastManager, 'unregister');
    component.connectedCallback();
    component.disconnectedCallback();
    expect(unregisterSpy).toHaveBeenCalled();
  });

  it('addToast() delegates to toastManager', async () => {
    const addSpy = vi.spyOn(toastManager, 'addToast');
    component.connectedCallback();
    await component.addToast({ text: 'Hello', variant: 'success' });
    expect(addSpy).toHaveBeenCalledWith({ text: 'Hello', variant: 'success' });
  });

  it('exposes imperative addToast API without prefixed methods', () => {
    const methodNames = Object.getOwnPropertyNames(IoToast.prototype);
    expect(methodNames).toContain('addToast');
    expect(methodNames).not.toContain('onAddToast');
    expect(methodNames).not.toContain('didAddToast');
  });

  it('render remains stable with and without active messages', () => {
    expect(() => component.render()).not.toThrow();
    (component as any).visibleMsgs = [{ id: 1, text: 'Saved', variant: 'success' }];
    expect(() => component.render()).not.toThrow();
  });

  it('renders host with aria-atomic="true" for atomic screen-reader announcements', () => {
    vi.mocked(h).mockClear();
    component.render();
    // The host has role="status" + aria-live="polite" + aria-atomic="true"
    const hostCall = vi.mocked(h).mock.calls.find(
      (call) =>
        call[1] &&
        typeof call[1] === 'object' &&
        (call[1] as Record<string, unknown>)['role'] === 'status' &&
        'aria-atomic' in (call[1] as object),
    );
    expect((hostCall?.[1] as Record<string, unknown>)?.['aria-atomic']).toBe('true');
  });
});

describe('io-toast — position prop', () => {
  it('defaults to bottom-end', () => {
    const component = new IoToast();
    expect(component.position).toBe('bottom-end');
  });

  it('accepts all 6 position values', () => {
    const positions = ['top-start', 'top-center', 'top-end', 'bottom-start', 'bottom-center', 'bottom-end'] as const;
    for (const pos of positions) {
      const component = new IoToast();
      component.position = pos;
      expect(component.position).toBe(pos);
    }
  });

  it('position prop defaults to bottom-end', () => {
    const component = new IoToast();
    expect(component.position).toBe('bottom-end');
  });
});

describe('io-toast — persistent/error ARIA', () => {
  it('isToastPersistent returns true when persistent: true', () => {
    expect(isToastPersistent({ id: 1, text: 'X', persistent: true, variant: 'neutral' })).toBe(true);
  });

  it('isToastPersistent returns true for error variant', () => {
    expect(isToastPersistent({ id: 1, text: 'X', variant: 'error' })).toBe(true);
  });

  it('isToastPersistent returns false for non-error, non-persistent toast', () => {
    expect(isToastPersistent({ id: 1, text: 'X', variant: 'success' })).toBe(false);
    expect(isToastPersistent({ id: 2, text: 'X', variant: 'info' })).toBe(false);
    expect(isToastPersistent({ id: 3, text: 'X' })).toBe(false);
  });

  it('host always carries role="status" (never mutates to alertdialog, issue #1003)', () => {
    const component = new IoToast();
    vi.mocked(h).mockClear();
    // With a persistent/error message
    (component as any).visibleMsgs = [{ id: 1, text: 'Error!', variant: 'error', persistent: true }];
    component.render();
    // The Host call uses the 'Host' tag (not a string). Find it by aria-live="polite" + role="status"
    const hostCall = vi.mocked(h).mock.calls.find(
      (call) =>
        call[1] &&
        typeof call[1] === 'object' &&
        (call[1] as Record<string, unknown>)['role'] === 'status' &&
        (call[1] as Record<string, unknown>)['aria-live'] === 'polite',
    );
    expect(hostCall).toBeDefined();
    expect((hostCall?.[1] as Record<string, unknown>)?.['role']).toBe('status');
    expect((hostCall?.[1] as Record<string, unknown>)?.['aria-live']).toBe('polite');
  });

  it('renders a separate role="alert" assertive region (issue #1003)', () => {
    const component = new IoToast();
    vi.mocked(h).mockClear();
    (component as any).visibleMsgs = [{ id: 1, text: 'Error!', variant: 'error' }];
    component.render();
    const alertCall = vi.mocked(h).mock.calls.find(
      (call) =>
        call[1] &&
        typeof call[1] === 'object' &&
        (call[1] as Record<string, unknown>)['role'] === 'alert',
    );
    expect(alertCall).toBeDefined();
    expect((alertCall?.[1] as Record<string, unknown>)?.['aria-live']).toBe('assertive');
  });
});

describe('io-toast — style contracts', () => {
  it('uses a literal breakpoint for media queries', () => {
    const styles = getToastStyles();
    expect(styles).toContain('@media (max-width: 480px)');
  });

  it('does not use var() inside media query conditions', () => {
    const styles = getToastStyles();
    expect(styles).not.toContain('@media (max-width: var(');
  });

  it('declares all 6 position data-attribute selectors', () => {
    const styles = getToastStyles();
    expect(styles).toContain('[data-position="top-start"]');
    expect(styles).toContain('[data-position="top-center"]');
    expect(styles).toContain('[data-position="top-end"]');
    expect(styles).toContain('[data-position="bottom-start"]');
    expect(styles).toContain('[data-position="bottom-center"]');
    expect(styles).toContain('[data-position="bottom-end"]');
  });
});
