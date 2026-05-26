import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoCheckbox } from './io-checkbox';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-checkbox — lifecycle and watchers', () => {
  let component: IoCheckbox;

  beforeEach(() => {
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = makeInternals();
    (component as any).label = 'Accept';
    component.value = 'yes';
    (component as any).componentWillLoad();
  });

  it('componentWillLoad assigns a fieldId', () => {
    const fieldId: string = (component as any).fieldId;
    expect(fieldId).toBeTruthy();
  });

  it('componentWillLoad with name uses name in fieldId', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.name = 'terms';
    (c as any).componentWillLoad();
    expect((c as any).fieldId).toContain('terms');
  });

  it('componentWillLoad records defaultChecked from initial checked state', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.checked = true;
    (c as any).componentWillLoad();
    expect((c as any).defaultChecked).toBe(true);
  });

  it('formResetCallback resets to unchecked (defaultChecked=false)', () => {
    component.checked = true;
    (component as any).formResetCallback();
    expect(component.checked).toBe(false);
  });

  it('formResetCallback resets to checked (defaultChecked=true)', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.checked = true;
    (c as any).componentWillLoad();
    c.checked = false;
    (c as any).formResetCallback();
    expect(c.checked).toBe(true);
  });

  it('formResetCallback clears indeterminate', () => {
    component.indeterminate = true;
    (component as any).formResetCallback();
    expect(component.indeterminate).toBe(false);
  });

  it('onCheckedChange calls syncFormValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    component.checked = true;
    (component as any).onCheckedChange();
    expect(internals.setFormValue).toHaveBeenCalled();
  });

  it('onValueChange calls syncFormValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).onValueChange();
    expect(internals.setFormValue).toHaveBeenCalled();
  });

  it('onRequiredChange calls syncFormValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).onRequiredChange();
    expect(internals.setFormValue).toHaveBeenCalled();
  });
});

describe('io-checkbox — componentDidRender', () => {
  it('sets indeterminate property on native input when shadowRoot is available', () => {
    const component = new IoCheckbox();
    const input = document.createElement('input');
    input.type = 'checkbox';
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(input) };
    (component as any).el = { shadowRoot };
    (component as any).change = { emit: vi.fn() };
    component.indeterminate = true;

    (component as any).componentDidRender();

    expect(input.indeterminate).toBe(true);
  });

  it('sets indeterminate=false when prop is false', () => {
    const component = new IoCheckbox();
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.indeterminate = true;
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(input) };
    (component as any).el = { shadowRoot };
    (component as any).change = { emit: vi.fn() };
    component.indeterminate = false;

    (component as any).componentDidRender();

    expect(input.indeterminate).toBe(false);
  });

  it('does not throw when shadowRoot has no input', () => {
    const component = new IoCheckbox();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(null) };
    (component as any).el = { shadowRoot };
    (component as any).change = { emit: vi.fn() };

    expect(() => (component as any).componentDidRender()).not.toThrow();
  });
});

describe('io-checkbox — syncFormValue branch: faceInvalid state', () => {
  it('sets faceInvalid=true when required and unchecked', () => {
    const component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = makeInternals();
    (component as any).label = 'Accept';
    component.required = true;
    component.checked = false;
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(true);
  });

  it('sets faceInvalid=false when required and checked', () => {
    const component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = makeInternals();
    (component as any).label = 'Accept';
    component.required = true;
    component.checked = true;
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('sets faceInvalid=false when not required', () => {
    const component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = makeInternals();
    (component as any).label = 'Accept';
    component.required = false;
    component.checked = false;
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });
});

describe('io-checkbox — render() branch coverage', () => {
  it('render() with default props does not throw', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with error=true and errorMessage does not throw', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.error = true;
    c.errorMessage = 'Required';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with helperText and no error does not throw', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.error = false;
    c.helperText = 'Optional';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with required=true does not throw', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.required = true;
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with faceInvalid=true does not throw', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.required = true;
    c.checked = false;
    c.error = false;
    (c as any).componentWillLoad();
    (c as any).faceInvalid = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with checked=true and indeterminate=false does not throw', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.checked = true;
    c.indeterminate = false;
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with indeterminate=true does not throw', () => {
    const c = new IoCheckbox();
    (c as any).el = document.createElement('io-checkbox');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Accept';
    c.indeterminate = true;
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});
