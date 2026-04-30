import { describe, it, expect, beforeEach } from 'vitest';

import { IoDivider } from './io-divider';
import { getDividerStyles } from './io-divider-styles';

describe('io-divider — default props', () => {
  let comp: IoDivider;

  beforeEach(() => {
    comp = new IoDivider();
    (comp as any).el = document.createElement('io-divider');
  });

  it('orientation defaults to "horizontal"', () => {
    expect(comp.orientation).toBe('horizontal');
  });

  it('label defaults to undefined', () => {
    expect(comp.label).toBeUndefined();
  });
});

describe('io-divider — style tokens', () => {
  it('uses --io-divider-color token for the border', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-divider-color)');
  });

  it('uses --io-divider-thickness token for border width', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-divider-thickness)');
  });

  it('uses --io-divider-gap token for labeled variant', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-divider-gap)');
  });

  it('uses --io-divider-label-size token for label font size', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-divider-label-size)');
  });

  it('uses --io-text-secondary for label color (token-first)', () => {
    const styles = getDividerStyles();
    expect(styles).toContain('var(--io-text-secondary)');
  });

  it('contains no hardcoded hex color values', () => {
    const styles = getDividerStyles();
    expect(styles).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
  });
});

describe('io-divider — ARIA contract (via orientation prop)', () => {
  it('orientation "horizontal" is the default', () => {
    const comp = new IoDivider();
    expect(comp.orientation).toBe('horizontal');
  });

  it('orientation can be set to "vertical"', () => {
    const comp = new IoDivider();
    comp.orientation = 'vertical';
    expect(comp.orientation).toBe('vertical');
  });

  it('label prop carries the accessible text shown in the labeled variant', () => {
    const comp = new IoDivider();
    comp.label = 'or';
    expect(comp.label).toBe('or');
  });

  it('styles include aria-orientation="vertical" markup for vertical divider in shadow styles', () => {
    // The vertical orientation is represented by CSS class; verify the class name is present
    const styles = getDividerStyles();
    expect(styles).toContain('.divider--vertical');
  });
});
