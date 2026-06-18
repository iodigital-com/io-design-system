import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputPassword } from './io-input-password';

describe('io-input-password accessibility', () => {
  it('associates label with input via htmlFor/id', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(input?.id).toBeTruthy();
    expect(label?.htmlFor).toBe(input?.id);
  });

  it('sets aria-invalid when state is error', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" state="error" message="Required" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('does not set aria-invalid when state is none', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBeNull();
  });

  it('sets aria-describedby when error message is present', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" state="error" message="Required field" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('toggle button has descriptive aria-label', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" />,
    });
    const btn = page.root?.shadowRoot?.querySelector('button.password-toggle');
    const ariaLabel = btn?.getAttribute('aria-label');
    expect(['Show password', 'Hide password']).toContain(ariaLabel);
  });

  it('error message has role="alert"', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" state="error" message="Invalid password" />,
    });
    const errorEl = page.root?.shadowRoot?.querySelector('.input-message--error');
    expect(errorEl?.getAttribute('role')).toBe('alert');
  });
});
