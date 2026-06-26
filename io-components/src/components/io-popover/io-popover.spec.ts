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
