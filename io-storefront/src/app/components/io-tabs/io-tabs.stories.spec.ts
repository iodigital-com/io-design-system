import { describe, it, expect } from 'vitest';
import {
  tabsStory,
  tabsPropDefinitions,
  tabsStoryDefault,
  tabsStoryWithDisabled,
  tabsStoryManyTabs,
} from './io-tabs.stories';

describe('io-tabs storefront stories', () => {
  describe('tabsStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => tabsStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = tabsStory.generator?.(tabsStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = tabsStory.generator?.(tabsStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(tabsStory.state?.properties).toBeDefined();
    });

    it('generator produces io-tabs tag', () => {
      const els = tabsStory.generator?.(tabsStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tabs');
    });

    it('generator respects activeTabIndex override', () => {
      const els = tabsStory.generator?.({ properties: { activeTabIndex: 2 } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.activeTabIndex).toBe(2);
    });

    it('generator defaults activeTabIndex to 0', () => {
      const els = tabsStory.generator?.({}) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.activeTabIndex).toBe(0);
    });

    it('generator result includes events with onUpdate', () => {
      const els = tabsStory.generator?.(tabsStory.state) ?? [];
      const first = els[0] as { events?: Record<string, unknown> };
      expect(first.events?.onUpdate).toBeDefined();
    });

    it('onUpdate event targets io-tabs with activeTabIndex prop', () => {
      const els = tabsStory.generator?.(tabsStory.state) ?? [];
      const first = els[0] as unknown as { events: { onUpdate: Record<string, unknown> } };
      expect(first.events.onUpdate.target).toBe('io-tabs');
      expect(first.events.onUpdate.prop).toBe('activeTabIndex');
    });

    it('state.properties includes activeTabIndex', () => {
      expect((tabsStory.state?.properties as Record<string, unknown>).activeTabIndex).toBeDefined();
    });

    it('element has children (tab buttons)', () => {
      const els = tabsStory.generator?.(tabsStory.state) ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children).toBeDefined();
      expect(first.children.length).toBeGreaterThan(0);
    });
  });

  describe('tabsPropDefinitions', () => {
    it('is non-empty', () => {
      expect(tabsPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of tabsPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of tabsPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of tabsPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of tabsPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = tabsPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes activeTabIndex definition of type number', () => {
      const def = tabsPropDefinitions.find((d) => d.name === 'activeTabIndex');
      expect(def).toBeDefined();
      expect(def!.type).toBe('number');
    });

    it('activeTabIndex defaults to 0', () => {
      const def = tabsPropDefinitions.find((d) => d.name === 'activeTabIndex');
      expect(def!.defaultValue).toBe(0);
    });
  });

  describe('tabsStoryDefault', () => {
    it('generator does not throw', () => {
      expect(() => tabsStoryDefault.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tabsStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-tabs tag', () => {
      const els = tabsStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tabs');
    });

    it('activeTabIndex is 0', () => {
      const els = tabsStoryDefault.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.activeTabIndex).toBe(0);
    });
  });

  describe('tabsStoryWithDisabled', () => {
    it('generator does not throw', () => {
      expect(() => tabsStoryWithDisabled.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tabsStoryWithDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-tabs tag', () => {
      const els = tabsStoryWithDisabled.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tabs');
    });

    it('has a disabled child button', () => {
      const els = tabsStoryWithDisabled.generator?.() ?? [];
      const first = els[0] as { children: Array<{ properties: Record<string, unknown> }> };
      const disabledChild = first.children.find((c) => c.properties?.disabled === true);
      expect(disabledChild).toBeDefined();
    });
  });

  describe('tabsStoryManyTabs', () => {
    it('generator does not throw', () => {
      expect(() => tabsStoryManyTabs.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tabsStoryManyTabs.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-tabs tag', () => {
      const els = tabsStoryManyTabs.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tabs');
    });

    it('has 5 tab children', () => {
      const els = tabsStoryManyTabs.generator?.() ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children.length).toBe(5);
    });
  });
});
