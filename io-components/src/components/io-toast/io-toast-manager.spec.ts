import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoToastManagerClass, MAX_VISIBLE } from './io-toast-manager';

function makeManager() {
  return new IoToastManagerClass();
}

describe('IoToastManagerClass — registration', () => {
  let manager: IoToastManagerClass;

  beforeEach(() => {
    manager = makeManager();
  });

  it('registers a refresh callback', () => {
    const fn = vi.fn();
    manager.register(fn);
    expect(manager.getCurrent()).toBeNull();
  });

  it('warns if a second instance tries to register', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    manager.register(vi.fn());
    manager.register(vi.fn());
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('unregister clears state', () => {
    const fn = vi.fn();
    manager.register(fn);
    manager.addToast({ text: 'Test' });
    manager.unregister();
    expect(manager.getCurrent()).toBeNull();
  });

  it('getVisible returns empty array initially', () => {
    manager.register(vi.fn());
    expect(manager.getVisible()).toHaveLength(0);
  });

  it('getQueue returns empty array initially', () => {
    manager.register(vi.fn());
    expect(manager.getQueue()).toHaveLength(0);
  });
});

describe('IoToastManagerClass — addToast (stacked, issue #994)', () => {
  let manager: IoToastManagerClass;
  let refresh: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    manager = makeManager();
    refresh = vi.fn();
    manager.register(refresh);
  });

  afterEach(() => {
    manager.unregister();
  });

  it('shows first message immediately', () => {
    manager.addToast({ text: 'First' });
    expect(refresh).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ text: 'First' })]));
  });

  it('shows up to maxVisible toasts simultaneously', () => {
    for (let i = 0; i < MAX_VISIBLE; i++) {
      manager.addToast({ text: `Toast ${i}` });
    }
    expect(manager.getVisible()).toHaveLength(MAX_VISIBLE);
  });

  it('queues items beyond maxVisible', () => {
    for (let i = 0; i < MAX_VISIBLE + 2; i++) {
      manager.addToast({ text: `Toast ${i}` });
    }
    expect(manager.getVisible()).toHaveLength(MAX_VISIBLE);
    expect(manager.getQueue()).toHaveLength(MAX_VISIBLE + 2); // visible + queued
  });

  it('getCurrent returns oldest visible entry', () => {
    manager.addToast({ text: 'First' });
    manager.addToast({ text: 'Second' });
    expect(manager.getCurrent()?.text).toBe('First');
  });

  it('applies neutral variant by default', () => {
    manager.addToast({ text: 'No variant' });
    expect(manager.getCurrent()?.variant).toBe('neutral');
  });

  it('respects explicit variant', () => {
    manager.addToast({ text: 'Error!', variant: 'error' });
    expect(manager.getCurrent()?.variant).toBe('error');
  });

  it('warns on empty text', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    manager.addToast({ text: '   ' });
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('warns if no component is registered', () => {
    const fresh = makeManager();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    fresh.addToast({ text: 'No component' });
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('IoToastManagerClass — dismiss (stacked, issue #994)', () => {
  let manager: IoToastManagerClass;
  let refresh: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    manager = makeManager();
    refresh = vi.fn();
    manager.register(refresh);
  });

  afterEach(() => {
    vi.useRealTimers();
    manager.unregister();
  });

  it('dismiss() with no id removes oldest visible toast', () => {
    manager.addToast({ text: 'First' });
    manager.addToast({ text: 'Second' });
    manager.dismiss();
    const visible = manager.getVisible();
    expect(visible.find((e) => e.text === 'First')).toBeUndefined();
    expect(visible.find((e) => e.text === 'Second')).toBeDefined();
  });

  it('dismiss(id) removes the specific toast', () => {
    manager.addToast({ text: 'First' });
    manager.addToast({ text: 'Second' });
    const secondId = manager.getVisible()[1]?.id;
    manager.dismiss(secondId);
    expect(manager.getVisible().find((e) => e.text === 'Second')).toBeUndefined();
    expect(manager.getVisible().find((e) => e.text === 'First')).toBeDefined();
  });

  it('dismiss() promotes queued item after DISMISS_DELAY', () => {
    for (let i = 0; i < MAX_VISIBLE + 1; i++) {
      manager.addToast({ text: `Toast ${i}` });
    }
    expect(manager.getVisible()).toHaveLength(MAX_VISIBLE);
    manager.dismiss();
    vi.advanceTimersByTime(300); // > DISMISS_DELAY (200ms)
    expect(manager.getVisible()).toHaveLength(MAX_VISIBLE);
  });

  it('dismissAll() clears all visible and queued toasts', () => {
    for (let i = 0; i < MAX_VISIBLE + 2; i++) {
      manager.addToast({ text: `Toast ${i}` });
    }
    manager.dismissAll();
    expect(manager.getVisible()).toHaveLength(0);
    expect(manager.getQueue()).toHaveLength(0);
    expect(refresh).toHaveBeenLastCalledWith([]);
  });

  it('auto-dismisses after default duration (6000ms)', () => {
    manager.addToast({ text: 'Auto' });
    vi.advanceTimersByTime(6000);
    expect(manager.getCurrent()).toBeNull();
  });

  it('respects custom duration', () => {
    manager.addToast({ text: 'Fast', duration: 1000 });
    vi.advanceTimersByTime(999);
    expect(manager.getCurrent()).not.toBeNull();
    vi.advanceTimersByTime(1);
    expect(manager.getCurrent()).toBeNull();
  });

  it('does not auto-dismiss when duration is 0 (persistent)', () => {
    manager.addToast({ text: 'Persistent', duration: 0 });
    vi.advanceTimersByTime(60000);
    expect(manager.getCurrent()).not.toBeNull();
  });

  it('does not auto-dismiss when persistent: true', () => {
    manager.addToast({ text: 'Must close', persistent: true });
    vi.advanceTimersByTime(60000);
    expect(manager.getCurrent()).not.toBeNull();
  });

  it('does not auto-dismiss error-variant toasts', () => {
    manager.addToast({ text: 'Error occurred', variant: 'error' });
    vi.advanceTimersByTime(60000);
    expect(manager.getCurrent()).not.toBeNull();
  });

  it('auto-dismisses non-error toasts after default duration', () => {
    manager.addToast({ text: 'Info', variant: 'info' });
    vi.advanceTimersByTime(6000);
    expect(manager.getCurrent()).toBeNull();
  });

  it('dismiss() on empty queue does not throw', () => {
    expect(() => manager.dismiss()).not.toThrow();
  });

  it('each visible toast auto-dismisses independently', () => {
    vi.useFakeTimers();
    manager.addToast({ text: 'Fast', duration: 1000 });
    manager.addToast({ text: 'Slow', duration: 5000 });
    vi.advanceTimersByTime(1000);
    expect(manager.getVisible().find((e) => e.text === 'Fast')).toBeUndefined();
    expect(manager.getVisible().find((e) => e.text === 'Slow')).toBeDefined();
    vi.advanceTimersByTime(4000);
    expect(manager.getVisible().find((e) => e.text === 'Slow')).toBeUndefined();
  });
});

describe('IoToastManagerClass — getQueue / getVisible snapshots (issue #994)', () => {
  let manager: IoToastManagerClass;

  beforeEach(() => {
    manager = makeManager();
    manager.register(vi.fn());
  });

  afterEach(() => {
    manager.unregister();
  });

  it('getQueue includes both visible and queued entries', () => {
    for (let i = 0; i < MAX_VISIBLE + 1; i++) {
      manager.addToast({ text: `Toast ${i}` });
    }
    expect(manager.getQueue()).toHaveLength(MAX_VISIBLE + 1);
  });

  it('getVisible returns a copy (mutation does not affect manager state)', () => {
    manager.addToast({ text: 'Test' });
    const snap = manager.getVisible() as IoToastManagerClass['getVisible'] extends () => infer R ? R : never;
    (snap as unknown[]).length = 0;
    expect(manager.getVisible()).toHaveLength(1);
  });
});
