import { describe, it, expect } from 'vitest';
import { getTagClassName, getTagGroupClassName, shouldBlockTagInteraction } from './io-tag-utils';

describe('io-tag-utils', () => {
  it('builds tag and group class names with state modifiers', () => {
    expect(getTagClassName('md', 'default', false, false)).toBe('tag tag--md tag--default');
    expect(getTagClassName('sm', 'success', true, true)).toBe('tag tag--sm tag--success tag--selected tag--disabled');
    expect(getTagGroupClassName('md', 'default', false, false)).toBe('tag-group tag-group--md tag-group--default');
    expect(getTagGroupClassName('sm', 'outline', true, true)).toBe('tag-group tag-group--sm tag-group--outline tag-group--selected tag-group--disabled');
  });

  it('blocks interactions only when disabled', () => {
    expect(shouldBlockTagInteraction(true)).toBe(true);
    expect(shouldBlockTagInteraction(false)).toBe(false);
  });
});
