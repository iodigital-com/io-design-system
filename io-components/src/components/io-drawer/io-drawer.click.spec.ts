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

  it('cancels existing animations before showModal so slide-in replays on re-open', () => {
    component.open = false;
    const cancelSpy = vi.fn();
    const mockAnimation = { cancel: cancelSpy };
    const mockDialog = {
      open: false,
      showModal: vi.fn(),
      close: vi.fn(),
      getAnimations: vi.fn().mockReturnValue([mockAnimation]),
    };
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    (component as any).onOpenChange(true);

    expect(mockDialog.getAnimations).toHaveBeenCalled();
    expect(cancelSpy).toHaveBeenCalled();
    expect(mockDialog.showModal).toHaveBeenCalled();
  });
});

describe('io-drawer — swipe-to-dismiss (bottom sheet)', () => {
  let component: IoDrawer;

  beforeEach(() => {
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    component.open = true;
    component.placement = 'bottom';
  });

  it('handleTouchStart records the initial Y coordinate', () => {
    const ev = { touches: [{ clientY: 200 }] } as unknown as TouchEvent;
    (component as any).handleTouchStart(ev);
    expect((component as any).touchStartY).toBe(200);
  });

  it('handleTouchStart defaults to 0 when touches array is empty', () => {
    const ev = { touches: [] } as unknown as TouchEvent;
    (component as any).handleTouchStart(ev);
    expect((component as any).touchStartY).toBe(0);
  });

  it('handleTouchEnd closes drawer when downward swipe exceeds 80px threshold', () => {
    (component as any).touchStartY = 100;
    const ev = { changedTouches: [{ clientY: 181 }] } as unknown as TouchEvent;
    (component as any).handleTouchEnd(ev);
    expect(component.open).toBe(false);
  });

  it('handleTouchEnd closes drawer at exactly 80px threshold', () => {
    (component as any).touchStartY = 100;
    const ev = { changedTouches: [{ clientY: 180 }] } as unknown as TouchEvent;
    (component as any).handleTouchEnd(ev);
    expect(component.open).toBe(false);
  });

  it('handleTouchEnd does NOT close drawer when swipe is below threshold', () => {
    (component as any).touchStartY = 100;
    const ev = { changedTouches: [{ clientY: 179 }] } as unknown as TouchEvent;
    (component as any).handleTouchEnd(ev);
    expect(component.open).toBe(true);
  });

  it('handleTouchEnd does NOT close drawer on upward swipe', () => {
    (component as any).touchStartY = 200;
    const ev = { changedTouches: [{ clientY: 100 }] } as unknown as TouchEvent;
    (component as any).handleTouchEnd(ev);
    expect(component.open).toBe(true);
  });

  it('handleTouchEnd defaults endY to 0 when changedTouches is empty', () => {
    (component as any).touchStartY = 0;
    const ev = { changedTouches: [] } as unknown as TouchEvent;
    (component as any).handleTouchEnd(ev);
    expect(component.open).toBe(true);
  });

  it('handleTouchMove is a no-op (does not throw or change state)', () => {
    const ev = {} as unknown as TouchEvent;
    expect(() => (component as any).handleTouchMove(ev)).not.toThrow();
    expect(component.open).toBe(true);
  });

  it('attachSwipeListeners does nothing when handle element is not found', () => {
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(null) };
    (component as any).el = { shadowRoot };
    expect(() => (component as any).attachSwipeListeners()).not.toThrow();
  });

  it('removeSwipeListeners does nothing when handle element is not found', () => {
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(null) };
    (component as any).el = { shadowRoot };
    expect(() => (component as any).removeSwipeListeners()).not.toThrow();
  });

  it('attachSwipeListeners adds touch event listeners to handle element', () => {
    const addEventListenerSpy = vi.fn();
    const handleEl = { addEventListener: addEventListenerSpy, removeEventListener: vi.fn() };
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(handleEl) };
    (component as any).el = { shadowRoot };

    (component as any).attachSwipeListeners();

    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function), { passive: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function), { passive: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function), { passive: true });
  });

  it('removeSwipeListeners removes touch event listeners from handle element', () => {
    const removeEventListenerSpy = vi.fn();
    const handleEl = {
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerSpy,
    };
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(handleEl) };
    (component as any).el = { shadowRoot };

    (component as any).attachSwipeListeners();
    (component as any).removeSwipeListeners();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
  });

  it('show() attaches swipe listeners for bottom placement', async () => {
    const attachSpy = vi.spyOn(component as any, 'attachSwipeListeners');
    component.open = false;
    component.placement = 'bottom';
    await component.show();
    expect(attachSpy).toHaveBeenCalledTimes(1);
  });

  it('show() does NOT attach swipe listeners for right placement', async () => {
    const attachSpy = vi.spyOn(component as any, 'attachSwipeListeners');
    component.open = false;
    component.placement = 'right';
    await component.show();
    expect(attachSpy).not.toHaveBeenCalled();
  });

  it('close() removes swipe listeners', async () => {
    const removeSpy = vi.spyOn(component as any, 'removeSwipeListeners');
    component.open = true;
    await component.close();
    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});
