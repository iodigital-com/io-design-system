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
