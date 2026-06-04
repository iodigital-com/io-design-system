import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-modal
 *
 * Tests the native HTML patterns rendered inside io-modal's Shadow DOM
 * (a native <dialog> element with aria-labelledby, aria-modal="true",
 * and a close button with aria-label). Full component-level auditing
 * against the Shadow DOM requires the Stencil render environment and
 * is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-modal — a11y (ARIA patterns)', () => {
  it('dialog with heading and aria-labelledby has no axe violations', async () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'modal-heading');

    const heading = document.createElement('h2');
    heading.id = 'modal-heading';
    heading.textContent = 'Test dialog';

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Close dialog');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    closeBtn.appendChild(svg);

    const body = document.createElement('div');
    body.textContent = 'Are you sure you want to proceed?';

    dialog.appendChild(heading);
    dialog.appendChild(closeBtn);
    dialog.appendChild(body);

    await renderAndCheckA11y(dialog);
  });

  it('dialog with footer action buttons has no axe violations', async () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'modal-heading-2');

    const heading = document.createElement('h2');
    heading.id = 'modal-heading-2';
    heading.textContent = 'Confirm deletion';

    const body = document.createElement('div');
    body.textContent = 'This action cannot be undone.';

    const footer = document.createElement('div');

    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.textContent = 'Cancel';

    const confirmBtn = document.createElement('button');
    confirmBtn.setAttribute('type', 'button');
    confirmBtn.textContent = 'Delete';

    footer.appendChild(cancelBtn);
    footer.appendChild(confirmBtn);

    dialog.appendChild(heading);
    dialog.appendChild(body);
    dialog.appendChild(footer);

    await renderAndCheckA11y(dialog);
  });

  it('dialog with aria-describedby for description has no axe violations', async () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'modal-heading-3');
    dialog.setAttribute('aria-describedby', 'modal-desc-3');

    const heading = document.createElement('h2');
    heading.id = 'modal-heading-3';
    heading.textContent = 'Account settings';

    const desc = document.createElement('p');
    desc.id = 'modal-desc-3';
    desc.textContent = 'Update your account preferences below.';

    dialog.appendChild(heading);
    dialog.appendChild(desc);

    await renderAndCheckA11y(dialog);
  });
});
