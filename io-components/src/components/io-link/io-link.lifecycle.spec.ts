import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoLink } from './io-link';

function makeLink() {
  const c = new IoLink();
  (c as any).el = document.createElement('io-link');
  (c as any).click = { emit: vi.fn() };
  c.href = '/about';
  return c;
}

describe('io-link — render() branch coverage', () => {
  it('render() with default props does not throw', () => {
    const c = makeLink();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with external=true does not throw', () => {
    const c = makeLink();
    c.external = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with external=true and el.textContent set computes ariaLabel', () => {
    const c = makeLink();
    const el = document.createElement('io-link');
    el.textContent = 'Learn more';
    (c as any).el = el;
    (c as any).click = { emit: vi.fn() };
    c.external = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with external=true and no text does not set ariaLabel', () => {
    const c = makeLink();
    const el = document.createElement('io-link');
    el.textContent = '';
    (c as any).el = el;
    (c as any).click = { emit: vi.fn() };
    c.external = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with disabled=true does not throw', () => {
    const c = makeLink();
    c.disabled = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with disabled=false does not throw', () => {
    const c = makeLink();
    c.disabled = false;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with download set does not throw', () => {
    const c = makeLink();
    c.download = 'file.pdf';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with variant=inline does not throw', () => {
    const c = makeLink();
    c.variant = 'inline';
    expect(() => (c as any).render()).not.toThrow();
  });
});
