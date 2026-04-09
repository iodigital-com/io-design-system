import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoCheckbox } from './io-checkbox';

describe('io-checkbox — event behavior', () => {
  let component: IoCheckbox;
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
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.value = 'test-value';
  });

  it('emits change when checkbox is checked', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checked: true, value: 'test-value' });
  });

  it('emits change when checkbox is unchecked', () => {
    component.checked = true;
    const ev = makeChangeEvent(false);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checked: false, value: 'test-value' });
  });

  it('updates checked prop on change', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(true);
  });

  it('clears indeterminate on change', () => {
    component.indeterminate = true;
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(component.indeterminate).toBe(false);
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

  it('does not clear indeterminate when disabled', () => {
    component.disabled = true;
    component.indeterminate = true;
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(component.indeterminate).toBe(true);
  });
});
