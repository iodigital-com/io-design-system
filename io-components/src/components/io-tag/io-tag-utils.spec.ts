import { describe, it, expect } from 'vitest';

import { getTagClassName, shouldBlockTagInteraction } from './io-tag-utils';

describe('io-tag-utils', () => {
  it('builds tag class names with semantic variant and appearance', () => {
    expect(getTagClassName('md', 'neutral', 'soft', false, false)).toBe('tag tag--md tag--neutral tag--soft');
    expect(getTagClassName('sm', 'success', 'solid', true, true)).toBe('tag tag--sm tag--success tag--solid tag--selected tag--disabled');
  });

  it('blocks interactions only when disabled', () => {
    expect(shouldBlockTagInteraction(true)).toBe(true);
    expect(shouldBlockTagInteraction(false)).toBe(false);
  });
});
