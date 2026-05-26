import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoModal } from './io-modal';

function makeDialogEl() {
  const el = document.createElement('div') as unknown as HTMLDialogElement;
  el.open = false;
  el.showModal = vi.fn(() => { el.open = true; });
  el.close = vi.fn(() => { el.open = false; });
  return el;
}

describe('io-modal — applyBackgroundInert / removeBackgroundInert', () => {
  let component: IoModal;
  let container: HTMLDivElement;
  let modalEl: HTMLElement;

  beforeEach(() => {
    component = new IoModal();
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    (component as any).dialogEl = makeDialogEl();

    container = document.createElement('div');
    const sibling1 = document.createElement('div');
    const sibling2 = document.createElement('div');
    modalEl = document.createElement('io-modal');
    container.appendChild(sibling1);
    container.appendChild(modalEl);
    container.appendChild(sibling2);
    document.body.appendChild(container);

    (component as any).el = modalEl;
    (component as any).inertElements = [];
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('applyBackgroundInert sets inert on sibling elements', () => {
    (component as any).applyBackgroundInert();
    const sibling1 = container.children[0] as HTMLElement;
    const sibling2 = container.children[2] as HTMLElement;
    expect(sibling1.hasAttribute('inert')).toBe(true);
    expect(sibling2.hasAttribute('inert')).toBe(true);
  });

  it('applyBackgroundInert does not set inert on the modal itself', () => {
    (component as any).applyBackgroundInert();
    expect(modalEl.hasAttribute('inert')).toBe(false);
  });

  it('applyBackgroundInert does not double-apply inert', () => {
    const sibling = container.children[0] as HTMLElement;
    sibling.setAttribute('inert', '');
    (component as any).applyBackgroundInert();
    // inertElements should not include sibling that already had inert
    expect((component as any).inertElements).not.toContain(sibling);
  });

  it('removeBackgroundInert removes inert from all tracked siblings', () => {
    (component as any).applyBackgroundInert();
    (component as any).removeBackgroundInert();
    const sibling1 = container.children[0] as HTMLElement;
    const sibling2 = container.children[2] as HTMLElement;
    expect(sibling1.hasAttribute('inert')).toBe(false);
    expect(sibling2.hasAttribute('inert')).toBe(false);
  });

  it('removeBackgroundInert clears the inertElements array', () => {
    (component as any).applyBackgroundInert();
    (component as any).removeBackgroundInert();
    expect((component as any).inertElements).toHaveLength(0);
  });

  it('applyBackgroundInert is a no-op when el has no parentElement', () => {
    const c = new IoModal();
    (c as any).el = document.createElement('io-modal'); // not attached
    (c as any).inertElements = [];
    (c as any).dismissEvent = { emit: vi.fn() };
    expect(() => (c as any).applyBackgroundInert()).not.toThrow();
    expect((c as any).inertElements).toHaveLength(0);
  });
});

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
