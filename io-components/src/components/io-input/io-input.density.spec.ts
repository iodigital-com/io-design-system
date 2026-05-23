import { describe, it, expect } from 'vitest';

import { getInputStyles } from './io-input-styles';

describe('io-input density tokens', () => {
  it('uses --io-spacing-component-y for vertical padding on .input-field', () => {
    const styles = getInputStyles();
    expect(styles).toContain('--io-spacing-component-y');
  });

  it('does not use --io-input-padding-y for the field vertical padding shorthand', () => {
    const styles = getInputStyles();
    // The old shorthand was: padding: var(--io-input-padding-y) ... var(--io-input-padding-y) 0
    // It should now reference --io-spacing-component-y instead
    expect(styles).not.toContain(
      'padding: var(--io-input-padding-y) var(--io-input-padding-right) var(--io-input-padding-y) 0',
    );
  });

  it('input-field padding uses density token for top and bottom', () => {
    const styles = getInputStyles();
    expect(styles).toContain(
      'padding: var(--io-spacing-component-y) var(--io-input-padding-right) var(--io-spacing-component-y) 0',
    );
  });
});
