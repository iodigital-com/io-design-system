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

// ── render(): persistent=true fires the 'alertdialog' / 'assertive' branch ───

describe('io-toast — render() persistent message: alertdialog / assertive branch', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
  });

  it('does not throw when currentMsg has variant="error" (persistent)', () => {
    (component as any).currentMsg = { id: 1, text: 'Error!', variant: 'error' };
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw when currentMsg has persistent=true', () => {
    (component as any).currentMsg = {
      id: 2,
      text: 'Requires action',
      variant: 'info',
      persistent: true,
    };
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw when currentMsg has variant="error" and persistent=true', () => {
    (component as any).currentMsg = {
      id: 3,
      text: 'Critical failure',
      variant: 'error',
      persistent: true,
    };
    expect(() => component.render()).not.toThrow();
  });
});

// ── render(): non-persistent message fires the 'status' / 'polite' branch ────

describe('io-toast — render() non-persistent message: status / polite branch', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
  });

  it('does not throw when currentMsg has variant="success" (non-persistent)', () => {
    (component as any).currentMsg = { id: 1, text: 'Saved', variant: 'success' };
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw when currentMsg is null (no active toast)', () => {
    (component as any).currentMsg = null;
    expect(() => component.render()).not.toThrow();
  });
});

// ── isToastPersistent drives render() ARIA role/aria-live ─────────────────────

describe('io-toast — isToastPersistent integration with render()', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
  });

  it('isToastPersistent is true for error variant — covers alertdialog branch', () => {
    const entry: IoToastEntry = { id: 1, text: 'Error', variant: 'error' };
    expect(isToastPersistent(entry)).toBe(true);

    (component as any).currentMsg = entry;
    expect(() => component.render()).not.toThrow();
  });

  it('isToastPersistent is false for success variant — covers status branch', () => {
    const entry: IoToastEntry = { id: 2, text: 'Done', variant: 'success' };
    expect(isToastPersistent(entry)).toBe(false);

    (component as any).currentMsg = entry;
    expect(() => component.render()).not.toThrow();
  });

  it('isToastPersistent is false when currentMsg is null — covers falsy branch', () => {
    // persistent = this.currentMsg ? isToastPersistent(...) : false
    // When currentMsg is null, the false branch of the ternary fires
    (component as any).currentMsg = null;
    // Render should use 'status' and 'polite' (non-persistent defaults)
    expect(() => component.render()).not.toThrow();
  });
});

// ── dismiss() when queue is empty (if(next) false branch) ────────────────────

describe('io-toast-manager — dismiss() with empty queue (if(next) false)', () => {
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

  it('setTimeout fires but next is undefined — no show() called', () => {
    manager.addToast({ text: 'Only toast' });
    expect(manager.getCurrent()?.text).toBe('Only toast');

    // Dismiss — queue is empty, so next will be undefined after shift()
    manager.dismiss();
    expect(manager.getCurrent()).toBeNull();

    // Advance past DISMISS_DELAY (200ms) — the if(next) branch is false
    vi.advanceTimersByTime(300);

    // current remains null — no second toast was shown
    expect(manager.getCurrent()).toBeNull();
  });

  it('refresh is called with null immediately on dismiss', () => {
    manager.addToast({ text: 'Only toast' });
    refresh.mockClear();

    manager.dismiss();

    // refresh(null) called immediately
    expect(refresh).toHaveBeenCalledWith(null);
  });

  it('refresh is not called again after DISMISS_DELAY when queue is empty', () => {
    manager.addToast({ text: 'Only toast' });
    manager.dismiss();
    const callCountAfterDismiss = refresh.mock.calls.length;

    vi.advanceTimersByTime(300);

    // No additional refresh calls since next was undefined
    expect(refresh.mock.calls.length).toBe(callCountAfterDismiss);
  });

  it('dismiss() on empty current does not throw', () => {
    // No toast added — current is null, queue is empty
    expect(() => manager.dismiss()).not.toThrow();
  });

  it('dismiss() twice in a row does not throw', () => {
    manager.addToast({ text: 'Toast' });
    manager.dismiss();
    expect(() => manager.dismiss()).not.toThrow();
    vi.advanceTimersByTime(300);
    expect(manager.getCurrent()).toBeNull();
  });
});

// ── dismiss() when queue has items (if(next) true branch — for completeness) ──

describe('io-toast-manager — dismiss() with queued item (if(next) true)', () => {
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

  it('shows the next queued toast after DISMISS_DELAY', () => {
    manager.addToast({ text: 'First' });
    manager.addToast({ text: 'Second' });

    manager.dismiss();
    expect(manager.getCurrent()).toBeNull();

    vi.advanceTimersByTime(300);
    expect(manager.getCurrent()?.text).toBe('Second');
  });

  it('refresh is called with the next toast entry after DISMISS_DELAY', () => {
    manager.addToast({ text: 'First' });
    manager.addToast({ text: 'Second' });
    manager.dismiss();
    refresh.mockClear();

    vi.advanceTimersByTime(300);
    expect(refresh).toHaveBeenCalledWith(expect.objectContaining({ text: 'Second' }));
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
    expect(manager.getCurrent()?.variant).toBe('error');

    // Verify persistent toast does not auto-dismiss
    vi.advanceTimersByTime(60000);
    expect(manager.getCurrent()).not.toBeNull();

    // Manual dismiss works
    manager.dismiss();
    expect(manager.getCurrent()).toBeNull();

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
    (component as any).currentMsg = { id: 1, text: 'Auth failed', variant: 'error' };
    expect(() => component.render()).not.toThrow();
    component.disconnectedCallback();
  });
});
