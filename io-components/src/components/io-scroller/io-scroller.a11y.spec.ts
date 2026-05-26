import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-scroller — a11y', () => {
  it('horizontal scroll region with label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div
        role="region"
        aria-label="Scrollable horizontal region"
        tabindex="0"
        style="overflow-x: auto;"
      >
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('vertical scroll region with label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div
        role="region"
        aria-label="Scrollable vertical region"
        tabindex="0"
        style="overflow-y: auto;"
      >
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('scroll region with custom label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div
        role="region"
        aria-label="Navigation tabs"
        tabindex="0"
        style="overflow-x: auto;"
      >
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('scroll region with image strip label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div
        role="region"
        aria-label="Image strip"
        tabindex="0"
        style="overflow-x: auto; display: flex;"
      >
        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Photo 1" />
        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="Photo 2" />
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
