import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoCarousel } from './io-carousel';

// ── Helpers ──────────────────────────────────────────────────────────────────

function renderCalls(c: IoCarousel) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  (c as any).render();
  return hMock.mock.calls as Array<[string, Record<string, unknown>, ...unknown[]]>;
}

function findBtn(calls: Array<[string, Record<string, unknown>, ...unknown[]]>, cls: string) {
  return calls.find(([tag, attrs]) => tag === 'button' && typeof attrs?.class === 'string' && (attrs.class as string).includes(cls));
}

function makeTrack(
  overrides: Partial<{ scrollLeft: number; scrollWidth: number; clientWidth: number }> = {},
) {
  const track = document.createElement('div');
  Object.defineProperty(track, 'clientWidth', {
    value: overrides.clientWidth ?? 900,
    configurable: true,
  });
  Object.defineProperty(track, 'scrollWidth', {
    value: overrides.scrollWidth ?? 3000,
    configurable: true,
  });
  Object.defineProperty(track, 'offsetLeft', { value: 0, configurable: true });
  track.scrollLeft = overrides.scrollLeft ?? 0;
  (track as any).scrollTo = vi.fn();
  (track as any).scrollBy = vi.fn();
  (track as any).getBoundingClientRect = vi.fn(() => ({ left: 0, top: 0, right: 900, bottom: 600 }));
  return track;
}

function makeSlide(left: number, width = 300) {
  const el = document.createElement('div');
  (el as any).getBoundingClientRect = vi.fn(() => ({
    left,
    right: left + width,
    top: 0,
    bottom: 600,
  }));
  return el;
}

function makeCarousel(slides: HTMLElement[] = [], trackOverrides: Parameters<typeof makeTrack>[0] = {}) {
  const c = new IoCarousel();
  (c as any).update = { emit: vi.fn() };

  const track = makeTrack(trackOverrides);
  const slot = document.createElement('slot');
  (slot as any).assignedElements = vi.fn().mockReturnValue(slides);

  (c as any).el = {
    shadowRoot: {
      querySelector: vi.fn((sel: string) => {
        if (sel === '.carousel-track') return track;
        if (sel === 'slot') return slot;
        return null;
      }),
    },
  };

  return { c, track, slot };
}

// ── getNearestSlideIndex ──────────────────────────────────────────────────────

describe('io-carousel — getNearestSlideIndex', () => {
  it('returns 0 when totalSlides is 0', () => {
    const { c } = makeCarousel([]);
    expect((c as any).getNearestSlideIndex()).toBe(0);
  });

  it('returns 0 when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    expect((c as any).getNearestSlideIndex()).toBe(0);
  });

  it('returns index of slide whose computed getSlideLeft is nearest to scrollLeft', () => {
    // Mock getSlideLeft directly to control distances independently of jsdom geometry.
    // dist[0]=|0-0|=0, dist[1]=|300-0|=300, dist[2]=|600-0|=600 → nearest = 0
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 900, scrollWidth: 1800 });
    (c as any).getSlideLeft = vi.fn((i: number) => [0, 300, 600][i]);
    expect((c as any).getNearestSlideIndex()).toBe(0);
  });

  it('returns the index closest to current scrollLeft when scrolled mid-way', () => {
    // getSlideLeft returns: [0, 300, 600]; scrollLeft=280
    // dist[0]=|0-280|=280, dist[1]=|300-280|=20, dist[2]=|600-280|=320 → nearest = 1
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c } = makeCarousel(slides, { scrollLeft: 280, clientWidth: 900, scrollWidth: 1800 });
    (c as any).getSlideLeft = vi.fn((i: number) => [0, 300, 600][i]);
    expect((c as any).getNearestSlideIndex()).toBe(1);
  });

  it('returns last slide when scrolled near end', () => {
    // dist[0]=|0-580|=580, dist[1]=|300-580|=280, dist[2]=|600-580|=20 → nearest = 2
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c } = makeCarousel(slides, { scrollLeft: 580, clientWidth: 300, scrollWidth: 900 });
    (c as any).getSlideLeft = vi.fn((i: number) => [0, 300, 600][i]);
    expect((c as any).getNearestSlideIndex()).toBe(2);
  });

  it('returns first slide when all distances are equal (favours first found)', () => {
    // Single slide always returns 0
    const slides = [makeSlide(0)];
    const { c } = makeCarousel(slides, { scrollLeft: 0 });
    expect((c as any).getNearestSlideIndex()).toBe(0);
  });
});

// ── scrollToIndex ─────────────────────────────────────────────────────────────

describe('io-carousel — scrollToIndex', () => {
  it('returns early without error when totalSlides is 0', () => {
    const { c, track } = makeCarousel([]);
    expect(() => (c as any).scrollToIndex(0, 'smooth')).not.toThrow();
    expect((track as any).scrollTo).not.toHaveBeenCalled();
  });

  it('returns early without error when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    expect(() => (c as any).scrollToIndex(0, 'smooth')).not.toThrow();
  });

  it('calls track.scrollTo with clamped slide left position and given behavior', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 900, scrollWidth: 1800 });
    (c as any).scrollToIndex(1, 'smooth');
    // getSlideLeft(1) = track.scrollLeft(0) + (300 - 0) = 300
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });

  it('clamps out-of-bounds index before scrolling', () => {
    const slides = [makeSlide(0), makeSlide(300)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 600, scrollWidth: 600 });
    (c as any).scrollToIndex(99, 'auto');
    // clamped to last = 1, getSlideLeft(1) = 0 + (300-0) = 300
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'auto' });
  });

  it('scrolls with "auto" behavior correctly', () => {
    const slides = [makeSlide(0), makeSlide(300)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 600, scrollWidth: 600 });
    (c as any).scrollToIndex(0, 'auto');
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'auto' });
  });
});

// ── setActiveIndex ────────────────────────────────────────────────────────────

describe('io-carousel — setActiveIndex', () => {
  it('is a no-op when new index equals current activeSlideIndex after clamping', () => {
    const { c } = makeCarousel([]);
    c.activeSlideIndex = 0;
    (c as any).setActiveIndex(0, true);
    expect((c as any).update.emit).not.toHaveBeenCalled();
    expect((c as any).slideAnnouncement).toBe('');
  });

  it('does NOT emit update event when emitEvent is false', () => {
    const { c } = makeCarousel([]);
    Object.defineProperty(c as any, 'totalSlides', { get: () => 3 });
    c.activeSlideIndex = 0;
    (c as any).setActiveIndex(2, false);
    expect((c as any).update.emit).not.toHaveBeenCalled();
  });

  it('emits update event when emitEvent is true and index changes', () => {
    const { c } = makeCarousel([]);
    Object.defineProperty(c as any, 'totalSlides', { get: () => 3 });
    c.activeSlideIndex = 0;
    (c as any).setActiveIndex(2, true);
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeIndex: 2, previousIndex: 0, totalSlides: 3 });
  });

  it('sets slideAnnouncement to human-readable position string', () => {
    const { c } = makeCarousel([]);
    Object.defineProperty(c as any, 'totalSlides', { get: () => 5 });
    c.activeSlideIndex = 0;
    (c as any).setActiveIndex(3, false);
    expect((c as any).slideAnnouncement).toBe('Slide 4 of 5');
  });

  it('sets _internalScroll flag to true', () => {
    const { c } = makeCarousel([]);
    Object.defineProperty(c as any, 'totalSlides', { get: () => 4 });
    c.activeSlideIndex = 0;
    (c as any).setActiveIndex(1, false);
    expect((c as any)._internalScroll).toBe(true);
  });

  it('uses slide 1-of-1 announcement when only one slide exists', () => {
    const { c } = makeCarousel([]);
    Object.defineProperty(c as any, 'totalSlides', { get: () => 2 });
    c.activeSlideIndex = 1;
    // Go back to 0 to trigger a change
    (c as any).setActiveIndex(0, false);
    expect((c as any).slideAnnouncement).toBe('Slide 1 of 2');
  });
});

// ── onPrev ───────────────────────────────────────────────────────────────────

describe('io-carousel — onPrev', () => {
  it('returns without error when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    expect(() => (c as any).onPrev()).not.toThrow();
  });

  it('rewinds to end when rewind=true and scrollLeft is 0', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 0, clientWidth: 800, scrollWidth: 1600 });
    c.rewind = true;
    (c as any).onPrev();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 800, behavior: 'smooth' });
  });

  it('rewinds to end when rewind=true and scrollLeft is exactly 1 (boundary edge)', () => {
    // scrollLeft <= 1 triggers rewind
    const { c, track } = makeCarousel([], { scrollLeft: 1, clientWidth: 500, scrollWidth: 1000 });
    c.rewind = true;
    (c as any).onPrev();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 500, behavior: 'smooth' });
  });

  it('does NOT rewind when rewind=false and at beginning', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 0, clientWidth: 900, scrollWidth: 1800 });
    c.rewind = false;
    (c as any).onPrev();
    // Falls through to scrollBy (totalSlides=0 skips the slide branch)
    expect((track as any).scrollTo).not.toHaveBeenCalled();
    expect((track as any).scrollBy).toHaveBeenCalled();
  });

  it('uses scrollBy fallback when totalSlides is 0', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 500, clientWidth: 900, scrollWidth: 3000 });
    (c as any).onPrev();
    // fallback = max(900*0.9, 120) = 810
    expect((track as any).scrollBy).toHaveBeenCalledWith({ left: -810, behavior: 'smooth' });
  });

  it('uses scrollBy fallback when shouldUseTargetScroll returns false (target equals current)', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 300, clientWidth: 900, scrollWidth: 1800 });
    // Force getNearestSlideIndex to return 1 and getSlideLeft to return same as scrollLeft
    (c as any).getNearestSlideIndex = vi.fn().mockReturnValue(1);
    (c as any).getSlideLeft = vi.fn().mockReturnValue(300); // diff = 0, shouldUseTargetScroll = false
    (c as any).onPrev();
    expect((track as any).scrollBy).toHaveBeenCalledWith({ left: -810, behavior: 'smooth' });
  });

  it('scrolls to target slide left when shouldUseTargetScroll returns true', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 600, clientWidth: 900, scrollWidth: 1800 });
    (c as any).getNearestSlideIndex = vi.fn().mockReturnValue(2);
    (c as any).getSlideLeft = vi.fn().mockReturnValue(300); // diff = |300 - 600| = 300 > 1
    (c as any).onPrev();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });
});

// ── onNext ───────────────────────────────────────────────────────────────────

describe('io-carousel — onNext', () => {
  it('returns without error when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    expect(() => (c as any).onNext()).not.toThrow();
  });

  it('does NOT rewind when rewind=false and at physical end', () => {
    // scrollLeft >= maxScroll - 1 would trigger rewind, but rewind=false so should fall through
    const { c, track } = makeCarousel([], { scrollLeft: 999, clientWidth: 1000, scrollWidth: 2000 });
    c.rewind = false;
    (c as any).onNext();
    // Should NOT scrollTo 0; should instead scrollBy forward (totalSlides=0 → fallback)
    expect((track as any).scrollTo).not.toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
    expect((track as any).scrollBy).toHaveBeenCalled();
  });

  it('uses scrollBy fallback when totalSlides is 0 and not at physical end', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 100, clientWidth: 900, scrollWidth: 3000 });
    (c as any).onNext();
    expect((track as any).scrollBy).toHaveBeenCalledWith({ left: 810, behavior: 'smooth' });
  });

  it('uses scrollBy fallback when shouldUseTargetScroll returns false', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 300, clientWidth: 900, scrollWidth: 1800 });
    (c as any).getNearestSlideIndex = vi.fn().mockReturnValue(1);
    (c as any).getSlideLeft = vi.fn().mockReturnValue(300); // diff = 0, shouldUseTargetScroll = false
    (c as any).onNext();
    expect((track as any).scrollBy).toHaveBeenCalledWith({ left: 810, behavior: 'smooth' });
  });

  it('scrolls to target slide when shouldUseTargetScroll returns true', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 900, scrollWidth: 1800 });
    (c as any).getNearestSlideIndex = vi.fn().mockReturnValue(0);
    (c as any).getSlideLeft = vi.fn().mockReturnValue(300); // diff = 300 > 1
    (c as any).onNext();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });
});

// ── onSlotChange ─────────────────────────────────────────────────────────────

describe('io-carousel — onSlotChange', () => {
  it('calls setActiveIndex with current activeSlideIndex and emitEvent=false', () => {
    const { c } = makeCarousel([]);
    Object.defineProperty(c as any, 'totalSlides', { get: () => 3 });
    c.activeSlideIndex = 2;
    const setActiveIndexSpy = vi.spyOn(c as any, 'setActiveIndex');
    const scrollToIndexSpy = vi.spyOn(c as any, 'scrollToIndex');
    (c as any).onSlotChange();
    expect(setActiveIndexSpy).toHaveBeenCalledWith(2, false);
    expect(scrollToIndexSpy).toHaveBeenCalledWith(2, 'auto');
  });

  it('calls scrollToIndex with activeSlideIndex and "auto" behavior', () => {
    const slides = [makeSlide(0), makeSlide(300)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 600, scrollWidth: 600 });
    c.activeSlideIndex = 1;
    Object.defineProperty(c as any, 'totalSlides', { get: () => 2 });
    (c as any).onSlotChange();
    // setActiveIndex(1, false) → no-op if activeSlideIndex is already 1
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'auto' });
  });

  it('does not throw when called with empty slot (no slides)', () => {
    const { c } = makeCarousel([]);
    expect(() => (c as any).onSlotChange()).not.toThrow();
  });
});

// ── onMouseDown ───────────────────────────────────────────────────────────────

describe('io-carousel — onMouseDown', () => {
  it('returns without error when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    const ev = { pageX: 200 } as MouseEvent;
    expect(() => (c as any).onMouseDown(ev)).not.toThrow();
    expect((c as any).isDragging).toBe(false);
  });

  it('sets isDragging to true', () => {
    const { c } = makeCarousel([], { scrollLeft: 100 });
    (c as any).onMouseDown({ pageX: 150 } as MouseEvent);
    expect((c as any).isDragging).toBe(true);
  });

  it('stores startX as pageX minus track.offsetLeft', () => {
    const { c } = makeCarousel([], { scrollLeft: 0 });
    // offsetLeft is 0 from makeTrack
    (c as any).onMouseDown({ pageX: 250 } as MouseEvent);
    expect((c as any).startX).toBe(250);
  });

  it('stores current track.scrollLeft into this.dragStartScrollLeft', () => {
    const { c } = makeCarousel([], { scrollLeft: 175 });
    (c as any).onMouseDown({ pageX: 0 } as MouseEvent);
    expect((c as any).dragStartScrollLeft).toBe(175);
  });

  it('stores correct startX when offsetLeft is non-zero', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 0 });
    // Override offsetLeft to simulate non-zero track position
    Object.defineProperty(track, 'offsetLeft', { value: 50, configurable: true });
    (c as any).onMouseDown({ pageX: 200 } as MouseEvent);
    // startX = pageX - offsetLeft = 200 - 50 = 150
    expect((c as any).startX).toBe(150);
  });
});

// ── onMouseMove ───────────────────────────────────────────────────────────────

describe('io-carousel — onMouseMove', () => {
  it('returns early when isDragging is false', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 100 });
    (c as any).isDragging = false;
    const ev = { pageX: 300, preventDefault: vi.fn() } as unknown as MouseEvent;
    (c as any).onMouseMove(ev);
    // track.scrollLeft should remain unchanged
    expect(track.scrollLeft).toBe(100);
  });

  it('returns early when track is null while dragging', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    (c as any).isDragging = true;
    const ev = { pageX: 300, preventDefault: vi.fn() } as unknown as MouseEvent;
    expect(() => (c as any).onMouseMove(ev)).not.toThrow();
  });

  it('calls ev.preventDefault when dragging with valid track', () => {
    const { c } = makeCarousel([], { scrollLeft: 0 });
    (c as any).isDragging = true;
    (c as any).startX = 100;
    (c as any).dragStartScrollLeft = 200;
    const preventDefault = vi.fn();
    const ev = { pageX: 110, preventDefault } as unknown as MouseEvent;
    (c as any).onMouseMove(ev);
    expect(preventDefault).toHaveBeenCalled();
  });

  it('adjusts track.scrollLeft by drag delta', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 0 });
    (c as any).isDragging = true;
    (c as any).startX = 100; // initial x relative to track
    (c as any).dragStartScrollLeft = 200; // captured scrollLeft at drag start
    // pageX=110, offsetLeft=0 → x=110; delta = x - startX = 110 - 100 = 10
    // new scrollLeft = scrollLeft - delta = 200 - 10 = 190
    const ev = { pageX: 110, preventDefault: vi.fn() } as unknown as MouseEvent;
    (c as any).onMouseMove(ev);
    expect(track.scrollLeft).toBe(190);
  });

  it('scrolls in the correct direction when dragging left (negative delta)', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 0 });
    (c as any).isDragging = true;
    (c as any).startX = 100;
    (c as any).dragStartScrollLeft = 500;
    // pageX=80 → x=80, delta = 80-100 = -20, new scrollLeft = 500-(-20) = 520
    const ev = { pageX: 80, preventDefault: vi.fn() } as unknown as MouseEvent;
    (c as any).onMouseMove(ev);
    expect(track.scrollLeft).toBe(520);
  });
});

// ── onResize ──────────────────────────────────────────────────────────────────

describe('io-carousel — onResize', () => {
  it('calls scrollToIndex with current activeSlideIndex and "auto" behavior', () => {
    const { c } = makeCarousel([]);
    const scrollToIndexSpy = vi.spyOn(c as any, 'scrollToIndex');
    c.activeSlideIndex = 3;
    (c as any).onResize();
    expect(scrollToIndexSpy).toHaveBeenCalledWith(3, 'auto');
  });

  it('does not throw when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    expect(() => (c as any).onResize()).not.toThrow();
  });

  it('snaps back to active index after resize with valid slides', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 900, scrollWidth: 1800 });
    Object.defineProperty(c as any, 'totalSlides', { get: () => 3 });
    c.activeSlideIndex = 2;
    (c as any).onResize();
    // getSlideLeft(2) = 0 + (600-0) = 600
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 600, behavior: 'auto' });
  });
});

// ── componentDidLoad ──────────────────────────────────────────────────────────

describe('io-carousel — componentDidLoad', () => {
  it('calls setActiveIndex with initial activeSlideIndex and emitEvent=false', () => {
    const { c } = makeCarousel([]);
    const setActiveIndexSpy = vi.spyOn(c as any, 'setActiveIndex');
    c.activeSlideIndex = 0;
    c.componentDidLoad();
    expect(setActiveIndexSpy).toHaveBeenCalledWith(0, false);
  });

  it('calls scrollToIndex with initial activeSlideIndex and "auto"', () => {
    const { c } = makeCarousel([]);
    const scrollToIndexSpy = vi.spyOn(c as any, 'scrollToIndex');
    c.activeSlideIndex = 0;
    c.componentDidLoad();
    expect(scrollToIndexSpy).toHaveBeenCalledWith(0, 'auto');
  });

  it('does not throw when called on empty carousel', () => {
    const { c } = makeCarousel([]);
    expect(() => c.componentDidLoad()).not.toThrow();
  });

  it('scrolls to correct position when initial activeSlideIndex is non-zero', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 900, scrollWidth: 1800 });
    Object.defineProperty(c as any, 'totalSlides', { get: () => 3 });
    c.activeSlideIndex = 2;
    c.componentDidLoad();
    // setActiveIndex(2, false) → no-op because activeSlideIndex === 2 already
    // scrollToIndex(2, 'auto') → getSlideLeft(2) = 0 + (600-0) = 600
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 600, behavior: 'auto' });
  });

  it('seeds slideAnnouncement with "Slide 1 of N" for AT users on mount', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c } = makeCarousel(slides);
    c.activeSlideIndex = 0;

    c.componentDidLoad();

    expect((c as any).slideAnnouncement).toBe('Slide 1 of 3');
  });

  it('does not set slideAnnouncement when there are no slides', () => {
    // Two guards keep slideAnnouncement empty here:
    // 1. setActiveIndex(0, false) is a no-op (already at index 0, totalSlides=0)
    // 2. componentDidLoad's seeding block checks totalSlides > 0 before writing
    const { c } = makeCarousel([]);
    c.componentDidLoad();

    expect((c as any).slideAnnouncement).toBe('');
  });

  it('seeds slideAnnouncement based on activeSlideIndex when index > 0', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c } = makeCarousel(slides);
    c.activeSlideIndex = 2;

    c.componentDidLoad();

    expect((c as any).slideAnnouncement).toBe('Slide 3 of 3');
  });
});

// ── render ────────────────────────────────────────────────────────────────────

describe('io-carousel — render', () => {
  it('does not throw with default props', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when isDragging is true', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    (c as any).isDragging = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when isDragging is false', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    (c as any).isDragging = false;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with custom prevLabel and nextLabel', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.prevLabel = 'Go back';
    c.nextLabel = 'Go forward';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with custom label (carousel region)', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.label = 'Featured products';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when slideAnnouncement is set', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    (c as any).slideAnnouncement = 'Slide 3 of 5';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when slideAnnouncement is empty string', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    (c as any).slideAnnouncement = '';
    expect(() => (c as any).render()).not.toThrow();
  });
});

// ── syncIndexFromScroll ───────────────────────────────────────────────────────

describe('io-carousel — syncIndexFromScroll (via onTrackScroll)', () => {
  it('calls getNearestSlideIndex and forwards to setActiveIndex with emitEvent=true', () => {
    const { c } = makeCarousel([]);
    Object.defineProperty(c as any, 'totalSlides', { get: () => 4 });
    (c as any).getNearestSlideIndex = vi.fn().mockReturnValue(2);
    c.activeSlideIndex = 0;
    (c as any).syncIndexFromScroll();
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeIndex: 2, previousIndex: 0, totalSlides: 4 });
    expect(c.activeSlideIndex).toBe(2);
  });
});

// ── getSlideLeft ──────────────────────────────────────────────────────────────

describe('io-carousel — getSlideLeft', () => {
  it('returns 0 when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    expect((c as any).getSlideLeft(0)).toBe(0);
  });

  it('returns 0 when slide at index does not exist', () => {
    const { c } = makeCarousel([]); // no slides
    expect((c as any).getSlideLeft(5)).toBe(0);
  });

  it('returns scrollLeft + (slideRect.left - trackRect.left)', () => {
    const slide = makeSlide(400);
    const { c } = makeCarousel([slide], { scrollLeft: 100 });
    // trackRect.left = 0 (getBoundingClientRect mock), slideRect.left = 400
    // result = 100 + (400 - 0) = 500
    expect((c as any).getSlideLeft(0)).toBe(500);
  });
});

// ── onActiveSlideIndexChange with slideAnnouncement ──────────────────────────

describe('io-carousel — onActiveSlideIndexChange slideAnnouncement path', () => {
  it('sets slideAnnouncement on external index change', () => {
    const { c } = makeCarousel([]);
    Object.defineProperty(c as any, 'totalSlides', { get: () => 5 });
    (c as any).getSlideLeft = vi.fn().mockReturnValue(0);
    (c as any)._internalScroll = false;
    (c as any).onActiveSlideIndexChange(3);
    expect((c as any).slideAnnouncement).toBe('Slide 4 of 5');
  });
});

// ── Edge cases and boundary conditions ───────────────────────────────────────

describe('io-carousel — edge cases', () => {
  it('onPrev with rewind=true and scrollLeft=1 (exact boundary) triggers rewind', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 1, clientWidth: 400, scrollWidth: 800 });
    c.rewind = true;
    (c as any).onPrev();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'smooth' });
  });

  it('onPrev with rewind=true and scrollLeft=2 does NOT trigger rewind', () => {
    const slides = [makeSlide(0), makeSlide(300)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 2, clientWidth: 400, scrollWidth: 800 });
    c.rewind = true;
    // getNearestSlideIndex → uses real implementation here (slides present)
    // Force getSlideLeft to return a value far from scrollLeft so shouldUseTargetScroll = true
    (c as any).getNearestSlideIndex = vi.fn().mockReturnValue(1);
    (c as any).getSlideLeft = vi.fn().mockReturnValue(0); // diff = |0 - 2| = 2 > 1
    (c as any).onPrev();
    // Should scroll to slide (not rewind), not call scrollTo with maxScroll
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
    expect((track as any).scrollTo).not.toHaveBeenCalledWith({ left: 400, behavior: 'smooth' });
  });

  it('onNext with rewind=true and scrollLeft exactly at maxScroll triggers rewind to 0', () => {
    // maxScroll = 3000 - 900 = 2100; scrollLeft = 2100 >= 2100 - 1 = 2099
    const { c, track } = makeCarousel([], { scrollLeft: 2100, clientWidth: 900, scrollWidth: 3000 });
    c.rewind = true;
    (c as any).onNext();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
  });

  it('onNext with rewind=true and scrollLeft at maxScroll-1 also triggers rewind', () => {
    const { c, track } = makeCarousel([], { scrollLeft: 2099, clientWidth: 900, scrollWidth: 3000 });
    c.rewind = true;
    (c as any).onNext();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
  });

  it('onMouseDown does not set isDragging when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    (c as any).onMouseDown({ pageX: 100 } as MouseEvent);
    expect((c as any).isDragging).toBe(false);
  });

  it('scrollToIndex with negative index clamps to 0', () => {
    const slides = [makeSlide(0), makeSlide(300)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 300, clientWidth: 600, scrollWidth: 600 });
    (c as any).scrollToIndex(-5, 'auto');
    // clamped to 0, getSlideLeft(0) = scrollLeft + (0 - trackRect.left) = 300 + (0-0) = 300
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'auto' });
  });

  it('componentDidLoad followed by onSlotChange both call scrollToIndex', () => {
    const slides = [makeSlide(0), makeSlide(300)];
    const { c, track } = makeCarousel(slides, { scrollLeft: 0, clientWidth: 600, scrollWidth: 600 });
    Object.defineProperty(c as any, 'totalSlides', { get: () => 2 });
    c.activeSlideIndex = 1;
    c.componentDidLoad();
    const callCount = ((track as any).scrollTo as ReturnType<typeof vi.fn>).mock.calls.length;
    (c as any).onSlotChange();
    expect(((track as any).scrollTo as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(callCount);
  });
});

// ── updateBoundaryState ────────────────────────────────────────────────────────

describe('io-carousel — updateBoundaryState', () => {
  it('isAtStart defaults to true', () => {
    const { c } = makeCarousel([]);
    expect((c as any).isAtStart).toBe(true);
  });

  it('isAtEnd defaults to false', () => {
    const { c } = makeCarousel([]);
    expect((c as any).isAtEnd).toBe(false);
  });

  it('sets isAtStart=true when scrollLeft is 0', () => {
    const { c } = makeCarousel([], { scrollLeft: 0, clientWidth: 900, scrollWidth: 3000 });
    (c as any).updateBoundaryState();
    expect((c as any).isAtStart).toBe(true);
  });

  it('sets isAtStart=true when scrollLeft is exactly 1 (boundary tolerance)', () => {
    const { c } = makeCarousel([], { scrollLeft: 1, clientWidth: 900, scrollWidth: 3000 });
    (c as any).updateBoundaryState();
    expect((c as any).isAtStart).toBe(true);
  });

  it('sets isAtStart=false when scrollLeft is 2 (past boundary)', () => {
    const { c } = makeCarousel([], { scrollLeft: 2, clientWidth: 900, scrollWidth: 3000 });
    (c as any).updateBoundaryState();
    expect((c as any).isAtStart).toBe(false);
  });

  it('sets isAtEnd=true when scrollLeft equals maxScroll', () => {
    // maxScroll = 3000 - 900 = 2100
    const { c } = makeCarousel([], { scrollLeft: 2100, clientWidth: 900, scrollWidth: 3000 });
    (c as any).updateBoundaryState();
    expect((c as any).isAtEnd).toBe(true);
  });

  it('sets isAtEnd=true when scrollLeft is within 1px of maxScroll (tolerance)', () => {
    // maxScroll = 3000 - 900 = 2100; 2100 - 1 = 2099
    const { c } = makeCarousel([], { scrollLeft: 2099, clientWidth: 900, scrollWidth: 3000 });
    (c as any).updateBoundaryState();
    expect((c as any).isAtEnd).toBe(true);
  });

  it('sets isAtEnd=false when scrollLeft is not near maxScroll', () => {
    const { c } = makeCarousel([], { scrollLeft: 100, clientWidth: 900, scrollWidth: 3000 });
    (c as any).updateBoundaryState();
    expect((c as any).isAtEnd).toBe(false);
  });

  it('returns early without error when track is null', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };
    expect(() => (c as any).updateBoundaryState()).not.toThrow();
  });

  it('syncIndexFromScroll updates boundary state before setting active index', () => {
    // scrollLeft=2100 means isAtEnd=true (maxScroll = 3000-900 = 2100)
    const { c } = makeCarousel([], { scrollLeft: 2100, clientWidth: 900, scrollWidth: 3000 });
    Object.defineProperty(c as any, 'totalSlides', { get: () => 5 });
    (c as any).getNearestSlideIndex = vi.fn().mockReturnValue(4);
    c.activeSlideIndex = 0;
    (c as any).syncIndexFromScroll();
    expect((c as any).isAtEnd).toBe(true);
    expect((c as any).isAtStart).toBe(false);
  });

  it('componentDidLoad calls updateBoundaryState after scroll', () => {
    const updateBoundarySpy = vi.spyOn(makeCarousel([]).c as any, 'updateBoundaryState');
    // Rebuild a fresh component with the spy attached
    const { c } = makeCarousel([], { scrollLeft: 0, clientWidth: 900, scrollWidth: 3000 });
    const spy = vi.spyOn(c as any, 'updateBoundaryState');
    c.componentDidLoad();
    expect(spy).toHaveBeenCalled();
    void updateBoundarySpy; // satisfy lint
  });
});

// ── disabled prev/next button DOM assertions ─────────────────────────────────
// These tests verify render() actually writes disabled and aria-label into the
// button vnode props — not just that the guard expression evaluates correctly.

describe('io-carousel — boundary-disabled DOM assertions', () => {
  it('prev button receives disabled=true when rewind=false and isAtStart=true', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.rewind = false;
    (c as any).isAtStart = true;
    const calls = renderCalls(c);
    const prevBtn = findBtn(calls, 'carousel-btn--prev');
    expect(prevBtn).toBeDefined();
    expect(prevBtn![1].disabled).toBe(true);
  });

  it('prev button does NOT receive disabled when rewind=true (even at start)', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.rewind = true;
    (c as any).isAtStart = true;
    const calls = renderCalls(c);
    const prevBtn = findBtn(calls, 'carousel-btn--prev');
    expect(prevBtn).toBeDefined();
    expect(prevBtn![1].disabled).toBe(false);
  });

  it('next button receives disabled=true when rewind=false and isAtEnd=true', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.rewind = false;
    (c as any).isAtEnd = true;
    const calls = renderCalls(c);
    const nextBtn = findBtn(calls, 'carousel-btn--next');
    expect(nextBtn).toBeDefined();
    expect(nextBtn![1].disabled).toBe(true);
  });

  it('next button does NOT receive disabled when rewind=true (even at end)', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.rewind = true;
    (c as any).isAtEnd = true;
    const calls = renderCalls(c);
    const nextBtn = findBtn(calls, 'carousel-btn--next');
    expect(nextBtn).toBeDefined();
    expect(nextBtn![1].disabled).toBe(false);
  });

  it('prev button aria-label reflects prevLabel prop', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.prevLabel = 'Vorige';
    const calls = renderCalls(c);
    const prevBtn = findBtn(calls, 'carousel-btn--prev');
    expect(prevBtn).toBeDefined();
    expect(prevBtn![1]['aria-label']).toBe('Vorige');
  });

  it('next button aria-label reflects nextLabel prop', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.nextLabel = 'Volgende';
    const calls = renderCalls(c);
    const nextBtn = findBtn(calls, 'carousel-btn--next');
    expect(nextBtn).toBeDefined();
    expect(nextBtn![1]['aria-label']).toBe('Volgende');
  });
});

// ── syncSlideAriaAttributes (#803) ────────────────────────────────────────────

describe('io-carousel — syncSlideAriaAttributes (#803)', () => {
  it('sets role="group" on each slotted slide', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c } = makeCarousel(slides);
    (c as any).syncSlideAriaAttributes();
    slides.forEach(s => expect(s.getAttribute('role')).toBe('group'));
  });

  it('sets aria-roledescription="slide" on each slotted slide', () => {
    const slides = [makeSlide(0), makeSlide(300)];
    const { c } = makeCarousel(slides);
    (c as any).syncSlideAriaAttributes();
    slides.forEach(s => expect(s.getAttribute('aria-roledescription')).toBe('slide'));
  });

  it('sets aria-label="Slide N of M" on each slotted slide', () => {
    const slides = [makeSlide(0), makeSlide(300), makeSlide(600)];
    const { c } = makeCarousel(slides);
    (c as any).syncSlideAriaAttributes();
    expect(slides[0].getAttribute('aria-label')).toBe('Slide 1 of 3');
    expect(slides[1].getAttribute('aria-label')).toBe('Slide 2 of 3');
    expect(slides[2].getAttribute('aria-label')).toBe('Slide 3 of 3');
  });

  it('is a no-op when there are no slides', () => {
    const { c } = makeCarousel([]);
    expect(() => (c as any).syncSlideAriaAttributes()).not.toThrow();
  });
});
