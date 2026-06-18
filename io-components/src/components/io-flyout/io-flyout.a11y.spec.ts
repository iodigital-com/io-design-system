import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-flyout — a11y', () => {
  it('dialog with heading has no axe violations', async () => {
    const panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'flyout-heading');

    const heading = document.createElement('h2');
    heading.id = 'flyout-heading';
    heading.textContent = 'Navigation';

    const body = document.createElement('div');
    body.textContent = 'Flyout body content.';

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Close');

    panel.appendChild(heading);
    panel.appendChild(closeBtn);
    panel.appendChild(body);

    await renderAndCheckA11y(panel);
  });

  it('dialog with aria-label (no heading prop) has no axe violations', async () => {
    const panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Navigation flyout');

    const body = document.createElement('p');
    body.textContent = 'Flyout navigation content.';

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Close');

    panel.appendChild(closeBtn);
    panel.appendChild(body);

    await renderAndCheckA11y(panel);
  });

  it('close button with aria-label has no axe violations', async () => {
    const panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'flyout-heading-close');

    const heading = document.createElement('h2');
    heading.id = 'flyout-heading-close';
    heading.textContent = 'Settings panel';

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Close');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    closeBtn.appendChild(svg);

    panel.appendChild(heading);
    panel.appendChild(closeBtn);

    await renderAndCheckA11y(panel);
  });

  it('flyout with footer slot content has no axe violations', async () => {
    const panel = document.createElement('div');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'flyout-heading-footer');

    const heading = document.createElement('h2');
    heading.id = 'flyout-heading-footer';
    heading.textContent = 'Actions';

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Close');

    const body = document.createElement('p');
    body.textContent = 'Flyout body content.';

    const footer = document.createElement('div');
    const footerBtn = document.createElement('button');
    footerBtn.setAttribute('type', 'button');
    footerBtn.textContent = 'Confirm';
    footer.appendChild(footerBtn);

    panel.appendChild(heading);
    panel.appendChild(closeBtn);
    panel.appendChild(body);
    panel.appendChild(footer);

    await renderAndCheckA11y(panel);
  });
});
