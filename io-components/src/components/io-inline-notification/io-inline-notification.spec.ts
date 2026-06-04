import { h } from '@stencil/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

import { IoInlineNotification } from './io-inline-notification';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

describe('io-inline-notification — default props', () => {
  let c: IoInlineNotification;

  beforeEach(() => {
    c = new IoInlineNotification();
  });

  it('can be instantiated', () => {
    expect(c).toBeInstanceOf(IoInlineNotification);
  });

  it('defaults variant to info', () => {
    expect(c.variant).toBe('info');
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

  it('has no open prop', () => {
    expect((c as any).open).toBeUndefined();
  });
});

describe('io-inline-notification — render does not throw per variant', () => {
  it.each(['info', 'success', 'warning', 'error'] as const)('renders %s variant', (variant) => {
    const c = new IoInlineNotification();
    c.variant = variant;
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-inline-notification — ARIA role mapping', () => {
  function hostAttrs(c: IoInlineNotification): Record<string, unknown> {
    hMock.mockClear();
    (c as any).render();
    const hostCall = hMock.mock.calls.findLast(
      ([, attrs]: [unknown, unknown]) => attrs && typeof attrs === 'object' && 'role' in (attrs as Record<string, unknown>),
    ) as [unknown, Record<string, unknown>] | undefined;
    return hostCall?.[1] ?? {};
  }

  it('uses role="alert" for error variant', () => {
    const c = new IoInlineNotification();
    c.variant = 'error';
    const attrs = hostAttrs(c);
    expect(attrs.role).toBe('alert');
    expect(attrs['aria-live']).toBeUndefined();
    expect(attrs['aria-atomic']).toBeUndefined();
  });

  it.each(['info', 'success', 'warning'] as const)(
    'uses role="status" + aria-live="polite" for %s variant',
    (variant) => {
      const c = new IoInlineNotification();
      c.variant = variant;
      const attrs = hostAttrs(c);
      expect(attrs.role).toBe('status');
      expect(attrs['aria-live']).toBe('polite');
      expect(attrs['aria-atomic']).toBe('true');
    },
  );
});

describe('io-inline-notification — slot content detection', () => {
  function getSlotchangeHandler(c: IoInlineNotification): ((e: Event) => void) | undefined {
    hMock.mockClear();
    (c as any).render();
    const slotCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'slot');
    return (slotCall?.[1] as Record<string, unknown>)?.['onSlotchange'] as ((e: Event) => void) | undefined;
  }

  it('defaults hasContent to false', () => {
    const c = new IoInlineNotification();
    expect((c as any).hasContent).toBe(false);
  });

  it('sets hasContent true when slot has assigned nodes', () => {
    const c = new IoInlineNotification();
    const handler = getSlotchangeHandler(c);
    const fakeSlot = { assignedNodes: vi.fn().mockReturnValue([document.createTextNode('text')]) };
    handler?.({ target: fakeSlot } as unknown as Event);
    expect((c as any).hasContent).toBe(true);
  });

  it('sets hasContent false when slot has no assigned nodes', () => {
    const c = new IoInlineNotification();
    (c as any).hasContent = true;
    const handler = getSlotchangeHandler(c);
    const fakeSlot = { assignedNodes: vi.fn().mockReturnValue([]) };
    handler?.({ target: fakeSlot } as unknown as Event);
    expect((c as any).hasContent).toBe(false);
  });
});

describe('io-inline-notification — dismissLabel resolution', () => {
  it('uses custom dismissLabel when provided', () => {
    const c = new IoInlineNotification();
    c.dismissLabel = 'Close';
    expect((c as any).resolvedDismissLabel).toBe('Close');
  });

  it('uses "Dismiss {heading}" when heading is set', () => {
    const c = new IoInlineNotification();
    c.heading = 'Upload failed';
    expect((c as any).resolvedDismissLabel).toBe('Dismiss "Upload failed"');
  });

  it('falls back to "Dismiss {variant} notification"', () => {
    const c = new IoInlineNotification();
    c.variant = 'error';
    expect((c as any).resolvedDismissLabel).toBe('Dismiss error notification');
  });
});
