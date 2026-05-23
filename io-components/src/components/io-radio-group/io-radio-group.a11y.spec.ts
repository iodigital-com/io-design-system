import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-radio-group
 *
 * Tests the native HTML patterns rendered inside io-radio-group's Shadow DOM
 * (fieldset + legend + io-radio slots).
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-radio-group — a11y (ARIA patterns)', () => {
  it('fieldset + legend + radio inputs has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Preferred contact method</legend>
        <div>
          <input type="radio" id="rg-1" name="contact" value="email" />
          <label for="rg-1">Email</label>
        </div>
        <div>
          <input type="radio" id="rg-2" name="contact" value="phone" />
          <label for="rg-2">Phone</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('fieldset with helper text has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Subscription tier</legend>
        <span>Choose the plan that suits your needs.</span>
        <div>
          <input type="radio" id="rg-3" name="tier" value="free" />
          <label for="rg-3">Free</label>
        </div>
        <div>
          <input type="radio" id="rg-4" name="tier" value="pro" />
          <label for="rg-4">Pro</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('disabled fieldset has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset disabled>
        <legend>Shipping method</legend>
        <div>
          <input type="radio" id="rg-5" name="ship" value="standard" disabled />
          <label for="rg-5">Standard</label>
        </div>
        <div>
          <input type="radio" id="rg-6" name="ship" value="express" disabled />
          <label for="rg-6">Express</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });
});
