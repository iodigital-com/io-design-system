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

describe('io-sheet — componentWillLoad accessible name warning (#823)', () => {
  it('logs console.error when heading and aria-label are both absent', () => {
    const c = new IoSheet();
    const el = document.createElement('io-sheet');
    (c as any).el = el;
    (c as any).dismissEvent = { emit: vi.fn() };
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    c.heading = undefined;
    (c as any).componentWillLoad();
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('[io-sheet]'));
    errorSpy.mockRestore();
  });

  it('does not log console.error when heading prop is provided', () => {
    const c = new IoSheet();
    const el = document.createElement('io-sheet');
    (c as any).el = el;
    (c as any).dismissEvent = { emit: vi.fn() };
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    c.heading = 'Share options';
    (c as any).componentWillLoad();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('does not log console.error when host has aria-label attribute', () => {
    const c = new IoSheet();
    const el = document.createElement('io-sheet');
    el.setAttribute('aria-label', 'Share options');
    (c as any).el = el;
    (c as any).dismissEvent = { emit: vi.fn() };
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    c.heading = undefined;
    (c as any).componentWillLoad();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});

describe('io-sheet — focus trap uses document.activeElement (#874)', () => {
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

  it('attachFocusTrap does not reference shadowRoot.activeElement', () => {
    const panelEl = document.createElement('div');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    panelEl.appendChild(btn1);
    panelEl.appendChild(btn2);
    (component as any).panelEl = panelEl;

    (component as any).attachFocusTrap();

    const handler = (component as any).focusTrapHandler as ((ev: KeyboardEvent) => void) | undefined;
    expect(typeof handler).toBe('function');

    // Simulate Tab when document.activeElement is the last button.
    // Should wrap to first without throwing or needing shadowRoot.
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(btn2 as Element);
    const tabEv = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    vi.spyOn(tabEv, 'preventDefault');
    const focusSpy = vi.spyOn(btn1, 'focus');

    handler!(tabEv);

    expect((tabEv as any).preventDefault).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('attachFocusTrap wraps Shift+Tab from first to last', () => {
    const panelEl = document.createElement('div');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    panelEl.appendChild(btn1);
    panelEl.appendChild(btn2);
    (component as any).panelEl = panelEl;

    (component as any).attachFocusTrap();

    const handler = (component as any).focusTrapHandler as (ev: KeyboardEvent) => void;

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(btn1 as Element);
    const shiftTabEv = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    vi.spyOn(shiftTabEv, 'preventDefault');
    const focusSpy = vi.spyOn(btn2, 'focus');

    handler(shiftTabEv);

    expect((shiftTabEv as any).preventDefault).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('attachFocusTrap does not call detach when no existing handler', () => {
    const panelEl = document.createElement('div');
    panelEl.appendChild(document.createElement('button'));
    (component as any).panelEl = panelEl;
    (component as any).focusTrapHandler = undefined;

    expect(() => (component as any).attachFocusTrap()).not.toThrow();
    expect(typeof (component as any).focusTrapHandler).toBe('function');
  });

  it('attachFocusTrap wraps Tab when document.activeElement is host but shadow child is last focusable', () => {
    // In browsers, when a shadow-DOM child (e.g. close button) has focus,
    // document.activeElement returns the host, not the shadow child.
    // The fix: fall back to shadowRoot.querySelector(':focus') in that case.
    const panelEl = document.createElement('div');
    const firstBtn = document.createElement('button');
    const shadowCloseBtn = document.createElement('button'); // last — simulates shadow close button
    panelEl.appendChild(firstBtn);
    panelEl.appendChild(shadowCloseBtn);

    // Replace component.el with a mock that has a shadowRoot returning shadowCloseBtn on :focus
    const hostEl = document.createElement('io-sheet');
    const mockShadowRoot = { querySelector: (sel: string) => sel === ':focus' ? shadowCloseBtn : null };
    Object.defineProperty(hostEl, 'shadowRoot', { get: () => mockShadowRoot });
    (component as any).el = hostEl;
    (component as any).panelEl = panelEl;

    (component as any).attachFocusTrap();
    const handler = (component as any).focusTrapHandler as (ev: KeyboardEvent) => void;

    // Simulate: shadow close button (last) has focus → document.activeElement is the host
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(hostEl as Element);
    const focusSpy = vi.spyOn(firstBtn, 'focus');

    const tabEv = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    vi.spyOn(tabEv, 'preventDefault');
    handler(tabEv);

    // Without the fix: active === hostEl, not shadowCloseBtn (last) → no wrap
    // With the fix: active resolves to shadowCloseBtn via :focus query → wraps to first
    expect((tabEv as any).preventDefault).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();
  });
});

describe('io-sheet — motionVisibleEnd / motionHiddenEnd events (#796)', () => {
  it('motionVisibleEndEvent emits after transitionend when sheet is open', () => {
    const c = new IoSheet();
    const panelEl = document.createElement('div');
    (c as any).el = document.createElement('io-sheet');
    (c as any).panelEl = panelEl;
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).motionVisibleEndEvent = { emit: vi.fn() };
    (c as any).motionHiddenEndEvent = { emit: vi.fn() };
    c.open = true;
    (c as any).attachTransitionEndListener();

    panelEl.dispatchEvent(new Event('transitionend'));

    expect((c as any).motionVisibleEndEvent.emit).toHaveBeenCalledOnce();
    expect((c as any).motionHiddenEndEvent.emit).not.toHaveBeenCalled();
  });

  it('motionHiddenEndEvent emits after transitionend when sheet is closed', () => {
    const c = new IoSheet();
    const panelEl = document.createElement('div');
    (c as any).el = document.createElement('io-sheet');
    (c as any).panelEl = panelEl;
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).motionVisibleEndEvent = { emit: vi.fn() };
    (c as any).motionHiddenEndEvent = { emit: vi.fn() };
    c.open = false;
    (c as any).attachTransitionEndListener();

    panelEl.dispatchEvent(new Event('transitionend'));

    expect((c as any).motionHiddenEndEvent.emit).toHaveBeenCalledOnce();
    expect((c as any).motionVisibleEndEvent.emit).not.toHaveBeenCalled();
  });

  it('attachTransitionEndListener is a no-op when panelEl is absent', () => {
    const c = new IoSheet();
    (c as any).el = document.createElement('io-sheet');
    (c as any).panelEl = undefined;
    (c as any).dismissEvent = { emit: vi.fn() };
    expect(() => (c as any).attachTransitionEndListener()).not.toThrow();
  });
});

describe('io-sheet — scroll-lock cleanup (#796)', () => {
  it('saves and restores body overflow on open/close cycle', () => {
    const c = new IoSheet();
    (c as any).el = document.createElement('io-sheet');
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).motionVisibleEndEvent = { emit: vi.fn() };
    (c as any).motionHiddenEndEvent = { emit: vi.fn() };
    (c as any).componentWillLoad();

    // Pre-condition: some other overlay already set overflow
    document.body.style.overflow = 'hidden';

    (c as any).applyOpenState();
    expect(document.body.style.overflow).toBe('hidden');
    expect((c as any).savedBodyOverflow).toBe('hidden');

    (c as any).applyClosedState();
    // Should restore to the pre-open value, not blindly clear to ''
    expect(document.body.style.overflow).toBe('hidden');

    // Clean up
    document.body.style.overflow = '';
  });

  it('restores empty string when body had no overflow before open', () => {
    const c = new IoSheet();
    (c as any).el = document.createElement('io-sheet');
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).motionVisibleEndEvent = { emit: vi.fn() };
    (c as any).motionHiddenEndEvent = { emit: vi.fn() };
    (c as any).componentWillLoad();

    document.body.style.overflow = '';
    (c as any).applyOpenState();
    (c as any).applyClosedState();

    expect(document.body.style.overflow).toBe('');
  });
});
