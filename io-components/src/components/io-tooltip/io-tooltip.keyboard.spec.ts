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

  // AC2: tooltip reappears on subsequent hover/focus after Escape
  it('tooltip reappears on focusin after Escape dismissal', async () => {
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
    await Promise.resolve();
    await Promise.resolve();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.getAttribute('data-visible')).toBeNull();

    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
    await Promise.resolve();
    await Promise.resolve();

    expect(overlay?.getAttribute('data-visible')).toBe('true');
    expect(overlay?.getAttribute('aria-hidden')).toBe('false');
    expect(trigger.getAttribute('aria-describedby')).toContain('io-tooltip-attribute-overlay');
  });

  // AC3: handler is a strict no-op when no tooltip is visible (no overlay created)
  it('Escape when no tooltip is visible creates no overlay', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay).toBeNull();
  });

  // AC3: Escape does not swallow the event — dispatching from a child element
  // lets the tooltip capture listener on document fire first; if stopPropagation
  // were called there, the event would never bubble to the parent handler.
  it('Escape propagates to parent handlers when no tooltip is visible', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const child = document.createElement('span');
    container.appendChild(child);

    const parentHandler = vi.fn();
    container.addEventListener('keydown', parentHandler, false);

    child.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(parentHandler).toHaveBeenCalledTimes(1);

    container.removeEventListener('keydown', parentHandler, false);
    container.remove();
  });

  // Edge case: Escape fired after focusin but before positionTooltip settles (mid-flight)
  // activeTrigger is set and aria-describedby is written before the async boundary;
  // hideTooltip must clean both up, and showTooltip must bail after settling.
  it('Escape mid-flight (after focusin, before positionTooltip settles) leaves tooltip hidden', async () => {
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));
    // activeTrigger is set, aria-describedby is written, but positionTooltip has not settled yet

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    // hideTooltip clears describedBy and sets activeTrigger = null

    await Promise.resolve(); // let positionTooltip continuation run — it bails (activeTrigger !== trigger)
    await Promise.resolve();

    const overlay = document.getElementById('io-tooltip-attribute-overlay');
    expect(overlay?.getAttribute('data-visible')).toBeNull();
    expect(overlay?.getAttribute('aria-hidden')).toBe('true');
    expect(trigger.getAttribute('aria-describedby') ?? '').not.toContain('io-tooltip-attribute-overlay');
  });
});
