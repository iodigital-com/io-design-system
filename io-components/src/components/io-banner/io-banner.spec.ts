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

  it('defaults headingTag to h5', () => {
    expect(c.headingTag).toBe('h5');
  });

  it('defaults position to responsive object { base: bottom, s: top }', () => {
    expect(c.position).toEqual({ base: 'bottom', s: 'top' });
  });

  it('has no description by default', () => {
    expect(c.description).toBeUndefined();
  });

  it('has no items prop', () => {
    expect((c as any).items).toBeUndefined();
  });

  it('_dismissing defaults to false', () => {
    expect((c as any)._dismissing).toBe(false);
  });
});

describe('io-banner — render does not throw per variant', () => {
  it.each(['info', 'success', 'warning', 'error'] as const)('renders %s variant', (variant) => {
    const c = new IoBanner();
    c.variant = variant;
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-banner — live region always mounted (issue #1076)', () => {
  function bannerDivAttrs(c: IoBanner): Record<string, unknown> {
    hMock.mockClear();
    (c as any).render();
    const call = hMock.mock.calls.findLast(
      ([, attrs]: [unknown, unknown]) => attrs && typeof attrs === 'object' && 'role' in (attrs as Record<string, unknown>),
    ) as [unknown, Record<string, unknown>] | undefined;
    return call?.[1] ?? {};
  }

  it('banner div is always rendered even when open=false', () => {
    const c = new IoBanner();
    c.open = false;
    hMock.mockClear();
    (c as any).render();
    // The .banner div must be present — aria-hidden='true' hides it instead of v-if
    const divWithRole = hMock.mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'div' &&
        typeof attrs === 'object' &&
        attrs !== null &&
        'role' in (attrs as Record<string, unknown>),
    );
    expect(divWithRole).toBeDefined();
  });

  it('sets aria-hidden="true" when open=false', () => {
    const c = new IoBanner();
    c.open = false;
    const attrs = bannerDivAttrs(c);
    expect(attrs['aria-hidden']).toBe('true');
  });

  it('does not set aria-hidden when open=true', () => {
    const c = new IoBanner();
    c.open = true;
    const attrs = bannerDivAttrs(c);
    expect(attrs['aria-hidden']).toBeUndefined();
  });
});

describe('io-banner — ARIA role mapping', () => {
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

  it('uses role="alert" for warning variant (assertive — warns urgently)', () => {
    const c = new IoBanner();
    c.variant = 'warning';
    c.open = true;
    const attrs = bannerDivAttrs(c);
    expect(attrs.role).toBe('alert');
    expect(attrs['aria-live']).toBeUndefined();
    expect(attrs['aria-atomic']).toBeUndefined();
  });

  it.each(['info', 'success'] as const)(
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

  it('banner div has aria-hidden="true" when open=false (not removed from DOM, issue #1076)', () => {
    const c = new IoBanner();
    c.variant = 'error';
    c.open = false;
    const attrs = bannerDivAttrs(c);
    // #1076: live-region div is permanently mounted; aria-hidden hides it when closed
    expect(attrs.role).toBe('alert');
    expect(attrs['aria-hidden']).toBe('true');
  });
});

describe('io-banner — slot content detection', () => {
  // Find the default slot (no name attribute)
  function getDefaultSlotchangeHandler(c: IoBanner): ((e: Event) => void) | undefined {
    hMock.mockClear();
    (c as any).render();
    const slotCall = hMock.mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'slot' &&
        (!attrs || typeof attrs !== 'object' || !('name' in (attrs as Record<string, unknown>))),
    );
    return (slotCall?.[1] as Record<string, unknown>)?.['onSlotchange'] as ((e: Event) => void) | undefined;
  }

  it('defaults hasContent to false', () => {
    const c = new IoBanner();
    expect((c as any).hasContent).toBe(false);
  });

  it('sets hasContent true when slot has assigned nodes', () => {
    const c = new IoBanner();
    c.open = true;
    const handler = getDefaultSlotchangeHandler(c);
    const fakeSlot = { assignedNodes: vi.fn().mockReturnValue([document.createTextNode('text')]) };
    handler?.({ target: fakeSlot } as unknown as Event);
    expect((c as any).hasContent).toBe(true);
  });

  it('sets hasContent false when slot has no assigned nodes', () => {
    const c = new IoBanner();
    c.open = true;
    (c as any).hasContent = true;
    const handler = getDefaultSlotchangeHandler(c);
    const fakeSlot = { assignedNodes: vi.fn().mockReturnValue([]) };
    handler?.({ target: fakeSlot } as unknown as Event);
    expect((c as any).hasContent).toBe(false);
  });

  it('slot handler is present even when banner is closed (live region always mounted, issue #1076)', () => {
    const c = new IoBanner();
    c.open = false;
    // The slot is inside the always-mounted banner div, so slotchange handler is always present
    // #1076: the slot is always in the DOM so the live region is pre-established
    const handler = getDefaultSlotchangeHandler(c);
    expect(handler).toBeDefined();
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

describe('io-banner — action prop (#842)', () => {
  it('actionLabel defaults to undefined', () => {
    const c = new IoBanner();
    expect(c.actionLabel).toBeUndefined();
  });

  it('actionIcon defaults to arrow-right', () => {
    const c = new IoBanner();
    expect(c.actionIcon).toBe('arrow-right');
  });

  it('actionLoading defaults to false', () => {
    const c = new IoBanner();
    expect(c.actionLoading).toBe(false);
  });

  it('renders io-button action when actionLabel set and open=true', () => {
    const c = new IoBanner();
    c.open = true;
    c.actionLabel = 'Learn more';
    hMock.mockClear();
    (c as any).render();
    // Action is now rendered as <io-button variant="ghost">
    const actionBtn = hMock.mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'io-button' &&
        typeof attrs === 'object' &&
        attrs !== null &&
        (attrs as Record<string, unknown>)['variant'] === 'ghost' &&
        (attrs as Record<string, unknown>)['loading'] === false,
    );
    expect(actionBtn).toBeDefined();
  });

  it('does not render io-button action when actionLabel undefined', () => {
    const c = new IoBanner();
    c.open = true;
    hMock.mockClear();
    (c as any).render();
    // With no actionLabel, no io-button with loading prop should appear
    const actionBtn = hMock.mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'io-button' &&
        typeof attrs === 'object' &&
        attrs !== null &&
        'loading' in (attrs as Record<string, unknown>),
    );
    expect(actionBtn).toBeUndefined();
  });

  it('emits action when actionLoading=false', () => {
    const c = new IoBanner();
    const emitFn = vi.fn();
    (c as any).action = { emit: emitFn };
    c.actionLoading = false;
    (c as any).handleAction();
    expect(emitFn).toHaveBeenCalledTimes(1);
  });

  it('suppresses action emit when actionLoading=true', () => {
    const c = new IoBanner();
    const emitFn = vi.fn();
    (c as any).action = { emit: emitFn };
    c.actionLoading = true;
    (c as any).handleAction();
    expect(emitFn).not.toHaveBeenCalled();
  });

  it('action io-button has loading=true when actionLoading=true', () => {
    const c = new IoBanner();
    c.open = true;
    c.actionLabel = 'Learn more';
    c.actionLoading = true;
    hMock.mockClear();
    (c as any).render();
    const actionBtn = hMock.mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'io-button' &&
        typeof attrs === 'object' &&
        attrs !== null &&
        (attrs as Record<string, unknown>)['loading'] === true,
    );
    expect((actionBtn?.[1] as any)?.['loading']).toBe(true);
  });

  it('action io-button suppresses action via handleAction guard when loading', () => {
    const c = new IoBanner();
    const emitFn = vi.fn();
    (c as any).action = { emit: emitFn };
    c.actionLoading = true;
    (c as any).handleAction();
    expect(emitFn).not.toHaveBeenCalled();
  });
});
