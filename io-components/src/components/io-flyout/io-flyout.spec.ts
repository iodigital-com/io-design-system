import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoFlyout } from './io-flyout';
import { getFlyoutStyles } from './io-flyout-styles';

describe('io-flyout — default props', () => {
  let component: IoFlyout;

  beforeEach(() => {
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

  it('defaults to right position', () => {
    expect(component.position).toBe('right');
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
    component = new IoFlyout();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts left position', () => {
    component.position = 'left';
    expect(component.position).toBe('left');
  });

  it('accepts right position', () => {
    component.position = 'right';
    expect(component.position).toBe('right');
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

  it('render does not throw with position=left', () => {
    component.position = 'left';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw with position=right', () => {
    component.position = 'right';
    expect(() => (component as any).render()).not.toThrow();
  });
});
