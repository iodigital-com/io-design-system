import { describe, it, expect } from 'vitest';
import {
  segmentedControlStory,
  segmentedControlPropDefinitions,
  segmentedControlStoryDefault,
  segmentedControlStoryPreselected,
  segmentedControlStoryTwoOptions,
  segmentedControlStoryDisabled,
} from './io-segmented-control.stories';

describe('io-segmented-control storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────────

  describe('segmentedControlStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => segmentedControlStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = segmentedControlStory.generator?.(segmentedControlStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = segmentedControlStory.generator?.(segmentedControlStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(segmentedControlStory.state?.properties).toBeDefined();
    });

    it('first element has tag io-segmented-control', () => {
      const els = segmentedControlStory.generator?.(segmentedControlStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-segmented-control');
    });

    it('generator produces children array', () => {
      const els = segmentedControlStory.generator?.(segmentedControlStory.state) ?? [];
      const first = els[0] as { children?: unknown[] };
      expect(Array.isArray(first.children)).toBe(true);
      expect(first.children!.length).toBeGreaterThan(0);
    });

    it('generator forwards properties to root element', () => {
      const els =
        segmentedControlStory.generator?.({
          properties: { value: 'grid', name: 'test' },
        }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.value).toBe('grid');
      expect(first.properties.name).toBe('test');
    });

    it('children are io-segment elements', () => {
      const els = segmentedControlStory.generator?.(segmentedControlStory.state) ?? [];
      const first = els[0] as { children: Array<{ tag: string }> };
      expect(first.children.every((c) => c.tag === 'io-segment')).toBe(true);
    });
  });

  // ── propDefinitions ────────────────────────────────────────────────────────

  describe('segmentedControlPropDefinitions', () => {
    it('is non-empty', () => {
      expect(segmentedControlPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of segmentedControlPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of segmentedControlPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of segmentedControlPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = segmentedControlPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('contains expected prop names', () => {
      const names = segmentedControlPropDefinitions.map((d) => d.name);
      expect(names).toContain('value');
      expect(names).toContain('name');
      expect(names).toContain('disabled');
    });

    it('calling generator with each select option does not throw', () => {
      for (const def of segmentedControlPropDefinitions.filter((d) => d.type === 'select')) {
        for (const option of (def as unknown as { options: string[] }).options) {
          expect(() =>
            segmentedControlStory.generator?.({ properties: { [def.name]: option } }),
          ).not.toThrow();
        }
      }
    });
  });

  // ── Named stories ──────────────────────────────────────────────────────────

  describe('segmentedControlStoryDefault', () => {
    it('generator returns non-empty array', () => {
      const els = segmentedControlStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(segmentedControlStoryDefault.state?.properties).toBeDefined();
    });

    it('first element has tag io-segmented-control', () => {
      const els = segmentedControlStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-segmented-control');
    });

    it('has io-segment children', () => {
      const els = segmentedControlStoryDefault.generator?.() ?? [];
      const first = els[0] as { children: Array<{ tag: string }> };
      expect(first.children.every((c) => c.tag === 'io-segment')).toBe(true);
    });
  });

  describe('segmentedControlStoryPreselected', () => {
    it('generator returns non-empty array', () => {
      const els = segmentedControlStoryPreselected.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has a value set', () => {
      const els = segmentedControlStoryPreselected.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.value).toBeTruthy();
    });
  });

  describe('segmentedControlStoryTwoOptions', () => {
    it('generator returns non-empty array', () => {
      const els = segmentedControlStoryTwoOptions.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has exactly two io-segment children', () => {
      const els = segmentedControlStoryTwoOptions.generator?.() ?? [];
      const first = els[0] as { children: Array<{ tag: string }> };
      expect(first.children.length).toBe(2);
    });
  });

  describe('segmentedControlStoryDisabled', () => {
    it('generator returns non-empty array', () => {
      const els = segmentedControlStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has disabled true', () => {
      const els = segmentedControlStoryDisabled.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });
  });
});
