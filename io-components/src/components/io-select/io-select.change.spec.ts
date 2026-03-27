import { describe, it, expect, vi } from 'vitest';
import { IoSelect } from './io-select';

describe('io-select — change handling', () => {
  let component: IoSelect;
  let changeMock: ReturnType<typeof vi.fn>;
  let focusMock: ReturnType<typeof vi.fn>;
  let blurMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(value: string) {
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
    (component as any).ioChange = { emit: changeMock };
    (component as any).ioFocus = { emit: focusMock };
    (component as any).ioBlur = { emit: blurMock };
    component.options = [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ];
  });

  it('emits ioChange with the selected value', () => {
    const ev = makeChangeEvent('a');
    (component as any).handleChange(ev);
    expect(changeMock).toHaveBeenCalledWith('a');
  });

  it('updates value prop on change', () => {
    const ev = makeChangeEvent('b');
    (component as any).handleChange(ev);
    expect(component.value).toBe('b');
  });

  it('emits ioFocus on focus', () => {
    const ev = new FocusEvent('focus');
    (component as any).handleFocus(ev);
    expect(focusMock).toHaveBeenCalledWith(ev);
  });

  it('emits ioBlur on blur', () => {
    const ev = new FocusEvent('blur');
    (component as any).handleBlur(ev);
    expect(blurMock).toHaveBeenCalledWith(ev);
  });
});
