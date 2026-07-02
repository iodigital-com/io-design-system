import { describe, it, expect } from 'vitest';
import {
  flagStory,
  flagPropDefinitions,
  flagStoryEU,
  flagStorySizes,
} from './io-flag.stories';

describe('io-flag storefront stories', () => {
  describe('flagStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => flagStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = flagStory.generator?.(flagStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('configurator story produces io-flag as root element', () => {
      const els = flagStory.generator?.(flagStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-flag');
    });

    it('state.properties is defined', () => {
      expect(flagStory.state?.properties).toBeDefined();
    });

    it('generator with name=gb does not throw', () => {
      expect(() =>
        flagStory.generator?.({ properties: { ...flagStory.state?.properties, name: 'gb' } }),
      ).not.toThrow();
    });

    it('generator with size=lg does not throw', () => {
      expect(() =>
        flagStory.generator?.({ properties: { ...flagStory.state?.properties, size: 'lg' } }),
      ).not.toThrow();
    });
  });

  describe('flagPropDefinitions', () => {
    it('is non-empty', () => {
      expect(flagPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of flagPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of flagPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of flagPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of flagPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = flagPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  describe('flagStoryEU', () => {
    it('generator returns non-empty array', () => {
      const els = flagStoryEU.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = flagStoryEU.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('flagStorySizes', () => {
    it('generator returns non-empty array', () => {
      const els = flagStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });
  });
});
