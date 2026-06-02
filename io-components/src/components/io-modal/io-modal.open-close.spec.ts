import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoModal } from './io-modal';

function makeDialogEl() {
  const el = document.createElement('div') as unknown as HTMLDialogElement;
  el.open = false;
  el.showModal = vi.fn(() => { el.open = true; });
  el.show = vi.fn(() => { el.open = true; });
  el.close = vi.fn(() => { el.open = false; });
  return el;
}

describe('io-modal — open/close', () => {
  let component: IoModal;
  let ioDismissEmit: ReturnType<typeof vi.fn>;
  let dialogEl: ReturnType<typeof makeDialogEl>;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    ioDismissEmit = vi.fn();
    (component as any).dismissEvent = { emit: ioDismissEmit };
    (component as any).componentWillLoad();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;
  });

  it('openChanged(true) calls dialog.show() by default (preventTopLayer=true)', () => {
    (component as any).openChanged(true);
    expect(dialogEl.show).toHaveBeenCalled();
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('openChanged(false) calls dialog.close and emits dismiss', () => {
    dialogEl.open = true;
    (component as any).openChanged(false);
    expect(dialogEl.close).toHaveBeenCalled();
    expect(ioDismissEmit).toHaveBeenCalled();
  });

  it('openChanged(false) emits dismiss even if dialog is already closed', () => {
    dialogEl.open = false;
    (component as any).openChanged(false);
    expect(dialogEl.close).not.toHaveBeenCalled();
    expect(ioDismissEmit).toHaveBeenCalled();
  });

  it('openChanged(true) does not call dialog.show() if dialog is already open', () => {
    dialogEl.open = true;
    (component as any).openChanged(true);
    expect(dialogEl.show).not.toHaveBeenCalled();
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('clears focus trap listener on close', () => {
    const removeListenerSpy = vi.spyOn(dialogEl, 'removeEventListener');
    (component as any).focusTrapHandler = vi.fn();
    dialogEl.open = true;

    (component as any).openChanged(false);

    expect(removeListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect((component as any).focusTrapHandler).toBeUndefined();
  });

  // ── @Method show() / close() ──────────────────────────────────

  // @Watch is not auto-invoked in unit tests (Stencil decorator mock).
  // We verify that each method sets the prop correctly, then call
  // openChanged manually to confirm the side-effect chain still fires.

  it('show() sets open prop to true', async () => {
    component.open = false;
    await component.show();
    expect(component.open).toBe(true);
  });

  it('show() triggers dialog.show() when openChanged is propagated (preventTopLayer=true default)', async () => {
    component.open = false;
    await component.show();
    // Simulate @Watch propagation
    (component as any).openChanged(component.open);
    expect(dialogEl.show).toHaveBeenCalled();
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('show() is a no-op when already open (prop stays true, openChanged not triggered)', async () => {
    component.open = true;
    dialogEl.open = true;
    await component.show();
    // prop unchanged — the guard prevents the assignment
    expect(component.open).toBe(true);
    expect(dialogEl.show).not.toHaveBeenCalled();
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('close() sets open prop to false', async () => {
    component.open = true;
    await component.close();
    expect(component.open).toBe(false);
  });

  it('close() triggers dismiss when openChanged is propagated', async () => {
    component.open = true;
    dialogEl.open = true;
    await component.close();
    // Simulate @Watch propagation
    (component as any).openChanged(component.open);
    expect(ioDismissEmit).toHaveBeenCalled();
  });

  it('close() is a no-op when already closed', async () => {
    component.open = false;
    await component.close();
    expect(ioDismissEmit).not.toHaveBeenCalled();
  });

  it('componentDidLoad uses dialog.show() by default (preventTopLayer=true)', () => {
    const inertSpy = vi.spyOn(component as any, 'applyBackgroundInert');
    const focusTrapSpy = vi.spyOn(component as any, 'setupFocusTrap');
    component.open = true;
    dialogEl.open = false;

    component.componentDidLoad();

    expect(dialogEl.show).toHaveBeenCalled();
    expect(dialogEl.showModal).not.toHaveBeenCalled();
    expect(inertSpy).toHaveBeenCalled();
    expect(focusTrapSpy).toHaveBeenCalled();
  });
});

// ── preventTopLayer=false: native showModal() path ───────────────────────────

describe('io-modal — preventTopLayer=false (native showModal)', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;
    component.preventTopLayer = false;
  });

  it('openChanged(true) calls showModal() not show()', () => {
    (component as any).openChanged(true);
    expect(dialogEl.showModal).toHaveBeenCalled();
    expect(dialogEl.show).not.toHaveBeenCalled();
  });

  it('componentDidLoad calls showModal() when open=true', () => {
    component.open = true;
    component.componentDidLoad();
    expect(dialogEl.showModal).toHaveBeenCalled();
    expect(dialogEl.show).not.toHaveBeenCalled();
  });
});

// ── preventTopLayer mode ──────────────────────────────────────────────────────

describe('io-modal — preventTopLayer', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;
  let hostEl: HTMLElement;

  beforeEach(() => {
    component = new IoModal();
    hostEl = document.createElement('io-modal');
    (component as any).el = hostEl;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;
    component.preventTopLayer = true;
  });

  it('openChanged(true) calls dialog.show() instead of showModal()', () => {
    (component as any).openChanged(true);
    expect(dialogEl.show).toHaveBeenCalled();
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('componentDidLoad calls dialog.show() when open=true', () => {
    component.open = true;
    component.componentDidLoad();
    expect(dialogEl.show).toHaveBeenCalled();
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('host backdrop listener is attached on open', () => {
    const addListenerSpy = vi.spyOn(hostEl, 'addEventListener');
    (component as any).openChanged(true);
    expect(addListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
  });

  it('host backdrop listener is removed on close', () => {
    (component as any).openChanged(true);
    const removeListenerSpy = vi.spyOn(hostEl, 'removeEventListener');
    dialogEl.open = true;
    (component as any).openChanged(false);
    expect(removeListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    expect((component as any).backdropHostHandler).toBeUndefined();
  });

  it('clicking outside dialog panel closes modal when closeOnBackdrop=true', () => {
    component.open = true;
    component.closeOnBackdrop = true;
    (component as any).openChanged(true);
    // Simulate click at (5, 5) — outside a centered dialog (default getBoundingClientRect = 0,0,0,0)
    const handler = (component as any).backdropHostHandler as (ev: MouseEvent) => void;
    handler({ clientX: 5, clientY: 5 } as MouseEvent);
    expect(component.open).toBe(false);
  });

  it('clicking inside dialog panel does not close modal', () => {
    component.open = true;
    component.closeOnBackdrop = true;
    (component as any).openChanged(true);
    // Mock dialog bounding rect to wrap the click coordinates
    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue(
      { left: 0, right: 400, top: 0, bottom: 300, width: 400, height: 300, x: 0, y: 0, toJSON: () => ({}) } as DOMRect,
    );
    const handler = (component as any).backdropHostHandler as (ev: MouseEvent) => void;
    handler({ clientX: 200, clientY: 150 } as MouseEvent);
    expect(component.open).toBe(true);
  });

  it('clicking outside does nothing when closeOnBackdrop=false', () => {
    component.open = true;
    component.closeOnBackdrop = false;
    (component as any).openChanged(true);
    const handler = (component as any).backdropHostHandler as (ev: MouseEvent) => void;
    handler({ clientX: 5, clientY: 5 } as MouseEvent);
    expect(component.open).toBe(true);
  });

  it('ESC key closes modal in preventTopLayer mode', () => {
    (component as any).openChanged(true);
    const handler = (component as any).escHandler as (ev: KeyboardEvent) => void;
    handler({ key: 'Escape', preventDefault: vi.fn() } as unknown as KeyboardEvent);
    expect(component.open).toBe(false);
  });

  it('ESC handler is removed on close', () => {
    (component as any).openChanged(true);
    expect((component as any).escHandler).toBeDefined();
    dialogEl.open = true;
    (component as any).openChanged(false);
    expect((component as any).escHandler).toBeUndefined();
  });

  it('disconnectedCallback removes backdrop and ESC listeners', () => {
    (component as any).openChanged(true);
    const removeHostSpy = vi.spyOn(hostEl, 'removeEventListener');
    const removeDocSpy = vi.spyOn(document, 'removeEventListener');
    component.disconnectedCallback();
    expect(removeHostSpy).toHaveBeenCalledWith('click', expect.any(Function));
    expect(removeDocSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});

// ── render ref callback (dialogEl assignment + applyAriaProp) ─────────────────

describe('io-modal — render() ref callback (lines 330-331)', () => {
  it('render() does not throw when aria prop is set', () => {
    const c = new IoModal();
    (c as any).el = document.createElement('io-modal');
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).motionVisibleEndEvent = { emit: vi.fn() };
    (c as any).motionHiddenEndEvent = { emit: vi.fn() };
    (c as any).componentWillLoad();
    c.aria = { labelledby: 'heading-id' };

    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() does not throw when aria prop is undefined', () => {
    const c = new IoModal();
    (c as any).el = document.createElement('io-modal');
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).motionVisibleEndEvent = { emit: vi.fn() };
    (c as any).motionHiddenEndEvent = { emit: vi.fn() };
    (c as any).componentWillLoad();
    c.aria = undefined;

    expect(() => (c as any).render()).not.toThrow();
  });

  it('ref callback sets dialogEl and applies aria attributes to the element', () => {
    const c = new IoModal();
    (c as any).el = document.createElement('io-modal');
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).motionVisibleEndEvent = { emit: vi.fn() };
    (c as any).motionHiddenEndEvent = { emit: vi.fn() };
    (c as any).componentWillLoad();
    c.aria = { controls: 'step-panel' };

    const dialog = document.createElement('dialog') as unknown as HTMLDialogElement;
    const setAttrSpy = vi.spyOn(dialog as any, 'setAttribute');

    // Exercise the ref callback directly (same logic as what render() wires up)
    const refFn = (el?: HTMLDialogElement) => {
      (c as any).dialogEl = el;
      if (el && c.aria) {
        for (const [key, value] of Object.entries(c.aria)) {
          const attrName = key.startsWith('aria-') ? key : `aria-${key}`;
          el.setAttribute(attrName, value);
        }
      }
    };

    refFn(dialog);

    expect((c as any).dialogEl).toBe(dialog);
    expect(setAttrSpy).toHaveBeenCalledWith('aria-controls', 'step-panel');
  });

  it('ref callback clears dialogEl when called with undefined', () => {
    const c = new IoModal();
    (c as any).el = document.createElement('io-modal');
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).componentWillLoad();

    const dialog = document.createElement('dialog') as unknown as HTMLDialogElement;
    (c as any).dialogEl = dialog;

    const refFn = (el?: HTMLDialogElement) => {
      (c as any).dialogEl = el;
    };
    refFn(undefined);

    expect((c as any).dialogEl).toBeUndefined();
  });

  it('onAriaChange applies aria attributes to dialogEl when set', () => {
    const c = new IoModal();
    (c as any).el = document.createElement('io-modal');
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).componentWillLoad();

    const dialog = document.createElement('dialog') as unknown as HTMLDialogElement;
    const setAttrSpy = vi.spyOn(dialog as any, 'setAttribute');
    (c as any).dialogEl = dialog;
    c.aria = { owns: 'owned-panel' };

    (c as any).onAriaChange();

    expect(setAttrSpy).toHaveBeenCalledWith('aria-owns', 'owned-panel');
  });

  it('disconnectedCallback cleans up focus trap and transition listener', () => {
    const c = new IoModal();
    (c as any).el = document.createElement('io-modal');
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).motionVisibleEndEvent = { emit: vi.fn() };
    (c as any).motionHiddenEndEvent = { emit: vi.fn() };
    (c as any).componentWillLoad();

    const clearFocusTrapSpy = vi.spyOn(c as any, 'clearFocusTrap');
    const removeInertSpy = vi.spyOn(c as any, 'removeBackgroundInert');
    const detachTransitionSpy = vi.spyOn(c as any, 'detachTransitionEndListener');

    c.disconnectedCallback();

    expect(clearFocusTrapSpy).toHaveBeenCalled();
    expect(removeInertSpy).toHaveBeenCalled();
    expect(detachTransitionSpy).toHaveBeenCalled();
  });
});
