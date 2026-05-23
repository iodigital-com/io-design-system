import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoAccordion } from './io-accordion';

function makeParent() {
  return {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

function makeEl(parent: ReturnType<typeof makeParent> | null = null) {
  return {
    id: '',
    dispatchEvent: vi.fn(),
    parentElement: parent,
  };
}

function makeComponent(
  props: Partial<IoAccordion> = {},
  parent: ReturnType<typeof makeParent> | null = null,
): IoAccordion {
  const component = new IoAccordion();
  (component as any).update = { emit: vi.fn() };
  (component as any).el = makeEl(parent);
  Object.assign(component, props);
  component.componentWillLoad();
  return component;
}

// ── componentDidLoad ─────────────────────────────────────────────

describe('io-accordion — allowMultiple: componentDidLoad listener', () => {
  it('registers group listener on parent element', () => {
    const parent = makeParent();
    const component = makeComponent({}, parent);
    component.componentDidLoad();
    expect(parent.addEventListener).toHaveBeenCalledWith(
      'accordion-group-open',
      expect.any(Function),
    );
  });

  it('does not throw when parentElement is null', () => {
    const component = makeComponent({}, null);
    expect(() => component.componentDidLoad()).not.toThrow();
  });
});

// ── disconnectedCallback ─────────────────────────────────────────

describe('io-accordion — allowMultiple: disconnectedCallback', () => {
  it('removes the group listener on disconnect', () => {
    const parent = makeParent();
    const component = makeComponent({}, parent);
    component.componentDidLoad();
    component.disconnectedCallback();
    expect(parent.removeEventListener).toHaveBeenCalledWith(
      'accordion-group-open',
      expect.any(Function),
    );
  });

  it('clears groupParent reference on disconnect', () => {
    const parent = makeParent();
    const component = makeComponent({}, parent);
    component.componentDidLoad();
    component.disconnectedCallback();
    expect((component as any).groupParent).toBeNull();
  });

  it('does not throw when disconnected before componentDidLoad', () => {
    const component = makeComponent({}, null);
    // Never called componentDidLoad — groupParent is null
    expect(() => component.disconnectedCallback()).not.toThrow();
  });

  it('is safe to call disconnectedCallback multiple times', () => {
    const parent = makeParent();
    const component = makeComponent({}, parent);
    component.componentDidLoad();
    component.disconnectedCallback();
    // Second call: groupParent is already null — should not throw
    expect(() => component.disconnectedCallback()).not.toThrow();
  });
});

// ── handleGroupOpen ──────────────────────────────────────────────

describe('io-accordion — allowMultiple: handleGroupOpen', () => {
  let component: IoAccordion;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    emitSpy = vi.fn();
    component = new IoAccordion();
    (component as any).update = { emit: emitSpy };
    (component as any).el = makeEl();
    component.componentWillLoad();
  });

  function fireGroupOpen(source: HTMLElement) {
    const event = new CustomEvent('accordion-group-open', {
      detail: { source },
    });
    (component as any).handleGroupOpen(event);
  }

  it('closes and emits when allowMultiple=false and a different source opens', () => {
    component.allowMultiple = false;
    component.open = true;
    const otherEl = document.createElement('div') as unknown as HTMLElement;
    fireGroupOpen(otherEl);
    expect(component.open).toBe(false);
    expect(emitSpy).toHaveBeenCalledWith({ open: false });
  });

  it('does not close when allowMultiple=true', () => {
    component.allowMultiple = true;
    component.open = true;
    const otherEl = document.createElement('div') as unknown as HTMLElement;
    fireGroupOpen(otherEl);
    expect(component.open).toBe(true);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('does not close when source is self (this.el)', () => {
    component.allowMultiple = false;
    component.open = true;
    fireGroupOpen((component as any).el);
    expect(component.open).toBe(true);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('does not emit when already closed', () => {
    component.allowMultiple = false;
    component.open = false;
    const otherEl = document.createElement('div') as unknown as HTMLElement;
    fireGroupOpen(otherEl);
    expect(component.open).toBe(false);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});

// ── toggleSingle group dispatch ──────────────────────────────────

describe('io-accordion — allowMultiple: toggleSingle dispatch', () => {
  let component: IoAccordion;
  let dispatchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoAccordion();
    dispatchSpy = vi.fn();
    (component as any).update = { emit: vi.fn() };
    (component as any).el = { id: '', dispatchEvent: dispatchSpy };
    component.componentWillLoad();
  });

  it('dispatches accordion-group-open when opening regardless of allowMultiple', () => {
    // Dispatch is unconditional on open — receivers decide based on their own allowMultiple.
    (component as any).toggleSingle();
    expect(dispatchSpy).toHaveBeenCalledOnce();
    const event: CustomEvent = dispatchSpy.mock.calls[0][0];
    expect(event.type).toBe('accordion-group-open');
    expect(event.bubbles).toBe(true);
    expect(event.detail.source).toBe((component as any).el);
  });

  it('also dispatches when opening with allowMultiple=true (mixed-mode group support)', () => {
    component.allowMultiple = true;
    (component as any).toggleSingle();
    expect(dispatchSpy).toHaveBeenCalledOnce();
    const event: CustomEvent = dispatchSpy.mock.calls[0][0];
    expect(event.type).toBe('accordion-group-open');
  });

  it('does not dispatch when closing (open goes false)', () => {
    component.open = true;
    (component as any).toggleSingle();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('does not dispatch when disabled', () => {
    component.disabled = true;
    (component as any).toggleSingle();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
