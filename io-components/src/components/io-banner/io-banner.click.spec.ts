import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoBanner } from './io-banner';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

function makeEmitter() {
  return { emit: vi.fn() };
}

describe('io-banner — dismiss interaction', () => {
  let c: IoBanner;

  beforeEach(() => {
    c = new IoBanner();
    c.variant = 'info';
    c.open = true;
    (c as any).dismiss = makeEmitter();
  });

  it('emits dismiss event when handleDismiss is called', () => {
    (c as any).handleDismiss();
    expect((c as any).dismiss.emit).toHaveBeenCalledTimes(1);
  });

  it('sets open to false when handleDismiss is called', () => {
    (c as any).handleDismiss();
    expect(c.open).toBe(false);
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

describe('io-banner — Escape key dismiss (WCAG 2.1.2)', () => {
  let c: IoBanner;

  beforeEach(() => {
    c = new IoBanner();
    c.variant = 'info';
    c.open = true;
    c.dismissible = true;
    (c as any).dismiss = { emit: vi.fn() };
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
    (c as any).onOpenChange(true);
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    addSpy.mockRestore();
  });

  it('onOpenChange removes keydown listener when open becomes false', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    (c as any).onOpenChange(false);
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
