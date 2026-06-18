import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-tag-dismissible — a11y', () => {
  it('dismiss button carries aria-label "Remove {label}" with no violations', async () => {
    const wrapper = document.createElement('div');

    const label = document.createElement('span');
    label.textContent = 'React';

    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Remove React');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '10');
    svg.setAttribute('height', '10');
    btn.appendChild(svg);

    wrapper.appendChild(label);
    wrapper.appendChild(btn);
    await renderAndCheckA11y(wrapper);
  });

  it('dismiss button aria-label matches label prop', async () => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Remove TypeScript');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '10');
    svg.setAttribute('height', '10');
    btn.appendChild(svg);

    await renderAndCheckA11y(btn);
  });
});
