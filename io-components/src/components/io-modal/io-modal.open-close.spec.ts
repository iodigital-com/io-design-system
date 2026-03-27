import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoModal } from './io-modal';

function makeDialogEl() {
  const el = document.createElement('div') as unknown as HTMLDialogElement;
  el.open = false;
  el.showModal = vi.fn(() => { el.open = true; });
  el.close = vi.fn(() => { el.open = false; });
  return el;
}

describe('io-modal — open/close', () => {
  let component: IoModal;
  let ioOpenEmit: ReturnType<typeof vi.fn>;
  let ioCloseEmit: ReturnType<typeof vi.fn>;
  let dialogEl: ReturnType<typeof makeDialogEl>;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    ioOpenEmit = vi.fn();
    ioCloseEmit = vi.fn();
    (component as any).ioOpen = { emit: ioOpenEmit };
    (component as any).ioClose = { emit: ioCloseEmit };
    (component as any).componentWillLoad();
    dialogEl = makeDialogEl();
    (component as any).dialogEl = dialogEl;
  });

  it('show() sets open to true', async () => {
    await component.show();
    expect(component.open).toBe(true);
  });

  it('hide() sets open to false', async () => {
    component.open = true;
    await component.hide();
    expect(component.open).toBe(false);
  });

  it('openChanged(true) calls showModal and emits ioOpen', () => {
    (component as any).openChanged(true);
    expect(dialogEl.showModal).toHaveBeenCalled();
    expect(ioOpenEmit).toHaveBeenCalled();
  });

  it('openChanged(false) calls dialog.close and emits ioClose', () => {
    dialogEl.open = true;
    (component as any).openChanged(false);
    expect(dialogEl.close).toHaveBeenCalled();
    expect(ioCloseEmit).toHaveBeenCalled();
  });

  it('openChanged(true) does not call showModal if dialog is already open', () => {
    dialogEl.open = true;
    (component as any).openChanged(true);
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });
});
