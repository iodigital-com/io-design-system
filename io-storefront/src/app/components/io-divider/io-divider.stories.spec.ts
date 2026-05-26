import { describe, it, expect } from 'vitest';
import {
  dividerStory,
  dividerStoryHorizontal,
  dividerStoryVertical,
  dividerStoryLabeled,
  dividerPropDefinitions,
} from './io-divider.stories';

describe('io-divider storefront stories', () => {
  describe('dividerStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => dividerStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = dividerStory.generator?.(dividerStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = dividerStory.generator?.(dividerStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(dividerStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof dividerStory.state?.properties).toBe('object');
    });

    it('generator with orientation=vertical does not throw', () => {
      expect(() =>
        dividerStory.generator?.({ properties: { ...dividerStory.state?.properties, orientation: 'vertical' } })
      ).not.toThrow();
    });

    it('generator with orientation=vertical returns non-empty array', () => {
      const els = dividerStory.generator?.({
        properties: { ...dividerStory.state?.properties, orientation: 'vertical' },
      });
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('generator with orientation=horizontal does not throw', () => {
      expect(() =>
        dividerStory.generator?.({ properties: { ...dividerStory.state?.properties, orientation: 'horizontal' } })
      ).not.toThrow();
    });

    it('generator with a label does not throw', () => {
      expect(() =>
        dividerStory.generator?.({ properties: { ...dividerStory.state?.properties, label: 'or' } })
      ).not.toThrow();
    });

    it('generator with color=subtle does not throw', () => {
      expect(() =>
        dividerStory.generator?.({ properties: { ...dividerStory.state?.properties, color: 'subtle' } })
      ).not.toThrow();
    });

    it('generator with color=strong does not throw', () => {
      expect(() =>
        dividerStory.generator?.({ properties: { ...dividerStory.state?.properties, color: 'strong' } })
      ).not.toThrow();
    });

    it('generator with color=default does not throw', () => {
      expect(() =>
        dividerStory.generator?.({ properties: { ...dividerStory.state?.properties, color: 'default' } })
      ).not.toThrow();
    });

    it('frameworkCode does not throw with default state', () => {
      expect(() => (dividerStory as { frameworkCode?: (state?: unknown) => unknown }).frameworkCode?.(dividerStory.state)).not.toThrow();
    });

    it('configurator story produces io-divider as root element', () => {
      const els = dividerStory.generator?.(dividerStory.state) ?? [];
      const wrapper = els[0] as { tag: string; children?: unknown[] };
      const divider = wrapper.children?.find((el) => (el as { tag: string }).tag === 'io-divider');
      expect(divider).toBeDefined();
    });
  });

  describe('dividerPropDefinitions', () => {
    it('is non-empty', () => {
      expect(dividerPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of dividerPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of dividerPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of dividerPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of dividerPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = dividerPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('color select options include subtle, default, and strong', () => {
      const colorDef = dividerPropDefinitions.find((d) => d.name === 'color');
      expect(colorDef).toBeDefined();
      expect(((colorDef as unknown as { options: string[] })).options).toContain('subtle');
      expect(((colorDef as unknown as { options: string[] })).options).toContain('default');
      expect(((colorDef as unknown as { options: string[] })).options).toContain('strong');
    });
  });

  describe('dividerStoryHorizontal (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = dividerStoryHorizontal.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = dividerStoryHorizontal.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => dividerStoryHorizontal.generator?.()).not.toThrow();
    });
  });

  describe('dividerStoryVertical (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = dividerStoryVertical.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = dividerStoryVertical.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => dividerStoryVertical.generator?.()).not.toThrow();
    });
  });

  describe('dividerStoryLabeled (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = dividerStoryLabeled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = dividerStoryLabeled.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => dividerStoryLabeled.generator?.()).not.toThrow();
    });
  });
});
