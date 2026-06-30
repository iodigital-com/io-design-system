import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoAccordion } from './io-accordion';

describe('io-accordion — keyboard activation', () => {
  let component: IoAccordion;
  let updateEmitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoAccordion();
    (component as any).el = document.createElement('io-accordion');
    updateEmitMock = vi.fn();
    (component as any).update = { emit: updateEmitMock };
    component.open = false;
    component.disabled = false;
  });

  it('toggleSingle opens accordion when closed', () => {
    (component as any).toggleSingle();
    expect(component.open).toBe(true);
    expect(updateEmitMock).toHaveBeenCalledWith({ open: true });
  });

  it('toggleSingle closes accordion when open', () => {
    component.open = true;
    (component as any).toggleSingle();
    expect(component.open).toBe(false);
    expect(updateEmitMock).toHaveBeenCalledWith({ open: false });
  });

  it('toggleSingle does not toggle when disabled', () => {
    component.disabled = true;
    (component as any).toggleSingle();
    expect(component.open).toBe(false);
    expect(updateEmitMock).not.toHaveBeenCalled();
  });

  it('toggleSingle does not close when already open and disabled', () => {
    component.open = true;
    component.disabled = true;
    (component as any).toggleSingle();
    expect(component.open).toBe(true);
    expect(updateEmitMock).not.toHaveBeenCalled();
  });

  it('update event carries the new open state on toggle', () => {
    (component as any).toggleSingle();
    expect(updateEmitMock).toHaveBeenCalledTimes(1);
    expect(updateEmitMock).toHaveBeenCalledWith({ open: true });

    (component as any).toggleSingle();
    expect(updateEmitMock).toHaveBeenCalledTimes(2);
    expect(updateEmitMock).toHaveBeenCalledWith({ open: false });
  });
});

// ── ArrowUp / ArrowDown / Home / End keyboard navigation ────────────────────

describe('io-accordion — ArrowDown/ArrowUp/Home/End navigation', () => {
  function makeGroup(count = 3, disabledIndexes: number[] = []) {
    const parent = document.createElement('div');
    const accordions: IoAccordion[] = [];

    for (let i = 0; i < count; i++) {
      const component = new IoAccordion();
      const el = document.createElement('io-accordion') as HTMLElement;
      if (disabledIndexes.includes(i)) {
        el.setAttribute('disabled', '');
        component.disabled = true;
      }
      (component as any).el = el;
      (component as any).update = { emit: vi.fn() };
      parent.appendChild(el);
      accordions.push(component);
    }

    return { parent, accordions };
  }

  function fireKeyDown(component: IoAccordion, key: string) {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    (component as any).handleTriggerKeyDown(event);
    return event;
  }

  it('does not call preventDefault for non-navigation keys', () => {
    const { accordions } = makeGroup(3);
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    const spy = vi.spyOn(event, 'preventDefault');
    (accordions[0] as any).handleTriggerKeyDown(event);
    expect(spy).not.toHaveBeenCalled();
  });

  it('calls preventDefault for ArrowDown', () => {
    const { accordions } = makeGroup(3);
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
    const spy = vi.spyOn(event, 'preventDefault');
    (accordions[0] as any).handleTriggerKeyDown(event);
    expect(spy).toHaveBeenCalled();
  });

  it('calls preventDefault for Home and End', () => {
    const { accordions } = makeGroup(3);
    ['Home', 'End'].forEach((key) => {
      const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
      const spy = vi.spyOn(event, 'preventDefault');
      (accordions[1] as any).handleTriggerKeyDown(event);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('does not throw when host has no parent (solo accordion)', () => {
    const component = new IoAccordion();
    const el = document.createElement('io-accordion');
    (component as any).el = el;
    (component as any).update = { emit: vi.fn() };
    expect(() => fireKeyDown(component, 'ArrowDown')).not.toThrow();
  });

  /**
   * jsdom's real HTMLElement has `shadowRoot` as a getter-only property,
   * so we cannot assign to it directly. Use Object.defineProperty to
   * install a mock shadowRoot on the target element.
   */
  function mockShadowRoot(el: HTMLElement, btn: HTMLButtonElement) {
    Object.defineProperty(el, 'shadowRoot', {
      get: () => ({ querySelector: () => btn }),
      configurable: true,
    });
  }

  it('ArrowDown moves focus to next sibling', () => {
    const { accordions } = makeGroup(3);
    const a2el = (accordions[1] as any).el as HTMLElement;
    const btn = document.createElement('button');
    const focusSpy = vi.spyOn(btn, 'focus');
    mockShadowRoot(a2el, btn);

    fireKeyDown(accordions[0], 'ArrowDown');
    expect(focusSpy).toHaveBeenCalled();
  });

  it('ArrowUp moves focus to previous sibling', () => {
    const { accordions } = makeGroup(3);
    const a1el = (accordions[0] as any).el as HTMLElement;
    const btn = document.createElement('button');
    const focusSpy = vi.spyOn(btn, 'focus');
    mockShadowRoot(a1el, btn);

    fireKeyDown(accordions[1], 'ArrowUp');
    expect(focusSpy).toHaveBeenCalled();
  });

  it('Home focuses first sibling', () => {
    const { accordions } = makeGroup(3);
    const a1el = (accordions[0] as any).el as HTMLElement;
    const btn = document.createElement('button');
    const focusSpy = vi.spyOn(btn, 'focus');
    mockShadowRoot(a1el, btn);

    fireKeyDown(accordions[2], 'Home');
    expect(focusSpy).toHaveBeenCalled();
  });

  it('End focuses last sibling', () => {
    const { accordions } = makeGroup(3);
    const a3el = (accordions[2] as any).el as HTMLElement;
    const btn = document.createElement('button');
    const focusSpy = vi.spyOn(btn, 'focus');
    mockShadowRoot(a3el, btn);

    fireKeyDown(accordions[0], 'End');
    expect(focusSpy).toHaveBeenCalled();
  });

  it('ArrowDown skips disabled siblings', () => {
    // Accordions: [0=enabled, 1=disabled, 2=enabled]
    const { accordions } = makeGroup(3, [1]);
    const a3el = (accordions[2] as any).el as HTMLElement;
    const btn = document.createElement('button');
    const focusSpy = vi.spyOn(btn, 'focus');
    mockShadowRoot(a3el, btn);

    fireKeyDown(accordions[0], 'ArrowDown');
    expect(focusSpy).toHaveBeenCalled();
  });

  it('ArrowUp skips disabled siblings', () => {
    // Accordions: [0=enabled, 1=disabled, 2=enabled]
    const { accordions } = makeGroup(3, [1]);
    const a1el = (accordions[0] as any).el as HTMLElement;
    const btn = document.createElement('button');
    const focusSpy = vi.spyOn(btn, 'focus');
    mockShadowRoot(a1el, btn);

    fireKeyDown(accordions[2], 'ArrowUp');
    expect(focusSpy).toHaveBeenCalled();
  });

  it('ArrowDown at last sibling does not wrap', () => {
    const { accordions } = makeGroup(3);
    // Should not throw or focus anything
    expect(() => fireKeyDown(accordions[2], 'ArrowDown')).not.toThrow();
  });

  it('ArrowUp at first sibling does not wrap', () => {
    const { accordions } = makeGroup(3);
    expect(() => fireKeyDown(accordions[0], 'ArrowUp')).not.toThrow();
  });
});
