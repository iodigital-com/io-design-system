import { describe, it, expect } from 'vitest';
import { IoButtonTile } from './io-button-tile';

describe('io-button-tile — disabled state', () => {
  it('has disabled=false by default', () => {
    const component = new IoButtonTile();
    expect(component.disabled).toBe(false);
  });

  it('disabled prop can be set to true', () => {
    const component = new IoButtonTile();
    (component as any).disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('loading prop can be set to true', () => {
    const component = new IoButtonTile();
    (component as any).loading = true;
    expect(component.loading).toBe(true);
  });
});
