import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createTopLayerController,
  getMaxTransitionDurationMs,
  supportsAllowDiscrete,
} from './top-layer-controller';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeEl(): HTMLElement {
  return document.createElement('div');
}

// ── supportsAllowDiscrete ──────────────────────────────────────────────────

describe('supportsAllowDiscrete', () => {
  it('returns a boolean', () => {
    expect(typeof supportsAllowDiscrete()).toBe('boolean');
  });
});

// ── getMaxTransitionDurationMs ─────────────────────────────────────────────

describe('getMaxTransitionDurationMs', () => {
  it('returns 0 when no transitions set', () => {
    const el = makeEl();
    expect(getMaxTransitionDurationMs(el)).toBe(0);
  });

  it('parses seconds correctly', () => {
    const el = makeEl();
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionDuration: '0.3s',
      animationDuration: '0s',
    } as CSSStyleDeclaration);
    expect(getMaxTransitionDurationMs(el)).toBe(300);
    vi.restoreAllMocks();
  });

  it('parses milliseconds correctly', () => {
    const el = makeEl();
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionDuration: '250ms',
      animationDuration: '0ms',
    } as CSSStyleDeclaration);
    expect(getMaxTransitionDurationMs(el)).toBe(250);
    vi.restoreAllMocks();
  });

  it('returns max of transition and animation duration', () => {
    const el = makeEl();
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionDuration: '200ms',
      animationDuration: '0.5s',
    } as CSSStyleDeclaration);
    expect(getMaxTransitionDurationMs(el)).toBe(500);
    vi.restoreAllMocks();
  });

  it('handles comma-separated values and picks largest', () => {
    const el = makeEl();
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionDuration: '100ms, 300ms, 0.2s',
      animationDuration: '0s',
    } as CSSStyleDeclaration);
    expect(getMaxTransitionDurationMs(el)).toBe(300);
    vi.restoreAllMocks();
  });
});

// ── createTopLayerController ───────────────────────────────────────────────

describe('createTopLayerController', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('calls onShow immediately on requestShow', () => {
    const onShow = vi.fn();
    const onHide = vi.fn();
    const el = makeEl();
    const ctrl = createTopLayerController(el, { onShow, onHide });
    ctrl.requestShow();
    expect(onShow).toHaveBeenCalledOnce();
    expect(onHide).not.toHaveBeenCalled();
  });

  it('calls onHide synchronously when duration is 0 (no CSS transitions)', () => {
    const onHide = vi.fn();
    const el = makeEl();
    // Duration will be 0 in jsdom (no CSS set)
    const ctrl = createTopLayerController(el, { onHide });
    ctrl.requestHide();
    expect(onHide).toHaveBeenCalledOnce();
  });

  it('delays onHide by duration + 50ms when allow-discrete NOT supported', () => {
    // Force no allow-discrete support and a computed duration of 300ms
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionDuration: '0.3s',
      animationDuration: '0s',
    } as CSSStyleDeclaration);

    // Ensure supportsAllowDiscrete returns false inside the controller
    // by mocking CSS.supports
    const originalCSS = global.CSS;
    (global as any).CSS = { supports: () => false };

    const onHide = vi.fn();
    const el = makeEl();
    const ctrl = createTopLayerController(el, { onHide });
    ctrl.requestHide();

    expect(onHide).not.toHaveBeenCalled();
    vi.advanceTimersByTime(349);
    expect(onHide).not.toHaveBeenCalled();
    vi.advanceTimersByTime(2);
    expect(onHide).toHaveBeenCalledOnce();

    (global as any).CSS = originalCSS;
  });

  it('cancels pending hide timer on destroy', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      transitionDuration: '0.3s',
      animationDuration: '0s',
    } as CSSStyleDeclaration);

    const originalCSS = global.CSS;
    (global as any).CSS = { supports: () => false };

    const onHide = vi.fn();
    const el = makeEl();
    const ctrl = createTopLayerController(el, { onHide });
    ctrl.requestHide();
    ctrl.destroy();

    vi.advanceTimersByTime(1000);
    expect(onHide).not.toHaveBeenCalled();

    (global as any).CSS = originalCSS;
  });

  it('removes closing class on requestShow', () => {
    const el = makeEl();
    el.classList.add('top-layer--closing');
    const ctrl = createTopLayerController(el, { onHide: vi.fn() });
    ctrl.requestShow();
    expect(el.classList.contains('top-layer--closing')).toBe(false);
  });
});
