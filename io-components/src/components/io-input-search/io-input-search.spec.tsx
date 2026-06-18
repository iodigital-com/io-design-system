import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { IoInputSearch } from './io-input-search';

describe('io-input-search', () => {
  it('renders with required label', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" />,
    });
    expect(page.root).toBeDefined();
    const label = page.root?.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).toContain('Search');
  });

  it('renders a search input', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('search');
  });

  it('renders search prefix icon', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" />,
    });
    const prefix = page.root?.shadowRoot?.querySelector('.search-prefix');
    expect(prefix).toBeDefined();
  });

  it('hides clear button when value is empty', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" value="" />,
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.search-clear');
    expect(clearBtn?.classList.contains('search-clear--hidden')).toBe(true);
  });

  it('shows clear button when value is non-empty', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" value="hello" />,
    });
    const clearBtn = page.root?.shadowRoot?.querySelector('.search-clear');
    expect(clearBtn?.classList.contains('search-clear--hidden')).toBe(false);
  });

  it('applies disabled attribute', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" disabled />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('sets autocomplete to off by default', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.autocomplete).toBe('off');
  });

  it('applies error state class', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" state="error" message="Required" />,
    });
    const wrapper = page.root?.shadowRoot?.querySelector('.input-wrapper');
    expect(wrapper?.classList.contains('input-wrapper--state-error')).toBe(true);
  });

  it('renders size class', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" size="sm" />,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.classList.contains('input-field--sm')).toBe(true);
  });

  it('renders helper text when provided', async () => {
    const page = await newSpecPage({
      components: [IoInputSearch],
      template: () => <io-input-search label="Search" helperText="Enter at least 2 chars" />,
    });
    const helper = page.root?.shadowRoot?.querySelector('.input-helper');
    expect(helper?.textContent).toContain('Enter at least 2 chars');
  });
});
