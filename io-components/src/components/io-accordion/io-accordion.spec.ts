import { describe, it, expect, vi } from 'vitest';
import { IoAccordion } from './io-accordion';

const ITEMS = [
  { title: 'Item A', body: 'Body A', open: true },
  { title: 'Item B', body: 'Body B' },
  { title: 'Item C', body: 'Body C' },
];

describe('io-accordion — default props', () => {
  let component: IoAccordion;

  beforeEach(() => {
    component = new IoAccordion();
    (component as any).accordionChange = { emit: vi.fn() };
  });

  it('has empty items array by default', () => {
    expect(component.items).toHaveLength(0);
  });

  it('does not allow multiple open panels by default', () => {
    expect(component.allowMultiple).toBe(false);
  });

  it('starts closed in single-item mode', () => {
    expect(component.open).toBe(false);
  });

  it('uses h3 heading tag by default in single-item mode', () => {
    expect(component.headingTag).toBe('h3');
  });
});

describe('io-accordion — open states', () => {
  let component: IoAccordion;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoAccordion();
    emitSpy = vi.fn();
    (component as any).accordionChange = { emit: emitSpy };
    component.items = ITEMS;
    (component as any).el = { forceUpdate: vi.fn() };
    component.componentWillLoad();
  });

  it('initialises open states from item.open flags', () => {
    expect((component as any).openStates[0]).toBe(true);
    expect((component as any).openStates[1]).toBe(false);
    expect((component as any).openStates[2]).toBe(false);
  });

  it('closes other panels when allowMultiple is false', () => {
    (component as any).toggle(1);
    expect((component as any).openStates[0]).toBe(false);
    expect((component as any).openStates[1]).toBe(true);
  });

  it('emits accordionChange with correct payload on open', () => {
    (component as any).toggle(1);
    expect(emitSpy).toHaveBeenCalledWith({ index: 1, open: true });
  });

  it('emits accordionChange with open=false when closing', () => {
    (component as any).toggle(0); // item 0 is open, so toggle closes it
    expect(emitSpy).toHaveBeenCalledWith({ index: 0, open: false });
  });

  it('allows multiple panels open when allowMultiple is true', () => {
    component.allowMultiple = true;
    (component as any).toggle(1);
    expect((component as any).openStates[0]).toBe(true);
    expect((component as any).openStates[1]).toBe(true);
  });
});

describe('io-accordion — disabled interaction', () => {
  it('does not throw when items is empty', () => {
    const component = new IoAccordion();
    (component as any).accordionChange = { emit: vi.fn() };
    (component as any).el = { forceUpdate: vi.fn() };
    expect(() => component.componentWillLoad()).not.toThrow();
  });
});

describe('io-accordion — single-item mode', () => {
  let component: IoAccordion;
  let updateEmitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoAccordion();
    updateEmitSpy = vi.fn();
    (component as any).update = { emit: updateEmitSpy };
    (component as any).el = { id: 'accordion-single' };
    component.componentWillLoad();
  });

  it('toggles open state when no items are provided', () => {
    expect(component.open).toBe(false);
    (component as any).toggleSingle();
    expect(component.open).toBe(true);
    (component as any).toggleSingle();
    expect(component.open).toBe(false);
  });

  it('emits update event with new open state in single-item mode', () => {
    (component as any).toggleSingle();
    expect(updateEmitSpy).toHaveBeenCalledWith({ open: true });

    (component as any).toggleSingle();
    expect(updateEmitSpy).toHaveBeenCalledWith({ open: false });
  });

  it('uses single-item mode only when items is empty', () => {
    expect((component as any).isItemsMode).toBe(false);
    component.items = [{ title: 'Item', body: 'Body' }];
    expect((component as any).isItemsMode).toBe(true);
  });
});
