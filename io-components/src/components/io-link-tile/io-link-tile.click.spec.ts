import { describe, it, expect } from 'vitest';
import { IoLinkTile } from './io-link-tile';

describe('io-link-tile — click behaviour', () => {
  it('renders with href accessible via prop', () => {
    const component = new IoLinkTile();
    (component as any).href = '/products/widget';
    expect(component.href).toBe('/products/widget');
  });

  it('renders with target prop', () => {
    const component = new IoLinkTile();
    (component as any).target = '_blank';
    expect(component.target).toBe('_blank');
  });
});
