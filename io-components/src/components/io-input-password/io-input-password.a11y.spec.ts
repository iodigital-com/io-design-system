import { describe, it, expect } from 'vitest';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputPassword } from './io-input-password';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-input-password accessibility', () => {
  it('visible label associated with password input has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="pw1">Password</label>
        <input id="pw1" type="password" />
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  it('associates label with input via htmlFor/id', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(input?.id).toBeTruthy();
    expect(label?.htmlFor).toBe(input?.id);
  });

  it('sets aria-invalid when state is error', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password" state="error" message="Required"></io-input-password>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('does not set aria-invalid when state is none', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBeNull();
  });

  it('sets aria-describedby when error message is present', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password" state="error" message="Required field"></io-input-password>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('toggle button has descriptive aria-label', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    const btn = page.root?.shadowRoot?.querySelector('button.password-toggle');
    const ariaLabel = btn?.getAttribute('aria-label');
    expect(['Show password', 'Hide password']).toContain(ariaLabel);
  });

  it('error message has role="alert"', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password" state="error" message="Invalid password"></io-input-password>',
    });
    const errorEl = page.root?.shadowRoot?.querySelector('.input-message--error');
    expect(errorEl?.getAttribute('role')).toBe('alert');
  });
});
