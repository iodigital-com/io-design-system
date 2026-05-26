import { describe, it, expect } from 'vitest';
import {
  multiSelectStory,
  multiSelectStoryDefault,
  multiSelectStoryWithFilter,
  multiSelectStoryError,
  multiSelectPropDefinitions,
} from './io-multi-select.stories';

describe('io-multi-select storefront stories', () => {
  describe('multiSelectStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => multiSelectStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = multiSelectStory.generator?.(multiSelectStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = multiSelectStory.generator?.(multiSelectStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(multiSelectStory.state.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof multiSelectStory.state.properties).toBe('object');
    });

    it('generator with state=none does not throw', () => {
      expect(() =>
        multiSelectStory.generator?.({ properties: { ...multiSelectStory.state.properties, state: 'none' } })
      ).not.toThrow();
    });

    it('generator with state=error does not throw', () => {
      expect(() =>
        multiSelectStory.generator?.({ properties: { ...multiSelectStory.state.properties, state: 'error' } })
      ).not.toThrow();
    });

    it('generator with state=success does not throw', () => {
      expect(() =>
        multiSelectStory.generator?.({ properties: { ...multiSelectStory.state.properties, state: 'success' } })
      ).not.toThrow();
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        multiSelectStory.generator?.({ properties: { ...multiSelectStory.state.properties, disabled: true } })
      ).not.toThrow();
    });

    it('generator with required=true does not throw', () => {
      expect(() =>
        multiSelectStory.generator?.({ properties: { ...multiSelectStory.state.properties, required: true } })
      ).not.toThrow();
    });

    it('generator with filter=true does not throw', () => {
      expect(() =>
        multiSelectStory.generator?.({ properties: { ...multiSelectStory.state.properties, filter: true } })
      ).not.toThrow();
    });
  });

  describe('multiSelectPropDefinitions', () => {
    it('is non-empty', () => {
      expect(multiSelectPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of multiSelectPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of multiSelectPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of multiSelectPropDefinitions.filter((d) => d.type === 'select')) {
        expect(def.options).toBeDefined();
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of multiSelectPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = multiSelectPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('state select options include none, error, and success', () => {
      const stateDef = multiSelectPropDefinitions.find((d) => d.name === 'state');
      expect(stateDef).toBeDefined();
      expect(stateDef!.options).toContain('none');
      expect(stateDef!.options).toContain('error');
      expect(stateDef!.options).toContain('success');
    });
  });

  describe('multiSelectStoryDefault (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = multiSelectStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = multiSelectStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => multiSelectStoryDefault.generator?.()).not.toThrow();
    });
  });

  describe('multiSelectStoryWithFilter (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = multiSelectStoryWithFilter.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = multiSelectStoryWithFilter.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => multiSelectStoryWithFilter.generator?.()).not.toThrow();
    });
  });

  describe('multiSelectStoryError (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = multiSelectStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = multiSelectStoryError.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => multiSelectStoryError.generator?.()).not.toThrow();
    });
  });
});
