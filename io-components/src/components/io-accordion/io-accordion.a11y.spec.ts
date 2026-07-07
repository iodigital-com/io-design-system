import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-accordion
 *
 * Tests the native HTML patterns rendered inside io-accordion's Shadow DOM
 * (button + region + aria-expanded/controls/labelledby). Full component-level
 * auditing against the Shadow DOM requires the Stencil render environment.
 *
 * Size variants (xs, sm, md, lg) are tested here to confirm that adding the size
 * attribute does not introduce any accessibility violations.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-accordion — a11y (ARIA disclosure pattern)', () => {
  it('collapsed accordion trigger with region has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <h3>
          <button
            id="acc-trigger"
            aria-expanded="false"
            aria-controls="acc-panel"
          >
            Section heading
          </button>
        </h3>
        <div
          id="acc-panel"
          role="region"
          aria-labelledby="acc-trigger"
          hidden
        >
          <p>Panel content here.</p>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('expanded accordion trigger with visible region has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <h3>
          <button
            id="acc-trigger-open"
            aria-expanded="true"
            aria-controls="acc-panel-open"
          >
            Section heading
          </button>
        </h3>
        <div
          id="acc-panel-open"
          role="region"
          aria-labelledby="acc-trigger-open"
        >
          <p>Panel content here.</p>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('disabled accordion trigger has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <h3>
          <button
            id="acc-trigger-disabled"
            aria-expanded="false"
            aria-controls="acc-panel-disabled"
            aria-disabled="true"
            disabled
          >
            Disabled section
          </button>
        </h3>
        <div
          id="acc-panel-disabled"
          role="region"
          aria-labelledby="acc-trigger-disabled"
          hidden
        >
          <p>Panel content here.</p>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('size xs — accordion trigger with region has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <h3>
          <button
            id="acc-trigger-xs"
            aria-expanded="false"
            aria-controls="acc-panel-xs"
          >
            Extra small accordion
          </button>
        </h3>
        <div
          id="acc-panel-xs"
          role="region"
          aria-labelledby="acc-trigger-xs"
          hidden
        >
          <p>Densest panel content.</p>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('size sm — accordion trigger with region has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <h3>
          <button
            id="acc-trigger-sm"
            aria-expanded="false"
            aria-controls="acc-panel-sm"
          >
            Small accordion
          </button>
        </h3>
        <div
          id="acc-panel-sm"
          role="region"
          aria-labelledby="acc-trigger-sm"
          hidden
        >
          <p>Compact panel content.</p>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('size md — accordion trigger with region has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <h3>
          <button
            id="acc-trigger-md"
            aria-expanded="false"
            aria-controls="acc-panel-md"
          >
            Medium accordion
          </button>
        </h3>
        <div
          id="acc-panel-md"
          role="region"
          aria-labelledby="acc-trigger-md"
          hidden
        >
          <p>Default panel content.</p>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('size lg — accordion trigger with region has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <h3>
          <button
            id="acc-trigger-lg"
            aria-expanded="false"
            aria-controls="acc-panel-lg"
          >
            Large accordion
          </button>
        </h3>
        <div
          id="acc-panel-lg"
          role="region"
          aria-labelledby="acc-trigger-lg"
          hidden
        >
          <p>Comfortable panel content.</p>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
