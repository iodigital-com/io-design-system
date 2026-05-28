import { describe, it, expect } from 'vitest';

import { resolveOptionId, getOptionClass } from './io-option-utils';

describe('io-option-utils', () => {
  describe('resolveOptionId', () => {
    it('builds id from sanitized value', () => {
      expect(resolveOptionId('Netherlands', 'fb1')).toBe('io-option-netherlands-fb1');
    });

    it('uses fallbackId when value sanitizes to empty string', () => {
      expect(resolveOptionId('!!!', 'fb123')).toBe('io-option-fb123-fb123');
    });

    it('handles value with spaces and mixed case', () => {
      expect(resolveOptionId('  Hello World  ', 'fb2')).toBe('io-option-hello-world-fb2');
    });
  });

  describe('getOptionClass', () => {
    it('returns base class only when all flags are false', () => {
      expect(getOptionClass(false, false, false, false)).toBe('option');
    });

    it('includes selected class when selected=true', () => {
      expect(getOptionClass(true, false, false, false)).toBe('option option--selected');
    });

    it('includes disabled class when disabled=true', () => {
      expect(getOptionClass(false, true, false, false)).toBe('option option--disabled');
    });

    it('includes focused class when focused=true', () => {
      expect(getOptionClass(false, false, true, false)).toBe('option option--focused');
    });

    it('includes multiple class when multipleMode=true', () => {
      expect(getOptionClass(false, false, false, true)).toBe('option option--multiple');
    });

    it('combines multiple modifier classes', () => {
      expect(getOptionClass(true, true, false, false)).toBe('option option--selected option--disabled');
    });
  });
});
