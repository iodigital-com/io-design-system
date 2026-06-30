import { describe, it, expect, vi } from 'vitest';

import { IoAccordion } from './io-accordion';

describe('io-accordion — defaultExpanded prop', () => {
  function makeComponent(props: Partial<IoAccordion> = {}): IoAccordion {
    const component = new IoAccordion();
    (component as any).update = { emit: vi.fn() };
    (component as any).el = { id: '', dispatchEvent: vi.fn(), parentElement: null };
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

describe('io-accordion — defaultExpanded multi-sibling coordination (issue #1066)', () => {
  /**
   * When multiple siblings have defaultExpanded=true and allowMultiple=false,
   * componentDidLoad closes all but the first in DOM order.
   */
  function makeGroupComponents(count: number, props: Partial<IoAccordion> = {}) {
    const parent = document.createElement('div');
    const components: IoAccordion[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('io-accordion') as HTMLElement;
      el.setAttribute('default-expanded', '');
      el.setAttribute('open', '');
      parent.appendChild(el);

      const component = new IoAccordion();
      (component as any).el = el;
      (component as any).update = { emit: vi.fn() };
      component.defaultExpanded = true;
      component.allowMultiple = props.allowMultiple ?? false;
      component.open = true;
      components.push(component);
    }

    return { parent, components };
  }

  it('leaves only the first sibling open when multiple have defaultExpanded=true and allowMultiple=false', () => {
    const { components } = makeGroupComponents(3);

    // Simulate componentDidLoad on all
    components.forEach((c) => c.componentDidLoad());

    // First should still be open
    expect(components[0].open).toBe(true);
    // Second and third should be closed
    expect(components[1].open).toBe(false);
    expect(components[2].open).toBe(false);
  });

  it('leaves all open when allowMultiple=true', () => {
    const { components } = makeGroupComponents(3, { allowMultiple: true });

    components.forEach((c) => c.componentDidLoad());

    expect(components[0].open).toBe(true);
    expect(components[1].open).toBe(true);
    expect(components[2].open).toBe(true);
  });

  it('does not close a solo defaultExpanded accordion', () => {
    const { components } = makeGroupComponents(1);

    components[0].componentDidLoad();

    expect(components[0].open).toBe(true);
  });

  it('does not affect accordions without defaultExpanded when allowMultiple=false', () => {
    const parent = document.createElement('div');
    const components: IoAccordion[] = [];

    for (let i = 0; i < 2; i++) {
      const el = document.createElement('io-accordion') as HTMLElement;
      // No default-expanded attribute
      parent.appendChild(el);

      const component = new IoAccordion();
      (component as any).el = el;
      (component as any).update = { emit: vi.fn() };
      component.defaultExpanded = false;
      component.allowMultiple = false;
      component.open = false;
      components.push(component);
    }

    components.forEach((c) => c.componentDidLoad());

    expect(components[0].open).toBe(false);
    expect(components[1].open).toBe(false);
  });
});
