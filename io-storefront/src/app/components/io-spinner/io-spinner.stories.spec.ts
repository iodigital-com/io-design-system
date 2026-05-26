import { describe, it, expect } from 'vitest';
import {
  spinnerStory,
  spinnerPropDefinitions,
  spinnerStorySm,
  spinnerStoryMd,
  spinnerStoryLg,
  spinnerStoryWhite,
  spinnerStoryCurrent,
} from './io-spinner.stories';

describe('io-spinner storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────────

  describe('spinnerStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => spinnerStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = spinnerStory.generator?.(spinnerStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = spinnerStory.generator?.(spinnerStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(spinnerStory.state.properties).toBeDefined();
    });

    it('first element has tag io-spinner', () => {
      const els = spinnerStory.generator?.(spinnerStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-spinner');
    });

    it('generator forwards size from properties', () => {
      const els = spinnerStory.generator?.({ properties: { size: 'lg' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('lg');
    });

    it('generator forwards color from properties', () => {
      const els = spinnerStory.generator?.({ properties: { color: 'white' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.color).toBe('white');
    });

    it('generator forwards label from properties', () => {
      const els = spinnerStory.generator?.({ properties: { label: 'Saving…' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Saving…');
    });
  });

  // ── propDefinitions ────────────────────────────────────────────────────────

  describe('spinnerPropDefinitions', () => {
    it('is non-empty', () => {
      expect(spinnerPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of spinnerPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of spinnerPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of spinnerPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of spinnerPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = spinnerPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('contains expected prop names', () => {
      const names = spinnerPropDefinitions.map((d) => d.name);
      expect(names).toContain('size');
      expect(names).toContain('color');
      expect(names).toContain('label');
    });

    it('size prop has sm, md, lg options', () => {
      const sizeDef = spinnerPropDefinitions.find((d) => d.name === 'size');
      expect(sizeDef?.options).toEqual(expect.arrayContaining(['sm', 'md', 'lg']));
    });

    it('color prop has primary, white, current options', () => {
      const colorDef = spinnerPropDefinitions.find((d) => d.name === 'color');
      expect(colorDef?.options).toEqual(expect.arrayContaining(['primary', 'white', 'current']));
    });

    it('calling generator with each select option does not throw', () => {
      for (const def of spinnerPropDefinitions.filter((d) => d.type === 'select')) {
        for (const option of def.options as string[]) {
          expect(() =>
            spinnerStory.generator?.({ properties: { [def.name]: option } }),
          ).not.toThrow();
        }
      }
    });
  });

  // ── Named stories ──────────────────────────────────────────────────────────

  describe('spinnerStorySm', () => {
    it('generator returns non-empty array', () => {
      const els = spinnerStorySm.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(spinnerStorySm.state.properties).toBeDefined();
    });

    it('uses sm size', () => {
      const els = spinnerStorySm.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('sm');
    });
  });

  describe('spinnerStoryMd', () => {
    it('generator returns non-empty array', () => {
      const els = spinnerStoryMd.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('uses md size', () => {
      const els = spinnerStoryMd.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('md');
    });
  });

  describe('spinnerStoryLg', () => {
    it('generator returns non-empty array', () => {
      const els = spinnerStoryLg.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('uses lg size', () => {
      const els = spinnerStoryLg.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('lg');
    });
  });

  describe('spinnerStoryWhite', () => {
    it('generator returns non-empty array', () => {
      const els = spinnerStoryWhite.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('uses white color', () => {
      const els = spinnerStoryWhite.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.color).toBe('white');
    });
  });

  describe('spinnerStoryCurrent', () => {
    it('generator returns non-empty array', () => {
      const els = spinnerStoryCurrent.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('uses current color', () => {
      const els = spinnerStoryCurrent.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.color).toBe('current');
    });
  });
});
