import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-toast
 *
 * Tests the native HTML patterns rendered inside io-toast's Shadow DOM.
 * The Host element carries role="status" + aria-live="polite" for transient
 * notifications, or role="alertdialog" + aria-live="assertive" for persistent
 * ones. Full component-level auditing against the Shadow DOM requires the
 * Stencil render environment and is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-toast — a11y (ARIA patterns)', () => {
  it('polite status live region (transient toast) has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = 'Settings saved successfully.';
    await renderAndCheckA11y(el);
  });

  it('assertive alert live region (persistent toast) has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alertdialog');
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    el.setAttribute('aria-labelledby', 'toast-msg');

    const msg = document.createElement('p');
    msg.id = 'toast-msg';
    msg.textContent = 'Session expired. Please log in again.';

    const dismissBtn = document.createElement('button');
    dismissBtn.setAttribute('type', 'button');
    dismissBtn.setAttribute('aria-label', 'Dismiss notification');

    el.appendChild(msg);
    el.appendChild(dismissBtn);

    await renderAndCheckA11y(el);
  });

  it('empty live region (no active toast) has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    await renderAndCheckA11y(el);
  });

  it('toast notification with dismiss button has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');

    const text = document.createElement('span');
    text.textContent = 'File uploaded.';

    const dismissBtn = document.createElement('button');
    dismissBtn.setAttribute('type', 'button');
    dismissBtn.setAttribute('aria-label', 'Dismiss notification');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    dismissBtn.appendChild(svg);

    el.appendChild(text);
    el.appendChild(dismissBtn);

    await renderAndCheckA11y(el);
  });
});
