import { describe, it, expect } from 'vitest';
import {
  tabPanelStory,
  tabPanelPropDefinitions,
  tabPanelStoryDefault,
  tabPanelStoryHidden,
} from './io-tab-panel.stories';

describe('io-tab-panel storefront stories', () => {
  describe('tabPanelStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => tabPanelStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = tabPanelStory.generator?.(tabPanelStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = tabPanelStory.generator?.(tabPanelStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(tabPanelStory.state?.properties).toBeDefined();
    });

    it('generator produces io-tab-panel tag', () => {
      const els = tabPanelStory.generator?.(tabPanelStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tab-panel');
    });

    it('generator respects label override', () => {
      const els = tabPanelStory.generator?.({ properties: { label: 'Details' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Details');
    });

    it('generator defaults label to Overview', () => {
      const els = tabPanelStory.generator?.({}) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Overview');
    });
  });

  describe('tabPanelPropDefinitions', () => {
    it('is non-empty', () => {
      expect(tabPanelPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of tabPanelPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of tabPanelPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of tabPanelPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = tabPanelPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes label definition of type string', () => {
      const def = tabPanelPropDefinitions.find((d) => d.name === 'label');
      expect(def).toBeDefined();
      expect(def!.type).toBe('string');
    });

    it('includes hidden definition of type boolean', () => {
      const def = tabPanelPropDefinitions.find((d) => d.name === 'hidden');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });
  });

  describe('tabPanelStoryDefault', () => {
    it('generator does not throw', () => {
      expect(() => tabPanelStoryDefault.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tabPanelStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-tab-panel tag', () => {
      const els = tabPanelStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tab-panel');
    });
  });

  describe('tabPanelStoryHidden', () => {
    it('generator does not throw', () => {
      expect(() => tabPanelStoryHidden.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tabPanelStoryHidden.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('panel is hidden', () => {
      const els = tabPanelStoryHidden.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.hidden).toBe(true);
    });
  });
});
