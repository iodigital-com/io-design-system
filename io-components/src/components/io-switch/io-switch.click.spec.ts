import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoSwitch } from './io-switch';

describe('io-switch — event behavior', () => {
  let component: IoSwitch;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(checked: boolean): Event {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });
    return ev;
  }

  beforeEach(() => {
    component = new IoSwitch();
    (component as any).el = document.createElement('io-switch');
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.value = 'on';
  });

  it('emits change when switch is turned on', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checked: true, value: 'on' });
  });

  it('emits change when switch is turned off', () => {
    component.checked = true;
    const ev = makeChangeEvent(false);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checked: false, value: 'on' });
  });

  it('updates checked prop on change', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(true);
  });

  it('emits change with custom value', () => {
    component.value = 'enabled';
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledWith({ checked: true, value: 'enabled' });
  });

  it('does not emit when disabled', () => {
    component.disabled = true;
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('does not mutate checked prop when disabled', () => {
    component.disabled = true;
    component.checked = false;
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(false);
  });
});
