import { describe, it, expect } from 'vitest';

import { getToastVariantIcon, getToastCloseIcon } from './io-toast-item-utils';

describe('getToastVariantIcon', () => {
  it.each(['neutral', 'success', 'error', 'warning', 'info'] as const)(
    'returns an SVG string for variant %s',
    (variant) => {
      const icon = getToastVariantIcon(variant);
      expect(icon).toContain('<svg');
      expect(icon).toContain('aria-hidden="true"');
    },
  );

  it('returns neutral icon as fallback for unknown variant', () => {
    const neutral = getToastVariantIcon('neutral');
    const unknown = getToastVariantIcon('unknown' as any);
    expect(unknown).toBe(neutral);
  });

  it('success icon contains path elements (check-circle from Lucide)', () => {
    const icon = getToastVariantIcon('success');
    expect(icon).toContain('<path');
  });

  it('error icon contains path elements (x-circle from Lucide)', () => {
    const icon = getToastVariantIcon('error');
    expect(icon).toContain('<path');
  });

  it('warning icon contains a triangle path', () => {
    const icon = getToastVariantIcon('warning');
    expect(icon).toContain('<path');
  });
});

describe('getToastCloseIcon', () => {
  it('returns an SVG string', () => {
    const icon = getToastCloseIcon();
    expect(icon).toContain('<svg');
  });

  it('returns the same value on each call (no re-computation)', () => {
    expect(getToastCloseIcon()).toBe(getToastCloseIcon());
  });

  it('close icon has aria-hidden="true"', () => {
    expect(getToastCloseIcon()).toContain('aria-hidden="true"');
  });
});
