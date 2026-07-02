import { describe, it, expect } from 'vitest';
import {
  flyoutStory,
  flyoutStoryDefault,
  flyoutStoryLeft,
  flyoutStoryNoHeading,
  flyoutPropDefinitions,
} from './io-flyout.stories';

describe('io-flyout storefront stories', () => {
  describe('flyoutStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => flyoutStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = flyoutStory.generator?.(flyoutStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = flyoutStory.generator?.(flyoutStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(flyoutStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof flyoutStory.state?.properties).toBe('object');
    });

    it('generator with position=start does not throw', () => {
      expect(() =>
        flyoutStory.generator?.({ properties: { ...flyoutStory.state?.properties, position: 'start' } })
      ).not.toThrow();
    });

    it('generator with position=end does not throw', () => {
      expect(() =>
        flyoutStory.generator?.({ properties: { ...flyoutStory.state?.properties, position: 'end' } })
      ).not.toThrow();
    });

    it('generator with open=true does not throw', () => {
      expect(() =>
        flyoutStory.generator?.({ properties: { ...flyoutStory.state?.properties, open: true } })
      ).not.toThrow();
    });

    it('generator with open=false does not throw', () => {
      expect(() =>
        flyoutStory.generator?.({ properties: { ...flyoutStory.state?.properties, open: false } })
      ).not.toThrow();
    });

    it('configurator story produces io-flyout as an element', () => {
      const els = flyoutStory.generator?.(flyoutStory.state) ?? [];
      const flyout = els.find((el) => (el as { tag: string }).tag === 'io-flyout');
      expect(flyout).toBeDefined();
    });
  });

  describe('flyoutPropDefinitions', () => {
    it('is non-empty', () => {
      expect(flyoutPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of flyoutPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of flyoutPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of flyoutPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of flyoutPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = flyoutPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('position select options include start and end', () => {
      const positionDef = flyoutPropDefinitions.find((d) => d.name === 'position');
      expect(positionDef).toBeDefined();
      expect(((positionDef as unknown as { options: string[] })).options).toContain('start');
      expect(((positionDef as unknown as { options: string[] })).options).toContain('end');
    });

    it('heading definition exists as a string type', () => {
      const headingDef = flyoutPropDefinitions.find((d) => d.name === 'heading');
      expect(headingDef).toBeDefined();
      expect(headingDef?.type).toBe('string');
    });
  });

  describe('flyoutStoryDefault (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = flyoutStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = flyoutStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => flyoutStoryDefault.generator?.()).not.toThrow();
    });
  });

  describe('flyoutStoryLeft (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = flyoutStoryLeft.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = flyoutStoryLeft.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => flyoutStoryLeft.generator?.()).not.toThrow();
    });
  });

  describe('flyoutStoryNoHeading (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = flyoutStoryNoHeading.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = flyoutStoryNoHeading.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => flyoutStoryNoHeading.generator?.()).not.toThrow();
    });
  });
});
