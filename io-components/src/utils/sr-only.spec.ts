import { describe, it, expect } from 'vitest';
import { getSrOnlyStyles } from './sr-only';

describe('getSrOnlyStyles', () => {
  it('returns a non-empty string', () => {
    const styles = getSrOnlyStyles();
    expect(typeof styles).toBe('string');
    expect(styles.length).toBeGreaterThan(0);
  });

  it('includes position: absolute', () => {
    expect(getSrOnlyStyles()).toContain('position: absolute');
  });

  it('includes width: 1px', () => {
    expect(getSrOnlyStyles()).toContain('width: 1px');
  });

  it('includes height: 1px', () => {
    expect(getSrOnlyStyles()).toContain('height: 1px');
  });

  it('includes clip: rect(0, 0, 0, 0)', () => {
    expect(getSrOnlyStyles()).toContain('clip: rect(0, 0, 0, 0)');
  });

  it('includes clip-path: inset(50%)', () => {
    expect(getSrOnlyStyles()).toContain('clip-path: inset(50%)');
  });

  it('includes white-space: nowrap', () => {
    expect(getSrOnlyStyles()).toContain('white-space: nowrap');
  });

  it('includes overflow: hidden', () => {
    expect(getSrOnlyStyles()).toContain('overflow: hidden');
  });
});
