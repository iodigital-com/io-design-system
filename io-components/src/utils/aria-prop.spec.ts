import { describe, it, expect, vi, afterEach } from 'vitest';

import { normaliseAriaKey, applyAriaProp } from './aria-prop';

describe('normaliseAriaKey', () => {
  it('returns a prefixed key for a bare attribute name', () => {
    expect(normaliseAriaKey('controls')).toBe('aria-controls');
  });

  it('passes through a key that already has the aria- prefix', () => {
    expect(normaliseAriaKey('aria-controls')).toBe('aria-controls');
  });

  it('returns null for an unknown attribute key', () => {
    expect(normaliseAriaKey('data-foo')).toBeNull();
  });

  it('normalises key casing to lowercase', () => {
    expect(normaliseAriaKey('LABEL')).toBe('aria-label');
    expect(normaliseAriaKey('aria-LABEL')).toBe('aria-label');
  });

  it('returns null for an empty string', () => {
    expect(normaliseAriaKey('')).toBeNull();
  });

  it('handles all well-known ARIA attributes without the prefix', () => {
    const knownKeys = [
      'label', 'labelledby', 'describedby', 'controls', 'haspopup',
      'expanded', 'selected', 'checked', 'disabled', 'readonly',
      'required', 'invalid', 'errormessage', 'owns', 'live',
    ];
    for (const key of knownKeys) {
      expect(normaliseAriaKey(key)).toBe(`aria-${key}`);
    }
  });
});

describe('applyAriaProp', () => {
  it('sets normalised aria attributes on the target element', () => {
    // Arrange
    const el = document.createElement('button');
    const ariaProp = { controls: 'panel-id', label: 'Open panel' };

    // Act
    applyAriaProp(ariaProp, el);

    // Assert
    expect(el.getAttribute('aria-controls')).toBe('panel-id');
    expect(el.getAttribute('aria-label')).toBe('Open panel');
  });

  it('accepts keys with the aria- prefix already present', () => {
    const el = document.createElement('input');
    applyAriaProp({ 'aria-controls': 'suggestions', 'aria-autocomplete': 'list' }, el);
    expect(el.getAttribute('aria-controls')).toBe('suggestions');
    expect(el.getAttribute('aria-autocomplete')).toBe('list');
  });

  it('logs a warning for unknown keys in non-production environments', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const el = document.createElement('div');

    applyAriaProp({ 'data-foo': 'bar', unknownAttr: 'val' }, el);

    expect(warnSpy).toHaveBeenCalledTimes(2);
    expect(warnSpy.mock.calls[0][0]).toContain('data-foo');
    warnSpy.mockRestore();
  });

  it('does not set unknown keys as attributes', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const el = document.createElement('div');

    applyAriaProp({ 'data-foo': 'bar' }, el);

    expect(el.getAttribute('data-foo')).toBeNull();
    vi.restoreAllMocks();
  });

  it('is a no-op when ariaProp is undefined', () => {
    const el = document.createElement('button');
    el.setAttribute('aria-label', 'original');

    applyAriaProp(undefined, el);

    expect(el.getAttribute('aria-label')).toBe('original');
  });

  it('is a no-op when targetEl is null', () => {
    // Should not throw
    expect(() => applyAriaProp({ label: 'test' }, null)).not.toThrow();
  });

  it('is a no-op when targetEl is undefined', () => {
    expect(() => applyAriaProp({ label: 'test' }, undefined)).not.toThrow();
  });

  it('does not warn in production environment', () => {
    const originalProd = (globalThis as Record<string, unknown>).__STENCIL_PROD__;
    (globalThis as Record<string, unknown>).__STENCIL_PROD__ = true;

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const el = document.createElement('div');

    applyAriaProp({ 'data-unknown': 'val' }, el);

    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
    (globalThis as Record<string, unknown>).__STENCIL_PROD__ = originalProd;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
