import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoPopover } from './io-popover';
import { getPopoverStyles } from './io-popover-styles';

// ── Helper ────────────────────────────────────────────────────────────────────

function makePopover(): IoPopover {
  const component = new IoPopover();
  (component as any).el = document.createElement('io-popover');
  (component as any).openEvent = { emit: vi.fn() };
  (component as any).dismissEvent = { emit: vi.fn() };
  (component as any).componentWillLoad();
  return component;
}

// ── Default props ────────────────────────────────────────────────────────────

describe('io-popover — default props', () => {
  let component: IoPopover;

  beforeEach(() => {
    component = makePopover();
  });

  it('is not open by default', () => {
    expect(component.open).toBe(false);
  });

  it('defaults to bottom placement', () => {
    expect(component.placement).toBe('bottom');
  });

  it('closes on outside click by default', () => {
    expect(component.closeOnClickOutside).toBe(true);
  });

  it('has no label by default', () => {
    expect(component.label).toBeUndefined();
  });

  it('generates a stable labelId in componentWillLoad', () => {
    const id = (component as any).labelId as string;
    expect(id).toMatch(/^io-popover-label-/);
  });

  it('arrow prop defaults to true', () => {
    expect(component.arrow).toBe(true);
  });
});

// ── Open / close state ───────────────────────────────────────────────────────

describe('io-popover — open/close state', () => {
  let component: IoPopover;

  beforeEach(() => {
    component = makePopover();
    // Stub panelEl so applyOpenState/applyClosedState won't throw
    const panelEl = document.createElement('div');
    panelEl.setAttribute('aria-hidden', 'true');
    (component as any).panelEl = panelEl;
    (component as any).useNativePopover = false;
  });

  it('sets open to true when opened', () => {
    component.open = true;
    expect(component.open).toBe(true);
  });

  it('sets open to false when closed', () => {
    component.open = true;
    component.open = false;
    expect(component.open).toBe(false);
  });

  it('open watcher removes aria-hidden from panel when opened', () => {
    const panelEl = (component as any).panelEl as HTMLElement;
    (component as any).onOpenChange(true);
    expect(panelEl.getAttribute('aria-hidden')).toBeNull();
  });

  it('open watcher sets aria-hidden on panel when closed', () => {
    const panelEl = (component as any).panelEl as HTMLElement;
    (component as any).onOpenChange(false);
    expect(panelEl.getAttribute('aria-hidden')).toBe('true');
  });
});

// ── Styles ───────────────────────────────────────────────────────────────────

describe('io-popover — styles contract', () => {
  it('styles contain z-index token', () => {
    const styles = getPopoverStyles();
    expect(styles).toContain('--io-z-dropdown');
  });

  it('styles contain shadow token', () => {
    const styles = getPopoverStyles();
    expect(styles).toContain('--io-shadow-md');
  });

  it('styles contain border-radius token', () => {
    const styles = getPopoverStyles();
    expect(styles).toContain('--io-border-radius-md');
  });

  it('styles contain background token', () => {
    const styles = getPopoverStyles();
    expect(styles).toContain('--io-bg-surface');
  });

  it('styles contain padding token', () => {
    const styles = getPopoverStyles();
    expect(styles).toContain('--io-space-4');
  });

  it('styles contain prefers-reduced-motion guard', () => {
    const styles = getPopoverStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('styles contain arrow token --io-popover-arrow-size', () => {
    const styles = getPopoverStyles();
    expect(styles).toContain('--io-popover-arrow-size');
  });

  it('styles contain popover__arrow class', () => {
    const styles = getPopoverStyles();
    expect(styles).toContain('.popover__arrow');
  });
});

// ── Label / ARIA ─────────────────────────────────────────────────────────────

describe('io-popover — label ID generation', () => {
  it('each instance gets a unique labelId', () => {
    const a = makePopover();
    const b = makePopover();
    expect((a as any).labelId).not.toBe((b as any).labelId);
  });
});

// ── description prop ──────────────────────────────────────────────────────────

describe('io-popover — description prop', () => {
  it('has undefined description by default', () => {
    const component = makePopover();
    expect(component.description).toBeUndefined();
  });

  it('accepts a description string', () => {
    const component = makePopover();
    component.description = 'Use this panel to manage your settings.';
    expect(component.description).toBe('Use this panel to manage your settings.');
  });

  it('generates a descriptionId in componentWillLoad', () => {
    const component = makePopover();
    const id = (component as any).descriptionId as string;
    expect(id).toMatch(/^io-popover-desc-/);
  });

  it('renders description <p> when description is set', () => {
    const component = makePopover();
    component.label = 'Actions';
    component.description = 'Use this panel to manage your settings.';

    vi.mocked(h).mockClear();
    component.render();

    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(call => call[0] === 'p' && (call[1] as Record<string, unknown>)?.['class'] === 'popover__description');
    expect(pCalls.length).toBe(1);
  });

  it('does not render description <p> when description is undefined', () => {
    const component = makePopover();
    component.label = 'Actions';
    component.description = undefined;

    vi.mocked(h).mockClear();
    component.render();

    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(call => call[0] === 'p' && (call[1] as Record<string, unknown>)?.['class'] === 'popover__description');
    expect(pCalls.length).toBe(0);
  });

  it('includes descriptionId in aria-describedby on panel div when description is set', () => {
    const component = makePopover();
    component.label = 'Actions';
    component.description = 'Use this panel to manage your settings.';
    const descId = (component as any).descriptionId as string;

    vi.mocked(h).mockClear();
    component.render();

    // The panel div is rendered with spread panelProps — check for 'aria-describedby' in any div call
    const divCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(call => call[0] === 'div');
    const panelCall = divCalls.find(call => String(call[1]?.['aria-describedby'] ?? '').includes(descId));
    expect(panelCall).toBeDefined();
  });
});

// ── open event (#849) ─────────────────────────────────────────────────────────

describe('io-popover — open event (#849)', () => {
  let component: IoPopover;

  beforeEach(() => {
    component = makePopover();
    const panelEl = document.createElement('div');
    panelEl.setAttribute('aria-hidden', 'true');
    (component as any).panelEl = panelEl;
    (component as any).useNativePopover = false;
  });

  it('emits open event when applyOpenState is called (trigger click while closed)', () => {
    const openEmit = (component as any).openEvent.emit as ReturnType<typeof vi.fn>;
    (component as any).applyOpenState();
    expect(openEmit).toHaveBeenCalledTimes(1);
  });

  it('emits open event when open prop is set to true via onOpenChange', () => {
    const openEmit = (component as any).openEvent.emit as ReturnType<typeof vi.fn>;
    (component as any).onOpenChange(true);
    expect(openEmit).toHaveBeenCalledTimes(1);
  });

  it('does not emit open event when panel closes via onOpenChange', () => {
    const openEmit = (component as any).openEvent.emit as ReturnType<typeof vi.fn>;
    (component as any).onOpenChange(false);
    expect(openEmit).not.toHaveBeenCalled();
  });
});

// ── arrow prop (#1000) ────────────────────────────────────────────────────────

describe('io-popover — arrow prop (#1000)', () => {
  it('renders popover__arrow div when arrow=true (default)', () => {
    const component = makePopover();
    component.label = 'Actions';
    // arrow defaults to true

    vi.mocked(h).mockClear();
    component.render();

    const divCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(([tag, attrs]) => tag === 'div' && String(attrs?.class ?? '').includes('popover__arrow'));
    expect(divCalls.length).toBe(1);
  });

  it('does not render popover__arrow div when arrow=false', () => {
    const component = makePopover();
    component.label = 'Actions';
    (component as any).arrow = false;

    vi.mocked(h).mockClear();
    component.render();

    const divCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(([tag, attrs]) => tag === 'div' && String(attrs?.class ?? '').includes('popover__arrow'));
    expect(divCalls.length).toBe(0);
  });

  it('arrow div has aria-hidden="true"', () => {
    const component = makePopover();
    component.label = 'Actions';

    vi.mocked(h).mockClear();
    component.render();

    const arrowCall = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .find(([tag, attrs]) => tag === 'div' && String(attrs?.class ?? '').includes('popover__arrow'));
    expect(arrowCall).toBeDefined();
    expect(arrowCall![1]['aria-hidden']).toBe('true');
  });
});

// ── keyboard modality tracking (#987) ────────────────────────────────────────

describe('io-popover — keyboard modality tracking (#987)', () => {
  it('_openedByKeyboard defaults to false', () => {
    const component = makePopover();
    expect((component as any)._openedByKeyboard).toBe(false);
  });

  it('_handleTriggerPointerDown sets _openedByKeyboard to false', () => {
    const component = makePopover();
    (component as any)._openedByKeyboard = true;
    (component as any)._handleTriggerPointerDown();
    expect((component as any)._openedByKeyboard).toBe(false);
  });

  it('_handleTriggerKeyDown sets _openedByKeyboard to true for Enter', () => {
    const component = makePopover();
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    (component as any)._handleTriggerKeyDown(ev);
    expect((component as any)._openedByKeyboard).toBe(true);
  });

  it('_handleTriggerKeyDown sets _openedByKeyboard to true for Space', () => {
    const component = makePopover();
    const ev = new KeyboardEvent('keydown', { key: ' ' });
    (component as any)._handleTriggerKeyDown(ev);
    expect((component as any)._openedByKeyboard).toBe(true);
  });

  it('_handleTriggerKeyDown does NOT set _openedByKeyboard for Tab', () => {
    const component = makePopover();
    (component as any)._openedByKeyboard = false;
    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    (component as any)._handleTriggerKeyDown(ev);
    expect((component as any)._openedByKeyboard).toBe(false);
  });
});

// ── ARIA mirroring (#979) ─────────────────────────────────────────────────────

describe('io-popover — ARIA mirroring (#979)', () => {
  it('preserves consumer-set aria-haspopup on trigger element', () => {
    const component = new IoPopover();

    const mockTrigger = document.createElement('button');
    mockTrigger.setAttribute('aria-haspopup', 'menu');

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([mockTrigger]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };

    (component as any).el = { shadowRoot: mockShadowRoot };
    (component as any).openEvent = { emit: vi.fn() };
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).panelEl = document.createElement('div');
    (component as any).componentWillLoad();
    (component as any).componentDidLoad();

    // Consumer's 'menu' value should be preserved
    expect(mockTrigger.getAttribute('aria-haspopup')).toBe('menu');
  });

  it('sets default aria-haspopup="dialog" when trigger has no aria-haspopup', () => {
    const component = new IoPopover();

    const mockTrigger = document.createElement('button');
    // No aria-haspopup set

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([mockTrigger]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };

    (component as any).el = { shadowRoot: mockShadowRoot };
    (component as any).openEvent = { emit: vi.fn() };
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).panelEl = document.createElement('div');
    (component as any).componentWillLoad();
    (component as any).componentDidLoad();

    expect(mockTrigger.getAttribute('aria-haspopup')).toBe('dialog');
  });

  it('mirrors aria-controls onto inner shadow DOM button', () => {
    const component = new IoPopover();

    const innerBtn = document.createElement('button');
    const mockTrigger = document.createElement('button');
    Object.defineProperty(mockTrigger, 'shadowRoot', {
      get: () => ({ querySelector: () => innerBtn }),
    });

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([mockTrigger]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };

    (component as any).el = { shadowRoot: mockShadowRoot };
    (component as any).openEvent = { emit: vi.fn() };
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).panelEl = document.createElement('div');
    (component as any).componentWillLoad();

    const panelId = (component as any).panelId as string;
    (component as any).componentDidLoad();

    expect(innerBtn.getAttribute('aria-controls')).toBe(panelId);
  });

  it('mirrors aria-expanded onto inner shadow DOM button', () => {
    const component = new IoPopover();

    const innerBtn = document.createElement('button');
    const mockTrigger = document.createElement('button');
    Object.defineProperty(mockTrigger, 'shadowRoot', {
      get: () => ({ querySelector: () => innerBtn }),
    });

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([mockTrigger]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };

    (component as any).el = { shadowRoot: mockShadowRoot };
    (component as any).openEvent = { emit: vi.fn() };
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).panelEl = document.createElement('div');
    (component as any).componentWillLoad();
    (component as any).componentDidLoad();

    // Should be 'false' (closed by default)
    expect(innerBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('updates inner button aria-expanded on open state change', () => {
    const component = new IoPopover();

    const innerBtn = document.createElement('button');
    const mockTrigger = document.createElement('button');
    Object.defineProperty(mockTrigger, 'shadowRoot', {
      get: () => ({ querySelector: () => innerBtn }),
    });

    const mockSlot = { assignedElements: vi.fn().mockReturnValue([mockTrigger]) };
    const mockShadowRoot = { querySelector: vi.fn().mockReturnValue(mockSlot) };

    (component as any).el = { shadowRoot: mockShadowRoot };
    (component as any).openEvent = { emit: vi.fn() };
    (component as any).dismissEvent = { emit: vi.fn() };
    const panelEl = document.createElement('div');
    panelEl.setAttribute('aria-hidden', 'true');
    (component as any).panelEl = panelEl;
    (component as any).useNativePopover = false;
    (component as any).componentWillLoad();
    (component as any).triggerEl = mockTrigger;

    // Simulate opening
    (component as any).onOpenChange(true);

    expect(innerBtn.getAttribute('aria-expanded')).toBe('true');
  });
});
