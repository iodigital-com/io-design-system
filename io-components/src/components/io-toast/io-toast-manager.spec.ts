import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IoToastManagerClass } from './io-toast-manager';

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
});

describe('IoToastManagerClass — addToast', () => {
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
    expect(refresh).toHaveBeenCalledWith(expect.objectContaining({ text: 'First' }));
  });

  it('queues second message if one is already visible', () => {
    manager.addToast({ text: 'First' });
    const callCount = refresh.mock.calls.length;
    manager.addToast({ text: 'Second' });
    expect(refresh.mock.calls.length).toBe(callCount); // not called again yet
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

describe('IoToastManagerClass — dismiss', () => {
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

  it('dismiss() sets current to null immediately', () => {
    manager.addToast({ text: 'First' });
    manager.dismiss();
    expect(manager.getCurrent()).toBeNull();
    expect(refresh).toHaveBeenLastCalledWith(null);
  });

  it('shows next queued item after DISMISS_DELAY', () => {
    manager.addToast({ text: 'First' });
    manager.addToast({ text: 'Second' });
    manager.dismiss();
    vi.advanceTimersByTime(300); // > DISMISS_DELAY (200ms)
    expect(manager.getCurrent()?.text).toBe('Second');
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
});
