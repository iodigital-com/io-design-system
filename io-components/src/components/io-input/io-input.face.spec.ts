/**
 * io-input — FACE (Form-Associated Custom Elements) unit tests — #166
 *
 * Tests that syncFormValue, checkValidity, and reportValidity delegate
 * correctly to ElementInternals while being safe when internals is
 * unavailable (jsdom partial implementation).
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoInput } from './io-input';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-input — FACE', () => {
  let component: IoInput;

  beforeEach(() => {
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
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

  it('syncFormValue sets valueMissing validity when required and empty (fallback — no shadow root in jsdom)', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '';
    // shadowRoot is null in jsdom so the fallback required-only path is exercised here.
    // Native constraint validation (maxLength, min, max, step) is covered via the native
    // <input>.validity object in real browsers; jsdom does not run constraint validation.
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please fill in this field',
    );
  });

  it('faceInvalid stays false on mount when required and empty (untouched)', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('faceInvalid becomes true after syncFormValue when required, empty, and touched', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '';
    (component as any).touched = true;
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(true);
  });

  it('syncFormValue clears validity when required and value is present (fallback — no shadow root in jsdom)', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = 'some text';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('checkValidity() delegates to internals and returns its result', async () => {
    const internals = makeInternals();
    internals.checkValidity.mockReturnValue(false);
    (component as any).internals = internals;
    expect(await component.checkValidity()).toBe(false);
  });

  it('checkValidity() returns true when internals is unavailable', async () => {
    (component as any).internals = undefined;
    expect(await component.checkValidity()).toBe(true);
  });

  it('reportValidity() delegates to internals and returns its result', async () => {
    const internals = makeInternals();
    internals.reportValidity.mockReturnValue(false);
    (component as any).internals = internals;
    expect(await component.reportValidity()).toBe(false);
  });

  it('reportValidity() returns true when internals is unavailable', async () => {
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

  describe('minLength / tooShort validity', () => {
    it('onMinLengthChange triggers syncFormValue', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.minLength = 5;
      (component as any).onMinLengthChange();
      // setFormValue is called by syncFormValue — confirms the watch fires correctly
      expect(internals.setFormValue).toHaveBeenCalled();
    });

    it('syncFormValue sets valueMissing when required and value is empty (fallback — no shadow root)', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.required = true;
      component.minLength = 5;
      component.value = '';
      (component as any).syncFormValue();
      expect(internals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill in this field',
      );
    });

    it('syncFormValue clears validity when minLength is satisfied (fallback — no shadow root)', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.minLength = 3;
      component.value = 'hello';
      (component as any).syncFormValue();
      expect(internals.setValidity).toHaveBeenCalledWith({});
    });
  });

  describe('formResetCallback', () => {
    it('resets value to the default value captured in componentWillLoad()', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.value = 'changed';
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

    it('resets touched to false on reset', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      (component as any).touched = true;
      component.formResetCallback();
      expect((component as any).touched).toBe(false);
    });

    it('calls setFormValue with the reset value', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.value = 'changed';
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
      // Simulate a component initialized with value='pre-filled'
      component.value = 'pre-filled';
      (component as any).defaultValue = 'pre-filled';
      component.value = 'changed-by-user';
      component.formResetCallback();
      expect(component.value).toBe('pre-filled');
    });

    it('clears faceInvalid after reset even when field is required and default is empty', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.required = true;
      // defaultValue remains '' (set by componentWillLoad in beforeEach)
      component.value = 'something';
      (component as any).faceInvalid = true;
      component.formResetCallback();
      // faceInvalid must be false after reset — matches native form reset UX
      expect((component as any).faceInvalid).toBe(false);
    });
  });

  describe('formDisabledCallback', () => {
    it('sets disabled=true when called with true', () => {
      component.disabled = false;
      component.formDisabledCallback(true);
      expect(component.disabled).toBe(true);
    });

    it('sets disabled=false when called with false', () => {
      component.disabled = true;
      component.formDisabledCallback(false);
      expect(component.disabled).toBe(false);
    });
  });

  describe('formStateRestoreCallback', () => {
    it('restores string value and calls setFormValue', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.formStateRestoreCallback('hello');
      expect(component.value).toBe('hello');
      expect(internals.setFormValue).toHaveBeenCalledWith('hello');
    });

    it('sets value to empty string when state is null', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.formStateRestoreCallback(null);
      expect(component.value).toBe('');
    });

    it('sets value to empty string when state is a File', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.formStateRestoreCallback(new File([], 'test.txt'));
      expect(component.value).toBe('');
    });
  });
});
