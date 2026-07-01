import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-toast (issue #1003)
 *
 * The Host element always carries role="status" aria-live="polite" (stable region).
 * A separate role="alert" aria-live="assertive" region is always mounted inside
 * the Shadow DOM; its text content is populated only for persistent/error toasts.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-toast — a11y (ARIA patterns)', () => {
  it('stable polite status host has no axe violations', async () => {
    const host = document.createElement('div');
    host.setAttribute('role', 'status');
    host.setAttribute('aria-live', 'polite');
    host.setAttribute('aria-atomic', 'true');
    host.textContent = 'Settings saved successfully.';
    await renderAndCheckA11y(host);
  });

  it('assertive alert region (persistent toast) has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = 'Session expired. Please log in again.';
    await renderAndCheckA11y(el);
  });

  it('empty assertive region (no persistent toast) has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    await renderAndCheckA11y(el);
  });

  it('empty status live region (no active toast) has no axe violations', async () => {
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
