import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoDrawer } from './io-drawer';

describe('io-drawer — click handling', () => {
  let component: IoDrawer;
  let dialogEl: HTMLDialogElement;

  beforeEach(() => {
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    component.open = true;

    dialogEl = document.createElement('div') as unknown as HTMLDialogElement;
    dialogEl.open = true;
    dialogEl.showModal = vi.fn();
    dialogEl.close = vi.fn(() => {
      dialogEl.open = false;
    });
    (component as any).dialogEl = dialogEl;
  });

  it('close button click sets open to false', () => {
    (component as any).handleCloseClick();
    expect(component.open).toBe(false);
  });

  it('backdrop click sets open to false when closeOnBackdrop is true', () => {
    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 400,
      top: 100,
      bottom: 400,
      width: 300,
      height: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });

    const ev = { clientX: 10, clientY: 10, currentTarget: dialogEl } as unknown as MouseEvent;
    (component as any).handleDialogClick(ev);
    expect(component.open).toBe(false);
  });

  it('backdrop click does not close when closeOnBackdrop is false', () => {
    component.closeOnBackdrop = false;

    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 400,
      top: 100,
      bottom: 400,
      width: 300,
      height: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });

    const ev = { clientX: 10, clientY: 10, currentTarget: dialogEl } as unknown as MouseEvent;
    (component as any).handleDialogClick(ev);
    expect(component.open).toBe(true);
  });

  it('click inside the drawer does not close it', () => {
    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 400,
      top: 100,
      bottom: 400,
      width: 300,
      height: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });

    const ev = { clientX: 200, clientY: 200, currentTarget: dialogEl } as unknown as MouseEvent;
    (component as any).handleDialogClick(ev);
    expect(component.open).toBe(true);
  });

  it('dismiss event is emitted when open changes to false', () => {
    const emit = (component as any).dismissEvent.emit as ReturnType<typeof vi.fn>;
    const mockDialog = {
      open: true,
      showModal: vi.fn(),
      close: vi.fn(),
    };
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    component.open = false;
    (component as any).onOpenChange(false);
    expect(emit).toHaveBeenCalled();
  });

  it('dismiss event is NOT emitted when open changes to true', () => {
    component.open = false;
    const emit = (component as any).dismissEvent.emit as ReturnType<typeof vi.fn>;
    const mockDialog = {
      open: false,
      showModal: vi.fn(),
      close: vi.fn(),
    };
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    (component as any).onOpenChange(true);
    expect(emit).not.toHaveBeenCalled();
  });
});
