import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoToastItem } from './io-toast-item';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

function renderToastItem(setup: (c: IoToastItem) => void): {
  closeButtonAttrs: Record<string, unknown>;
  allCalls: Array<[unknown, unknown]>;
} {
  const c = new IoToastItem();
  (c as any).el = document.createElement('io-toast-item');
  (c as any).dismiss = { emit: vi.fn() };
  (c as any).action = { emit: vi.fn() };
  setup(c);

  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();

  const calls = hMock.mock.calls as Array<[unknown, unknown]>;
  const closeButtonCall = calls.find(
    ([tag, attrs]) =>
      tag === 'button' &&
      (attrs as Record<string, unknown>)?.['aria-label'] === 'Dismiss notification',
  );

  return {
    closeButtonAttrs: (closeButtonCall?.[1] ?? {}) as Record<string, unknown>,
    allCalls: calls,
  };
}

describe('io-toast-item — a11y', () => {
  it('close button renders aria-label="Dismiss notification"', () => {
    const { closeButtonAttrs } = renderToastItem((c) => {
      c.text = 'File saved successfully';
    });
    expect(closeButtonAttrs['aria-label']).toBe('Dismiss notification');
  });

  it('close button is type="button"', () => {
    const { closeButtonAttrs } = renderToastItem((c) => {
      c.text = 'Changes saved';
    });
    expect(closeButtonAttrs.type).toBe('button');
  });

  it('close button is always rendered', () => {
    const { closeButtonAttrs } = renderToastItem((c) => {
      c.text = 'Upload complete';
      c.variant = 'success';
    });
    expect(closeButtonAttrs['aria-label']).toBeDefined();
  });

  it('action rendered as button when actions has item without href', () => {
    const { allCalls } = renderToastItem((c) => {
      c.text = 'File uploaded';
      c.actions = [{ label: 'View file' }];
    });
    const actionButtonCall = allCalls.find(
      ([tag, attrs]) =>
        tag === 'button' &&
        !(attrs as Record<string, unknown>)?.['aria-label'],
    );
    expect(actionButtonCall).toBeDefined();
  });

  it('action rendered as anchor when actions has item with href', () => {
    const { allCalls } = renderToastItem((c) => {
      c.text = 'File uploaded';
      c.actions = [{ label: 'View file', href: '/files/123' }];
    });
    const anchorCall = allCalls.find(([tag]) => tag === 'a');
    expect(anchorCall).toBeDefined();
    const anchorAttrs = (anchorCall?.[1] ?? {}) as Record<string, unknown>;
    expect(anchorAttrs.href).toBe('/files/123');
  });

  it('toast item ARIA structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="status" aria-live="polite" aria-atomic="true">
        <div>
          <span aria-hidden="true">✓</span>
          <span>File saved successfully</span>
          <button type="button" aria-label="Dismiss notification">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('toast item with action button has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="status" aria-live="polite" aria-atomic="true">
        <div>
          <span aria-hidden="true">ℹ</span>
          <span>Your export is ready</span>
          <button type="button">Download</button>
          <button type="button" aria-label="Dismiss notification">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('error variant toast item ARIA structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="alert">
        <div>
          <span aria-hidden="true">⚠</span>
          <span>Upload failed — please try again</span>
          <button type="button" aria-label="Dismiss notification">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
