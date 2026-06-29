import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoInputPassword } from './io-input-password';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-input-password — FACE (#835)', () => {
  let component: IoInputPassword;

  beforeEach(() => {
    component = new IoInputPassword();
    (component as any).el = document.createElement('io-input-password');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('syncFormValue calls setFormValue with current value', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = 'secret';
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('secret');
  });

  it('syncFormValue calls setFormValue with empty string when value is empty', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = '';
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('');
  });

  it('syncFormValue sets valueMissing when required and empty (no shadow root fallback)', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please fill in this field',
    );
  });

  it('faceInvalid stays false when required+empty but untouched', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('faceInvalid becomes true after syncFormValue when touched+required+empty', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '';
    (component as any).touched = true;
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(true);
  });

  it('syncFormValue clears validity when required and value is present', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = 'password123';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect((component as any).faceInvalid).toBe(false);
  });

  it('formResetCallback restores value to defaultValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = 'changed';
    (component as any).formResetCallback();
    expect(component.value).toBe('');
  });

  it('formResetCallback resets touched to false', () => {
    (component as any).internals = makeInternals();
    (component as any).touched = true;
    (component as any).formResetCallback();
    expect((component as any).touched).toBe(false);
  });

  it('formResetCallback resets faceInvalid to false', () => {
    (component as any).internals = makeInternals();
    component.required = true;
    component.value = '';
    (component as any).touched = true;
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(true);
    (component as any).formResetCallback();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('handleBlur sets touched to true', () => {
    (component as any).internals = makeInternals();
    (component as any).blur = { emit: vi.fn() };
    expect((component as any).touched).toBe(false);
    (component as any).handleBlur(new FocusEvent('blur'));
    expect((component as any).touched).toBe(true);
  });

  it('checkValidity delegates to internals.checkValidity', async () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    await component.checkValidity();
    expect(internals.checkValidity).toHaveBeenCalled();
  });

  it('reportValidity delegates to internals.reportValidity and sets touched', async () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    await component.reportValidity();
    expect((component as any).touched).toBe(true);
    expect(internals.reportValidity).toHaveBeenCalled();
  });

  it('reportValidity sets faceInvalid to true when required and empty', async () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '';
    expect((component as any).faceInvalid).toBe(false);
    await component.reportValidity();
    expect((component as any).touched).toBe(true);
    expect((component as any).faceInvalid).toBe(true);
  });

  it('syncFormValue sets tooShort via native input', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).touched = true;
    const mockNative = {
      checkValidity: vi.fn().mockReturnValue(false),
      validity: { tooShort: true },
      validationMessage: 'Please lengthen this text.',
    };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockNative) };
    Object.defineProperty((component as any).el, 'shadowRoot', {
      get: () => mockShadowRoot,
      configurable: true,
    });
    component.value = 'ab';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { tooShort: true },
      'Please lengthen this text.',
      mockNative,
    );
    expect((component as any).faceInvalid).toBe(true);
  });

  it('syncFormValue sets tooLong via native input', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).touched = true;
    const mockNative = {
      checkValidity: vi.fn().mockReturnValue(false),
      validity: { tooLong: true },
      validationMessage: 'Please shorten this text.',
    };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockNative) };
    Object.defineProperty((component as any).el, 'shadowRoot', {
      get: () => mockShadowRoot,
      configurable: true,
    });
    component.value = 'this is too long';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { tooLong: true },
      'Please shorten this text.',
      mockNative,
    );
    expect((component as any).faceInvalid).toBe(true);
  });

  it('syncFormValue clears faceInvalid when valid', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    const mockNative = {
      checkValidity: vi.fn().mockReturnValue(true),
      validity: {},
      validationMessage: '',
    };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockNative) };
    Object.defineProperty((component as any).el, 'shadowRoot', {
      get: () => mockShadowRoot,
      configurable: true,
    });
    component.value = 'valid-password';
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('readonly prop defaults to false', () => {
    expect(component.readonly).toBe(false);
  });

  it('loading prop defaults to false', () => {
    expect(component.loading).toBe(false);
  });

  it('maxLength prop defaults to undefined', () => {
    expect(component.maxLength).toBeUndefined();
  });

  it('minLength prop defaults to undefined', () => {
    expect(component.minLength).toBeUndefined();
  });

  it('handleInput is blocked when readonly', () => {
    component.readonly = true;
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: { value: 'typed' } });
    const inputEmit = vi.fn();
    (component as any).input = { emit: inputEmit };
    (component as any).handleInput(ev);
    expect(inputEmit).not.toHaveBeenCalled();
  });

  it('handleChange is blocked when readonly', () => {
    component.readonly = true;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: { value: 'typed' } });
    const changeEmit = vi.fn();
    (component as any).change = { emit: changeEmit };
    (component as any).handleChange(ev);
    expect(changeEmit).not.toHaveBeenCalled();
  });

  it('syncFormValue does not throw when internals is undefined', () => {
    (component as any).internals = undefined;
    component.required = true;
    component.value = '';
    expect(() => (component as any).syncFormValue()).not.toThrow();
  });
});
