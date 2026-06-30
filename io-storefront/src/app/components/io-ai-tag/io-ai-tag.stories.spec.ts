import { describe, it, expect } from 'vitest';
import {
  aiTagStory,
  aiTagPropDefinitions,
  aiTagStoryVariants,
  aiTagStoryLocales,
} from './io-ai-tag.stories';

describe('io-ai-tag storefront stories', () => {
  describe('aiTagStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => aiTagStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = aiTagStory.generator?.(aiTagStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('configurator story produces io-ai-tag as root element', () => {
      const els = aiTagStory.generator?.(aiTagStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-ai-tag');
    });

    it('state.properties is defined', () => {
      expect(aiTagStory.state?.properties).toBeDefined();
    });

    it('generator with variant=abbreviation does not throw', () => {
      expect(() =>
        aiTagStory.generator?.({ properties: { ...aiTagStory.state?.properties, variant: 'abbreviation' } }),
      ).not.toThrow();
    });

    it('generator with variant=modified does not throw', () => {
      expect(() =>
        aiTagStory.generator?.({ properties: { ...aiTagStory.state?.properties, variant: 'modified' } }),
      ).not.toThrow();
    });

    it('generator with locale=nl does not throw', () => {
      expect(() =>
        aiTagStory.generator?.({ properties: { ...aiTagStory.state?.properties, locale: 'nl' } }),
      ).not.toThrow();
    });
  });

  describe('aiTagPropDefinitions', () => {
    it('is non-empty', () => {
      expect(aiTagPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of aiTagPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of aiTagPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of aiTagPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of aiTagPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = aiTagPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  describe('aiTagStoryVariants', () => {
    it('generator returns non-empty array', () => {
      const els = aiTagStoryVariants.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = aiTagStoryVariants.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('aiTagStoryLocales', () => {
    it('generator returns non-empty array', () => {
      const els = aiTagStoryLocales.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });
  });
});
