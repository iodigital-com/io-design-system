import { describe, it, expect } from 'vitest';

import { getLinkClassName, resolveLinkRel, resolveLinkTarget, shouldBlockLinkClick } from './io-link-utils';

describe('io-link-utils', () => {
  describe('resolveLinkTarget', () => {
    it('sets target="_blank" when external=true', () => {
      expect(resolveLinkTarget('_self', true)).toBe('_blank');
      expect(resolveLinkTarget('_blank', true)).toBe('_blank');
    });

    it('preserves target when external=false', () => {
      expect(resolveLinkTarget('_self', false)).toBe('_self');
      expect(resolveLinkTarget('_blank', false)).toBe('_blank');
      expect(resolveLinkTarget(undefined, false)).toBeUndefined();
    });
  });

  describe('resolveLinkRel — Security Fix for Reverse Tabnapping', () => {
    it('auto-injects "noopener noreferrer" for target="_blank"', () => {
      // Security fix: prevent reverse tabnapping when target="_blank"
      expect(resolveLinkRel(undefined, '_blank', false)).toBe('noopener noreferrer');
      expect(resolveLinkRel(undefined, '_blank', true)).toBe('noopener noreferrer');
    });

    it('preserves explicit rel and prepends security properties for target="_blank"', () => {
      // User provides nofollow with target="_blank" → prepend opener protection
      expect(resolveLinkRel('nofollow', '_blank', false)).toBe('noopener noreferrer nofollow');
      expect(resolveLinkRel('nofollow', '_blank', true)).toBe('noopener noreferrer nofollow');
    });

    it('handles partial security properties — adds missing one', () => {
      // User provides only noopener → add noreferrer
      expect(resolveLinkRel('noopener', '_blank', false)).toBe('noopener noreferrer');
      // User provides only noreferrer → add noopener
      expect(resolveLinkRel('noreferrer', '_blank', false)).toBe('noopener noreferrer');
    });

    it('returns rel unchanged when both noopener and noreferrer are already present', () => {
      expect(resolveLinkRel('noopener noreferrer', '_blank', false)).toBe('noopener noreferrer');
    });

    it('uses external=true shorthand for target="_blank" with security', () => {
      expect(resolveLinkRel(undefined, undefined, true)).toBe('noopener noreferrer');
      expect(resolveLinkRel('nofollow', undefined, true)).toBe('noopener noreferrer nofollow');
    });

    it('preserves rel for other targets (no auto-injection)', () => {
      expect(resolveLinkRel('nofollow', '_self', false)).toBe('nofollow');
      expect(resolveLinkRel(undefined, '_self', false)).toBeUndefined();
    });
  });

  describe('getLinkClassName', () => {
    it('builds class names with variant and color', () => {
      expect(getLinkClassName('standalone', 'blue', false)).toBe('link link--standalone link--blue');
      expect(getLinkClassName('inline', 'black', true)).toBe('link link--inline link--black link--disabled');
    });
  });

  describe('shouldBlockLinkClick', () => {
    it('blocks click when disabled=true', () => {
      expect(shouldBlockLinkClick(true)).toBe(true);
      expect(shouldBlockLinkClick(false)).toBe(false);
    });
  });
});
