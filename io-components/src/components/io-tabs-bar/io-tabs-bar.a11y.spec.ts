import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-tabs-bar
 *
 * Tests the native HTML patterns that io-tabs-bar applies to slotted buttons:
 * tablist container + tab buttons with role/aria-selected/tabindex.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-tabs-bar — a11y (tablist pattern)', () => {
  it('tablist with three tab buttons has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="tablist" aria-label="Page sections" aria-orientation="horizontal">
        <button type="button" role="tab" aria-selected="true" tabindex="0">Overview</button>
        <button type="button" role="tab" aria-selected="false" tabindex="-1">Details</button>
        <button type="button" role="tab" aria-selected="false" tabindex="-1">Settings</button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('tablist with a disabled tab button has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="tablist" aria-label="Page sections" aria-orientation="horizontal">
        <button type="button" role="tab" aria-selected="true" tabindex="0">Overview</button>
        <button type="button" role="tab" aria-selected="false" tabindex="-1">Details</button>
        <button type="button" role="tab" aria-selected="false" tabindex="-1" disabled>Settings</button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('tablist without explicit aria-label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="tablist" aria-orientation="horizontal">
        <button type="button" role="tab" aria-selected="true" tabindex="0">Overview</button>
        <button type="button" role="tab" aria-selected="false" tabindex="-1">Details</button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('tablist with second tab active has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="tablist" aria-label="Navigation" aria-orientation="horizontal">
        <button type="button" role="tab" aria-selected="false" tabindex="-1">Overview</button>
        <button type="button" role="tab" aria-selected="true" tabindex="0">Details</button>
        <button type="button" role="tab" aria-selected="false" tabindex="-1">Settings</button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
