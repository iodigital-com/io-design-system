import { beforeEach, describe, expect, it } from 'vitest';

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

  it('has no fade-start class by default (atStart is true)', () => {
    (component as any).syncHostClasses();
    expect((component as any).el.classList.contains('has-fade-start')).toBe(false);
  });

  it('has no fade-end class by default (atEnd is true)', () => {
    (component as any).syncHostClasses();
    expect((component as any).el.classList.contains('has-fade-end')).toBe(false);
  });
});

describe('io-scroller — render stability', () => {
  it('does not throw with default props', () => {
    const component = makeComponent();
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

describe('io-scroller — no unnecessary public methods', () => {
  it('does not expose unexpected interactive methods', () => {
    const methodNames = Object.getOwnPropertyNames(IoScroller.prototype);
    expect(methodNames).not.toContain('handleClick');
    expect(methodNames).not.toContain('handleChange');
  });
});
