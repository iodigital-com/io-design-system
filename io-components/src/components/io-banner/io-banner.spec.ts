import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import { h } from '@stencil/core';

import { IoBanner } from './io-banner';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

describe('io-banner — default props', () => {
  let c: IoBanner;

  beforeEach(() => {
    c = new IoBanner();
  });

  it('can be instantiated', () => {
    expect(c).toBeInstanceOf(IoBanner);
  });

  it('defaults variant to info', () => {
    expect(c.variant).toBe('info');
  });

  it('defaults open to false', () => {
    expect(c.open).toBe(false);
  });

  it('defaults dismissible to false', () => {
    expect(c.dismissible).toBe(false);
  });

  it('has no heading by default', () => {
    expect(c.heading).toBeUndefined();
  });

  it('has no dismissLabel by default', () => {
    expect(c.dismissLabel).toBeUndefined();
  });

  it('has no items prop', () => {
    expect((c as any).items).toBeUndefined();
  });
});

describe('io-banner — render does not throw per variant', () => {
  it.each(['info', 'success', 'warning', 'error'] as const)('renders %s variant', (variant) => {
    const c = new IoBanner();
    c.variant = variant;
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-banner — ARIA role mapping', () => {
  function hostAttrs(c: IoBanner): Record<string, unknown> {
    hMock.mockClear();
    (c as any).render();
    // Host is not exported from the mock → compiles to h(undefined, attrs, ...).
    // It is the last h() call because JSX is evaluated inside-out.
    const hostCall = hMock.mock.calls.findLast(
      ([, attrs]: [unknown, unknown]) => attrs && typeof attrs === 'object' && 'role' in (attrs as Record<string, unknown>),
    ) as [unknown, Record<string, unknown>] | undefined;
    return hostCall?.[1] ?? {};
  }

  it('uses role="alert" for error variant', () => {
    const c = new IoBanner();
    c.variant = 'error';
    const attrs = hostAttrs(c);
    expect(attrs.role).toBe('alert');
    expect(attrs['aria-live']).toBeUndefined();
    expect(attrs['aria-atomic']).toBeUndefined();
  });

  it.each(['info', 'success', 'warning'] as const)(
    'uses role="status" + aria-live="polite" for %s variant',
    (variant) => {
      const c = new IoBanner();
      c.variant = variant;
      const attrs = hostAttrs(c);
      expect(attrs.role).toBe('status');
      expect(attrs['aria-live']).toBe('polite');
      expect(attrs['aria-atomic']).toBe('true');
    },
  );
});

describe('io-banner — dismissLabel resolution', () => {
  it('uses custom dismissLabel when provided', () => {
    const c = new IoBanner();
    c.dismissLabel = 'Close alert';
    expect((c as any).resolvedDismissLabel).toBe('Close alert');
  });

  it('uses "Dismiss {heading}" when heading is set', () => {
    const c = new IoBanner();
    c.heading = 'Maintenance';
    expect((c as any).resolvedDismissLabel).toBe('Dismiss "Maintenance"');
  });

  it('falls back to "Dismiss {variant} notification"', () => {
    const c = new IoBanner();
    c.variant = 'warning';
    expect((c as any).resolvedDismissLabel).toBe('Dismiss warning notification');
  });
});
