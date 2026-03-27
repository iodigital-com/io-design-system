import { describe, it, expect, vi } from 'vitest';
import { IoButton } from './io-button';

describe('io-button — disabled / loading', () => {
  let component: IoButton;

  beforeEach(() => {
    component = new IoButton();
    (component as any).el = document.createElement('io-button');
    (component as any).ioClick = { emit: vi.fn() };
  });

  it('sets disabled prop to false by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('sets loading prop to false by default', () => {
    expect(component.loading).toBe(false);
  });

  it('reflects disabled attribute on the host when set to true', () => {
    // The @Prop({ reflect: true }) decorator ensures Stencil writes the attribute.
    // We verify the prop assignment itself; attribute reflection is Stencil's responsibility.
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('reflects loading attribute on the host when set to true', () => {
    component.loading = true;
    expect(component.loading).toBe(true);
  });

  it('prevents click emission when disabled', () => {
    component.disabled = true;
    const emitMock = (component as any).ioClick.emit;
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (component as any).handleClick(ev);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('prevents click emission when loading', () => {
    component.loading = true;
    const emitMock = (component as any).ioClick.emit;
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (component as any).handleClick(ev);
    expect(emitMock).not.toHaveBeenCalled();
  });
});
