import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTextarea } from './io-textarea';

describe('io-textarea — event behavior', () => {
  let component: IoTextarea;
  let inputMock: ReturnType<typeof vi.fn>;
  let changeMock: ReturnType<typeof vi.fn>;
  let focusMock: ReturnType<typeof vi.fn>;
  let blurMock: ReturnType<typeof vi.fn>;

  function makeInputEvent(value: string): InputEvent {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: textarea });
    return ev;
  }

  function makeChangeEvent(value: string): Event {
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

  it('emits input event with the InputEvent payload', () => {
    const ev = makeInputEvent('typed text');
    (component as any).handleInput(ev);
    expect(inputMock).toHaveBeenCalledOnce();
    expect(inputMock).toHaveBeenCalledWith(ev);
  });

  it('updates value prop on input', () => {
    const ev = makeInputEvent('typed text');
    (component as any).handleInput(ev);
    expect(component.value).toBe('typed text');
  });

  it('emits change with current string value', () => {
    const ev = makeChangeEvent('final value');
    (component as any).handleChange(ev);
    expect(changeMock).toHaveBeenCalledOnce();
    expect(changeMock).toHaveBeenCalledWith('final value');
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

  it('does not emit input when disabled', () => {
    component.disabled = true;
    const ev = makeInputEvent('typed');
    (component as any).handleInput(ev);
    expect(inputMock).not.toHaveBeenCalled();
  });

  it('does not mutate value when disabled', () => {
    component.disabled = true;
    component.value = 'original';
    const ev = makeInputEvent('typed');
    (component as any).handleInput(ev);
    expect(component.value).toBe('original');
  });

  it('does not emit change when disabled', () => {
    component.disabled = true;
    const ev = makeChangeEvent('final');
    (component as any).handleChange(ev);
    expect(changeMock).not.toHaveBeenCalled();
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
