import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTag } from './io-tag';
import { getTagStyles } from './io-tag-styles';

describe('io-tag — default props', () => {
  let component: IoTag;

  beforeEach(() => {
    component = new IoTag();
    (component as any).el = document.createElement('io-tag');
    (component as any).toggle = { emit: vi.fn() };
    (component as any).remove = { emit: vi.fn() };
  });

  it('is not selected by default', () => {
    expect(component.selected).toBe(false);
  });

  it('is not removable by default', () => {
    expect(component.removable).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
  });

  it('has color default by default', () => {
    expect(component.color).toBe('default');
  });

  it('is not compact by default', () => {
    expect(component.compact).toBe(false);
  });
});

describe('io-tag — compact density (#866)', () => {
  it('compact CSS uses --io-tag-compact-padding-y token', () => {
    const styles = getTagStyles();
    expect(styles).toContain('.tag--compact');
    expect(styles).toContain('var(--io-tag-compact-padding-y)');
  });
});
