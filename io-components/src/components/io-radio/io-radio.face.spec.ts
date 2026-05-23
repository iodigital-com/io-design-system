/**
 * io-radio — FACE (Form-Associated Custom Elements) unit tests — #166
 *
 * Verified: checked submits value, unchecked submits null (native behaviour).
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoRadio } from './io-radio';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-radio — FACE', () => {
  let component: IoRadio;

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
    (component as any).label = 'Option A';
    component.value = 'a';
    (component as any).componentWillLoad();
  });

  it('syncFormValue submits value when checked', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.checked = true;
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('a');
  });

  it('syncFormValue submits null when unchecked (excluded from FormData)', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.checked = false;
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('syncFormValue sets valueMissing when required and unchecked with no checked sibling', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.checked = false;
    (component as any).el.setAttribute('name', 'choice');
    (component as any).name = 'choice';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please select an option',
    );
  });

  it('syncFormValue clears validity when required and a sibling radio in the group is checked', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.required = true;
    component.checked = false;
    (component as any).name = 'choice';

    // Simulate a checked sibling in the document
    const sibling = document.createElement('io-radio') as HTMLElement & { name: string; checked: boolean };
    sibling.name = 'choice';
    sibling.checked = true;
    document.body.appendChild(sibling);

    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});

    document.body.removeChild(sibling);
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
