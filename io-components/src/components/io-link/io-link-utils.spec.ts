import { describe, it, expect } from 'vitest';
import { getLinkClassName, resolveLinkRel, resolveLinkTarget, shouldBlockLinkClick } from './io-link-utils';

describe('io-link-utils', () => {
  it('resolves external target and rel attributes', () => {
    expect(resolveLinkTarget('_self', true)).toBe('_blank');
    expect(resolveLinkTarget('_self', false)).toBe('_self');
    expect(resolveLinkRel('nofollow', true)).toBe('noopener noreferrer');
    expect(resolveLinkRel('nofollow', false)).toBe('nofollow');
  });

  it('builds class names and disabled gate', () => {
    expect(getLinkClassName('standalone', 'blue', false)).toBe('link link--standalone link--blue');
    expect(getLinkClassName('inline', 'black', true)).toBe('link link--inline link--black link--disabled');
    expect(shouldBlockLinkClick(true)).toBe(true);
    expect(shouldBlockLinkClick(false)).toBe(false);
  });
});
