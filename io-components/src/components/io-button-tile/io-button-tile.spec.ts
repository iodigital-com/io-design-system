import { describe, it, expect, vi } from 'vitest';
import { IoButtonTile } from './io-button-tile';

describe('io-button-tile — default props', () => {
  it('has "4/3" as the default aspectRatio', () => {
    const component = new IoButtonTile();
    expect(component.aspectRatio).toBe('4/3');
  });

  it('has "bottom" as the default align', () => {
    const component = new IoButtonTile();
    expect(component.align).toBe('bottom');
  });

  it('has "md" as the default size', () => {
    const component = new IoButtonTile();
    expect(component.size).toBe('md');
  });

  it('has "semibold" as the default weight', () => {
    const component = new IoButtonTile();
    expect(component.weight).toBe('semibold');
  });

  it('has gradient=true by default', () => {
    const component = new IoButtonTile();
    expect(component.gradient).toBe(true);
  });

  it('has disabled=false by default', () => {
    const component = new IoButtonTile();
    expect(component.disabled).toBe(false);
  });

  it('has loading=false by default', () => {
    const component = new IoButtonTile();
    expect(component.loading).toBe(false);
  });

  it('has "button" as the default type', () => {
    const component = new IoButtonTile();
    expect(component.type).toBe('button');
  });
});

describe('io-button-tile — componentWillLoad warnings', () => {
  it('warns when label is not set', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoButtonTile();
    component['componentWillLoad']();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[io-button-tile]'));
    spy.mockRestore();
  });
});
