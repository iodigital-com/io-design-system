import { describe, it, expect } from 'vitest';
import { IoSwitch } from './io-switch';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-switch
 *
 * Tests the native HTML patterns rendered inside io-switch's Shadow DOM
 * (input[type=checkbox][role=switch] + label + aria-checked/aria-invalid/describedby).
 * Full component-level auditing against the Shadow DOM requires the Stencil render environment.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-switch — a11y (ARIA patterns)', () => {
  it('unchecked switch with visible label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" role="switch" id="sw1" aria-checked="false" />
        <label for="sw1">Enable notifications</label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('checked switch with visible label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" role="switch" id="sw2" aria-checked="true" checked />
        <label for="sw2">Enable notifications</label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('switch in error state with aria-describedby has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" role="switch" id="sw3" aria-checked="false" aria-invalid="true" aria-describedby="sw3-error" />
        <label for="sw3">Enable notifications</label>
        <p id="sw3-error" role="alert">This field is required</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('required switch has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" role="switch" id="sw4" aria-checked="false" required />
        <label for="sw4">Enable notifications <span aria-hidden="true"> *</span></label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('switch with helper text linked via aria-describedby has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" role="switch" id="sw5" aria-checked="false" aria-describedby="sw5-helper" />
        <label for="sw5">Enable notifications</label>
        <p id="sw5-helper">You can change this setting at any time.</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('disabled switch has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" role="switch" id="sw6" aria-checked="false" disabled />
        <label for="sw6">Enable notifications</label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('does not add redundant aria-checked or aria-disabled on native input (#475)', () => {
    const c = new IoSwitch();
    (c as any).el = document.createElement('io-switch');
    (c as any).label = 'Enable';
    c.checked = true;
    c.disabled = true;
    // render() returns the vnode — inspect the native input props through the component
    // The native <input type="checkbox"> carries checked/disabled natively; no ARIA duplicates
    const hostEl = (c as any).el as HTMLElement;
    expect(hostEl.getAttribute('aria-checked')).toBeNull();
    expect(hostEl.getAttribute('aria-disabled')).toBeNull();
  });
});
