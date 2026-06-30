import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-segmented-control
 *
 * #1080 — the component now renders an inner <fieldset role="radiogroup">
 * with <legend>. These tests verify the ARIA patterns used by the resulting
 * DOM structure are axe-clean.
 *
 * #1084 — role="radio" now lives on the inner button (not the Host element)
 * to prevent double-announcement. Tests use role="radio" on <button>.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-segmented-control — a11y (ARIA patterns)', () => {
  it('fieldset role=radiogroup with labelled radio buttons has no axe violations (#1080)', async () => {
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('role', 'radiogroup');
    fieldset.setAttribute('aria-label', 'View mode');
    fieldset.innerHTML = `
      <legend>View mode</legend>
      <button role="radio" aria-checked="true" tabindex="0" aria-label="List" type="button">List</button>
      <button role="radio" aria-checked="false" tabindex="-1" aria-label="Grid" type="button">Grid</button>
      <button role="radio" aria-checked="false" tabindex="-1" aria-label="Map" type="button">Map</button>
    `;
    await renderAndCheckA11y(fieldset);
  });

  it('role=radiogroup with labelled radio buttons has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'radiogroup');
    el.setAttribute('aria-label', 'View mode');
    el.innerHTML = `
      <button role="radio" aria-checked="true" tabindex="0" aria-label="List" type="button">List</button>
      <button role="radio" aria-checked="false" tabindex="-1" aria-label="Grid" type="button">Grid</button>
      <button role="radio" aria-checked="false" tabindex="-1" aria-label="Map" type="button">Map</button>
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

  it('disabled fieldset radiogroup has no axe violations', async () => {
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('role', 'radiogroup');
    fieldset.setAttribute('aria-label', 'View mode');
    fieldset.disabled = true;
    fieldset.innerHTML = `
      <legend>View mode</legend>
      <button role="radio" type="button" disabled tabindex="-1" aria-label="List" aria-checked="false">List</button>
      <button role="radio" type="button" disabled tabindex="-1" aria-label="Grid" aria-checked="false">Grid</button>
    `;
    await renderAndCheckA11y(fieldset);
  });

  it('radiogroup with aria-required and error state has no axe violations (#1074)', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'radiogroup');
    el.setAttribute('aria-label', 'View mode');
    el.setAttribute('aria-required', 'true');
    el.setAttribute('aria-invalid', 'true');
    el.setAttribute('aria-describedby', 'sc-error');
    el.innerHTML = `
      <button role="radio" aria-checked="false" tabindex="0" aria-label="List" type="button">List</button>
      <button role="radio" aria-checked="false" tabindex="-1" aria-label="Grid" type="button">Grid</button>
      <p id="sc-error" role="alert">Please select an option.</p>
    `;
    await renderAndCheckA11y(el);
  });
});
