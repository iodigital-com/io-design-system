import { describe, it, expect, vi } from 'vitest';

import { IoAccordion } from './io-accordion';
import { getAccordionStyles } from './io-accordion-styles';

describe('io-accordion — default props', () => {
  let component: IoAccordion;

  beforeEach(() => {
    component = new IoAccordion();
  });

  it('starts closed by default', () => {
    expect(component.open).toBe(false);
  });

  it('uses h3 heading tag by default', () => {
    expect(component.headingTag).toBe('h3');
  });

  it('uses empty heading fallback by default', () => {
    expect(component.heading).toBe('');
  });

  it('defaults defaultExpanded to false', () => {
    expect(component.defaultExpanded).toBe(false);
  });

  it('defaults allowMultiple to false', () => {
    expect(component.allowMultiple).toBe(false);
  });

  it('defaults size to md', () => {
    expect(component.size).toBe('md');
  });
});

describe('io-accordion — size prop', () => {
  it('accepts size sm', () => {
    const component = new IoAccordion();
    component.size = 'sm';
    expect(component.size).toBe('sm');
  });

  it('accepts size md', () => {
    const component = new IoAccordion();
    component.size = 'md';
    expect(component.size).toBe('md');
  });

  it('accepts size lg', () => {
    const component = new IoAccordion();
    component.size = 'lg';
    expect(component.size).toBe('lg');
  });

  it('size CSS includes sm host selector with compact padding token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([size="sm"])');
    expect(styles).toContain('var(--io-space-3)');
  });

  it('size CSS includes md host selector with default padding token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([size="md"])');
    expect(styles).toContain('var(--io-space-6)');
  });

  it('size CSS includes lg host selector with comfortable padding token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([size="lg"])');
    expect(styles).toContain('var(--io-space-8)');
  });

  it('size CSS uses font-size tokens for each size variant', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('var(--io-font-size-xl)');
  });
});

describe('io-accordion — toggling', () => {
  let component: IoAccordion;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoAccordion();
    emitSpy = vi.fn();
    (component as any).update = { emit: emitSpy };
    (component as any).el = { forceUpdate: vi.fn(), dispatchEvent: vi.fn() };
    component.componentWillLoad();
  });

  it('toggles open state on trigger interaction', () => {
    expect(component.open).toBe(false);
    (component as any).toggleSingle();
    expect(component.open).toBe(true);
    (component as any).toggleSingle();
    expect(component.open).toBe(false);
  });

  it('emits update with open=true when opening', () => {
    (component as any).toggleSingle();
    expect(emitSpy).toHaveBeenCalledWith({ open: true });
  });

  it('emits update with open=false when closing', () => {
    component.open = true;
    (component as any).toggleSingle();
    expect(emitSpy).toHaveBeenCalledWith({ open: false });
  });
});

describe('io-accordion — lifecycle', () => {
  it('does not throw during componentWillLoad', () => {
    const component = new IoAccordion();
    (component as any).update = { emit: vi.fn() };
    (component as any).el = { forceUpdate: vi.fn(), dispatchEvent: vi.fn() };
    expect(() => component.componentWillLoad()).not.toThrow();
  });

  it('creates a stable base id when host id exists', () => {
    const component = new IoAccordion();
    (component as any).el = { id: 'accordion-host', dispatchEvent: vi.fn() };
    component.componentWillLoad();
    expect((component as any).baseId).toBe('accordion-host');
  });

  it('keeps max-height fallback in open panel styles', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('max-height: var(--io-accordion-max-height, 600px);');
  });
});
