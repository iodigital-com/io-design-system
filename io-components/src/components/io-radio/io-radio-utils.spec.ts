import { describe, it, expect } from 'vitest';

import {
  sanitizeNameSegment,
  resolveRadioId,
  getRadioWrapperClass,
  getRadioCustomClass,
} from './io-radio-utils';

describe('sanitizeNameSegment', () => {
  it('lowercases and trims input', () => {
    expect(sanitizeNameSegment('  Hello  ')).toBe('hello');
  });

  it('replaces disallowed characters with hyphens', () => {
    expect(sanitizeNameSegment('foo bar!baz')).toBe('foo-bar-baz');
  });

  it('strips leading and trailing hyphens', () => {
    expect(sanitizeNameSegment('--hello--')).toBe('hello');
  });

  it('preserves underscores and digits', () => {
    expect(sanitizeNameSegment('my_option_1')).toBe('my_option_1');
  });

  it('returns empty string for all-disallowed input', () => {
    expect(sanitizeNameSegment('!!!')).toBe('');
  });
});

describe('resolveRadioId', () => {
  it('builds id with sanitized name when name is provided', () => {
    expect(resolveRadioId('gender', 'abc123')).toBe('io-radio-gender-abc123');
  });

  it('builds id without name segment when name is undefined', () => {
    expect(resolveRadioId(undefined, 'abc123')).toBe('io-radio-abc123');
  });

  it('builds id without name segment when name sanitizes to empty string', () => {
    expect(resolveRadioId('!!!', 'abc123')).toBe('io-radio-abc123');
  });

  it('sanitizes special characters in name', () => {
    expect(resolveRadioId('My Option!', 'xyz')).toBe('io-radio-my-option-xyz');
  });
});

describe('getRadioWrapperClass', () => {
  it('returns only base class when no state and not disabled', () => {
    expect(getRadioWrapperClass(false, false, false, false)).toBe('radio-wrapper');
  });

  it('includes disabled modifier when disabled is true', () => {
    expect(getRadioWrapperClass(true, false, false, false)).toBe('radio-wrapper radio-wrapper--disabled');
  });

  it('includes state-error modifier when error is true', () => {
    expect(getRadioWrapperClass(false, true, false, false)).toBe('radio-wrapper radio-wrapper--state-error');
  });

  it('includes state-success modifier when success is true', () => {
    expect(getRadioWrapperClass(false, false, true, false)).toBe('radio-wrapper radio-wrapper--state-success');
  });

  it('includes state-warning modifier when warning is true', () => {
    expect(getRadioWrapperClass(false, false, false, true)).toBe('radio-wrapper radio-wrapper--state-warning');
  });

  it('includes both disabled and state-error modifiers when both are true', () => {
    expect(getRadioWrapperClass(true, true, false, false)).toBe('radio-wrapper radio-wrapper--disabled radio-wrapper--state-error');
  });

  it('includes loading modifier when loading=true', () => {
    expect(getRadioWrapperClass(false, false, false, false, true)).toBe('radio-wrapper radio-wrapper--loading');
  });
});

describe('getRadioCustomClass', () => {
  it('returns base class only when not checked', () => {
    expect(getRadioCustomClass(false)).toBe('radio-custom');
  });

  it('appends checked modifier when checked is true', () => {
    expect(getRadioCustomClass(true)).toBe('radio-custom radio-custom--checked');
  });
});
