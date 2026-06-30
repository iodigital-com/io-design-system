import { describe, it, expect } from 'vitest';
import {
  carouselStory,
  carouselPropDefinitions,
  carouselStoryMore,
  carouselStoryResponsive,
} from './io-carousel.stories';

describe('io-carousel storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('carouselStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => carouselStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = carouselStory.generator?.(carouselStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = carouselStory.generator?.(carouselStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(carouselStory.state?.properties).toBeDefined();
    });

    it('generator with slidesPerPage=1 does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, slidesPerPage: '1' } }),
      ).not.toThrow();
    });

    it('generator with slidesPerPage=2 does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, slidesPerPage: '2' } }),
      ).not.toThrow();
    });

    it('generator with slidesPerPage=3 does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, slidesPerPage: '3' } }),
      ).not.toThrow();
    });

    it('generator with slidesPerPage=4 does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, slidesPerPage: '4' } }),
      ).not.toThrow();
    });

    it('generator with slidesPerPage=auto does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, slidesPerPage: 'auto' } }),
      ).not.toThrow();
    });

    it('generator with rewind=true does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, rewind: true } }),
      ).not.toThrow();
    });

    it('generator with rewind=false does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, rewind: false } }),
      ).not.toThrow();
    });

    it('generator with activeSlideIndex=0 does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, activeSlideIndex: 0 } }),
      ).not.toThrow();
    });

    it('generator with activeSlideIndex=2 does not throw', () => {
      expect(() =>
        carouselStory.generator?.({ properties: { ...carouselStory.state?.properties, activeSlideIndex: 2 } }),
      ).not.toThrow();
    });

    it('configurator story produces io-carousel as root element', () => {
      const els = carouselStory.generator?.(carouselStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-carousel');
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('carouselPropDefinitions', () => {
    it('is non-empty', () => {
      expect(carouselPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of carouselPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of carouselPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of carouselPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of carouselPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = carouselPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });

    it('slidesPerPage definition includes auto option', () => {
      const slidesPerPageDef = carouselPropDefinitions.find((d) => d.name === 'slidesPerPage');
      expect(slidesPerPageDef).toBeDefined();
      expect(((slidesPerPageDef as unknown as { options: string[] })).options).toContain('auto');
    });
  });

  // ── Named stories ───────────────────────────────────────────────────────
  describe('carouselStoryResponsive', () => {
    it('generator returns non-empty array', () => {
      const els = carouselStoryResponsive.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element is io-carousel', () => {
      const els = carouselStoryResponsive.generator?.() ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-carousel');
    });

    it('slidesPerPage property is a responsive map', () => {
      const els = carouselStoryResponsive.generator?.() ?? [];
      const el = els[0] as { tag: string; properties: Record<string, unknown> };
      expect(typeof el.properties.slidesPerPage).toBe('object');
    });
  });

  describe('carouselStoryMore', () => {
    it('generator returns non-empty array', () => {
      const els = carouselStoryMore.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = carouselStoryMore.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });
});
