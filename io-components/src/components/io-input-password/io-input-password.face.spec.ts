import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoInputPassword } from './io-input-password';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-input-password — FACE', () => {
  let component: IoInputPassword;

  beforeEach(() => {
    component = new IoInputPassword();
    (component as any).el = document.createElement('io-input-password');
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
    component.value = 'secret';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('syncFormValue sets formValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = 'mypassword';
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('mypassword');
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
    (component as any).defaultValue = 'oldpass';
    (component as any).touched = true;
    component.faceInvalid = true;
    (component as any).formResetCallback();
    expect(component.value).toBe('oldpass');
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
    (component as any).formStateRestoreCallback('restoredpass');
    expect(component.value).toBe('restoredpass');
  });

  it('formStateRestoreCallback handles null state', () => {
    (component as any).formStateRestoreCallback(null);
    expect(component.value).toBe('');
  });
});
