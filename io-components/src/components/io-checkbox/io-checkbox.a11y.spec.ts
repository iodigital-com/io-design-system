import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-checkbox
 *
 * Tests the native HTML patterns rendered inside io-checkbox's Shadow DOM
 * (input[type=checkbox] + label + aria-invalid/describedby). Full component-level
 * auditing against the Shadow DOM requires the Stencil render environment.
 */
describe('io-checkbox — a11y (ARIA patterns)', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('unchecked checkbox with visible label has no axe violations', async () => {
    container.innerHTML = `
      <div>
        <input type="checkbox" id="cb1" />
        <label for="cb1">Accept terms</label>
      </div>
    `;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('checked checkbox with visible label has no axe violations', async () => {
    container.innerHTML = `
      <div>
        <input type="checkbox" id="cb2" checked />
        <label for="cb2">Accept terms</label>
      </div>
    `;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('checkbox in error state with aria-describedby has no axe violations', async () => {
    container.innerHTML = `
      <div>
        <input type="checkbox" id="cb3" aria-invalid="true" aria-describedby="cb3-error" />
        <label for="cb3">Accept terms</label>
        <p id="cb3-error" role="alert">This field is required</p>
      </div>
    `;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('required checkbox has no axe violations', async () => {
    container.innerHTML = `
      <div>
        <input type="checkbox" id="cb4" required />
        <label for="cb4">Accept terms <span aria-hidden="true"> *</span></label>
      </div>
    `;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
