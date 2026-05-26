import { describe, it, expect, vi } from 'vitest';

import { IoTag } from './io-tag';

describe('io-tag — render() branch coverage', () => {
  it('render() with removable=true does not throw', () => {
    const c = new IoTag();
    (c as any).el = document.createElement('io-tag');
    (c as any).toggle = { emit: vi.fn() };
    (c as any).remove = { emit: vi.fn() };
    c.removable = true;
    c.label = 'React';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with removable=true, selected=true does not throw', () => {
    const c = new IoTag();
    (c as any).el = document.createElement('io-tag');
    (c as any).toggle = { emit: vi.fn() };
    (c as any).remove = { emit: vi.fn() };
    c.removable = true;
    c.selected = true;
    c.label = 'React';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with removable=true, disabled=true does not throw', () => {
    const c = new IoTag();
    (c as any).el = document.createElement('io-tag');
    (c as any).toggle = { emit: vi.fn() };
    (c as any).remove = { emit: vi.fn() };
    c.removable = true;
    c.disabled = true;
    c.label = 'Design';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with removable=false does not throw', () => {
    const c = new IoTag();
    (c as any).el = document.createElement('io-tag');
    (c as any).toggle = { emit: vi.fn() };
    (c as any).remove = { emit: vi.fn() };
    c.removable = false;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with removable=true and no label does not throw', () => {
    const c = new IoTag();
    (c as any).el = document.createElement('io-tag');
    (c as any).toggle = { emit: vi.fn() };
    (c as any).remove = { emit: vi.fn() };
    c.removable = true;
    c.label = '';
    expect(() => (c as any).render()).not.toThrow();
  });
});
