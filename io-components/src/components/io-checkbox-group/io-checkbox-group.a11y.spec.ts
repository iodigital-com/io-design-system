import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-checkbox-group
 *
 * Tests the native HTML patterns rendered inside io-checkbox-group's Shadow DOM
 * (fieldset + legend + io-checkbox slots).
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-checkbox-group — a11y (ARIA patterns)', () => {
  it('fieldset + legend + checkbox inputs has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Preferred notifications</legend>
        <div>
          <input type="checkbox" id="cbg-1" name="notifications" value="email" />
          <label for="cbg-1">Email</label>
        </div>
        <div>
          <input type="checkbox" id="cbg-2" name="notifications" value="sms" />
          <label for="cbg-2">SMS</label>
        </div>
        <div>
          <input type="checkbox" id="cbg-3" name="notifications" value="push" />
          <label for="cbg-3">Push</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('fieldset with helper text has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Topics of interest</legend>
        <span>Select all that apply.</span>
        <div>
          <input type="checkbox" id="cbg-4" name="topics" value="tech" />
          <label for="cbg-4">Technology</label>
        </div>
        <div>
          <input type="checkbox" id="cbg-5" name="topics" value="design" />
          <label for="cbg-5">Design</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('disabled fieldset has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset disabled>
        <legend>Features</legend>
        <div>
          <input type="checkbox" id="cbg-6" name="features" value="a" disabled />
          <label for="cbg-6">Feature A</label>
        </div>
        <div>
          <input type="checkbox" id="cbg-7" name="features" value="b" disabled />
          <label for="cbg-7">Feature B</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('pre-checked checkboxes in group has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Permissions</legend>
        <div>
          <input type="checkbox" id="cbg-8" name="perms" value="read" checked />
          <label for="cbg-8">Read</label>
        </div>
        <div>
          <input type="checkbox" id="cbg-9" name="perms" value="write" />
          <label for="cbg-9">Write</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });
});
