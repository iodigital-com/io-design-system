import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 10, y: 20 }),
  offset: vi.fn(() => ({ name: 'offset' })),
  flip: vi.fn(() => ({ name: 'flip' })),
  shift: vi.fn(() => ({ name: 'shift' })),
}));

import { __resetTooltipAttributeForTests, initTooltipAttribute } from './tooltip-attribute';

// eslint-disable-next-line import/order -- must follow local import to reference the vi.mock() hoisted above
import { computePosition } from '@floating-ui/dom';

async function flushAsyncTooltipShow(): Promise<void> {
  // showTooltip now awaits computePosition before marking visible.
  await Promise.resolve();
  await Promise.resolve();
}

describe('tooltip-attribute', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    __resetTooltipAttributeForTests();
    initTooltipAttribute();
  });

  it('creates global tooltip overlay and shows on focus', async () => {
    const button = document.createElement('button');
    button.setAttribute('io-tooltip', 'Hello tooltip');
    document.body.appendChild(button);

    button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await flushAsyncTooltipShow();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay).not.toBeNull();
    expect(overlay?.textContent).toBe('Hello tooltip');
    expect(overlay?.getAttribute('data-visible')).toBe('true');
    expect(button.getAttribute('aria-describedby')).toContain('io-tooltip-attribute-overlay');
  });

  it('hides and clears aria-describedby on focus out', async () => {
    const button = document.createElement('button');
    button.setAttribute('io-tooltip', 'Hello tooltip');
    document.body.appendChild(button);

    button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await flushAsyncTooltipShow();
    button.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.hasAttribute('data-visible')).toBe(false);
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });

  it('shows on pointerover and hides on Escape', async () => {
    const button = document.createElement('button');
    button.setAttribute('io-tooltip', 'Pointer tooltip');
    document.body.appendChild(button);

    button.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    await flushAsyncTooltipShow();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.getAttribute('data-visible')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(overlay?.hasAttribute('data-visible')).toBe(false);
  });

  it('gracefully recovers when computePosition rejects', async () => {
    vi.mocked(computePosition).mockRejectedValueOnce(new Error('position failed'));

    const button = document.createElement('button');
    button.setAttribute('io-tooltip', 'Broken tooltip');
    document.body.appendChild(button);

    button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await flushAsyncTooltipShow();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.hasAttribute('data-visible')).toBe(false);
    expect(button.hasAttribute('aria-describedby')).toBe(false);
  });
});
