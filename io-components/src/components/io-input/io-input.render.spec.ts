/**
 * io-input — render branch + uncovered function coverage
 *
 * Targets the gaps not covered by the existing spec files:
 *   - onValueChange / onRequiredChange / onMaxLengthChange / onMinChange /
 *     onMaxChange / onStepChange watch handlers
 *   - syncFormValue path that uses the native <input>.validity object
 *     (the shadow-root branch, not the jsdom fallback)
 *   - render() class-name branches for state, disabled, readonly,
 *     hasPrefix, hasSuffix, faceInvalid, showError, helperText,
 *     message, required, maxLength
 *   - nameChanged() watch handler
 *   - render() does not throw for every key prop combination
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoInput } from './io-input';

// ── helpers ──────────────────────────────────────────────────────────────────

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeInput() {
  const c = new IoInput();
  c.label = 'Email';
  (c as any).el = document.createElement('io-input');
  (c as any).internals = makeInternals();
  (c as any).input = { emit: vi.fn() };
  (c as any).change = { emit: vi.fn() };
  (c as any).focus = { emit: vi.fn() };
  (c as any).blur = { emit: vi.fn() };
  (c as any).componentWillLoad();
  return c;
}

// ── @Watch handler delegation ─────────────────────────────────────────────────

describe('io-input — @Watch handler delegation', () => {
  let c: IoInput;
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    c = makeInput();
    internals = makeInternals();
    (c as any).internals = internals;
  });

  it('onValueChange calls syncFormValue', () => {
    c.value = 'new';
    (c as any).onValueChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('new');
  });

  it('onRequiredChange calls syncFormValue', () => {
    c.required = true;
    c.value = '';
    (c as any).onRequiredChange();
    // required + empty value → valueMissing in fallback path (no shadow root)
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please fill in this field',
    );
  });

  it('onMaxLengthChange calls syncFormValue', () => {
    c.value = 'hello';
    (c as any).onMaxLengthChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('hello');
  });

  it('onMinChange calls syncFormValue', () => {
    c.value = '5';
    (c as any).onMinChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('5');
  });

  it('onMaxChange calls syncFormValue', () => {
    c.value = '10';
    (c as any).onMaxChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('10');
  });

  it('onStepChange calls syncFormValue', () => {
    c.value = '3';
    (c as any).onStepChange();
    expect(internals.setFormValue).toHaveBeenCalledWith('3');
  });

  it('nameChanged updates inputId based on new name', () => {
    (c as any).nameChanged('username');
    const ids = (c as any).getInputIds();
    expect(ids.inputId).toMatch(/^io-input-username-/);
  });

  it('nameChanged with undefined falls back to fallback id pattern', () => {
    (c as any).nameChanged(undefined);
    const ids = (c as any).getInputIds();
    expect(ids.inputId).toMatch(/^io-input-/);
  });
});

// ── syncFormValue — native shadow root path ───────────────────────────────────

describe('io-input — syncFormValue with native input validity', () => {
  let c: IoInput;
  let internals: ReturnType<typeof makeInternals>;

  beforeEach(() => {
    c = makeInput();
    internals = makeInternals();
    (c as any).internals = internals;
  });

  it('uses nativeInput.validity when shadow root provides a valid input', () => {
    const nativeInput = document.createElement('input');
    // default native input is valid
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(nativeInput) };
    (c as any).el = { shadowRoot: mockShadowRoot };

    c.value = 'hello';
    (c as any).syncFormValue();

    expect(internals.setFormValue).toHaveBeenCalledWith('hello');
    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect((c as any).faceInvalid).toBe(false);
  });

  it('sets faceInvalid=true and calls setValidity when native input is invalid', () => {
    const nativeInput = document.createElement('input');
    nativeInput.required = true;
    // native input with required and no value → invalid
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(nativeInput) };
    (c as any).el = { shadowRoot: mockShadowRoot };

    c.value = '';
    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(true);
    expect(internals.setValidity).toHaveBeenCalledWith(
      nativeInput.validity,
      nativeInput.validationMessage,
      nativeInput,
    );
  });

  it('clears faceInvalid when native input becomes valid after previously invalid', () => {
    const nativeInput = document.createElement('input');
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(nativeInput) };
    (c as any).el = { shadowRoot: mockShadowRoot };
    (c as any).faceInvalid = true;

    c.value = 'valid-value';
    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(false);
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('handles missing internals gracefully when shadow root path fires', () => {
    const nativeInput = document.createElement('input');
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(nativeInput) };
    (c as any).el = { shadowRoot: mockShadowRoot };
    (c as any).internals = undefined;

    expect(() => (c as any).syncFormValue()).not.toThrow();
  });
});

// ── render() — wrapper class branches ────────────────────────────────────────

describe('io-input — render() wrapper class branches', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('render does not throw with default props', () => {
    expect(() => c.render()).not.toThrow();
  });

  it('applies input-wrapper--state-error class when state=error', () => {
    c.state = 'error';
    vi.mocked(h).mockClear();
    c.render();

    const wrapperCall = vi.mocked(h).mock.calls.find(
      (call) => typeof call[1]?.class === 'string' && (call[1].class as string).startsWith('input-wrapper'),
    );
    expect((wrapperCall?.[1]?.class as string)).toContain('input-wrapper--state-error');
  });

  it('applies input-wrapper--state-error class when faceInvalid=true', () => {
    (c as any).faceInvalid = true;
    vi.mocked(h).mockClear();
    c.render();

    const wrapperCall = vi.mocked(h).mock.calls.find(
      (call) => typeof call[1]?.class === 'string' && (call[1].class as string).startsWith('input-wrapper'),
    );
    expect((wrapperCall?.[1]?.class as string)).toContain('input-wrapper--state-error');
  });

  it('does not apply input-wrapper--state-error when state=none and faceInvalid=false', () => {
    c.state = 'none';
    (c as any).faceInvalid = false;
    vi.mocked(h).mockClear();
    c.render();

    const wrapperCall = vi.mocked(h).mock.calls.find(
      (call) => typeof call[1]?.class === 'string' && (call[1].class as string).startsWith('input-wrapper'),
    );
    expect((wrapperCall?.[1]?.class as string)).not.toContain('input-wrapper--state-error');
  });

  it('applies input-wrapper--disabled class when disabled=true', () => {
    c.disabled = true;
    vi.mocked(h).mockClear();
    c.render();

    const wrapperCall = vi.mocked(h).mock.calls.find(
      (call) => typeof call[1]?.class === 'string' && (call[1].class as string).startsWith('input-wrapper'),
    );
    expect((wrapperCall?.[1]?.class as string)).toContain('input-wrapper--disabled');
  });

  it('does not apply input-wrapper--disabled class when disabled=false', () => {
    c.disabled = false;
    vi.mocked(h).mockClear();
    c.render();

    const wrapperCall = vi.mocked(h).mock.calls.find(
      (call) => typeof call[1]?.class === 'string' && (call[1].class as string).startsWith('input-wrapper'),
    );
    expect((wrapperCall?.[1]?.class as string)).not.toContain('input-wrapper--disabled');
  });

  it('applies input-wrapper--readonly class when readonly=true', () => {
    c.readonly = true;
    vi.mocked(h).mockClear();
    c.render();

    const wrapperCall = vi.mocked(h).mock.calls.find(
      (call) => typeof call[1]?.class === 'string' && (call[1].class as string).startsWith('input-wrapper'),
    );
    expect((wrapperCall?.[1]?.class as string)).toContain('input-wrapper--readonly');
  });

  it('combines state-error, disabled, and readonly wrapper classes simultaneously', () => {
    c.state = 'error';
    c.disabled = true;
    c.readonly = true;
    vi.mocked(h).mockClear();
    c.render();

    const wrapperCall = vi.mocked(h).mock.calls.find(
      (call) => typeof call[1]?.class === 'string' && (call[1].class as string).startsWith('input-wrapper'),
    );
    const cls = wrapperCall?.[1]?.class as string;
    expect(cls).toContain('input-wrapper--state-error');
    expect(cls).toContain('input-wrapper--disabled');
    expect(cls).toContain('input-wrapper--readonly');
  });
});

// ── render() — input field class branches ────────────────────────────────────

describe('io-input — render() input field class branches', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('applies correct size class for size=sm', () => {
    c.size = 'sm';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect((inputCall?.[1]?.class as string)).toContain('input-field--sm');
  });

  it('applies correct size class for size=lg', () => {
    c.size = 'lg';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect((inputCall?.[1]?.class as string)).toContain('input-field--lg');
  });

  it('does not apply prefix/suffix classes when both are absent', () => {
    (c as any).hasPrefix = false;
    (c as any).hasSuffix = false;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const cls = inputCall?.[1]?.class as string;
    expect(cls).not.toContain('input-field--has-prefix');
    expect(cls).not.toContain('input-field--has-suffix');
  });

  it('applies both prefix and suffix classes simultaneously', () => {
    (c as any).hasPrefix = true;
    (c as any).hasSuffix = true;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const cls = inputCall?.[1]?.class as string;
    expect(cls).toContain('input-field--has-prefix');
    expect(cls).toContain('input-field--has-suffix');
  });
});

// ── render() — aria and native input props ────────────────────────────────────

describe('io-input — render() aria and native input attributes', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('sets aria-invalid="true" when state=error', () => {
    c.state = 'error';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['aria-invalid']).toBe('true');
  });

  it('sets aria-invalid="true" when faceInvalid=true', () => {
    (c as any).faceInvalid = true;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['aria-invalid']).toBe('true');
  });

  it('does not set aria-invalid when state=none', () => {
    c.state = 'none';
    (c as any).faceInvalid = false;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['aria-invalid']).toBeUndefined();
  });

  it('passes maxLength prop to native input when set', () => {
    c.maxLength = 50;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['maxLength']).toBe(50);
  });

  it('passes undefined maxLength to native input when not set', () => {
    c.maxLength = undefined;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['maxLength']).toBeUndefined();
  });

  it('sets required on the native input when required=true', () => {
    c.required = true;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['required']).toBe(true);
  });

  it('sets disabled on the native input when disabled=true', () => {
    c.disabled = true;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['disabled']).toBe(true);
  });

  it('passes placeholder to the native input', () => {
    c.placeholder = 'Enter email';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['placeholder']).toBe('Enter email');
  });

  it('falls back to a single space placeholder when placeholder is undefined', () => {
    c.placeholder = undefined;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['placeholder']).toBe(' ');
  });

  it('passes autocomplete to the native input', () => {
    c.autocomplete = 'email';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['autocomplete']).toBe('email');
  });

  it('passes name to the native input', () => {
    c.name = 'email-field';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['name']).toBe('email-field');
  });
});

// ── render() — aria-describedby logic ────────────────────────────────────────

describe('io-input — render() aria-describedby computation', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('sets aria-describedby to messageId when state=error and message is present', () => {
    c.state = 'error';
    c.message = 'This field is required';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const describedBy = inputCall?.[1]?.['aria-describedby'] as string;
    expect(describedBy).toContain('-error');
  });

  it('does not set aria-describedby when state=error but message is absent', () => {
    c.state = 'error';
    c.message = '';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['aria-describedby']).toBeUndefined();
  });

  it('sets aria-describedby to helperId when state=none and helperText is present', () => {
    c.state = 'none';
    (c as any).faceInvalid = false;
    c.helperText = 'Enter your work email';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const describedBy = inputCall?.[1]?.['aria-describedby'] as string;
    expect(describedBy).toContain('-helper');
  });

  it('does not set aria-describedby when state=none and no helperText', () => {
    c.state = 'none';
    (c as any).faceInvalid = false;
    c.helperText = undefined;
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall?.[1]?.['aria-describedby']).toBeUndefined();
  });

  it('does not include helperId when state=error and message is shown', () => {
    c.state = 'error';
    c.helperText = 'Helper text';
    c.message = 'Error occurred';
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const describedBy = inputCall?.[1]?.['aria-describedby'] as string;
    expect(describedBy).not.toContain('-helper');
    expect(describedBy).toContain('-error');
  });
});

// ── render() — label and required star ───────────────────────────────────────

describe('io-input — render() label and required indicator', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('renders a label element with htmlFor matching the inputId', () => {
    vi.mocked(h).mockClear();
    c.render();

    const labelCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'label');
    const ids = (c as any).getInputIds();
    expect(labelCall?.[1]?.['htmlFor']).toBe(ids.inputId);
  });

  it('renders the required star span when required=true', () => {
    c.required = true;
    vi.mocked(h).mockClear();
    c.render();

    const spanCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'span' && call[1]?.class === 'input-required',
    );
    expect(spanCall).toBeDefined();
  });

  it('does not render the required star span when required=false', () => {
    c.required = false;
    vi.mocked(h).mockClear();
    c.render();

    const spanCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'span' && call[1]?.class === 'input-required',
    );
    expect(spanCall).toBeUndefined();
  });
});

// ── render() — error message and helper text paragraphs ──────────────────────

describe('io-input — render() error and helper text paragraphs', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('renders message paragraph when state=error and message is set', () => {
    c.state = 'error';
    c.message = 'Something went wrong';
    vi.mocked(h).mockClear();
    c.render();

    const errorPara = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-message--error'),
    );
    expect(errorPara).toBeDefined();
    expect(errorPara?.[1]?.['role']).toBe('alert');
  });

  it('does not render error paragraph when state=none', () => {
    c.state = 'none';
    (c as any).faceInvalid = false;
    c.message = 'Something went wrong';
    vi.mocked(h).mockClear();
    c.render();

    const errorPara = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-message--error'),
    );
    expect(errorPara).toBeUndefined();
  });

  it('renders error paragraph as hidden when state=error but message is absent', () => {
    c.state = 'error';
    c.message = '';
    vi.mocked(h).mockClear();
    c.render();

    const errorPara = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-error--hidden'),
    );
    expect(errorPara).toBeDefined();
  });

  it('renders helper paragraph when showError=false and helperText is set', () => {
    c.state = 'none';
    (c as any).faceInvalid = false;
    c.helperText = 'Enter your company email';
    vi.mocked(h).mockClear();
    c.render();

    const helperPara = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && call[1]?.class === 'input-helper',
    );
    expect(helperPara).toBeDefined();
  });

  it('does not render helper paragraph when state=error and message is shown', () => {
    c.state = 'error';
    c.helperText = 'Enter your company email';
    c.message = 'Invalid email';
    vi.mocked(h).mockClear();
    c.render();

    const helperPara = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && call[1]?.class === 'input-helper',
    );
    expect(helperPara).toBeUndefined();
  });

  it('does not render helper paragraph when helperText is absent', () => {
    c.state = 'none';
    (c as any).faceInvalid = false;
    c.helperText = undefined;
    vi.mocked(h).mockClear();
    c.render();

    const helperPara = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && call[1]?.class === 'input-helper',
    );
    expect(helperPara).toBeUndefined();
  });

  it('renders error paragraph when faceInvalid=true and message is set', () => {
    (c as any).faceInvalid = true;
    c.message = 'Field is invalid';
    vi.mocked(h).mockClear();
    c.render();

    const errorPara = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-message--error'),
    );
    expect(errorPara).toBeDefined();
  });
});

// ── render() — error icon visibility ─────────────────────────────────────────

describe('io-input — render() error icon div', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('renders the state icon div when state=error', () => {
    c.state = 'error';
    vi.mocked(h).mockClear();
    c.render();

    const iconDiv = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'div' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-state-icon'),
    );
    expect(iconDiv).toBeDefined();
    expect(iconDiv?.[1]?.['aria-hidden']).toBe('true');
  });

  it('does not render the state icon div when state=none', () => {
    c.state = 'none';
    (c as any).faceInvalid = false;
    vi.mocked(h).mockClear();
    c.render();

    const iconDiv = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'div' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-state-icon'),
    );
    expect(iconDiv).toBeUndefined();
  });
});

// ── render() — prefix/suffix slot hidden class ────────────────────────────────

describe('io-input — render() prefix/suffix slot visibility classes', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('prefix slot span has input-slot--hidden when hasPrefix=false', () => {
    (c as any).hasPrefix = false;
    vi.mocked(h).mockClear();
    c.render();

    const prefixSpan = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'span' && typeof call[1]?.class === 'string' &&
        (call[1].class as string).includes('input-slot--prefix'),
    );
    expect((prefixSpan?.[1]?.class as string)).toContain('input-slot--hidden');
  });

  it('prefix slot span does NOT have input-slot--hidden when hasPrefix=true', () => {
    (c as any).hasPrefix = true;
    vi.mocked(h).mockClear();
    c.render();

    const prefixSpan = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'span' && typeof call[1]?.class === 'string' &&
        (call[1].class as string).includes('input-slot--prefix'),
    );
    expect((prefixSpan?.[1]?.class as string)).not.toContain('input-slot--hidden');
  });

  it('suffix slot span has input-slot--hidden when hasSuffix=false', () => {
    (c as any).hasSuffix = false;
    vi.mocked(h).mockClear();
    c.render();

    const suffixSpan = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'span' && typeof call[1]?.class === 'string' &&
        (call[1].class as string).includes('input-slot--suffix'),
    );
    expect((suffixSpan?.[1]?.class as string)).toContain('input-slot--hidden');
  });

  it('suffix slot span does NOT have input-slot--hidden when hasSuffix=true', () => {
    (c as any).hasSuffix = true;
    vi.mocked(h).mockClear();
    c.render();

    const suffixSpan = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'span' && typeof call[1]?.class === 'string' &&
        (call[1].class as string).includes('input-slot--suffix'),
    );
    expect((suffixSpan?.[1]?.class as string)).not.toContain('input-slot--hidden');
  });
});

// ── render() — exhaustive no-throw matrix ────────────────────────────────────

describe('io-input — render() does not throw for prop combinations', () => {
  it.each([
    { label: 'error + msg', state: 'error' as const, message: 'Oops', helperText: undefined },
    { label: 'faceInvalid + msg', faceInvalid: true, message: 'Bad', helperText: undefined },
    { label: 'helperText only', state: 'none' as const, faceInvalid: false, helperText: 'Help' },
    { label: 'both helper and error msg, error active', state: 'error' as const, message: 'E', helperText: 'H' },
    { label: 'readonly', readonly: true },
    { label: 'disabled', disabled: true },
    { label: 'required', required: true },
    { label: 'maxLength', maxLength: 100 },
    { label: 'hasPrefix', _hasPrefix: true },
    { label: 'hasSuffix', _hasSuffix: true },
    { label: 'size sm', size: 'sm' as const },
    { label: 'size lg', size: 'lg' as const },
    { label: 'type=email', type: 'email' as const },
    { label: 'type=password', type: 'password' as const },
    { label: 'type=number', type: 'number' as const },
    { label: 'type=search', type: 'search' as const },
    { label: 'all slots active', _hasPrefix: true, _hasSuffix: true, state: 'error' as const, message: 'X', required: true },
  ])('does not throw: $label', (props) => {
    const c = makeInput();
    if ((props as any).state !== undefined) c.state = (props as any).state;
    if ((props as any).faceInvalid !== undefined) (c as any).faceInvalid = (props as any).faceInvalid;
    if ((props as any).message !== undefined) c.message = (props as any).message as string;
    if (props.helperText !== undefined) c.helperText = props.helperText as string;
    if ((props as any).readonly !== undefined) c.readonly = (props as any).readonly;
    if ((props as any).disabled !== undefined) c.disabled = (props as any).disabled;
    if ((props as any).required !== undefined) c.required = (props as any).required;
    if ((props as any).maxLength !== undefined) c.maxLength = (props as any).maxLength;
    if ((props as any)._hasPrefix !== undefined) (c as any).hasPrefix = (props as any)._hasPrefix;
    if ((props as any)._hasSuffix !== undefined) (c as any).hasSuffix = (props as any)._hasSuffix;
    if ((props as any).size !== undefined) c.size = (props as any).size;
    if ((props as any).type !== undefined) c.type = (props as any).type;

    expect(() => c.render()).not.toThrow();
  });
});

// ── render() — nativeInputEl ref callback ────────────────────────────────────

describe('io-input — render() nativeInputEl ref callback', () => {
  it('assigns element to nativeInputEl when ref is invoked', () => {
    const c = makeInput();
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    expect(inputCall).toBeDefined();

    const refFn = inputCall![1].ref as (el: HTMLInputElement | undefined) => void;
    const mockEl = document.createElement('input');
    refFn(mockEl);
    expect((c as any).nativeInputEl).toBe(mockEl);
  });

  it('clears nativeInputEl when ref is invoked with undefined', () => {
    const c = makeInput();
    (c as any).nativeInputEl = document.createElement('input');
    vi.mocked(h).mockClear();
    c.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const refFn = inputCall![1].ref as (el: HTMLInputElement | undefined) => void;
    refFn(undefined);
    expect((c as any).nativeInputEl).toBeUndefined();
  });
});
