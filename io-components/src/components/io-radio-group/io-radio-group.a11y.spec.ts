import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoRadioGroup } from './io-radio-group';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

function renderRadioGroup(setup: (c: IoRadioGroup) => void): {
  fieldsetAttrs: Record<string, unknown>;
  legendAttrs: Record<string, unknown>;
  allCalls: Array<[unknown, unknown]>;
} {
  const c = new IoRadioGroup();
  const el = document.createElement('io-radio-group');
  (c as any).el = el;
  (c as any).change = { emit: vi.fn() };
  setup(c);
  (c as any).componentWillLoad?.();

  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();

  const calls = hMock.mock.calls as Array<[unknown, unknown]>;
  const fieldsetCall = calls.find(([tag]) => tag === 'fieldset');
  const legendCall = calls.find(([tag]) => tag === 'legend');

  return {
    fieldsetAttrs: (fieldsetCall?.[1] ?? {}) as Record<string, unknown>,
    legendAttrs: (legendCall?.[1] ?? {}) as Record<string, unknown>,
    allCalls: calls,
  };
}

describe('io-radio-group — a11y (component ARIA attributes)', () => {
  it('fieldset has role="radiogroup"', () => {
    const { fieldsetAttrs } = renderRadioGroup((c) => {
      c.label = 'Preferred contact';
    });
    expect(fieldsetAttrs.role).toBe('radiogroup');
  });

  it('renders aria-required="true" on fieldset when required=true', () => {
    const { fieldsetAttrs } = renderRadioGroup((c) => {
      c.label = 'Preferred contact';
      c.required = true;
    });
    expect(fieldsetAttrs['aria-required']).toBe('true');
  });

  it('does not render aria-required when required=false', () => {
    const { fieldsetAttrs } = renderRadioGroup((c) => {
      c.label = 'Preferred contact';
      c.required = false;
    });
    expect(fieldsetAttrs['aria-required']).toBeUndefined();
  });

  it('renders aria-invalid="true" on fieldset when error=true', () => {
    const { fieldsetAttrs } = renderRadioGroup((c) => {
      c.label = 'Preferred contact';
      c.error = true;
    });
    expect(fieldsetAttrs['aria-invalid']).toBe('true');
  });

  it('does not render aria-invalid when error=false', () => {
    const { fieldsetAttrs } = renderRadioGroup((c) => {
      c.label = 'Preferred contact';
      c.error = false;
    });
    expect(fieldsetAttrs['aria-invalid']).toBeUndefined();
  });

  it('renders aria-describedby when error message is set', () => {
    const { fieldsetAttrs } = renderRadioGroup((c) => {
      c.label = 'Preferred contact';
      c.error = true;
      c.errorMessage = 'Please select an option';
    });
    expect(fieldsetAttrs['aria-describedby']).toBeDefined();
    expect(String(fieldsetAttrs['aria-describedby']).length).toBeGreaterThan(0);
  });

  it('renders disabled on fieldset when disabled=true', () => {
    const { fieldsetAttrs } = renderRadioGroup((c) => {
      c.label = 'Preferred contact';
      c.disabled = true;
    });
    expect(fieldsetAttrs.disabled).toBe(true);
  });

  it('radio group accessible name HTML structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset>
        <legend>Preferred contact method</legend>
        <div>
          <input type="radio" id="rg-a11y-1" name="contact" value="email" />
          <label for="rg-a11y-1">Email</label>
        </div>
        <div>
          <input type="radio" id="rg-a11y-2" name="contact" value="phone" />
          <label for="rg-a11y-2">Phone</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('required radio group HTML structure has no axe violations', async () => {
    const el = document.createElement('div');
    // role="radiogroup" is required for aria-required to be valid on a fieldset
    el.innerHTML = `
      <fieldset role="radiogroup" aria-required="true" aria-labelledby="rg-req-legend">
        <legend id="rg-req-legend">Notification preference <span aria-hidden="true">*</span></legend>
        <div>
          <input type="radio" id="rg-req-1" name="notif" value="push" />
          <label for="rg-req-1">Push notifications</label>
        </div>
        <div>
          <input type="radio" id="rg-req-2" name="notif" value="email" />
          <label for="rg-req-2">Email</label>
        </div>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });

  it('error state radio group HTML structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <fieldset aria-invalid="true" aria-describedby="rg-err-msg">
        <legend>Shipping method</legend>
        <div>
          <input type="radio" id="rg-err-1" name="ship" value="standard" />
          <label for="rg-err-1">Standard</label>
        </div>
        <p id="rg-err-msg" role="alert">Please select a shipping method</p>
      </fieldset>
    `;
    await renderAndCheckA11y(el);
  });
});
