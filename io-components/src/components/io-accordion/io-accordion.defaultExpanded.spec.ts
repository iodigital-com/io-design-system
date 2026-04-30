import { describe, it, expect, vi } from 'vitest';

import { IoAccordion } from './io-accordion';

describe('io-accordion — defaultExpanded prop', () => {
  function makeComponent(props: Partial<IoAccordion> = {}): IoAccordion {
    const component = new IoAccordion();
    (component as any).update = { emit: vi.fn() };
    (component as any).el = { id: '', dispatchEvent: vi.fn() };
    Object.assign(component, props);
    return component;
  }

  it('opens the accordion on componentWillLoad when defaultExpanded=true', () => {
    const component = makeComponent({ defaultExpanded: true });
    component.componentWillLoad();
    expect(component.open).toBe(true);
  });

  it('does not open when defaultExpanded=false (default)', () => {
    const component = makeComponent({ defaultExpanded: false });
    component.componentWillLoad();
    expect(component.open).toBe(false);
  });

  it('does not override open=true when defaultExpanded=false', () => {
    const component = makeComponent({ open: true, defaultExpanded: false });
    component.componentWillLoad();
    expect(component.open).toBe(true);
  });

  it('leaves open=true intact when defaultExpanded=true and open already true', () => {
    const component = makeComponent({ open: true, defaultExpanded: true });
    component.componentWillLoad();
    expect(component.open).toBe(true);
  });

  it('does not affect open state after initial render (no componentWillLoad re-run)', () => {
    const component = makeComponent({ defaultExpanded: true });
    component.componentWillLoad();
    expect(component.open).toBe(true);

    // Simulate external close after initial render
    component.open = false;
    expect(component.open).toBe(false);
    // defaultExpanded does not re-open (componentWillLoad doesn't run again)
  });

  it('defaultExpanded does not emit update event during initialisation', () => {
    const component = makeComponent({ defaultExpanded: true });
    component.componentWillLoad();
    expect((component as any).update.emit).not.toHaveBeenCalled();
  });
});
