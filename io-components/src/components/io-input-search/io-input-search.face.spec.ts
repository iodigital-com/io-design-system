import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoInputSearch } from './io-input-search';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-input-search — FACE', () => {
  let component: IoInputSearch;

  beforeEach(() => {
    component = new IoInputSearch();
    (component as any).el = document.createElement('io-input-search');
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
    component.value = 'query';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('syncFormValue sets formValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = 'search term';
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('search term');
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

  it('clear button does not fire when disabled', () => {
    component.disabled = true;
    component.value = 'some query';
    const emitSpy = vi.fn();
    (component as any).clear = { emit: emitSpy };
    (component as any).handleClear();
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.value).toBe('some query');
  });

  it('clear button fires when not disabled', () => {
    component.disabled = false;
    component.value = 'some query';
    const emitSpy = vi.fn();
    (component as any).clear = { emit: emitSpy };
    (component as any).handleClear();
    expect(emitSpy).toHaveBeenCalled();
    expect(component.value).toBe('');
  });

  it('formResetCallback restores defaultValue and clears faceInvalid', () => {
    (component as any).defaultValue = 'default query';
    (component as any).touched = true;
    component.faceInvalid = true;
    (component as any).formResetCallback();
    expect(component.value).toBe('default query');
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
    (component as any).formStateRestoreCallback('restored query');
    expect(component.value).toBe('restored query');
  });

  it('formStateRestoreCallback handles null state', () => {
    (component as any).formStateRestoreCallback(null);
    expect(component.value).toBe('');
  });
});
