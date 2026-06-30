import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTagDismissible } from './io-tag-dismissible';

describe('io-tag-dismissible — default props', () => {
  let component: IoTagDismissible;

  beforeEach(() => {
    component = new IoTagDismissible();
    (component as any).el = document.createElement('io-tag-dismissible');
    (component as any).dismiss = { emit: vi.fn() };
  });

  it("variant defaults to 'default'", () => {
    expect(component.variant).toBe('default');
  });

  it('icon is undefined by default', () => {
    expect(component.icon).toBeUndefined();
  });

  it('label is optional (undefined by default)', () => {
    expect(component.label).toBeUndefined();
  });

  it('label can be set', () => {
    component.label = 'React';
    expect(component.label).toBe('React');
  });
});

describe('io-tag-dismissible — getDismissLabel fallback (#1005)', () => {
  let component: IoTagDismissible;

  beforeEach(() => {
    component = new IoTagDismissible();
    (component as any).dismiss = { emit: vi.fn() };
  });

  it('returns "Remove {label}" when label is set', () => {
    component.label = 'React';
    (component as any).el = document.createElement('io-tag-dismissible');
    const result = (component as any).getDismissLabel();
    expect(result).toBe('Remove React');
  });

  it('falls back to slot text content when label is undefined', () => {
    component.label = undefined;
    const el = document.createElement('io-tag-dismissible');
    el.textContent = 'EU';
    (component as any).el = el;
    const result = (component as any).getDismissLabel();
    expect(result).toBe('Remove EU');
  });

  it('falls back to "Remove" when label and slot text are both empty', () => {
    component.label = undefined;
    const el = document.createElement('io-tag-dismissible');
    el.textContent = '';
    (component as any).el = el;
    const result = (component as any).getDismissLabel();
    expect(result).toBe('Remove');
  });

  it('renders without throwing when label is omitted (slot mode)', () => {
    component.label = undefined;
    (component as any).el = document.createElement('io-tag-dismissible');
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when label is provided (prop mode)', () => {
    component.label = 'React';
    (component as any).el = document.createElement('io-tag-dismissible');
    expect(() => component.render()).not.toThrow();
  });
});
