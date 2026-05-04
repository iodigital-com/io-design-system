/**
 * FACE (Form-Associated Custom Elements) unit tests — #166
 *
 * Verifies that each form control:
 *   1. Calls setFormValue() with the correct payload on init and on prop changes
 *   2. Calls setValidity() correctly for required/optional states
 *   3. Exposes checkValidity() and reportValidity() @Methods
 *
 * The Stencil @AttachInternals decorator is a no-op in unit tests (mocked as vi.fn()).
 * We manually attach a mock ElementInternals to test the sync logic.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoInput } from '../../src/components/io-input/io-input';
import { IoTextarea } from '../../src/components/io-textarea/io-textarea';
import { IoCheckbox } from '../../src/components/io-checkbox/io-checkbox';
import { IoRadio } from '../../src/components/io-radio/io-radio';
import { IoSelect } from '../../src/components/io-select/io-select';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn(() => true),
    reportValidity: vi.fn(() => true),
  };
}

// ── io-input ──────────────────────────────────────────────────────────────

describe('io-input — FACE', () => {
  let component: IoInput;
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
    internals = makeInternals();
    (component as any).internals = internals;
    (component as any).componentWillLoad();
  });

  it('calls setFormValue with empty string on init', () => {
    expect(internals.setFormValue).toHaveBeenCalledWith('');
  });

  it('calls setFormValue with current value on init', () => {
    internals.setFormValue.mockClear();
    component.value = 'hello';
    (component as any).onValueChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('hello');
  });

  it('sets valueMissing validity when required and empty', () => {
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      expect.any(String),
    );
  });

  it('clears validity when required and has value', () => {
    component.required = true;
    component.value = 'test@example.com';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('checkValidity() delegates to internals', async () => {
    const result = await component.checkValidity();
    expect(internals.checkValidity).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('reportValidity() delegates to internals', async () => {
    const result = await component.reportValidity();
    expect(internals.reportValidity).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});

// ── io-textarea ───────────────────────────────────────────────────────────

describe('io-textarea — FACE', () => {
  let component: IoTextarea;
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    internals = makeInternals();
    (component as any).internals = internals;
    (component as any).componentWillLoad();
  });

  it('calls setFormValue with empty string on init', () => {
    expect(internals.setFormValue).toHaveBeenCalledWith('');
  });

  it('calls setFormValue on value change', () => {
    internals.setFormValue.mockClear();
    component.value = 'some text';
    (component as any).onValueChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('some text');
  });

  it('sets valueMissing when required and empty', () => {
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      expect.any(String),
    );
  });

  it('checkValidity() and reportValidity() delegate to internals', async () => {
    expect(await component.checkValidity()).toBe(true);
    expect(await component.reportValidity()).toBe(true);
  });
});

// ── io-checkbox ───────────────────────────────────────────────────────────

describe('io-checkbox — FACE', () => {
  let component: IoCheckbox;
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    internals = makeInternals();
    (component as any).internals = internals;
    (component as any).componentWillLoad();
  });

  it('sets null form value when unchecked (excludes from FormData)', () => {
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('sets value string when checked', () => {
    internals.setFormValue.mockClear();
    component.value = 'agree';
    component.checked = true;
    (component as any).onCheckedChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('agree');
  });

  it('sets null again when unchecked after being checked', () => {
    component.checked = true;
    internals.setFormValue.mockClear();
    component.checked = false;
    (component as any).onCheckedChange();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('sets valueMissing when required and unchecked', () => {
    component.required = true;
    component.checked = false;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      expect.any(String),
    );
  });

  it('clears validity when required and checked', () => {
    component.required = true;
    component.checked = true;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('checkValidity() and reportValidity() delegate to internals', async () => {
    expect(await component.checkValidity()).toBe(true);
    expect(await component.reportValidity()).toBe(true);
  });
});

// ── io-radio ──────────────────────────────────────────────────────────────

describe('io-radio — FACE', () => {
  let component: IoRadio;
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
    internals = makeInternals();
    (component as any).internals = internals;
    (component as any).componentWillLoad();
  });

  it('sets null form value when unchecked', () => {
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('sets value string when checked', () => {
    internals.setFormValue.mockClear();
    component.value = 'option-a';
    component.checked = true;
    (component as any).onCheckedChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('option-a');
  });

  it('sets valueMissing when required and unchecked', () => {
    component.required = true;
    component.checked = false;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      expect.any(String),
    );
  });

  it('checkValidity() and reportValidity() delegate to internals', async () => {
    expect(await component.checkValidity()).toBe(true);
    expect(await component.reportValidity()).toBe(true);
  });
});

// ── io-select ─────────────────────────────────────────────────────────────

describe('io-select — FACE (single mode)', () => {
  let component: IoSelect;
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    internals = makeInternals();
    (component as any).internals = internals;
    (component as any).componentWillLoad();
  });

  it('calls setFormValue with empty string on init', () => {
    expect(internals.setFormValue).toHaveBeenCalledWith('');
  });

  it('calls setFormValue with selected value', () => {
    internals.setFormValue.mockClear();
    component.value = 'nl';
    (component as any).onValueChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('nl');
  });

  it('sets valueMissing when required and no value', () => {
    component.required = true;
    component.value = '';
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      expect.any(String),
    );
  });

  it('checkValidity() and reportValidity() delegate to internals', async () => {
    expect(await component.checkValidity()).toBe(true);
    expect(await component.reportValidity()).toBe(true);
  });
});

describe('io-select — FACE (multiple mode)', () => {
  let component: IoSelect;
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    component.multiple = true;
    (component as any).selectedValues = [];
    internals = makeInternals();
    (component as any).internals = internals;
    (component as any).componentWillLoad();
  });

  it('sets null form value when no selections', () => {
    (component as any).selectedValues = [];
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('sets null form value when selections exist but name is undefined (unnamed control)', () => {
    component.name = undefined;
    (component as any).selectedValues = ['a', 'b'];
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('sets FormData with multiple values when selections exist', () => {
    component.name = 'tags';
    (component as any).selectedValues = ['a', 'b'];
    (component as any).onSelectedValuesChange();
    const fdArg = internals.setFormValue.mock.calls.at(-1)?.[0];
    expect(fdArg).toBeInstanceOf(FormData);
    expect((fdArg as FormData).getAll('tags')).toEqual(['a', 'b']);
  });

  it('sets valueMissing when required and no selections', () => {
    component.required = true;
    (component as any).selectedValues = [];
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      expect.any(String),
    );
  });
});
