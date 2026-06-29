import { describe, it, expect } from 'vitest';
import {
  textListStory,
  textListPropDefinitions,
  textListStoryTags,
  textListStorySizes,
  textListStoryColors,
} from './io-text-list.stories';

describe('io-text-list storefront stories', () => {
  describe('textListStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => textListStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = textListStory.generator?.(textListStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = textListStory.generator?.(textListStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(textListStory.state?.properties).toBeDefined();
    });

    it('generator produces io-text-list tag', () => {
      const els = textListStory.generator?.(textListStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-text-list');
    });

    it('generator passes through all properties', () => {
      const props = { tag: 'ol', size: 'lg', color: 'secondary' };
      const els = textListStory.generator?.({ properties: props }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.tag).toBe('ol');
      expect(first.properties.size).toBe('lg');
      expect(first.properties.color).toBe('secondary');
    });

    it('element has li children', () => {
      const els = textListStory.generator?.(textListStory.state) ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children).toBeDefined();
      expect(first.children.length).toBeGreaterThan(0);
    });

    it('state.properties includes tag', () => {
      expect((textListStory.state?.properties as Record<string, unknown>).tag).toBeDefined();
    });

    it('state.properties includes size', () => {
      expect((textListStory.state?.properties as Record<string, unknown>).size).toBeDefined();
    });

    it('state.properties includes color', () => {
      expect((textListStory.state?.properties as Record<string, unknown>).color).toBeDefined();
    });
  });

  describe('textListPropDefinitions', () => {
    it('is non-empty', () => {
      expect(textListPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of textListPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of textListPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of textListPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of textListPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = textListPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes tag select definition with ul and ol options', () => {
      const def = textListPropDefinitions.find((d) => d.name === 'tag');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('ul');
      expect(((def as unknown as { options: string[] })).options).toContain('ol');
      expect(def!.defaultValue).toBe('ul');
    });

    it('includes size select with xs/sm/base/lg/xl/inherit options', () => {
      const def = textListPropDefinitions.find((d) => d.name === 'size');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('xs');
      expect(((def as unknown as { options: string[] })).options).toContain('sm');
      expect(((def as unknown as { options: string[] })).options).toContain('base');
      expect(((def as unknown as { options: string[] })).options).toContain('lg');
      expect(((def as unknown as { options: string[] })).options).toContain('xl');
      expect(((def as unknown as { options: string[] })).options).toContain('inherit');
      expect(def!.defaultValue).toBe('base');
    });

    it('includes color select with semantic color options', () => {
      const def = textListPropDefinitions.find((d) => d.name === 'color');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('primary');
      expect(((def as unknown as { options: string[] })).options).toContain('secondary');
      expect(((def as unknown as { options: string[] })).options).toContain('error');
      expect(((def as unknown as { options: string[] })).options).toContain('success');
      expect(((def as unknown as { options: string[] })).options).toContain('warning');
      expect(def!.defaultValue).toBe('primary');
    });
  });

  describe('textListStoryTags', () => {
    it('generator does not throw', () => {
      expect(() => textListStoryTags.generator?.()).not.toThrow();
    });

    it('generator returns 2 elements (one per tag)', () => {
      const els = textListStoryTags.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(2);
    });

    it('each element is an io-text-list', () => {
      const els = textListStoryTags.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-text-list');
      }
    });

    it('elements cover ul and ol tags', () => {
      const els = textListStoryTags.generator?.() ?? [];
      const tags = els.map((el) => (el as { properties: Record<string, unknown> }).properties.tag);
      expect(tags).toContain('ul');
      expect(tags).toContain('ol');
    });

    it('each element has li children', () => {
      const els = textListStoryTags.generator?.() ?? [];
      for (const el of els) {
        const element = el as { children: unknown[] };
        expect(element.children.length).toBeGreaterThan(0);
      }
    });
  });

  describe('textListStorySizes', () => {
    it('generator does not throw', () => {
      expect(() => textListStorySizes.generator?.()).not.toThrow();
    });

    it('generator returns 5 elements (one per size)', () => {
      const els = textListStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(5);
    });

    it('each element is an io-text-list', () => {
      const els = textListStorySizes.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-text-list');
      }
    });

    it('elements cover all five sizes', () => {
      const els = textListStorySizes.generator?.() ?? [];
      const sizes = els.map((el) => (el as { properties: Record<string, unknown> }).properties.size);
      expect(sizes).toContain('xs');
      expect(sizes).toContain('sm');
      expect(sizes).toContain('base');
      expect(sizes).toContain('lg');
      expect(sizes).toContain('xl');
    });

    it('each element has li children', () => {
      const els = textListStorySizes.generator?.() ?? [];
      for (const el of els) {
        const element = el as { children: unknown[] };
        expect(element.children.length).toBeGreaterThan(0);
      }
    });
  });

  describe('textListStoryColors', () => {
    it('generator does not throw', () => {
      expect(() => textListStoryColors.generator?.()).not.toThrow();
    });

    it('generator returns 7 elements (one per color)', () => {
      const els = textListStoryColors.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(7);
    });

    it('each element is an io-text-list', () => {
      const els = textListStoryColors.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-text-list');
      }
    });

    it('elements cover semantic colors including error and success', () => {
      const els = textListStoryColors.generator?.() ?? [];
      const colors = els.map((el) => (el as { properties: Record<string, unknown> }).properties.color);
      expect(colors).toContain('primary');
      expect(colors).toContain('secondary');
      expect(colors).toContain('error');
      expect(colors).toContain('success');
      expect(colors).toContain('warning');
    });

    it('each element has li children', () => {
      const els = textListStoryColors.generator?.() ?? [];
      for (const el of els) {
        const element = el as { children: unknown[] };
        expect(element.children.length).toBeGreaterThan(0);
      }
    });
  });
});
