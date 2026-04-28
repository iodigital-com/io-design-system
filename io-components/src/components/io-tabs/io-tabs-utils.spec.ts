import { describe, it, expect } from 'vitest';
import { getNextEnabledIndex } from './io-tabs-utils';

describe('io-tabs-utils — getNextEnabledIndex', () => {
  it('returns null for an empty enabled list', () => {
    expect(getNextEnabledIndex('ArrowRight', 0, 0)).toBeNull();
  });

  it('returns null for an out-of-bounds currentEnabledIndex', () => {
    expect(getNextEnabledIndex('ArrowRight', -1, 3)).toBeNull();
    expect(getNextEnabledIndex('ArrowRight', 3, 3)).toBeNull();
  });

  it('returns null for unrecognised keys', () => {
    expect(getNextEnabledIndex('Enter', 0, 3)).toBeNull();
    expect(getNextEnabledIndex('Escape', 0, 3)).toBeNull();
    expect(getNextEnabledIndex('Tab', 0, 3)).toBeNull();
  });

  it('ArrowRight advances index with wrap-around', () => {
    expect(getNextEnabledIndex('ArrowRight', 0, 3)).toBe(1);
    expect(getNextEnabledIndex('ArrowRight', 1, 3)).toBe(2);
    expect(getNextEnabledIndex('ArrowRight', 2, 3)).toBe(0); // wraps
  });

  it('ArrowLeft reverses index with wrap-around', () => {
    expect(getNextEnabledIndex('ArrowLeft', 2, 3)).toBe(1);
    expect(getNextEnabledIndex('ArrowLeft', 1, 3)).toBe(0);
    expect(getNextEnabledIndex('ArrowLeft', 0, 3)).toBe(2); // wraps
  });

  it('Home returns 0', () => {
    expect(getNextEnabledIndex('Home', 2, 3)).toBe(0);
    expect(getNextEnabledIndex('Home', 0, 3)).toBe(0);
  });

  it('End returns the last index', () => {
    expect(getNextEnabledIndex('End', 0, 3)).toBe(2);
    expect(getNextEnabledIndex('End', 2, 3)).toBe(2);
  });
});

