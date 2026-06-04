import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-textarea
 *
 * Tests the native HTML patterns rendered inside io-textarea's Shadow DOM
 * (textarea + label + aria-invalid/describedby, optional hideLabel sr-only
 * pattern). Full component-level auditing against the Shadow DOM requires
 * the Stencil render environment and is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-textarea — a11y (ARIA patterns)', () => {
  it('visible label with textarea has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="ta1">Description</label>
        <textarea id="ta1" rows="4"></textarea>
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('visually hidden label (sr-only) with textarea has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="ta2" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0">
          Message
        </label>
        <textarea id="ta2" placeholder="Enter your message..." rows="4"></textarea>
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('textarea in error state with aria-describedby has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="ta3">Description</label>
        <textarea id="ta3" aria-invalid="true" aria-describedby="ta3-error" rows="4"></textarea>
        <p id="ta3-error" role="alert">This field is required</p>
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('required textarea has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="ta4">Feedback <span aria-hidden="true">*</span></label>
        <textarea id="ta4" required rows="4"></textarea>
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('textarea with helper text has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="ta5">Bio</label>
        <textarea id="ta5" aria-describedby="ta5-helper" rows="4"></textarea>
        <p id="ta5-helper">Maximum 500 characters</p>
      </div>
    `;
    await renderAndCheckA11y(container);
  });
});
