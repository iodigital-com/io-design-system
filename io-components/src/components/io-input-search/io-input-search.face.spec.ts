import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoInputSearch } from './io-input-search';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-input-search — FACE (#841)', () => {
  let component: IoInputSearch;

  beforeEach(() => {
    component = new IoInputSearch();
    (component as any).el = document.createElement('io-input-search');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).clear = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('syncFormValue calls setFormValue with current value', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = 'hello';
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('hello');
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
    component.value = 'query';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect((component as any).faceInvalid).toBe(false);
  });

  it('formResetCallback restores value to defaultValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = 'something';
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
    Object.defineProperty(ev, 'target', { value: { value: 'test' } });
    const inputEmit = vi.fn();
    (component as any).input = { emit: inputEmit };
    (component as any).handleInput(ev);
    expect(inputEmit).not.toHaveBeenCalled();
  });

  it('handleChange is blocked when readonly', () => {
    component.readonly = true;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: { value: 'test' } });
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
