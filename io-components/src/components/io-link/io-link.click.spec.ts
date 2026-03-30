import { describe, it, expect, vi } from 'vitest';
import { IoLink } from './io-link';

describe('io-link — click handling', () => {
  let component: IoLink;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeEvent() {
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    return ev;
  }

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
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

  it('external flag is set correctly', () => {
    component.external = true;
    expect(component.external).toBe(true);
  });

  it('external flag defaults to false', () => {
    expect(component.external).toBe(false);
  });
});
