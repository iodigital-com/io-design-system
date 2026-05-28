import { beforeEach, describe, expect, it, vi } from 'vitest';

import { IoScroller } from './io-scroller';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeComponent(): IoScroller {
  const c = new IoScroller();
  (c as any).el = document.createElement('io-scroller');
  return c;
}

/**
 * Wire the three private DOM refs that setupObserver requires.
 * Returns the three elements so tests can interact with them directly.
 */
function wireRefs(c: IoScroller): {
  container: HTMLDivElement;
  start: HTMLDivElement;
  end: HTMLDivElement;
} {
  const container = document.createElement('div');
  const start = document.createElement('div');
  const end = document.createElement('div');

  (c as any).scrollContainer = container;
  (c as any).startSentinel = start;
  (c as any).endSentinel = end;

  return { container, start, end };
}

/**
 * Build a fake HTMLDivElement with scroll-geometry properties overridden.
 * Object.defineProperty is required because jsdom makes these read-only.
 */
function makeScrollContainer(props: {
  scrollLeft?: number;
  scrollTop?: number;
  scrollWidth?: number;
  scrollHeight?: number;
  clientWidth?: number;
  clientHeight?: number;
}): HTMLDivElement {
  const el = document.createElement('div');

  const defaults = {
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
  };

  const merged = { ...defaults, ...props };

  for (const [key, value] of Object.entries(merged)) {
    Object.defineProperty(el, key, { value, writable: true, configurable: true });
  }

  return el as HTMLDivElement;
}

// ── IntersectionObserver class-mock factory ───────────────────────────────────

/**
 * Vitest requires a class/function constructor when the code uses `new`.
 * `vi.fn().mockReturnValue(...)` throws; we must use `mockImplementation`
 * with a regular `function` (not an arrow) so it can be called with `new`.
 */
function makeIOMock(instance: { observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> }) {
  return vi.fn().mockImplementation(function (
    this: unknown,
    cb: (entries: IntersectionObserverEntry[]) => void,
  ) {
    // Expose the callback so tests can invoke it directly when needed.
    (instance as any)._callback = cb;
    Object.assign(this as object, instance);
  });
}

/**
 * A variant that also captures the callback externally for the
 * "IntersectionObserver callback" describe-block.
 */
function makeIOMockWithCapture(
  instance: { observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> },
  capture: { cb?: (entries: IntersectionObserverEntry[]) => void },
) {
  return vi.fn().mockImplementation(function (
    this: unknown,
    cb: (entries: IntersectionObserverEntry[]) => void,
  ) {
    capture.cb = cb;
    Object.assign(this as object, instance);
  });
}

// ── 1. componentDidLoad ───────────────────────────────────────────────────────

describe('io-scroller — componentDidLoad', () => {
  it('calls setupObserver when refs are wired', () => {
    const c = makeComponent();
    const { container, start, end } = wireRefs(c);

    const mockInstance = { observe: vi.fn(), disconnect: vi.fn() };
    vi.stubGlobal('IntersectionObserver', makeIOMock(mockInstance));

    try {
      c.componentDidLoad();
      expect(mockInstance.observe).toHaveBeenCalledWith(start);
      expect(mockInstance.observe).toHaveBeenCalledWith(end);
    } finally {
      vi.unstubAllGlobals();
    }

    void container; // referenced to satisfy lint
  });

  it('does not throw when refs are absent (early-return path)', () => {
    const c = makeComponent();
    // No refs wired — early return should prevent any side effects
    expect(() => c.componentDidLoad()).not.toThrow();
  });
});

// ── 2. setupObserver — early return ──────────────────────────────────────────

describe('io-scroller — setupObserver: early return when refs absent', () => {
  it('does not throw when all refs are undefined', () => {
    const c = makeComponent();
    expect(() => (c as any).setupObserver()).not.toThrow();
  });

  it('does not throw when only container is set', () => {
    const c = makeComponent();
    (c as any).scrollContainer = document.createElement('div');
    expect(() => (c as any).setupObserver()).not.toThrow();
  });

  it('does not throw when container and start are set but end is absent', () => {
    const c = makeComponent();
    (c as any).scrollContainer = document.createElement('div');
    (c as any).startSentinel = document.createElement('div');
    expect(() => (c as any).setupObserver()).not.toThrow();
  });

  it('leaves observer undefined when returning early', () => {
    const c = makeComponent();
    (c as any).setupObserver();
    expect((c as any).observer).toBeUndefined();
  });
});

// ── 3. setupObserver — IntersectionObserver path ─────────────────────────────

describe('io-scroller — setupObserver: IntersectionObserver path', () => {
  let c: IoScroller;
  let start: HTMLDivElement;
  let end: HTMLDivElement;
  let container: HTMLDivElement;
  let mockInstance: { observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> };
  let MockIO: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    c = makeComponent();
    ({ container, start, end } = wireRefs(c));

    mockInstance = { observe: vi.fn(), disconnect: vi.fn() };
    MockIO = makeIOMock(mockInstance);
    vi.stubGlobal('IntersectionObserver', MockIO);

    (c as any).setupObserver();
  });

  it('constructs IntersectionObserver with container as root and 0.1 threshold', () => {
    expect(MockIO).toHaveBeenCalledOnce();
    const [, options] = MockIO.mock.calls[0] as [unknown, IntersectionObserverInit];
    expect(options.root).toBe(container);
    expect(options.threshold).toBe(0.1);
  });

  it('observes the start sentinel', () => {
    expect(mockInstance.observe).toHaveBeenCalledWith(start);
  });

  it('observes the end sentinel', () => {
    expect(mockInstance.observe).toHaveBeenCalledWith(end);
  });

  it('stores the observer on the component', () => {
    // The component stores `this` from the constructor call, so check it's an object
    // with the mock methods attached — not a plain undefined.
    expect((c as any).observer).toBeDefined();
    expect((c as any).observer.observe).toBe(mockInstance.observe);
  });

  it('does not register a scroll handler when IntersectionObserver is available', () => {
    expect((c as any).scrollHandler).toBeUndefined();
  });
});

// ── 4. IntersectionObserver callback ─────────────────────────────────────────

describe('io-scroller — IntersectionObserver callback', () => {
  let c: IoScroller;
  let start: HTMLDivElement;
  let end: HTMLDivElement;
  let capture: { cb?: (entries: IntersectionObserverEntry[]) => void };

  beforeEach(() => {
    c = makeComponent();
    ({ start, end } = wireRefs(c));

    capture = {};
    const mockInstance = { observe: vi.fn(), disconnect: vi.fn() };
    vi.stubGlobal('IntersectionObserver', makeIOMockWithCapture(mockInstance, capture));

    (c as any).setupObserver();
  });

  it('sets atStart=true when start sentinel entry is intersecting', () => {
    (c as any).atStart = false;
    capture.cb!([{ target: start, isIntersecting: true } as IntersectionObserverEntry]);
    expect((c as any).atStart).toBe(true);
  });

  it('sets atStart=false when start sentinel entry is not intersecting', () => {
    (c as any).atStart = true;
    capture.cb!([{ target: start, isIntersecting: false } as IntersectionObserverEntry]);
    expect((c as any).atStart).toBe(false);
  });

  it('sets atEnd=true when end sentinel entry is intersecting', () => {
    (c as any).atEnd = false;
    capture.cb!([{ target: end, isIntersecting: true } as IntersectionObserverEntry]);
    expect((c as any).atEnd).toBe(true);
  });

  it('sets atEnd=false when end sentinel entry is not intersecting', () => {
    (c as any).atEnd = true;
    capture.cb!([{ target: end, isIntersecting: false } as IntersectionObserverEntry]);
    expect((c as any).atEnd).toBe(false);
  });

  it('leaves atStart and atEnd unchanged for an unrecognised target', () => {
    (c as any).atStart = true;
    (c as any).atEnd = false;
    const unrelated = document.createElement('div');
    capture.cb!([{ target: unrelated, isIntersecting: true } as IntersectionObserverEntry]);
    expect((c as any).atStart).toBe(true);
    expect((c as any).atEnd).toBe(false);
  });

  it('calls syncHostClasses after processing entries', () => {
    const sync = vi.spyOn(c as any, 'syncHostClasses');
    capture.cb!([{ target: start, isIntersecting: false } as IntersectionObserverEntry]);
    expect(sync).toHaveBeenCalledOnce();
  });

  it('processes multiple entries in a single callback invocation', () => {
    (c as any).atStart = true;
    (c as any).atEnd = true;
    capture.cb!([
      { target: start, isIntersecting: false } as IntersectionObserverEntry,
      { target: end, isIntersecting: false } as IntersectionObserverEntry,
    ]);
    expect((c as any).atStart).toBe(false);
    expect((c as any).atEnd).toBe(false);
  });
});

// ── 5. setupObserver — scroll-fallback path (no IntersectionObserver) ────────

describe('io-scroller — setupObserver: scroll-fallback path', () => {
  let savedIO: typeof IntersectionObserver | undefined;

  beforeEach(() => {
    savedIO = (global as any).IntersectionObserver;
    delete (global as any).IntersectionObserver;
  });

  afterEach(() => {
    if (savedIO !== undefined) {
      (global as any).IntersectionObserver = savedIO;
    }
  });

  it('registers a scroll handler on the container', () => {
    const c = makeComponent();
    const { container } = wireRefs(c);
    const addSpy = vi.spyOn(container, 'addEventListener');

    (c as any).setupObserver();

    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
  });

  it('stores the scroll handler on the component', () => {
    const c = makeComponent();
    wireRefs(c);
    (c as any).setupObserver();
    expect((c as any).scrollHandler).toBeTypeOf('function');
  });

  it('does not create an IntersectionObserver instance', () => {
    const c = makeComponent();
    wireRefs(c);
    (c as any).setupObserver();
    expect((c as any).observer).toBeUndefined();
  });

  it('calls updateEdgeStateFromScroll immediately on setup', () => {
    const c = makeComponent();
    const { container } = wireRefs(c);
    const updateSpy = vi.spyOn(c as any, 'updateEdgeStateFromScroll');

    (c as any).setupObserver();

    expect(updateSpy).toHaveBeenCalledWith(container);
  });

  it('invoking the stored scroll handler calls updateEdgeStateFromScroll', () => {
    const c = makeComponent();
    const { container } = wireRefs(c);
    (c as any).setupObserver();

    const updateSpy = vi.spyOn(c as any, 'updateEdgeStateFromScroll');
    (c as any).scrollHandler();

    expect(updateSpy).toHaveBeenCalledWith(container);
  });
});

// ── 6. updateEdgeStateFromScroll — horizontal ────────────────────────────────

describe('io-scroller — updateEdgeStateFromScroll: horizontal', () => {
  it('sets atStart=true and atEnd=true when at start of short content (maxScroll=0)', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const container = makeScrollContainer({ scrollLeft: 0, scrollWidth: 300, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atStart).toBe(true);
    expect((c as any).atEnd).toBe(true);
  });

  it('sets atStart=true when scrollLeft=0', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const container = makeScrollContainer({ scrollLeft: 0, scrollWidth: 900, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atStart).toBe(true);
  });

  it('sets atStart=true when scrollLeft=1 (boundary value)', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const container = makeScrollContainer({ scrollLeft: 1, scrollWidth: 900, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atStart).toBe(true);
  });

  it('sets atStart=false when scrollLeft=2 (just past boundary)', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const container = makeScrollContainer({ scrollLeft: 2, scrollWidth: 900, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atStart).toBe(false);
  });

  it('sets atEnd=false when mid-scroll (scrollLeft=150, maxScroll=600)', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const container = makeScrollContainer({ scrollLeft: 150, scrollWidth: 900, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atEnd).toBe(false);
  });

  it('sets atEnd=true when scrollLeft reaches maxScroll-1', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    // maxScroll = 900 - 300 = 600; scrollLeft=599 → scrollPos >= maxScroll-1
    const container = makeScrollContainer({ scrollLeft: 599, scrollWidth: 900, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atEnd).toBe(true);
  });

  it('sets atEnd=true when scrollLeft equals maxScroll exactly', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const container = makeScrollContainer({ scrollLeft: 600, scrollWidth: 900, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atEnd).toBe(true);
  });

  it('calls syncHostClasses', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const sync = vi.spyOn(c as any, 'syncHostClasses');
    const container = makeScrollContainer({ scrollLeft: 0, scrollWidth: 300, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect(sync).toHaveBeenCalledOnce();
  });
});

// ── 7. updateEdgeStateFromScroll — vertical ───────────────────────────────────

describe('io-scroller — updateEdgeStateFromScroll: vertical', () => {
  it('sets atStart=true when scrollTop=0', () => {
    const c = makeComponent();
    c.orientation = 'vertical';
    const container = makeScrollContainer({ scrollTop: 0, scrollHeight: 800, clientHeight: 400 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atStart).toBe(true);
  });

  it('sets atStart=false when scrollTop=50 (past boundary)', () => {
    const c = makeComponent();
    c.orientation = 'vertical';
    const container = makeScrollContainer({ scrollTop: 50, scrollHeight: 800, clientHeight: 400 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atStart).toBe(false);
  });

  it('sets atEnd=false when mid-scroll vertically', () => {
    const c = makeComponent();
    c.orientation = 'vertical';
    // maxScroll = 800 - 400 = 400; scrollTop=200 → not at end
    const container = makeScrollContainer({ scrollTop: 200, scrollHeight: 800, clientHeight: 400 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atEnd).toBe(false);
  });

  it('sets atEnd=true when scrollTop reaches maxScroll-1', () => {
    const c = makeComponent();
    c.orientation = 'vertical';
    // maxScroll = 400; scrollTop=399 → atEnd
    const container = makeScrollContainer({ scrollTop: 399, scrollHeight: 800, clientHeight: 400 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atEnd).toBe(true);
  });

  it('uses scrollTop (not scrollLeft) for vertical orientation', () => {
    const c = makeComponent();
    c.orientation = 'vertical';
    // scrollLeft is large but scrollTop is 0 — should still read atStart=true
    const container = makeScrollContainer({
      scrollLeft: 999,
      scrollTop: 0,
      scrollHeight: 800,
      clientHeight: 400,
    });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atStart).toBe(true);
  });
});

// ── 8. updateEdgeStateFromScroll — tiny maxScroll (≤1) ───────────────────────

describe('io-scroller — updateEdgeStateFromScroll: tiny maxScroll', () => {
  it('sets atEnd=true when maxScroll=0 (content fits exactly)', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const container = makeScrollContainer({ scrollLeft: 0, scrollWidth: 300, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atEnd).toBe(true);
  });

  it('sets atEnd=true when maxScroll=1 (boundary)', () => {
    const c = makeComponent();
    c.orientation = 'horizontal';
    const container = makeScrollContainer({ scrollLeft: 0, scrollWidth: 301, clientWidth: 300 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atEnd).toBe(true);
  });

  it('sets atEnd=true for vertical tiny maxScroll', () => {
    const c = makeComponent();
    c.orientation = 'vertical';
    const container = makeScrollContainer({ scrollTop: 0, scrollHeight: 400, clientHeight: 400 });
    (c as any).updateEdgeStateFromScroll(container);
    expect((c as any).atEnd).toBe(true);
  });
});

// ── 9. teardownObserver — observer path ──────────────────────────────────────

describe('io-scroller — teardownObserver: IntersectionObserver cleanup', () => {
  it('calls disconnect on the stored observer', () => {
    const c = makeComponent();
    const mockObserver = { observe: vi.fn(), disconnect: vi.fn() };
    (c as any).observer = mockObserver;
    (c as any).teardownObserver();
    expect(mockObserver.disconnect).toHaveBeenCalledOnce();
  });

  it('sets observer to undefined after teardown', () => {
    const c = makeComponent();
    (c as any).observer = { observe: vi.fn(), disconnect: vi.fn() };
    (c as any).teardownObserver();
    expect((c as any).observer).toBeUndefined();
  });
});

// ── 10. teardownObserver — scroll handler path ───────────────────────────────

describe('io-scroller — teardownObserver: scroll handler cleanup', () => {
  it('removes the scroll event listener from the container', () => {
    const c = makeComponent();
    const { container } = wireRefs(c);
    const handler = vi.fn();
    (c as any).scrollHandler = handler;
    const removeSpy = vi.spyOn(container, 'removeEventListener');

    (c as any).teardownObserver();

    expect(removeSpy).toHaveBeenCalledWith('scroll', handler);
  });

  it('sets scrollHandler to undefined after removal', () => {
    const c = makeComponent();
    wireRefs(c);
    (c as any).scrollHandler = vi.fn();
    (c as any).teardownObserver();
    expect((c as any).scrollHandler).toBeUndefined();
  });

  it('does not attempt removeEventListener when scrollContainer is absent', () => {
    const c = makeComponent();
    // scrollHandler set but no scrollContainer — should not throw
    (c as any).scrollHandler = vi.fn();
    expect(() => (c as any).teardownObserver()).not.toThrow();
  });
});

// ── 11. teardownObserver — no-op when nothing set ────────────────────────────

describe('io-scroller — teardownObserver: no-op', () => {
  it('does not throw when observer and scrollHandler are both undefined', () => {
    const c = makeComponent();
    expect(() => (c as any).teardownObserver()).not.toThrow();
  });

  it('leaves observer undefined when nothing was set', () => {
    const c = makeComponent();
    (c as any).teardownObserver();
    expect((c as any).observer).toBeUndefined();
  });

  it('leaves scrollHandler undefined when nothing was set', () => {
    const c = makeComponent();
    (c as any).teardownObserver();
    expect((c as any).scrollHandler).toBeUndefined();
  });
});

// ── 12. disconnectedCallback ─────────────────────────────────────────────────

describe('io-scroller — disconnectedCallback', () => {
  it('calls teardownObserver (disconnects a live observer)', () => {
    const c = makeComponent();
    const mockObserver = { observe: vi.fn(), disconnect: vi.fn() };
    (c as any).observer = mockObserver;
    c.disconnectedCallback();
    expect(mockObserver.disconnect).toHaveBeenCalledOnce();
    expect((c as any).observer).toBeUndefined();
  });

  it('calls teardownObserver (removes a live scroll handler)', () => {
    const c = makeComponent();
    const { container } = wireRefs(c);
    const handler = vi.fn();
    (c as any).scrollHandler = handler;
    const removeSpy = vi.spyOn(container, 'removeEventListener');

    c.disconnectedCallback();

    expect(removeSpy).toHaveBeenCalledWith('scroll', handler);
    expect((c as any).scrollHandler).toBeUndefined();
  });

  it('does not throw when neither observer nor handler is set', () => {
    const c = makeComponent();
    expect(() => c.disconnectedCallback()).not.toThrow();
  });
});

// ── 13. handleOrientationChange ──────────────────────────────────────────────

describe('io-scroller — handleOrientationChange', () => {
  it('tears down then sets up the observer (IntersectionObserver path)', () => {
    const c = makeComponent();
    wireRefs(c);

    const oldObserver = { observe: vi.fn(), disconnect: vi.fn() };
    (c as any).observer = oldObserver;

    const newInstance = { observe: vi.fn(), disconnect: vi.fn() };
    const MockIO = makeIOMock(newInstance);
    vi.stubGlobal('IntersectionObserver', MockIO);

    try {
      c.handleOrientationChange();

      // Old observer disconnected
      expect(oldObserver.disconnect).toHaveBeenCalledOnce();
      // New observer created and both sentinels observed
      expect(MockIO).toHaveBeenCalledOnce();
      expect(newInstance.observe).toHaveBeenCalledTimes(2);
      // Component's observer is the new instance
      expect((c as any).observer).toBeDefined();
      expect((c as any).observer.observe).toBe(newInstance.observe);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('tears down then sets up scroll handler (fallback path)', () => {
    const savedIO = (global as any).IntersectionObserver;
    delete (global as any).IntersectionObserver;

    try {
      const c = makeComponent();
      const { container } = wireRefs(c);

      const oldHandler = vi.fn();
      (c as any).scrollHandler = oldHandler;
      const removeSpy = vi.spyOn(container, 'addEventListener');

      c.handleOrientationChange();

      // Old handler was cleared, new one registered
      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
      expect((c as any).scrollHandler).not.toBe(oldHandler);
    } finally {
      if (savedIO !== undefined) {
        (global as any).IntersectionObserver = savedIO;
      }
    }
  });

  it('does not throw when called with no refs (teardown + early-return setup)', () => {
    const c = makeComponent();
    expect(() => c.handleOrientationChange()).not.toThrow();
  });
});
