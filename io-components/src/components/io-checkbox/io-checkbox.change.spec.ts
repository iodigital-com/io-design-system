import { describe, it, expect, vi } from 'vitest';
import { IoCheckbox } from './io-checkbox';

describe('io-checkbox — change handling', () => {
  let component: IoCheckbox;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(checked: boolean) {
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

  it('emits change with checked=true when checking', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledWith({ checked: true, value: 'test-value' });
  });

  it('emits change with checked=false when unchecking', () => {
    component.checked = true;
    const ev = makeChangeEvent(false);
    (component as any).handleChange(ev);
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
});
