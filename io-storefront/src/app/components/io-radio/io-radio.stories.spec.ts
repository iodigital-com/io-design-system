import { describe, it, expect } from 'vitest';
import {
  radioStory,
  radioPropDefinitions,
  radioStoryDefault,
  radioStoryChecked,
  radioStoryDisabled,
  radioStoryError,
  radioStoryGroup,
} from './io-radio.stories';

describe('io-radio storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────────

  describe('radioStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => radioStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = radioStory.generator?.(radioStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = radioStory.generator?.(radioStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(radioStory.state?.properties).toBeDefined();
    });

    it('first element has tag io-radio', () => {
      const els = radioStory.generator?.(radioStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-radio');
    });

    it('generator forwards label from properties', () => {
      const els = radioStory.generator?.({ properties: { label: 'Custom option' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Custom option');
    });

    it('generator forwards checked from properties', () => {
      const els = radioStory.generator?.({ properties: { checked: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.checked).toBe(true);
    });

    it('generator forwards disabled from properties', () => {
      const els = radioStory.generator?.({ properties: { disabled: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });

    it('generator forwards required from properties', () => {
      const els = radioStory.generator?.({ properties: { required: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.required).toBe(true);
    });
  });

  // ── propDefinitions ────────────────────────────────────────────────────────

  describe('radioPropDefinitions', () => {
    it('is non-empty', () => {
      expect(radioPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of radioPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of radioPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of radioPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of radioPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = radioPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('contains expected prop names', () => {
      const names = radioPropDefinitions.map((d) => d.name);
      expect(names).toContain('label');
      expect(names).toContain('checked');
      expect(names).toContain('required');
      expect(names).toContain('disabled');
      expect(names).toContain('state');
      expect(names).toContain('message');
      expect(names).toContain('helperText');
    });

    it('calling generator with each select option does not throw', () => {
      for (const def of radioPropDefinitions.filter((d) => d.type === 'select')) {
        for (const option of (def as unknown as { options: string[] }).options) {
          expect(() =>
            radioStory.generator?.({ properties: { [def.name]: option } }),
          ).not.toThrow();
        }
      }
    });
  });

  // ── Named stories ──────────────────────────────────────────────────────────

  describe('radioStoryDefault', () => {
    it('generator returns non-empty array', () => {
      const els = radioStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(radioStoryDefault.state?.properties).toBeDefined();
    });

    it('first element has tag io-radio', () => {
      const els = radioStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-radio');
    });

    it('radio is unchecked by default', () => {
      const els = radioStoryDefault.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.checked).toBe(false);
    });
  });

  describe('radioStoryChecked', () => {
    it('generator returns non-empty array', () => {
      const els = radioStoryChecked.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('radio is checked', () => {
      const els = radioStoryChecked.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.checked).toBe(true);
    });
  });

  describe('radioStoryDisabled', () => {
    it('generator returns non-empty array', () => {
      const els = radioStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('renders multiple disabled radio elements', () => {
      const els = radioStoryDisabled.generator?.() ?? [];
      expect(els.length).toBeGreaterThanOrEqual(2);
      for (const el of els) {
        const typed = el as { properties: Record<string, unknown> };
        expect(typed.properties.disabled).toBe(true);
      }
    });
  });

  describe('radioStoryError', () => {
    it('generator returns non-empty array', () => {
      const els = radioStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('radio has error true', () => {
      const els = radioStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.error).toBe(true);
    });

    it('radio has errorMessage', () => {
      const els = radioStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(typeof first.properties.errorMessage).toBe('string');
      expect((first.properties.errorMessage as string).length).toBeGreaterThan(0);
    });
  });

  describe('radioStoryGroup', () => {
    it('generator returns non-empty array', () => {
      const els = radioStoryGroup.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('renders multiple radios sharing the same name', () => {
      const els = radioStoryGroup.generator?.() ?? [];
      expect(els.length).toBeGreaterThanOrEqual(2);
      const names = (els as Array<{ properties: Record<string, unknown> }>).map(
        (el) => el.properties.name,
      );
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(1);
    });

    it('exactly one radio is checked in the group', () => {
      const els = radioStoryGroup.generator?.() ?? [];
      const checkedCount = (els as Array<{ properties: Record<string, unknown> }>).filter(
        (el) => el.properties.checked === true,
      ).length;
      expect(checkedCount).toBe(1);
    });
  });
});
