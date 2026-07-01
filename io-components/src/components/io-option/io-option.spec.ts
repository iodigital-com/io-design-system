import { describe, it, expect, beforeEach } from 'vitest';
import { IoOption } from './io-option';
import { resolveOptionId, getOptionClass } from './io-option-utils';

describe('io-option — default props', () => {
  let component: IoOption;

  beforeEach(() => {
    component = new IoOption();
  });

  it('value defaults to empty string', () => {
    expect(component.value).toBe('');
  });

  it('disabled defaults to false', () => {
    expect(component.disabled).toBe(false);
  });

  it('selected defaults to false', () => {
    expect(component.selected).toBe(false);
  });

  it('checked defaults to false', () => {
    expect(component.checked).toBe(false);
  });

  it('multipleMode defaults to false', () => {
    expect(component.multipleMode).toBe(false);
  });

  it('focused defaults to false', () => {
    expect(component.focused).toBe(false);
  });

  it('icon defaults to undefined', () => {
    expect(component.icon).toBeUndefined();
  });

  it('accepts icon prop', () => {
    component.icon = 'flag-us';
    expect(component.icon).toBe('flag-us');
  });
});

describe('io-option-utils — resolveOptionId', () => {
  it('returns a stable prefixed id', () => {
    expect(resolveOptionId('alice', 'abc')).toMatch(/^io-option-alice-abc$/);
  });

  it('sanitises special characters in value', () => {
    expect(resolveOptionId('Alice Smith', 'fb')).toMatch(/^io-option-alice-smith-fb$/);
  });
});

describe('io-option-utils — getOptionClass', () => {
  it('returns base class', () => {
    expect(getOptionClass(false, false, false, false)).toBe('option');
  });

  it('adds selected modifier', () => {
    expect(getOptionClass(true, false, false, false)).toContain('option--selected');
  });

  it('adds disabled modifier', () => {
    expect(getOptionClass(false, true, false, false)).toContain('option--disabled');
  });

  it('adds focused modifier', () => {
    expect(getOptionClass(false, false, true, false)).toContain('option--focused');
  });

  it('adds multiple modifier', () => {
    expect(getOptionClass(false, false, false, true)).toContain('option--multiple');
  });
});
