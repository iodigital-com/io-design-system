import { describe, it, expect, vi, beforeEach } from 'vitest';

import { implicitSubmit } from './implicit-submit';

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeForm(withNativeSubmit = false, withIoButtonSubmit = false): {
  form: HTMLFormElement;
  requestSubmit: ReturnType<typeof vi.fn>;
  nativeBtn?: HTMLButtonElement;
  ioButton?: HTMLElement;
} {
  const form = document.createElement('form');
  const requestSubmit = vi.fn();
  Object.defineProperty(form, 'requestSubmit', {
    value: requestSubmit,
    writable: true,
    configurable: true,
  });

  let nativeBtn: HTMLButtonElement | undefined;
  let ioButton: HTMLElement | undefined;

  if (withNativeSubmit) {
    nativeBtn = document.createElement('button');
    nativeBtn.type = 'submit';
    form.appendChild(nativeBtn);
    vi.spyOn(nativeBtn, 'click');
  }

  if (withIoButtonSubmit) {
    ioButton = document.createElement('io-button');
    ioButton.setAttribute('type', 'submit');
    (ioButton as HTMLElement & { type?: string }).type = 'submit';
    form.appendChild(ioButton);
    vi.spyOn(ioButton, 'click');
  }

  return { form, requestSubmit, nativeBtn, ioButton };
}

function makeInternals(form: HTMLFormElement | null): Pick<ElementInternals, 'form'> {
  return { form } as Pick<ElementInternals, 'form'>;
}

function makeKeyEvent(
  key: string,
  target: HTMLElement,
  overrides: Partial<KeyboardEventInit> = {},
): KeyboardEvent {
  const ev = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...overrides,
  });
  Object.defineProperty(ev, 'target', { value: target, configurable: true });
  Object.defineProperty(ev, 'preventDefault', { value: vi.fn(), configurable: true });
  return ev;
}

function makeInput(type = 'text'): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  return input;
}

// ── No-op cases ───────────────────────────────────────────────────────────────

describe('implicitSubmit — no-op cases', () => {
  it('does nothing when key is not Enter', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Space', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing when isComposing (IME)', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input, { isComposing: true });
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing when event is defaultPrevented', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    Object.defineProperty(ev, 'defaultPrevented', { value: true, configurable: true });
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing when disabled=true', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals, { disabled: true });
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing when loading=true', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals, { loading: true });
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing when internals is null', () => {
    const input = makeInput('text');
    const ev = makeKeyEvent('Enter', input);
    expect(() => implicitSubmit(ev, null)).not.toThrow();
  });

  it('does nothing when internals is undefined', () => {
    const input = makeInput('text');
    const ev = makeKeyEvent('Enter', input);
    expect(() => implicitSubmit(ev, undefined)).not.toThrow();
  });

  it('does nothing when internals.form is null (not in a form)', () => {
    const { requestSubmit } = makeForm(false, false);
    const input = makeInput('text');
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(null) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing for textarea target', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const textarea = document.createElement('textarea');
    form.appendChild(textarea);
    const ev = makeKeyEvent('Enter', textarea);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing for checkbox input', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('checkbox');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing for radio input', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('radio');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing for submit input', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('submit');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing for file input', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('file');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing for range input', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('range');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does nothing for color input', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const input = makeInput('color');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).not.toHaveBeenCalled();
  });
});

// ── requestSubmit fallback ─────────────────────────────────────────────────────

describe('implicitSubmit — fallback to requestSubmit when no submit control', () => {
  let form: HTMLFormElement;
  let requestSubmit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    ({ form, requestSubmit } = makeForm(false, false));
  });

  it('calls form.requestSubmit() for text input', () => {
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).toHaveBeenCalled();
  });

  it('calls form.requestSubmit() for email input', () => {
    const input = makeInput('email');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).toHaveBeenCalled();
  });

  it('calls form.requestSubmit() for password input', () => {
    const input = makeInput('password');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).toHaveBeenCalled();
  });

  it('calls form.requestSubmit() for search input', () => {
    const input = makeInput('search');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).toHaveBeenCalled();
  });

  it('calls form.requestSubmit() for tel input', () => {
    const input = makeInput('tel');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).toHaveBeenCalled();
  });

  it('calls form.requestSubmit() for url input', () => {
    const input = makeInput('url');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).toHaveBeenCalled();
  });

  it('calls form.requestSubmit() for number input', () => {
    const input = makeInput('number');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(requestSubmit).toHaveBeenCalled();
  });

  it('prevents default before calling requestSubmit', () => {
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(ev.preventDefault).toHaveBeenCalled();
  });
});

// ── Native submit button click ─────────────────────────────────────────────────

describe('implicitSubmit — clicks first native submit control', () => {
  it('clicks native button[type=submit] instead of calling requestSubmit', () => {
    const { form, requestSubmit, nativeBtn } = makeForm(true, false);
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(nativeBtn!.click).toHaveBeenCalled();
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('clicks input[type=submit] control', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const submitInput = document.createElement('input');
    submitInput.type = 'submit';
    form.appendChild(submitInput);
    vi.spyOn(submitInput, 'click');

    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(submitInput.click).toHaveBeenCalled();
    expect(requestSubmit).not.toHaveBeenCalled();
  });
});

// ── io-button[type=submit] click ──────────────────────────────────────────────

describe('implicitSubmit — clicks io-button[type=submit]', () => {
  it('clicks io-button[type=submit] when no native submit present', () => {
    const { form, requestSubmit, ioButton } = makeForm(false, true);
    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(ioButton!.click).toHaveBeenCalled();
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('prefers native submit button in document order over io-button', () => {
    const { form, requestSubmit } = makeForm(false, false);

    // io-button first in DOM order
    const ioButton = document.createElement('io-button');
    ioButton.setAttribute('type', 'submit');
    (ioButton as HTMLElement & { type?: string }).type = 'submit';
    form.appendChild(ioButton);
    vi.spyOn(ioButton, 'click');

    // native button second
    const nativeBtn = document.createElement('button');
    nativeBtn.type = 'submit';
    form.appendChild(nativeBtn);
    vi.spyOn(nativeBtn, 'click');

    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);

    // io-button is first in DOM order → should be clicked
    expect(ioButton.click).toHaveBeenCalled();
    expect(nativeBtn.click).not.toHaveBeenCalled();
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('io-button detected by attribute alone when JS property not set', () => {
    const { form, requestSubmit } = makeForm(false, false);
    const ioButton = document.createElement('io-button');
    ioButton.setAttribute('type', 'submit');
    // Intentionally NOT setting JS property — attribute-only detection
    form.appendChild(ioButton);
    vi.spyOn(ioButton, 'click');

    const input = makeInput('text');
    form.appendChild(input);
    const ev = makeKeyEvent('Enter', input);
    implicitSubmit(ev, makeInternals(form) as ElementInternals);
    expect(ioButton.click).toHaveBeenCalled();
    expect(requestSubmit).not.toHaveBeenCalled();
  });
});
