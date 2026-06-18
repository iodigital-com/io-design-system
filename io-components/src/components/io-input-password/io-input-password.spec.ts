import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputPassword } from './io-input-password';

describe('io-input-password', () => {
  it('renders with required label', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" />,
    });
    expect(page.root).toBeDefined();
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).toContain('Password');
  });

  it('renders a password input by default', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('password');
  });

  it('shows toggle button', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" />,
    });
    const btn = page.root?.shadowRoot?.querySelector('button.password-toggle');
    expect(btn).toBeDefined();
    expect(btn?.getAttribute('aria-label')).toBe('Show password');
  });

  it('applies disabled attribute', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" disabled />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('applies error state class', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" state="error" message="Required" />,
    });
    const wrapper = page.root?.shadowRoot?.querySelector('.input-wrapper');
    expect(wrapper?.classList.contains('input-wrapper--state-error')).toBe(true);
  });

  it('sets autocomplete to current-password by default', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.autocomplete).toBe('current-password');
  });

  it('renders required asterisk when required', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" required />,
    });
    const asterisk = page.root?.shadowRoot?.querySelector('.input-required');
    expect(asterisk).toBeDefined();
  });

  it('renders size class', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" size="lg" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.classList.contains('input-field--lg')).toBe(true);
  });

  it('renders helper text when provided', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      template: () => <io-input-password label="Password" helperText="Min 8 characters" />,
    });
    const helper = page.root?.shadowRoot?.querySelector('.input-helper');
    expect(helper?.textContent).toContain('Min 8 characters');
  });
});
