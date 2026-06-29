import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoFlyout } from './io-flyout';
import { getFlyoutStyles } from './io-flyout-styles';

describe('io-flyout — default props', () => {
  let component: IoFlyout;

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    component = new IoFlyout();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('is not open by default', () => {
    expect(component.open).toBe(false);
  });

  it('defaults to right position (legacy, normalised to end at load)', () => {
    expect(component.position).toBe('right');
    // resolvedPosition is normalised
    expect((component as any).resolvedPosition).toBe('end');
  });

  it('has no heading by default', () => {
    expect(component.heading).toBeUndefined();
  });

  it('generates a headingId in componentWillLoad', () => {
    const id = (component as any).headingId as string;
    expect(id).toMatch(/^io-flyout-heading-/);
  });

  it('headingId is a non-empty string', () => {
    const id = (component as any).headingId as string;
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
});

describe('io-flyout — show/close methods', () => {
  let component: IoFlyout;

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    component = new IoFlyout();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('show() sets open to true', async () => {
    await component.show();
    expect(component.open).toBe(true);
  });

  it('show() is a no-op when already open', async () => {
    component.open = true;
    await component.show();
    expect(component.open).toBe(true);
  });

  it('close() sets open to false', async () => {
    component.open = true;
    await component.close();
    expect(component.open).toBe(false);
  });

  it('close() is a no-op when already closed', async () => {
    component.open = false;
    await component.close();
    expect(component.open).toBe(false);
  });
});

describe('io-flyout — position prop', () => {
  let component: IoFlyout;

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    component = new IoFlyout();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts start position (logical)', () => {
    component.position = 'start';
    expect(component.position).toBe('start');
  });

  it('accepts end position (logical)', () => {
    component.position = 'end';
    expect(component.position).toBe('end');
  });

  it('normalises legacy left to start and emits console.warn', () => {
    const warnSpy = vi.spyOn(console, 'warn');
    component.position = 'left';
    (component as any).onPositionChange('left');
    expect((component as any).resolvedPosition).toBe('start');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('position="left" is deprecated'));
  });

  it('normalises legacy right to end and emits console.warn', () => {
    const warnSpy = vi.spyOn(console, 'warn');
    component.position = 'right';
    (component as any).onPositionChange('right');
    expect((component as any).resolvedPosition).toBe('end');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('position="right" is deprecated'));
  });

  it('resolvedPosition defaults to end (right default)', () => {
    expect((component as any).resolvedPosition).toBe('end');
  });
});

describe('io-flyout — RTL logical CSS (#981)', () => {
  it('styles use inset-inline-end for the end panel', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('flyout__panel--end');
    const endIdx = styles.indexOf('.flyout__panel--end');
    const endBlock = styles.slice(endIdx, endIdx + 200);
    expect(endBlock).toContain('inset-inline-end: 0');
  });

  it('styles use inset-inline-start for the start panel', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('flyout__panel--start');
    const startIdx = styles.indexOf('.flyout__panel--start');
    const startBlock = styles.slice(startIdx, startIdx + 200);
    expect(startBlock).toContain('inset-inline-start: 0');
  });

  it('styles include RTL translateX inversion for end panel', () => {
    const styles: string = getFlyoutStyles();
    // Should have translateX(-100%) for RTL end panel
    expect(styles).toContain('translateX(-100%)');
  });
});

describe('io-flyout — render contract', () => {
  it('styles contain flyout__panel class', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('flyout__panel');
  });

  it('styles contain position right translate rule', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('flyout__panel--right');
    expect(styles).toContain('translateX(100%)');
  });

  it('styles contain position left translate rule', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('flyout__panel--left');
    expect(styles).toContain('translateX(-100%)');
  });

  it('styles contain open class with translateX(0)', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('flyout__panel--open');
    expect(styles).toContain('translateX(0)');
  });

  it('styles contain io-bg-card token for background', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('var(--io-bg-card)');
  });

  it('styles contain io-shadow-lg token for box-shadow', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('var(--io-shadow-lg)');
  });

  it('styles contain io-z-modal token for z-index', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('var(--io-z-modal');
  });

  it('styles contain prefers-reduced-motion guard', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const idx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(idx)).toContain('transition-duration: 0ms');
  });

  it('styles contain backdrop class', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('flyout__backdrop');
    expect(styles).toContain('position: fixed');
  });

  it('backdrop uses --io-flyout-backdrop token, not --io-drawer-backdrop (#875)', () => {
    const styles: string = getFlyoutStyles();
    expect(styles).toContain('var(--io-flyout-backdrop)');
    expect(styles).not.toContain('var(--io-drawer-backdrop)');
  });
});

describe('io-flyout — closeLabel prop (#816)', () => {
  let component: IoFlyout;

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    component = new IoFlyout();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('has closeLabel "Close flyout" by default', () => {
    expect(component.closeLabel).toBe('Close flyout');
  });

  it('accepts a custom closeLabel', () => {
    component.closeLabel = 'Close navigation menu';
    expect(component.closeLabel).toBe('Close navigation menu');
  });
});

describe('io-flyout — componentWillLoad aria-label host check (#820)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not log error when heading prop is set', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const component = new IoFlyout();
    const el = document.createElement('io-flyout');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    component.heading = 'Navigation';
    const spy = vi.spyOn(console, 'error');
    (component as any).componentWillLoad();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not log error when aria-label is set on host element', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const component = new IoFlyout();
    const el = document.createElement('io-flyout');
    el.setAttribute('aria-label', 'Navigation panel');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    const spy = vi.spyOn(console, 'error');
    (component as any).componentWillLoad();
    expect(spy).not.toHaveBeenCalled();
  });

  it('logs error when neither heading nor aria-label is provided', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const component = new IoFlyout();
    const el = document.createElement('io-flyout');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    const spy = vi.spyOn(console, 'error');
    (component as any).componentWillLoad();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('[io-flyout]'),
    );
  });
});

describe('io-flyout — render method', () => {
  let component: IoFlyout;

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    component = new IoFlyout();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('render does not throw when closed', () => {
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw when open', () => {
    component.open = true;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw with heading set', () => {
    component.heading = 'Test heading';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw with position=start', () => {
    component.position = 'start';
    (component as any).resolvedPosition = 'start';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw with position=end', () => {
    component.position = 'end';
    (component as any).resolvedPosition = 'end';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw with legacy position=left (normalised to start)', () => {
    component.position = 'left';
    (component as any).resolvedPosition = 'start';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw with legacy position=right (normalised to end)', () => {
    component.position = 'right';
    (component as any).resolvedPosition = 'end';
    expect(() => (component as any).render()).not.toThrow();
  });
});
