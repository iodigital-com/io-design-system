import { describe, it, expect, vi } from 'vitest';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputPassword } from './io-input-password';

describe('io-input-password click events', () => {
  it('toggles to text type when toggle button is clicked', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    const btn = page.root?.shadowRoot?.querySelector<HTMLButtonElement>('button.password-toggle');
    expect(btn).toBeDefined();
    btn!.click();
    await page.waitForChanges();
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('text');
    expect(btn?.getAttribute('aria-label')).toBe('Hide password');
  });

  it('toggles back to password type on second click', async () => {
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    const btn = page.root?.shadowRoot?.querySelector<HTMLButtonElement>('button.password-toggle');
    btn!.click();
    await page.waitForChanges();
    btn!.click();
    await page.waitForChanges();
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('password');
    expect(btn?.getAttribute('aria-label')).toBe('Show password');
  });

  it('emits change event on input change', async () => {
    const changeSpy = vi.fn();
    const page = await newSpecPage({
      components: [IoInputPassword],
      html: '<io-input-password label="Password"></io-input-password>',
    });
    page.root?.addEventListener('change', changeSpy);
    const input = page.root?.shadowRoot?.querySelector<HTMLInputElement>('input');
    // Simulate change event
    const changeEvent = new Event('change');
    Object.defineProperty(changeEvent, 'target', { value: { value: 'secret123' } });
    input?.dispatchEvent(changeEvent);
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalled();
  });
});
