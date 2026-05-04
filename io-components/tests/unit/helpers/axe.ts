/**
 * axe-core accessibility test helper
 * ===================================
 * Provides a lightweight wrapper around vitest-axe for use in all
 * io-component a11y spec files.
 *
 * Usage:
 *   import { renderAndCheckA11y } from '../../tests/unit/helpers/axe';
 *
 *   it('has no accessibility violations', async () => {
 *     const el = document.createElement('io-button');
 *     el.textContent = 'Click me';
 *     await renderAndCheckA11y(el);
 *   });
 */
import { axe } from 'vitest-axe';
import { expect } from 'vitest';

/**
 * Mounts `element` in a detached container, runs axe against it, and
 * asserts there are no accessibility violations.
 *
 * @param element   - The HTMLElement to audit. The caller is responsible
 *                    for setting attributes/textContent before calling.
 * @param axeOptions - Optional axe RunOptions (e.g. to restrict rules).
 */
export async function renderAndCheckA11y(
  element: HTMLElement,
  axeOptions?: Parameters<typeof axe>[1],
): Promise<void> {
  const container = document.createElement('div');
  container.appendChild(element);
  document.body.appendChild(container);

  try {
    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  } finally {
    document.body.removeChild(container);
  }
}
