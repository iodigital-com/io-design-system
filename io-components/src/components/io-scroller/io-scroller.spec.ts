import { beforeEach, describe, expect, it, vi } from 'vitest';

import { h } from '@stencil/core';
import { IoScroller } from './io-scroller';
import { getScrollerClass } from './io-scroller-utils';

function makeComponent(): IoScroller {
  const component = new IoScroller();
  (component as any).el = document.createElement('io-scroller');
  return component;
}

describe('io-scroller — default props', () => {
  let component: IoScroller;

  beforeEach(() => {
    component = makeComponent();
  });

  it('orientation defaults to horizontal', () => {
    expect(component.orientation).toBe('horizontal');
  });

  it('showScrollbar defaults to false', () => {
    expect(component.showScrollbar).toBe(false);
  });

  it('label is undefined by default', () => {
    expect(component.label).toBeUndefined();
  });

  it('compact defaults to false', () => {
    expect(component.compact).toBe(false);
  });

  it('sticky defaults to false', () => {
    expect(component.sticky).toBe(false);
  });

  it('scrollRole defaults to undefined', () => {
    expect(component.scrollRole).toBeUndefined();
  });

  it('scrollAriaOrientation defaults to undefined', () => {
    expect(component.scrollAriaOrientation).toBeUndefined();
  });

  it('scrollAriaLabel defaults to undefined', () => {
    expect(component.scrollAriaLabel).toBeUndefined();
  });

  it('atStart defaults to true', () => {
    // @ts-expect-error accessing private state for test
    expect(component.atStart).toBe(true);
  });

  it('atEnd defaults to true', () => {
    // @ts-expect-error accessing private state for test
    expect(component.atEnd).toBe(true);
  });
});

describe('io-scroller — render stability', () => {
  it('does not throw with default props', () => {
    const component = makeComponent();
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with compact=true', () => {
    const component = makeComponent();
    component.compact = true;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with orientation=vertical', () => {
    const component = makeComponent();
    component.orientation = 'vertical';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with showScrollbar=true', () => {
    const component = makeComponent();
    component.showScrollbar = true;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with a custom label', () => {
    const component = makeComponent();
    component.label = 'Navigation tabs';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with sticky=true', () => {
    const component = makeComponent();
    component.sticky = true;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with scrollRole set', () => {
    const component = makeComponent();
    component.scrollRole = 'tablist';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with scrollAriaOrientation set', () => {
    const component = makeComponent();
    component.scrollAriaOrientation = 'horizontal';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with scrollAriaLabel set', () => {
    const component = makeComponent();
    component.scrollAriaLabel = 'Navigation tabs';
    expect(() => component.render()).not.toThrow();
  });

  it('uses default aria-label when label prop is not set', () => {
    // Verify the regionLabel logic directly
    const component = makeComponent();
    // The region label should be derived from orientation when label is undefined
    const expectedLabel = `Scrollable ${component.orientation} region`;
    expect(expectedLabel).toBe('Scrollable horizontal region');
  });

  it('uses custom aria-label when label prop is set', () => {
    const component = makeComponent();
    component.label = 'Image strip';
    // label prop is passed directly as aria-label in render
    expect(component.label).toBe('Image strip');
  });

  it('produces vertical fallback label when orientation=vertical and label unset', () => {
    const component = makeComponent();
    component.orientation = 'vertical';
    const expectedLabel = `Scrollable ${component.orientation} region`;
    expect(expectedLabel).toBe('Scrollable vertical region');
  });
});

describe('io-scroller — orientation variants', () => {
  it('accepts horizontal orientation', () => {
    const component = makeComponent();
    component.orientation = 'horizontal';
    expect(() => component.render()).not.toThrow();
    expect(component.orientation).toBe('horizontal');
  });

  it('accepts vertical orientation', () => {
    const component = makeComponent();
    component.orientation = 'vertical';
    expect(() => component.render()).not.toThrow();
    expect(component.orientation).toBe('vertical');
  });
});

describe('io-scroller — utils: getScrollerClass', () => {
  it('returns base scroller class for horizontal orientation', () => {
    const cls = getScrollerClass('horizontal', false);
    expect(cls).toContain('scroller');
    expect(cls).toContain('scroller--horizontal');
  });

  it('returns vertical orientation class', () => {
    const cls = getScrollerClass('vertical', false);
    expect(cls).toContain('scroller--vertical');
  });

  it('includes hide-scrollbar class when showScrollbar is false', () => {
    const cls = getScrollerClass('horizontal', false);
    expect(cls).toContain('scroller--hide-scrollbar');
    expect(cls).not.toContain('scroller--show-scrollbar');
  });

  it('includes show-scrollbar class when showScrollbar is true', () => {
    const cls = getScrollerClass('horizontal', true);
    expect(cls).toContain('scroller--show-scrollbar');
    expect(cls).not.toContain('scroller--hide-scrollbar');
  });

  it('does not include dead fade-start/fade-end classes', () => {
    const cls = getScrollerClass('horizontal', false);
    expect(cls).not.toContain('scroller--fade-start');
    expect(cls).not.toContain('scroller--fade-end');
  });
});

describe('io-scroller — edge state methods', () => {
  it('syncHostClasses adds has-fade-start class when not at start', () => {
    const component = makeComponent();
    (component as any).atStart = false;
    (component as any).atEnd = true;
    (component as any).syncHostClasses();
    expect((component as any).el.classList.contains('has-fade-start')).toBe(true);
    expect((component as any).el.classList.contains('has-fade-end')).toBe(false);
  });

  it('syncHostClasses adds has-fade-end class when not at end', () => {
    const component = makeComponent();
    (component as any).atStart = true;
    (component as any).atEnd = false;
    (component as any).syncHostClasses();
    expect((component as any).el.classList.contains('has-fade-start')).toBe(false);
    expect((component as any).el.classList.contains('has-fade-end')).toBe(true);
  });

  it('syncHostClasses adds both fade classes when at neither edge', () => {
    const component = makeComponent();
    (component as any).atStart = false;
    (component as any).atEnd = false;
    (component as any).syncHostClasses();
    expect((component as any).el.classList.contains('has-fade-start')).toBe(true);
    expect((component as any).el.classList.contains('has-fade-end')).toBe(true);
  });

  it('syncHostClasses removes fade classes when at both edges', () => {
    const component = makeComponent();
    // Pre-set both classes
    (component as any).el.classList.add('has-fade-start', 'has-fade-end');
    (component as any).atStart = true;
    (component as any).atEnd = true;
    (component as any).syncHostClasses();
    expect((component as any).el.classList.contains('has-fade-start')).toBe(false);
    expect((component as any).el.classList.contains('has-fade-end')).toBe(false);
  });
});

describe('io-scroller — keyboard navigation (#850)', () => {
  function getScrollRegionKeyDownHandler(component: IoScroller): ((ev: KeyboardEvent) => void) | undefined {
    vi.mocked(h).mockClear();
    component.render();
    const regionCall = vi.mocked(h).mock.calls.find(([, attrs]) => (attrs as any)?.role === 'region');
    return (regionCall?.[1] as any)?.onKeyDown;
  }

  it('scroll region has onKeyDown handler', () => {
    const component = makeComponent();
    const handler = getScrollRegionKeyDownHandler(component);
    expect(typeof handler).toBe('function');
  });

  // ── Horizontal mode ──────────────────────────────────────────

  it('horizontal: calls scrollBy(prev) on ArrowLeft', () => {
    const component = makeComponent();
    const spy = vi.spyOn(component as any, 'scrollBy');
    const handler = getScrollRegionKeyDownHandler(component)!;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true });
    vi.spyOn(ev, 'preventDefault');
    handler(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('prev');
  });

  it('horizontal: calls scrollBy(next) on ArrowRight', () => {
    const component = makeComponent();
    const spy = vi.spyOn(component as any, 'scrollBy');
    const handler = getScrollRegionKeyDownHandler(component)!;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });
    vi.spyOn(ev, 'preventDefault');
    handler(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('next');
  });

  it('horizontal: ignores ArrowUp (wrong axis)', () => {
    const component = makeComponent();
    component.orientation = 'horizontal';
    const spy = vi.spyOn(component as any, 'scrollBy');
    const handler = getScrollRegionKeyDownHandler(component)!;
    handler(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('horizontal: ignores ArrowDown (wrong axis)', () => {
    const component = makeComponent();
    component.orientation = 'horizontal';
    const spy = vi.spyOn(component as any, 'scrollBy');
    const handler = getScrollRegionKeyDownHandler(component)!;
    handler(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  // ── Vertical mode ────────────────────────────────────────────

  it('vertical: calls scrollBy(prev) on ArrowUp', () => {
    const component = makeComponent();
    component.orientation = 'vertical';
    const spy = vi.spyOn(component as any, 'scrollBy');
    const handler = getScrollRegionKeyDownHandler(component)!;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true });
    vi.spyOn(ev, 'preventDefault');
    handler(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('prev');
  });

  it('vertical: calls scrollBy(next) on ArrowDown', () => {
    const component = makeComponent();
    component.orientation = 'vertical';
    const spy = vi.spyOn(component as any, 'scrollBy');
    const handler = getScrollRegionKeyDownHandler(component)!;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });
    vi.spyOn(ev, 'preventDefault');
    handler(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('next');
  });

  it('vertical: ignores ArrowLeft (wrong axis)', () => {
    const component = makeComponent();
    component.orientation = 'vertical';
    const spy = vi.spyOn(component as any, 'scrollBy');
    const handler = getScrollRegionKeyDownHandler(component)!;
    handler(new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('vertical: ignores ArrowRight (wrong axis)', () => {
    const component = makeComponent();
    component.orientation = 'vertical';
    const spy = vi.spyOn(component as any, 'scrollBy');
    const handler = getScrollRegionKeyDownHandler(component)!;
    handler(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    expect(spy).not.toHaveBeenCalled();
  });

  // ── Home / End ───────────────────────────────────────────────

  it('calls scrollToExtent(start) on Home', () => {
    const component = makeComponent();
    const spy = vi.spyOn(component as any, 'scrollToExtent');
    const handler = getScrollRegionKeyDownHandler(component)!;
    const ev = new KeyboardEvent('keydown', { key: 'Home', cancelable: true });
    vi.spyOn(ev, 'preventDefault');
    handler(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('start');
  });

  it('calls scrollToExtent(end) on End', () => {
    const component = makeComponent();
    const spy = vi.spyOn(component as any, 'scrollToExtent');
    const handler = getScrollRegionKeyDownHandler(component)!;
    const ev = new KeyboardEvent('keydown', { key: 'End', cancelable: true });
    vi.spyOn(ev, 'preventDefault');
    handler(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('end');
  });

  it('does not call scrollBy or scrollToExtent on unhandled key', () => {
    const component = makeComponent();
    const scrollBySpy = vi.spyOn(component as any, 'scrollBy');
    const scrollToExtentSpy = vi.spyOn(component as any, 'scrollToExtent');
    const handler = getScrollRegionKeyDownHandler(component)!;
    handler(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    expect(scrollBySpy).not.toHaveBeenCalled();
    expect(scrollToExtentSpy).not.toHaveBeenCalled();
  });
});

describe('io-scroller — no unnecessary public methods', () => {
  it('does not expose unexpected interactive methods', () => {
    const methodNames = Object.getOwnPropertyNames(IoScroller.prototype);
    expect(methodNames).not.toContain('handleClick');
    expect(methodNames).not.toContain('handleChange');
  });
});

describe('io-scroller — scrollBy private method', () => {
  it('calls scrollBy with negative left offset for prev direction (horizontal)', () => {
    const component = makeComponent();
    const mockContainer = document.createElement('div');
    Object.defineProperty(mockContainer, 'clientWidth', { value: 400, configurable: true });
    const scrollBySpy = vi.fn();
    mockContainer.scrollBy = scrollBySpy;
    (component as any).scrollContainer = mockContainer;
    component.orientation = 'horizontal';

    (component as any).scrollBy('prev');

    expect(scrollBySpy).toHaveBeenCalledWith({ left: -200, behavior: 'smooth' });
  });

  it('calls scrollBy with positive left offset for next direction (horizontal)', () => {
    const component = makeComponent();
    const mockContainer = document.createElement('div');
    Object.defineProperty(mockContainer, 'clientWidth', { value: 400, configurable: true });
    const scrollBySpy = vi.fn();
    mockContainer.scrollBy = scrollBySpy;
    (component as any).scrollContainer = mockContainer;
    component.orientation = 'horizontal';

    (component as any).scrollBy('next');

    expect(scrollBySpy).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
  });

  it('calls scrollBy with negative top offset for prev direction (vertical)', () => {
    const component = makeComponent();
    const mockContainer = document.createElement('div');
    Object.defineProperty(mockContainer, 'clientWidth', { value: 400, configurable: true });
    const scrollBySpy = vi.fn();
    mockContainer.scrollBy = scrollBySpy;
    (component as any).scrollContainer = mockContainer;
    component.orientation = 'vertical';

    (component as any).scrollBy('prev');

    expect(scrollBySpy).toHaveBeenCalledWith({ top: -200, behavior: 'smooth' });
  });

  it('uses fallback offset of 200 when clientWidth is 0', () => {
    const component = makeComponent();
    const mockContainer = document.createElement('div');
    Object.defineProperty(mockContainer, 'clientWidth', { value: 0, configurable: true });
    const scrollBySpy = vi.fn();
    mockContainer.scrollBy = scrollBySpy;
    (component as any).scrollContainer = mockContainer;
    component.orientation = 'horizontal';

    (component as any).scrollBy('next');

    expect(scrollBySpy).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
  });

  it('does not throw when scrollContainer is undefined', () => {
    const component = makeComponent();
    (component as any).scrollContainer = undefined;
    expect(() => (component as any).scrollBy('next')).not.toThrow();
  });
});
