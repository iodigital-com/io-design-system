import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTagDismissible } from './io-tag-dismissible';

describe('io-tag-dismissible — default props', () => {
  let component: IoTagDismissible;

  beforeEach(() => {
    component = new IoTagDismissible();
    (component as any).dismiss = { emit: vi.fn() };
  });

  it("variant defaults to 'default'", () => {
    expect(component.variant).toBe('default');
  });

  it('icon is undefined by default', () => {
    expect(component.icon).toBeUndefined();
  });

  it('label can be set', () => {
    (component as any).label = 'React';
    expect(component.label).toBe('React');
  });
});
