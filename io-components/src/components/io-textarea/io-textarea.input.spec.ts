import { describe, it, expect, vi } from 'vitest';
import { IoTextarea } from './io-textarea';

describe('io-textarea — input handling', () => {
  let component: IoTextarea;
  let inputMock: ReturnType<typeof vi.fn>;
  let changeMock: ReturnType<typeof vi.fn>;
  let focusMock: ReturnType<typeof vi.fn>;
  let blurMock: ReturnType<typeof vi.fn>;

  function makeInputEvent(value: string) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.height = '';
    textarea.scrollHeight;
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: textarea });
    return ev;
  }

  function makeChangeEvent(value: string) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: textarea });
    return ev;
  }

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    inputMock = vi.fn();
    changeMock = vi.fn();
    focusMock = vi.fn();
    blurMock = vi.fn();
    (component as any).input = { emit: inputMock };
    (component as any).change = { emit: changeMock };
    (component as any).focus = { emit: focusMock };
    (component as any).blur = { emit: blurMock };
  });

  it('emits input on input', () => {
    const ev = makeInputEvent('hello');
    (component as any).handleInput(ev);
    expect(inputMock).toHaveBeenCalledWith(ev);
  });

  it('updates value prop on input', () => {
    const ev = makeInputEvent('hello world');
    (component as any).handleInput(ev);
    expect(component.value).toBe('hello world');
  });

  it('emits change with current value', () => {
    const ev = makeChangeEvent('final value');
    (component as any).handleChange(ev);
    expect(changeMock).toHaveBeenCalledWith('final value');
  });

  it('emits focus on focus', () => {
    const ev = new FocusEvent('focus');
    (component as any).handleFocus(ev);
    expect(focusMock).toHaveBeenCalledWith(ev);
  });

  it('emits blur on blur', () => {
    const ev = new FocusEvent('blur');
    (component as any).handleBlur(ev);
    expect(blurMock).toHaveBeenCalledWith(ev);
  });
});
