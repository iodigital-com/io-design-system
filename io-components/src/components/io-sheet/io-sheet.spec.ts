import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoSheet } from './io-sheet';
import { getSheetStyles } from './io-sheet-styles';

describe('io-sheet — default props', () => {
  let component: IoSheet;

  beforeEach(() => {
    component = new IoSheet();
    (component as any).el = document.createElement('io-sheet');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('is not open by default', () => {
    expect(component.open).toBe(false);
  });

  it('has no heading by default', () => {
    expect(component.heading).toBeUndefined();
  });

  it('is dismissible by default', () => {
    expect(component.dismissible).toBe(true);
  });

  it('generates a headingId in componentWillLoad', () => {
    const id = (component as any).headingId as string;
    expect(id).toMatch(/^io-sheet-heading-/);
  });

  it('headingId is a non-empty string', () => {
    const id = (component as any).headingId as string;
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
});

describe('io-sheet — open prop', () => {
  let component: IoSheet;

  beforeEach(() => {
    component = new IoSheet();
    (component as any).el = document.createElement('io-sheet');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('can be set to true', () => {
    component.open = true;
    expect(component.open).toBe(true);
  });

  it('can be set to false', () => {
    component.open = true;
    component.open = false;
    expect(component.open).toBe(false);
  });
});

describe('io-sheet — dismissible prop', () => {
  let component: IoSheet;

  beforeEach(() => {
    component = new IoSheet();
    (component as any).el = document.createElement('io-sheet');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('can be set to false', () => {
    component.dismissible = false;
    expect(component.dismissible).toBe(false);
  });

  it('can be set to true', () => {
    component.dismissible = true;
    expect(component.dismissible).toBe(true);
  });
});

describe('io-sheet — render contract', () => {
  it('styles contain sheet__panel class', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('sheet__panel');
  });

  it('styles contain io-sheet-in keyframe animation', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('@keyframes io-sheet-in');
    expect(styles).toContain('translateY(100%)');
    expect(styles).toContain('translateY(0)');
  });

  it('styles contain io-bg-card token for background', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('var(--io-bg-card)');
  });

  it('styles contain io-shadow-lg token for box-shadow', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('var(--io-shadow-lg)');
  });

  it('styles contain io-z-overlay token for z-index', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('var(--io-z-overlay)');
  });

  it('styles contain backdrop class with position fixed', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('sheet__backdrop');
    expect(styles).toContain('position: fixed');
  });

  it('styles contain io-color-overlay-bg token for backdrop', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('var(--io-color-overlay-bg)');
  });

  it('styles contain prefers-reduced-motion guard', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const idx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(idx)).toContain('animation: none');
  });

  it('styles contain panel anchored to bottom', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('bottom: 0');
    expect(styles).toContain('left: 0');
    expect(styles).toContain('right: 0');
  });

  it('styles contain max-height: 80vh', () => {
    const styles: string = getSheetStyles();
    expect(styles).toContain('max-height: 80vh');
  });
});

describe('io-sheet — render method', () => {
  let component: IoSheet;

  beforeEach(() => {
    component = new IoSheet();
    (component as any).el = document.createElement('io-sheet');
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

  it('render does not throw with dismissible=false', () => {
    component.dismissible = false;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw with heading and dismissible=false', () => {
    component.heading = 'Settings';
    component.dismissible = false;
    expect(() => (component as any).render()).not.toThrow();
  });
});
