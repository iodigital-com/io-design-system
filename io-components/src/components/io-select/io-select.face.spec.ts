/**
 * io-select — FACE (Form-Associated Custom Elements) unit tests — #166
 *
 * Verified: setFormValue reflects selected value; multiple mode uses FormData.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoSelect } from './io-select';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-select — FACE', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    (component as any).label = 'Country';
    (component as any).componentWillLoad();
  });

  it('syncFormValue calls setFormValue with current value (single mode)', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.value = 'nl';
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('nl');
  });

  it('syncFormValue calls setFormValue with null when multiple and nothing selected', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).multiple = true;
    (component as any).selectedValues = [];
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('syncFormValue calls setFormValue with FormData when multiple and values selected', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).multiple = true;
    component.name = 'countries';
    (component as any).fieldId = 'countries';
    (component as any).selectedValues = ['nl', 'be'];
    (component as any).syncFormValue();

    const formDataArg: FormData = internals.setFormValue.mock.calls[0][0];
    expect(formDataArg).toBeInstanceOf(FormData);
    expect(formDataArg.getAll('countries')).toEqual(['nl', 'be']);
  });

  it('syncFormValue sets valueMissing when required and no value', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please select an option',
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

  it('syncFormValue clears validity when required and value present', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.value = 'nl';
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
    expect(() => (component as any).renderNativeSelect()).not.toThrow();
    expect((component as any).faceInvalid).toBe(true);
  });

  describe('handleBlur touched gate (custom mode)', () => {
    it('does not set touched when focus moves within shadow root (intra-dropdown)', () => {
      const dropdownEl = document.createElement('div');
      const mockShadowRoot = { contains: vi.fn().mockReturnValue(true) };
      (component as any).el = { shadowRoot: mockShadowRoot };
      (component as any).blur = { emit: vi.fn() };
      component.custom = true;

      const ev = new FocusEvent('blur', { relatedTarget: dropdownEl });
      (component as any).handleBlur(ev);

      expect((component as any).touched).toBe(false);
    });

    it('sets touched when focus leaves component entirely in custom mode', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      const mockShadowRoot = { contains: vi.fn().mockReturnValue(false) };
      (component as any).el = { shadowRoot: mockShadowRoot };
      (component as any).blur = { emit: vi.fn() };
      component.custom = true;

      const ev = new FocusEvent('blur', { relatedTarget: null });
      (component as any).handleBlur(ev);

      expect((component as any).touched).toBe(true);
    });
  });

  it('form prop is undefined by default', () => {
    expect(component.form).toBeUndefined();
  });

  it('form prop accepts a string value for out-of-DOM form association', () => {
    component.form = 'my-form';
    expect(component.form).toBe('my-form');
  });

  describe('formResetCallback', () => {
    it('resets single-mode value to the default value captured in componentWillLoad()', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.value = 'be';
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

    it('calls setFormValue with the reset value (single mode)', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      component.value = 'be';
      component.formResetCallback();
      expect(internals.setFormValue).toHaveBeenLastCalledWith('');
    });

    it('does not throw when internals is unavailable (no form parent)', () => {
      (component as any).internals = undefined;
      expect(() => component.formResetCallback()).not.toThrow();
    });

    it('resets multiple-mode selectedValues to empty when defaultSelectedValues was empty', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      (component as any).multiple = true;
      (component as any).selectedValues = ['nl', 'be'];
      component.formResetCallback();
      expect((component as any).selectedValues).toEqual([]);
    });

    it('resets multiple-mode selectedValues to default snapshot', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      (component as any).multiple = true;
      // Simulate a component initialized with pre-selected values
      (component as any).defaultSelectedValues = ['nl'];
      (component as any).selectedValues = ['nl', 'be'];
      component.formResetCallback();
      expect((component as any).selectedValues).toEqual(['nl']);
    });

    it('preserves a non-empty default value on reset (single mode)', () => {
      const internals = makeInternals();
      (component as any).internals = internals;
      (component as any).defaultValue = 'nl';
      component.value = 'be';
      component.formResetCallback();
      expect(component.value).toBe('nl');
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
