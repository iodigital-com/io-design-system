import { describe, it, expect, vi, afterEach } from 'vitest';
import { animateBar, prefersReducedMotion } from './animate-bar';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeAnchor(rect: { left: number; top: number; width: number; height: number }): Element {
  const el = document.createElement('div');
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    right: rect.left + rect.width,
    bottom: rect.top + rect.height,
    x: rect.left,
    y: rect.top,
    toJSON: () => ({}),
  } as DOMRect);
  return el;
}

const PARENT_RECT: DOMRect = {
  left: 0,
  top: 0,
  width: 400,
  height: 48,
  right: 400,
  bottom: 48,
  x: 0,
  y: 0,
  toJSON: () => ({}),
} as DOMRect;

// jsdom does not implement Web Animations API (Element.prototype.animate / getAnimations).
// We stub the prototype once before tests run so vi.spyOn can wrap the stubs.
beforeEach(() => {
  if (!(Element.prototype as any).animate) {
    (Element.prototype as any).animate = () => ({ cancel: () => {}, finished: Promise.resolve() });
  }
  if (!(Element.prototype as any).getAnimations) {
    (Element.prototype as any).getAnimations = () => [];
  }
});

function makeMarker(): HTMLElement {
  const parent = document.createElement('div');
  parent.style.position = 'relative';
  vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue(PARENT_RECT);

  const el = document.createElement('div');
  parent.appendChild(el);

  // jsdom doesn't support offsetParent for detached elements —
  // the implementation falls back to parentElement which is mocked above.
  vi.spyOn(el as any, 'getAnimations').mockReturnValue([]);
  vi.spyOn(el as any, 'animate').mockReturnValue({ cancel: vi.fn() });
  return el;
}

// ── prefersReducedMotion ───────────────────────────────────────────────────

describe('prefersReducedMotion', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns false when matchMedia says no reduce', () => {
    // window.matchMedia is mocked in tests/unit/mocks/match-media.mock.ts
    // to return { matches: false } by default.
    expect(prefersReducedMotion()).toBe(false);
  });

  it('returns true when matchMedia mock returns matches:true', () => {
    // Override the writable mock to simulate reduced motion preference
    (window.matchMedia as ReturnType<typeof vi.fn>).mockReturnValueOnce({ matches: true } as MediaQueryList);
    expect(prefersReducedMotion()).toBe(true);
  });
});

// ── animateBar ─────────────────────────────────────────────────────────────

describe('animateBar', () => {
  afterEach(() => vi.restoreAllMocks());

  it('cancels in-flight animations before starting a new one', () => {
    const cancelMock = vi.fn();
    const marker = makeMarker();
    // Re-mock getAnimations to return in-flight animations
    vi.spyOn(marker as any, 'getAnimations').mockReturnValue([
      { cancel: cancelMock },
      { cancel: cancelMock },
    ]);

    const from = makeAnchor({ left: 0, top: 0, width: 100, height: 48 });
    const to = makeAnchor({ left: 100, top: 0, width: 120, height: 48 });

    animateBar(marker, from, to, { duration: 300 });
    expect(cancelMock).toHaveBeenCalledTimes(2);
  });

  it('calls animate with translateX for horizontal dimension', () => {
    const marker = makeMarker();
    const from = makeAnchor({ left: 0, top: 0, width: 100, height: 48 });
    const to = makeAnchor({ left: 100, top: 0, width: 120, height: 48 });

    animateBar(marker, from, to, { dimension: 'horizontal', duration: 300 });

    expect(marker.animate).toHaveBeenCalledOnce();
    const [frames, opts] = (marker.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(frames[0].transform).toContain('translateX(0px)');
    expect(frames[1].transform).toContain('translateX(100px)');
    expect(frames[0].width).toBe('100px');
    expect(frames[1].width).toBe('120px');
    expect(opts.duration).toBe(300);
    expect(opts.easing).toBe('ease-in-out');
  });

  it('calls animate with translateY for vertical dimension', () => {
    const marker = makeMarker();
    const from = makeAnchor({ left: 0, top: 0, width: 100, height: 48 });
    const to = makeAnchor({ left: 0, top: 48, width: 100, height: 48 });

    animateBar(marker, from, to, { dimension: 'vertical', duration: 200 });

    const [frames] = (marker.animate as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(frames[0].transform).toContain('translateY(0px)');
    expect(frames[1].transform).toContain('translateY(48px)');
    expect(frames[0].height).toBe('48px');
  });

  it('snaps instantly when prefersReducedMotion is true', () => {
    (window.matchMedia as ReturnType<typeof vi.fn>).mockReturnValueOnce({ matches: true } as MediaQueryList);
    const marker = makeMarker();
    const from = makeAnchor({ left: 0, top: 0, width: 100, height: 48 });
    const to = makeAnchor({ left: 200, top: 0, width: 80, height: 48 });

    animateBar(marker, from, to, { duration: 300 });

    expect(marker.animate).not.toHaveBeenCalled();
    expect(marker.style.transform).toBe('translateX(200px)');
    expect(marker.style.width).toBe('80px');
  });

  it('snaps instantly when explicit duration is 0', () => {
    const marker = makeMarker();
    const from = makeAnchor({ left: 0, top: 0, width: 100, height: 48 });
    const to = makeAnchor({ left: 150, top: 0, width: 90, height: 48 });

    animateBar(marker, from, to, { duration: 0 });

    expect(marker.animate).not.toHaveBeenCalled();
    expect(marker.style.transform).toBe('translateX(150px)');
    expect(marker.style.width).toBe('90px');
  });
});
