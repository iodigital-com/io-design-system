import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-input
 *
 * Tests the HTML patterns rendered inside io-input's Shadow DOM
 * (input + label + aria-invalid/describedby) including the hideLabel pattern.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-input — a11y (ARIA patterns)', () => {
  it('visible label with input has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="i1">Email address</label>
        <input type="email" id="i1" />
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('visually hidden label (sr-only) with input has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="i2" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0">
          Search
        </label>
        <input type="search" id="i2" placeholder="Search..." />
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('input in error state with aria-describedby has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="i3">Email</label>
        <input type="email" id="i3" aria-invalid="true" aria-describedby="i3-error" />
        <p id="i3-error" role="alert">Enter a valid email address</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('required input has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="i4">Username <span aria-hidden="true"> *</span></label>
        <input type="text" id="i4" required />
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('input with helper text has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="i5">Password</label>
        <input type="password" id="i5" aria-describedby="i5-helper" />
        <p id="i5-helper">At least 8 characters</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
