import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoInputDate } from './io-input-date';

describe('io-input-date — change events', () => {
  let component: IoInputDate;
  let changeMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(value: string): Event {
    const input = document.createElement('input');
    input.value = value;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });
    return ev;
  }

  beforeEach(() => {
    component = new IoInputDate();
    (component as any).el = document.createElement('io-input-date');
    changeMock = vi.fn();
    (component as any).change = { emit: changeMock };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
    component.label = 'Birth date';
  });

  it('emits change with selected value', () => {
    const ev = makeChangeEvent('2026-01-15');
    (component as any).handleChange(ev);
    expect(changeMock).toHaveBeenCalledOnce();
    expect(changeMock).toHaveBeenCalledWith('2026-01-15');
  });

  it('does not emit change when disabled', () => {
    component.disabled = true;
    const ev = makeChangeEvent('2026-01-15');
    (component as any).handleChange(ev);
    expect(changeMock).not.toHaveBeenCalled();
  });

  it('updates value prop on change', () => {
    const ev = makeChangeEvent('2026-06-01');
    (component as any).handleChange(ev);
    expect(component.value).toBe('2026-06-01');
  });
});
