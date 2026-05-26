import { describe, it, expect, vi } from 'vitest';

import { IoToastItem } from './io-toast-item';

function makeItem() {
  const c = new IoToastItem();
  (c as any).dismiss = { emit: vi.fn() };
  return c;
}

describe('io-toast-item — render() branch coverage', () => {
  it('render() with default props does not throw', () => {
    const c = makeItem();
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with variant=success does not throw', () => {
    const c = makeItem();
    c.variant = 'success';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with variant=error does not throw', () => {
    const c = makeItem();
    c.variant = 'error';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with variant=warning does not throw', () => {
    const c = makeItem();
    c.variant = 'warning';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with variant=info does not throw', () => {
    const c = makeItem();
    c.variant = 'info';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with text set does not throw', () => {
    const c = makeItem();
    c.text = 'Something happened';
    expect(() => (c as any).render()).not.toThrow();
  });
});
