import { describe, it, expect } from 'vitest';

import { createTooltipId, getTooltipMiddleware, getTooltipPositionStyle } from './io-tooltip-utils';

describe('createTooltipId', () => {
  it('prefixes the random value with io-tooltip-', () => {
    expect(createTooltipId('abc123')).toBe('io-tooltip-abc123');
  });

  it('handles empty string', () => {
    expect(createTooltipId('')).toBe('io-tooltip-');
  });
});

describe('getTooltipMiddleware', () => {
  it('returns an array of middleware', () => {
    const middleware = getTooltipMiddleware();
    expect(Array.isArray(middleware)).toBe(true);
    expect(middleware.length).toBeGreaterThan(0);
  });
});

describe('getTooltipPositionStyle', () => {
  it('converts x/y numbers to px strings', () => {
    const style = getTooltipPositionStyle(100, 200);
    expect(style).toEqual({ top: '200px', left: '100px' });
  });

  it('handles zero values', () => {
    const style = getTooltipPositionStyle(0, 0);
    expect(style).toEqual({ top: '0px', left: '0px' });
  });
});
