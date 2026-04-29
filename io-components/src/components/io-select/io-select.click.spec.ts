import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoSelect } from './io-select';

describe('io-select — event behavior', () => {
  let component: IoSelect;
  let changeMock: ReturnType<typeof vi.fn>;
  let focusMock: ReturnType<typeof vi.fn>;
  let blurMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(value: string): Event {
    const select = document.createElement('select');
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    select.add(option);
    select.value = value;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: select });
    return ev;
  }

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    changeMock = vi.fn();
    focusMock = vi.fn();
    blurMock = vi.fn();
    (component as any).change = { emit: changeMock };
    (component as any).focus = { emit: focusMock };
    (component as any).blur = { emit: blurMock };
    component.options = [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ];
  });

  it('emits change with the selected value', () => {
    const ev = makeChangeEvent('a');
    (component as any).handleChange(ev);
    expect(changeMock).toHaveBeenCalledOnce();
    expect(changeMock).toHaveBeenCalledWith('a');
  });

  it('updates value prop on change', () => {
    const ev = makeChangeEvent('b');
    (component as any).handleChange(ev);
    expect(component.value).toBe('b');
  });

  it('emits focus event as-is', () => {
    const ev = new FocusEvent('focus');
    (component as any).handleFocus(ev);
    expect(focusMock).toHaveBeenCalledOnce();
    expect(focusMock).toHaveBeenCalledWith(ev);
  });

  it('emits blur event as-is', () => {
    const ev = new FocusEvent('blur');
    (component as any).handleBlur(ev);
    expect(blurMock).toHaveBeenCalledOnce();
    expect(blurMock).toHaveBeenCalledWith(ev);
  });

  it('does not emit change when disabled', () => {
    component.disabled = true;
    const ev = makeChangeEvent('a');
    (component as any).handleChange(ev);
    expect(changeMock).not.toHaveBeenCalled();
  });

  it('does not mutate value when disabled', () => {
    component.disabled = true;
    component.value = 'original';
    const ev = makeChangeEvent('a');
    (component as any).handleChange(ev);
    expect(component.value).toBe('original');
  });

  it('does not emit focus when disabled', () => {
    component.disabled = true;
    const ev = new FocusEvent('focus');
    (component as any).handleFocus(ev);
    expect(focusMock).not.toHaveBeenCalled();
  });

  it('does not emit blur when disabled', () => {
    component.disabled = true;
    const ev = new FocusEvent('blur');
    (component as any).handleBlur(ev);
    expect(blurMock).not.toHaveBeenCalled();
  });
});
