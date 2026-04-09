import { describe, expect, it } from 'vitest';
import { getSpinnerClassName, normalizeSpinnerLabel } from './io-spinner-utils';

describe('io-spinner-utils', () => {
  it('builds spinner class names from size and color', () => {
    expect(getSpinnerClassName('md', 'primary')).toBe('spinner spinner--md spinner--primary');
    expect(getSpinnerClassName('lg', 'current')).toBe('spinner spinner--lg spinner--current');
  });

  it('normalizes whitespace-only labels to Loading', () => {
    expect(normalizeSpinnerLabel('   ')).toBe('Loading');
  });

  it('normalizes non-string labels to Loading', () => {
    expect(normalizeSpinnerLabel(undefined)).toBe('Loading');
    expect(normalizeSpinnerLabel(null)).toBe('Loading');
    expect(normalizeSpinnerLabel(42)).toBe('Loading');
  });

  it('returns trimmed string labels', () => {
    expect(normalizeSpinnerLabel(' Saving...  ')).toBe('Saving...');
  });
});
