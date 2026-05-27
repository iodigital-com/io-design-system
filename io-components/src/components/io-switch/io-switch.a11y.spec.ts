import { describe, it, expect, vi } from 'vitest';
import { IoSwitch } from './io-switch';
import { h } from '@stencil/core';

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

  it('render() does not emit aria-checked or aria-disabled on the input — role=switch carries semantics (#475)', () => {
    const c = new IoSwitch();
    (c as any).el = document.createElement('io-switch');
    (c as any).internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
      reportValidity: vi.fn(),
      checkValidity: vi.fn(),
    };
    c.label = 'Enable notifications';
    c.checked = true;
    c.disabled = false;
    (c as any).componentWillLoad();

    // h is mocked (vi.fn()) in this test env — capture its call args to find the input call
    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    c.render();

    // Find the h('input', attrs) call — discriminate on type to survive future render changes
    const inputCall = hMock.mock.calls.find(
      ([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.type === 'checkbox',
    );
    expect(inputCall).toBeDefined();
    const attrs = inputCall![1] as Record<string, unknown>;

    // input carries role="switch" (native semantics handle aria-checked)
    expect(attrs.role).toBe('switch');
    // aria-checked and aria-disabled must NOT be on the input (#475)
    expect(attrs['aria-checked']).toBeUndefined();
    expect(attrs['aria-disabled']).toBeUndefined();
    // native checked prop is used instead
    expect(attrs.checked).toBe(true);
  });
});
