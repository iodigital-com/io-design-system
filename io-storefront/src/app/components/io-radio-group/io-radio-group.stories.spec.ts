import { describe, it, expect } from 'vitest';
import {
  radioGroupStory,
  radioGroupPropDefinitions,
  radioGroupStoryDefault,
  radioGroupStoryPreselected,
  radioGroupStoryWithHelper,
  radioGroupStoryError,
  radioGroupStoryDisabled,
} from './io-radio-group.stories';

describe('io-radio-group storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────────

  describe('radioGroupStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => radioGroupStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = radioGroupStory.generator?.(radioGroupStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = radioGroupStory.generator?.(radioGroupStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(radioGroupStory.state?.properties).toBeDefined();
    });

    it('first element has tag io-radio-group', () => {
      const els = radioGroupStory.generator?.(radioGroupStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-radio-group');
    });

    it('generator produces children array', () => {
      const els = radioGroupStory.generator?.(radioGroupStory.state) ?? [];
      const first = els[0] as { children?: unknown[] };
      expect(Array.isArray(first.children)).toBe(true);
      expect(first.children!.length).toBeGreaterThan(0);
    });

    it('generator forwards properties to root element', () => {
      const els =
        radioGroupStory.generator?.({
          properties: { label: 'Test label', name: 'test-group' },
        }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Test label');
      expect(first.properties.name).toBe('test-group');
    });
  });

  // ── propDefinitions ────────────────────────────────────────────────────────

  describe('radioGroupPropDefinitions', () => {
    it('is non-empty', () => {
      expect(radioGroupPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of radioGroupPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of radioGroupPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of radioGroupPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of radioGroupPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = radioGroupPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('contains expected prop names', () => {
      const names = radioGroupPropDefinitions.map((d) => d.name);
      expect(names).toContain('label');
      expect(names).toContain('name');
      expect(names).toContain('value');
      expect(names).toContain('helperText');
      expect(names).toContain('required');
      expect(names).toContain('disabled');
      expect(names).toContain('error');
      expect(names).toContain('errorMessage');
    });

    it('calling generator with each select option does not throw', () => {
      for (const def of radioGroupPropDefinitions.filter((d) => d.type === 'select')) {
        for (const option of (def as unknown as { options: string[] }).options) {
          expect(() =>
            radioGroupStory.generator?.({ properties: { [def.name]: option } }),
          ).not.toThrow();
        }
      }
    });
  });

  // ── Named stories ──────────────────────────────────────────────────────────

  describe('radioGroupStoryDefault', () => {
    it('generator returns non-empty array', () => {
      const els = radioGroupStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(radioGroupStoryDefault.state?.properties).toBeDefined();
    });

    it('first element has tag io-radio-group', () => {
      const els = radioGroupStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-radio-group');
    });

    it('has io-radio children', () => {
      const els = radioGroupStoryDefault.generator?.() ?? [];
      const first = els[0] as { children: Array<{ tag: string }> };
      expect(first.children.every((c) => c.tag === 'io-radio')).toBe(true);
    });
  });

  describe('radioGroupStoryPreselected', () => {
    it('generator returns non-empty array', () => {
      const els = radioGroupStoryPreselected.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has a value set', () => {
      const els = radioGroupStoryPreselected.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.value).toBeTruthy();
    });
  });

  describe('radioGroupStoryWithHelper', () => {
    it('generator returns non-empty array', () => {
      const els = radioGroupStoryWithHelper.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has helperText', () => {
      const els = radioGroupStoryWithHelper.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(typeof first.properties.helperText).toBe('string');
      expect((first.properties.helperText as string).length).toBeGreaterThan(0);
    });
  });

  describe('radioGroupStoryError', () => {
    it('generator returns non-empty array', () => {
      const els = radioGroupStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has error true', () => {
      const els = radioGroupStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.error).toBe(true);
    });

    it('root element has errorMessage', () => {
      const els = radioGroupStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(typeof first.properties.errorMessage).toBe('string');
      expect((first.properties.errorMessage as string).length).toBeGreaterThan(0);
    });
  });

  describe('radioGroupStoryDisabled', () => {
    it('generator returns non-empty array', () => {
      const els = radioGroupStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has disabled true', () => {
      const els = radioGroupStoryDisabled.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });
  });
});
