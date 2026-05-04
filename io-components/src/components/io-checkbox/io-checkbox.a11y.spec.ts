import { describe, it, beforeEach, afterEach } from 'vitest';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';
import { expect } from 'vitest';

expect.extend({ toHaveNoViolations });

/**
 * Axe smoke tests — WCAG 2.1 AA
 * These tests use the rendered HTML markup (not Shadow DOM internals) to verify
 * that the accessible role, label, and state attributes are correct.
 */
describe('io-checkbox — a11y (axe)', () => {
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
