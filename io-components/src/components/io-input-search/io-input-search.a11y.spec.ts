import { describe, it, expect } from 'vitest';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputSearch } from './io-input-search';

describe('io-input-search accessibility', () => {
  it('associates label with input via htmlFor/id', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      html: '<io-input-search label="Search"></io-input-search>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(input?.id).toBeTruthy();
    expect(label?.htmlFor).toBe(input?.id);
  });

  it('sets aria-invalid when state is error', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      html: '<io-input-search label="Search" state="error" message="No results"></io-input-search>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('does not set aria-invalid when state is none', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      html: '<io-input-search label="Search"></io-input-search>',
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBeNull();
  });

  it('clear button has clearAriaLabel', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      html: '<io-input-search label="Search" value="hello" clear-aria-label="Clear search field"></io-input-search>',
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.search-clear');
    expect(clearBtn?.getAttribute('aria-label')).toBe('Clear search field');
  });

  it('clear button uses default clearAriaLabel', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      html: '<io-input-search label="Search" value="hello"></io-input-search>',
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.search-clear');
    expect(clearBtn?.getAttribute('aria-label')).toBe('Clear search');
  });

  it('prefix search icon is aria-hidden', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      html: '<io-input-search label="Search"></io-input-search>',
    });
    const prefix = page.root?.shadowRoot?.querySelector('.search-prefix');
    expect(prefix?.getAttribute('aria-hidden')).toBe('true');
  });

  it('error message has role="alert"', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      html: '<io-input-search label="Search" state="error" message="Search error"></io-input-search>',
    });
    const errorEl = page.root?.shadowRoot?.querySelector('.input-message--error');
    expect(errorEl?.getAttribute('role')).toBe('alert');
  });
});
