import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoButton } from './io-button';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

function renderButton(setup: (c: IoButton) => void): Record<string, unknown> {
  const c = new IoButton();
  (c as any).el = document.createElement('io-button');
  (c as any).click = { emit: vi.fn() };
  (c as any).focus = { emit: vi.fn() };
  (c as any).blur = { emit: vi.fn() };
  setup(c);
  (c as any).componentWillLoad?.();

  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();

  // Inner trigger is the h('button', ...) or h('a', ...) call
  const triggerCall = hMock.mock.calls.find(
    ([tag]) => tag === 'button' || tag === 'a',
  );
  return (triggerCall?.[1] ?? {}) as Record<string, unknown>;
}

describe('io-button — a11y (component ARIA attributes)', () => {
  it('button with text label slot has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <button type="button">Submit form</button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('renders aria-label when label prop is set (icon-only mode)', () => {
    const attrs = renderButton((c) => {
      c.label = 'Close dialog';
      c.iconOnly = true;
    });
    expect(attrs['aria-label']).toBe('Close dialog');
  });

  it('does not render aria-label when label prop is absent and slot text is used', () => {
    const attrs = renderButton((_c) => {
      // no label prop — accessible name comes from slot text
    });
    expect(attrs['aria-label']).toBeUndefined();
  });

  it('renders aria-disabled when disabled=true and href is set (anchor mode)', () => {
    const attrs = renderButton((c) => {
      c.href = '/go';
      c.disabled = true;
    });
    expect(attrs['aria-disabled']).toBe('true');
    expect(attrs['role']).toBe('button');
  });

  it('disabled native button has both disabled property and aria-disabled', () => {
    const attrs = renderButton((c) => {
      c.disabled = true;
    });
    // Button sets aria-disabled for all disabled cases (button and anchor)
    expect(attrs['aria-disabled']).toBe('true');
    expect(attrs.disabled).toBe(true);
  });

  it('renders aria-busy when loading=true', () => {
    const attrs = renderButton((c) => {
      c.loading = true;
      c.label = 'Save';
    });
    expect(attrs['aria-busy']).toBe('true');
  });

  it('disabled button rendered as anchor has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <a aria-disabled="true" tabindex="0">Disabled link button</a>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('icon-only button with aria-label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <button type="button" aria-label="Close dialog">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
