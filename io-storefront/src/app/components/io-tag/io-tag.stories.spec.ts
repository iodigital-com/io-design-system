import { describe, it, expect } from 'vitest';
import {
  tagStory,
  tagPropDefinitions,
  tagStoryDefault,
  tagStorySelected,
  tagStoryColors,
  tagStoryRemovable,
  tagStoryDisabled,
} from './io-tag.stories';

describe('io-tag storefront stories', () => {
  describe('tagStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => tagStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = tagStory.generator?.(tagStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = tagStory.generator?.(tagStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(tagStory.state?.properties).toBeDefined();
    });

    it('generator produces io-tag tag', () => {
      const els = tagStory.generator?.(tagStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tag');
    });

    it('generator respects selected override', () => {
      const els = tagStory.generator?.({ properties: { selected: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.selected).toBe(true);
    });

    it('generator respects disabled override', () => {
      const els = tagStory.generator?.({ properties: { disabled: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });

    it('generator respects color override', () => {
      const els = tagStory.generator?.({ properties: { color: 'blue' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.color).toBe('blue');
    });

    it('generator respects size override', () => {
      const els = tagStory.generator?.({ properties: { size: 'sm' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('sm');
    });

    it('generator respects removable override', () => {
      const els = tagStory.generator?.({ properties: { removable: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.removable).toBe(true);
    });

    it('state.properties includes selected', () => {
      expect((tagStory.state?.properties as Record<string, unknown>).selected).toBeDefined();
    });

    it('state.properties includes color', () => {
      expect((tagStory.state?.properties as Record<string, unknown>).color).toBeDefined();
    });

    it('element has children', () => {
      const els = tagStory.generator?.(tagStory.state) ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children.length).toBeGreaterThan(0);
    });
  });

  describe('tagPropDefinitions', () => {
    it('is non-empty', () => {
      expect(tagPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of tagPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of tagPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of tagPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of tagPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = tagPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes selected definition of type boolean', () => {
      const def = tagPropDefinitions.find((d) => d.name === 'selected');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
      expect(def!.defaultValue).toBe(false);
    });

    it('includes removable definition of type boolean', () => {
      const def = tagPropDefinitions.find((d) => d.name === 'removable');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });

    it('includes disabled definition of type boolean', () => {
      const def = tagPropDefinitions.find((d) => d.name === 'disabled');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });

    it('includes size select with sm/md options', () => {
      const def = tagPropDefinitions.find((d) => d.name === 'size');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('sm');
      expect(((def as unknown as { options: string[] })).options).toContain('md');
      expect(def!.defaultValue).toBe('md');
    });

    it('includes color select with default/blue/beige options', () => {
      const def = tagPropDefinitions.find((d) => d.name === 'color');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('default');
      expect(((def as unknown as { options: string[] })).options).toContain('blue');
      expect(((def as unknown as { options: string[] })).options).toContain('beige');
      expect(def!.defaultValue).toBe('default');
    });
  });

  describe('tagStoryDefault', () => {
    it('generator does not throw', () => {
      expect(() => tagStoryDefault.generator?.()).not.toThrow();
    });

    it('generator returns multiple elements', () => {
      const els = tagStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('all elements are io-tag', () => {
      const els = tagStoryDefault.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-tag');
      }
    });
  });

  describe('tagStorySelected', () => {
    it('generator does not throw', () => {
      expect(() => tagStorySelected.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tagStorySelected.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('all elements have selected=true', () => {
      const els = tagStorySelected.generator?.() ?? [];
      for (const el of els) {
        const element = el as { properties: Record<string, unknown> };
        expect(element.properties.selected).toBe(true);
      }
    });

    it('elements use multiple colors', () => {
      const els = tagStorySelected.generator?.() ?? [];
      const colors = els.map((el) => (el as { properties: Record<string, unknown> }).properties.color);
      expect(new Set(colors).size).toBeGreaterThan(1);
    });
  });

  describe('tagStoryColors', () => {
    it('generator does not throw', () => {
      expect(() => tagStoryColors.generator?.()).not.toThrow();
    });

    it('generator returns multiple elements', () => {
      const els = tagStoryColors.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('covers default, blue, and beige colors', () => {
      const els = tagStoryColors.generator?.() ?? [];
      const colors = els.map((el) => (el as { properties: Record<string, unknown> }).properties.color);
      expect(colors).toContain('default');
      expect(colors).toContain('blue');
      expect(colors).toContain('beige');
    });
  });

  describe('tagStoryRemovable', () => {
    it('generator does not throw', () => {
      expect(() => tagStoryRemovable.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tagStoryRemovable.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('all elements have removable=true', () => {
      const els = tagStoryRemovable.generator?.() ?? [];
      for (const el of els) {
        const element = el as { properties: Record<string, unknown> };
        expect(element.properties.removable).toBe(true);
      }
    });
  });

  describe('tagStoryDisabled', () => {
    it('generator does not throw', () => {
      expect(() => tagStoryDisabled.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tagStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('all elements have disabled=true', () => {
      const els = tagStoryDisabled.generator?.() ?? [];
      for (const el of els) {
        const element = el as { properties: Record<string, unknown> };
        expect(element.properties.disabled).toBe(true);
      }
    });
  });
});
