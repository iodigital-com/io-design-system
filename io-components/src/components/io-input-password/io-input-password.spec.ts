import { describe, it, expect } from 'vitest';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputPassword } from './io-input-password';

describe('io-input-password', () => {
  it('renders with required label', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    expect(page.root).toBeDefined();
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).toContain('Password');
  });

  it('renders a password input by default', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('password');
  });

  it('shows toggle button', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    const btn = page.root?.shadowRoot?.querySelector('button.password-toggle');
    expect(btn).toBeDefined();
    expect(btn?.getAttribute('aria-label')).toBe('Show password');
  });

  it('applies disabled attribute', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password" disabled></io-input-password>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('applies error state class', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password" state="error" message="Required"></io-input-password>',
    });
    const wrapper = page.root?.shadowRoot?.querySelector('.input-wrapper');
    expect(wrapper?.classList.contains('input-wrapper--state-error')).toBe(true);
  });

  it('sets autocomplete to current-password by default', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.autocomplete).toBe('current-password');
  });

  it('renders required asterisk when required', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password" required></io-input-password>',
    });
    const asterisk = page.root?.shadowRoot?.querySelector('.input-required');
    expect(asterisk).toBeDefined();
  });

  it('renders size class', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password" size="lg"></io-input-password>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.classList.contains('input-field--lg')).toBe(true);
  });

  it('renders helper text when provided', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password" helper-text="Min 8 characters"></io-input-password>',
    });
    const helper = page.root?.shadowRoot?.querySelector('.input-helper');
    expect(helper?.textContent).toContain('Min 8 characters');
  });
});
