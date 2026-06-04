import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoRadio } from './io-radio';

describe('io-radio — event behavior', () => {
  let component: IoRadio;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(checked: boolean): Event {
    const input = document.createElement('input');
    input.type = 'radio';
    input.checked = checked;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });
    return ev;
  }

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.value = 'test-value';
  });

  it('emits change when radio is selected', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ value: 'test-value' });
  });

  it('emits change when radio is deselected', () => {
    component.checked = true;
    const ev = makeChangeEvent(false);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ value: 'test-value' });
  });

  it('updates checked prop on change', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(true);
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
