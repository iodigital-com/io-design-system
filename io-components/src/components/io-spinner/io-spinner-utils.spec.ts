import { describe, expect, it } from 'vitest';

import { getSpinnerClassName, getSpinnerCircleRadius, normalizeSpinnerLabel } from './io-spinner-utils';

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

describe('io-spinner-utils — getSpinnerCircleRadius (#1028)', () => {
  it('returns finite positive radius and circumference for all size values', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'inherit'] as const;
    for (const size of sizes) {
      const { r, circumference } = getSpinnerCircleRadius(size);
      expect(r).toBeGreaterThan(0);
      expect(circumference).toBeGreaterThan(0);
    }
  });

  it('larger stroke-width sizes produce smaller radius (fits in 24×24 viewBox)', () => {
    const { r: rXs } = getSpinnerCircleRadius('xs');
    const { r: rXl } = getSpinnerCircleRadius('xl');
    // xs stroke is thinner so its inset is smaller → larger r
    expect(rXs).toBeGreaterThan(rXl);
  });

  it('circumference equals 2π*r', () => {
    const { r, circumference } = getSpinnerCircleRadius('md');
    expect(circumference).toBeCloseTo(2 * Math.PI * r, 5);
  });

  it('radius is safely inset from 12 (half of 24×24 viewBox)', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'inherit'] as const;
    for (const size of sizes) {
      const { r } = getSpinnerCircleRadius(size);
      expect(r).toBeLessThan(12);
    }
  });
});
