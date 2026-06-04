import { h } from '@stencil/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

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
  // Role is on the inner .banner div (only rendered when open=true) so the live region
  // only exists while the banner is visible — prevents spurious announcements when closed.
  function bannerDivAttrs(c: IoBanner): Record<string, unknown> {
    hMock.mockClear();
    (c as any).render();
    const call = hMock.mock.calls.findLast(
      ([, attrs]: [unknown, unknown]) => attrs && typeof attrs === 'object' && 'role' in (attrs as Record<string, unknown>),
    ) as [unknown, Record<string, unknown>] | undefined;
    return call?.[1] ?? {};
  }

  it('uses role="alert" for error variant', () => {
    const c = new IoBanner();
    c.variant = 'error';
    c.open = true;
    const attrs = bannerDivAttrs(c);
    expect(attrs.role).toBe('alert');
    expect(attrs['aria-live']).toBeUndefined();
    expect(attrs['aria-atomic']).toBeUndefined();
  });

  it.each(['info', 'success', 'warning'] as const)(
    'uses role="status" + aria-live="polite" for %s variant',
    (variant) => {
      const c = new IoBanner();
      c.variant = variant;
      c.open = true;
      const attrs = bannerDivAttrs(c);
      expect(attrs.role).toBe('status');
      expect(attrs['aria-live']).toBe('polite');
      expect(attrs['aria-atomic']).toBe('true');
    },
  );

  it('renders no ARIA role attributes when open=false', () => {
    const c = new IoBanner();
    c.variant = 'error';
    c.open = false;
    const attrs = bannerDivAttrs(c);
    expect(attrs.role).toBeUndefined();
  });
});

describe('io-banner — slot content detection', () => {
  function getSlotchangeHandler(c: IoBanner): ((e: Event) => void) | undefined {
    hMock.mockClear();
    (c as any).render();
    const slotCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'slot');
    return (slotCall?.[1] as Record<string, unknown>)?.['onSlotchange'] as ((e: Event) => void) | undefined;
  }

  it('defaults hasContent to false', () => {
    const c = new IoBanner();
    expect((c as any).hasContent).toBe(false);
  });

  it('sets hasContent true when slot has assigned nodes', () => {
    const c = new IoBanner();
    c.open = true;
    const handler = getSlotchangeHandler(c);
    const fakeSlot = { assignedNodes: vi.fn().mockReturnValue([document.createTextNode('text')]) };
    handler?.({ target: fakeSlot } as unknown as Event);
    expect((c as any).hasContent).toBe(true);
  });

  it('sets hasContent false when slot has no assigned nodes', () => {
    const c = new IoBanner();
    c.open = true;
    (c as any).hasContent = true;
    const handler = getSlotchangeHandler(c);
    const fakeSlot = { assignedNodes: vi.fn().mockReturnValue([]) };
    handler?.({ target: fakeSlot } as unknown as Event);
    expect((c as any).hasContent).toBe(false);
  });

  it('slot handler is absent when banner is closed (open=false)', () => {
    const c = new IoBanner();
    c.open = false;
    const handler = getSlotchangeHandler(c);
    expect(handler).toBeUndefined();
  });
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
