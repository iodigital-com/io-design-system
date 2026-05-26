import { describe, it, expect } from 'vitest';
import {
  tableStory,
  tablePropDefinitions,
  tableStoryBasic,
  tableStorySortable,
  tableStorySelectable,
  tableStoryFull,
  tableStorySizes,
} from './io-table.stories';

describe('io-table storefront stories', () => {
  describe('tableStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => tableStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = tableStory.generator?.(tableStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = tableStory.generator?.(tableStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(tableStory.state.properties).toBeDefined();
    });

    it('generator produces io-table tag', () => {
      const els = tableStory.generator?.(tableStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-table');
    });

    it('generator uses default caption when none provided', () => {
      const els = tableStory.generator?.({}) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.caption).toBe('Team members');
    });

    it('generator respects caption override', () => {
      const els = tableStory.generator?.({ properties: { caption: 'Custom caption' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.caption).toBe('Custom caption');
    });

    it('generator respects size override', () => {
      const els = tableStory.generator?.({ properties: { size: 'sm' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('sm');
    });

    it('generator respects sticky override', () => {
      const els = tableStory.generator?.({ properties: { sticky: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.sticky).toBe(true);
    });

    it('generator produces table with children (head and body)', () => {
      const els = tableStory.generator?.(tableStory.state) ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children).toBeDefined();
      expect(first.children.length).toBeGreaterThan(0);
    });

    it('state.properties includes caption', () => {
      expect((tableStory.state.properties as Record<string, unknown>).caption).toBeDefined();
    });

    it('state.properties includes size', () => {
      expect((tableStory.state.properties as Record<string, unknown>).size).toBeDefined();
    });

    it('state.properties includes captionHidden', () => {
      expect((tableStory.state.properties as Record<string, unknown>).captionHidden).toBeDefined();
    });

    it('state.properties includes sticky', () => {
      expect((tableStory.state.properties as Record<string, unknown>).sticky).toBeDefined();
    });
  });

  describe('tablePropDefinitions', () => {
    it('is non-empty', () => {
      expect(tablePropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of tablePropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of tablePropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of tablePropDefinitions.filter((d) => d.type === 'select')) {
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of tablePropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = tablePropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes caption definition', () => {
      const captionDef = tablePropDefinitions.find((d) => d.name === 'caption');
      expect(captionDef).toBeDefined();
      expect(captionDef!.type).toBe('string');
    });

    it('includes captionHidden definition', () => {
      const def = tablePropDefinitions.find((d) => d.name === 'captionHidden');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });

    it('includes sticky definition', () => {
      const def = tablePropDefinitions.find((d) => d.name === 'sticky');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });

    it('includes size definition with sm/md/lg options', () => {
      const def = tablePropDefinitions.find((d) => d.name === 'size');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(def!.options).toContain('sm');
      expect(def!.options).toContain('md');
      expect(def!.options).toContain('lg');
    });

    it('size defaults to md', () => {
      const def = tablePropDefinitions.find((d) => d.name === 'size');
      expect(def!.defaultValue).toBe('md');
    });
  });

  describe('tableStoryBasic', () => {
    it('generator does not throw', () => {
      expect(() => tableStoryBasic.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tableStoryBasic.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-table tag', () => {
      const els = tableStoryBasic.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-table');
    });

    it('table has caption', () => {
      const els = tableStoryBasic.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.caption).toBeTruthy();
    });
  });

  describe('tableStorySortable', () => {
    it('generator does not throw', () => {
      expect(() => tableStorySortable.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tableStorySortable.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-table tag', () => {
      const els = tableStorySortable.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-table');
    });

    it('table has children', () => {
      const els = tableStorySortable.generator?.() ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children.length).toBeGreaterThan(0);
    });
  });

  describe('tableStorySelectable', () => {
    it('generator does not throw', () => {
      expect(() => tableStorySelectable.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tableStorySelectable.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-table tag', () => {
      const els = tableStorySelectable.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-table');
    });
  });

  describe('tableStoryFull', () => {
    it('generator does not throw', () => {
      expect(() => tableStoryFull.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tableStoryFull.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-table tag', () => {
      const els = tableStoryFull.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-table');
    });
  });

  describe('tableStorySizes', () => {
    it('generator does not throw', () => {
      expect(() => tableStorySizes.generator?.()).not.toThrow();
    });

    it('generator returns multiple elements (one per size)', () => {
      const els = tableStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(3);
    });

    it('each element is an io-table', () => {
      const els = tableStorySizes.generator?.() ?? [];
      for (const el of els) {
        expect((el as { tag: string }).tag).toBe('io-table');
      }
    });

    it('elements cover all three sizes sm/md/lg', () => {
      const els = tableStorySizes.generator?.() ?? [];
      const sizes = els.map((el) => (el as { properties: Record<string, unknown> }).properties.size);
      expect(sizes).toContain('sm');
      expect(sizes).toContain('md');
      expect(sizes).toContain('lg');
    });
  });
});
