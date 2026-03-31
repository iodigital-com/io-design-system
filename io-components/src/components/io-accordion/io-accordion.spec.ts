import { describe, it, expect, vi } from 'vitest';
import { IoAccordion } from './io-accordion';

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
});

describe('io-accordion — toggling', () => {
  let component: IoAccordion;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoAccordion();
    emitSpy = vi.fn();
    (component as any).update = { emit: emitSpy };
    (component as any).el = { forceUpdate: vi.fn() };
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
    (component as any).el = { forceUpdate: vi.fn() };
    expect(() => component.componentWillLoad()).not.toThrow();
  });

  it('creates a stable base id when host id exists', () => {
    const component = new IoAccordion();
    (component as any).el = { id: 'accordion-host' };
    component.componentWillLoad();
    expect((component as any).baseId).toBe('accordion-host');
  });
});
