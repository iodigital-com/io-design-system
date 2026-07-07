import { describe, it, expect } from 'vitest';
import {
  inputStory,
  inputStoryDefault,
  inputStoryError,
  inputStoryDisabled,
  inputStorySizes,
  inputStoryConstraints,
  inputStoryLoading,
  inputStoryCounter,
  inputStoryIndicator,
  inputPropDefinitions,
} from './io-input.stories';

describe('io-input storefront stories', () => {
  describe('inputStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => inputStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = inputStory.generator?.(inputStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStory.generator?.(inputStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(inputStory.state?.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof inputStory.state?.properties).toBe('object');
    });

    it('generator with each type option does not throw', () => {
      for (const type of ['text', 'email', 'password', 'number', 'tel', 'url']) {
        expect(() =>
          inputStory.generator?.({ properties: { ...inputStory.state?.properties, type } })
        ).not.toThrow();
      }
    });

    it('generator with each size option does not throw', () => {
      for (const size of ['sm', 'md', 'lg']) {
        expect(() =>
          inputStory.generator?.({ properties: { ...inputStory.state?.properties, size } })
        ).not.toThrow();
      }
    });

    it('generator with each state option does not throw', () => {
      for (const state of ['none', 'error', 'success', 'warning']) {
        expect(() =>
          inputStory.generator?.({ properties: { ...inputStory.state?.properties, state } })
        ).not.toThrow();
      }
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        inputStory.generator?.({ properties: { ...inputStory.state?.properties, disabled: true } })
      ).not.toThrow();
    });

    it('generator with loading=true does not throw', () => {
      expect(() =>
        inputStory.generator?.({ properties: { ...inputStory.state?.properties, loading: true } })
      ).not.toThrow();
    });

    it('generator with counter=true does not throw', () => {
      expect(() =>
        inputStory.generator?.({ properties: { ...inputStory.state?.properties, counter: true } })
      ).not.toThrow();
    });

    it('configurator story produces io-input as root element', () => {
      const els = inputStory.generator?.(inputStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-input');
    });
  });

  describe('inputPropDefinitions', () => {
    it('is non-empty', () => {
      expect(inputPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of inputPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of inputPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of inputPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('no duplicate names', () => {
      const names = inputPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('type select options include common input types', () => {
      const typeDef = inputPropDefinitions.find((d) => d.name === 'type');
      expect(typeDef).toBeDefined();
      for (const t of ['text', 'email', 'password', 'number']) {
        expect(((typeDef as unknown as { options: string[] })).options).toContain(t);
      }
    });

    it('size select options include sm, md, and lg', () => {
      const sizeDef = inputPropDefinitions.find((d) => d.name === 'size');
      expect(sizeDef).toBeDefined();
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('sm');
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('md');
      expect(((sizeDef as unknown as { options: string[] })).options).toContain('lg');
    });

    it('state select options include none, error, success, and warning', () => {
      const stateDef = inputPropDefinitions.find((d) => d.name === 'state');
      expect(stateDef).toBeDefined();
      expect(((stateDef as unknown as { options: string[] })).options).toContain('none');
      expect(((stateDef as unknown as { options: string[] })).options).toContain('error');
      expect(((stateDef as unknown as { options: string[] })).options).toContain('success');
      expect(((stateDef as unknown as { options: string[] })).options).toContain('warning');
    });
  });

  describe('inputStoryDefault (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = inputStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => inputStoryDefault.generator?.()).not.toThrow();
    });
  });

  describe('inputStoryError (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = inputStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStoryError.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => inputStoryError.generator?.()).not.toThrow();
    });
  });

  describe('inputStoryDisabled (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = inputStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStoryDisabled.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => inputStoryDisabled.generator?.()).not.toThrow();
    });
  });

  describe('inputStorySizes (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = inputStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStorySizes.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => inputStorySizes.generator?.()).not.toThrow();
    });

    it('returns three size variants', () => {
      const els = inputStorySizes.generator?.() ?? [];
      expect(els.length).toBe(3);
    });
  });

  describe('inputStoryConstraints (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = inputStoryConstraints.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStoryConstraints.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => inputStoryConstraints.generator?.()).not.toThrow();
    });
  });

  describe('inputStoryLoading (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = inputStoryLoading.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStoryLoading.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => inputStoryLoading.generator?.()).not.toThrow();
    });
  });

  describe('inputStoryCounter (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = inputStoryCounter.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStoryCounter.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => inputStoryCounter.generator?.()).not.toThrow();
    });
  });

  describe('inputStoryIndicator (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = inputStoryIndicator.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = inputStoryIndicator.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => inputStoryIndicator.generator?.()).not.toThrow();
    });

    it('returns three indicator variants (email, tel, url)', () => {
      const els = inputStoryIndicator.generator?.() ?? [];
      expect(els.length).toBe(3);
    });

    it('each element uses io-input tag', () => {
      const els = inputStoryIndicator.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect((el as { tag: string }).tag).toBe('io-input');
        }
      }
    });
  });
});
