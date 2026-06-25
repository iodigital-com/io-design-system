import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoInputDate } from './io-input-date';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-input-date — FACE', () => {
  let component: IoInputDate;

  beforeEach(() => {
    component = new IoInputDate();
    (component as any).el = document.createElement('io-input-date');
    (component as any).internals = makeInternals();
    (component as any).componentWillLoad();
  });

  it('syncFormValue sets valueMissing when required and empty', () => {
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

  it('syncFormValue clears validity when required and has value', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '2024-01-15';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('syncFormValue sets formValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = '2024-06-01';
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('2024-06-01');
  });

  it('faceInvalid stays false before touched even when required and empty', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).touched = false;
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect(component.faceInvalid).toBe(false);
  });

  it('faceInvalid becomes true after touched when required and empty', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).touched = true;
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect(component.faceInvalid).toBe(true);
  });

  it('formResetCallback restores defaultValue and clears faceInvalid', () => {
    (component as any).defaultValue = '2023-01-01';
    (component as any).touched = true;
    component.faceInvalid = true;
    (component as any).formResetCallback();
    expect(component.value).toBe('2023-01-01');
    expect(component.faceInvalid).toBe(false);
    expect((component as any).touched).toBe(false);
  });

  it('formDisabledCallback propagates disabled state', () => {
    (component as any).formDisabledCallback(true);
    expect(component.disabled).toBe(true);
    (component as any).formDisabledCallback(false);
    expect(component.disabled).toBe(false);
  });

  it('formStateRestoreCallback restores value', () => {
    (component as any).formStateRestoreCallback('2025-03-10');
    expect(component.value).toBe('2025-03-10');
  });

  it('formStateRestoreCallback handles null state', () => {
    (component as any).formStateRestoreCallback(null);
    expect(component.value).toBe('');
  });
});
