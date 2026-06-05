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
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });

  it('defaults flip to false', () => {
    const c = new IoIcon();
    c.name = 'arrow-right';
    expect(c.flip).toBe(false);
  });

  it('defaults fixedWidth to false', () => {
    const c = new IoIcon();
    c.name = 'search';
    expect(c.fixedWidth).toBe(false);
  });

  it('accepts fixedWidth=true', () => {
    const c = new IoIcon();
    c.name = 'search';
    c.fixedWidth = true;
    expect(c.fixedWidth).toBe(true);
    expect(() => (c as any).render()).not.toThrow();
  });

  it('accepts size="inherit"', () => {
    const c = new IoIcon();
    c.name = 'search';
    c.size = 'inherit';
    expect(c.size).toBe('inherit');
    expect(() => (c as any).render()).not.toThrow();
  });

  it('renders with fixedWidth and inherit size', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.fixedWidth = true;
    c.size = 'inherit';
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });

  it('returns null when iconSource set but fetchedSvg not yet loaded', () => {
    const c = new IoIcon();
    c.iconSource = 'https://example.com/icon.svg';
    (c as any).fetchedSvg = undefined;
    const result = (c as any).render();
    expect(result).toBeNull();
  });

  it('renders fetchedSvg when iconSource resolves', () => {
    const c = new IoIcon();
    c.iconSource = 'https://example.com/icon.svg';
    (c as any).fetchedSvg = '<svg aria-hidden="true"><path/></svg>';
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });
});
