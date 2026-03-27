import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoModal } from './io-modal';

describe('io-modal — keyboard / cancel event', () => {
  let component: IoModal;
  let ioCloseEmit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    ioCloseEmit = vi.fn();
    (component as any).ioOpen = { emit: vi.fn() };
    (component as any).ioClose = { emit: ioCloseEmit };
    (component as any).componentWillLoad();

    const dialogEl = document.createElement('div') as unknown as HTMLDialogElement;
    dialogEl.open = true;
    dialogEl.showModal = vi.fn();
    dialogEl.close = vi.fn(() => { dialogEl.open = false; });
    (component as any).dialogEl = dialogEl;

    component.open = true;
  });

  it('cancel event (ESC) sets open to false', () => {
    const cancelEvent = new Event('cancel', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(cancelEvent, 'preventDefault');
    (component as any).handleCancel(cancelEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.open).toBe(false);
  });

  it('close button click sets open to false', () => {
    (component as any).handleCloseClick();
    expect(component.open).toBe(false);
  });

  it('backdrop click sets open to false when closeOnBackdrop is true', () => {
    const dialogEl = (component as any).dialogEl as HTMLDialogElement;
    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100, right: 400, top: 100, bottom: 400,
      width: 300, height: 300, x: 100, y: 100, toJSON: () => ({}),
    });

    // Click outside the dialog bounds (backdrop area)
    const ev = { clientX: 10, clientY: 10, currentTarget: dialogEl } as unknown as MouseEvent;
    (component as any).handleDialogClick(ev);
    expect(component.open).toBe(false);
  });

  it('click inside dialog does not close when closeOnBackdrop is true', () => {
    const dialogEl = (component as any).dialogEl as HTMLDialogElement;
    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100, right: 400, top: 100, bottom: 400,
      width: 300, height: 300, x: 100, y: 100, toJSON: () => ({}),
    });

    const ev = { clientX: 200, clientY: 200, currentTarget: dialogEl } as unknown as MouseEvent;
    (component as any).handleDialogClick(ev);
    expect(component.open).toBe(true);
  });
});
