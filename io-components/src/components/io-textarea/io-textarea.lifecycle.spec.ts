import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTextarea } from './io-textarea';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeTextarea() {
  const c = new IoTextarea();
  (c as any).el = document.createElement('io-textarea');
  (c as any).label = 'Message';
  (c as any).input = { emit: vi.fn() };
  (c as any).change = { emit: vi.fn() };
  (c as any).focus = { emit: vi.fn() };
  (c as any).blur = { emit: vi.fn() };
  (c as any).internals = makeInternals();
  (c as any).componentWillLoad();
  return c;
}

describe('io-textarea — componentWillLoad with pre-set value', () => {
  it('captures defaultValue from pre-set value (covers ?? branch when value is not nullish)', () => {
    const c = new IoTextarea();
    (c as any).el = document.createElement('io-textarea');
    (c as any).value = 'preset';
    (c as any).input = { emit: vi.fn() };
    (c as any).change = { emit: vi.fn() };
    (c as any).focus = { emit: vi.fn() };
    (c as any).blur = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).componentWillLoad();
    expect((c as any).defaultValue).toBe('preset');
  });
});

describe('io-textarea — formResetCallback', () => {
  it('resets value to defaultValue and clears faceInvalid', () => {
    const c = makeTextarea();
    (c as any).faceInvalid = true;
    c.value = 'changed';
    (c as any).formResetCallback();
    expect(c.value).toBe('');
    expect((c as any).faceInvalid).toBe(false);
  });

  it('formResetCallback with pre-set defaultValue restores original value', () => {
    const c = new IoTextarea();
    (c as any).el = document.createElement('io-textarea');
    (c as any).value = 'original';
    (c as any).input = { emit: vi.fn() };
    (c as any).change = { emit: vi.fn() };
    (c as any).focus = { emit: vi.fn() };
    (c as any).blur = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).componentWillLoad();
    c.value = 'modified';
    (c as any).formResetCallback();
    expect(c.value).toBe('original');
  });
});

describe('io-textarea — syncFormValue fallback branch (required + no value + no shadow root)', () => {
  it('sets faceInvalid=true when required=true and value is empty', () => {
    const c = makeTextarea();
    c.required = true;
    c.value = undefined;
    (c as any).syncFormValue();
    expect((c as any).faceInvalid).toBe(true);
  });
});

describe('io-textarea — watcher methods', () => {
  let c: IoTextarea;

  beforeEach(() => {
    c = makeTextarea();
  });

  it('onValueChange calls syncFormValue', () => {
    const internals = makeInternals();
    (c as any).internals = internals;
    c.value = 'hello';
    (c as any).onValueChange();
    expect(internals.setFormValue).toHaveBeenCalled();
  });

  it('onRequiredChange calls syncFormValue', () => {
    const internals = makeInternals();
    (c as any).internals = internals;
    (c as any).onRequiredChange();
    expect(internals.setFormValue).toHaveBeenCalled();
  });

  it('onMaxLengthChange calls syncFormValue', () => {
    const internals = makeInternals();
    (c as any).internals = internals;
    (c as any).onMaxLengthChange();
    expect(internals.setFormValue).toHaveBeenCalled();
  });
});

describe('io-textarea — handleInput resize=auto branch', () => {
  it('adjusts textarea height when resize=auto', () => {
    const c = makeTextarea();
    c.resize = 'auto';

    const textarea = document.createElement('textarea');
    Object.defineProperty(textarea, 'scrollHeight', { value: 120, configurable: true });
    textarea.value = 'multi\nline\ntext';

    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: textarea });

    expect(() => (c as any).handleInput(ev)).not.toThrow();
    expect(textarea.style.height).toBe('120px');
  });

  it('does not adjust height when resize=vertical', () => {
    const c = makeTextarea();
    c.resize = 'vertical';

    const textarea = document.createElement('textarea');
    textarea.value = 'text';

    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: textarea });

    (c as any).handleInput(ev);
    expect(textarea.style.height).toBe('');
  });
});

describe('io-textarea — syncFormValue with native textarea', () => {
  it('sets faceInvalid=true when nativeTextarea.checkValidity() returns false', () => {
    const c = makeTextarea();
    const fakeTextarea = document.createElement('textarea');
    const fakeValidity = { valueMissing: true, valid: false } as ValidityState;
    Object.defineProperty(fakeTextarea, 'validity', { value: fakeValidity, configurable: true });
    Object.defineProperty(fakeTextarea, 'validationMessage', { value: 'Required', configurable: true });
    fakeTextarea.checkValidity = vi.fn().mockReturnValue(false);

    (c as any).el = {
      shadowRoot: { querySelector: vi.fn().mockReturnValue(fakeTextarea) },
    };
    const internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
      checkValidity: vi.fn().mockReturnValue(true),
      reportValidity: vi.fn().mockReturnValue(true),
    };
    (c as any).internals = internals;

    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(true);
    expect(internals.setValidity).toHaveBeenCalledWith(fakeValidity, 'Required', fakeTextarea);
  });

  it('sets faceInvalid=false when nativeTextarea.checkValidity() returns true', () => {
    const c = makeTextarea();
    const fakeTextarea = document.createElement('textarea');
    Object.defineProperty(fakeTextarea, 'validity', { value: { valid: true }, configurable: true });
    Object.defineProperty(fakeTextarea, 'validationMessage', { value: '', configurable: true });
    fakeTextarea.checkValidity = vi.fn().mockReturnValue(true);

    (c as any).el = {
      shadowRoot: { querySelector: vi.fn().mockReturnValue(fakeTextarea) },
    };
    const internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
      checkValidity: vi.fn().mockReturnValue(true),
      reportValidity: vi.fn().mockReturnValue(true),
    };
    (c as any).internals = internals;

    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(false);
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });
});

describe('io-textarea — render() branch coverage', () => {
  it('render() with default props does not throw', () => {
    const c = makeTextarea();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with state=error and message does not throw', () => {
    const c = makeTextarea();
    c.state = 'error';
    c.message = 'Required';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with helperText and no error does not throw', () => {
    const c = makeTextarea();
    c.state = 'none';
    c.helperText = 'Up to 500 characters';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with required=true does not throw', () => {
    const c = makeTextarea();
    c.required = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with faceInvalid=true does not throw', () => {
    const c = makeTextarea();
    (c as any).faceInvalid = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with showError true from faceInvalid and message does not throw', () => {
    const c = makeTextarea();
    (c as any).faceInvalid = true;
    c.message = 'Please fill in this field';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with maxLength set does not throw', () => {
    const c = makeTextarea();
    c.maxLength = 200;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with disabled=true does not throw', () => {
    const c = makeTextarea();
    c.disabled = true;
    expect(() => (c as any).render()).not.toThrow();
  });
});
