import { describe, it, expect, vi, beforeEach } from 'vitest';
import { syncFormState } from './sync-form-state';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
  };
}

describe('syncFormState', () => {
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    internals = makeInternals();
  });

  // ── formValue ──────────────────────────────────────────────────────────────

  it('calls setFormValue with the provided string value', () => {
    syncFormState(internals as unknown as ElementInternals, null, { formValue: 'hello' });
    expect(internals.setFormValue).toHaveBeenCalledWith('hello');
  });

  it('calls setFormValue with null for unchecked checkbox', () => {
    syncFormState(internals as unknown as ElementInternals, null, { formValue: null });
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('calls setFormValue with FormData for multi-value fields', () => {
    const fd = new FormData();
    fd.append('colors', 'red');
    syncFormState(internals as unknown as ElementInternals, null, { formValue: fd });
    expect(internals.setFormValue).toHaveBeenCalledWith(fd);
  });

  // ── disabled ───────────────────────────────────────────────────────────────

  it('clears validity when disabled — avoids "not focusable" browser error', () => {
    syncFormState(internals as unknown as ElementInternals, null, {
      formValue: '',
      required: true,
      disabled: true,
    });
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('returns faceInvalid=false when disabled regardless of required', () => {
    const result = syncFormState(internals as unknown as ElementInternals, null, {
      formValue: '',
      required: true,
      disabled: true,
    });
    expect(result.faceInvalid).toBe(false);
  });

  // ── native element path ────────────────────────────────────────────────────

  it('delegates setValidity from native element when native is invalid', () => {
    const nativeEl = {
      checkValidity: vi.fn(() => false),
      validity: { valueMissing: true },
      validationMessage: 'Please fill in this field',
    } as unknown as HTMLInputElement;

    syncFormState(internals as unknown as ElementInternals, nativeEl, {
      formValue: '',
      touched: true,
    });

    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please fill in this field',
      nativeEl,
    );
  });

  it('returns faceInvalid=true when native is invalid and touched=true', () => {
    const nativeEl = {
      checkValidity: vi.fn(() => false),
      validity: { valueMissing: true },
      validationMessage: 'Please fill in this field',
    } as unknown as HTMLInputElement;

    const result = syncFormState(internals as unknown as ElementInternals, nativeEl, {
      formValue: '',
      touched: true,
    });

    expect(result.faceInvalid).toBe(true);
  });

  it('returns faceInvalid=false when native is invalid but touched=false', () => {
    const nativeEl = {
      checkValidity: vi.fn(() => false),
      validity: { valueMissing: true },
      validationMessage: 'Please fill in this field',
    } as unknown as HTMLInputElement;

    const result = syncFormState(internals as unknown as ElementInternals, nativeEl, {
      formValue: '',
      touched: false,
    });

    expect(result.faceInvalid).toBe(false);
  });

  it('clears validity and returns faceInvalid=false when native is valid', () => {
    const nativeEl = {
      checkValidity: vi.fn(() => true),
      validity: {},
      validationMessage: '',
    } as unknown as HTMLInputElement;

    const result = syncFormState(internals as unknown as ElementInternals, nativeEl, {
      formValue: 'hello',
    });

    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect(result.faceInvalid).toBe(false);
  });

  // ── explicit validity flags path ───────────────────────────────────────────

  it('sets explicit validity flags and message when nativeEl is null', () => {
    const result = syncFormState(internals as unknown as ElementInternals, null, {
      formValue: null,
      validity: { valueMissing: true },
      validationMessage: 'Please check this box',
    });

    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please check this box',
    );
    expect(result.faceInvalid).toBe(true);
  });

  it('clears validity when explicit validity is empty object', () => {
    const result = syncFormState(internals as unknown as ElementInternals, null, {
      formValue: 'on',
      validity: {},
    });

    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect(result.faceInvalid).toBe(false);
  });

  // ── required-only fallback ─────────────────────────────────────────────────

  it('sets valueMissing when required and formValue is empty string (fallback path)', () => {
    const result = syncFormState(internals as unknown as ElementInternals, null, {
      formValue: '',
      required: true,
    });

    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please fill in this field',
    );
    expect(result.faceInvalid).toBe(true);
  });

  it('clears validity when required and formValue is non-empty (fallback path)', () => {
    const result = syncFormState(internals as unknown as ElementInternals, null, {
      formValue: 'hello',
      required: true,
    });

    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect(result.faceInvalid).toBe(false);
  });

  it('clears validity when not required and no value (fallback path)', () => {
    const result = syncFormState(internals as unknown as ElementInternals, null, {
      formValue: '',
      required: false,
    });

    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect(result.faceInvalid).toBe(false);
  });

  // ── touched gate ───────────────────────────────────────────────────────────

  it('returns faceInvalid=false when invalid but touched defaults to true (explicit flags)', () => {
    // touched defaults to true when omitted
    const result = syncFormState(internals as unknown as ElementInternals, null, {
      formValue: null,
      validity: { valueMissing: true },
      validationMessage: 'Required',
    });
    expect(result.faceInvalid).toBe(true);
  });

  // ── null internals guard ───────────────────────────────────────────────────

  it('does not throw when internals is undefined', () => {
    expect(() => {
      syncFormState(undefined, null, { formValue: '' });
    }).not.toThrow();
  });
});
