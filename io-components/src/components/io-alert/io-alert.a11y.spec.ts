import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-alert — a11y', () => {
  it('info alert has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = 'Your session expires in 5 minutes.';
    await renderAndCheckA11y(el);
  });

  it('error alert uses aria-live=assertive and has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = 'Upload failed. The file exceeds 10 MB.';
    await renderAndCheckA11y(el);
  });

  it('alert with heading has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');

    const heading = document.createElement('strong');
    heading.textContent = 'Changes saved';

    const content = document.createElement('div');
    content.textContent = 'Your profile has been updated.';

    el.appendChild(heading);
    el.appendChild(content);
    await renderAndCheckA11y(el);
  });

  it('dismissible alert with accessible button has no violations', async () => {
    const wrapper = document.createElement('div');

    const alertEl = document.createElement('div');
    alertEl.setAttribute('role', 'alert');
    alertEl.setAttribute('aria-live', 'polite');
    alertEl.setAttribute('aria-atomic', 'true');
    alertEl.textContent = 'Item added to cart.';

    const dismissBtn = document.createElement('button');
    dismissBtn.setAttribute('type', 'button');
    dismissBtn.setAttribute('aria-label', 'Dismiss notification');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    dismissBtn.appendChild(svg);

    wrapper.appendChild(alertEl);
    wrapper.appendChild(dismissBtn);
    await renderAndCheckA11y(wrapper);
  });
});
