import { describe, it, expect } from 'vitest';
import { getButtonAriaAttrs, getButtonClassList } from './io-button-utils';

describe('getButtonAriaAttrs', () => {
  it('returns empty object for default button (not disabled, not loading, no href)', () => {
    const attrs = getButtonAriaAttrs({ disabled: false, loading: false, href: undefined });
    expect(attrs).toEqual({});
  });

  it('sets aria-busy and aria-disabled when loading', () => {
    const attrs = getButtonAriaAttrs({ disabled: false, loading: true, href: undefined });
    expect(attrs['aria-disabled']).toBe('true');
    expect(attrs['aria-busy']).toBe('true');
  });

  it('sets aria-disabled but not aria-busy when only disabled', () => {
    const attrs = getButtonAriaAttrs({ disabled: true, loading: false, href: undefined });
    expect(attrs['aria-disabled']).toBe('true');
    expect(attrs['aria-busy']).toBeUndefined();
  });

  it('sets role="button" for anchor variant', () => {
    const attrs = getButtonAriaAttrs({ disabled: false, loading: false, href: '/path' });
    expect(attrs['role']).toBe('button');
  });

  it('sets aria-disabled on anchor when disabled', () => {
    const attrs = getButtonAriaAttrs({ disabled: true, loading: false, href: '/path' });
    expect(attrs['role']).toBe('button');
    expect(attrs['aria-disabled']).toBe('true');
  });
});

describe('getButtonClassList', () => {
  it('returns base variant/color/size classes for defaults', () => {
    const result = getButtonClassList({
      variant: 'solid',
      color: 'blue',
      size: 'md',
      disabled: false,
      loading: false,
      fullWidth: false,
    });
    expect(result).toBe('io-button--solid io-button--blue io-button--md');
  });

  it('includes disabled class when disabled=true', () => {
    const result = getButtonClassList({
      variant: 'solid',
      color: 'blue',
      size: 'md',
      disabled: true,
      loading: false,
      fullWidth: false,
    });
    expect(result).toContain('io-button--disabled');
  });

  it('includes loading class when loading=true', () => {
    const result = getButtonClassList({
      variant: 'ghost',
      color: 'black',
      size: 'sm',
      disabled: false,
      loading: true,
      fullWidth: false,
    });
    expect(result).toContain('io-button--loading');
  });

  it('includes full-width class when fullWidth=true', () => {
    const result = getButtonClassList({
      variant: 'solid',
      color: 'orange',
      size: 'lg',
      disabled: false,
      loading: false,
      fullWidth: true,
    });
    expect(result).toContain('io-button--full-width');
  });

  it('can accumulate disabled, loading, and full-width classes together', () => {
    const result = getButtonClassList({
      variant: 'link',
      color: 'blue',
      size: 'md',
      disabled: true,
      loading: true,
      fullWidth: true,
    });
    expect(result).toContain('io-button--disabled');
    expect(result).toContain('io-button--loading');
    expect(result).toContain('io-button--full-width');
  });
});
