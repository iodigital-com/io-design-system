import { describe, it, expect } from 'vitest';
import {
  toastStory,
  toastPropDefinitions,
  toastStoryNeutral,
  toastStorySuccess,
  toastStoryError,
  toastStoryWarning,
  toastStoryInfo,
} from './io-toast.stories';

describe('io-toast storefront stories', () => {
  describe('toastStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => toastStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = toastStory.generator?.(toastStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = toastStory.generator?.(toastStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(toastStory.state.properties).toBeDefined();
    });

    it('generator produces io-toast-item tag', () => {
      const els = toastStory.generator?.(toastStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-toast-item');
    });

    it('generator respects variant override', () => {
      const els = toastStory.generator?.({ properties: { variant: 'success' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.variant).toBe('success');
    });

    it('generator respects text override', () => {
      const els = toastStory.generator?.({ properties: { text: 'Custom message.' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.text).toBe('Custom message.');
    });

    it('generator defaults to neutral variant', () => {
      const els = toastStory.generator?.({}) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.variant).toBe('neutral');
    });

    it('state.properties includes variant', () => {
      expect((toastStory.state.properties as Record<string, unknown>).variant).toBeDefined();
    });

    it('state.properties includes text', () => {
      expect((toastStory.state.properties as Record<string, unknown>).text).toBeDefined();
    });
  });

  describe('toastPropDefinitions', () => {
    it('is non-empty', () => {
      expect(toastPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of toastPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of toastPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of toastPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of toastPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = toastPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes text definition of type string', () => {
      const def = toastPropDefinitions.find((d) => d.name === 'text');
      expect(def).toBeDefined();
      expect(def!.type).toBe('string');
    });

    it('includes variant select with all 5 variants', () => {
      const def = toastPropDefinitions.find((d) => d.name === 'variant');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(def!.options).toContain('neutral');
      expect(def!.options).toContain('success');
      expect(def!.options).toContain('error');
      expect(def!.options).toContain('warning');
      expect(def!.options).toContain('info');
      expect(def!.defaultValue).toBe('neutral');
    });
  });

  describe('toastStoryNeutral', () => {
    it('generator does not throw', () => {
      expect(() => toastStoryNeutral.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = toastStoryNeutral.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-toast-item tag', () => {
      const els = toastStoryNeutral.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-toast-item');
    });

    it('element has variant=neutral', () => {
      const els = toastStoryNeutral.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.variant).toBe('neutral');
    });

    it('element has non-empty text', () => {
      const els = toastStoryNeutral.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.text).toBeTruthy();
    });
  });

  describe('toastStorySuccess', () => {
    it('generator does not throw', () => {
      expect(() => toastStorySuccess.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = toastStorySuccess.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has variant=success', () => {
      const els = toastStorySuccess.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.variant).toBe('success');
    });
  });

  describe('toastStoryError', () => {
    it('generator does not throw', () => {
      expect(() => toastStoryError.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = toastStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has variant=error', () => {
      const els = toastStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.variant).toBe('error');
    });
  });

  describe('toastStoryWarning', () => {
    it('generator does not throw', () => {
      expect(() => toastStoryWarning.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = toastStoryWarning.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has variant=warning', () => {
      const els = toastStoryWarning.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.variant).toBe('warning');
    });
  });

  describe('toastStoryInfo', () => {
    it('generator does not throw', () => {
      expect(() => toastStoryInfo.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = toastStoryInfo.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has variant=info', () => {
      const els = toastStoryInfo.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.variant).toBe('info');
    });
  });
});
