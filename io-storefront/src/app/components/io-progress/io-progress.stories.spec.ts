import { describe, it, expect } from 'vitest';
import {
  progressStory,
  progressPropDefinitions,
  progressStoryDefault,
  progressStoryColors,
  progressStorySizes,
  progressStoryWithLabel,
  progressStoryEmpty,
  progressStorySuccess,
  progressStoryWarning,
  progressStoryError,
} from './io-progress.stories';

describe('io-progress storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────────

  describe('progressStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => progressStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = progressStory.generator?.(progressStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = progressStory.generator?.(progressStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(progressStory.state?.properties).toBeDefined();
    });

    it('generator forwards value from properties', () => {
      const els = progressStory.generator?.({ properties: { value: 42 } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.value).toBe(42);
    });

    it('generator forwards color from properties', () => {
      const els = progressStory.generator?.({ properties: { color: 'orange' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.color).toBe('orange');
    });

    it('generator forwards size from properties', () => {
      const els = progressStory.generator?.({ properties: { size: 'sm' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('sm');
    });

    it('generator sets animated false when explicitly false', () => {
      const els = progressStory.generator?.({ properties: { animated: false } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.animated).toBe(false);
    });

    it('generator sets showLabel true when explicitly true', () => {
      const els = progressStory.generator?.({ properties: { showLabel: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.showLabel).toBe(true);
    });

    it('generator includes label when provided', () => {
      const els = progressStory.generator?.({ properties: { label: 'Uploading' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Uploading');
    });

    it('generator omits label when empty', () => {
      const els = progressStory.generator?.({ properties: { label: '' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBeUndefined();
    });
  });

  // ── propDefinitions ────────────────────────────────────────────────────────

  describe('progressPropDefinitions', () => {
    it('is non-empty', () => {
      expect(progressPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of progressPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of progressPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of progressPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of progressPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = progressPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('contains expected prop names', () => {
      const names = progressPropDefinitions.map((d) => d.name);
      expect(names).toContain('value');
      expect(names).toContain('color');
      expect(names).toContain('size');
      expect(names).toContain('animated');
      expect(names).toContain('showLabel');
      expect(names).toContain('label');
    });

    it('calling generator with each select option does not throw', () => {
      for (const def of progressPropDefinitions.filter((d) => d.type === 'select')) {
        for (const option of (def as unknown as { options: string[] }).options) {
          expect(() =>
            progressStory.generator?.({ properties: { [def.name]: option } }),
          ).not.toThrow();
        }
      }
    });
  });

  // ── Named stories ──────────────────────────────────────────────────────────

  describe('progressStoryDefault', () => {
    it('generator returns non-empty array', () => {
      const els = progressStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('first element has tag io-progress', () => {
      const els = progressStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-progress');
    });

    it('state.properties is defined', () => {
      expect(progressStoryDefault.state?.properties).toBeDefined();
    });
  });

  describe('progressStoryColors', () => {
    it('generator returns non-empty array', () => {
      const els = progressStoryColors.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('uses orange color', () => {
      const els = progressStoryColors.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.color).toBe('orange');
    });
  });

  describe('progressStorySizes', () => {
    it('generator returns non-empty array', () => {
      const els = progressStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('uses sm size', () => {
      const els = progressStorySizes.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('sm');
    });
  });

  describe('progressStoryWithLabel', () => {
    it('generator returns non-empty array', () => {
      const els = progressStoryWithLabel.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has showLabel true', () => {
      const els = progressStoryWithLabel.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.showLabel).toBe(true);
    });
  });

  describe('progressStoryEmpty', () => {
    it('generator returns non-empty array', () => {
      const els = progressStoryEmpty.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has value 0', () => {
      const els = progressStoryEmpty.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.value).toBe(0);
    });
  });

  describe('progressStorySuccess', () => {
    it('generator returns non-empty array', () => {
      const els = progressStorySuccess.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has value 100 and success color', () => {
      const els = progressStorySuccess.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.value).toBe(100);
      expect(first.properties.color).toBe('success');
    });
  });

  describe('progressStoryWarning', () => {
    it('generator returns non-empty array', () => {
      const els = progressStoryWarning.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('uses warning color', () => {
      const els = progressStoryWarning.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.color).toBe('warning');
    });
  });

  describe('progressStoryError', () => {
    it('generator returns non-empty array', () => {
      const els = progressStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('uses error color', () => {
      const els = progressStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.color).toBe('error');
    });
  });
});
