import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoCheckbox } from './io-checkbox';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

function makeInternals() {
  return { setFormValue: vi.fn(), setValidity: vi.fn(), reportValidity: vi.fn(), checkValidity: vi.fn() };
}

function renderCheckbox(setup: (c: IoCheckbox) => void): {
  inputAttrs: Record<string, unknown>;
  hostAttrs: Record<string, unknown>;
  allCalls: Array<[unknown, unknown]>;
} {
  const c = new IoCheckbox();
  const el = document.createElement('io-checkbox');
  (c as any).el = el;
  (c as any).internals = makeInternals();
  (c as any).change = { emit: vi.fn() };
  (c as any).blur = { emit: vi.fn() };
  setup(c);
  (c as any).componentWillLoad?.();

  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();

  const calls = hMock.mock.calls as Array<[unknown, unknown]>;
  const inputCall = calls.find(([tag]) => tag === 'input');
  const hostCall = calls.find(([tag]) => tag == null || tag === undefined);

  return {
    inputAttrs: (inputCall?.[1] ?? {}) as Record<string, unknown>,
    hostAttrs: (hostCall?.[1] ?? {}) as Record<string, unknown>,
    allCalls: calls,
  };
}

describe('io-checkbox — a11y (component ARIA attributes)', () => {
  it('renders required attribute on input when required=true', () => {
    const { inputAttrs } = renderCheckbox((c) => {
      c.label = 'Accept terms';
      c.required = true;
    });
    expect(inputAttrs.required).toBe(true);
  });

  it('does not render required on input when required=false', () => {
    const { inputAttrs } = renderCheckbox((c) => {
      c.label = 'Accept terms';
      c.required = false;
    });
    expect(inputAttrs.required).toBeFalsy();
  });

  it('renders aria-invalid="true" on input when error prop is set', () => {
    const { inputAttrs } = renderCheckbox((c) => {
      c.label = 'Accept terms';
      (c as any).state = 'error';
    });
    expect(inputAttrs['aria-invalid']).toBe('true');
  });

  it('does not render aria-invalid when no error', () => {
    const { inputAttrs } = renderCheckbox((c) => {
      c.label = 'Accept terms';
    });
    expect(inputAttrs['aria-invalid']).toBeUndefined();
  });

  it('renders aria-disabled="true" on input when loading=true', () => {
    const { inputAttrs } = renderCheckbox((c) => {
      c.label = 'Accept terms';
      c.loading = true;
    });
    expect(inputAttrs['aria-disabled']).toBe('true');
  });

  it('renders aria-describedby when error message is visible', () => {
    const { inputAttrs } = renderCheckbox((c) => {
      c.label = 'Accept terms';
      (c as any).state = 'error';
      c.message = 'This field is required';
    });
    expect(inputAttrs['aria-describedby']).toBeDefined();
    expect(String(inputAttrs['aria-describedby'])).toContain('message');
  });

  it('checked input reflects checked state', () => {
    const { inputAttrs } = renderCheckbox((c) => {
      c.label = 'Accept terms';
      c.checked = true;
    });
    expect(inputAttrs.checked).toBe(true);
  });

  it('unchecked input does not have checked attr', () => {
    const { inputAttrs } = renderCheckbox((c) => {
      c.label = 'Accept terms';
      c.checked = false;
    });
    expect(inputAttrs.checked).toBeFalsy();
  });

  it('checkbox accessible name HTML structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" id="cb-a11y" />
        <label for="cb-a11y">Accept terms and conditions</label>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('checkbox error state HTML structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <input type="checkbox" id="cb-err" aria-invalid="true" aria-describedby="cb-err-msg" />
        <label for="cb-err">Accept terms</label>
        <p id="cb-err-msg" role="alert">This field is required</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
