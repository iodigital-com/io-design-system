import { describe, it, expect } from 'vitest';
import {
  checkboxGroupStory,
  checkboxGroupStoryDefault,
  checkboxGroupStoryPreChecked,
  checkboxGroupStoryWithHelper,
  checkboxGroupStoryError,
  checkboxGroupStoryDisabled,
  checkboxGroupPropDefinitions,
} from './io-checkbox-group.stories';

describe('io-checkbox-group storefront stories', () => {
  describe('checkboxGroupStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => checkboxGroupStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = checkboxGroupStory.generator?.(checkboxGroupStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxGroupStory.generator?.(checkboxGroupStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(checkboxGroupStory.state.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof checkboxGroupStory.state.properties).toBe('object');
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, disabled: true } }),
      ).not.toThrow();
    });

    it('generator with disabled=false does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, disabled: false } }),
      ).not.toThrow();
    });

    it('generator with error=true does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, error: true } }),
      ).not.toThrow();
    });

    it('generator with error=false does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, error: false } }),
      ).not.toThrow();
    });

    it('generator with required=true does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, required: true } }),
      ).not.toThrow();
    });

    it('generator with required=false does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, required: false } }),
      ).not.toThrow();
    });

    it('generator with empty label does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, label: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty label does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, label: 'Preferences' } }),
      ).not.toThrow();
    });

    it('generator with empty name does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, name: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty name does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, name: 'prefs' } }),
      ).not.toThrow();
    });

    it('generator with empty helperText does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, helperText: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty helperText does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({
          properties: { ...checkboxGroupStory.state.properties, helperText: 'Select all that apply.' },
        }),
      ).not.toThrow();
    });

    it('generator with empty errorMessage does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({ properties: { ...checkboxGroupStory.state.properties, errorMessage: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty errorMessage does not throw', () => {
      expect(() =>
        checkboxGroupStory.generator?.({
          properties: { ...checkboxGroupStory.state.properties, errorMessage: 'Please select at least one option.' },
        }),
      ).not.toThrow();
    });
  });

  describe('checkboxGroupPropDefinitions', () => {
    it('is non-empty', () => {
      expect(checkboxGroupPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of checkboxGroupPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of checkboxGroupPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of checkboxGroupPropDefinitions.filter((d) => d.type === 'select')) {
        expect(def.options).toBeDefined();
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of checkboxGroupPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = checkboxGroupPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });
  });

  describe('checkboxGroupStoryDefault (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = checkboxGroupStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxGroupStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => checkboxGroupStoryDefault.generator?.()).not.toThrow();
    });
  });

  describe('checkboxGroupStoryPreChecked (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = checkboxGroupStoryPreChecked.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxGroupStoryPreChecked.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => checkboxGroupStoryPreChecked.generator?.()).not.toThrow();
    });
  });

  describe('checkboxGroupStoryWithHelper (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = checkboxGroupStoryWithHelper.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxGroupStoryWithHelper.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => checkboxGroupStoryWithHelper.generator?.()).not.toThrow();
    });
  });

  describe('checkboxGroupStoryError (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = checkboxGroupStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxGroupStoryError.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => checkboxGroupStoryError.generator?.()).not.toThrow();
    });
  });

  describe('checkboxGroupStoryDisabled (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = checkboxGroupStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxGroupStoryDisabled.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => checkboxGroupStoryDisabled.generator?.()).not.toThrow();
    });
  });
});
