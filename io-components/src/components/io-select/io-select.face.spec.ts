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
});
