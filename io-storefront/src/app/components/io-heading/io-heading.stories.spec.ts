import { describe, it, expect } from 'vitest';
import {
  headingStory,
  headingStorySizes,
  headingStoryLevels,
  headingStoryWeights,
  headingStoryAlign,
  headingStoryColors,
  headingStoryEllipsis,
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
      expect(headingStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof headingStory.state?.properties).toBe('object');
    });

    it('generator with each tag option does not throw', () => {
      for (const tagVal of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state?.properties, tag: tagVal } })
        ).not.toThrow();
      }
    });

    it('generator with each size option does not throw', () => {
      for (const size of ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state?.properties, size } })
        ).not.toThrow();
      }
    });

    it('generator with each weight option does not throw', () => {
      for (const weight of ['regular', 'semibold', 'bold']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state?.properties, weight } })
        ).not.toThrow();
      }
    });

    it('generator with each align option does not throw', () => {
      for (const align of ['start', 'center', 'end', 'inherit']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state?.properties, align } })
        ).not.toThrow();
      }
    });

    it('generator with each color option does not throw', () => {
      for (const color of ['primary', 'secondary', 'inherit', 'inverse', 'brand']) {
        expect(() =>
          headingStory.generator?.({ properties: { ...headingStory.state?.properties, color } })
        ).not.toThrow();
      }
    });

    it('configurator story produces io-heading as root element', () => {
      const els = headingStory.generator?.(headingStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-heading');
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
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
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
        expect(((tagDef as unknown as { options: string[] })).options).toContain(level);
      }
    });

    it('size select options include all size variants', () => {
      const sizeDef = headingPropDefinitions.find((d) => d.name === 'size');
      expect(sizeDef).toBeDefined();
      for (const size of ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']) {
        expect(((sizeDef as unknown as { options: string[] })).options).toContain(size);
      }
    });

    it('color select options include inverse and brand', () => {
      const colorDef = headingPropDefinitions.find((d) => d.name === 'color');
      expect(colorDef).toBeDefined();
      for (const color of ['primary', 'secondary', 'inherit', 'inverse', 'brand']) {
        expect(((colorDef as unknown as { options: string[] })).options).toContain(color);
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

  describe('headingStoryWeights (named story)', () => {
    it('does not throw', () => {
      expect(() => headingStoryWeights.generator?.()).not.toThrow();
    });

    it('returns one element per weight variant', () => {
      const els = headingStoryWeights.generator?.() ?? [];
      expect(els.length).toBe(3);
    });

    it('each element is an io-heading', () => {
      const els = headingStoryWeights.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-heading');
      }
    });
  });

  describe('headingStoryAlign (named story)', () => {
    it('does not throw', () => {
      expect(() => headingStoryAlign.generator?.()).not.toThrow();
    });

    it('returns one element per alignment', () => {
      const els = headingStoryAlign.generator?.() ?? [];
      expect(els.length).toBe(3);
    });

    it('each element is an io-heading', () => {
      const els = headingStoryAlign.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-heading');
      }
    });
  });

  describe('headingStoryColors (named story)', () => {
    it('does not throw', () => {
      expect(() => headingStoryColors.generator?.()).not.toThrow();
    });

    it('returns one element per color variant', () => {
      const els = headingStoryColors.generator?.() ?? [];
      expect(els.length).toBe(5);
    });

    it('includes primary, secondary, and inherit as direct io-heading elements', () => {
      const els = headingStoryColors.generator?.() ?? [];
      const directHeadings = els.filter((el) => (el as { tag: string }).tag === 'io-heading');
      expect(directHeadings.length).toBeGreaterThanOrEqual(3);
    });

    it('wraps inverse color with a dark background container', () => {
      const els = headingStoryColors.generator?.() ?? [];
      const inverseEl = els.find((el) => {
        if ((el as { tag: string }).tag === 'div') {
          const children = (el as { children?: unknown[] }).children ?? [];
          return children.some((c) => (c as { properties?: { color: string } })?.properties?.color === 'inverse');
        }
        return false;
      });
      expect(inverseEl).toBeDefined();
    });
  });

  describe('headingStoryEllipsis (named story)', () => {
    it('does not throw', () => {
      expect(() => headingStoryEllipsis.generator?.()).not.toThrow();
    });

    it('returns a wrapper div containing an io-heading', () => {
      const els = headingStoryEllipsis.generator?.() ?? [];
      expect(els.length).toBe(1);
      const wrapper = els[0] as { tag: string; children?: unknown[] };
      expect(wrapper.tag).toBe('div');
      const heading = wrapper.children?.find((c) => (c as { tag: string }).tag === 'io-heading');
      expect(heading).toBeDefined();
    });
  });

  describe('headingStoryColors (named story)', () => {
    it('does not throw', () => {
      expect(() => headingStoryColors.generator?.()).not.toThrow();
    });

    it('returns one element per color variant', () => {
      const els = headingStoryColors.generator?.() ?? [];
      expect(els.length).toBe(4);
    });

    it('each element is an io-heading', () => {
      const els = headingStoryColors.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-heading');
      }
    });

    it('covers inverse and brand colors', () => {
      const els = headingStoryColors.generator?.() ?? [];
      const colors = els.map((el) => (el as { properties: { color: string } }).properties.color);
      expect(colors).toContain('inverse');
      expect(colors).toContain('brand');
    });
  });
});
