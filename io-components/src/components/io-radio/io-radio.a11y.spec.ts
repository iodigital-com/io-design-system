import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-radio
 *
 * Tests the native HTML patterns rendered inside io-radio's Shadow DOM
 * (fieldset + legend + input[type=radio] + label). Full component-level
 * auditing against the Shadow DOM requires the Stencil render environment.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-radio — a11y (ARIA patterns)', () => {
  it('radio group with fieldset/legend has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Preferred contact</legend>
        <div>
          <input type="radio" id="r1" name="contact" value="email" />
          <label for="r1">Email</label>
        </div>
        <div>
          <input type="radio" id="r2" name="contact" value="phone" />
          <label for="r2">Phone</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('checked radio in group has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Size</legend>
        <div>
          <input type="radio" id="s1" name="size" value="sm" checked />
          <label for="s1">Small</label>
        </div>
        <div>
          <input type="radio" id="s2" name="size" value="lg" />
          <label for="s2">Large</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('radio with aria-describedby error message has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Plan</legend>
        <div>
          <input type="radio" id="p1" name="plan" value="free" aria-invalid="true" aria-describedby="plan-error" />
          <label for="p1">Free</label>
        </div>
        <p id="plan-error" role="alert">Please select a plan</p>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });
});
