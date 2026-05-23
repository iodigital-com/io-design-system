import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-divider — a11y', () => {
  it('horizontal <hr> has no violations', async () => {
    const hr = document.createElement('hr');
    await renderAndCheckA11y(hr);
  });

  it('vertical div[role="separator"] has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'separator');
    el.setAttribute('aria-orientation', 'vertical');
    await renderAndCheckA11y(el);
  });

  it('labeled separator has no violations', async () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('role', 'separator');
    wrapper.setAttribute('aria-orientation', 'horizontal');

    const lineLeft = document.createElement('span');
    lineLeft.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = 'or';

    const lineRight = document.createElement('span');
    lineRight.setAttribute('aria-hidden', 'true');

    wrapper.appendChild(lineLeft);
    wrapper.appendChild(label);
    wrapper.appendChild(lineRight);

    await renderAndCheckA11y(wrapper);
  });
});
