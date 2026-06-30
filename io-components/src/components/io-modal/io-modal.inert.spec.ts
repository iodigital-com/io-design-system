import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoModal } from './io-modal';

function makeDialogEl() {
  const el = document.createElement('div') as unknown as HTMLDialogElement;
  el.open = false;
  el.showModal = vi.fn(() => { el.open = true; });
  el.close = vi.fn(() => { el.open = false; });
  return el;
}

// ── applyBackgroundInert / removeBackgroundInert (preventTopLayer=true, default) ──

describe('io-modal — applyBackgroundInert (preventTopLayer=true): walks document.body.children', () => {
  let component: IoModal;
  let modalEl: HTMLElement;
  let sibling1: HTMLDivElement;
  let sibling2: HTMLDivElement;

  beforeEach(() => {
    component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    (component as any).dialogEl = makeDialogEl();

    sibling1 = document.createElement('div');
    sibling2 = document.createElement('div');
    modalEl = document.createElement('io-modal');

    document.body.appendChild(sibling1);
    document.body.appendChild(modalEl);
    document.body.appendChild(sibling2);

    (component as any).el = modalEl;
    (component as any).inertElements = [];
  });

  afterEach(() => {
    document.body.removeChild(sibling1);
    if (document.body.contains(modalEl)) document.body.removeChild(modalEl);
    if (document.body.contains(sibling2)) document.body.removeChild(sibling2);
    sibling1.removeAttribute('inert');
    sibling2.removeAttribute('inert');
  });

  it('sets inert on document.body children (not just parent siblings)', () => {
    (component as any).applyBackgroundInert();
    expect(sibling1.hasAttribute('inert')).toBe(true);
    expect(sibling2.hasAttribute('inert')).toBe(true);
  });

  it('does not set inert on the modal element itself', () => {
    (component as any).applyBackgroundInert();
    expect(modalEl.hasAttribute('inert')).toBe(false);
  });

  it('does not double-apply inert when element already has inert', () => {
    sibling1.setAttribute('inert', '');
    (component as any).applyBackgroundInert();
    // sibling1 already had inert so it should not be tracked
    expect((component as any).inertElements).not.toContain(sibling1);
  });

  it('honours data-io-allow-during-modal escape hatch — skips those elements', () => {
    sibling1.setAttribute('data-io-allow-during-modal', 'true');
    (component as any).applyBackgroundInert();
    expect(sibling1.hasAttribute('inert')).toBe(false);
    expect(sibling2.hasAttribute('inert')).toBe(true);
  });

  it('skips ancestor elements that contain io-modal — prevents footer buttons from becoming inert (#1180)', () => {
    // Simulate React/Vue/Angular where io-modal is nested inside a framework root div
    const frameworkRoot = document.createElement('div');
    // Move modalEl from body into frameworkRoot, make frameworkRoot the body child
    document.body.removeChild(modalEl);
    frameworkRoot.appendChild(modalEl);
    document.body.appendChild(frameworkRoot);

    (component as any).el = modalEl;
    (component as any).applyBackgroundInert();

    // The framework root contains io-modal, so it must NOT get inert
    // (making it inert would propagate to io-modal's slotted footer buttons)
    expect(frameworkRoot.hasAttribute('inert')).toBe(false);
    // Other siblings that do NOT contain io-modal still get inert
    expect(sibling1.hasAttribute('inert')).toBe(true);
    expect(sibling2.hasAttribute('inert')).toBe(true);

    document.body.removeChild(frameworkRoot);
    // Restore modalEl for afterEach cleanup
    document.body.appendChild(modalEl);
  });
});

describe('io-modal — removeBackgroundInert', () => {
  let component: IoModal;
  let modalEl: HTMLElement;
  let sibling: HTMLDivElement;

  beforeEach(() => {
    component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    (component as any).dialogEl = makeDialogEl();

    sibling = document.createElement('div');
    modalEl = document.createElement('io-modal');

    document.body.appendChild(sibling);
    document.body.appendChild(modalEl);

    (component as any).el = modalEl;
    (component as any).inertElements = [];
  });

  afterEach(() => {
    if (document.body.contains(sibling)) document.body.removeChild(sibling);
    if (document.body.contains(modalEl)) document.body.removeChild(modalEl);
    sibling.removeAttribute('inert');
  });

  it('removes inert from all tracked elements', () => {
    (component as any).applyBackgroundInert();
    (component as any).removeBackgroundInert();
    expect(sibling.hasAttribute('inert')).toBe(false);
  });

  it('clears the inertElements array', () => {
    (component as any).applyBackgroundInert();
    (component as any).removeBackgroundInert();
    expect((component as any).inertElements).toHaveLength(0);
  });
});

// ── applyBackgroundInert is a no-op when preventTopLayer=false ────────────────

describe('io-modal — applyBackgroundInert is a no-op when preventTopLayer=false', () => {
  it('does not touch any siblings when using native showModal() inertness', () => {
    const component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };

    const sibling = document.createElement('div');
    const modalEl = document.createElement('io-modal');
    document.body.appendChild(sibling);
    document.body.appendChild(modalEl);

    (component as any).el = modalEl;
    (component as any).inertElements = [];
    component.preventTopLayer = false;

    (component as any).componentWillLoad();
    (component as any).applyBackgroundInert();

    expect(sibling.hasAttribute('inert')).toBe(false);
    expect((component as any).inertElements).toHaveLength(0);

    document.body.removeChild(sibling);
    document.body.removeChild(modalEl);
  });
});

// ── setupFocusTrap / clearFocusTrap ──────────────────────────────────────────

describe('io-modal — setupFocusTrap / clearFocusTrap', () => {
  let component: IoModal;
  let dialogEl: ReturnType<typeof makeDialogEl>;

  beforeEach(() => {
    component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).el = document.createElement('io-modal');
    (component as any).inertElements = [];
    (component as any).componentWillLoad();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;
  });

  it('setupFocusTrap is a no-op when no focusable elements are in dialog', () => {
    expect(() => (component as any).setupFocusTrap()).not.toThrow();
    expect((component as any).focusTrapHandler).toBeUndefined();
  });

  it('setupFocusTrap registers a keydown listener when multiple focusable elements exist', () => {
    const addListenerSpy = vi.spyOn(dialogEl, 'addEventListener');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    dialogEl.appendChild(btn1);
    dialogEl.appendChild(btn2);

    (component as any).setupFocusTrap();

    expect(addListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('setupFocusTrap does not register listener when only one focusable element', () => {
    const addListenerSpy = vi.spyOn(dialogEl, 'addEventListener');
    const btn = document.createElement('button');
    dialogEl.appendChild(btn);

    (component as any).setupFocusTrap();

    expect(addListenerSpy).not.toHaveBeenCalled();
  });

  it('clearFocusTrap removes keydown listener', () => {
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    dialogEl.appendChild(btn1);
    dialogEl.appendChild(btn2);

    const removeListenerSpy = vi.spyOn(dialogEl, 'removeEventListener');
    (component as any).setupFocusTrap();
    (component as any).clearFocusTrap();

    expect(removeListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect((component as any).focusTrapHandler).toBeUndefined();
  });

  it('clearFocusTrap is a no-op when no handler is registered', () => {
    expect(() => (component as any).clearFocusTrap()).not.toThrow();
  });

  it('picks up contenteditable elements as focusable (#1083)', () => {
    const addListenerSpy = vi.spyOn(dialogEl, 'addEventListener');
    const editable = document.createElement('div');
    editable.setAttribute('contenteditable', 'true');
    const btn = document.createElement('button');
    dialogEl.appendChild(btn);
    dialogEl.appendChild(editable);

    (component as any).setupFocusTrap();

    expect(addListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('picks up summary elements as focusable (#1083)', () => {
    const addListenerSpy = vi.spyOn(dialogEl, 'addEventListener');
    const summary = document.createElement('summary');
    const btn = document.createElement('button');
    dialogEl.appendChild(btn);
    dialogEl.appendChild(summary);

    (component as any).setupFocusTrap();

    expect(addListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});

describe('io-modal — disconnectedCallback', () => {
  it('calls clearFocusTrap and removeBackgroundInert', () => {
    const component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).el = document.createElement('io-modal');
    (component as any).inertElements = [];
    (component as any).componentWillLoad();
    (component as any).dialogEl = makeDialogEl();

    const clearTrapSpy = vi.spyOn(component as any, 'clearFocusTrap');
    const removeInertSpy = vi.spyOn(component as any, 'removeBackgroundInert');

    component.disconnectedCallback();

    expect(clearTrapSpy).toHaveBeenCalled();
    expect(removeInertSpy).toHaveBeenCalled();
  });
});

describe('io-modal — handleCancel', () => {
  it('handleCancel prevents default and sets open=false', () => {
    const component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).el = document.createElement('io-modal');
    (component as any).inertElements = [];
    (component as any).componentWillLoad();
    (component as any).dialogEl = makeDialogEl();
    component.open = true;

    const ev = { preventDefault: vi.fn() } as unknown as Event;
    (component as any).handleCancel(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(component.open).toBe(false);
  });
});

describe('io-modal — focus restoration on close', () => {
  it('restores focus to the element that triggered the modal', () => {
    const component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };
    const modalEl = document.createElement('io-modal');
    const parent = document.createElement('div');
    parent.appendChild(modalEl);
    document.body.appendChild(parent);
    (component as any).el = modalEl;
    (component as any).inertElements = [];
    (component as any).componentWillLoad();

    const dialogEl = makeDialogEl();
    dialogEl.open = true;
    (component as any).dialogEl = dialogEl;

    const triggerBtn = document.createElement('button');
    triggerBtn.focus = vi.fn();
    (component as any).focusTrigger = triggerBtn;

    (component as any).openChanged(false);

    expect(triggerBtn.focus).toHaveBeenCalled();

    document.body.removeChild(parent);
  });
});

describe('io-modal — closeOnBackdrop=false', () => {
  it('backdrop click does not close when closeOnBackdrop=false', () => {
    const component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).el = document.createElement('io-modal');
    (component as any).inertElements = [];
    (component as any).componentWillLoad();
    component.open = true;
    component.closeOnBackdrop = false;

    const dialogEl = makeDialogEl();
    dialogEl.open = true;
    (component as any).dialogEl = dialogEl;

    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100, right: 400, top: 100, bottom: 400,
      width: 300, height: 300, x: 100, y: 100, toJSON: () => ({}),
    });

    const ev = { clientX: 10, clientY: 10, currentTarget: dialogEl } as unknown as MouseEvent;
    (component as any).handleDialogClick(ev);

    expect(component.open).toBe(true);
  });
});

describe('io-modal — render() branch coverage', () => {
  it('render() with heading does not throw', () => {
    const c = new IoModal();
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).el = document.createElement('io-modal');
    (c as any).inertElements = [];
    c.heading = 'Delete item';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with description does not throw', () => {
    const c = new IoModal();
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).el = document.createElement('io-modal');
    (c as any).inertElements = [];
    c.description = 'This action cannot be undone';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() without heading does not throw', () => {
    const c = new IoModal();
    (c as any).dismissEvent = { emit: vi.fn() };
    (c as any).el = document.createElement('io-modal');
    (c as any).inertElements = [];
    c.heading = undefined;
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() size variants do not throw', () => {
    (['sm', 'md', 'lg'] as const).forEach(size => {
      const c = new IoModal();
      (c as any).dismissEvent = { emit: vi.fn() };
      (c as any).el = document.createElement('io-modal');
      (c as any).inertElements = [];
      c.size = size;
      (c as any).componentWillLoad();
      expect(() => (c as any).render()).not.toThrow();
    });
  });
});
