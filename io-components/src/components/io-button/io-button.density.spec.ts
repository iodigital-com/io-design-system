import { describe, it, expect } from 'vitest';

import { getButtonStyles } from './io-button-styles';

describe('io-button density tokens', () => {
  it('uses --io-spacing-component-y for vertical padding in md size', () => {
    const styles = getButtonStyles();
    expect(styles).toContain('--io-spacing-component-y');
  });

  it('uses --io-spacing-component-x for horizontal padding in md size', () => {
    const styles = getButtonStyles();
    expect(styles).toContain('--io-spacing-component-x');
  });

  it('md size padding shorthand references both density tokens', () => {
    const styles = getButtonStyles();
    expect(styles).toContain(
      'padding: var(--io-spacing-component-y) var(--io-spacing-component-x)',
    );
  });

  it('does not hardcode pixel padding values in the md size rule', () => {
    const styles = getButtonStyles();
    // Ensure the old hardcoded --io-space-2 / --io-space-6 shorthand was replaced
    expect(styles).not.toContain('padding: var(--io-space-2) var(--io-space-6)');
  });
});
