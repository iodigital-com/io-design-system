import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoRadioGroup } from './io-radio-group';

function makeComponent() {
  const host = document.createElement('io-radio-group');
  const c = new IoRadioGroup();
  (c as any).el = host;
  (c as any).change = { emit: vi.fn() };
  c.name = 'choice';
  c.value = '';
  return { c, host };
}

describe('io-radio-group — componentWillLoad', () => {
  it('assigns an errorId', () => {
    const { c } = makeComponent();
    (c as any).componentWillLoad();
    expect((c as any).errorId).toMatch(/^io-rg-error-/);
  });

  it('generates unique errorId on each componentWillLoad', () => {
    const { c: c1 } = makeComponent();
    const { c: c2 } = makeComponent();
    (c1 as any).componentWillLoad();
    (c2 as any).componentWillLoad();
    expect((c1 as any).errorId).not.toBe((c2 as any).errorId);
  });
});

describe('io-radio-group — componentDidLoad', () => {
  it('calls syncChildren on load', () => {
    const { c, host } = makeComponent();
    (c as any).componentWillLoad();
    const radio = Object.assign(document.createElement('io-radio'), {
      value: 'a', name: '', checked: false, disabled: false,
    });
    host.appendChild(radio);
    c.value = 'a';
    (c as any).componentDidLoad();
    expect(radio.checked).toBe(true);
  });
});

describe('io-radio-group — watcher methods', () => {
  let c: IoRadioGroup;
  let host: HTMLElement;

  beforeEach(() => {
    ({ c, host } = makeComponent());
    (c as any).componentWillLoad();
  });

  it('onNameChange propagates name to children', () => {
    const radio = Object.assign(document.createElement('io-radio'), {
      value: 'a', name: '', checked: false, disabled: false,
    });
    host.appendChild(radio);
    c.name = 'newGroup';
    (c as any).onNameChange();
    expect(radio.name).toBe('newGroup');
  });

  it('onValueChange updates checked state on children', () => {
    const radio = Object.assign(document.createElement('io-radio'), {
      value: 'b', name: 'choice', checked: false, disabled: false,
    });
    host.appendChild(radio);
    c.value = 'b';
    (c as any).onValueChange();
    expect(radio.checked).toBe(true);
  });

  it('onDisabledChange disables children when group becomes disabled', () => {
    const radio = Object.assign(document.createElement('io-radio'), {
      value: 'x', name: 'choice', checked: false, disabled: false,
    });
    host.appendChild(radio);
    c.disabled = true;
    (c as any).onDisabledChange();
    expect(radio.disabled).toBe(true);
  });
});

describe('io-radio-group — handleRadioChange edge cases', () => {
  it('uses empty string when radio.value is undefined', () => {
    const { c, host } = makeComponent();
    (c as any).componentWillLoad();
    const emitFn = vi.fn();
    (c as any).change = { emit: emitFn };

    const radioEl = document.createElement('io-radio') as HTMLElement & { value?: string };
    delete (radioEl as any).value;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: radioEl });

    (c as any).handleRadioChange(ev);

    expect(c.value).toBe('');
    expect(emitFn).toHaveBeenCalledWith({ value: '' });
  });
});

describe('io-radio-group — render() branch coverage', () => {
  it('render() with error=false and no helperText does not throw', () => {
    const { c } = makeComponent();
    c.label = 'Choose';
    c.error = false;
    c.helperText = '';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with error=true and errorMessage does not throw', () => {
    const { c } = makeComponent();
    c.label = 'Choose';
    c.error = true;
    c.errorMessage = 'Required';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with helperText does not throw', () => {
    const { c } = makeComponent();
    c.label = 'Choose';
    c.helperText = 'Pick an option';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with disabled=true does not throw', () => {
    const { c } = makeComponent();
    c.label = 'Choose';
    c.disabled = true;
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});
