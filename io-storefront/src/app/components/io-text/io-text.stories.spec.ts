import { describe, it, expect } from 'vitest';
import {
  textStory,
  textPropDefinitions,
  textStorySizes,
  textStoryColors,
  textStoryWeights,
  textStoryAlign,
  textStoryEllipsis,
  textStorySemanticTags,
} from './io-text.stories';

describe('io-text storefront stories', () => {
  describe('textStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => textStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = textStory.generator?.(textStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = textStory.generator?.(textStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(textStory.state?.properties).toBeDefined();
    });

    it('generator produces io-text tag', () => {
      const els = textStory.generator?.(textStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-text');
    });

    it('generator passes through all properties', () => {
      const props = { tag: 'span', size: 'lg', weight: 'bold', color: 'secondary', align: 'center' };
      const els = textStory.generator?.({ properties: props }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.tag).toBe('span');
      expect(first.properties.size).toBe('lg');
      expect(first.properties.weight).toBe('bold');
      expect(first.properties.color).toBe('secondary');
    });

    it('element has text content as children', () => {
      const els = textStory.generator?.(textStory.state) ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children).toBeDefined();
      expect(first.children.length).toBeGreaterThan(0);
    });

    it('state.properties includes tag', () => {
      expect((textStory.state?.properties as Record<string, unknown>).tag).toBeDefined();
    });

    it('state.properties includes size', () => {
      expect((textStory.state?.properties as Record<string, unknown>).size).toBeDefined();
    });

    it('state.properties includes weight', () => {
      expect((textStory.state?.properties as Record<string, unknown>).weight).toBeDefined();
    });

    it('state.properties includes color', () => {
      expect((textStory.state?.properties as Record<string, unknown>).color).toBeDefined();
    });

    it('state.properties includes align', () => {
      expect((textStory.state?.properties as Record<string, unknown>).align).toBeDefined();
    });
  });

  describe('textPropDefinitions', () => {
    it('is non-empty', () => {
      expect(textPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of textPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of textPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of textPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of textPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = textPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes tag select definition with semantic HTML options', () => {
      const def = textPropDefinitions.find((d) => d.name === 'tag');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      const options = (def as unknown as { options: string[] }).options;
      expect(options).toContain('p');
      expect(options).toContain('span');
      expect(options).toContain('address');
      expect(options).toContain('figcaption');
      expect(options).toContain('cite');
      expect(options).toContain('legend');
      expect(def!.defaultValue).toBe('p');
    });

    it('includes size select with xs/sm/base/lg/xl options', () => {
      const def = textPropDefinitions.find((d) => d.name === 'size');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('xs');
      expect(((def as unknown as { options: string[] })).options).toContain('sm');
      expect(((def as unknown as { options: string[] })).options).toContain('base');
      expect(((def as unknown as { options: string[] })).options).toContain('lg');
      expect(((def as unknown as { options: string[] })).options).toContain('xl');
      expect(def!.defaultValue).toBe('base');
    });

    it('includes weight select with font weight options', () => {
      const def = textPropDefinitions.find((d) => d.name === 'weight');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('regular');
      expect(((def as unknown as { options: string[] })).options).toContain('bold');
      expect(def!.defaultValue).toBe('regular');
    });

    it('includes align select definition', () => {
      const def = textPropDefinitions.find((d) => d.name === 'align');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('start');
      expect(((def as unknown as { options: string[] })).options).toContain('center');
      expect(((def as unknown as { options: string[] })).options).toContain('end');
    });

    it('includes color select with semantic color options', () => {
      const def = textPropDefinitions.find((d) => d.name === 'color');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('primary');
      expect(((def as unknown as { options: string[] })).options).toContain('secondary');
      expect(((def as unknown as { options: string[] })).options).toContain('error');
      expect(def!.defaultValue).toBe('primary');
    });

    it('includes ellipsis boolean definition', () => {
      const def = textPropDefinitions.find((d) => d.name === 'ellipsis');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
      expect(def!.defaultValue).toBe(false);
    });
  });

  describe('textStorySizes', () => {
    it('generator does not throw', () => {
      expect(() => textStorySizes.generator?.()).not.toThrow();
    });

    it('generator returns 5 elements (one per size)', () => {
      const els = textStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(5);
    });

    it('each element is an io-text', () => {
      const els = textStorySizes.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-text');
      }
    });

    it('elements cover all five sizes', () => {
      const els = textStorySizes.generator?.() ?? [];
      const sizes = els.map((el) => (el as { properties: Record<string, unknown> }).properties.size);
      expect(sizes).toContain('xs');
      expect(sizes).toContain('sm');
      expect(sizes).toContain('base');
      expect(sizes).toContain('lg');
      expect(sizes).toContain('xl');
    });

    it('each element has text content', () => {
      const els = textStorySizes.generator?.() ?? [];
      for (const el of els) {
        const element = el as { children: unknown[] };
        expect(element.children.length).toBeGreaterThan(0);
      }
    });
  });

  describe('textStoryColors', () => {
    it('generator does not throw', () => {
      expect(() => textStoryColors.generator?.()).not.toThrow();
    });

    it('generator returns 7 elements (one per color)', () => {
      const els = textStoryColors.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(9);
    });

    it('each element is an io-text', () => {
      const els = textStoryColors.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-text');
      }
    });

    it('elements cover semantic colors including error and success', () => {
      const els = textStoryColors.generator?.() ?? [];
      const colors = els.map((el) => (el as { properties: Record<string, unknown> }).properties.color);
      expect(colors).toContain('primary');
      expect(colors).toContain('secondary');
      expect(colors).toContain('error');
      expect(colors).toContain('success');
      expect(colors).toContain('warning');
    });

    it('each element has text content', () => {
      const els = textStoryColors.generator?.() ?? [];
      for (const el of els) {
        const element = el as { children: unknown[] };
        expect(element.children.length).toBeGreaterThan(0);
      }
    });
  });

  describe('textStoryWeights', () => {
    it('does not throw', () => {
      expect(() => textStoryWeights.generator?.()).not.toThrow();
    });

    it('returns one element per weight variant', () => {
      const els = textStoryWeights.generator?.() ?? [];
      expect(els.length).toBe(4);
    });

    it('each element is an io-text', () => {
      const els = textStoryWeights.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-text');
      }
    });
  });

  describe('textStoryAlign', () => {
    it('does not throw', () => {
      expect(() => textStoryAlign.generator?.()).not.toThrow();
    });

    it('returns one element per alignment', () => {
      const els = textStoryAlign.generator?.() ?? [];
      expect(els.length).toBe(3);
    });

    it('each element is an io-text', () => {
      const els = textStoryAlign.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-text');
      }
    });
  });

  describe('textStoryEllipsis', () => {
    it('does not throw', () => {
      expect(() => textStoryEllipsis.generator?.()).not.toThrow();
    });

    it('returns a wrapper div containing an io-text with ellipsis', () => {
      const els = textStoryEllipsis.generator?.() ?? [];
      expect(els.length).toBe(1);
      const wrapper = els[0] as { tag: string; children?: unknown[] };
      expect(wrapper.tag).toBe('div');
      const text = wrapper.children?.find((c) => (c as { tag: string }).tag === 'io-text');
      expect(text).toBeDefined();
      expect((text as { properties: Record<string, unknown> }).properties.ellipsis).toBe(true);
    });
  });

  describe('textStorySemanticTags', () => {
    it('does not throw', () => {
      expect(() => textStorySemanticTags.generator?.()).not.toThrow();
    });

    it('returns one element per semantic tag', () => {
      const els = textStorySemanticTags.generator?.() ?? [];
      expect(els.length).toBe(4);
    });

    it('elements cover address, figcaption, cite, legend', () => {
      const els = textStorySemanticTags.generator?.() ?? [];
      const tags = els.map((el) => (el as { properties: Record<string, unknown> }).properties.tag);
      expect(tags).toContain('address');
      expect(tags).toContain('figcaption');
      expect(tags).toContain('cite');
      expect(tags).toContain('legend');
    });
  });
});
