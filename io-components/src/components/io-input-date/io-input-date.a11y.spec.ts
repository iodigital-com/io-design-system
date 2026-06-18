import { describe, it, expect } from 'vitest';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputDate } from './io-input-date';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-input-date accessibility', () => {
  it('visible label associated with date input has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="date1">Birth date</label>
        <input id="date1" type="date" />
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('associates label with input via htmlFor/id', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date"></io-input-date>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(input?.id).toBeTruthy();
    expect(label?.htmlFor).toBe(input?.id);
  });

  it('sets aria-invalid when state is error', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" state="error" message="Invalid date"></io-input-date>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('does not set aria-invalid when state is none', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date"></io-input-date>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBeNull();
  });

  it('calendar icon is aria-hidden', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date"></io-input-date>',
    });
    const icon = page.root?.shadowRoot?.querySelector('.date-suffix');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets aria-describedby when error message is present', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" state="error" message="Date is required"></io-input-date>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('error message has role="alert"', async () => {
    const page = await newSpecPage({
      components: [IoInputDate],
      html: '<io-input-date label="Birth date" state="error" message="Invalid date"></io-input-date>',
    });
    const errorEl = page.root?.shadowRoot?.querySelector('.input-message--error');
    expect(errorEl?.getAttribute('role')).toBe('alert');
  });
});
