import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoSwitch } from './io-switch';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    reportValidity: vi.fn(),
    checkValidity: vi.fn(),
  };
}

function makeSwitch() {
  const c = new IoSwitch();
  (c as any).el = document.createElement('io-switch');
  (c as any).internals = makeInternals();
  c.label = 'Test';
  (c as any).componentWillLoad();
  return c;
}

describe('io-switch — @Watch callbacks', () => {
  it('onCheckedChange calls syncFormValue (setFormValue is invoked)', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;
    internals.setFormValue.mockClear();

    c.checked = true;
    (c as any).onCheckedChange();

    expect(internals.setFormValue).toHaveBeenCalled();
  });

  it('onValueChange calls syncFormValue (setFormValue is invoked)', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;
    internals.setFormValue.mockClear();

    c.value = 'yes';
    (c as any).onValueChange();

    expect(internals.setFormValue).toHaveBeenCalled();
  });

  it('onRequiredChange calls syncFormValue (setFormValue is invoked)', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;
    internals.setFormValue.mockClear();

    c.required = true;
    (c as any).onRequiredChange();

    expect(internals.setFormValue).toHaveBeenCalled();
  });
});

describe('io-switch — syncFormValue branches', () => {
  it('required=true, checked=true → faceInvalid=false, setValidity called with {}', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;

    c.required = true;
    c.checked = true;
    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(false);
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('required=true, checked=false → faceInvalid=true, setValidity called with {valueMissing:true}', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;

    c.required = true;
    c.checked = false;
    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(true);
    expect(internals.setValidity).toHaveBeenCalledWith({ valueMissing: true }, 'Please check this switch');
  });

  it('required=false, checked=false → faceInvalid=false, setValidity called with {}', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;

    c.required = false;
    c.checked = false;
    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(false);
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('checked=true passes the value string to setFormValue', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;

    c.value = 'active';
    c.checked = true;
    (c as any).syncFormValue();

    expect(internals.setFormValue).toHaveBeenCalledWith('active');
  });

  it('checked=false passes null to setFormValue', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;

    c.checked = false;
    (c as any).syncFormValue();

    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });
});

describe('io-switch — formResetCallback', () => {
  it('resets checked to defaultChecked and calls syncFormValue', () => {
    const c = makeSwitch();
    const internals = (c as any).internals;

    // Simulate a checked switch (defaultChecked was false at componentWillLoad)
    c.checked = true;
    internals.setFormValue.mockClear();

    (c as any).formResetCallback();

    // checked is restored to defaultChecked (false, as set at componentWillLoad)
    expect(c.checked).toBe(false);
    // setFormValue was called as part of the reset sync
    expect(internals.setFormValue).toHaveBeenCalled();
  });

  it('clears faceInvalid before syncFormValue when resetting a non-required switch', () => {
    const c = makeSwitch();
    // required=false — syncFormValue will set faceInvalid=false regardless
    c.required = false;
    (c as any).faceInvalid = true; // simulate a prior invalid state
    (c as any).formResetCallback();
    expect((c as any).faceInvalid).toBe(false);
  });

  it('re-evaluates validity after reset: required+unchecked → faceInvalid=true after reset sync', () => {
    // Build a switch that starts with required=true, checked=false (defaultChecked=false)
    const c = new IoSwitch();
    (c as any).el = document.createElement('io-switch');
    (c as any).internals = makeInternals();
    c.label = 'Test';
    c.required = true;
    (c as any).componentWillLoad();

    // Manually check it (defaultChecked stays false)
    c.checked = true;
    (c as any).faceInvalid = false;

    // Reset restores checked to false (defaultChecked), then syncFormValue runs
    (c as any).formResetCallback();

    // After reset: required=true, checked=false → syncFormValue sets faceInvalid=true
    expect(c.checked).toBe(false);
    expect((c as any).faceInvalid).toBe(true);
  });
});
