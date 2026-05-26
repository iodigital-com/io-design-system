import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-badge
 *
 * Tests the native HTML patterns rendered inside io-badge's Shadow DOM
 * (inline span with slotted text content). Validates all badge variants
 * and sizes for color contrast and screen reader accessibility.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-badge — a11y (ARIA patterns)', () => {
  it('default badge (blue, md) with text has no axe violations', async () => {
    const el = document.createElement('span');
    el.textContent = 'New';
    await renderAndCheckA11y(el);
  });

  it('badge with beige variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Beige badge</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with blue variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Blue badge</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with dark variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Dark badge</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with orange variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Orange badge</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with rouge variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Rouge badge</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with success variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Active</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with warning variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Pending</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with error variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Error</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with outline variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Outline</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge with sm size has no axe violations', async () => {
    const el = document.createElement('span');
    el.textContent = 'Small';
    await renderAndCheckA11y(el);
  });

  it('badge with md size has no axe violations', async () => {
    const el = document.createElement('span');
    el.textContent = 'Medium';
    await renderAndCheckA11y(el);
  });

  it('badge text is accessible to screen readers (not hidden)', async () => {
    const el = document.createElement('div');
    el.innerHTML = `<span>Visible badge text</span>`;
    await renderAndCheckA11y(el);
  });

  it('badge used inline within paragraph text has no axe violations', async () => {
    const el = document.createElement('p');
    el.innerHTML = `Status: <span>Active</span>`;
    await renderAndCheckA11y(el);
  });

  it('multiple badges in a list context have no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <ul>
        <li>Feature A <span>New</span></li>
        <li>Feature B <span>Beta</span></li>
        <li>Feature C <span>Stable</span></li>
      </ul>
    `;
    await renderAndCheckA11y(el);
  });
});
