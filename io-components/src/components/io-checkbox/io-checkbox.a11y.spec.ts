import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-checkbox
 *
 * Tests the native HTML patterns rendered inside io-checkbox's Shadow DOM
 * (input[type=checkbox] + label + aria-invalid/describedby). Full component-level
 * auditing against the Shadow DOM requires the Stencil render environment.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-checkbox — a11y (ARIA patterns)', () => {
  it('unchecked checkbox with visible label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" id="cb1" />
        <label for="cb1">Accept terms</label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('checked checkbox with visible label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" id="cb2" checked />
        <label for="cb2">Accept terms</label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('checkbox in error state with aria-describedby has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" id="cb3" aria-invalid="true" aria-describedby="cb3-error" />
        <label for="cb3">Accept terms</label>
        <p id="cb3-error" role="alert">This field is required</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('required checkbox has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" id="cb4" required />
        <label for="cb4">Accept terms <span aria-hidden="true"> *</span></label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('checkbox with helper text linked via aria-describedby has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" id="cb5" aria-describedby="cb5-helper" />
        <label for="cb5">Accept terms</label>
        <p id="cb5-helper">You can unsubscribe at any time.</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('checkbox with visually hidden label (sr-only) has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" id="cb6" />
        <label for="cb6" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0">
          Accept terms
        </label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
