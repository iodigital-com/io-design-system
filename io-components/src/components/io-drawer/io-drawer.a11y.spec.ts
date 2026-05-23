import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-drawer — a11y', () => {
  it('dialog with heading has no axe violations', async () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-labelledby', 'drawer-heading');

    const heading = document.createElement('h2');
    heading.id = 'drawer-heading';
    heading.textContent = 'Settings';

    const body = document.createElement('div');
    body.textContent = 'Drawer body content.';

    dialog.appendChild(heading);
    dialog.appendChild(body);

    await renderAndCheckA11y(dialog);
  });

  it('dialog with close button has no axe violations', async () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-labelledby', 'drawer-heading-close');

    const heading = document.createElement('h2');
    heading.id = 'drawer-heading-close';
    heading.textContent = 'Edit profile';

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Close drawer');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    closeBtn.appendChild(svg);

    dialog.appendChild(heading);
    dialog.appendChild(closeBtn);

    await renderAndCheckA11y(dialog);
  });

  it('dialog without heading (aria-label fallback) has no axe violations', async () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-label', 'Navigation drawer');

    const content = document.createElement('p');
    content.textContent = 'Navigation content here.';

    dialog.appendChild(content);

    await renderAndCheckA11y(dialog);
  });
});
