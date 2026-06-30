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

  it('has variant neutral by default', () => {
    expect(component.variant).toBe('neutral');
  });

  it('has appearance soft by default', () => {
    expect(component.appearance).toBe('soft');
  });

  it('has color default by default (deprecated prop)', () => {
    expect(component.color).toBe('default');
  });

  it('is not compact by default', () => {
    expect(component.compact).toBe(false);
  });

  it('has no icon by default', () => {
    expect(component.icon).toBeUndefined();
  });

  it('has no iconSource by default', () => {
    expect(component.iconSource).toBeUndefined();
  });
});

describe('io-tag — compact density (#866)', () => {
  it('compact CSS uses --io-tag-compact-padding-y token', () => {
    const styles = getTagStyles();
    expect(styles).toContain('.tag--compact');
    expect(styles).toContain('var(--io-tag-compact-padding-y)');
  });
});

describe('io-tag — semantic variant API (#1025)', () => {
  it('styles include semantic variant classes', () => {
    const styles = getTagStyles();
    expect(styles).toContain('.tag--neutral');
    expect(styles).toContain('.tag--primary');
    expect(styles).toContain('.tag--info');
    expect(styles).toContain('.tag--success');
    expect(styles).toContain('.tag--warning');
    expect(styles).toContain('.tag--error');
    expect(styles).toContain('.tag--subtle');
  });

  it('styles include appearance modifier classes', () => {
    const styles = getTagStyles();
    expect(styles).toContain('.tag--soft');
    expect(styles).toContain('.tag--solid');
    expect(styles).toContain('.tag--frosted');
  });
});
