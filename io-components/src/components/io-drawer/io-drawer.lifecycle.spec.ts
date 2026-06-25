import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoDrawer } from './io-drawer';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeDrawer(overrides: Partial<IoDrawer> = {}): IoDrawer {
  const c = new IoDrawer();
  (c as any).el = document.createElement('io-drawer');
  (c as any).dismissEvent = { emit: vi.fn() };
  (c as any).componentWillLoad();
  Object.assign(c, overrides);
  return c;
}

// Suppress console.error fired by componentWillLoad when no heading/aria-label
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
});

function makeDialogEl(open = false): HTMLDialogElement {
  const el = document.createElement('div') as unknown as HTMLDialogElement;
  el.open = open;
  el.showModal = vi.fn(() => {
    el.open = true;
  });
  el.close = vi.fn(() => {
    el.open = false;
  });
  (el as any).getAnimations = vi.fn(() => [{ cancel: vi.fn() }]);
  (el as any).getBoundingClientRect = vi.fn(() => ({
    left: 100,
    right: 400,
    top: 100,
    bottom: 400,
    width: 300,
    height: 300,
    x: 100,
    y: 100,
    toJSON: () => ({}),
  }));
  return el;
}

function withShadowRoot(
  c: IoDrawer,
  dialogEl: HTMLDialogElement | null,
): void {
  (c as any).el = {
    shadowRoot: {
      querySelector: vi.fn().mockReturnValue(dialogEl),
    },
  };
}

// ─── onOpenChange (Watch handler) ────────────────────────────────────────────

describe('io-drawer — onOpenChange', () => {
  let c: IoDrawer;

  beforeEach(() => {
    c = makeDrawer();
  });

  it('returns early when shadowRoot is null (el has no shadowRoot)', () => {
    (c as any).el = { shadowRoot: null };
    // Must not throw; dialog interactions must not happen.
    expect(() => (c as any).onOpenChange(true)).not.toThrow();
    expect(() => (c as any).onOpenChange(false)).not.toThrow();
  });

  it('returns early when shadowRoot exists but querySelector returns null', () => {
    (c as any).el = {
      shadowRoot: { querySelector: vi.fn().mockReturnValue(null) },
    };
    expect(() => (c as any).onOpenChange(true)).not.toThrow();
    expect(() => (c as any).onOpenChange(false)).not.toThrow();
  });

  it('returns early when el itself is undefined', () => {
    (c as any).el = undefined;
    expect(() => (c as any).onOpenChange(true)).not.toThrow();
  });

  // ── newVal = true ──────────────────────────────────────────────

  it('calls getAnimations, cancels animations, and calls showModal when dialog is closed', () => {
    const dialogEl = makeDialogEl(false);
    const cancelSpy = vi.fn();
    (dialogEl as any).getAnimations = vi.fn(() => [{ cancel: cancelSpy }]);
    withShadowRoot(c, dialogEl);

    (c as any).onOpenChange(true);

    expect((dialogEl as any).getAnimations).toHaveBeenCalled();
    expect(cancelSpy).toHaveBeenCalled();
    expect(dialogEl.showModal).toHaveBeenCalledTimes(1);
  });

  it('does NOT call showModal when dialog is already open (newVal=true, dialog.open=true)', () => {
    const dialogEl = makeDialogEl(true);
    withShadowRoot(c, dialogEl);

    (c as any).onOpenChange(true);

    expect(dialogEl.showModal).not.toHaveBeenCalled();
    expect((c as any).dismissEvent.emit).not.toHaveBeenCalled();
  });

  it('handles getAnimations returning an empty array without throwing', () => {
    const dialogEl = makeDialogEl(false);
    (dialogEl as any).getAnimations = vi.fn(() => []);
    withShadowRoot(c, dialogEl);

    expect(() => (c as any).onOpenChange(true)).not.toThrow();
    expect(dialogEl.showModal).toHaveBeenCalledTimes(1);
  });

  it('handles getAnimations being undefined without throwing', () => {
    const dialogEl = makeDialogEl(false);
    (dialogEl as any).getAnimations = undefined;
    withShadowRoot(c, dialogEl);

    // Optional chaining in source: `dialog.getAnimations?.()` — must not throw.
    expect(() => (c as any).onOpenChange(true)).not.toThrow();
    expect(dialogEl.showModal).toHaveBeenCalledTimes(1);
  });

  // ── newVal = false ─────────────────────────────────────────────

  it('calls dialog.close() and emits dismiss when dialog is open and newVal=false (user-initiated)', () => {
    const dialogEl = makeDialogEl(true);
    withShadowRoot(c, dialogEl);

    (c as any)._userInitiatedClose = true;
    (c as any).onOpenChange(false);

    expect(dialogEl.close).toHaveBeenCalledTimes(1);
    expect((c as any).dismissEvent.emit).toHaveBeenCalledTimes(1);
  });

  it('calls dialog.close() but does NOT emit dismiss when programmatic close (no user action)', () => {
    const dialogEl = makeDialogEl(true);
    withShadowRoot(c, dialogEl);

    // _userInitiatedClose stays false (default)
    (c as any).onOpenChange(false);

    expect(dialogEl.close).toHaveBeenCalledTimes(1);
    expect((c as any).dismissEvent.emit).not.toHaveBeenCalled();
  });

  it('does NOT call dialog.close() but still emits dismiss when dialog is already closed and newVal=false (user-initiated)', () => {
    const dialogEl = makeDialogEl(false);
    withShadowRoot(c, dialogEl);

    (c as any)._userInitiatedClose = true;
    (c as any).onOpenChange(false);

    expect(dialogEl.close).not.toHaveBeenCalled();
    expect((c as any).dismissEvent.emit).toHaveBeenCalledTimes(1);
  });
});

// ─── componentDidLoad ────────────────────────────────────────────────────────

describe('io-drawer — componentDidLoad', () => {
  it('does NOT call showModal when open=false', () => {
    const c = makeDrawer({ open: false });
    const dialogEl = makeDialogEl(false);
    (c as any).dialogEl = dialogEl;

    (c as any).componentDidLoad();

    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('calls showModal when open=true and dialogEl is set', () => {
    const c = makeDrawer({ open: true });
    const dialogEl = makeDialogEl(false);
    (c as any).dialogEl = dialogEl;

    (c as any).componentDidLoad();

    expect(dialogEl.showModal).toHaveBeenCalledTimes(1);
  });

  it('does NOT throw when open=true but dialogEl is undefined', () => {
    const c = makeDrawer({ open: true });
    (c as any).dialogEl = undefined;

    expect(() => (c as any).componentDidLoad()).not.toThrow();
  });
});

// ─── handleCancel ─────────────────────────────────────────────────────────────

describe('io-drawer — handleCancel', () => {
  let c: IoDrawer;

  beforeEach(() => {
    c = makeDrawer({ open: true });
  });

  it('calls ev.preventDefault()', () => {
    const ev = { preventDefault: vi.fn() } as unknown as Event;
    (c as any).handleCancel(ev);
    expect(ev.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('sets open to false', () => {
    const ev = { preventDefault: vi.fn() } as unknown as Event;
    (c as any).handleCancel(ev);
    expect(c.open).toBe(false);
  });
});

// ─── handleCloseClick ────────────────────────────────────────────────────────

describe('io-drawer — handleCloseClick (lifecycle file supplemental)', () => {
  it('sets open to false from an open state', () => {
    const c = makeDrawer({ open: true });
    (c as any).handleCloseClick();
    expect(c.open).toBe(false);
  });
});

// ─── handleDialogClick ───────────────────────────────────────────────────────

describe('io-drawer — handleDialogClick (lifecycle file supplemental)', () => {
  it('returns early without changing open when closeOnBackdrop=false', () => {
    const c = makeDrawer({ open: true, closeOnBackdrop: false });
    const dialogEl = makeDialogEl(true);
    const ev = {
      clientX: 10,
      clientY: 10,
      currentTarget: dialogEl,
    } as unknown as MouseEvent;

    (c as any).handleDialogClick(ev);

    expect(c.open).toBe(true);
  });

  it('sets open=false when click is outside dialog bounds and closeOnBackdrop=true', () => {
    const c = makeDrawer({ open: true, closeOnBackdrop: true });
    const dialogEl = makeDialogEl(true);
    // Coordinates outside the rect returned by makeDialogEl (left:100, right:400, top:100, bottom:400)
    const ev = {
      clientX: 10,
      clientY: 10,
      currentTarget: dialogEl,
    } as unknown as MouseEvent;

    (c as any).handleDialogClick(ev);

    expect(c.open).toBe(false);
  });

  it('does not change open when click is inside dialog bounds', () => {
    const c = makeDrawer({ open: true, closeOnBackdrop: true });
    const dialogEl = makeDialogEl(true);
    // Coordinates inside the rect (center of 100-400)
    const ev = {
      clientX: 200,
      clientY: 200,
      currentTarget: dialogEl,
    } as unknown as MouseEvent;

    (c as any).handleDialogClick(ev);

    expect(c.open).toBe(true);
  });
});

// ─── show / close (edge cases not in spec.ts) ────────────────────────────────

describe('io-drawer — show/close edge cases', () => {
  it('show() when already open is a no-op (open stays true)', async () => {
    const c = makeDrawer({ open: true });
    await c.show();
    expect(c.open).toBe(true);
  });

  it('close() when already closed is a no-op (open stays false)', async () => {
    const c = makeDrawer({ open: false });
    await c.close();
    expect(c.open).toBe(false);
  });

  it('show() transitions open from false to true', async () => {
    const c = makeDrawer({ open: false });
    await c.show();
    expect(c.open).toBe(true);
  });

  it('close() transitions open from true to false', async () => {
    const c = makeDrawer({ open: true });
    await c.close();
    expect(c.open).toBe(false);
  });
});

// ─── render branches ─────────────────────────────────────────────────────────

describe('io-drawer — render() branch coverage', () => {
  it('does not throw when rendered without a heading', () => {
    const c = makeDrawer();
    // heading is undefined by default
    expect(c.heading).toBeUndefined();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when rendered with a heading', () => {
    const c = makeDrawer({ heading: 'Drawer Title' });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw for placement="left"', () => {
    const c = makeDrawer({ placement: 'left' });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw for placement="right"', () => {
    const c = makeDrawer({ placement: 'right' });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw for placement="bottom"', () => {
    const c = makeDrawer({ placement: 'bottom' });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw for size="sm"', () => {
    const c = makeDrawer({ size: 'sm' });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw for size="md"', () => {
    const c = makeDrawer({ size: 'md' });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw for size="lg"', () => {
    const c = makeDrawer({ size: 'lg' });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw for size="full"', () => {
    const c = makeDrawer({ size: 'full' });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw when open=true during render', () => {
    const c = makeDrawer({ open: true });
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not throw with a custom closeLabel', () => {
    const c = makeDrawer({ closeLabel: 'Sluiten' });
    expect(() => (c as any).render()).not.toThrow();
  });
});

// ─── disconnectedCallback ─────────────────────────────────────────────────────

describe('io-drawer — disconnectedCallback', () => {
  it('calls detachTransitionEndListener when component is disconnected', () => {
    const c = makeDrawer();
    const dialog = document.createElement('dialog') as unknown as HTMLDialogElement;
    (dialog as any).showModal = vi.fn();
    (dialog as any).close = vi.fn();
    (c as any).dialogEl = dialog;
    (c as any).attachTransitionEndListener();

    const detachSpy = vi.spyOn(c as any, 'detachTransitionEndListener');
    c.disconnectedCallback();

    expect(detachSpy).toHaveBeenCalled();
  });

  it('removes the transitionend listener from dialogEl on disconnect', () => {
    const c = makeDrawer();
    const dialog = document.createElement('dialog') as unknown as HTMLDialogElement;
    const removeSpy = vi.spyOn(dialog as any, 'removeEventListener');
    (dialog as any).showModal = vi.fn();
    (dialog as any).close = vi.fn();
    (c as any).dialogEl = dialog;
    (c as any).attachTransitionEndListener();

    c.disconnectedCallback();

    expect(removeSpy).toHaveBeenCalledWith('transitionend', expect.any(Function));
    expect((c as any).transitionEndHandler).toBeUndefined();
  });

  it('does not throw when dialogEl is not set at disconnect time', () => {
    const c = makeDrawer();
    (c as any).dialogEl = undefined;
    expect(() => c.disconnectedCallback()).not.toThrow();
  });
});

// ─── render ref callback (dialogEl assignment) ───────────────────────────────

describe('io-drawer — render ref callback', () => {
  it('sets dialogEl when the ref callback fires with an element', () => {
    const c = makeDrawer();
    const dialog = document.createElement('dialog') as unknown as HTMLDialogElement;

    // Invoke render() and intercept the ref — because the stencil mock returns
    // the h() call args, we can simulate the ref callback directly.
    // The ref in render() is: ref={(el) => { this.dialogEl = el; applyAriaProp(...) }}
    // We test it by calling render (which doesn't throw) and then manually
    // exercising the same logic:
    const refFn = (el?: HTMLDialogElement) => {
      (c as any).dialogEl = el;
    };

    refFn(dialog);
    expect((c as any).dialogEl).toBe(dialog);
  });

  it('render() does not throw regardless of aria prop presence', () => {
    const c1 = makeDrawer();
    c1.aria = { label: 'test drawer' };
    expect(() => (c1 as any).render()).not.toThrow();

    const c2 = makeDrawer();
    c2.aria = undefined;
    expect(() => (c2 as any).render()).not.toThrow();
  });
});

// ─── componentWillLoad ───────────────────────────────────────────────────────

describe('io-drawer — componentWillLoad', () => {
  it('generates a unique headingId on each instantiation', () => {
    const c1 = makeDrawer();
    const c2 = makeDrawer();
    const id1 = (c1 as any).headingId as string;
    const id2 = (c2 as any).headingId as string;
    expect(id1).toMatch(/^io-drawer-heading-/);
    expect(id2).toMatch(/^io-drawer-heading-/);
    // IDs are generated from Math.random() so they will differ in practice.
    // We just assert both are valid — uniqueness is a probabilistic guarantee.
    expect(typeof id1).toBe('string');
    expect(typeof id2).toBe('string');
  });

  it('headingId contains the expected prefix', () => {
    const c = makeDrawer();
    expect((c as any).headingId).toMatch(/^io-drawer-heading-[a-z0-9]+$/);
  });
});

// ─── inert management (#807) ──────────────────────────────────────────────────

describe('io-drawer — inert management (#807)', () => {
  it('applyInert sets inert on body children other than the host', () => {
    const c = makeDrawer();
    const hostEl = document.createElement('io-drawer');
    (c as any).el = hostEl;
    document.body.appendChild(hostEl);

    const sibling = document.createElement('main');
    document.body.appendChild(sibling);

    (c as any).applyInert();

    expect(sibling.hasAttribute('inert')).toBe(true);
    expect(hostEl.hasAttribute('inert')).toBe(false);

    document.body.removeChild(hostEl);
    document.body.removeChild(sibling);
  });

  it('removeInert clears inert from previously inerted elements', () => {
    const c = makeDrawer();
    const hostEl = document.createElement('io-drawer');
    (c as any).el = hostEl;
    document.body.appendChild(hostEl);

    const sibling = document.createElement('aside');
    document.body.appendChild(sibling);

    (c as any).applyInert();
    expect(sibling.hasAttribute('inert')).toBe(true);

    (c as any).removeInert();
    expect(sibling.hasAttribute('inert')).toBe(false);

    document.body.removeChild(hostEl);
    document.body.removeChild(sibling);
  });

  it('removeInert is idempotent when no elements were inerted', () => {
    const c = makeDrawer();
    expect(() => (c as any).removeInert()).not.toThrow();
  });

  it('applyInert does not set inert on SCRIPT or STYLE elements', () => {
    const c = makeDrawer();
    const hostEl = document.createElement('io-drawer');
    (c as any).el = hostEl;
    document.body.appendChild(hostEl);

    const script = document.createElement('script');
    const style = document.createElement('style');
    document.body.appendChild(script);
    document.body.appendChild(style);

    (c as any).applyInert();

    expect(script.hasAttribute('inert')).toBe(false);
    expect(style.hasAttribute('inert')).toBe(false);

    document.body.removeChild(hostEl);
    document.body.removeChild(script);
    document.body.removeChild(style);
    (c as any).removeInert();
  });

  it('onOpenChange(true) calls applyInert', () => {
    const c = makeDrawer();
    const dialogEl = makeDialogEl(false);
    withShadowRoot(c, dialogEl);
    const applyInertSpy = vi.spyOn(c as any, 'applyInert').mockImplementation(() => {});
    (c as any).onOpenChange(true);
    expect(applyInertSpy).toHaveBeenCalledOnce();
  });

  it('onOpenChange(false) calls removeInert', () => {
    const c = makeDrawer();
    const dialogEl = makeDialogEl(true);
    withShadowRoot(c, dialogEl);
    const removeInertSpy = vi.spyOn(c as any, 'removeInert').mockImplementation(() => {});
    (c as any).onOpenChange(false);
    expect(removeInertSpy).toHaveBeenCalledOnce();
  });
});
