import { describe, it, expect, vi } from 'vitest';
import { IoTextarea } from './io-textarea';

describe('io-textarea — disabled', () => {
  let component: IoTextarea;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).ioInput = { emit: vi.fn() };
    (component as any).ioChange = { emit: vi.fn() };
    (component as any).ioFocus = { emit: vi.fn() };
    (component as any).ioBlur = { emit: vi.fn() };
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled prop when set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('reflects error prop when set to true', () => {
    component.error = true;
    expect(component.error).toBe(true);
  });

  it('resize prop can be set to none', () => {
    component.resize = 'none';
    expect(component.resize).toBe('none');
  });

  it('resize prop can be set to auto', () => {
    component.resize = 'auto';
    expect(component.resize).toBe('auto');
  });

  it('rows prop can be changed', () => {
    component.rows = 8;
    expect(component.rows).toBe(8);
  });
});
