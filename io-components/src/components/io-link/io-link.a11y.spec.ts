import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoLink } from './io-link';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-link — a11y (ARIA patterns)', () => {
  it('link with visible text content has no axe violations', async () => {
    const el = document.createElement('a');
    el.href = '#';
    el.textContent = 'Learn more';
    await renderAndCheckA11y(el);
  });

  it('link with aria-label for external navigation has no axe violations', async () => {
    const el = document.createElement('a');
    el.href = 'https://example.com';
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
    el.setAttribute('aria-label', 'Learn more, opens in new tab');
    el.textContent = 'Learn more';
    await renderAndCheckA11y(el);
  });

  it('disabled link using aria-disabled has no axe violations', async () => {
    const el = document.createElement('a');
    el.setAttribute('aria-disabled', 'true');
    el.setAttribute('tabindex', '0');
    el.textContent = 'Disabled link';
    await renderAndCheckA11y(el);
  });

  it('inline link inside paragraph text has no axe violations', async () => {
    const container = document.createElement('p');
    container.textContent = 'Read our ';
    const link = document.createElement('a');
    link.href = '/privacy';
    link.textContent = 'privacy policy';
    container.appendChild(link);
    container.appendChild(document.createTextNode(' for more details.'));
    await renderAndCheckA11y(container);
  });
});

describe('io-link — component external link aria-label', () => {
  function renderLink(setup: (c: IoLink) => void): Record<string, unknown> {
    const c = new IoLink();
    const el = document.createElement('io-link');
    (c as any).el = el;
    (c as any).click = { emit: vi.fn() };
    setup(c);

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    c.render();

    // Inner anchor is h('a', ...) call
    const anchorCall = hMock.mock.calls.find(([tag]) => tag === 'a');
    return (anchorCall?.[1] ?? {}) as Record<string, unknown>;
  }

  it('external=true applies aria-label with "opens in new tab" suffix', () => {
    const attrs = renderLink((c) => {
      c.href = 'https://example.com';
      c.external = true;
      // Simulate slot textContent
      (c as any).el.textContent = 'Visit site';
    });
    expect(attrs['aria-label']).toBe('Visit site, opens in new tab');
  });

  it('external=false does not apply aria-label', () => {
    const attrs = renderLink((c) => {
      c.href = '/internal';
      c.external = false;
      (c as any).el.textContent = 'Learn more';
    });
    expect(attrs['aria-label']).toBeUndefined();
  });

  it('external=true sets target="_blank" on the anchor', () => {
    const attrs = renderLink((c) => {
      c.href = 'https://example.com';
      c.external = true;
      (c as any).el.textContent = 'Link';
    });
    expect(attrs.target).toBe('_blank');
  });

  it('external=true sets rel="noopener noreferrer" on the anchor', () => {
    const attrs = renderLink((c) => {
      c.href = 'https://example.com';
      c.external = true;
      (c as any).el.textContent = 'Link';
    });
    expect(attrs.rel).toContain('noopener');
  });

  it('disabled external link has aria-disabled and no href', () => {
    const attrs = renderLink((c) => {
      c.href = 'https://example.com';
      c.external = true;
      c.disabled = true;
      (c as any).el.textContent = 'Link';
    });
    expect(attrs['aria-disabled']).toBe('true');
    expect(attrs.href).toBeUndefined();
  });
});
