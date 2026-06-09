/**
 * io-pin-code — FACE (Form-Associated Custom Elements) unit tests
 *
 * Covers: syncFormValue, formResetCallback, checkValidity, reportValidity
 */
import { describe, it, expect, vi } from 'vitest';

import { IoPinCode } from './io-pin-code';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeComponent(value = '', required = false) {
  const component = new IoPinCode();
  (component as any).el = document.createElement('io-pin-code');
  (component as any).change = { emit: vi.fn() };
  component.value = value;
  component.required = required;
  (component as any).componentWillLoad();
  return component;
}

describe('io-pin-code — FACE: syncFormValue', () => {
  it('calls setFormValue with empty PIN value initially', () => {
    const component = makeComponent();
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('calls setFormValue with complete PIN value', () => {
    const component = makeComponent('1234');
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('1234');
  });

  it('sets valueMissing when required and PIN is incomplete', () => {
    const component = makeComponent('', true);
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please complete the PIN',
    );
  });

  it('clears validity when required and PIN is complete', () => {
    const component = makeComponent('1234', true);
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('clears validity when not required and PIN is empty', () => {
    const component = makeComponent('', false);
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('sets faceInvalid=true when required, incomplete, and touched', () => {
    const component = makeComponent('12', true);
    (component as any).internals = makeInternals();
    (component as any).touched = true;
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(true);
  });

  it('keeps faceInvalid=false when required and incomplete but not yet touched', () => {
    const component = makeComponent('12', true);
    (component as any).internals = makeInternals();
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('sets faceInvalid=false when required and complete', () => {
    const component = makeComponent('1234', true);
    (component as any).internals = makeInternals();
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('sets faceInvalid=false when not required', () => {
    const component = makeComponent('', false);
    (component as any).internals = makeInternals();
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });
});

describe('io-pin-code — FACE: formResetCallback', () => {
  it('resets value to defaultValue', () => {
    const component = makeComponent('12');
    const internals = makeInternals();
    (component as any).internals = internals;

    // Simulate user filling all slots
    component.value = '1234';
    (component as any).digits = ['1', '2', '3', '4'];

    (component as any).formResetCallback();
    expect(component.value).toBe('12');
  });

  it('resets digits array to initial value', () => {
    const component = makeComponent('');
    (component as any).internals = makeInternals();

    (component as any).digits = ['9', '8', '7', '6'];
    (component as any).formResetCallback();

    expect((component as any).digits).toEqual(['', '', '', '']);
  });

  it('clears faceInvalid on reset', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).faceInvalid = true;

    (component as any).formResetCallback();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('resets touched to false on reset', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).touched = true;

    (component as any).formResetCallback();
    expect((component as any).touched).toBe(false);
  });

  it('calls setFormValue with null when reset to empty', () => {
    const component = makeComponent('');
    const internals = makeInternals();
    (component as any).internals = internals;

    (component as any).formResetCallback();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });
});

describe('io-pin-code — FACE: checkValidity and reportValidity', () => {
  it('checkValidity delegates to internals', async () => {
    const component = makeComponent();
    const internals = makeInternals();
    internals.checkValidity.mockReturnValue(false);
    (component as any).internals = internals;
    expect(await component.checkValidity()).toBe(false);
  });

  it('checkValidity returns true when internals unavailable', async () => {
    const component = makeComponent();
    (component as any).internals = undefined;
    expect(await component.checkValidity()).toBe(true);
  });

  it('reportValidity delegates to internals', async () => {
    const component = makeComponent();
    const internals = makeInternals();
    internals.reportValidity.mockReturnValue(false);
    (component as any).internals = internals;
    expect(await component.reportValidity()).toBe(false);
  });

  it('reportValidity returns true when internals unavailable', async () => {
    const component = makeComponent();
    (component as any).internals = undefined;
    expect(await component.reportValidity()).toBe(true);
  });
});
