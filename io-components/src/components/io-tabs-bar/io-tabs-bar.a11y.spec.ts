import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-tabs-bar
 *
 * Covers both tablist mode (button children) and navigation mode (anchor children).
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-tabs-bar — a11y (tablist pattern — button children)', () => {
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

describe('io-tabs-bar — a11y (navigation pattern — anchor children, issue #978)', () => {
  it('nav landmark with aria-current="page" on active anchor has no axe violations', async () => {
    const el = document.createElement('nav');
    el.setAttribute('aria-label', 'Site navigation');
    el.innerHTML = `
      <a href="/overview" aria-current="page" tabindex="0">Overview</a>
      <a href="/details" tabindex="-1">Details</a>
      <a href="/settings" tabindex="-1">Settings</a>
    `;
    await renderAndCheckA11y(el);
  });

  it('nav landmark without aria-label has no axe violations', async () => {
    const el = document.createElement('nav');
    el.innerHTML = `
      <a href="/overview" aria-current="page" tabindex="0">Overview</a>
      <a href="/details" tabindex="-1">Details</a>
    `;
    await renderAndCheckA11y(el);
  });

  it('nav landmark with disabled anchor has no axe violations', async () => {
    const el = document.createElement('nav');
    el.setAttribute('aria-label', 'Section navigation');
    el.innerHTML = `
      <a href="/overview" aria-current="page" tabindex="0">Overview</a>
      <a href="/details" tabindex="-1">Details</a>
      <span aria-disabled="true" tabindex="-1">Disabled</span>
    `;
    await renderAndCheckA11y(el);
  });
});
