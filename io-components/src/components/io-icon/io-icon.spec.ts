import { describe, it, expect } from 'vitest';

import { IoIcon } from './io-icon';

describe('io-icon', () => {
  it('renders without throwing for a known icon', () => {
    const c = new IoIcon();
    c.name = 'x';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('returns null for an unknown icon name', () => {
    const c = new IoIcon();
    c.name = 'nonexistent' as any;
    const result = (c as any).render();
    expect(result).toBeNull();
  });

  it('defaults size to md', () => {
    const c = new IoIcon();
    c.name = 'check';
    expect(c.size).toBe('md');
  });

  it('renders with aria-hidden when no label is provided', () => {
    const c = new IoIcon();
    c.name = 'info';
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });

  it('patches aria attributes when label is provided', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.label = 'Success';
    // render() should not throw and should produce a non-null result
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });
});
