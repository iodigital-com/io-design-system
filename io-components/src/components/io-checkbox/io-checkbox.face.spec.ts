/**
 * io-checkbox — FACE (Form-Associated Custom Elements) unit tests — #166
 *
 * Verified: checked submits value, unchecked submits null (native behaviour).
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoCheckbox } from './io-checkbox';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-checkbox — FACE', () => {
  let component: IoCheckbox;

  beforeEach(() => {
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).label = 'Accept terms';
    component.value = 'yes';
    (component as any).componentWillLoad();
  });

  it('syncFormValue submits value when checked', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.checked = true;
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('yes');
  });

  it('syncFormValue submits null when unchecked (excluded from FormData)', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.checked = false;
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('syncFormValue sets valueMissing when required and unchecked', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.checked = false;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please check this box',
    );
  });

  it('syncFormValue clears validity when required and checked', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.checked = true;
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
