import { describe, it, expect } from 'vitest';
import {
  sheetStory,
  sheetStoryDefault,
  sheetStoryWithFooter,
  sheetStoryNonDismissible,
  sheetPropDefinitions,
} from './io-sheet.stories';

describe('io-sheet storefront stories', () => {
  describe('sheetStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => sheetStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = sheetStory.generator?.(sheetStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = sheetStory.generator?.(sheetStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(sheetStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof sheetStory.state?.properties).toBe('object');
    });

    it('generator with open=true does not throw', () => {
      expect(() =>
        sheetStory.generator?.({ properties: { ...sheetStory.state?.properties, open: true } })
      ).not.toThrow();
    });

    it('generator with open=false does not throw', () => {
      expect(() =>
        sheetStory.generator?.({ properties: { ...sheetStory.state?.properties, open: false } })
      ).not.toThrow();
    });

    it('generator with dismissible=false does not throw', () => {
      expect(() =>
        sheetStory.generator?.({ properties: { ...sheetStory.state?.properties, dismissible: false } })
      ).not.toThrow();
    });

    it('generator with dismissible=true does not throw', () => {
      expect(() =>
        sheetStory.generator?.({ properties: { ...sheetStory.state?.properties, dismissible: true } })
      ).not.toThrow();
    });

    it('configurator story produces io-sheet as an element', () => {
      const els = sheetStory.generator?.(sheetStory.state) ?? [];
      const sheet = els.find((el) => (el as { tag: string }).tag === 'io-sheet');
      expect(sheet).toBeDefined();
    });
  });

  describe('sheetPropDefinitions', () => {
    it('is non-empty', () => {
      expect(sheetPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of sheetPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of sheetPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of sheetPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = sheetPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('heading definition exists as a string type', () => {
      const headingDef = sheetPropDefinitions.find((d) => d.name === 'heading');
      expect(headingDef).toBeDefined();
      expect(headingDef?.type).toBe('string');
    });

    it('dismissible definition exists as a boolean type', () => {
      const dismissibleDef = sheetPropDefinitions.find((d) => d.name === 'dismissible');
      expect(dismissibleDef).toBeDefined();
      expect(dismissibleDef?.type).toBe('boolean');
    });
  });

  describe('sheetStoryDefault (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = sheetStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = sheetStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => sheetStoryDefault.generator?.()).not.toThrow();
    });
  });

  describe('sheetStoryWithFooter (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = sheetStoryWithFooter.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = sheetStoryWithFooter.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => sheetStoryWithFooter.generator?.()).not.toThrow();
    });
  });

  describe('sheetStoryNonDismissible (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = sheetStoryNonDismissible.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = sheetStoryNonDismissible.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => sheetStoryNonDismissible.generator?.()).not.toThrow();
    });
  });
});
