import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import * as utils from './io-popover-utils';
import { IoPopover } from './io-popover';

// Prevent requestAnimationFrame callbacks from firing after tests complete.
// applyOpenState schedules a focus call via rAF; in jsdom this fires via a
// timer and the queried element may lack a real focus() method, causing an
// unhandled exception. Replacing rAF with a no-op keeps tests synchronous
// and avoids leaking async work across test boundaries.
vi.stubGlobal('requestAnimationFrame', (_cb: FrameRequestCallback) => 0);

// ── Helpers ───────────────────────────────────────────────────────────────────

function makePopover(): IoPopover {
  const c = new IoPopover();
  (c as any).el = document.createElement('io-popover');
  (c as any).dismissEvent = { emit: vi.fn() };
  (c as any).componentWillLoad();
  return c;
}

function withPanel(c: IoPopover): HTMLDivElement {
  const panel = document.createElement('div');
  panel.setAttribute('aria-hidden', 'true');
  (c as any).panelEl = panel;
  (c as any).useNativePopover = false;
  return panel;
}

// ── handleTriggerClick ────────────────────────────────────────────────────────

describe('io-popover — handleTriggerClick', () => {
  let c: IoPopover;

  beforeEach(() => {
    c = makePopover();
    withPanel(c);
  });

  it('toggles open from false to true', () => {
    expect(c.open).toBe(false);
    (c as any).handleTriggerClick();
    expect(c.open).toBe(true);
  });

  it('toggles open from true to false', () => {
    c.open = true;
    (c as any).handleTriggerClick();
    expect(c.open).toBe(false);
  });

  it('emits dismiss when closing via trigger click', () => {
    c.open = true;
    (c as any).handleTriggerClick();
    expect((c as any).dismissEvent.emit).toHaveBeenCalledTimes(1);
  });

  it('does NOT emit dismiss when opening via trigger click', () => {
    (c as any).handleTriggerClick();
    expect((c as any).dismissEvent.emit).not.toHaveBeenCalled();
  });
});

// ── handleKeydown ──────────────────────────────────────────────────────────────

describe('io-popover — handleKeydown', () => {
  let c: IoPopover;

  beforeEach(() => {
    c = makePopover();
    withPanel(c);
  });

  it('does nothing when popover is closed', () => {
    c.open = false;
    const ev = { key: 'Escape', stopPropagation: vi.fn() } as unknown as KeyboardEvent;
    (c as any).handleKeydown(ev);
    expect(ev.stopPropagation).not.toHaveBeenCalled();
    expect((c as any).dismissEvent.emit).not.toHaveBeenCalled();
  });

  it('closes and emits dismiss on Escape when open', () => {
    c.open = true;
    const ev = { key: 'Escape', stopPropagation: vi.fn() } as unknown as KeyboardEvent;
    (c as any).handleKeydown(ev);
    expect(c.open).toBe(false);
    expect(ev.stopPropagation).toHaveBeenCalled();
    expect((c as any).dismissEvent.emit).toHaveBeenCalledTimes(1);
  });

  it('does nothing on non-Escape key when open', () => {
    c.open = true;
    const ev = { key: 'Enter', stopPropagation: vi.fn() } as unknown as KeyboardEvent;
    (c as any).handleKeydown(ev);
    expect(c.open).toBe(true);
    expect(ev.stopPropagation).not.toHaveBeenCalled();
    expect((c as any).dismissEvent.emit).not.toHaveBeenCalled();
  });

  it('does nothing on Tab key when open', () => {
    c.open = true;
    const ev = { key: 'Tab', stopPropagation: vi.fn() } as unknown as KeyboardEvent;
    (c as any).handleKeydown(ev);
    expect(c.open).toBe(true);
    expect(ev.stopPropagation).not.toHaveBeenCalled();
  });
});

// ── handleWindowClick ──────────────────────────────────────────────────────────

describe('io-popover — handleWindowClick', () => {
  let c: IoPopover;

  beforeEach(() => {
    c = makePopover();
    withPanel(c);
  });

  it('does nothing when popover is closed', () => {
    c.open = false;
    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    const ev = { composedPath: vi.fn().mockReturnValue([outsideEl]) } as unknown as MouseEvent;
    (c as any).handleWindowClick(ev);
    expect((c as any).dismissEvent.emit).not.toHaveBeenCalled();
    document.body.removeChild(outsideEl);
  });

  it('does nothing when closeOnClickOutside is false', () => {
    c.open = true;
    c.closeOnClickOutside = false;
    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    const ev = { composedPath: vi.fn().mockReturnValue([outsideEl]) } as unknown as MouseEvent;
    (c as any).handleWindowClick(ev);
    expect(c.open).toBe(true);
    expect((c as any).dismissEvent.emit).not.toHaveBeenCalled();
    document.body.removeChild(outsideEl);
  });

  it('closes when click target is outside the host', () => {
    c.open = true;
    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    const ev = { composedPath: vi.fn().mockReturnValue([outsideEl]) } as unknown as MouseEvent;
    (c as any).handleWindowClick(ev);
    expect(c.open).toBe(false);
    expect((c as any).dismissEvent.emit).toHaveBeenCalledTimes(1);
    document.body.removeChild(outsideEl);
  });

  it('does NOT close when click target is inside the host', () => {
    c.open = true;
    const hostEl = (c as any).el as HTMLElement;
    const innerEl = document.createElement('button');
    hostEl.appendChild(innerEl);
    const ev = { composedPath: vi.fn().mockReturnValue([innerEl]) } as unknown as MouseEvent;
    (c as any).handleWindowClick(ev);
    expect(c.open).toBe(true);
    expect((c as any).dismissEvent.emit).not.toHaveBeenCalled();
  });
});

// ── onOpenChange ───────────────────────────────────────────────────────────────

describe('io-popover — onOpenChange(true)', () => {
  it('calls applyOpenState — removes aria-hidden from panel', () => {
    const c = makePopover();
    const panel = withPanel(c);
    panel.setAttribute('aria-hidden', 'true');
    (c as any).onOpenChange(true);
    expect(panel.getAttribute('aria-hidden')).toBeNull();
  });

  it('updates triggerEl aria-expanded to "true"', () => {
    const c = makePopover();
    withPanel(c);
    const triggerEl = document.createElement('button');
    (c as any).triggerEl = triggerEl;
    (c as any).onOpenChange(true);
    expect(triggerEl.getAttribute('aria-expanded')).toBe('true');
  });
});

describe('io-popover — onOpenChange(false)', () => {
  it('calls applyClosedState — sets aria-hidden to "true" on panel', () => {
    const c = makePopover();
    const panel = withPanel(c);
    panel.removeAttribute('aria-hidden');
    (c as any).onOpenChange(false);
    expect(panel.getAttribute('aria-hidden')).toBe('true');
  });

  it('updates triggerEl aria-expanded to "false"', () => {
    const c = makePopover();
    withPanel(c);
    const triggerEl = document.createElement('button');
    (c as any).triggerEl = triggerEl;
    (c as any).onOpenChange(false);
    expect(triggerEl.getAttribute('aria-expanded')).toBe('false');
  });
});

describe('io-popover — onOpenChange with no triggerEl', () => {
  it('does not throw when triggerEl is undefined (open)', () => {
    const c = makePopover();
    withPanel(c);
    (c as any).triggerEl = undefined;
    expect(() => (c as any).onOpenChange(true)).not.toThrow();
  });

  it('does not throw when triggerEl is undefined (close)', () => {
    const c = makePopover();
    withPanel(c);
    (c as any).triggerEl = undefined;
    expect(() => (c as any).onOpenChange(false)).not.toThrow();
  });
});

// ── applyOpenState ─────────────────────────────────────────────────────────────

describe('io-popover — applyOpenState', () => {
  it('returns early and does not throw when panelEl is absent', () => {
    const c = makePopover();
    (c as any).panelEl = undefined;
    expect(() => (c as any).applyOpenState()).not.toThrow();
  });

  it('fallback path (useNativePopover=false) removes aria-hidden from panel', () => {
    const c = makePopover();
    const panel = withPanel(c);
    panel.setAttribute('aria-hidden', 'true');
    (c as any).applyOpenState();
    expect(panel.getAttribute('aria-hidden')).toBeNull();
  });

  it('native popover path calls showPopover on panelEl', () => {
    const c = makePopover();
    const panel = withPanel(c);
    const showPopover = vi.fn();
    (panel as any).showPopover = showPopover;
    (c as any).useNativePopover = true;
    (c as any).applyOpenState();
    expect(showPopover).toHaveBeenCalled();
  });

  it('falls back to applyFallbackOpen silently when native showPopover throws', () => {
    const c = makePopover();
    const panel = withPanel(c);
    panel.setAttribute('aria-hidden', 'true');
    (panel as any).showPopover = vi.fn().mockImplementation(() => {
      throw new Error('native popover error');
    });
    (c as any).useNativePopover = true;
    expect(() => (c as any).applyOpenState()).not.toThrow();
    // applyFallbackOpen removes aria-hidden as the fallback path
    expect(panel.getAttribute('aria-hidden')).toBeNull();
  });
});

// ── applyClosedState ───────────────────────────────────────────────────────────

describe('io-popover — applyClosedState', () => {
  it('sets aria-hidden to "true" on panelEl', () => {
    const c = makePopover();
    const panel = withPanel(c);
    panel.removeAttribute('aria-hidden');
    (c as any).applyClosedState();
    expect(panel.getAttribute('aria-hidden')).toBe('true');
  });

  it('detachFocusTrap runs and does not throw when panelEl is absent', () => {
    const c = makePopover();
    (c as any).panelEl = undefined;
    expect(() => (c as any).applyClosedState()).not.toThrow();
  });

  it('calls focus() on triggerEl when closing', () => {
    const c = makePopover();
    withPanel(c);
    const focusMock = vi.fn();
    (c as any).triggerEl = { focus: focusMock };
    (c as any).applyClosedState();
    expect(focusMock).toHaveBeenCalledTimes(1);
  });

  it('native popover path calls hidePopover on panelEl', () => {
    const c = makePopover();
    const panel = withPanel(c);
    const hidePopover = vi.fn();
    (panel as any).hidePopover = hidePopover;
    (c as any).useNativePopover = true;
    (c as any).applyClosedState();
    expect(hidePopover).toHaveBeenCalled();
  });

  it('ignores error thrown by native hidePopover', () => {
    const c = makePopover();
    const panel = withPanel(c);
    (panel as any).hidePopover = vi.fn().mockImplementation(() => {
      throw new Error('already hidden');
    });
    (c as any).useNativePopover = true;
    expect(() => (c as any).applyClosedState()).not.toThrow();
  });
});

// ── applyFallbackOpen ──────────────────────────────────────────────────────────

describe('io-popover — applyFallbackOpen', () => {
  it('returns early and does not throw when panelEl is absent', () => {
    const c = makePopover();
    (c as any).panelEl = undefined;
    expect(() => (c as any).applyFallbackOpen()).not.toThrow();
  });

  it('removes aria-hidden from panel even when no triggerEl is found in shadow', () => {
    const c = makePopover();
    const panel = withPanel(c);
    panel.setAttribute('aria-hidden', 'true');
    // el has no shadowRoot — triggerEl query returns undefined → early return after removeAttribute
    (c as any).applyFallbackOpen();
    expect(panel.getAttribute('aria-hidden')).toBeNull();
  });

  it('sets panelStyle with fixed positioning when triggerEl is found in shadow', () => {
    const c = makePopover();
    const panel = withPanel(c);

    const triggerEl = document.createElement('button');
    triggerEl.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 100, bottom: 140, left: 200, right: 300,
      width: 100, height: 40,
    } as DOMRect);

    panel.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 0, bottom: 0, left: 0, right: 0, width: 150, height: 80,
    } as DOMRect);

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([triggerEl]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };
    (c as any).el = { shadowRoot: mockShadowRoot, contains: vi.fn().mockReturnValue(true) };

    (c as any).applyFallbackOpen();

    const style = (c as any).panelStyle as Record<string, string>;
    expect(style.position).toBe('fixed');
    expect(style.top).toMatch(/px$/);
    expect(style.left).toMatch(/px$/);
  });
});

// ── attachFocusTrap ────────────────────────────────────────────────────────────

describe('io-popover — attachFocusTrap', () => {
  it('registers a keydown listener on panelEl', () => {
    const c = makePopover();
    const panel = withPanel(c);
    const addSpy = vi.spyOn(panel, 'addEventListener');
    (c as any).attachFocusTrap();
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('Shift+Tab from first element wraps focus to last element', () => {
    const c = makePopover();
    const panel = document.createElement('div');
    (c as any).panelEl = panel;
    (c as any).useNativePopover = false;

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    btn1.focus = vi.fn();
    btn2.focus = vi.fn();
    panel.appendChild(btn1);
    panel.appendChild(btn2);

    vi.spyOn(utils, 'getPanelFocusableElements').mockReturnValue([btn1, btn2]);

    (c as any).attachFocusTrap();

    Object.defineProperty(document, 'activeElement', { value: btn1, configurable: true });

    const ev = {
      key: 'Tab',
      shiftKey: true,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    const handler = (c as any).focusTrapHandler as (ev: KeyboardEvent) => void;
    handler(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(btn2.focus).toHaveBeenCalled();
  });

  it('Tab from last element wraps focus to first element', () => {
    const c = makePopover();
    const panel = document.createElement('div');
    (c as any).panelEl = panel;
    (c as any).useNativePopover = false;

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    btn1.focus = vi.fn();
    btn2.focus = vi.fn();
    panel.appendChild(btn1);
    panel.appendChild(btn2);

    vi.spyOn(utils, 'getPanelFocusableElements').mockReturnValue([btn1, btn2]);

    (c as any).attachFocusTrap();

    Object.defineProperty(document, 'activeElement', { value: btn2, configurable: true });

    const ev = {
      key: 'Tab',
      shiftKey: false,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    const handler = (c as any).focusTrapHandler as (ev: KeyboardEvent) => void;
    handler(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(btn1.focus).toHaveBeenCalled();
  });

  it('Tab when not at a boundary does not call preventDefault', () => {
    const c = makePopover();
    const panel = document.createElement('div');
    (c as any).panelEl = panel;

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const btn3 = document.createElement('button');
    btn1.focus = vi.fn();
    btn2.focus = vi.fn();
    btn3.focus = vi.fn();

    vi.spyOn(utils, 'getPanelFocusableElements').mockReturnValue([btn1, btn2, btn3]);

    (c as any).attachFocusTrap();

    // Active element is in the middle — not first or last
    Object.defineProperty(document, 'activeElement', { value: btn2, configurable: true });

    const ev = {
      key: 'Tab',
      shiftKey: false,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    const handler = (c as any).focusTrapHandler as (ev: KeyboardEvent) => void;
    handler(ev);

    expect(ev.preventDefault).not.toHaveBeenCalled();
  });

  it('non-Tab key is a no-op in the focus trap handler', () => {
    const c = makePopover();
    const panel = document.createElement('div');
    (c as any).panelEl = panel;

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    vi.spyOn(utils, 'getPanelFocusableElements').mockReturnValue([btn1, btn2]);

    (c as any).attachFocusTrap();

    const ev = {
      key: 'Escape',
      shiftKey: false,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    const handler = (c as any).focusTrapHandler as (ev: KeyboardEvent) => void;
    handler(ev);

    expect(ev.preventDefault).not.toHaveBeenCalled();
  });

  it('Tab with empty focusable list is a no-op', () => {
    const c = makePopover();
    const panel = document.createElement('div');
    (c as any).panelEl = panel;

    vi.spyOn(utils, 'getPanelFocusableElements').mockReturnValue([]);

    (c as any).attachFocusTrap();

    const ev = {
      key: 'Tab',
      shiftKey: false,
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    const handler = (c as any).focusTrapHandler as (ev: KeyboardEvent) => void;
    handler(ev);

    expect(ev.preventDefault).not.toHaveBeenCalled();
  });

  it('calls detachFocusTrap before attaching to prevent listener leaks on re-open', () => {
    const c = makePopover();
    const panel = document.createElement('div');
    (c as any).panelEl = panel;
    const removeSpy = vi.spyOn(panel, 'removeEventListener');

    // Simulate an existing handler
    const oldHandler = vi.fn();
    (c as any).focusTrapHandler = oldHandler;

    (c as any).attachFocusTrap();

    expect(removeSpy).toHaveBeenCalledWith('keydown', oldHandler);
  });
});

// ── detachFocusTrap ────────────────────────────────────────────────────────────

describe('io-popover — detachFocusTrap', () => {
  it('removes the keydown listener and clears the handler reference', () => {
    const c = makePopover();
    const panel = document.createElement('div');
    (c as any).panelEl = panel;
    const removeSpy = vi.spyOn(panel, 'removeEventListener');

    (c as any).attachFocusTrap();
    const handler = (c as any).focusTrapHandler;
    expect(handler).toBeDefined();

    (c as any).detachFocusTrap();

    expect(removeSpy).toHaveBeenCalledWith('keydown', handler);
    expect((c as any).focusTrapHandler).toBeUndefined();
  });

  it('is a no-op when no handler is attached (no throw)', () => {
    const c = makePopover();
    (c as any).panelEl = undefined;
    (c as any).focusTrapHandler = undefined;
    expect(() => (c as any).detachFocusTrap()).not.toThrow();
  });

  it('is a no-op when panelEl is absent even if handler exists', () => {
    const c = makePopover();
    (c as any).panelEl = undefined;
    (c as any).focusTrapHandler = vi.fn();
    expect(() => (c as any).detachFocusTrap()).not.toThrow();
  });
});

// ── close() ────────────────────────────────────────────────────────────────────

describe('io-popover — close()', () => {
  it('sets open to false', () => {
    const c = makePopover();
    withPanel(c);
    c.open = true;
    (c as any).close();
    expect(c.open).toBe(false);
  });

  it('emits the dismiss event', () => {
    const c = makePopover();
    withPanel(c);
    c.open = true;
    (c as any).close();
    expect((c as any).dismissEvent.emit).toHaveBeenCalledTimes(1);
  });
});

// ── componentWillLoad ─────────────────────────────────────────────────────────

describe('io-popover — componentWillLoad', () => {
  it('logs console.error when label prop is missing', () => {
    const c = new IoPopover();
    (c as any).el = document.createElement('io-popover');
    (c as any).dismissEvent = { emit: vi.fn() };
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    c.label = undefined;
    (c as any).componentWillLoad();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('[io-popover]'),
    );
    errorSpy.mockRestore();
  });

  it('does not log console.error when label prop is provided', () => {
    const c = new IoPopover();
    (c as any).el = document.createElement('io-popover');
    (c as any).dismissEvent = { emit: vi.fn() };
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    c.label = 'Quick actions';
    (c as any).componentWillLoad();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('does not log console.error when ariaLabel prop is provided (no label) (#788)', () => {
    const c = new IoPopover();
    (c as any).el = document.createElement('io-popover');
    (c as any).dismissEvent = { emit: vi.fn() };
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    c.label = undefined;
    c.ariaLabel = 'Filter panel';
    (c as any).componentWillLoad();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('assigns a labelId with the expected prefix', () => {
    const c = makePopover();
    expect((c as any).labelId as string).toMatch(/^io-popover-label-/);
  });

  it('assigns a panelId with the expected prefix', () => {
    const c = makePopover();
    expect((c as any).panelId as string).toMatch(/^io-popover-panel-/);
  });
});

// ── componentDidLoad ───────────────────────────────────────────────────────────

describe('io-popover — componentDidLoad with triggerEl', () => {
  it('sets aria-haspopup, aria-expanded and aria-controls on the resolved triggerEl', () => {
    const c = new IoPopover();
    const mockTrigger = document.createElement('button');

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([mockTrigger]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };

    (c as any).el = { shadowRoot: mockShadowRoot };
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).panelEl = document.createElement('div');
    (c as any).componentWillLoad();

    const panelId = (c as any).panelId as string;

    (c as any).componentDidLoad();

    expect(mockTrigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(mockTrigger.getAttribute('aria-expanded')).toBe('false');
    expect(mockTrigger.getAttribute('aria-controls')).toBe(panelId);
  });

  it('calls applyOpenState when open=true at load time', () => {
    const c = new IoPopover();
    const mockTrigger = document.createElement('button');

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([mockTrigger]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };

    (c as any).el = { shadowRoot: mockShadowRoot };
    (c as any).dismissEvent = { emit: vi.fn() };

    const panel = document.createElement('div');
    panel.setAttribute('aria-hidden', 'true');
    (c as any).panelEl = panel;
    (c as any).useNativePopover = false;

    (c as any).componentWillLoad();
    c.open = true;

    (c as any).componentDidLoad();

    // applyOpenState removes aria-hidden
    expect(panel.getAttribute('aria-hidden')).toBeNull();
  });

  it('does not throw when shadowRoot is absent (SSR/test boundary)', () => {
    const c = new IoPopover();
    (c as any).el = { shadowRoot: null };
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).panelEl = document.createElement('div');
    (c as any).componentWillLoad();
    expect(() => (c as any).componentDidLoad()).not.toThrow();
  });
});

// ── positionNativePanel ────────────────────────────────────────────────────────

describe('io-popover — positionNativePanel', () => {
  it('returns early and does not throw when panelEl is absent', () => {
    const c = makePopover();
    (c as any).panelEl = undefined;
    expect(() => (c as any).positionNativePanel()).not.toThrow();
  });

  it('returns early without setting style when no triggerEl is found in shadow', () => {
    const c = makePopover();
    const panel = withPanel(c);
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(null) };
    (c as any).el = { shadowRoot: mockShadowRoot };
    (c as any).positionNativePanel();
    expect(panel.style.top).toBe('');
    expect(panel.style.left).toBe('');
  });

  it('sets panel style.top and style.left when triggerEl is found', () => {
    const c = makePopover();
    const panel = withPanel(c);

    const triggerEl = document.createElement('button');
    triggerEl.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 50, bottom: 90, left: 100, right: 200,
      width: 100, height: 40,
    } as DOMRect);

    panel.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 0, bottom: 0, left: 0, right: 0, width: 120, height: 60,
    } as DOMRect);

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([triggerEl]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };
    (c as any).el = { shadowRoot: mockShadowRoot, contains: vi.fn().mockReturnValue(true) };

    (c as any).positionNativePanel();

    expect(panel.style.top).toMatch(/\d+px/);
    expect(panel.style.left).toMatch(/\d+px/);
  });
});

// ── disconnectedCallback ───────────────────────────────────────────────────────

describe('io-popover — disconnectedCallback', () => {
  it('calls detachFocusTrap to remove the panel keydown listener', () => {
    const c = makePopover();
    const panel = withPanel(c);
    const removeSpy = vi.spyOn(panel, 'removeEventListener');

    // Attach a focus trap so there is a handler to remove
    (c as any).attachFocusTrap();
    const handler = (c as any).focusTrapHandler;
    expect(handler).toBeDefined();

    (c as any).disconnectedCallback();

    expect(removeSpy).toHaveBeenCalledWith('keydown', handler);
    expect((c as any).focusTrapHandler).toBeUndefined();
  });

  it('does not throw when disconnected with no active focus trap', () => {
    const c = makePopover();
    withPanel(c);
    (c as any).focusTrapHandler = undefined;
    expect(() => (c as any).disconnectedCallback()).not.toThrow();
  });

  it('does not throw when disconnected with no panelEl', () => {
    const c = makePopover();
    (c as any).panelEl = undefined;
    expect(() => (c as any).disconnectedCallback()).not.toThrow();
  });
});

// ── render() ──────────────────────────────────────────────────────────────────

describe('io-popover — render()', () => {
  it('does not throw when called with default props', () => {
    const c = makePopover();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when label is set', () => {
    const c = makePopover();
    c.label = 'Quick actions';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when open is true', () => {
    const c = makePopover();
    withPanel(c);
    c.open = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when panelStyle is set', () => {
    const c = makePopover();
    (c as any).panelStyle = { position: 'fixed', top: '100px', left: '200px' };
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when label is undefined (no aria-labelledby path)', () => {
    const c = makePopover();
    c.label = undefined;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('renders aria-label on panel dialog div when ariaLabel is set and label is absent (#788)', () => {
    const c = makePopover();
    c.label = undefined;
    c.ariaLabel = 'Filter panel';
    (h as ReturnType<typeof vi.fn>).mockClear();
    (c as any).render();
    const calls = (h as ReturnType<typeof vi.fn>).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const panelCall = calls.find(([tag, attrs]) => tag === 'div' && attrs?.['role'] === 'dialog' && attrs?.['aria-label'] === 'Filter panel');
    expect(panelCall).toBeDefined();
  });
});

// ── handleWindowScroll / handleWindowResize (#777) ───────────────────────────

describe('io-popover — scroll/resize repositioning (#777)', () => {
  it('handleWindowScroll does nothing when popover is closed', () => {
    const c = makePopover();
    withPanel(c);
    c.open = false;
    const repositionSpy = vi.spyOn(c as any, 'repositionPanel').mockImplementation(() => {});
    (c as any).handleWindowScroll();
    expect(repositionSpy).not.toHaveBeenCalled();
  });

  it('handleWindowScroll calls repositionPanel when popover is open', () => {
    const c = makePopover();
    withPanel(c);
    c.open = true;
    const repositionSpy = vi.spyOn(c as any, 'repositionPanel').mockImplementation(() => {});
    (c as any).handleWindowScroll();
    expect(repositionSpy).toHaveBeenCalledOnce();
  });

  it('handleWindowResize does nothing when popover is closed', () => {
    const c = makePopover();
    withPanel(c);
    c.open = false;
    const repositionSpy = vi.spyOn(c as any, 'repositionPanel').mockImplementation(() => {});
    (c as any).handleWindowResize();
    expect(repositionSpy).not.toHaveBeenCalled();
  });

  it('handleWindowResize calls repositionPanel when popover is open', () => {
    const c = makePopover();
    withPanel(c);
    c.open = true;
    const repositionSpy = vi.spyOn(c as any, 'repositionPanel').mockImplementation(() => {});
    (c as any).handleWindowResize();
    expect(repositionSpy).toHaveBeenCalledOnce();
  });

  it('repositionPanel calls applyFallbackOpen when useNativePopover=false', () => {
    const c = makePopover();
    withPanel(c);
    const fallbackSpy = vi.spyOn(c as any, 'applyFallbackOpen').mockImplementation(() => {});
    (c as any).useNativePopover = false;
    (c as any).repositionPanel();
    expect(fallbackSpy).toHaveBeenCalledOnce();
  });

  it('repositionPanel calls positionNativePanel when useNativePopover=true', () => {
    const c = makePopover();
    withPanel(c);
    const nativeSpy = vi.spyOn(c as any, 'positionNativePanel').mockImplementation(() => {});
    (c as any).useNativePopover = true;
    (c as any).repositionPanel();
    expect(nativeSpy).toHaveBeenCalledOnce();
  });
});
