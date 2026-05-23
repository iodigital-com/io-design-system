import { describe, expect, it } from 'vitest';

import { clampValue, getProgressFillClass, getProgressWrapperClass } from './io-progress-utils';

describe('io-progress utils', () => {
  describe('clampValue', () => {
    it('clamps below 0 to 0', () => {
      expect(clampValue(-10)).toBe(0);
    });

    it('clamps above 100 to 100', () => {
      expect(clampValue(110)).toBe(100);
    });

    it('passes through valid values', () => {
      expect(clampValue(72)).toBe(72);
    });

    it('passes through edge 0', () => {
      expect(clampValue(0)).toBe(0);
    });

    it('passes through edge 100', () => {
      expect(clampValue(100)).toBe(100);
    });

    it('clamps negative infinity to 0', () => {
      expect(clampValue(-Infinity)).toBe(0);
    });

    it('clamps positive infinity to 100', () => {
      expect(clampValue(Infinity)).toBe(100);
    });
  });

  describe('getProgressWrapperClass', () => {
    it('includes size modifier for md', () => {
      expect(getProgressWrapperClass('md')).toBe('progress-wrapper progress-wrapper--md');
    });

    it('includes size modifier for sm', () => {
      expect(getProgressWrapperClass('sm')).toBe('progress-wrapper progress-wrapper--sm');
    });

    it('includes size modifier for lg', () => {
      expect(getProgressWrapperClass('lg')).toBe('progress-wrapper progress-wrapper--lg');
    });

    it('always starts with progress-wrapper base class', () => {
      expect(getProgressWrapperClass('md')).toContain('progress-wrapper');
    });
  });

  describe('getProgressFillClass', () => {
    it('includes progress-fill base class', () => {
      expect(getProgressFillClass('blue', true)).toContain('progress-fill');
    });

    it('includes color modifier for blue', () => {
      expect(getProgressFillClass('blue', true)).toContain('progress-fill--blue');
    });

    it('includes color modifier for orange', () => {
      expect(getProgressFillClass('orange', true)).toContain('progress-fill--orange');
    });

    it('includes color modifier for success', () => {
      expect(getProgressFillClass('success', true)).toContain('progress-fill--success');
    });

    it('includes color modifier for warning', () => {
      expect(getProgressFillClass('warning', true)).toContain('progress-fill--warning');
    });

    it('includes color modifier for error', () => {
      expect(getProgressFillClass('error', true)).toContain('progress-fill--error');
    });

    it('includes static class when animated=false', () => {
      expect(getProgressFillClass('blue', false)).toContain('progress-fill--static');
    });

    it('omits static class when animated=true', () => {
      expect(getProgressFillClass('blue', true)).not.toContain('progress-fill--static');
    });

    it('returns a single space-separated string', () => {
      const cls = getProgressFillClass('blue', false);
      expect(cls).toBe('progress-fill progress-fill--blue progress-fill--static');
    });

    it('returns correct string without static class', () => {
      const cls = getProgressFillClass('orange', true);
      expect(cls).toBe('progress-fill progress-fill--orange');
    });
  });
});
