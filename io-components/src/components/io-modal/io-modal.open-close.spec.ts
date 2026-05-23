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

  it('openChanged(false) emits dismiss even if dialog is already closed', () => {
    dialogEl.open = false;
    (component as any).openChanged(false);
    expect(dialogEl.close).not.toHaveBeenCalled();
    expect(ioDismissEmit).toHaveBeenCalled();
  });

  it('openChanged(true) does not call showModal if dialog is already open', () => {
    dialogEl.open = true;
    (component as any).openChanged(true);
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('clears focus trap listener on close', () => {
    const removeListenerSpy = vi.spyOn(dialogEl, 'removeEventListener');
    (component as any).focusTrapHandler = vi.fn();
    dialogEl.open = true;

    (component as any).openChanged(false);

    expect(removeListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect((component as any).focusTrapHandler).toBeUndefined();
  });

  // ── @Method show() / close() ──────────────────────────────────

  // @Watch is not auto-invoked in unit tests (Stencil decorator mock).
  // We verify that each method sets the prop correctly, then call
  // openChanged manually to confirm the side-effect chain still fires.

  it('show() sets open prop to true', async () => {
    component.open = false;
    await component.show();
    expect(component.open).toBe(true);
  });

  it('show() triggers showModal when openChanged is propagated', async () => {
    component.open = false;
    await component.show();
    // Simulate @Watch propagation
    (component as any).openChanged(component.open);
    expect(dialogEl.showModal).toHaveBeenCalled();
  });

  it('show() is a no-op when already open (prop stays true, openChanged not triggered)', async () => {
    component.open = true;
    dialogEl.open = true;
    await component.show();
    // prop unchanged — the guard prevents the assignment
    expect(component.open).toBe(true);
    expect(dialogEl.showModal).not.toHaveBeenCalled();
  });

  it('close() sets open prop to false', async () => {
    component.open = true;
    await component.close();
    expect(component.open).toBe(false);
  });

  it('close() triggers dismiss when openChanged is propagated', async () => {
    component.open = true;
    dialogEl.open = true;
    await component.close();
    // Simulate @Watch propagation
    (component as any).openChanged(component.open);
    expect(ioDismissEmit).toHaveBeenCalled();
  });

  it('close() is a no-op when already closed', async () => {
    component.open = false;
    await component.close();
    expect(ioDismissEmit).not.toHaveBeenCalled();
  });

  it('componentDidLoad applies modal setup when initially open', () => {
    const inertSpy = vi.spyOn(component as any, 'applyBackgroundInert');
    const focusTrapSpy = vi.spyOn(component as any, 'setupFocusTrap');
    component.open = true;
    dialogEl.open = false;

    component.componentDidLoad();

    expect(dialogEl.showModal).toHaveBeenCalled();
    expect(inertSpy).toHaveBeenCalled();
    expect(focusTrapSpy).toHaveBeenCalled();
  });
});
