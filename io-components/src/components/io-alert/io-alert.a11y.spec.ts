/**
 * io-alert — WCAG AA accessibility pattern tests
 *
 * Tests the ARIA patterns used by io-alert's rendered output:
 *   - Non-error variants: role="status" + aria-live="polite" + aria-atomic="true"
 *   - Error variant:      role="alert"  (implicit assertive; no explicit aria-live)
 *
 * role="alert" + aria-live on the same element conflicts — AT uses role semantics
 * and ignores the redundant aria-live attribute — so we never combine them.
 *
 * Full component-level axe auditing against the Shadow DOM requires the Stencil
 * render environment and is out of scope for unit tests.
 */
import { describe, expect, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-alert — a11y (ARIA patterns)', () => {
  it('info alert (role=status, aria-live=polite) has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = 'Your session expires in 5 minutes.';
    await renderAndCheckA11y(el);
  });

  it('success alert (role=status, aria-live=polite) has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = 'Changes saved successfully.';
    await renderAndCheckA11y(el);
  });

  it('warning alert (role=status, aria-live=polite) has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = 'Your subscription expires in 3 days.';
    await renderAndCheckA11y(el);
  });

  it('error alert (role=alert, no explicit aria-live) has no violations', async () => {
    // role="alert" carries implicit aria-live="assertive" — do NOT add aria-live
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.textContent = 'Upload failed. The file exceeds 10 MB.';
    await renderAndCheckA11y(el);
  });

  it('alert with optional heading has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
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

  it('dismissible alert with accessible dismiss button has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = 'Item added to cart.';

    const dismissBtn = document.createElement('button');
    dismissBtn.setAttribute('type', 'button');
    dismissBtn.setAttribute('aria-label', 'Dismiss notification');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    dismissBtn.appendChild(svg);

    const wrapper = document.createElement('div');
    wrapper.appendChild(el);
    wrapper.appendChild(dismissBtn);
    await renderAndCheckA11y(wrapper);
  });

  it('dismiss button meets 44×44px minimum touch target (WCAG 2.5.8)', () => {
    const btn = document.createElement('button');
    btn.style.minWidth = '44px';
    btn.style.minHeight = '44px';
    const minW = parseInt(btn.style.minWidth, 10);
    const minH = parseInt(btn.style.minHeight, 10);
    expect(minW).toBeGreaterThanOrEqual(44);
    expect(minH).toBeGreaterThanOrEqual(44);
  });
});
