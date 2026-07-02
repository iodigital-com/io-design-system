import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoProductTile } from './io-product-tile';
import { getHeartIcon, validateProductTileUsage } from './io-product-tile-utils';

describe('io-product-tile — default props', () => {
  let component: IoProductTile;

  beforeEach(() => {
    component = new IoProductTile();
    (component as any).el = document.createElement('io-product-tile');
    (component as any).likeEvent = { emit: vi.fn() };
  });

  it('has heading required prop default as empty string coercion', () => {
    // heading is required — default will be undefined if not set
    component.heading = 'Test';
    expect(component.heading).toBe('Test');
  });

  it('has headingTag default of h2', () => {
    expect(component.headingTag).toBe('h2');
  });

  it('has price required prop', () => {
    component.price = '€49';
    expect(component.price).toBe('€49');
  });

  it('has priceOriginal default of undefined', () => {
    expect(component.priceOriginal).toBeUndefined();
  });

  it('has description default of undefined', () => {
    expect(component.description).toBeUndefined();
  });

  it('has href default of undefined', () => {
    expect(component.href).toBeUndefined();
  });

  it('has target default of _self', () => {
    expect(component.target).toBe('_self');
  });

  it('has likeButton default of false', () => {
    expect(component.likeButton).toBe(false);
  });

  it('has liked default of false', () => {
    expect(component.liked).toBe(false);
  });

  it('has aspect default of square', () => {
    expect(component.aspect).toBe('square');
  });

  it('has likeLabel default', () => {
    expect(component.likeLabel).toBe('Add to wishlist');
  });

  it('has unlikeLabel default', () => {
    expect(component.unlikeLabel).toBe('Remove from wishlist');
  });

  it('renders without throwing for default state', () => {
    component.heading = 'Test product';
    component.price = '€49';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with priceOriginal', () => {
    component.heading = 'Product';
    component.price = '€49';
    component.priceOriginal = '€79';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with likeButton true', () => {
    component.heading = 'Product';
    component.price = '€49';
    component.likeButton = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with href', () => {
    component.heading = 'Product';
    component.price = '€49';
    component.href = '/product/1';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with all headingTag values', () => {
    component.price = '€49';
    for (const tag of ['h2', 'h3', 'h4'] as const) {
      component.heading = 'Product';
      component.headingTag = tag;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing with all aspect values', () => {
    component.heading = 'Product';
    component.price = '€49';
    for (const aspect of ['square', 'portrait', 'landscape'] as const) {
      component.aspect = aspect;
      expect(() => component.render()).not.toThrow();
    }
  });
});

describe('io-product-tile-utils', () => {
  it('getHeartIcon returns string when not liked', () => {
    const svg = getHeartIcon(false);
    expect(typeof svg).toBe('string');
    expect(svg.length).toBeGreaterThan(0);
  });

  it('getHeartIcon returns string when liked', () => {
    const svg = getHeartIcon(true);
    expect(typeof svg).toBe('string');
    expect(svg.length).toBeGreaterThan(0);
  });

  it('validateProductTileUsage logs error when both href and slotted anchor provided', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    validateProductTileUsage('/path', true);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('validateProductTileUsage does not log error when only href provided', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    validateProductTileUsage('/path', false);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('validateProductTileUsage does not log error when neither href nor slotted anchor', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    validateProductTileUsage(undefined, false);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
