import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-spinner
 *
 * Tests the native HTML patterns rendered by io-spinner's Shadow DOM
 * (a Host element with role="status" and aria-label providing the
 * accessible name, and an inner decorative span with aria-hidden="true").
 * Full component-level auditing against the Shadow DOM requires the
 * Stencil render environment and is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-spinner — a11y (ARIA patterns)', () => {
  it('status region with aria-label has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-label', 'Loading');

    const inner = document.createElement('span');
    inner.setAttribute('aria-hidden', 'true');
    el.appendChild(inner);

    await renderAndCheckA11y(el);
  });

  it('status region with custom accessible label has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-label', 'Saving your changes');

    const inner = document.createElement('span');
    inner.setAttribute('aria-hidden', 'true');
    el.appendChild(inner);

    await renderAndCheckA11y(el);
  });

  it('status region inside a button loading state has no axe violations', async () => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-disabled', 'true');

    const spinner = document.createElement('span');
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-label', 'Loading');

    const ring = document.createElement('span');
    ring.setAttribute('aria-hidden', 'true');
    spinner.appendChild(ring);

    const label = document.createElement('span');
    label.setAttribute('aria-hidden', 'true');
    label.textContent = 'Submit';

    btn.appendChild(spinner);
    btn.appendChild(label);

    await renderAndCheckA11y(btn);
  });
});
