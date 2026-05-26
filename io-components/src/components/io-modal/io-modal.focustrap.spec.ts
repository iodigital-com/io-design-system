import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoModal } from './io-modal';

function makeDialogEl() {
  const el = document.createElement('div') as unknown as HTMLDialogElement;
  el.open = false;
  el.showModal = vi.fn(() => { el.open = true; });
  el.close = vi.fn(() => { el.open = false; });
  return el;
}

function makeModal() {
  const component = new IoModal();
  (component as any).dismissEvent = { emit: vi.fn() };
  (component as any).el = document.createElement('io-modal');
  (component as any).inertElements = [];
  (component as any).componentWillLoad();
  return component;
}

// ── handleKeyDown closure: Shift+Tab on first element ────────────────────────

describe('io-modal — focusTrapHandler: Shift+Tab on first element', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;
  let firstBtn: HTMLButtonElement;
  let lastBtn: HTMLButtonElement;

  beforeEach(() => {
    component = makeModal();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;

    firstBtn = document.createElement('button');
    lastBtn = document.createElement('button');
    firstBtn.focus = vi.fn();
    lastBtn.focus = vi.fn();
    dialogEl.appendChild(firstBtn);
    dialogEl.appendChild(lastBtn);

    (component as any).setupFocusTrap();
  });

  it('stores focusTrapHandler after setup with multiple focusable elements', () => {
    expect((component as any).focusTrapHandler).toBeTypeOf('function');
  });

  it('Shift+Tab on first element wraps focus to last element', () => {
    Object.defineProperty(dialogEl.ownerDocument, 'activeElement', {
      value: firstBtn,
      configurable: true,
    });

    const ev = { key: 'Tab', shiftKey: true, preventDefault: vi.fn() };
    (component as any).focusTrapHandler(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(lastBtn.focus).toHaveBeenCalled();
  });

  it('Shift+Tab on first element does not focus first element', () => {
    Object.defineProperty(dialogEl.ownerDocument, 'activeElement', {
      value: firstBtn,
      configurable: true,
    });

    const ev = { key: 'Tab', shiftKey: true, preventDefault: vi.fn() };
    (component as any).focusTrapHandler(ev);

    expect(firstBtn.focus).not.toHaveBeenCalled();
  });
});

// ── handleKeyDown closure: Tab on last element ────────────────────────────────

describe('io-modal — focusTrapHandler: Tab on last element', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;
  let firstBtn: HTMLButtonElement;
  let lastBtn: HTMLButtonElement;

  beforeEach(() => {
    component = makeModal();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;

    firstBtn = document.createElement('button');
    lastBtn = document.createElement('button');
    firstBtn.focus = vi.fn();
    lastBtn.focus = vi.fn();
    dialogEl.appendChild(firstBtn);
    dialogEl.appendChild(lastBtn);

    (component as any).setupFocusTrap();
  });

  it('Tab on last element wraps focus to first element', () => {
    Object.defineProperty(dialogEl.ownerDocument, 'activeElement', {
      value: lastBtn,
      configurable: true,
    });

    const ev = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() };
    (component as any).focusTrapHandler(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(firstBtn.focus).toHaveBeenCalled();
  });

  it('Tab on last element does not focus last element', () => {
    Object.defineProperty(dialogEl.ownerDocument, 'activeElement', {
      value: lastBtn,
      configurable: true,
    });

    const ev = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() };
    (component as any).focusTrapHandler(ev);

    expect(lastBtn.focus).not.toHaveBeenCalled();
  });
});

// ── handleKeyDown closure: non-Tab key is ignored ────────────────────────────

describe('io-modal — focusTrapHandler: non-Tab key is a no-op', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;
  let firstBtn: HTMLButtonElement;
  let lastBtn: HTMLButtonElement;

  beforeEach(() => {
    component = makeModal();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;

    firstBtn = document.createElement('button');
    lastBtn = document.createElement('button');
    firstBtn.focus = vi.fn();
    lastBtn.focus = vi.fn();
    dialogEl.appendChild(firstBtn);
    dialogEl.appendChild(lastBtn);

    (component as any).setupFocusTrap();
  });

  it('does nothing when key is not Tab', () => {
    Object.defineProperty(dialogEl.ownerDocument, 'activeElement', {
      value: lastBtn,
      configurable: true,
    });

    const ev = { key: 'Enter', shiftKey: false, preventDefault: vi.fn() };
    (component as any).focusTrapHandler(ev);

    expect(ev.preventDefault).not.toHaveBeenCalled();
    expect(firstBtn.focus).not.toHaveBeenCalled();
    expect(lastBtn.focus).not.toHaveBeenCalled();
  });

  it('does nothing for Escape key', () => {
    const ev = { key: 'Escape', shiftKey: false, preventDefault: vi.fn() };
    (component as any).focusTrapHandler(ev);
    expect(ev.preventDefault).not.toHaveBeenCalled();
  });
});

// ── handleKeyDown closure: Tab on middle element is a no-op ──────────────────

describe('io-modal — focusTrapHandler: Tab on middle element (no wrap)', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;
  let firstBtn: HTMLButtonElement;
  let middleBtn: HTMLButtonElement;
  let lastBtn: HTMLButtonElement;

  beforeEach(() => {
    component = makeModal();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;

    firstBtn = document.createElement('button');
    middleBtn = document.createElement('button');
    lastBtn = document.createElement('button');
    firstBtn.focus = vi.fn();
    middleBtn.focus = vi.fn();
    lastBtn.focus = vi.fn();
    dialogEl.appendChild(firstBtn);
    dialogEl.appendChild(middleBtn);
    dialogEl.appendChild(lastBtn);

    (component as any).setupFocusTrap();
  });

  it('Tab on middle element does not wrap (no preventDefault called)', () => {
    Object.defineProperty(dialogEl.ownerDocument, 'activeElement', {
      value: middleBtn,
      configurable: true,
    });

    const ev = { key: 'Tab', shiftKey: false, preventDefault: vi.fn() };
    (component as any).focusTrapHandler(ev);

    expect(ev.preventDefault).not.toHaveBeenCalled();
    expect(firstBtn.focus).not.toHaveBeenCalled();
    expect(lastBtn.focus).not.toHaveBeenCalled();
  });

  it('Shift+Tab on middle element does not wrap', () => {
    Object.defineProperty(dialogEl.ownerDocument, 'activeElement', {
      value: middleBtn,
      configurable: true,
    });

    const ev = { key: 'Tab', shiftKey: true, preventDefault: vi.fn() };
    (component as any).focusTrapHandler(ev);

    expect(ev.preventDefault).not.toHaveBeenCalled();
    expect(lastBtn.focus).not.toHaveBeenCalled();
  });
});

// ── openChanged(true) ─────────────────────────────────────────────────────────

describe('io-modal — openChanged(true)', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;
  let container: HTMLDivElement;
  let modalEl: HTMLElement;

  beforeEach(() => {
    component = makeModal();

    container = document.createElement('div');
    modalEl = document.createElement('io-modal');
    const sibling = document.createElement('div');
    container.appendChild(sibling);
    container.appendChild(modalEl);
    document.body.appendChild(container);

    (component as any).el = modalEl;
    (component as any).inertElements = [];

    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('stores the focusTrigger as the currently focused element', () => {
    const triggerBtn = document.createElement('button');
    document.body.appendChild(triggerBtn);
    triggerBtn.focus();

    (component as any).openChanged(true);

    expect((component as any).focusTrigger).toBeDefined();
    document.body.removeChild(triggerBtn);
  });

  it('calls showModal when dialog is not already open', () => {
    dialogEl.open = false;
    (component as any).openChanged(true);
    expect(dialogEl.showModal).toHaveBeenCalled();
  });

  it('does not call showModal when dialog is already open', () => {
    dialogEl.open = true;
    (component as any).openChanged(true);
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('calls applyBackgroundInert', () => {
    const inertSpy = vi.spyOn(component as any, 'applyBackgroundInert');
    (component as any).openChanged(true);
    expect(inertSpy).toHaveBeenCalled();
  });

  it('calls setupFocusTrap', () => {
    const trapSpy = vi.spyOn(component as any, 'setupFocusTrap');
    (component as any).openChanged(true);
    expect(trapSpy).toHaveBeenCalled();
  });

  it('does nothing when dialogEl is undefined', () => {
    (component as any).dialogEl = undefined;
    expect(() => (component as any).openChanged(true)).not.toThrow();
  });
});

// ── openChanged(false) ────────────────────────────────────────────────────────

describe('io-modal — openChanged(false)', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;
  let container: HTMLDivElement;

  beforeEach(() => {
    component = makeModal();

    container = document.createElement('div');
    const modalEl = document.createElement('io-modal');
    container.appendChild(modalEl);
    document.body.appendChild(container);

    (component as any).el = modalEl;
    (component as any).inertElements = [];

    dialogEl = makeDialogEl();
    dialogEl.open = true;
    (component as any).dialogEl = dialogEl;
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('calls dialog.close when dialog is open', () => {
    (component as any).openChanged(false);
    expect(dialogEl.close).toHaveBeenCalled();
  });

  it('does not call dialog.close when dialog is already closed', () => {
    dialogEl.open = false;
    (component as any).openChanged(false);
    expect(dialogEl.close).not.toHaveBeenCalled();
  });

  it('calls clearFocusTrap', () => {
    const clearSpy = vi.spyOn(component as any, 'clearFocusTrap');
    (component as any).openChanged(false);
    expect(clearSpy).toHaveBeenCalled();
  });

  it('calls removeBackgroundInert', () => {
    const removeSpy = vi.spyOn(component as any, 'removeBackgroundInert');
    (component as any).openChanged(false);
    expect(removeSpy).toHaveBeenCalled();
  });

  it('emits dismiss event', () => {
    const emitSpy = (component as any).dismissEvent.emit as ReturnType<typeof vi.fn>;
    (component as any).openChanged(false);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('restores focus to focusTrigger (HTMLElement)', () => {
    const triggerBtn = document.createElement('button');
    triggerBtn.focus = vi.fn();
    (component as any).focusTrigger = triggerBtn;

    (component as any).openChanged(false);

    expect(triggerBtn.focus).toHaveBeenCalled();
  });

  it('does not throw when focusTrigger is undefined', () => {
    (component as any).focusTrigger = undefined;
    expect(() => (component as any).openChanged(false)).not.toThrow();
  });

  it('does not throw when focusTrigger is not an HTMLElement (e.g. SVGElement)', () => {
    (component as any).focusTrigger = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(() => (component as any).openChanged(false)).not.toThrow();
  });

  it('does nothing when dialogEl is undefined', () => {
    (component as any).dialogEl = undefined;
    expect(() => (component as any).openChanged(false)).not.toThrow();
  });
});

// ── render() with description ─────────────────────────────────────────────────

describe('io-modal — render() description branch', () => {
  it('does not throw when description is set', () => {
    const component = makeModal();
    component.description = 'Confirm deleting this item. This cannot be undone.';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('does not throw when description is undefined', () => {
    const component = makeModal();
    component.description = undefined;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('does not throw with both heading and description set', () => {
    const component = makeModal();
    component.heading = 'Delete item';
    component.description = 'This cannot be undone.';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('does not throw with heading but no description', () => {
    const component = makeModal();
    component.heading = 'Delete item';
    component.description = undefined;
    expect(() => (component as any).render()).not.toThrow();
  });
});

// ── setupFocusTrap: auto-focus first element ──────────────────────────────────

describe('io-modal — setupFocusTrap: auto-focuses first element via setTimeout', () => {
  it('schedules focus on first element when it is not already active', () => {
    vi.useFakeTimers();
    const component = makeModal();
    const dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    btn1.focus = vi.fn();
    dialogEl.appendChild(btn1);
    dialogEl.appendChild(btn2);

    (component as any).setupFocusTrap();
    vi.runAllTimers();

    expect(btn1.focus).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('does not schedule focus when first element is already the active element', () => {
    vi.useFakeTimers();
    const component = makeModal();
    const dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    btn1.focus = vi.fn();
    dialogEl.appendChild(btn1);
    dialogEl.appendChild(btn2);

    // Make btn1 the active element
    Object.defineProperty(dialogEl.ownerDocument, 'activeElement', {
      value: btn1,
      configurable: true,
    });

    (component as any).setupFocusTrap();
    vi.runAllTimers();

    // focus called zero extra times from trap setup
    expect(btn1.focus).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
