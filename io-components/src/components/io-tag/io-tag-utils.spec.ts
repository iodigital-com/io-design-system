import { describe, it, expect } from 'vitest';

import { getTagClassName, getTagGroupClassName, shouldBlockTagInteraction, resolveTagVariant, DEPRECATED_COLOR_MAP } from './io-tag-utils';

describe('io-tag-utils', () => {
  it('builds tag class names with semantic variant and appearance', () => {
    expect(getTagClassName('md', 'neutral', 'soft', false, false)).toBe('tag tag--md tag--neutral tag--soft');
    expect(getTagClassName('sm', 'success', 'solid', true, true)).toBe('tag tag--sm tag--success tag--solid tag--selected tag--disabled');
    expect(getTagClassName('md', 'primary', 'frosted', false, false, true)).toBe('tag tag--md tag--primary tag--frosted tag--compact');
  });

  it('builds tag-group class names with semantic variant and appearance', () => {
    expect(getTagGroupClassName('md', 'neutral', 'soft', false, false)).toBe('tag-group tag-group--md tag-group--neutral tag-group--soft');
    expect(getTagGroupClassName('sm', 'error', 'solid', true, true)).toBe('tag-group tag-group--sm tag-group--error tag-group--solid tag-group--selected tag-group--disabled');
  });

  it('blocks interactions only when disabled', () => {
    expect(shouldBlockTagInteraction(true)).toBe(true);
    expect(shouldBlockTagInteraction(false)).toBe(false);
  });
});
