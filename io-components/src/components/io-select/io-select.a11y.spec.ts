import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-select
 *
 * Tests the native HTML patterns rendered inside io-select's Shadow DOM
 * (a labeled <select> in native mode, and a combobox/listbox ARIA pattern
 * in custom mode). Full component-level auditing against the Shadow DOM
 * requires the Stencil render environment and is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-select — a11y (ARIA patterns)', () => {
  it('native select with visible label has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="sel1">Select option</label>
        <select id="sel1">
          <option value="">Choose an option</option>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </select>
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('native select in required state has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="sel2">Country <span aria-hidden="true">*</span></label>
        <select id="sel2" required>
          <option value="">Choose a country</option>
          <option value="nl">Netherlands</option>
          <option value="be">Belgium</option>
        </select>
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('native select in error state with aria-describedby has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="sel3">Select option</label>
        <select id="sel3" aria-invalid="true" aria-describedby="sel3-error">
          <option value="">Choose an option</option>
        </select>
        <p id="sel3-error" role="alert">Please select an option</p>
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('ARIA combobox pattern has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label id="combo-label" for="combo-input">Select option</label>
        <div
          role="combobox"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-labelledby="combo-label"
        >
          <input
            id="combo-input"
            type="text"
            autocomplete="off"
            aria-labelledby="combo-label"
            aria-autocomplete="list"
            aria-controls="combo-listbox"
          />
        </div>
        <ul id="combo-listbox" role="listbox" aria-labelledby="combo-label">
          <li role="option" id="opt-a" aria-selected="false">Option A</li>
          <li role="option" id="opt-b" aria-selected="false">Option B</li>
        </ul>
      </div>
    `;
    await renderAndCheckA11y(container);
  });
});
