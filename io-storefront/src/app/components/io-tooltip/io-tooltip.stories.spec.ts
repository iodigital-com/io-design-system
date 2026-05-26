import { describe, it, expect } from 'vitest';
import {
  tooltipStory,
  tooltipPropDefinitions,
  tooltipStoryTop,
  tooltipStoryBottom,
  tooltipStoryLeft,
  tooltipStoryRight,
  tooltipStoryLong,
} from './io-tooltip.stories';

describe('io-tooltip storefront stories', () => {
  describe('tooltipStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => tooltipStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = tooltipStory.generator?.(tooltipStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = tooltipStory.generator?.(tooltipStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(tooltipStory.state.properties).toBeDefined();
    });

    it('generator produces io-button as host element', () => {
      const els = tooltipStory.generator?.(tooltipStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-button');
    });

    it('generator sets io-tooltip attribute from content property', () => {
      const els = tooltipStory.generator?.({ properties: { content: 'Custom tip' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip']).toBe('Custom tip');
    });

    it('generator sets io-tooltip-placement attribute from placement property', () => {
      const els = tooltipStory.generator?.({ properties: { placement: 'bottom' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip-placement']).toBe('bottom');
    });

    it('generator defaults io-tooltip to "Tooltip text"', () => {
      const els = tooltipStory.generator?.({}) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip']).toBe('Tooltip text');
    });

    it('generator defaults placement to top', () => {
      const els = tooltipStory.generator?.({}) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip-placement']).toBe('top');
    });

    it('element has children text', () => {
      const els = tooltipStory.generator?.(tooltipStory.state) ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children.length).toBeGreaterThan(0);
    });

    it('state.properties includes content', () => {
      expect((tooltipStory.state.properties as Record<string, unknown>).content).toBeDefined();
    });

    it('state.properties includes placement', () => {
      expect((tooltipStory.state.properties as Record<string, unknown>).placement).toBeDefined();
    });
  });

  describe('tooltipPropDefinitions', () => {
    it('is non-empty', () => {
      expect(tooltipPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of tooltipPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of tooltipPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of tooltipPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of tooltipPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = tooltipPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes content definition of type string', () => {
      const def = tooltipPropDefinitions.find((d) => d.name === 'content');
      expect(def).toBeDefined();
      expect(def!.type).toBe('string');
      expect(def!.defaultValue).toBe('Tooltip text');
    });

    it('includes placement select with top/bottom/left/right', () => {
      const def = tooltipPropDefinitions.find((d) => d.name === 'placement');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(def!.options).toContain('top');
      expect(def!.options).toContain('bottom');
      expect(def!.options).toContain('left');
      expect(def!.options).toContain('right');
      expect(def!.defaultValue).toBe('top');
    });
  });

  describe('tooltipStoryTop', () => {
    it('generator does not throw', () => {
      expect(() => tooltipStoryTop.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tooltipStoryTop.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has io-tooltip-placement=top', () => {
      const els = tooltipStoryTop.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip-placement']).toBe('top');
    });

    it('element has non-empty io-tooltip text', () => {
      const els = tooltipStoryTop.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip']).toBeTruthy();
    });
  });

  describe('tooltipStoryBottom', () => {
    it('generator does not throw', () => {
      expect(() => tooltipStoryBottom.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tooltipStoryBottom.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has io-tooltip-placement=bottom', () => {
      const els = tooltipStoryBottom.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip-placement']).toBe('bottom');
    });
  });

  describe('tooltipStoryLeft', () => {
    it('generator does not throw', () => {
      expect(() => tooltipStoryLeft.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tooltipStoryLeft.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has io-tooltip-placement=left', () => {
      const els = tooltipStoryLeft.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip-placement']).toBe('left');
    });
  });

  describe('tooltipStoryRight', () => {
    it('generator does not throw', () => {
      expect(() => tooltipStoryRight.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tooltipStoryRight.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has io-tooltip-placement=right', () => {
      const els = tooltipStoryRight.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties['io-tooltip-placement']).toBe('right');
    });
  });

  describe('tooltipStoryLong', () => {
    it('generator does not throw', () => {
      expect(() => tooltipStoryLong.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tooltipStoryLong.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has long tooltip text', () => {
      const els = tooltipStoryLong.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      const tooltipText = first.properties['io-tooltip'] as string;
      expect(tooltipText.length).toBeGreaterThan(30);
    });
  });
});
