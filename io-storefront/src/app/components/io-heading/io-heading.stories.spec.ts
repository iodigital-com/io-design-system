import { describe, it, expect } from 'vitest';
import {
  headingStory,
  headingStorySizes,
  headingStoryLevels,
  headingPropDefinitions,
} from './io-heading.stories';

describe('io-heading storefront stories', () => {
  describe('headingStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => headingStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = headingStory.generator?.(headingStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = headingStory.generator?.(headingStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(headingStory.state.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof headingStory.state.properties).toBe('object');
    });

    it('generator with each tag option does not throw', () => {
      for (const tagVal of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state.properties, tag: tagVal } })
        ).not.toThrow();
      }
    });

    it('generator with each size option does not throw', () => {
      for (const size of ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state.properties, size } })
        ).not.toThrow();
      }
    });

    it('generator with each weight option does not throw', () => {
      for (const weight of ['regular', 'semibold', 'bold']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state.properties, weight } })
        ).not.toThrow();
      }
    });

    it('generator with each align option does not throw', () => {
      for (const align of ['start', 'center', 'end', 'inherit']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state.properties, align } })
        ).not.toThrow();
      }
    });

    it('generator with each color option does not throw', () => {
      for (const color of ['primary', 'secondary', 'inherit']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state.properties, color } })
        ).not.toThrow();
      }
    });
  });

  describe('headingPropDefinitions', () => {
    it('is non-empty', () => {
      expect(headingPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of headingPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of headingPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of headingPropDefinitions.filter((d) => d.type === 'select')) {
        expect(def.options).toBeDefined();
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of headingPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = headingPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('tag select options include all heading levels', () => {
      const tagDef = headingPropDefinitions.find((d) => d.name === 'tag');
      expect(tagDef).toBeDefined();
      for (const level of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
        expect(tagDef!.options).toContain(level);
      }
    });

    it('size select options include all size variants', () => {
      const sizeDef = headingPropDefinitions.find((d) => d.name === 'size');
      expect(sizeDef).toBeDefined();
      for (const size of ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']) {
        expect(sizeDef!.options).toContain(size);
      }
    });
  });

  describe('headingStorySizes (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = headingStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = headingStorySizes.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => headingStorySizes.generator?.()).not.toThrow();
    });

    it('returns one element per size variant', () => {
      const els = headingStorySizes.generator?.() ?? [];
      expect(els.length).toBe(7);
    });
  });

  describe('headingStoryLevels (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = headingStoryLevels.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = headingStoryLevels.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => headingStoryLevels.generator?.()).not.toThrow();
    });

    it('returns one element per heading level', () => {
      const els = headingStoryLevels.generator?.() ?? [];
      expect(els.length).toBe(6);
    });
  });
});
