import { describe, it, expect } from 'vitest';
import {
  paginationStory,
  paginationStoryMidRange,
  paginationStoryFull,
  paginationPropDefinitions,
} from './io-pagination.stories';

describe('io-pagination storefront stories', () => {
  describe('paginationStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => paginationStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = paginationStory.generator?.(paginationStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = paginationStory.generator?.(paginationStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(paginationStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof paginationStory.state?.properties).toBe('object');
    });

    it('generator with page=1 does not throw', () => {
      expect(() =>
        paginationStory.generator?.({ properties: { page: 1, totalPages: 5 } })
      ).not.toThrow();
    });

    it('generator with page at the last page does not throw', () => {
      expect(() =>
        paginationStory.generator?.({ properties: { page: 5, totalPages: 5 } })
      ).not.toThrow();
    });

    it('generator with a large totalPages does not throw', () => {
      expect(() =>
        paginationStory.generator?.({ properties: { page: 7, totalPages: 20 } })
      ).not.toThrow();
    });

    it('configurator story produces io-pagination as root element', () => {
      const els = paginationStory.generator?.(paginationStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-pagination');
    });
  });

  describe('paginationPropDefinitions', () => {
    it('is non-empty', () => {
      expect(paginationPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of paginationPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of paginationPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of paginationPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of paginationPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = paginationPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes page and totalPages definitions', () => {
      const names = paginationPropDefinitions.map((d) => d.name);
      expect(names).toContain('page');
      expect(names).toContain('totalPages');
    });

    it('page and totalPages definitions are type number', () => {
      const pageDef = paginationPropDefinitions.find((d) => d.name === 'page');
      const totalPagesDef = paginationPropDefinitions.find((d) => d.name === 'totalPages');
      expect(pageDef?.type).toBe('number');
      expect(totalPagesDef?.type).toBe('number');
    });
  });

  describe('paginationStoryMidRange (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = paginationStoryMidRange.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = paginationStoryMidRange.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => paginationStoryMidRange.generator?.()).not.toThrow();
    });
  });

  describe('paginationStoryFull (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = paginationStoryFull.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = paginationStoryFull.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => paginationStoryFull.generator?.()).not.toThrow();
    });
  });
});
