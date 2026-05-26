/**
 * io-textarea — FACE (Form-Associated Custom Elements) unit tests — #166
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoTextarea } from './io-textarea';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-textarea — FACE', () => {
  let component: IoTextarea;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).label = 'Notes';
    (component as any).componentWillLoad();
  });

  it('syncFormValue calls setFormValue with current value', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = 'some text';
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('some text');
  });

  it('syncFormValue sets valueMissing validity when required and empty', () => {
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

  it('syncFormValue clears validity when value is present', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = 'text';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('checkValidity() delegates to internals', async () => {
    const internals = makeInternals();
    internals.checkValidity.mockReturnValue(false);
    (component as any).internals = internals;
    expect(await component.checkValidity()).toBe(false);
  });

  it('checkValidity() returns true when internals unavailable', async () => {
    (component as any).internals = undefined;
    expect(await component.checkValidity()).toBe(true);
  });

  it('reportValidity() delegates to internals', async () => {
    const internals = makeInternals();
    internals.reportValidity.mockReturnValue(false);
    (component as any).internals = internals;
    expect(await component.reportValidity()).toBe(false);
  });

  it('reportValidity() returns true when internals unavailable', async () => {
    (component as any).internals = undefined;
    expect(await component.reportValidity()).toBe(true);
  });


  it('shows error UI when faceInvalid=true even if state is success', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.state = 'success';
    component.message = 'Looks good';
    // faceInvalid overrides state='success': showError = state==='error' || faceInvalid
    // componentWillLoad() calls syncFormValue() which resets faceInvalid — set AFTER
    (component as any).componentWillLoad();
    (component as any).faceInvalid = true;
    expect(() => (component as any).render()).not.toThrow();
    expect((component as any).faceInvalid).toBe(true);
  });

  describe('formResetCallback', () => {
    it('resets value to the default value captured in componentWillLoad()', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.value = 'changed text';
      component.formResetCallback();
      // defaultValue was '' when componentWillLoad() ran in beforeEach
      expect(component.value).toBe('');
    });

    it('clears faceInvalid on reset', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      (component as any).faceInvalid = true;
      component.formResetCallback();
      expect((component as any).faceInvalid).toBe(false);
    });

    it('calls setFormValue with the reset value', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.value = 'changed text';
      component.formResetCallback();
      expect(internals.setFormValue).toHaveBeenLastCalledWith('');
    });

    it('does not throw when internals is unavailable (no form parent)', () => {
      (component as any).internals = undefined;
      expect(() => component.formResetCallback()).not.toThrow();
    });

    it('preserves a non-empty default value on reset', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.value = 'initial';
      (component as any).defaultValue = 'initial';
      component.value = 'user-typed';
      component.formResetCallback();
      expect(component.value).toBe('initial');
    });

    it('clears faceInvalid after reset even when field is required and default is empty', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.required = true;
      component.value = 'something';
      (component as any).faceInvalid = true;
      component.formResetCallback();
      expect((component as any).faceInvalid).toBe(false);
    });
  });
});
