import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-tag — a11y', () => {
  it('toggle button has no violations', async () => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = 'Design';
    await renderAndCheckA11y(btn);
  });

  it('removable tag remove button has contextual aria-label with no violations', async () => {
    const wrapper = document.createElement('div');

    const toggleBtn = document.createElement('button');
    toggleBtn.setAttribute('type', 'button');
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.textContent = 'React';

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('type', 'button');
    removeBtn.setAttribute('aria-label', 'Remove React');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '10');
    svg.setAttribute('height', '10');
    removeBtn.appendChild(svg);

    wrapper.appendChild(toggleBtn);
    wrapper.appendChild(removeBtn);
    await renderAndCheckA11y(wrapper);
  });

  it('disabled removable tag has no violations', async () => {
    const wrapper = document.createElement('div');

    const toggleBtn = document.createElement('button');
    toggleBtn.setAttribute('type', 'button');
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.setAttribute('disabled', '');
    toggleBtn.textContent = 'React';

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('type', 'button');
    removeBtn.setAttribute('aria-label', 'Remove React');
    removeBtn.setAttribute('disabled', '');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '10');
    svg.setAttribute('height', '10');
    removeBtn.appendChild(svg);

    wrapper.appendChild(toggleBtn);
    wrapper.appendChild(removeBtn);
    await renderAndCheckA11y(wrapper);
  });
});
