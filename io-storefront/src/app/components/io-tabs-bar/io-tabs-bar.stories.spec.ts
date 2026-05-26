import { describe, it, expect } from 'vitest';
import {
  tabsBarStory,
  tabsBarPropDefinitions,
  tabsBarStoryDefault,
  tabsBarStoryWithDisabled,
  tabsBarStoryManyTabs,
} from './io-tabs-bar.stories';

describe('io-tabs-bar storefront stories', () => {
  describe('tabsBarStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => tabsBarStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = tabsBarStory.generator?.(tabsBarStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = tabsBarStory.generator?.(tabsBarStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(tabsBarStory.state?.properties).toBeDefined();
    });

    it('generator produces io-tabs-bar tag', () => {
      const els = tabsBarStory.generator?.(tabsBarStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tabs-bar');
    });

    it('generator respects activeTabIndex override', () => {
      const els = tabsBarStory.generator?.({ properties: { activeTabIndex: 1 } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.activeTabIndex).toBe(1);
    });

    it('generator defaults activeTabIndex to 0', () => {
      const els = tabsBarStory.generator?.({}) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.activeTabIndex).toBe(0);
    });

    it('generator result includes events with onUpdate', () => {
      const els = tabsBarStory.generator?.(tabsBarStory.state) ?? [];
      const first = els[0] as { events?: Record<string, unknown> };
      expect(first.events?.onUpdate).toBeDefined();
    });

    it('onUpdate event targets io-tabs-bar with activeTabIndex prop', () => {
      const els = tabsBarStory.generator?.(tabsBarStory.state) ?? [];
      const first = els[0] as unknown as { events: { onUpdate: Record<string, unknown> } };
      expect(first.events.onUpdate.target).toBe('io-tabs-bar');
      expect(first.events.onUpdate.prop).toBe('activeTabIndex');
    });

    it('state.properties includes activeTabIndex', () => {
      expect((tabsBarStory.state?.properties as Record<string, unknown>).activeTabIndex).toBeDefined();
    });

    it('element has children (tab buttons)', () => {
      const els = tabsBarStory.generator?.(tabsBarStory.state) ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children).toBeDefined();
      expect(first.children.length).toBeGreaterThan(0);
    });
  });

  describe('tabsBarPropDefinitions', () => {
    it('is non-empty', () => {
      expect(tabsBarPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of tabsBarPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of tabsBarPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of tabsBarPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of tabsBarPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = tabsBarPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes activeTabIndex definition of type number', () => {
      const def = tabsBarPropDefinitions.find((d) => d.name === 'activeTabIndex');
      expect(def).toBeDefined();
      expect(def!.type).toBe('number');
    });

    it('activeTabIndex defaults to 0', () => {
      const def = tabsBarPropDefinitions.find((d) => d.name === 'activeTabIndex');
      expect(def!.defaultValue).toBe(0);
    });
  });

  describe('tabsBarStoryDefault', () => {
    it('generator does not throw', () => {
      expect(() => tabsBarStoryDefault.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tabsBarStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-tabs-bar tag', () => {
      const els = tabsBarStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tabs-bar');
    });

    it('activeTabIndex is 0', () => {
      const els = tabsBarStoryDefault.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.activeTabIndex).toBe(0);
    });
  });

  describe('tabsBarStoryWithDisabled', () => {
    it('generator does not throw', () => {
      expect(() => tabsBarStoryWithDisabled.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tabsBarStoryWithDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-tabs-bar tag', () => {
      const els = tabsBarStoryWithDisabled.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tabs-bar');
    });

    it('has a disabled child button', () => {
      const els = tabsBarStoryWithDisabled.generator?.() ?? [];
      const first = els[0] as { children: Array<{ properties: Record<string, unknown> }> };
      const disabledChild = first.children.find((c) => c.properties?.disabled === true);
      expect(disabledChild).toBeDefined();
    });
  });

  describe('tabsBarStoryManyTabs', () => {
    it('generator does not throw', () => {
      expect(() => tabsBarStoryManyTabs.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = tabsBarStoryManyTabs.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-tabs-bar tag', () => {
      const els = tabsBarStoryManyTabs.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-tabs-bar');
    });

    it('has 5 tab children', () => {
      const els = tabsBarStoryManyTabs.generator?.() ?? [];
      const first = els[0] as { children: unknown[] };
      expect(first.children.length).toBe(5);
    });
  });
});
