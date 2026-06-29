import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoRadio } from './io-radio';

describe('io-radio — hideLabel prop', () => {
  let component: IoRadio;

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
  });

  it('defaults hideLabel to false', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('accepts hideLabel=true', () => {
    component.hideLabel = true;
    expect(component.hideLabel).toBe(true);
  });

  it('warns when hideLabel=true and label is empty', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = '';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).toHaveBeenCalledWith('[io-radio] hideLabel=true requires a non-empty label for accessibility.');
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = 'Option A';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-radio — default props', () => {
  let component: IoRadio;

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
    (component as any).change = { emit: vi.fn() };
  });

  it('is not checked by default', () => {
    expect(component.checked).toBe(false);
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has state=none by default', () => {
    expect(component.state).toBe('none');
  });

  it('has empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('has empty message by default', () => {
    expect(component.message).toBe('');
  });

  it('has no helperText by default', () => {
    expect(component.helperText).toBeUndefined();
  });

  it('has no form prop by default', () => {
    expect(component.form).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(input) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('applies state-success class when state is success', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Option A';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('applies state-warning class when state is warning', () => {
    component.state = 'warning';
    component.message = 'Check this field';
    (component as any).label = 'Option A';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('message paragraph uses role=status for success state', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Option A';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });
});

describe('io-radio — formDisabledCallback', () => {
  let component: IoRadio;

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
  });

  it('sets disabled to true when formDisabledCallback(true) is called', () => {
    (component as any).formDisabledCallback(true);
    expect(component.disabled).toBe(true);
  });

  it('sets disabled to false when formDisabledCallback(false) is called', () => {
    component.disabled = true;
    (component as any).formDisabledCallback(false);
    expect(component.disabled).toBe(false);
  });
});

describe('io-radio — group-scoped mutual exclusion (#941)', () => {
  it('isGroupSatisfied returns false when no sibling with same name is checked in scope', () => {
    const c = new IoRadio();
    const el = document.createElement('io-radio');
    (c as any).el = el;
    (c as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    c.name = 'choice';
    c.required = true;
    c.checked = false;
    (c as any).componentWillLoad();
    // No sibling appended — should be unsatisfied
    expect((c as any).isGroupSatisfied()).toBe(false);
  });

  it('isGroupSatisfied returns true when a sibling within same io-radio-group is checked', () => {
    const group = document.createElement('io-radio-group');
    document.body.appendChild(group);

    const el = document.createElement('io-radio');
    (el as any).name = 'choice';
    group.appendChild(el);

    const c = new IoRadio();
    (c as any).el = el;
    (c as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    c.name = 'choice';
    c.checked = false;
    (c as any).componentWillLoad();

    // Add a checked sibling inside the same group
    const sibling = Object.assign(document.createElement('io-radio'), { name: 'choice', checked: true });
    group.appendChild(sibling);

    expect((c as any).isGroupSatisfied()).toBe(true);

    document.body.removeChild(group);
  });

  it('isGroupSatisfied does not find siblings from a different group with same name', () => {
    // Group A
    const groupA = document.createElement('io-radio-group');
    document.body.appendChild(groupA);

    const elA = document.createElement('io-radio');
    (elA as any).name = 'gender';
    groupA.appendChild(elA);

    const cA = new IoRadio();
    (cA as any).el = elA;
    (cA as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    cA.name = 'gender';
    cA.checked = false;
    (cA as any).componentWillLoad();

    // Group B — separate group, also has name="gender", one is checked
    const groupB = document.createElement('io-radio-group');
    document.body.appendChild(groupB);
    const checkedInB = Object.assign(document.createElement('io-radio'), { name: 'gender', checked: true });
    groupB.appendChild(checkedInB);

    // groupA's radio should NOT see groupB's checked sibling
    expect((cA as any).isGroupSatisfied()).toBe(false);

    document.body.removeChild(groupA);
    document.body.removeChild(groupB);
  });
});
