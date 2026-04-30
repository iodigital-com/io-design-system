import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 10, y: 20 }),
  offset: vi.fn(() => ({ name: 'offset' })),
  flip: vi.fn(() => ({ name: 'flip' })),
  shift: vi.fn(() => ({ name: 'shift' })),
}));


import { __resetTooltipAttributeForTests, initTooltipAttribute } from '../../utils/tooltip-attribute';

describe('io-tooltip — keyboard (Escape + focusin/focusout)', () => {
  let trigger: HTMLElement;

  beforeEach(() => {
    __resetTooltipAttributeForTests();
    initTooltipAttribute();

    trigger = document.createElement('button');
    trigger.setAttribute('io-tooltip', 'Helpful hint');
    document.body.appendChild(trigger);
  });

  afterEach(() => {
    __resetTooltipAttributeForTests();
    trigger.remove();
  });

  it('Escape key hides active tooltip', async () => {
    // Show tooltip via focusin
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
    // Allow async positionTooltip to settle
    await Promise.resolve();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(overlay?.getAttribute('data-visible')).toBeNull();
    expect(overlay?.getAttribute('aria-hidden')).toBe('true');
  });

  it('focusin on trigger shows tooltip overlay', async () => {
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
    await Promise.resolve();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay).toBeTruthy();
    expect(overlay?.textContent).toBe('Helpful hint');
  });

  it('focusout hides tooltip when focus leaves trigger', async () => {
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
    await Promise.resolve();

    trigger.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }));

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.getAttribute('data-visible')).toBeNull();
  });

  it('aria-describedby is set on trigger while tooltip is visible', async () => {
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
    await Promise.resolve();

    expect(trigger.getAttribute('aria-describedby')).toContain('io-tooltip-attribute-overlay');
  });

  it('aria-describedby is cleared after focusout', async () => {
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
    await Promise.resolve();

    trigger.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: document.body }));

    const describedBy = trigger.getAttribute('aria-describedby') ?? '';
    expect(describedBy).not.toContain('io-tooltip-attribute-overlay');
  });
});
