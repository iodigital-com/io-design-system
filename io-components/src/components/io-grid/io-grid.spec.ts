import { describe, it, expect, vi } from 'vitest';
import { IoGrid } from './io-grid';
import { IoGridItem } from './io-grid-item';

describe('io-grid — default props', () => {
  it('has "md" as the default gap', () => {
    const component = new IoGrid();
    expect(component.gap).toBe('md');
  });

  it('has 12 as the default columns', () => {
    const component = new IoGrid();
    expect(component.columns).toBe(12);
  });

  it('has "start" as the default align', () => {
    const component = new IoGrid();
    expect(component.align).toBe('start');
  });

  it('has "stretch" as the default justify', () => {
    const component = new IoGrid();
    expect(component.justify).toBe('stretch');
  });
});

describe('io-grid-item — default props', () => {
  it('has undefined colSpan by default', () => {
    const component = new IoGridItem();
    expect(component.colSpan).toBeUndefined();
  });

  it('has undefined rowSpan by default', () => {
    const component = new IoGridItem();
    expect(component.rowSpan).toBeUndefined();
  });

  it('has undefined colStart by default', () => {
    const component = new IoGridItem();
    expect(component.colStart).toBeUndefined();
  });
});

describe('io-grid — validation warning', () => {
  it('warns on invalid columns value', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoGrid();
    component.columns = 99;
    component['validateProps']();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[io-grid]'));
    spy.mockRestore();
  });
});
