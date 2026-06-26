import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoPopover } from './io-popover';

// ── Helper ────────────────────────────────────────────────────────────────────

function makePopover(): IoPopover {
  const component = new IoPopover();
  (component as any).el = document.createElement('io-popover');
  const dismissEmit = vi.fn();
  (component as any).openEvent = { emit: vi.fn() };
  (component as any).dismissEvent = { emit: dismissEmit };
  (component as any).componentWillLoad();

  // Stub panelEl so applyOpenState/applyClosedState won't throw
  const panelEl = document.createElement('div');
  panelEl.setAttribute('aria-hidden', 'true');
  (component as any).panelEl = panelEl;
  (component as any).useNativePopover = false;

  return component;
}

// ── Trigger click ─────────────────────────────────────────────────────────────

describe('io-popover — trigger click toggles open', () => {
  let component: IoPopover;

  beforeEach(() => {
    component = makePopover();
  });

  it('opens when trigger is clicked while closed', () => {
    (component as any).handleTriggerClick();
    expect(component.open).toBe(true);
  });

  it('closes when trigger is clicked while open', () => {
    component.open = true;
    (component as any).handleTriggerClick();
    expect(component.open).toBe(false);
  });

  it('emits dismiss when closed via trigger click', () => {
    component.open = true;
    (component as any).handleTriggerClick();
    expect((component as any).dismissEvent.emit).toHaveBeenCalledTimes(1);
  });

  it('does not emit dismiss when opening via trigger click', () => {
    (component as any).handleTriggerClick();
    expect((component as any).dismissEvent.emit).not.toHaveBeenCalled();
  });
});

// ── Escape key ────────────────────────────────────────────────────────────────

describe('io-popover — Escape key dismissal', () => {
  let component: IoPopover;

  beforeEach(() => {
    component = makePopover();
  });

  it('closes when Escape is pressed while open', () => {
    component.open = true;
    const ev = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    const stopPropagation = vi.spyOn(ev, 'stopPropagation');
    (component as any).handleKeydown(ev);
    expect(component.open).toBe(false);
    expect(stopPropagation).toHaveBeenCalled();
  });

  it('emits dismiss when Escape closes the popover', () => {
    component.open = true;
    const ev = new KeyboardEvent('keydown', { key: 'Escape' });
    (component as any).handleKeydown(ev);
    expect((component as any).dismissEvent.emit).toHaveBeenCalledTimes(1);
  });

  it('does not close when Escape is pressed while already closed', () => {
    component.open = false;
    const ev = new KeyboardEvent('keydown', { key: 'Escape' });
    (component as any).handleKeydown(ev);
    expect(component.open).toBe(false);
    expect((component as any).dismissEvent.emit).not.toHaveBeenCalled();
  });

  it('does not close for non-Escape keys', () => {
    component.open = true;
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    (component as any).handleKeydown(ev);
    expect(component.open).toBe(true);
  });
});

// ── Outside click ─────────────────────────────────────────────────────────────

describe('io-popover — outside click dismissal', () => {
  let component: IoPopover;

  beforeEach(() => {
    component = makePopover();
  });

  it('closes on outside click when closeOnClickOutside is true', () => {
    component.open = true;

    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);

    const ev = { composedPath: () => [outsideEl] } as unknown as MouseEvent;
    (component as any).handleWindowClick(ev);

    expect(component.open).toBe(false);
    document.body.removeChild(outsideEl);
  });

  it('does not close on outside click when closeOnClickOutside is false', () => {
    component.open = true;
    component.closeOnClickOutside = false;

    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);

    const ev = { composedPath: () => [outsideEl] } as unknown as MouseEvent;
    (component as any).handleWindowClick(ev);

    expect(component.open).toBe(true);
    document.body.removeChild(outsideEl);
  });

  it('does not close when clicking inside the host element', () => {
    component.open = true;
    const hostEl = (component as any).el as HTMLElement;

    const innerEl = document.createElement('button');
    hostEl.appendChild(innerEl);

    const ev = { composedPath: () => [innerEl] } as unknown as MouseEvent;
    (component as any).handleWindowClick(ev);

    expect(component.open).toBe(true);
  });

  it('does not close when popover is already closed', () => {
    component.open = false;

    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);

    const ev = { composedPath: () => [outsideEl] } as unknown as MouseEvent;
    (component as any).handleWindowClick(ev);

    expect((component as any).dismissEvent.emit).not.toHaveBeenCalled();
    document.body.removeChild(outsideEl);
  });
});
