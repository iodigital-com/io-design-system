import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-radio
 *
 * Tests the native HTML patterns rendered inside io-radio's Shadow DOM
 * (fieldset + legend + input[type=radio] + label). Full component-level
 * auditing against the Shadow DOM requires the Stencil render environment.
 */
describe('io-radio — a11y (ARIA patterns)', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('radio group with fieldset/legend has no axe violations', async () => {
    container.innerHTML = `
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
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('checked radio in group has no axe violations', async () => {
    container.innerHTML = `
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
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('radio with aria-describedby error message has no axe violations', async () => {
    container.innerHTML = `
      <fieldset>
        <legend>Plan</legend>
        <div>
          <input type="radio" id="p1" name="plan" value="free" aria-invalid="true" aria-describedby="plan-error" />
          <label for="p1">Free</label>
        </div>
        <p id="plan-error" role="alert">Please select a plan</p>
      </fieldset>
    `;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
