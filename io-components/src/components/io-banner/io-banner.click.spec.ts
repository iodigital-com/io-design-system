import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoBanner } from './io-banner';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

function makeEmitter() {
  return { emit: vi.fn() };
}

describe('io-banner — dismiss interaction (issue #1012: double-emit guard)', () => {
  let c: IoBanner;

  beforeEach(() => {
    c = new IoBanner();
    c.variant = 'info';
    c.open = true;
    (c as any).dismiss = makeEmitter();
    (c as any).el = document.createElement('io-banner');
  });

  it('sets _dismissing=true when handleDismiss is called', () => {
    (c as any).handleDismiss();
    expect((c as any)._dismissing).toBe(true);
  });

  it('does NOT emit dismiss immediately (waits for animationend, issue #1012)', () => {
    (c as any).handleDismiss();
    expect((c as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('does not call handleDismiss twice on rapid calls (_dismissing guard)', () => {
    (c as any).handleDismiss();
    expect((c as any)._dismissing).toBe(true);
    // Second call should be ignored
    (c as any).handleDismiss();
    // _dismissing is still true and dismiss has not emitted
    expect((c as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('emits dismiss after animationend on .banner element', () => {
    (c as any).handleDismiss();
    // Simulate animationend on the banner div (exit keyframes)
    const fakeEvent = {
      target: { classList: { contains: (cls: string) => cls === 'banner' } },
    } as unknown as AnimationEvent;
    (c as any).handleAnimationEnd(fakeEvent);
    expect((c as any).dismiss.emit).toHaveBeenCalledTimes(1);
    expect(c.open).toBe(false);
    expect((c as any)._dismissing).toBe(false);
  });

  it('does not emit dismiss on animationend from non-banner element', () => {
    (c as any).handleDismiss();
    const fakeEvent = {
      target: { classList: { contains: (_cls: string) => false } },
    } as unknown as AnimationEvent;
    (c as any).handleAnimationEnd(fakeEvent);
    expect((c as any).dismiss.emit).not.toHaveBeenCalled();
    expect(c.open).toBe(true); // still open
  });

  it('renders dismiss button when dismissible=true', () => {
    c.dismissible = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not render dismiss button when dismissible=false', () => {
    c.dismissible = false;
    hMock.mockClear();
    (c as any).render();
    const buttonCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'button');
    expect(buttonCall).toBeUndefined();
  });
});

describe('io-banner — focus restore to opener (issue #998)', () => {
  let c: IoBanner;

  beforeEach(() => {
    c = new IoBanner();
    c.variant = 'info';
    c.open = true;
    c.dismissible = true;
    (c as any).dismiss = makeEmitter();
    (c as any).el = document.createElement('io-banner');
  });

  it('restores focus to opener on dismiss', () => {
    const openerBtn = document.createElement('button');
    document.body.appendChild(openerBtn);
    openerBtn.focus();
    (c as any)._openerEl = openerBtn;
    const focusSpy = vi.spyOn(openerBtn, 'focus');
    (c as any).handleDismiss();
    expect(focusSpy).toHaveBeenCalledTimes(1);
    document.body.removeChild(openerBtn);
  });

  it('clears _openerEl after focus restore', () => {
    const openerBtn = document.createElement('button');
    document.body.appendChild(openerBtn);
    (c as any)._openerEl = openerBtn;
    (c as any).handleDismiss();
    expect((c as any)._openerEl).toBeNull();
    document.body.removeChild(openerBtn);
  });

  it('does not throw when _openerEl is null', () => {
    (c as any)._openerEl = null;
    expect(() => (c as any).handleDismiss()).not.toThrow();
  });

  it('onOpenChange captures document.activeElement as opener on false→true transition', () => {
    const btn = document.createElement('button');
    document.body.appendChild(btn);
    btn.focus();
    (c as any).onOpenChange(true, false);
    expect((c as any)._openerEl).toBe(document.activeElement);
    document.body.removeChild(btn);
  });

  it('onOpenChange does not re-capture opener when already open (true→true)', () => {
    const existing = document.createElement('button');
    (c as any)._openerEl = existing;
    (c as any).onOpenChange(true, true);
    // existing opener reference should be preserved
    expect((c as any)._openerEl).toBe(existing);
  });
});

describe('io-banner — focus dismiss button on every open (issue #997)', () => {
  let c: IoBanner;

  beforeEach(() => {
    c = new IoBanner();
    c.variant = 'info';
    c.open = true;
    c.dismissible = true;
    (c as any).dismiss = makeEmitter();
  });

  it('_shouldFocusDismiss is set when open && dismissible', () => {
    (c as any).componentWillLoad();
    expect((c as any)._shouldFocusDismiss).toBe(true);
  });

  it('_shouldFocusDismiss is not set when open=false', () => {
    c.open = false;
    (c as any).componentWillLoad();
    expect((c as any)._shouldFocusDismiss).toBe(false);
  });

  it('_shouldFocusDismiss is not set when dismissible=false', () => {
    c.dismissible = false;
    (c as any).componentWillLoad();
    expect((c as any)._shouldFocusDismiss).toBe(false);
  });

  it('onDismissibleChange sets _shouldFocusDismiss when dismissible becomes true on open banner', () => {
    c.open = true;
    const addSpy = vi.spyOn(document, 'addEventListener');
    (c as any).onDismissibleChange(true);
    expect((c as any)._shouldFocusDismiss).toBe(true);
    addSpy.mockRestore();
  });

  it('onDismissibleChange does not set _shouldFocusDismiss when dismissible becomes false', () => {
    c.open = true;
    (c as any)._shouldFocusDismiss = false;
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    (c as any).onDismissibleChange(false);
    expect((c as any)._shouldFocusDismiss).toBe(false);
    removeSpy.mockRestore();
  });

  it('onOpenChange sets _shouldFocusDismiss when banner opens with dismissible=true', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    (c as any).onOpenChange(true, false);
    expect((c as any)._shouldFocusDismiss).toBe(true);
    addSpy.mockRestore();
  });
});

describe('io-banner — Escape key dismiss (WCAG 2.1.2)', () => {
  let c: IoBanner;

  beforeEach(() => {
    c = new IoBanner();
    c.variant = 'info';
    c.open = true;
    c.dismissible = true;
    (c as any).dismiss = { emit: vi.fn() };
    (c as any).el = document.createElement('io-banner');
  });

  it('handleKeyDown calls handleDismiss when key is Escape', () => {
    const spy = vi.spyOn(c as any, 'handleDismiss');
    (c as any).handleKeyDown({ key: 'Escape' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('handleKeyDown does not call handleDismiss for other keys', () => {
    const spy = vi.spyOn(c as any, 'handleDismiss');
    (c as any).handleKeyDown({ key: 'Enter' });
    (c as any).handleKeyDown({ key: 'Tab' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('handleKeyDown does not call handleDismiss when dismissible=false', () => {
    c.dismissible = false;
    const spy = vi.spyOn(c as any, 'handleDismiss');
    (c as any).handleKeyDown({ key: 'Escape' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('rapid Escape presses only emit dismiss once (_dismissing guard, issue #1012)', () => {
    (c as any).handleKeyDown({ key: 'Escape' });
    (c as any).handleKeyDown({ key: 'Escape' });
    (c as any).handleKeyDown({ key: 'Escape' });
    // Simulate animationend to complete dismiss
    const fakeEvent = {
      target: { classList: { contains: (cls: string) => cls === 'banner' } },
    } as unknown as AnimationEvent;
    (c as any).handleAnimationEnd(fakeEvent);
    expect((c as any).dismiss.emit).toHaveBeenCalledTimes(1);
  });

  it('onDismissibleChange attaches listener when banner is open and dismissible becomes true', () => {
    c.open = true;
    const addSpy = vi.spyOn(document, 'addEventListener');
    (c as any).onDismissibleChange(true);
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    addSpy.mockRestore();
  });

  it('onDismissibleChange removes listener when banner is open and dismissible becomes false', () => {
    c.open = true;
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    (c as any).onDismissibleChange(false);
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('onOpenChange attaches keydown listener when open becomes true and dismissible', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    (c as any).onOpenChange(true, false);
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    addSpy.mockRestore();
  });

  it('onOpenChange removes keydown listener when open becomes false', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    (c as any).onOpenChange(false, true);
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('disconnectedCallback removes keydown listener', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    (c as any).disconnectedCallback?.();
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('connectedCallback attaches listener when open and dismissible', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    c.open = true;
    c.dismissible = true;
    (c as any).connectedCallback?.();
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    addSpy.mockRestore();
  });
});
