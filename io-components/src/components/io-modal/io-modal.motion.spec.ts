/**
 * #1019 — Overlay family prefers-reduced-motion coverage
 *
 * Asserts that all four overlay style functions include a
 * `@media (prefers-reduced-motion: reduce)` block and that it
 * disables their animations / transitions.
 */
import { describe, it, expect } from 'vitest';

import { getModalStyles } from '../io-modal/io-modal-styles';
import { getDrawerStyles } from '../io-drawer/io-drawer-styles';
import { getFlyoutStyles } from '../io-flyout/io-flyout-styles';
import { getSheetStyles } from '../io-sheet/io-sheet-styles';

describe('overlay family — prefers-reduced-motion (#1019)', () => {
  it('io-modal styles contain @media prefers-reduced-motion block', () => {
    const styles = getModalStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const idx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(idx)).toContain('animation: none');
  });

  it('io-drawer styles contain @media prefers-reduced-motion block', () => {
    const styles = getDrawerStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const idx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(idx)).toContain('animation: none');
  });

  it('io-flyout styles contain @media prefers-reduced-motion block', () => {
    const styles = getFlyoutStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const idx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(idx)).toContain('transition: none');
  });

  it('io-sheet styles contain @media prefers-reduced-motion block', () => {
    const styles = getSheetStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const idx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(idx)).toContain('animation: none');
  });
});
