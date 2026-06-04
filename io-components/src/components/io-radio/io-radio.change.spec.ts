import { describe, it, expect, vi } from 'vitest';

import { IoRadio } from './io-radio';

describe('io-radio — change handling', () => {
  let component: IoRadio;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(checked: boolean) {
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

  it('emits change with value when selecting', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledWith({ value: 'test-value' });
  });

  it('emits change with value when deselecting', () => {
    component.checked = true;
    const ev = makeChangeEvent(false);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledWith({ value: 'test-value' });
  });

  it('updates checked prop on change', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(true);
  });
});
