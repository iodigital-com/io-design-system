import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { acquireScrollLock, releaseScrollLock, _resetScrollLock } from './scroll-lock';

describe('scroll-lock', () => {
  beforeEach(() => {
    _resetScrollLock();
    document.body.style.overflow = '';
  });

  afterEach(() => {
    _resetScrollLock();
    document.body.style.overflow = '';
  });

  it('locks body overflow on first acquire', () => {
    acquireScrollLock();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('keeps body locked when second overlay acquires', () => {
    acquireScrollLock();
    acquireScrollLock();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('keeps body locked when first of two overlays releases', () => {
    acquireScrollLock();
    acquireScrollLock();
    releaseScrollLock();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores overflow when last overlay releases', () => {
    acquireScrollLock();
    acquireScrollLock();
    releaseScrollLock();
    releaseScrollLock();
    expect(document.body.style.overflow).toBe('');
  });

  it('preserves pre-existing overflow value', () => {
    document.body.style.overflow = 'auto';
    acquireScrollLock();
    releaseScrollLock();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('release is no-op when lock not held', () => {
    releaseScrollLock();
    expect(document.body.style.overflow).toBe('');
  });
});
