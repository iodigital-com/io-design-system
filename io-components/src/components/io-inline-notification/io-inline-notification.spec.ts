import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import { h } from '@stencil/core';

import { IoInlineNotification } from './io-inline-notification';
import { getInlineNotificationStyles } from './io-inline-notification-styles';

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

  it('defaults actionLabel to undefined', () => {
    expect(c.actionLabel).toBeUndefined();
  });

  it('defaults actionIcon to arrow-right', () => {
    expect(c.actionIcon).toBe('arrow-right');
  });

  it('defaults actionLoading to false', () => {
    expect(c.actionLoading).toBe(false);
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

// ── Part 1: Variant soft background tokens ─────────────────────────────────

describe('io-inline-notification — variant soft background tokens', () => {
  it.each([
    ['info',    'var(--io-color-info-soft)'],
    ['success', 'var(--io-color-success-soft)'],
    ['warning', 'var(--io-color-warning-soft)'],
    ['error',   'var(--io-color-error-soft)'],
  ] as const)('styles for %s variant include %s background', (variant, expectedBg) => {
    const css = getInlineNotificationStyles(variant);
    expect(css).toContain(expectedBg);
  });

  it('info styles do not contain var(--io-bg-card)', () => {
    const css = getInlineNotificationStyles('info');
    expect(css).not.toContain('var(--io-bg-card)');
  });

  it('success styles do not contain var(--io-bg-card)', () => {
    const css = getInlineNotificationStyles('success');
    expect(css).not.toContain('var(--io-bg-card)');
  });

  it('warning styles do not contain var(--io-bg-card)', () => {
    const css = getInlineNotificationStyles('warning');
    expect(css).not.toContain('var(--io-bg-card)');
  });

  it('error styles do not contain var(--io-bg-card)', () => {
    const css = getInlineNotificationStyles('error');
    expect(css).not.toContain('var(--io-bg-card)');
  });

  it('each variant produces distinct background tokens', () => {
    const backgrounds = (['info', 'success', 'warning', 'error'] as const).map(v => {
      const css = getInlineNotificationStyles(v);
      // Extract the background property value from the .inline-notification block
      const match = css.match(/background:\s*([^;]+);/);
      return match?.[1].trim();
    });
    const unique = new Set(backgrounds);
    expect(unique.size).toBe(4);
  });
});

// ── Part 2: Action button props and event emission ─────────────────────────

describe('io-inline-notification — action button rendering', () => {
  it('does not render io-button when actionLabel is undefined', () => {
    const c = new IoInlineNotification();
    hMock.mockClear();
    (c as any).render();
    const buttonCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'io-button');
    expect(buttonCall).toBeUndefined();
  });

  it('renders io-button when actionLabel is set', () => {
    const c = new IoInlineNotification();
    c.actionLabel = 'Log Trip';
    hMock.mockClear();
    (c as any).render();
    const buttonCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'io-button');
    expect(buttonCall).toBeDefined();
  });

  it('passes size="sm" and variant="ghost" to io-button', () => {
    const c = new IoInlineNotification();
    c.actionLabel = 'Log Trip';
    hMock.mockClear();
    (c as any).render();
    const buttonCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'io-button') as
      [unknown, Record<string, unknown>] | undefined;
    expect(buttonCall?.[1]).toMatchObject({ size: 'sm', variant: 'ghost' });
  });

  it('passes icon prop matching actionIcon to io-button', () => {
    const c = new IoInlineNotification();
    c.actionLabel = 'Log Trip';
    c.actionIcon = 'arrow-right';
    hMock.mockClear();
    (c as any).render();
    const buttonCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'io-button') as
      [unknown, Record<string, unknown>] | undefined;
    expect(buttonCall?.[1]?.icon).toBe('arrow-right');
  });

  it('passes loading prop when actionLoading is true', () => {
    const c = new IoInlineNotification();
    c.actionLabel = 'Log Trip';
    c.actionLoading = true;
    hMock.mockClear();
    (c as any).render();
    const buttonCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'io-button') as
      [unknown, Record<string, unknown>] | undefined;
    expect(buttonCall?.[1]?.loading).toBe(true);
  });
});

describe('io-inline-notification — action event emission', () => {
  it('emits action event when handleAction is called and actionLoading is false', () => {
    const c = new IoInlineNotification();
    c.actionLabel = 'Log Trip';
    const emitSpy = vi.fn();
    (c as any).action = { emit: emitSpy };

    (c as any).handleAction();

    expect(emitSpy).toHaveBeenCalledOnce();
  });

  it('does not emit action event when handleAction is called and actionLoading is true', () => {
    const c = new IoInlineNotification();
    c.actionLabel = 'Log Trip';
    c.actionLoading = true;
    const emitSpy = vi.fn();
    (c as any).action = { emit: emitSpy };

    (c as any).handleAction();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('emits dismiss event when handleDismiss is called', () => {
    const c = new IoInlineNotification();
    const emitSpy = vi.fn();
    (c as any).dismiss = { emit: emitSpy };

    (c as any).handleDismiss();

    expect(emitSpy).toHaveBeenCalledOnce();
  });
});
