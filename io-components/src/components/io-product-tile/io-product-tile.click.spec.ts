import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoProductTile } from './io-product-tile';

describe('io-product-tile — like event', () => {
  let component: IoProductTile;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoProductTile();
    (component as any).el = document.createElement('io-product-tile');
    emitMock = vi.fn();
    (component as any).likeEvent = { emit: emitMock };
  });

  function makeMouseEvent() {
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    return ev;
  }

  it('emits like event with true on first click (not liked)', () => {
    component.liked = false;
    const ev = makeMouseEvent();
    (component as any).handleLikeClick(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith(true);
  });

  it('emits like event with false on click when already liked', () => {
    component.liked = true;
    const ev = makeMouseEvent();
    (component as any).handleLikeClick(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith(false);
  });

  it('toggles liked state after handleLikeClick', () => {
    component.liked = false;
    (component as any).handleLikeClick(makeMouseEvent());
    expect(component.liked).toBe(true);
    (component as any).handleLikeClick(makeMouseEvent());
    expect(component.liked).toBe(false);
  });

  it('calls preventDefault on like click to prevent navigation when tile is linked', () => {
    component.liked = false;
    const ev = makeMouseEvent();
    (component as any).handleLikeClick(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('calls stopPropagation on like click', () => {
    component.liked = false;
    const ev = makeMouseEvent();
    (component as any).handleLikeClick(ev);
    expect(ev.stopPropagation).toHaveBeenCalled();
  });

  it('emits successive like events with alternating values', () => {
    component.liked = false;
    (component as any).handleLikeClick(makeMouseEvent());
    (component as any).handleLikeClick(makeMouseEvent());
    (component as any).handleLikeClick(makeMouseEvent());
    expect(emitMock).toHaveBeenCalledTimes(3);
    expect(emitMock.mock.calls[0][0]).toBe(true);
    expect(emitMock.mock.calls[1][0]).toBe(false);
    expect(emitMock.mock.calls[2][0]).toBe(true);
  });
});
