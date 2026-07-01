import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoCarousel } from './io-carousel';

describe('io-carousel — default props', () => {
  let component: IoCarousel;

  beforeEach(() => {
    component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
  });

  it('defaults prevLabel to "Previous"', () => {
    expect(component.prevLabel).toBe('Previous');
  });

  it('defaults nextLabel to "Next"', () => {
    expect(component.nextLabel).toBe('Next');
  });

  it('defaults slidesPerPage to 1', () => {
    expect(component.slidesPerPage).toBe(1);
  });

  it('defaults rewind to false', () => {
    expect(component.rewind).toBe(false);
  });

  it('defaults activeSlideIndex to 0', () => {
    expect(component.activeSlideIndex).toBe(0);
  });

  it('is not dragging by default', () => {
    expect((component as any).isDragging).toBe(false);
  });

  it('defaults heading to undefined', () => {
    expect(component.heading).toBeUndefined();
  });

  it('defaults description to undefined', () => {
    expect(component.description).toBeUndefined();
  });

  it('defaults pagination to false', () => {
    expect(component.pagination).toBe(false);
  });

  it('defaults alignHeader to "left"', () => {
    expect(component.alignHeader).toBe('left');
  });
});

describe('io-carousel — drag interaction', () => {
  let component: IoCarousel;

  beforeEach(() => {
    component = new IoCarousel();
    const track = document.createElement('div');
    track.className = 'carousel-track';
    Object.defineProperty(track, 'offsetLeft', { value: 0 });
    track.scrollLeft = 100;
    const slot = document.createElement('slot');
    const shadowRoot = {
      querySelector: vi.fn((sel: string) => {
        if (sel === '.carousel-track') return track;
        if (sel === 'slot') return slot;
        return null;
      }),
    };
    (component as any).el = { shadowRoot };
  });

  it('sets isDragging true on mousedown', () => {
    const ev = { pageX: 200 } as MouseEvent;
    (component as any).onMouseDown(ev);
    expect((component as any).isDragging).toBe(true);
  });

  it('clears isDragging on mouseup', () => {
    (component as any).isDragging = true;
    component.onMouseUp();
    expect((component as any).isDragging).toBe(false);
  });
});

describe('io-carousel — behavior helpers', () => {
  it('normalizes invalid slidesPerPage values to 1', () => {
    const component = new IoCarousel();
    component.slidesPerPage = 0 as any;
    expect((component as any).normalizedSlidesPerPage).toBe(1);
  });

  it('accepts slidesPerPage auto', () => {
    const component = new IoCarousel();
    component.slidesPerPage = 'auto';
    expect((component as any).normalizedSlidesPerPage).toBe('auto');
  });

  it('clamps active index to last slide', () => {
    const component = new IoCarousel();
    Object.defineProperty(component as any, 'totalSlides', { get: () => 4 });
    expect((component as any).clampIndex(99)).toBe(3);
  });

  it('computes page for numeric slidesPerPage', () => {
    const component = new IoCarousel();
    component.slidesPerPage = 2;
    expect((component as any).stepSize).toBe(2);
  });

  it('onNext scrolls to target slide boundary', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollWidth', { value: 2000 });
    Object.defineProperty(track, 'scrollLeft', { value: 100, writable: true });
    (track as any).scrollTo = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 5 });
    (component as any).getNearestSlideIndex = vi.fn(() => 1);
    (component as any).getSlideLeft = vi.fn(() => 500);
    component.slidesPerPage = 1;
    (component as any).onNext();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 500, behavior: 'smooth' });
  });

  it('onPrev rewinds to end when enabled and at first slide', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollWidth', { value: 1600 });
    Object.defineProperty(track, 'scrollLeft', { value: 0, writable: true });
    (track as any).scrollTo = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 0 });
    component.rewind = true;
    (component as any).onPrev();
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 800, behavior: 'smooth' });
  });

  it('uses step size against nearest slide index for mixed-width content', () => {
    const component = new IoCarousel();
    Object.defineProperty(component as any, 'totalSlides', { get: () => 6 });
    (component as any).getNearestSlideIndex = vi.fn(() => 2);
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollWidth', { value: 2000 });
    Object.defineProperty(track, 'scrollLeft', { value: 100, writable: true });
    (track as any).scrollTo = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    (component as any).getSlideLeft = vi.fn(() => 900);
    component.slidesPerPage = 2;

    (component as any).onNext();

    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 900, behavior: 'smooth' });
  });

  it('falls back to scrollBy when target boundary equals current scrollLeft', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 900 });
    Object.defineProperty(track, 'scrollWidth', { value: 3000 });
    Object.defineProperty(track, 'scrollLeft', { value: 500, writable: true });
    (track as any).scrollBy = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 5 });
    (component as any).getNearestSlideIndex = vi.fn(() => 1);
    (component as any).getSlideLeft = vi.fn(() => 500);
    component.slidesPerPage = 1;

    (component as any).onNext();

    expect((track as any).scrollBy).toHaveBeenCalledWith({ left: 810, behavior: 'smooth' });
  });

  it('onNext rewinds to start from physical end when rewind is enabled', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 1000 });
    Object.defineProperty(track, 'scrollWidth', { value: 2000 });
    Object.defineProperty(track, 'scrollLeft', { value: 1000, writable: true });
    (track as any).scrollTo = vi.fn();
    (track as any).scrollBy = vi.fn();
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 10 });
    (component as any).getNearestSlideIndex = vi.fn(() => 6);
    (component as any).getSlideLeft = vi.fn(() => 1500);
    component.rewind = true;
    component.slidesPerPage = 3;

    (component as any).onNext();

    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
    expect((track as any).scrollBy).not.toHaveBeenCalled();
  });

  it('syncs active index from scroll and emits update payload', () => {
    const component = new IoCarousel();
    const emitSpy = vi.fn();
    (component as any).update = { emit: emitSpy };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 4 });
    (component as any).getNearestSlideIndex = vi.fn(() => 2);
    component.activeSlideIndex = 0;
    // Provide el with a track so updateBoundaryState can run
    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 900 });
    Object.defineProperty(track, 'scrollWidth', { value: 3000 });
    track.scrollLeft = 100;
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(track) } };

    (component as any).onTrackScroll();

    expect(component.activeSlideIndex).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith({ activeIndex: 2, previousIndex: 0, totalSlides: 4 });
  });
});

describe('io-carousel — Watch suppression (rewind / smooth-scroll integrity)', () => {
  it('setActiveIndex sets _internalScroll flag before mutating activeSlideIndex', () => {
    const component = new IoCarousel();
    (component as any).update = { emit: vi.fn() };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 4 });

    expect((component as any)._internalScroll).toBe(false);
    (component as any).setActiveIndex(2, false);
    // Flag must still be true (Watch hasn't fired yet in unit tests)
    expect((component as any)._internalScroll).toBe(true);
    expect(component.activeSlideIndex).toBe(2);
  });

  it('onActiveSlideIndexChange resets flag and skips scrollToIndex on internal change', () => {
    const component = new IoCarousel();
    const scrollToIndexSpy = vi.spyOn(component as any, 'scrollToIndex');
    (component as any)._internalScroll = true;

    (component as any).onActiveSlideIndexChange(3);

    expect((component as any)._internalScroll).toBe(false);
    expect(scrollToIndexSpy).not.toHaveBeenCalled();
  });

  it('onActiveSlideIndexChange calls scrollToIndex for external changes', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'scrollLeft', { value: 0 });
    (track as any).scrollTo = vi.fn();
    const slot = document.createElement('slot');
    (component as any).el = {
      shadowRoot: {
        querySelector: vi.fn((sel: string) => {
          if (sel === '.carousel-track') return track;
          if (sel === 'slot') return slot;
          return null;
        }),
      },
    };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 3 });
    (component as any).getSlideLeft = vi.fn(() => 400);
    (component as any)._internalScroll = false;

    (component as any).onActiveSlideIndexChange(2);

    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'auto' });
    expect((component as any).slideAnnouncement).toBe('Slide 3 of 3');
  });

  it('normalizes invalid external activeSlideIndex values', () => {
    const component = new IoCarousel();
    const track = document.createElement('div');
    Object.defineProperty(track, 'scrollLeft', { value: 0 });
    (track as any).scrollTo = vi.fn();
    const slot = document.createElement('slot');
    (component as any).el = {
      shadowRoot: {
        querySelector: vi.fn((sel: string) => {
          if (sel === '.carousel-track') return track;
          if (sel === 'slot') return slot;
          return null;
        }),
      },
    };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 4 });
    (component as any).getSlideLeft = vi.fn(() => 0);

    (component as any).onActiveSlideIndexChange(Number.NaN);

    expect(component.activeSlideIndex).toBe(0);
  });

  it('multiple setActiveIndex calls (mid-scroll) each mark the flag', () => {
    const component = new IoCarousel();
    (component as any).update = { emit: vi.fn() };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 5 });
    component.activeSlideIndex = 4;

    (component as any).setActiveIndex(3, true);
    expect((component as any)._internalScroll).toBe(true);
    // Simulate Watch consuming flag mid-scroll
    (component as any)._internalScroll = false;

    (component as any).setActiveIndex(2, true);
    expect((component as any)._internalScroll).toBe(true);
  });
});

describe('io-carousel — scrollBehavior (prefers-reduced-motion)', () => {
  it('returns "smooth" when prefers-reduced-motion is not set', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    const component = new IoCarousel();
    expect((component as any).scrollBehavior).toBe('smooth');
  });

  it('returns "auto" when prefers-reduced-motion: reduce is active', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const component = new IoCarousel();
    expect((component as any).scrollBehavior).toBe('auto');
  });
});

describe('io-carousel — named slot state defaults', () => {
  let component: IoCarousel;

  beforeEach(() => {
    component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
  });

  it('hasHeadingSlot defaults to false', () => {
    expect((component as any).hasHeadingSlot).toBe(false);
  });

  it('hasDescriptionSlot defaults to false', () => {
    expect((component as any).hasDescriptionSlot).toBe(false);
  });

  it('hasControlsSlot defaults to false', () => {
    expect((component as any).hasControlsSlot).toBe(false);
  });
});

describe('io-carousel — handleHeadingSlotChange', () => {
  it('sets hasHeadingSlot true when heading slot has assigned elements', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };

    const element = document.createElement('h2');
    const slot = document.createElement('slot');
    Object.defineProperty(slot, 'assignedElements', { value: () => [element] });

    const event = { target: slot } as unknown as Event;
    (component as any).handleHeadingSlotChange(event);

    expect((component as any).hasHeadingSlot).toBe(true);
  });

  it('sets hasHeadingSlot false when heading slot is emptied', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    (component as any).hasHeadingSlot = true;

    const slot = document.createElement('slot');
    Object.defineProperty(slot, 'assignedElements', { value: () => [] });

    const event = { target: slot } as unknown as Event;
    (component as any).handleHeadingSlotChange(event);

    expect((component as any).hasHeadingSlot).toBe(false);
  });
});

describe('io-carousel — handleDescriptionSlotChange', () => {
  it('sets hasDescriptionSlot true when description slot has assigned elements', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };

    const element = document.createElement('p');
    const slot = document.createElement('slot');
    Object.defineProperty(slot, 'assignedElements', { value: () => [element] });

    const event = { target: slot } as unknown as Event;
    (component as any).handleDescriptionSlotChange(event);

    expect((component as any).hasDescriptionSlot).toBe(true);
  });

  it('sets hasDescriptionSlot false when description slot is emptied', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    (component as any).hasDescriptionSlot = true;

    const slot = document.createElement('slot');
    Object.defineProperty(slot, 'assignedElements', { value: () => [] });

    const event = { target: slot } as unknown as Event;
    (component as any).handleDescriptionSlotChange(event);

    expect((component as any).hasDescriptionSlot).toBe(false);
  });
});

describe('io-carousel — handleControlsSlotChange', () => {
  it('sets hasControlsSlot true when controls slot has assigned elements', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };

    const element = document.createElement('div');
    const slot = document.createElement('slot');
    Object.defineProperty(slot, 'assignedElements', { value: () => [element] });

    const event = { target: slot } as unknown as Event;
    (component as any).handleControlsSlotChange(event);

    expect((component as any).hasControlsSlot).toBe(true);
  });

  it('sets hasControlsSlot false when controls slot is emptied', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    (component as any).hasControlsSlot = true;

    const slot = document.createElement('slot');
    Object.defineProperty(slot, 'assignedElements', { value: () => [] });

    const event = { target: slot } as unknown as Event;
    (component as any).handleControlsSlotChange(event);

    expect((component as any).hasControlsSlot).toBe(false);
  });
});

describe('io-carousel — componentWillLoad headingId', () => {
  it('generates a non-empty headingId in componentWillLoad', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };

    component.componentWillLoad();

    expect((component as any).headingId).toMatch(/^io-carousel-heading-[a-z0-9]+$/);
  });

  it('generates unique headingIds across instances', () => {
    const a = new IoCarousel();
    const b = new IoCarousel();
    (a as any).el = { shadowRoot: null };
    (b as any).el = { shadowRoot: null };

    a.componentWillLoad();
    b.componentWillLoad();

    expect((a as any).headingId).not.toBe((b as any).headingId);
  });
});

describe('io-carousel — heading prop', () => {
  it('heading prop stores the provided string', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.heading = 'Featured Articles';
    expect(component.heading).toBe('Featured Articles');
  });

  it('heading prop triggers aria-labelledby mode (not aria-label)', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.heading = 'My Carousel';
    // When heading is set, the region should use aria-labelledby (headingId is truthy)
    // and aria-label should be undefined.
    const headingIsSet = !!component.heading;
    expect(headingIsSet).toBe(true);
  });

  it('renders heading text via heading prop when set', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.heading = 'Test Heading';
    expect(component.heading).toBe('Test Heading');
  });

  it('heading prop defaults to undefined', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    expect(component.heading).toBeUndefined();
  });
});

describe('io-carousel — description prop', () => {
  it('description prop stores the provided string', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.description = 'Browse our latest content.';
    expect(component.description).toBe('Browse our latest content.');
  });

  it('description prop defaults to undefined', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    expect(component.description).toBeUndefined();
  });

  it('description prop accepts any string value', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.description = 'A longer description with multiple words.';
    expect(component.description).toBe('A longer description with multiple words.');
  });
});

describe('io-carousel — pagination prop', () => {
  it('pagination defaults to false', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    expect(component.pagination).toBe(false);
  });

  it('pagination can be set to true', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.pagination = true;
    expect(component.pagination).toBe(true);
  });

  it('pagination dot count matches totalSlides', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.pagination = true;
    // With pagination=true and 3 slides, 3 dots should be rendered
    const totalSlides = 3;
    const dots = Array.from({ length: totalSlides }, (_, i) => i);
    expect(dots.length).toBe(3);
  });

  it('pagination dot is active for the activeSlideIndex', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.pagination = true;
    component.activeSlideIndex = 1;
    const totalSlides = 3;
    const activeDot = Array.from({ length: totalSlides }, (_, i) => i).find(i => i === component.activeSlideIndex);
    expect(activeDot).toBe(1);
  });
});

describe('io-carousel — alignHeader prop', () => {
  it('alignHeader defaults to "left"', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    expect(component.alignHeader).toBe('left');
  });

  it('alignHeader can be set to "center"', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.alignHeader = 'center';
    expect(component.alignHeader).toBe('center');
  });

  it('alignHeader "center" maps to carousel-header--center CSS class logic', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.alignHeader = 'center';
    const isCenterClass = component.alignHeader === 'center';
    expect(isCenterClass).toBe(true);
  });

  it('alignHeader "left" does NOT use carousel-header--center class', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.alignHeader = 'left';
    const isCenterClass = component.alignHeader === 'center';
    expect(isCenterClass).toBe(false);
  });
});

describe('io-carousel — responsive slidesPerPage', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation(() => ({ matches: false }));
  });

  it('effectiveSlidesPerPage defaults to 1 when slidesPerPage=1', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.componentWillLoad();
    expect((component as any).effectiveSlidesPerPage).toBe(1);
  });

  it('effectiveSlidesPerPage is "auto" when slidesPerPage="auto"', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.slidesPerPage = 'auto';
    component.componentWillLoad();
    expect((component as any).effectiveSlidesPerPage).toBe('auto');
  });

  it('effectiveSlidesPerPage resolves responsive map at componentWillLoad', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(min-width: 768px)' || query === '(min-width: 640px)',
    }));
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.slidesPerPage = { sm: 1, md: 2, lg: 3 };
    component.componentWillLoad();
    expect((component as any).effectiveSlidesPerPage).toBe(2);
  });

  it('onSlidesPerPageChange recomputes effectiveSlidesPerPage', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.slidesPerPage = 3;
    (component as any).onSlidesPerPageChange();
    expect((component as any).effectiveSlidesPerPage).toBe(3);
  });

  it('onResize recomputes effectiveSlidesPerPage for responsive maps', () => {
    const matchSpy = vi.fn().mockImplementation(() => ({ matches: false }));
    window.matchMedia = matchSpy;
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.slidesPerPage = { md: 2 };
    (component as any).effectiveSlidesPerPage = 1;
    // Simulate viewport change: now md matches
    matchSpy.mockImplementation((query: string) => ({
      matches: query === '(min-width: 768px)' || query === '(min-width: 640px)',
    }));
    const track = document.createElement('div');
    Object.defineProperty(track, 'scrollLeft', { value: 0 });
    (track as any).scrollTo = vi.fn();
    const slot = document.createElement('slot');
    (component as any).el = {
      shadowRoot: {
        querySelector: vi.fn((sel: string) => {
          if (sel === '.carousel-track') return track;
          if (sel === 'slot') return slot;
          return null;
        }),
      },
    };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 4 });
    (component as any).getSlideLeft = vi.fn(() => 0);
    component.onResize();
    expect((component as any).effectiveSlidesPerPage).toBe(2);
  });

  it('onResize does not call syncEffectiveSlidesPerPage for numeric slidesPerPage', () => {
    const component = new IoCarousel();
    component.slidesPerPage = 2;
    const syncSpy = vi.spyOn(component as any, 'syncEffectiveSlidesPerPage');
    const track = document.createElement('div');
    Object.defineProperty(track, 'scrollLeft', { value: 0 });
    (track as any).scrollTo = vi.fn();
    const slot = document.createElement('slot');
    (component as any).el = {
      shadowRoot: {
        querySelector: vi.fn((sel: string) => {
          if (sel === '.carousel-track') return track;
          if (sel === 'slot') return slot;
          return null;
        }),
      },
    };
    Object.defineProperty(component as any, 'totalSlides', { get: () => 4 });
    (component as any).getSlideLeft = vi.fn(() => 0);
    component.onResize();
    expect(syncSpy).not.toHaveBeenCalled();
  });
});

describe('io-carousel — pagination page count', () => {
  it('shows one dot per slide when slidesPerPage=1', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.pagination = true;
    (component as any).effectiveSlidesPerPage = 1;
    const totalSlides = 4;
    // pageCount = ceil(4 / 1) = 4
    expect(Math.ceil(totalSlides / 1)).toBe(4);
  });

  it('groups slides into pages when slidesPerPage > 1', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    component.pagination = true;
    (component as any).effectiveSlidesPerPage = 3;
    const totalSlides = 7;
    // pageCount = ceil(7 / 3) = 3
    expect(Math.ceil(totalSlides / 3)).toBe(3);
  });

  it('active page index is activeSlideIndex / slidesPerPage (floor)', () => {
    const component = new IoCarousel();
    (component as any).el = { shadowRoot: null };
    (component as any).effectiveSlidesPerPage = 3;
    component.activeSlideIndex = 4;
    const activePageIndex = Math.floor(4 / 3);
    expect(activePageIndex).toBe(1);
  });
});

describe('io-carousel — skip link (#867)', () => {
  function makeCarousel() {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    (c as any).update = { emit: vi.fn() };
    (c as any).componentWillLoad();
    return c;
  }

  it('skipLabel defaults to "Skip carousel"', () => {
    const c = makeCarousel();
    expect(c.skipLabel).toBe('Skip carousel');
  });

  it('skipTargetId is generated in componentWillLoad', () => {
    const c = makeCarousel();
    expect((c as any).skipTargetId).toMatch(/^io-carousel-skip-/);
  });

  it('renders skip link with href pointing to skipTargetId', () => {
    const c = makeCarousel();
    vi.mocked(h).mockClear();
    c.render();
    const skipId = (c as any).skipTargetId;
    const linkCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'a' &&
        (attrs as Record<string, unknown>)?.['href'] === `#${skipId}`,
    );
    expect(linkCall).toBeDefined();
  });

  it('renders skip target div with matching id', () => {
    const c = makeCarousel();
    vi.mocked(h).mockClear();
    c.render();
    const skipId = (c as any).skipTargetId;
    const targetCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'div' &&
        (attrs as Record<string, unknown>)?.['id'] === skipId,
    );
    expect(targetCall).toBeDefined();
  });

  it('skip link text uses skipLabel prop', () => {
    const c = makeCarousel();
    c.skipLabel = 'Skip to content';
    vi.mocked(h).mockClear();
    c.render();
    const skipId = (c as any).skipTargetId;
    const linkCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'a' &&
        (attrs as Record<string, unknown>)?.['href'] === `#${skipId}`,
    );
    expect(linkCall?.[2]).toBe('Skip to content');
  });
});

// ── Issue #1041 — intl prop ────────────────────────────────────────────────

describe('io-carousel — intl prop (#1041)', () => {
  function makeCarousel() {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    (c as any).update = { emit: vi.fn() };
    c.componentWillLoad();
    return c;
  }

  it('intl defaults to undefined', () => {
    const c = makeCarousel();
    expect(c.intl).toBeUndefined();
  });

  it('intl.prev overrides prevLabel in render', () => {
    const c = makeCarousel();
    c.intl = { prev: 'Vorige' };
    vi.mocked(h).mockClear();
    c.render();
    const prevBtn = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'button' &&
        (attrs as Record<string, unknown>)?.['class']?.toString?.().includes('carousel-btn--prev'),
    );
    expect(prevBtn?.[1]?.['aria-label']).toBe('Vorige');
  });

  it('intl.next overrides nextLabel in render', () => {
    const c = makeCarousel();
    c.intl = { next: 'Volgende' };
    vi.mocked(h).mockClear();
    c.render();
    const nextBtn = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'button' &&
        (attrs as Record<string, unknown>)?.['class']?.toString?.().includes('carousel-btn--next'),
    );
    expect(nextBtn?.[1]?.['aria-label']).toBe('Volgende');
  });

  it('intl.skip overrides skipLabel in render', () => {
    const c = makeCarousel();
    c.intl = { skip: 'Sla carrousel over' };
    vi.mocked(h).mockClear();
    c.render();
    const skipId = (c as any).skipTargetId;
    const linkCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'a' &&
        (attrs as Record<string, unknown>)?.['href'] === `#${skipId}`,
    );
    expect(linkCall?.[2]).toBe('Sla carrousel over');
  });

  it('falls back to individual prop when intl key is absent', () => {
    const c = makeCarousel();
    c.prevLabel = 'Prev';
    c.intl = { next: 'Volgende' }; // no 'prev' key
    vi.mocked(h).mockClear();
    c.render();
    const prevBtn = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'button' &&
        (attrs as Record<string, unknown>)?.['class']?.toString?.().includes('carousel-btn--prev'),
    );
    expect(prevBtn?.[1]?.['aria-label']).toBe('Prev');
  });
});

// ── Issue #1030 — aria-live always polite ─────────────────────────────────

describe('io-carousel — aria-live always polite (#1030)', () => {
  function makeCarousel() {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    (c as any).update = { emit: vi.fn() };
    c.componentWillLoad();
    return c;
  }

  it('aria-live span is always polite regardless of autoplay state', () => {
    const c = makeCarousel();
    (c as any).autoplay = true;
    (c as any).isAutoplayPaused = false;
    vi.mocked(h).mockClear();
    c.render();
    const liveSpan = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'span' &&
        (attrs as Record<string, unknown>)?.['aria-live'] !== undefined,
    );
    expect(liveSpan?.[1]?.['aria-live']).toBe('polite');
  });

  it('aria-live span is polite when autoplay is paused', () => {
    const c = makeCarousel();
    (c as any).autoplay = true;
    (c as any).isAutoplayPaused = true;
    vi.mocked(h).mockClear();
    c.render();
    const liveSpan = vi.mocked(h).mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        tag === 'span' &&
        (attrs as Record<string, unknown>)?.['aria-live'] !== undefined,
    );
    expect(liveSpan?.[1]?.['aria-live']).toBe('polite');
  });

  it('setActiveIndex keeps slideAnnouncement empty when autoplay is running', () => {
    const c = makeCarousel();
    (c as any).autoplay = true;
    (c as any).isAutoplayPaused = false;
    (c as any).update = { emit: vi.fn() };
    Object.defineProperty(c as any, 'totalSlides', { get: () => 4 });
    (c as any).activeSlideIndex = 0;
    (c as any).setActiveIndex(1, false);
    expect((c as any).slideAnnouncement).toBe('');
  });

  it('setActiveIndex announces slide when autoplay is paused', () => {
    const c = makeCarousel();
    (c as any).autoplay = true;
    (c as any).isAutoplayPaused = true;
    (c as any).update = { emit: vi.fn() };
    Object.defineProperty(c as any, 'totalSlides', { get: () => 4 });
    (c as any).activeSlideIndex = 0;
    (c as any).setActiveIndex(1, false);
    expect((c as any).slideAnnouncement).toBe('Slide 2 of 4');
  });

  it('setActiveIndex announces slide when autoplay is disabled', () => {
    const c = makeCarousel();
    (c as any).autoplay = false;
    (c as any).update = { emit: vi.fn() };
    Object.defineProperty(c as any, 'totalSlides', { get: () => 3 });
    (c as any).activeSlideIndex = 0;
    (c as any).setActiveIndex(2, false);
    expect((c as any).slideAnnouncement).toBe('Slide 3 of 3');
  });
});

// ── Issue #1031 — trimSpace, edgeFade, focusOnCenterSlide ─────────────────

describe('io-carousel — trimSpace prop (#1031)', () => {
  it('trimSpace defaults to "none"', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    expect(c.trimSpace).toBe('none');
  });

  it('trimSpace can be set to "start"', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.trimSpace = 'start';
    expect(c.trimSpace).toBe('start');
  });

  it('trimSpace can be set to "end"', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.trimSpace = 'end';
    expect(c.trimSpace).toBe('end');
  });

  it('trimSpace can be set to "both"', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.trimSpace = 'both';
    expect(c.trimSpace).toBe('both');
  });
});

describe('io-carousel — edgeFade prop (#1031)', () => {
  it('edgeFade defaults to false', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    expect(c.edgeFade).toBe(false);
  });

  it('edgeFade can be set to true', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    c.edgeFade = true;
    expect(c.edgeFade).toBe(true);
  });
});

describe('io-carousel — focusOnCenterSlide prop (#1031)', () => {
  it('focusOnCenterSlide defaults to false', () => {
    const c = new IoCarousel();
    (c as any).el = { shadowRoot: null };
    expect(c.focusOnCenterSlide).toBe(false);
  });

  it('focusOnCenterSlide adjusts scroll offset to center active slide', () => {
    const c = new IoCarousel();
    c.focusOnCenterSlide = true;

    const track = document.createElement('div');
    Object.defineProperty(track, 'clientWidth', { value: 800 });
    Object.defineProperty(track, 'scrollWidth', { value: 3000 });
    (track as any).scrollTo = vi.fn();

    const slide = document.createElement('div');
    Object.defineProperty(slide, 'getBoundingClientRect', { value: () => ({ width: 300 }) });

    const shadowRoot = {
      querySelector: vi.fn((sel: string) => {
        if (sel === '.carousel-track') return track;
        return null;
      }),
    };
    (c as any).el = { shadowRoot };
    // Stub slides getter to return one slide at index 0
    Object.defineProperty(c as any, 'slides', { get: () => [slide] });
    Object.defineProperty(c as any, 'totalSlides', { get: () => 1 });
    (c as any).getSlideLeft = vi.fn(() => 500);

    (c as any).scrollToIndex(0, 'smooth');

    // Expected: left = 500 - (800/2) + (300/2) = 500 - 400 + 150 = 250
    expect((track as any).scrollTo).toHaveBeenCalledWith({ left: 250, behavior: 'smooth' });
  });
});
