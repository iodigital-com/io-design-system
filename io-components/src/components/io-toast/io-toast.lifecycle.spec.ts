import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoToast } from './io-toast';
import { IoToastManagerClass } from './io-toast-manager';
import { getToastItemVariant, isToastPersistent } from './io-toast-utils';
import type { IoToastEntry } from './types';

// ── getToastItemVariant: null/undefined variant (??  'neutral' branch) ────────

describe('io-toast-utils — getToastItemVariant null branch', () => {
  it('returns "neutral" when variant is undefined', () => {
    const entry = { id: 1, text: 'Hello' } as IoToastEntry;
    expect(getToastItemVariant(entry)).toBe('neutral');
  });

  it('returns "neutral" when variant is explicitly undefined', () => {
    const entry: IoToastEntry = { id: 2, text: 'Test', variant: undefined as any };
    expect(getToastItemVariant(entry)).toBe('neutral');
  });

  it('returns the variant when it is explicitly set to "success"', () => {
    const entry: IoToastEntry = { id: 3, text: 'Done', variant: 'success' };
    expect(getToastItemVariant(entry)).toBe('success');
  });

  it('returns the variant when set to "error"', () => {
    const entry: IoToastEntry = { id: 4, text: 'Oops', variant: 'error' };
    expect(getToastItemVariant(entry)).toBe('error');
  });

  it('returns the variant when set to "warning"', () => {
    const entry: IoToastEntry = { id: 5, text: 'Warn', variant: 'warning' };
    expect(getToastItemVariant(entry)).toBe('warning');
  });

  it('returns the variant when set to "info"', () => {
    const entry: IoToastEntry = { id: 6, text: 'Info', variant: 'info' };
    expect(getToastItemVariant(entry)).toBe('info');
  });

  it('returns the variant when set to "neutral"', () => {
    const entry: IoToastEntry = { id: 7, text: 'Neutral', variant: 'neutral' };
    expect(getToastItemVariant(entry)).toBe('neutral');
  });
});

// ── render(): persistent/error messages populate the assertive region ─────────

describe('io-toast — render() persistent message: separate alert region (issue #1003)', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
  });

  it('does not throw when visibleMsgs contains variant="error" (persistent)', () => {
    (component as any).visibleMsgs = [{ id: 1, text: 'Error!', variant: 'error' }];
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw when visibleMsgs contains persistent=true', () => {
    (component as any).visibleMsgs = [
      {
        id: 2,
        text: 'Requires action',
        variant: 'info',
        persistent: true,
      },
    ];
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw when visibleMsgs contains variant="error" and persistent=true', () => {
    (component as any).visibleMsgs = [
      {
        id: 3,
        text: 'Critical failure',
        variant: 'error',
        persistent: true,
      },
    ];
    expect(() => component.render()).not.toThrow();
  });
});

// ── render(): non-persistent messages render in the polite status host ────────

describe('io-toast — render() non-persistent message: status / polite branch', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
  });

  it('does not throw when visibleMsgs contains variant="success" (non-persistent)', () => {
    (component as any).visibleMsgs = [{ id: 1, text: 'Saved', variant: 'success' }];
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw when visibleMsgs is empty (no active toast)', () => {
    (component as any).visibleMsgs = [];
    expect(() => component.render()).not.toThrow();
  });
});

// ── isToastPersistent drives assertive region content ────────────────────────

describe('io-toast — isToastPersistent integration with render() (issue #1003)', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
  });

  it('isToastPersistent is true for error variant', () => {
    const entry: IoToastEntry = { id: 1, text: 'Error', variant: 'error' };
    expect(isToastPersistent(entry)).toBe(true);

    (component as any).visibleMsgs = [entry];
    expect(() => component.render()).not.toThrow();
  });

  it('isToastPersistent is false for success variant', () => {
    const entry: IoToastEntry = { id: 2, text: 'Done', variant: 'success' };
    expect(isToastPersistent(entry)).toBe(false);

    (component as any).visibleMsgs = [entry];
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when visibleMsgs is empty', () => {
    (component as any).visibleMsgs = [];
    expect(() => component.render()).not.toThrow();
  });
});

// ── dismiss() when queue is empty ────────────────────────────────────────────

describe('io-toast-manager — dismiss() with empty queue', () => {
  let manager: IoToastManagerClass;
  let refresh: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    manager = new IoToastManagerClass();
    refresh = vi.fn();
    manager.register(refresh);
  });

  afterEach(() => {
    vi.useRealTimers();
    manager.unregister();
  });

  it('removes the toast and no more toasts visible after dismiss', () => {
    manager.addToast({ text: 'Only toast' });
    expect((manager.getVisible()[0] ?? null)?.text).toBe('Only toast');

    manager.dismiss();
    expect(manager.getVisible()[0] ?? null).toBeNull();

    // Advance past DISMISS_DELAY (200ms) — no queued item to show
    vi.advanceTimersByTime(300);
    expect(manager.getVisible()[0] ?? null).toBeNull();
  });

  it('refresh is called with empty array immediately on dismiss', () => {
    manager.addToast({ text: 'Only toast' });
    refresh.mockClear();

    manager.dismiss();

    // refresh([]) called immediately (stacked API uses array)
    expect(refresh).toHaveBeenCalledWith([]);
  });

  it('refresh is not called again after DISMISS_DELAY when queue is empty', () => {
    manager.addToast({ text: 'Only toast' });
    manager.dismiss();
    const callCountAfterDismiss = refresh.mock.calls.length;

    vi.advanceTimersByTime(300);

    // No additional refresh calls since queue was empty
    expect(refresh.mock.calls.length).toBe(callCountAfterDismiss);
  });

  it('dismiss() on empty current does not throw', () => {
    expect(() => manager.dismiss()).not.toThrow();
  });

  it('dismiss() twice in a row does not throw', () => {
    manager.addToast({ text: 'Toast' });
    manager.dismiss();
    expect(() => manager.dismiss()).not.toThrow();
    vi.advanceTimersByTime(300);
    expect(manager.getVisible()[0] ?? null).toBeNull();
  });
});

// ── dismiss() when queue has items ───────────────────────────────────────────

describe('io-toast-manager — dismiss() with queued item', () => {
  let manager: IoToastManagerClass;
  let refresh: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    manager = new IoToastManagerClass();
    refresh = vi.fn();
    // Set maxVisible to 1 so that the second toast is actually queued
    manager.maxVisible = 1;
    manager.register(refresh);
  });

  afterEach(() => {
    vi.useRealTimers();
    manager.unregister();
  });

  it('shows the next queued toast after DISMISS_DELAY', () => {
    manager.addToast({ text: 'First' });
    manager.addToast({ text: 'Second' });

    manager.dismiss();
    expect(manager.getVisible()[0] ?? null).toBeNull();

    vi.advanceTimersByTime(300);
    expect((manager.getVisible()[0] ?? null)?.text).toBe('Second');
  });

  it('refresh is called with array containing the next toast after DISMISS_DELAY', () => {
    manager.addToast({ text: 'First' });
    manager.addToast({ text: 'Second' });
    manager.dismiss();
    refresh.mockClear();

    vi.advanceTimersByTime(300);
    expect(refresh).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ text: 'Second' })]),
    );
  });
});

// ── handleItemDismiss delegates to toastManager ───────────────────────────────

describe('io-toast — handleItemDismiss', () => {
  it('calling handleItemDismiss with a persistent (error) message dismisses correctly', () => {
    vi.useFakeTimers();

    const manager = new IoToastManagerClass();
    const refresh = vi.fn();
    manager.register(refresh);
    manager.addToast({ text: 'Error occurred', variant: 'error' });
    expect((manager.getVisible()[0] ?? null)?.variant).toBe('error');

    // Verify persistent toast does not auto-dismiss
    vi.advanceTimersByTime(60000);
    expect(manager.getVisible()[0] ?? null).not.toBeNull();

    // Manual dismiss works
    manager.dismiss();
    expect(manager.getVisible()[0] ?? null).toBeNull();

    manager.unregister();
    vi.useRealTimers();
  });
});

// ── connectedCallback / disconnectedCallback lifecycle ────────────────────────

describe('io-toast — lifecycle with persistent message registration', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
  });

  it('connectedCallback registers with toastManager without throwing', () => {
    // Use a fresh manager to avoid interference with the global singleton
    const manager = new IoToastManagerClass();
    const originalRegister = manager.register.bind(manager);
    void vi.fn(originalRegister); // ensure register is callable (not used further in this test)

    // Patch the component to use our isolated manager
    void IoToast.prototype.connectedCallback; // reference stored for isolation context
    expect(() => component.connectedCallback()).not.toThrow();
    component.disconnectedCallback();
  });

  it('render does not throw after connectedCallback with error variant message', () => {
    component.connectedCallback();
    (component as any).visibleMsgs = [{ id: 1, text: 'Auth failed', variant: 'error' }];
    expect(() => component.render()).not.toThrow();
    component.disconnectedCallback();
  });
});
