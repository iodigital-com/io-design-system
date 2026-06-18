/**
 * io-radio-group — FACE (Form-Associated Custom Elements) tests (#653)
 *
 * Tests formAssociated behaviour at the group level:
 * - componentWillLoad stores defaultValue and calls setFormValue
 * - onValueChange calls setFormValue
 * - formResetCallback restores defaultValue and resyncs children
 * - formDisabledCallback propagates disabled to children
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoRadioGroup } from './io-radio-group';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

type RadioLike = HTMLElement & {
  value: string;
  checked: boolean;
  name: string;
  disabled: boolean;
  tabIndex: number;
  required: boolean;
};

function makeRadio(value: string): RadioLike {
  return Object.assign(document.createElement('io-radio'), {
    value,
    checked: false,
    name: '',
    disabled: false,
    tabIndex: -1,
    required: false,
  }) as RadioLike;
}

function makeComponent(initialValue = '') {
  const host = document.createElement('io-radio-group');
  const c = new IoRadioGroup();
  (c as any).el = host;
  (c as any).change = { emit: vi.fn() };
  c.name = 'choice';
  c.value = initialValue;
  c.disabled = false;
  c.required = false;
  return { c, host };
}

describe('io-radio-group — FACE / formAssociated', () => {
  describe('componentWillLoad', () => {
    it('stores defaultValue from initial value prop', () => {
      const { c } = makeComponent('b');
      (c as any).internals = makeInternals();
      (c as any).componentWillLoad();
      expect((c as any).defaultValue).toBe('b');
    });

    it('calls setFormValue with initial value on load', () => {
      const { c } = makeComponent('b');
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();
      expect(internals.setFormValue).toHaveBeenCalledWith('b');
    });

    it('calls setFormValue with empty string when no initial value', () => {
      const { c } = makeComponent('');
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();
      expect(internals.setFormValue).toHaveBeenCalledWith('');
    });
  });

  describe('onValueChange', () => {
    it('calls setFormValue with new value when value changes', () => {
      const { c } = makeComponent();
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();
      internals.setFormValue.mockClear();

      c.value = 'selected';
      (c as any).onValueChange();

      expect(internals.setFormValue).toHaveBeenCalledWith('selected');
    });
  });

  describe('formResetCallback', () => {
    it('restores value to defaultValue and calls setFormValue', () => {
      const { c } = makeComponent('initial');
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();

      // Simulate user changing the value
      c.value = 'changed';
      internals.setFormValue.mockClear();

      (c as any).formResetCallback();

      expect(c.value).toBe('initial');
      expect(internals.setFormValue).toHaveBeenCalledWith('initial');
    });

    it('restores to empty string when no initial value', () => {
      const { c } = makeComponent('');
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();

      c.value = 'something';
      internals.setFormValue.mockClear();

      (c as any).formResetCallback();

      expect(c.value).toBe('');
      expect(internals.setFormValue).toHaveBeenCalledWith('');
    });

    it('resyncs children checked state on reset', () => {
      const { c, host } = makeComponent('a');
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();

      const radioA = makeRadio('a');
      const radioB = makeRadio('b');
      host.appendChild(radioA);
      host.appendChild(radioB);

      // Change to 'b'
      c.value = 'b';
      radioA.checked = false;
      radioB.checked = true;

      // Reset
      (c as any).formResetCallback();

      expect(c.value).toBe('a');
      expect(radioA.checked).toBe(true);
      expect(radioB.checked).toBe(false);
    });

    it('does not throw when internals is not available', () => {
      const { c } = makeComponent('a');
      (c as any).internals = undefined;
      (c as any).defaultValue = 'a';
      expect(() => (c as any).formResetCallback()).not.toThrow();
    });
  });

  describe('formDisabledCallback', () => {
    it('disables the group and propagates to children when called with true', () => {
      const { c, host } = makeComponent();
      (c as any).internals = makeInternals();
      (c as any).componentWillLoad();

      const radio = makeRadio('x');
      host.appendChild(radio);

      (c as any).formDisabledCallback(true);

      expect(c.disabled).toBe(true);
      expect(radio.disabled).toBe(true);
    });

    it('re-enables the group and propagates to children when called with false', () => {
      const { c, host } = makeComponent();
      (c as any).internals = makeInternals();
      (c as any).componentWillLoad();

      const radio = makeRadio('x');
      radio.disabled = true;
      host.appendChild(radio);
      c.disabled = true;

      (c as any).formDisabledCallback(false);

      expect(c.disabled).toBe(false);
      expect(radio.disabled).toBe(false);
    });
  });

  describe('double optional chaining safety', () => {
    it('componentWillLoad does not throw when internals is undefined', () => {
      const { c } = makeComponent('x');
      (c as any).internals = undefined;
      expect(() => (c as any).componentWillLoad()).not.toThrow();
    });

    it('onValueChange does not throw when internals is undefined', () => {
      const { c } = makeComponent();
      (c as any).internals = undefined;
      c.value = 'test';
      expect(() => (c as any).onValueChange()).not.toThrow();
    });
  });
});
