import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoModal } from './io-modal';

describe('io-modal — click handling', () => {
  let component: IoModal;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    component.open = true;

    const dialogEl = document.createElement('div') as unknown as HTMLDialogElement;
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
    const dialogEl = (component as any).dialogEl as HTMLDialogElement;
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

  it('inside click does not close the modal', () => {
    const dialogEl = (component as any).dialogEl as HTMLDialogElement;
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
});

describe('io-modal — motion lifecycle events', () => {
  let component: IoModal;
  let dialogEl: HTMLElement;
  let motionVisibleEmit: ReturnType<typeof vi.fn>;
  let motionHiddenEmit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    motionVisibleEmit = vi.fn();
    motionHiddenEmit = vi.fn();
    (component as any).motionVisibleEndEvent = { emit: motionVisibleEmit };
    (component as any).motionHiddenEndEvent = { emit: motionHiddenEmit };
    (component as any).componentWillLoad();

    dialogEl = document.createElement('div');
    (dialogEl as unknown as HTMLDialogElement).open = true;
    (dialogEl as unknown as HTMLDialogElement).showModal = vi.fn();
    (dialogEl as unknown as HTMLDialogElement).close = vi.fn();
    (component as any).dialogEl = dialogEl;
  });

  afterEach(() => {
    (component as any).detachTransitionEndListener?.();
  });

  it('emits motionVisibleEnd when transitionend fires while open', () => {
    component.open = true;
    (component as any).attachTransitionEndListener();

    const event = new Event('transitionend');
    dialogEl.dispatchEvent(event);

    expect(motionVisibleEmit).toHaveBeenCalledTimes(1);
    expect(motionHiddenEmit).not.toHaveBeenCalled();
  });

  it('emits motionHiddenEnd when transitionend fires while closed', () => {
    component.open = false;
    (component as any).attachTransitionEndListener();

    const event = new Event('transitionend');
    dialogEl.dispatchEvent(event);

    expect(motionHiddenEmit).toHaveBeenCalledTimes(1);
    expect(motionVisibleEmit).not.toHaveBeenCalled();
  });

  it('does not emit after detachTransitionEndListener is called', () => {
    component.open = true;
    (component as any).attachTransitionEndListener();
    (component as any).detachTransitionEndListener();

    const event = new Event('transitionend');
    dialogEl.dispatchEvent(event);

    expect(motionVisibleEmit).not.toHaveBeenCalled();
    expect(motionHiddenEmit).not.toHaveBeenCalled();
  });

  it('attachTransitionEndListener is a no-op when dialogEl is absent', () => {
    (component as any).dialogEl = undefined;
    expect(() => (component as any).attachTransitionEndListener()).not.toThrow();
  });
});
