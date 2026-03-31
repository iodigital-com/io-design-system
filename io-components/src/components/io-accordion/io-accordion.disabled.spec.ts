import { describe, it, expect, vi } from 'vitest';
import { IoAccordion } from './io-accordion';

describe('io-accordion — disabled state', () => {
  let component: IoAccordion;

  beforeEach(() => {
    component = new IoAccordion();
    (component as any).update = { emit: vi.fn() };
    (component as any).el = { id: '' };
    component.componentWillLoad();
  });

  it('sets disabled to false by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled when set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('prevents toggle when disabled', () => {
    component.disabled = true;
    expect(component.open).toBe(false);
    (component as any).toggleSingle();
    expect(component.open).toBe(false);
  });

  it('prevents event emission when disabled', () => {
    component.disabled = true;
    const emitSpy = (component as any).update.emit;
    (component as any).toggleSingle();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('allows toggle when re-enabled after being disabled', () => {
    component.disabled = true;
    (component as any).toggleSingle();
    expect(component.open).toBe(false);

    component.disabled = false;
    (component as any).toggleSingle();
    expect(component.open).toBe(true);
  });
});
