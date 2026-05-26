import { describe, it, expect, vi } from 'vitest';

import { IoFormField } from './io-form-field';

function makeComponent() {
  const host = document.createElement('io-form-field');
  const c = new IoFormField();
  (c as any).el = host;
  c.label = 'Email';
  return { c, host };
}

describe('io-form-field — lifecycle methods', () => {
  it('componentDidLoad calls syncChildAttributes', () => {
    const { c } = makeComponent();
    (c as any).componentWillLoad();
    const spy = vi.spyOn(c as any, 'syncChildAttributes');
    c.componentDidLoad();
    expect(spy).toHaveBeenCalled();
  });

  it('onErrorChange calls syncChildAttributes', () => {
    const { c } = makeComponent();
    (c as any).componentWillLoad();
    const spy = vi.spyOn(c as any, 'syncChildAttributes');
    (c as any).onErrorChange();
    expect(spy).toHaveBeenCalled();
  });

  it('onHelperTextChange calls syncChildAttributes', () => {
    const { c } = makeComponent();
    (c as any).componentWillLoad();
    const spy = vi.spyOn(c as any, 'syncChildAttributes');
    (c as any).onHelperTextChange();
    expect(spy).toHaveBeenCalled();
  });

  it('onErrorMessageChange calls syncChildAttributes', () => {
    const { c } = makeComponent();
    (c as any).componentWillLoad();
    const spy = vi.spyOn(c as any, 'syncChildAttributes');
    (c as any).onErrorMessageChange();
    expect(spy).toHaveBeenCalled();
  });
});

describe('io-form-field — syncChildAttributes: describedBy branches', () => {
  it('removes aria-describedby when neither helper nor error apply', () => {
    const { c, host } = makeComponent();
    (c as any).componentWillLoad();
    const child = document.createElement('io-input');
    child.setAttribute('aria-describedby', 'old-id');
    host.appendChild(child);
    c.error = false;
    c.helperText = '';
    c.errorMessage = '';
    (c as any).syncChildAttributes();
    expect(child.getAttribute('aria-describedby')).toBeNull();
  });
});

describe('io-form-field — render() branch coverage', () => {
  it('render() with required=true does not throw', () => {
    const { c } = makeComponent();
    c.required = true;
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with required=false does not throw', () => {
    const { c } = makeComponent();
    c.required = false;
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with error=true and errorMessage does not throw', () => {
    const { c } = makeComponent();
    c.error = true;
    c.errorMessage = 'Required field';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with helperText and no error does not throw', () => {
    const { c } = makeComponent();
    c.error = false;
    c.helperText = 'This is a hint';
    (c as any).componentWillLoad();
    expect(() => (c as any).render()).not.toThrow();
  });
});
