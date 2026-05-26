import { describe, it, expect } from 'vitest';

import { sanitizeNameSegment, resolveTextareaId, getTextareaWrapperClass, getTextareaFieldClass } from './io-textarea-utils';

describe('sanitizeNameSegment', () => {
  it('lowercases and trims the name', () => {
    expect(sanitizeNameSegment('  Hello  ')).toBe('hello');
  });

  it('replaces non-alphanumeric characters with hyphens', () => {
    expect(sanitizeNameSegment('First Name')).toBe('first-name');
  });

  it('strips leading and trailing hyphens', () => {
    expect(sanitizeNameSegment('--name--')).toBe('name');
  });

  it('handles names with underscores', () => {
    expect(sanitizeNameSegment('first_name')).toBe('first_name');
  });

  it('collapses multiple special chars into one hyphen', () => {
    expect(sanitizeNameSegment('a  b')).toBe('a-b');
  });
});

describe('resolveTextareaId', () => {
  it('builds id with sanitized name when name is provided', () => {
    const id = resolveTextareaId('email', 'abc123');
    expect(id).toBe('io-textarea-email-abc123');
  });

  it('builds id without name segment when name is undefined', () => {
    const id = resolveTextareaId(undefined, 'abc123');
    expect(id).toBe('io-textarea-abc123');
  });

  it('builds id without name segment when name is empty string', () => {
    const id = resolveTextareaId('', 'abc123');
    expect(id).toBe('io-textarea-abc123');
  });

  it('sanitizes the name before building the id', () => {
    const id = resolveTextareaId('My Field', 'xyz');
    expect(id).toBe('io-textarea-my-field-xyz');
  });
});

describe('getTextareaWrapperClass', () => {
  it('returns base class when no state and not disabled', () => {
    expect(getTextareaWrapperClass(false, false, false, false)).toBe('textarea-wrapper');
  });

  it('adds state-error modifier when error=true', () => {
    expect(getTextareaWrapperClass(true, false, false, false)).toBe('textarea-wrapper textarea-wrapper--state-error');
  });

  it('adds state-success modifier when success=true', () => {
    expect(getTextareaWrapperClass(false, true, false, false)).toBe('textarea-wrapper textarea-wrapper--state-success');
  });

  it('adds state-warning modifier when warning=true', () => {
    expect(getTextareaWrapperClass(false, false, true, false)).toBe('textarea-wrapper textarea-wrapper--state-warning');
  });

  it('adds disabled modifier when disabled=true', () => {
    expect(getTextareaWrapperClass(false, false, false, true)).toBe('textarea-wrapper textarea-wrapper--disabled');
  });

  it('adds both state-error and disabled modifiers when both are true', () => {
    const cls = getTextareaWrapperClass(true, false, false, true);
    expect(cls).toContain('textarea-wrapper--state-error');
    expect(cls).toContain('textarea-wrapper--disabled');
  });
});

describe('getTextareaFieldClass', () => {
  it('builds class with resize and size', () => {
    expect(getTextareaFieldClass('vertical', 'md')).toBe('textarea-field textarea-field--resize-vertical textarea-field--md');
  });

  it('builds class for resize=auto', () => {
    expect(getTextareaFieldClass('auto', 'lg')).toBe('textarea-field textarea-field--resize-auto textarea-field--lg');
  });

  it('builds class for resize=none', () => {
    expect(getTextareaFieldClass('none', 'sm')).toBe('textarea-field textarea-field--resize-none textarea-field--sm');
  });
});
