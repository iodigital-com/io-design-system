import { describe, it, expect, vi } from 'vitest';

import { IoButton } from './io-button';

function makeInternals(formOverride?: HTMLFormElement | null) {
  return {
    setFormValue: vi.fn(),
    form: formOverride !== undefined ? formOverride : { requestSubmit: vi.fn(), reset: vi.fn() },
  };
}

function makeButton() {
  const c = new IoButton();
  (c as any).el = document.createElement('io-button');
  (c as any).click = { emit: vi.fn() };
  (c as any).internals = makeInternals();
  return c;
}

describe('io-button — FACE: props', () => {
  it('name prop is undefined by default', () => {
    const c = makeButton();
    expect(c.name).toBeUndefined();
  });

  it('form prop is undefined by default', () => {
    const c = makeButton();
    expect(c.form).toBeUndefined();
  });

  it('can set name', () => {
    const c = makeButton();
    c.name = 'action';
    expect(c.name).toBe('action');
  });

  it('can set form', () => {
    const c = makeButton();
    c.form = 'my-form';
    expect(c.form).toBe('my-form');
  });
});

describe('io-button — FACE: componentWillLoad', () => {
  it('calls setFormValue when form and name are set', () => {
    const c = makeButton();
    c.form = 'my-form';
    c.name = 'action';
    c.value = 'submit';
    c.componentWillLoad();
    expect((c as any).internals.setFormValue).toHaveBeenCalledWith('submit');
  });

  it('does not call setFormValue when name is missing', () => {
    const c = makeButton();
    c.form = 'my-form';
    c.componentWillLoad();
    expect((c as any).internals.setFormValue).not.toHaveBeenCalled();
  });

  it('calls setFormValue when name is set without form attribute (ancestor-form association)', () => {
    const c = makeButton();
    c.name = 'action';
    c.value = 'submit';
    c.componentWillLoad();
    expect((c as any).internals.setFormValue).toHaveBeenCalledWith('submit');
  });

  it('uses empty string when value is undefined', () => {
    const c = makeButton();
    c.name = 'action';
    c.componentWillLoad();
    expect((c as any).internals.setFormValue).toHaveBeenCalledWith('');
  });
});

describe('io-button — FACE: onValueChange', () => {
  it('syncs new value when name is set', () => {
    const c = makeButton();
    c.name = 'action';
    (c as any).onValueChange('new-value');
    expect((c as any).internals.setFormValue).toHaveBeenCalledWith('new-value');
  });

  it('does not sync when name is missing', () => {
    const c = makeButton();
    (c as any).onValueChange('new-value');
    expect((c as any).internals.setFormValue).not.toHaveBeenCalled();
  });
});

describe('io-button — FACE: click → requestSubmit / reset', () => {
  it('calls requestSubmit when type=submit and form is associated', () => {
    const c = makeButton();
    c.type = 'submit';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.requestSubmit).toHaveBeenCalled();
  });

  it('calls reset when type=reset and form is associated', () => {
    const c = makeButton();
    c.type = 'reset';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.reset).toHaveBeenCalled();
  });

  it('does not call requestSubmit when type=button', () => {
    const c = makeButton();
    c.type = 'button';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call form methods when href is set (anchor mode)', () => {
    const c = makeButton();
    c.type = 'submit';
    c.href = '/page';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call form methods when disabled', () => {
    const c = makeButton();
    c.type = 'submit';
    c.disabled = true;
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.requestSubmit).not.toHaveBeenCalled();
  });

  it('does not throw when internals.form is null', () => {
    const c = makeButton();
    (c as any).internals = makeInternals(null);
    c.type = 'submit';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    expect(() => (c as any).handleClick(ev)).not.toThrow();
  });
});

describe('io-button — FACE: formResetCallback', () => {
  it('formResetCallback exists and does not throw', () => {
    const c = makeButton();
    expect(() => c.formResetCallback()).not.toThrow();
  });
});

// ── Implicit form submission ────────────────────────────────────

function makeImplicitSubmitSetup(type: 'submit' | 'button' | 'reset' = 'submit', hrefOverride?: string) {
  const form = document.createElement('form');
  const requestSubmit = vi.fn();
  Object.defineProperty(form, 'requestSubmit', { value: requestSubmit, writable: true, configurable: true });

  const el = document.createElement('io-button');
  el.setAttribute('type', type);
  // Also set JS property — impl checks both attribute and property
  (el as HTMLElement & { type?: string }).type = type;
  form.appendChild(el);

  const c = new IoButton();
  (c as any).el = el;
  (c as any).click = { emit: vi.fn() };
  (c as any).internals = { setFormValue: vi.fn(), form };
  c.type = type;
  if (hrefOverride !== undefined) c.href = hrefOverride;

  return { c, form, el, requestSubmit };
}

function makeKeyEvent(key: string, target: HTMLElement, overrides: Partial<KeyboardEventInit> = {}) {
  const ev = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...overrides });
  Object.defineProperty(ev, 'target', { value: target, configurable: true });
  Object.defineProperty(ev, 'preventDefault', { value: vi.fn(), configurable: true });
  return ev;
}

describe('io-button — implicit form submission: attach/detach', () => {
  it('attaches keydown listener to form when type=submit', () => {
    const { c, form } = makeImplicitSubmitSetup('submit');
    const spy = vi.spyOn(form, 'addEventListener');
    (c as any).componentDidLoad();
    expect(spy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('does not attach when type=button', () => {
    const { c, form } = makeImplicitSubmitSetup('button');
    const spy = vi.spyOn(form, 'addEventListener');
    (c as any).componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not attach when type=reset', () => {
    const { c, form } = makeImplicitSubmitSetup('reset');
    const spy = vi.spyOn(form, 'addEventListener');
    (c as any).componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not attach when href is set (anchor mode)', () => {
    const { c, form } = makeImplicitSubmitSetup('submit', '/page');
    const spy = vi.spyOn(form, 'addEventListener');
    (c as any).componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not attach when no form is associated', () => {
    const c = new IoButton();
    (c as any).el = document.createElement('io-button');
    (c as any).internals = { setFormValue: vi.fn(), form: null };
    c.type = 'submit';
    expect(() => (c as any).componentDidLoad()).not.toThrow();
    expect((c as any)._implicitSubmitHandler).toBeUndefined();
  });

  it('detachImplicitSubmitListener removes the handler', () => {
    const { c, form } = makeImplicitSubmitSetup('submit');
    const removeSpy = vi.spyOn(form, 'removeEventListener');
    (c as any).componentDidLoad();
    const handler = (c as any)._implicitSubmitHandler;
    (c as any).detachImplicitSubmitListener();
    expect(removeSpy).toHaveBeenCalledWith('keydown', handler);
    expect((c as any)._implicitSubmitHandler).toBeUndefined();
    expect((c as any)._implicitSubmitForm).toBeUndefined();
  });

  it('disconnectedCallback detaches the listener', () => {
    const { c, form } = makeImplicitSubmitSetup('submit');
    const removeSpy = vi.spyOn(form, 'removeEventListener');
    (c as any).componentDidLoad();
    c.disconnectedCallback();
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('onTypeChange detaches and re-attaches when type changes to submit', () => {
    const { c, form } = makeImplicitSubmitSetup('button');
    (c as any).componentDidLoad();
    const addSpy = vi.spyOn(form, 'addEventListener');
    c.type = 'submit';
    (c as any).onTypeChange();
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('onTypeChange detaches when type changes from submit to button', () => {
    const { c, form } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const removeSpy = vi.spyOn(form, 'removeEventListener');
    c.type = 'button';
    (c as any).onTypeChange();
    expect(removeSpy).toHaveBeenCalled();
    expect((c as any)._implicitSubmitHandler).toBeUndefined();
  });

  it('onHrefChange detaches when href is set', () => {
    const { c, form } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const removeSpy = vi.spyOn(form, 'removeEventListener');
    c.href = '/page';
    (c as any).onHrefChange();
    expect(removeSpy).toHaveBeenCalled();
  });

  it('formAssociatedCallback re-attaches listener', () => {
    const { c, form } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const addSpy = vi.spyOn(form, 'addEventListener');
    (c as any).formAssociatedCallback(form);
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});

describe('io-button — implicit form submission: handler behaviour', () => {
  function setup() {
    const { c, form, requestSubmit } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const handler = (c as any)._implicitSubmitHandler as (ev: KeyboardEvent) => void;
    const textInput = document.createElement('input');
    textInput.type = 'text';
    form.appendChild(textInput);
    return { c, form, handler, textInput, requestSubmit };
  }

  it('calls requestSubmit when Enter in text input', () => {
    const { handler, textInput, requestSubmit } = setup();
    const ev = makeKeyEvent('Enter', textInput);
    handler(ev);
    expect(requestSubmit).toHaveBeenCalled();
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('does not call requestSubmit when key is not Enter', () => {
    const { handler, textInput, requestSubmit } = setup();
    const ev = makeKeyEvent('Space', textInput);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when isComposing (IME)', () => {
    const { handler, textInput, requestSubmit } = setup();
    const ev = makeKeyEvent('Enter', textInput, { isComposing: true });
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when event is already defaultPrevented', () => {
    const { handler, textInput, requestSubmit } = setup();
    const ev = makeKeyEvent('Enter', textInput);
    Object.defineProperty(ev, 'defaultPrevented', { value: true, configurable: true });
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when target is textarea', () => {
    const { c, form, requestSubmit } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const handler = (c as any)._implicitSubmitHandler as (ev: KeyboardEvent) => void;
    const textarea = document.createElement('textarea');
    form.appendChild(textarea);
    const ev = makeKeyEvent('Enter', textarea);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when target is checkbox input', () => {
    const { c, form, requestSubmit } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const handler = (c as any)._implicitSubmitHandler as (ev: KeyboardEvent) => void;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    form.appendChild(checkbox);
    const ev = makeKeyEvent('Enter', checkbox);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when target is radio input', () => {
    const { c, form, requestSubmit } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const handler = (c as any)._implicitSubmitHandler as (ev: KeyboardEvent) => void;
    const radio = document.createElement('input');
    radio.type = 'radio';
    form.appendChild(radio);
    const ev = makeKeyEvent('Enter', radio);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when button is disabled', () => {
    const { c, handler, textInput, requestSubmit } = setup();
    c.disabled = true;
    const ev = makeKeyEvent('Enter', textInput);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when button is loading', () => {
    const { c, handler, textInput, requestSubmit } = setup();
    c.loading = true;
    const ev = makeKeyEvent('Enter', textInput);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when a native submit button precedes io-button', () => {
    const { c, form, requestSubmit } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const handler = (c as any)._implicitSubmitHandler as (ev: KeyboardEvent) => void;

    // Insert a native submit button before the io-button
    const nativeBtn = document.createElement('button');
    nativeBtn.type = 'submit';
    form.insertBefore(nativeBtn, (c as any).el);

    const textInput = document.createElement('input');
    textInput.type = 'text';
    form.appendChild(textInput);

    const ev = makeKeyEvent('Enter', textInput);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when a different io-button is first', () => {
    const { c, form, requestSubmit } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const handler = (c as any)._implicitSubmitHandler as (ev: KeyboardEvent) => void;

    // Insert another submit button before the current one
    const firstBtn = document.createElement('io-button');
    firstBtn.setAttribute('type', 'submit');
    (firstBtn as HTMLElement & { type?: string }).type = 'submit';
    form.insertBefore(firstBtn, (c as any).el);

    const textInput = document.createElement('input');
    textInput.type = 'text';
    form.appendChild(textInput);

    const ev = makeKeyEvent('Enter', textInput);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call requestSubmit when target is the io-button host (Enter on focused button)', () => {
    // When the user presses Enter on a focused io-button, the inner shadow <button> fires
    // a click → handleClick → requestSubmit. The keydown event also bubbles out of the
    // shadow root retargeted to the host element (tagName = 'IO-BUTTON'), not 'INPUT'.
    // Our handler returns early on non-INPUT targets, preventing double-submit.
    const { c, requestSubmit } = makeImplicitSubmitSetup('submit');
    (c as any).componentDidLoad();
    const handler = (c as any)._implicitSubmitHandler as (ev: KeyboardEvent) => void;
    const hostEl = (c as any).el as HTMLElement;
    const ev = makeKeyEvent('Enter', hostEl);
    handler(ev);
    expect(requestSubmit).not.toHaveBeenCalled();
  });

  it('calls requestSubmit for email, password, search input types', () => {
    for (const inputType of ['email', 'password', 'search', 'tel', 'url']) {
      const { c, form, requestSubmit } = makeImplicitSubmitSetup('submit');
      (c as any).componentDidLoad();
      const handler = (c as any)._implicitSubmitHandler as (ev: KeyboardEvent) => void;
      const input = document.createElement('input');
      input.type = inputType;
      form.appendChild(input);
      const ev = makeKeyEvent('Enter', input);
      handler(ev);
      expect(requestSubmit).toHaveBeenCalled();
    }
  });
});
