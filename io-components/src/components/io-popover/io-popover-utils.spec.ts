import { describe, it, expect } from 'vitest';

import {
  createPopoverLabelId,
  computeFallbackPosition,
  getFirstFocusable,
  getPanelFocusableElements,
} from './io-popover-utils';

// ── createPopoverLabelId ──────────────────────────────────────────────────────

describe('createPopoverLabelId', () => {
  it('prefixes the random value with io-popover-label-', () => {
    expect(createPopoverLabelId('abc123')).toBe('io-popover-label-abc123');
  });

  it('returns different IDs for different random values', () => {
    const a = createPopoverLabelId('111');
    const b = createPopoverLabelId('222');
    expect(a).not.toBe(b);
  });
});

// ── computeFallbackPosition ───────────────────────────────────────────────────

function makeRect(overrides: Partial<DOMRect>): DOMRect {
  return {
    top: 100,
    bottom: 140,
    left: 200,
    right: 300,
    width: 100,
    height: 40,
    x: 200,
    y: 100,
    toJSON: () => ({}),
    ...overrides,
  };
}

describe('computeFallbackPosition', () => {
  it('positions below the trigger for placement=bottom', () => {
    const rect = makeRect({});
    const pos = computeFallbackPosition(rect, 100, 50, 'bottom', 8);
    expect(pos.top).toBe(140 + 8); // bottom + gap
    expect(pos.left).toBe(200 + 50 - 50); // left + width/2 - panelWidth/2 = 200
  });

  it('positions above the trigger for placement=top', () => {
    const rect = makeRect({});
    const pos = computeFallbackPosition(rect, 100, 50, 'top', 8);
    expect(pos.top).toBe(100 - 50 - 8); // top - panelHeight - gap
  });

  it('positions to the right for placement=right', () => {
    const rect = makeRect({});
    const pos = computeFallbackPosition(rect, 100, 50, 'right', 8);
    expect(pos.left).toBe(300 + 8); // right + gap
  });

  it('positions to the left for placement=left', () => {
    const rect = makeRect({});
    const pos = computeFallbackPosition(rect, 100, 50, 'left', 8);
    expect(pos.left).toBe(200 - 100 - 8); // left - panelWidth - gap
  });

  it('auto defaults to bottom (viewport-aware selection not yet implemented)', () => {
    const rect = makeRect({});
    const autoPos = computeFallbackPosition(rect, 100, 50, 'auto', 8);
    const bottomPos = computeFallbackPosition(rect, 100, 50, 'bottom', 8);
    expect(autoPos).toEqual(bottomPos);
  });

  it('uses default gap of 8 when not specified', () => {
    const rect = makeRect({});
    const pos = computeFallbackPosition(rect, 100, 50, 'bottom');
    expect(pos.top).toBe(140 + 8);
  });
});

// ── getFirstFocusable ─────────────────────────────────────────────────────────

describe('getFirstFocusable', () => {
  it('returns the first focusable button', () => {
    const container = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Click me';
    container.appendChild(btn);
    expect(getFirstFocusable(container)).toBe(btn);
  });

  it('returns the first focusable anchor', () => {
    const container = document.createElement('div');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = 'Link';
    container.appendChild(a);
    expect(getFirstFocusable(container)).toBe(a);
  });

  it('returns null when no focusable element exists', () => {
    const container = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = 'Plain text';
    container.appendChild(p);
    expect(getFirstFocusable(container)).toBeNull();
  });

  it('skips disabled buttons', () => {
    const container = document.createElement('div');
    const disabled = document.createElement('button');
    disabled.disabled = true;
    const enabled = document.createElement('button');
    enabled.textContent = 'Enabled';
    container.appendChild(disabled);
    container.appendChild(enabled);
    expect(getFirstFocusable(container)).toBe(enabled);
  });
});

// ── getPanelFocusableElements ─────────────────────────────────────────────────

describe('getPanelFocusableElements', () => {
  it('returns focusable elements in shadow DOM (no slot)', () => {
    const panel = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'Shadow btn';
    panel.appendChild(btn);
    const result = getPanelFocusableElements(panel);
    expect(result).toContain(btn);
  });

  it('includes slotted element itself when it is directly focusable', () => {
    const panel = document.createElement('div');
    const slot = document.createElement('slot') as HTMLSlotElement;
    const slottedBtn = document.createElement('button');
    slottedBtn.textContent = 'Slotted';
    // Mock assignedElements to return the button directly
    (slot as any).assignedElements = () => [slottedBtn];
    panel.appendChild(slot);

    const result = getPanelFocusableElements(panel);
    expect(result).toContain(slottedBtn);
  });

  it('collects focusable children of non-focusable slotted element (el.matches = false branch)', () => {
    const panel = document.createElement('div');
    const slot = document.createElement('slot') as HTMLSlotElement;
    const slottedDiv = document.createElement('div');
    const childBtn = document.createElement('button');
    childBtn.textContent = 'Child';
    slottedDiv.appendChild(childBtn);
    // Mock assignedElements to return the non-focusable div
    (slot as any).assignedElements = () => [slottedDiv];
    panel.appendChild(slot);

    const result = getPanelFocusableElements(panel);
    // slottedDiv is not focusable → not in result; childBtn IS focusable → in result
    expect(result).not.toContain(slottedDiv);
    expect(result).toContain(childBtn);
  });

  it('returns empty array when panel has no slot and no focusable elements', () => {
    const panel = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = 'Plain text';
    panel.appendChild(p);
    expect(getPanelFocusableElements(panel)).toHaveLength(0);
  });
});
