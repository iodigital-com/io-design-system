import { describe, it, expect, vi } from 'vitest';
import { IoLinkTile } from './io-link-tile';

describe('io-link-tile — default props', () => {
  it('has "4/3" as the default aspectRatio', () => {
    const component = new IoLinkTile();
    expect(component.aspectRatio).toBe('4/3');
  });

  it('has "bottom" as the default align', () => {
    const component = new IoLinkTile();
    expect(component.align).toBe('bottom');
  });

  it('has "md" as the default size', () => {
    const component = new IoLinkTile();
    expect(component.size).toBe('md');
  });

  it('has "semibold" as the default weight', () => {
    const component = new IoLinkTile();
    expect(component.weight).toBe('semibold');
  });

  it('has gradient=true by default', () => {
    const component = new IoLinkTile();
    expect(component.gradient).toBe(true);
  });

  it('has "_self" as the default target', () => {
    const component = new IoLinkTile();
    expect(component.target).toBe('_self');
  });
});

describe('io-link-tile — componentWillLoad warnings', () => {
  it('warns when href is not set', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoLinkTile();
    component['componentWillLoad']();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[io-link-tile]'));
    spy.mockRestore();
  });

  it('warns when label is not set', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoLinkTile();
    (component as any).href = '/test';
    component['componentWillLoad']();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('label'));
    spy.mockRestore();
  });
});
