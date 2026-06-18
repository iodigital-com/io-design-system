import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-segmented-control
 *
 * Tests the native HTML patterns that underpin the segmented control:
 * a group of radio-like buttons using role="radiogroup" / role="radio".
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-segmented-control — a11y (ARIA patterns)', () => {
  it('role=radiogroup with labelled radio buttons has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'radiogroup');
    el.setAttribute('aria-label', 'View mode');
    el.innerHTML = `
      <button role="radio" aria-checked="true" tabindex="0" aria-label="List">List</button>
      <button role="radio" aria-checked="false" tabindex="-1" aria-label="Grid">Grid</button>
      <button role="radio" aria-checked="false" tabindex="-1" aria-label="Map">Map</button>
    `;
    await renderAndCheckA11y(el);
  });

  it('role=group with labelled buttons has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', 'Display options');
    el.innerHTML = `
      <button type="button" aria-pressed="true" tabindex="0" aria-label="Compact">Compact</button>
      <button type="button" aria-pressed="false" tabindex="-1" aria-label="Comfortable">Comfortable</button>
    `;
    await renderAndCheckA11y(el);
  });

  it('disabled group has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', 'View mode');
    el.setAttribute('aria-disabled', 'true');
    el.innerHTML = `
      <button type="button" disabled tabindex="-1" aria-label="List">List</button>
      <button type="button" disabled tabindex="-1" aria-label="Grid">Grid</button>
    `;
    await renderAndCheckA11y(el);
  });
});
