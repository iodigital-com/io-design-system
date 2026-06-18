import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputSearch } from './io-input-search';

describe('io-input-search accessibility', () => {
  it('associates label with input via htmlFor/id', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(input?.id).toBeTruthy();
    expect(label?.htmlFor).toBe(input?.id);
  });

  it('sets aria-invalid when state is error', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" state="error" message="No results" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('does not set aria-invalid when state is none', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBeNull();
  });

  it('clear button has clearAriaLabel', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" value="hello" clearAriaLabel="Clear search field" />,
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.search-clear');
    expect(clearBtn?.getAttribute('aria-label')).toBe('Clear search field');
  });

  it('clear button uses default clearAriaLabel', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" value="hello" />,
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.search-clear');
    expect(clearBtn?.getAttribute('aria-label')).toBe('Clear search');
  });

  it('prefix search icon is aria-hidden', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" />,
    });
    const prefix = page.root?.shadowRoot?.querySelector('.search-prefix');
    expect(prefix?.getAttribute('aria-hidden')).toBe('true');
  });

  it('error message has role="alert"', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" state="error" message="Search error" />,
    });
    const errorEl = page.root?.shadowRoot?.querySelector('.input-message--error');
    expect(errorEl?.getAttribute('role')).toBe('alert');
  });
});
