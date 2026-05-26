import { describe, it, expect, vi } from 'vitest';

import { IoOption } from './io-option';

function makeOption() {
  const c = new IoOption();
  (c as any).el = document.createElement('io-option');
  (c as any).optionSelect = { emit: vi.fn() };
  c.label = 'Alpha';
  c.value = 'alpha';
  return c;
}

describe('io-option — render() branch coverage', () => {
  it('render() with default props does not throw', () => {
    const c = makeOption();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with multipleMode=true, checked=true does not throw', () => {
    const c = makeOption();
    c.multipleMode = true;
    c.checked = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with multipleMode=true, checked=false does not throw', () => {
    const c = makeOption();
    c.multipleMode = true;
    c.checked = false;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with multipleMode=false, selected=true does not throw', () => {
    const c = makeOption();
    c.multipleMode = false;
    c.selected = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with multipleMode=false, selected=false does not throw', () => {
    const c = makeOption();
    c.multipleMode = false;
    c.selected = false;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with disabled=true does not throw', () => {
    const c = makeOption();
    c.disabled = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with focused=true does not throw', () => {
    const c = makeOption();
    c.focused = true;
    expect(() => (c as any).render()).not.toThrow();
  });
});
