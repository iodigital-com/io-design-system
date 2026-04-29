import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoInput } from './io-input';

describe('io-input — keyboard / focus lifecycle', () => {
  let component: IoInput;
  let focusEmitMock: ReturnType<typeof vi.fn>;
  let blurEmitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
    (component as any).fallbackId = 'test-id';
    (component as any).inputId = 'test-id';
    component.label = 'Test input';
    component.disabled = false;
    component.error = false;

    focusEmitMock = vi.fn();
    blurEmitMock = vi.fn();
    (component as any).focus = { emit: focusEmitMock };
    (component as any).blur = { emit: blurEmitMock };
  });

  it('emits focus event on handleFocus when not disabled', () => {
    const ev = new FocusEvent('focus');
    (component as any).handleFocus(ev);
    expect(focusEmitMock).toHaveBeenCalledWith(ev);
  });

  it('suppresses focus event when disabled', () => {
    component.disabled = true;
    const ev = new FocusEvent('focus');
    (component as any).handleFocus(ev);
    expect(focusEmitMock).not.toHaveBeenCalled();
  });

  it('emits blur event on handleBlur when not disabled', () => {
    const ev = new FocusEvent('blur');
    (component as any).handleBlur(ev);
    expect(blurEmitMock).toHaveBeenCalledWith(ev);
  });

  it('suppresses blur event when disabled', () => {
    component.disabled = true;
    const ev = new FocusEvent('blur');
    (component as any).handleBlur(ev);
    expect(blurEmitMock).not.toHaveBeenCalled();
  });

  it('render with error=true and errorMessage does not throw', () => {
    component.error = true;
    component.errorMessage = 'Required';
    expect(() => component.render()).not.toThrow();
  });

  it('render with error=false and helperText does not throw', () => {
    component.error = false;
    component.helperText = 'Helper';
    expect(() => component.render()).not.toThrow();
  });
});
