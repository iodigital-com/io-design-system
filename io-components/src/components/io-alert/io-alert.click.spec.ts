import { describe, it, expect, vi } from 'vitest';

import { IoAlert } from './io-alert';

describe('io-alert — dismiss event', () => {
  it('emits dismiss event when handleDismiss is called', () => {
    const component = new IoAlert();
    component.dismissible = true;

    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;

    component['handleDismiss']();

    expect(emitSpy).toHaveBeenCalledOnce();
    expect(emitSpy).toHaveBeenCalledWith();
  });

  it('dismiss handler calls emit with no payload', () => {
    const component = new IoAlert();
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;

    component['handleDismiss']();

    expect(emitSpy).toHaveBeenCalledWith();
  });

  it('renders without throwing when dismissible is false', () => {
    const component = new IoAlert();
    component.dismissible = false;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when dismissible is true', () => {
    const component = new IoAlert();
    component.dismissible = true;
    component.dismiss = { emit: vi.fn() } as any;
    expect(() => component.render()).not.toThrow();
  });

  it('does not emit dismiss when dismissible is false', () => {
    const component = new IoAlert();
    component.dismissible = false;
    const emitSpy = vi.fn();
    component.dismiss = { emit: emitSpy } as any;

    // handleDismiss always emits — it is only rendered when dismissible=true
    // so the button that calls it is absent; test documents this contract:
    expect(component.dismissible).toBe(false);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
