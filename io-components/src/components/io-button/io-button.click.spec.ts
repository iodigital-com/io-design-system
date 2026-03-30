import { describe, it, expect, vi } from 'vitest';
import { IoButton } from './io-button';

describe('io-button — click handling', () => {
  let component: IoButton;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeEvent() {
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    return ev;
  }

  beforeEach(() => {
    component = new IoButton();
    (component as any).el = document.createElement('io-button');
    emitMock = vi.fn();
    (component as any).click = { emit: emitMock };
  });

  it('emits click on normal click', () => {
    const ev = makeEvent();
    (component as any).handleClick(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith(ev);
  });

  it('does not emit when disabled', () => {
    component.disabled = true;
    const ev = makeEvent();
    (component as any).handleClick(ev);
    expect(emitMock).not.toHaveBeenCalled();
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(ev.stopPropagation).toHaveBeenCalled();
  });

  it('does not emit when loading', () => {
    component.loading = true;
    const ev = makeEvent();
    (component as any).handleClick(ev);
    expect(emitMock).not.toHaveBeenCalled();
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(ev.stopPropagation).toHaveBeenCalled();
  });

  it('does not emit when both disabled and loading', () => {
    component.disabled = true;
    component.loading = true;
    const ev = makeEvent();
    (component as any).handleClick(ev);
    expect(emitMock).not.toHaveBeenCalled();
  });
});
