import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-form-field
 *
 * Tests the native HTML patterns rendered inside io-form-field's Shadow DOM
 * (label + input + helper/error text). Full component-level auditing against
 * the Shadow DOM requires the Stencil render environment.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-form-field — a11y (ARIA patterns)', () => {
  it('label + input with htmlFor/id pairing has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="email">Email address</label>
        <input id="email" type="email" />
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('label + input + helper text has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="name">Full name</label>
        <input id="name" type="text" aria-describedby="name-helper" />
        <span id="name-helper">Enter your legal name as it appears on your ID.</span>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('invalid field with aria-invalid and error text has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="phone">Phone number</label>
        <input id="phone" type="tel" aria-invalid="true" aria-describedby="phone-error" />
        <span id="phone-error" aria-live="polite">Please enter a valid phone number.</span>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('required field with required attribute has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <label for="username">Username <span aria-hidden="true">*</span></label>
        <input id="username" type="text" required />
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
