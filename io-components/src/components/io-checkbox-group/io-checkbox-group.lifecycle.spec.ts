import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoCheckboxGroup } from './io-checkbox-group';

function makeComponent() {
  const host = document.createElement('io-checkbox-group');
  const c = new IoCheckboxGroup();
  (c as any).el = host;
  (c as any).change = { emit: vi.fn() };
  c.name = 'opts';
  return { c, host };
}

describe('io-checkbox-group — componentWillLoad', () => {
  it('assigns an errorId', () => {
    const { c } = makeComponent();
    (c as any).componentWillLoad();
    expect((c as any).errorId).toMatch(/^io-cg-error-/);
  });

  it('generates unique errorId on each componentWillLoad', () => {
    const { c: c1 } = makeComponent();
    const { c: c2 } = makeComponent();
    (c1 as any).componentWillLoad();
    (c2 as any).componentWillLoad();
    expect((c1 as any).errorId).not.toBe((c2 as any).errorId);
  });
});

describe('io-checkbox-group — componentDidLoad', () => {
  it('calls syncChildren on load', () => {
    const { c, host } = makeComponent();
    (c as any).componentWillLoad();
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'a', name: '', checked: false, disabled: false, state: 'none' });
    host.appendChild(cb);
    c.componentDidLoad();
    expect(cb.name).toBe('opts');
  });
});

describe('io-checkbox-group — watcher methods', () => {
  let c: IoCheckboxGroup;
  let host: HTMLElement;

  beforeEach(() => {
    ({ c, host } = makeComponent());
    (c as any).componentWillLoad();
  });

  it('onNameChange propagates new name to children', () => {
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'a', name: '', checked: false, disabled: false, state: 'none' });
    host.appendChild(cb);
    c.name = 'newGroup';
    (c as any).onNameChange();
    expect(cb.name).toBe('newGroup');
  });

  it('onDisabledChange disables children when group becomes disabled', () => {
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'x', name: 'opts', checked: false, disabled: false, state: 'none' });
    host.appendChild(cb);
    c.disabled = true;
    (c as any).onDisabledChange();
    expect(cb.disabled).toBe(true);
  });
});

describe('io-checkbox-group — render() branch coverage', () => {
  it('render() with no error and no helperText does not throw', () => {
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
    c.helperText = 'Pick some options';
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
