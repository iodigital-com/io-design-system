import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoRadio } from './io-radio';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

describe('io-radio — watcher methods', () => {
  let component: IoRadio;

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = makeInternals();
    (component as any).label = 'Option A';
    component.value = 'a';
    (component as any).componentWillLoad();
  });

  it('onCheckedChange calls syncFormValue', () => {
    const internals = makeInternals();
    (component as any).internals = internals;
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

describe('io-radio — syncFormValue: no-name branch (groupSatisfied=false)', () => {
  it('sets valueMissing when required, unchecked, and no name (groupSatisfied always false)', () => {
    const c = new IoRadio();
    (c as any).el = document.createElement('io-radio');
    (c as any).change = { emit: vi.fn() };
    const internals = makeInternals();
    (c as any).internals = internals;
    (c as any).label = 'Option A';
    c.required = true;
    c.checked = false;
    c.name = undefined;
    (c as any).componentWillLoad();
    (c as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please select an option',
    );
    expect((c as any).faceInvalid).toBe(true);
  });

  it('sets faceInvalid=false when required and checked (no name)', () => {
    const c = new IoRadio();
    (c as any).el = document.createElement('io-radio');
    (c as any).change = { emit: vi.fn() };
    const internals = makeInternals();
    (c as any).internals = internals;
    (c as any).label = 'Option A';
    c.required = true;
    c.checked = true;
    c.name = undefined;
    (c as any).componentWillLoad();
    (c as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
    expect((c as any).faceInvalid).toBe(false);
  });
});

describe('io-radio — handleChange: mutual exclusion', () => {
  it('deselects same-name siblings in document when checked', () => {
    const component = new IoRadio();
    const elA = document.createElement('io-radio');
    (component as any).el = elA;
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = makeInternals();
    (component as any).label = 'A';
    component.value = 'a';
    component.name = 'choice';
    (component as any).componentWillLoad();
    document.body.appendChild(elA);

    const sibling = document.createElement('io-radio') as HTMLElement & { name: string; checked: boolean };
    sibling.name = 'choice';
    sibling.checked = true;
    document.body.appendChild(sibling);

    const input = document.createElement('input');
    input.type = 'radio';
    input.checked = true;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });

    (component as any).handleChange(ev);

    expect(sibling.checked).toBe(false);

    document.body.removeChild(elA);
    document.body.removeChild(sibling);
  });

  it('does not deselect sibling when radio is unchecked', () => {
    const component = new IoRadio();
    const elA = document.createElement('io-radio');
    (component as any).el = elA;
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = makeInternals();
    (component as any).label = 'A';
    component.value = 'a';
    component.name = 'choice';
    (component as any).componentWillLoad();
    document.body.appendChild(elA);

    const sibling = document.createElement('io-radio') as HTMLElement & { name: string; checked: boolean };
    sibling.name = 'choice';
    sibling.checked = true;
    document.body.appendChild(sibling);

    const input = document.createElement('input');
    input.type = 'radio';
    input.checked = false;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });

    (component as any).handleChange(ev);

    expect(sibling.checked).toBe(true);

    document.body.removeChild(elA);
    document.body.removeChild(sibling);
  });

  it('does not deselect sibling with a different name', () => {
    const component = new IoRadio();
    const elA = document.createElement('io-radio');
    (component as any).el = elA;
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = makeInternals();
    (component as any).label = 'A';
    component.value = 'a';
    component.name = 'groupA';
    (component as any).componentWillLoad();
    document.body.appendChild(elA);

    const sibling = document.createElement('io-radio') as HTMLElement & { name: string; checked: boolean };
    sibling.name = 'groupB';
    sibling.checked = true;
    document.body.appendChild(sibling);

    const input = document.createElement('input');
    input.type = 'radio';
    input.checked = true;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });

    (component as any).handleChange(ev);

    expect(sibling.checked).toBe(true);

    document.body.removeChild(elA);
    document.body.removeChild(sibling);
  });
});

describe('io-radio — render() branch coverage', () => {
  it('render() with default props does not throw', () => {
    const c = new IoRadio();
    (c as any).el = document.createElement('io-radio');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Option A';
    c.value = 'a';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with error=true and errorMessage does not throw', () => {
    const c = new IoRadio();
    (c as any).el = document.createElement('io-radio');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Option A';
    c.error = true;
    c.errorMessage = 'Select one';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with helperText and no error does not throw', () => {
    const c = new IoRadio();
    (c as any).el = document.createElement('io-radio');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Option A';
    c.helperText = 'Pick one';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with faceInvalid=true does not throw', () => {
    const c = new IoRadio();
    (c as any).el = document.createElement('io-radio');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Option A';
    c.required = true;
    c.checked = false;
    c.error = false;
    (c as any).componentWillLoad();
    (c as any).faceInvalid = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with required=true does not throw', () => {
    const c = new IoRadio();
    (c as any).el = document.createElement('io-radio');
    (c as any).change = { emit: vi.fn() };
    (c as any).internals = makeInternals();
    (c as any).label = 'Option A';
    c.required = true;
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});
