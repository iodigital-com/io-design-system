import { describe, it, expect } from 'vitest';

import { sanitizeNameSegment, resolveCheckboxId, getCheckboxWrapperClass, getCheckboxCustomClass } from './io-checkbox-utils';

describe('io-checkbox-utils', () => {
  describe('sanitizeNameSegment', () => {
    it('trims, lowercases, and replaces special chars', () => {
      expect(sanitizeNameSegment('  Hello World  ')).toBe('hello-world');
      expect(sanitizeNameSegment('foo_bar-baz')).toBe('foo_bar-baz');
      expect(sanitizeNameSegment('!!!abc!!!')).toBe('abc');
    });
  });

  describe('resolveCheckboxId', () => {
    it('uses normalized name when provided', () => {
      expect(resolveCheckboxId('my-check', 'fb1')).toBe('io-checkbox-my-check-fb1');
    });

    it('falls back to fallbackId when name is undefined', () => {
      expect(resolveCheckboxId(undefined, 'fb2')).toBe('io-checkbox-fb2');
    });

    it('falls back to fallbackId when name sanitizes to empty string', () => {
      expect(resolveCheckboxId('!!!', 'fb3')).toBe('io-checkbox-fb3');
    });
  });

  describe('getCheckboxWrapperClass', () => {
    it('returns base class only when all flags are false', () => {
      expect(getCheckboxWrapperClass(false, false, false, false)).toBe('checkbox-wrapper');
    });

    it('includes disabled class when disabled=true', () => {
      expect(getCheckboxWrapperClass(true, false, false, false)).toBe('checkbox-wrapper checkbox-wrapper--disabled');
    });

    it('includes error class when error=true', () => {
      expect(getCheckboxWrapperClass(false, true, false, false)).toBe('checkbox-wrapper checkbox-wrapper--state-error');
    });

    it('includes success class when success=true', () => {
      expect(getCheckboxWrapperClass(false, false, true, false)).toBe('checkbox-wrapper checkbox-wrapper--state-success');
    });

    it('includes warning class when warning=true', () => {
      expect(getCheckboxWrapperClass(false, false, false, true)).toBe('checkbox-wrapper checkbox-wrapper--state-warning');
    });

    it('includes loading class when loading=true', () => {
      expect(getCheckboxWrapperClass(false, false, false, false, true)).toBe('checkbox-wrapper checkbox-wrapper--loading');
    });

    it('combines multiple modifier classes', () => {
      const result = getCheckboxWrapperClass(true, true, false, false, true);
      expect(result).toBe('checkbox-wrapper checkbox-wrapper--disabled checkbox-wrapper--state-error checkbox-wrapper--loading');
    });
  });

  describe('getCheckboxCustomClass', () => {
    it('returns base class only when neither checked nor indeterminate', () => {
      expect(getCheckboxCustomClass(false, false)).toBe('checkbox-custom');
    });

    it('includes checked class when checked=true', () => {
      expect(getCheckboxCustomClass(true, false)).toBe('checkbox-custom checkbox-custom--checked');
    });

    it('includes indeterminate class when indeterminate=true', () => {
      expect(getCheckboxCustomClass(false, true)).toBe('checkbox-custom checkbox-custom--indeterminate');
    });

    it('includes both classes when both are true', () => {
      expect(getCheckboxCustomClass(true, true)).toBe('checkbox-custom checkbox-custom--checked checkbox-custom--indeterminate');
    });
  });
});
