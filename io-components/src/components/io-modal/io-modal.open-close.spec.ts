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
  let ioDismissEmit: ReturnType<typeof vi.fn>;
  let dialogEl: ReturnType<typeof makeDialogEl>;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    ioDismissEmit = vi.fn();
    (component as any).dismissEvent = { emit: ioDismissEmit };
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

  it('openChanged(true) calls showModal', () => {
    (component as any).openChanged(true);
    expect(dialogEl.showModal).toHaveBeenCalled();
  });

  it('openChanged(false) calls dialog.close and emits dismiss', () => {
    dialogEl.open = true;
    (component as any).openChanged(false);
    expect(dialogEl.close).toHaveBeenCalled();
    expect(ioDismissEmit).toHaveBeenCalled();
  });

  it('openChanged(true) does not call showModal if dialog is already open', () => {
    dialogEl.open = true;
    (component as any).openChanged(true);
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });
});
