import { describe, it, expect } from 'vitest';
import {
  iconStory,
  iconPropDefinitions,
  iconStoryAllIcons,
  iconStorySizes,
  iconStoryColour,
  iconStoryInheritSize,
  iconStoryFixedWidth,
  iconStoryFormActions,
  iconStoryWysiwygFormat,
  iconStoryWysiwygStructure,
  iconStoryWysiwygInsert,
  iconStoryWysiwygTables,
  iconStoryWysiwygHistory,
  IO_ICON_NAMES,
} from './io-icon.stories';

describe('io-icon storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('iconStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => iconStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = iconStory.generator?.(iconStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = iconStory.generator?.(iconStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(iconStory.state?.properties).toBeDefined();
    });

    it('configurator story produces io-icon as root element', () => {
      const els = iconStory.generator?.(iconStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-icon');
    });

    it('default state has name property', () => {
      expect(iconStory.state?.properties?.name).toBeDefined();
    });

    it('default state has size property', () => {
      expect(iconStory.state?.properties?.size).toBeDefined();
    });

    it('generator with name=search does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'search' } }),
      ).not.toThrow();
    });

    it('generator with name=check does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'check' } }),
      ).not.toThrow();
    });

    it('generator with name=x does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'x' } }),
      ).not.toThrow();
    });

    it('generator with name=info does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'info' } }),
      ).not.toThrow();
    });

    it('generator with name=alert-triangle does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'alert-triangle' } }),
      ).not.toThrow();
    });

    it('generator with name=chevron-down does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'chevron-down' } }),
      ).not.toThrow();
    });

    it('generator with name=arrow-right does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'arrow-right' } }),
      ).not.toThrow();
    });

    it('generator with name=settings does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'settings' } }),
      ).not.toThrow();
    });

    it('generator with name=user does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'user' } }),
      ).not.toThrow();
    });

    it('generator with name=loader does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, name: 'loader' } }),
      ).not.toThrow();
    });

    it('generator with size=xs does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, size: 'xs' } }),
      ).not.toThrow();
    });

    it('generator with size=sm does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, size: 'sm' } }),
      ).not.toThrow();
    });

    it('generator with size=md does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, size: 'md' } }),
      ).not.toThrow();
    });

    it('generator with size=lg does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, size: 'lg' } }),
      ).not.toThrow();
    });

    it('generator with size=xl does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, size: 'xl' } }),
      ).not.toThrow();
    });

    it('generator with label set does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { ...iconStory.state?.properties, label: 'Search' } }),
      ).not.toThrow();
    });

    it('generator with label omitted does not throw', () => {
      expect(() =>
        iconStory.generator?.({ properties: { name: 'search', size: 'md' } }),
      ).not.toThrow();
    });
  });

  // ── IO_ICON_NAMES constant ───────────────────────────────────────────────
  describe('IO_ICON_NAMES', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(IO_ICON_NAMES)).toBe(true);
      expect(IO_ICON_NAMES.length).toBeGreaterThan(0);
    });

    it('contains search', () => {
      expect(IO_ICON_NAMES).toContain('search');
    });

    it('contains x', () => {
      expect(IO_ICON_NAMES).toContain('x');
    });

    it('contains check', () => {
      expect(IO_ICON_NAMES).toContain('check');
    });

    it('contains chevron-down', () => {
      expect(IO_ICON_NAMES).toContain('chevron-down');
    });

    it('contains alert-triangle', () => {
      expect(IO_ICON_NAMES).toContain('alert-triangle');
    });

    it('has no duplicate names', () => {
      const unique = new Set(IO_ICON_NAMES);
      expect(unique.size).toBe(IO_ICON_NAMES.length);
    });

    it('contains save', () => { expect(IO_ICON_NAMES).toContain('save'); });
    it('contains pen-line', () => { expect(IO_ICON_NAMES).toContain('pen-line'); });
    it('contains trash', () => { expect(IO_ICON_NAMES).toContain('trash'); });
    it('contains bold', () => { expect(IO_ICON_NAMES).toContain('bold'); });
    it('contains italic', () => { expect(IO_ICON_NAMES).toContain('italic'); });
    it('contains heading-1', () => { expect(IO_ICON_NAMES).toContain('heading-1'); });
    it('contains list', () => { expect(IO_ICON_NAMES).toContain('list'); });
    it('contains table', () => { expect(IO_ICON_NAMES).toContain('table'); });
    it('contains undo-2', () => { expect(IO_ICON_NAMES).toContain('undo-2'); });
    it('contains align-left', () => { expect(IO_ICON_NAMES).toContain('align-left'); });

    it('every name is a non-empty string', () => {
      for (const name of IO_ICON_NAMES) {
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);
      }
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('iconPropDefinitions', () => {
    it('is non-empty', () => {
      expect(iconPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of iconPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of iconPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of iconPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of iconPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = iconPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });

    it('includes name definition', () => {
      expect(iconPropDefinitions.find((d) => d.name === 'name')).toBeDefined();
    });

    it('includes size definition', () => {
      expect(iconPropDefinitions.find((d) => d.name === 'size')).toBeDefined();
    });

    it('includes label definition', () => {
      expect(iconPropDefinitions.find((d) => d.name === 'label')).toBeDefined();
    });

    it('name definition options include all IO_ICON_NAMES entries', () => {
      const nameDef = iconPropDefinitions.find((d) => d.name === 'name');
      const opts = (nameDef as unknown as { options: string[] })?.options ?? [];
      for (const iconName of IO_ICON_NAMES) {
        expect(opts).toContain(iconName);
      }
    });

    it('size definition options contain md', () => {
      const sizeDef = iconPropDefinitions.find((d) => d.name === 'size');
      const opts = (sizeDef as unknown as { options: string[] })?.options ?? [];
      expect(opts).toContain('md');
    });

    it('size definition options contain inherit', () => {
      const sizeDef = iconPropDefinitions.find((d) => d.name === 'size');
      const opts = (sizeDef as unknown as { options: string[] })?.options ?? [];
      expect(opts).toContain('inherit');
    });

    it('includes fixedWidth definition', () => {
      expect(iconPropDefinitions.find((d) => d.name === 'fixedWidth')).toBeDefined();
    });

    it('fixedWidth definition is boolean type', () => {
      const def = iconPropDefinitions.find((d) => d.name === 'fixedWidth');
      expect(def?.type).toBe('boolean');
    });
  });

  // ── Named stories ───────────────────────────────────────────────────────
  describe('iconStoryAllIcons', () => {
    it('generator returns non-empty array', () => {
      const els = iconStoryAllIcons.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('returns one element per icon name', () => {
      const els = iconStoryAllIcons.generator?.() ?? [];
      expect(els.length).toBe(IO_ICON_NAMES.length);
    });

    it('every returned element has tag=io-icon', () => {
      const els = iconStoryAllIcons.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect((el as { tag: string }).tag).toBe('io-icon');
        }
      }
    });

    it('does not throw with no args', () => {
      expect(() => iconStoryAllIcons.generator?.()).not.toThrow();
    });
  });

  describe('iconStorySizes', () => {
    it('generator returns non-empty array', () => {
      const els = iconStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('returns 5 elements for all size variants', () => {
      const els = iconStorySizes.generator?.() ?? [];
      expect(els.length).toBe(5);
    });

    it('every returned element has a tag', () => {
      const els = iconStorySizes.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw with no args', () => {
      expect(() => iconStorySizes.generator?.()).not.toThrow();
    });
  });

  describe('iconStoryColour', () => {
    it('generator returns non-empty array', () => {
      const els = iconStoryColour.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has tag=io-icon', () => {
      const els = iconStoryColour.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect((el as { tag: string }).tag).toBe('io-icon');
        }
      }
    });

    it('does not throw with no args', () => {
      expect(() => iconStoryColour.generator?.()).not.toThrow();
    });
  });

  // ── New prop stories ─────────────────────────────────────────────────────
  describe('iconStoryInheritSize', () => {
    it('generator returns non-empty array', () => {
      const els = iconStoryInheritSize.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every child icon has size=inherit', () => {
      const els = iconStoryInheritSize.generator?.() ?? [];
      for (const el of els) {
        const wrapper = el as { children?: Array<{ properties?: { size?: string } }> };
        const icon = wrapper.children?.find((c) => typeof c === 'object' && c !== null && 'properties' in c);
        expect((icon as { properties: { size: string } })?.properties?.size).toBe('inherit');
      }
    });

    it('does not throw with no args', () => {
      expect(() => iconStoryInheritSize.generator?.()).not.toThrow();
    });
  });

  describe('iconStoryFixedWidth', () => {
    it('generator returns non-empty array', () => {
      const els = iconStoryFixedWidth.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every element has fixedWidth=true', () => {
      const els = iconStoryFixedWidth.generator?.() ?? [];
      for (const el of els) {
        expect((el as { properties: { fixedWidth: boolean } }).properties.fixedWidth).toBe(true);
      }
    });

    it('does not throw with no args', () => {
      expect(() => iconStoryFixedWidth.generator?.()).not.toThrow();
    });
  });

  // ── Category stories (form / WYSIWYG) ───────────────────────────────────
  const categoryStories = [
    { name: 'iconStoryFormActions', story: iconStoryFormActions },
    { name: 'iconStoryWysiwygFormat', story: iconStoryWysiwygFormat },
    { name: 'iconStoryWysiwygStructure', story: iconStoryWysiwygStructure },
    { name: 'iconStoryWysiwygInsert', story: iconStoryWysiwygInsert },
    { name: 'iconStoryWysiwygTables', story: iconStoryWysiwygTables },
    { name: 'iconStoryWysiwygHistory', story: iconStoryWysiwygHistory },
  ];

  for (const { name, story } of categoryStories) {
    describe(name, () => {
      it('generator returns non-empty array', () => {
        const els = story.generator?.();
        expect(Array.isArray(els)).toBe(true);
        expect(els!.length).toBeGreaterThan(0);
      });

      it('every element has tag=io-icon', () => {
        const els = story.generator?.() ?? [];
        for (const el of els) {
          if (el && typeof el === 'object' && 'tag' in el) {
            expect((el as { tag: string }).tag).toBe('io-icon');
          }
        }
      });

      it('does not throw with no args', () => {
        expect(() => story.generator?.()).not.toThrow();
      });
    });
  }
});
