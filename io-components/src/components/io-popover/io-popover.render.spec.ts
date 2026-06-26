/**
 * io-popover — render() ref callback + rAF callback coverage
 *
 * The panelEl ref at line 298 and the requestAnimationFrame callback at
 * lines 163-168 are never invoked by existing tests. This spec:
 *   1. Calls render() and extracts the ref from h.mock.calls
 *   2. Stubs rAF to invoke the callback synchronously so the inner code runs
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoPopover } from './io-popover';
import { getPanelFocusableElements } from './io-popover-utils';

function makePopover(overrides: Partial<IoPopover> = {}): IoPopover {
  const c = new IoPopover();
  (c as any).el = document.createElement('io-popover');
  (c as any).openEvent = { emit: vi.fn() };
  (c as any).dismissEvent = { emit: vi.fn() };
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

function renderCalls(c: IoPopover) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
}

// ── panelEl ref callback ──────────────────────────────────────────────────────

describe('io-popover render() — panelEl ref callback', () => {
  it('assigns element to panelEl when ref is called with an element', () => {
    const c = makePopover();
    const calls = renderCalls(c);

    // Panel div is identified by role="dialog"
    const panelCall = calls.find(
      ([, attrs]) => (attrs as Record<string, unknown>)?.role === 'dialog',
    );
    expect(panelCall).toBeDefined();

    const refFn = panelCall![1].ref as (el: HTMLDivElement) => void;
    const mockEl = document.createElement('div') as HTMLDivElement;
    refFn(mockEl);
    expect((c as any).panelEl).toBe(mockEl);
  });
});

// ── render branch coverage ────────────────────────────────────────────────────

describe('io-popover render() — branch coverage', () => {
  it('does not throw with default props', () => {
    const c = makePopover();
    expect(() => c.render()).not.toThrow();
  });

  it('renders label span when label is provided', () => {
    const c = makePopover({ label: 'More info' });
    const calls = renderCalls(c);

    const labelSpan = calls.find(
      ([tag, attrs]) => tag === 'span' && String(attrs?.class).includes('popover__label'),
    );
    expect(labelSpan).toBeDefined();
  });

  it('does not render label span when label is absent', () => {
    const c = makePopover();
    const calls = renderCalls(c);

    const labelSpan = calls.find(
      ([tag, attrs]) => tag === 'span' && String(attrs?.class).includes('popover__label'),
    );
    expect(labelSpan).toBeUndefined();
  });

  it('sets aria-labelledby when label is provided', () => {
    const c = makePopover({ label: 'Tooltip' });
    const calls = renderCalls(c);

    const panelCall = calls.find(
      ([, attrs]) => (attrs as Record<string, unknown>)?.role === 'dialog',
    );
    expect(panelCall).toBeDefined();
    expect(panelCall![1]['aria-labelledby']).toBeDefined();
  });

  it('does not set aria-labelledby when label is absent', () => {
    const c = makePopover();
    const calls = renderCalls(c);

    const panelCall = calls.find(
      ([, attrs]) => (attrs as Record<string, unknown>)?.role === 'dialog',
    );
    expect(panelCall).toBeDefined();
    expect(panelCall![1]['aria-labelledby']).toBeUndefined();
  });
});

// ── rAF callback coverage ─────────────────────────────────────────────────────

describe('io-popover applyOpenState() — rAF callback', () => {
  it('runs without error when shadowRoot has no focusable element', () => {
    const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(
      (cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      },
    );

    const c = makePopover();
    const panel = document.createElement('div');
    panel.setAttribute('aria-hidden', 'true');
    (c as any).panelEl = panel;
    (c as any).useNativePopover = false;
    (c as any).applyOpenState();

    rafSpy.mockRestore();
  });

  it('runs without error when el has no shadowRoot', () => {
    const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(
      (cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      },
    );

    const c = makePopover();
    (c as any).el = null;
    const panel = document.createElement('div');
    (c as any).panelEl = panel;
    (c as any).useNativePopover = false;
    expect(() => (c as any).applyOpenState()).not.toThrow();

    rafSpy.mockRestore();
  });

  it('focuses first focusable element in shadowRoot when it is non-null', () => {
    const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(
      (cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      },
    );

    const c = makePopover();

    // Create a mock shadowRoot with a focusable button
    const focusableSpy = vi.fn();
    const mockBtn = document.createElement('button');
    mockBtn.focus = focusableSpy;
    // The slot query must return a mock with assignedElements to avoid TypeError;
    // use null so applyFallbackOpen returns early, then the rAF continues.
    const mockShadowRoot = {
      querySelector: vi.fn((selector: string) => {
        if (selector.includes('slot')) {
          // Return a mock slot with assignedElements returning [] so applyFallbackOpen is a no-op
          return { assignedElements: () => [] } as unknown as Element;
        }
        return mockBtn;
      }),
    };

    const popoverEl = document.createElement('io-popover');
    Object.defineProperty(popoverEl, 'shadowRoot', {
      get: () => mockShadowRoot,
      configurable: true,
    });
    (c as any).el = popoverEl;

    const panel = document.createElement('div');
    panel.setAttribute('aria-hidden', 'true');
    (c as any).panelEl = panel;
    (c as any).useNativePopover = false;

    (c as any).applyOpenState();

    expect(focusableSpy).toHaveBeenCalled();

    rafSpy.mockRestore();
  });
});

// ── getPanelFocusableElements — slotted el.matches branch ─────────────────────

describe('io-popover-utils — getPanelFocusableElements slotted el.matches', () => {
  it('includes a slotted element that itself matches FOCUSABLE_SELECTORS', () => {
    const panel = document.createElement('div');
    const slot = document.createElement('slot') as HTMLSlotElement;

    // Simulate assignedElements returning a focusable button
    const slottedBtn = document.createElement('button');
    slottedBtn.textContent = 'Slotted';
    slot.assignedElements = () => [slottedBtn];

    panel.appendChild(slot);

    const result = getPanelFocusableElements(panel);
    expect(result).toContain(slottedBtn);
  });
});
