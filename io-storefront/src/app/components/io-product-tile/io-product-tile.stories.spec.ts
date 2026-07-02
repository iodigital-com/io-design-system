import { describe, it, expect } from 'vitest';
import {
  productTileStory,
  productTilePropDefinitions,
  productTileSaleStory,
  productTileLikedStory,
} from './io-product-tile.stories';

describe('io-product-tile storefront stories', () => {
  // ── Configurator story ────────────────────────────────────────────────────
  describe('productTileStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => productTileStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = productTileStory.generator?.(productTileStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('configurator story produces io-product-tile as root element', () => {
      const els = productTileStory.generator?.(productTileStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-product-tile');
    });

    it('state.properties is defined', () => {
      expect(productTileStory.state?.properties).toBeDefined();
    });

    it('every returned element has a tag', () => {
      const els = productTileStory.generator?.(productTileStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  // ── PropDefinitions ───────────────────────────────────────────────────────
  describe('productTilePropDefinitions', () => {
    it('is non-empty', () => {
      expect(productTilePropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of productTilePropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of productTilePropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of productTilePropDefinitions.filter((d) => d.type === 'select')) {
        const typed = def as unknown as { options: string[] };
        expect(typed.options).toBeDefined();
        expect(typed.options.length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of productTilePropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = productTilePropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  // ── Named stories ─────────────────────────────────────────────────────────
  describe('productTileSaleStory', () => {
    it('generator returns non-empty array', () => {
      const els = productTileSaleStory.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has tag io-product-tile', () => {
      const els = productTileSaleStory.generator?.() ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-product-tile');
    });
  });

  describe('productTileLikedStory', () => {
    it('generator returns non-empty array', () => {
      const els = productTileLikedStory.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has tag io-product-tile', () => {
      const els = productTileLikedStory.generator?.() ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-product-tile');
    });
  });
});
