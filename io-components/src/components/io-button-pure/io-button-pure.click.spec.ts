import { describe, it, expect, vi } from 'vitest';

import { IoButtonPure } from './io-button-pure';

describe('io-button-pure — click event emission', () => {
  let component: IoButtonPure;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeEvent() {
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    return ev;
  }

  beforeEach(() => {
    component = new IoButtonPure();
    emitMock = vi.fn();
    (component as any).click = { emit: emitMock };
  });

  it('emits click on normal click', () => {
    const ev = makeEvent();
    (component as any).handleClick(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith(ev);
  });

  it('does not emit click when disabled', () => {
    component.disabled = true;
    const ev = makeEvent();
    (component as any).handleClick(ev);
    expect(emitMock).not.toHaveBeenCalled();
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('always calls stopPropagation regardless of disabled state', () => {
    const ev = makeEvent();
    (component as any).handleClick(ev);
    expect(ev.stopPropagation).toHaveBeenCalled();
  });
});
