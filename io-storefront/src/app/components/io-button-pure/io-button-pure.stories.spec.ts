import { describe, it, expect } from 'vitest';
import {
  buttonPureStory,
  buttonPurePropDefinitions,
  buttonPureStoryStates,
  buttonPureStoryAlignLabel,
} from './io-button-pure.stories';

describe('io-button-pure storefront stories', () => {
  describe('buttonPureStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => buttonPureStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = buttonPureStory.generator?.(buttonPureStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('configurator story produces io-button-pure as root element', () => {
      const els = buttonPureStory.generator?.(buttonPureStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-button-pure');
    });

    it('state.properties is defined', () => {
      expect(buttonPureStory.state?.properties).toBeDefined();
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        buttonPureStory.generator?.({ properties: { ...buttonPureStory.state?.properties, disabled: true } }),
      ).not.toThrow();
    });

    it('generator with underline=true does not throw', () => {
      expect(() =>
        buttonPureStory.generator?.({ properties: { ...buttonPureStory.state?.properties, underline: true } }),
      ).not.toThrow();
    });

    it('generator with alignLabel=end does not throw', () => {
      expect(() =>
        buttonPureStory.generator?.({ properties: { ...buttonPureStory.state?.properties, alignLabel: 'end' } }),
      ).not.toThrow();
    });
  });

  describe('buttonPurePropDefinitions', () => {
    it('is non-empty', () => {
      expect(buttonPurePropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of buttonPurePropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of buttonPurePropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of buttonPurePropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of buttonPurePropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = buttonPurePropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  describe('buttonPureStoryStates', () => {
    it('generator returns non-empty array', () => {
      const els = buttonPureStoryStates.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });
  });

  describe('buttonPureStoryAlignLabel', () => {
    it('generator returns non-empty array', () => {
      const els = buttonPureStoryAlignLabel.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });
  });
});
