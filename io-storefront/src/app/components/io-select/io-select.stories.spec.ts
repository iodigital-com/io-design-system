import { describe, it, expect } from 'vitest';
import {
  selectStory,
  selectPropDefinitions,
  selectStoryDefault,
  selectStoryPlaceholder,
  selectStoryError,
  selectStoryDisabled,
  selectStorySizes,
  selectStoryCombobox,
  selectStoryMultiple,
  selectStoryFilter,
  selectStoryMultipleFilter,
} from './io-select.stories';

describe('io-select storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────────

  describe('selectStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => selectStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = selectStory.generator?.(selectStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = selectStory.generator?.(selectStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(selectStory.state?.properties).toBeDefined();
    });

    it('first element has tag io-select', () => {
      const els = selectStory.generator?.(selectStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-select');
    });

    it('generator produces io-option children', () => {
      const els = selectStory.generator?.(selectStory.state) ?? [];
      const first = els[0] as { children?: Array<{ tag: string }> };
      expect(Array.isArray(first.children)).toBe(true);
      expect(first.children!.length).toBeGreaterThan(0);
      expect(first.children!.every((c) => c.tag === 'io-option')).toBe(true);
    });

    it('generator forwards label from properties', () => {
      const els = selectStory.generator?.({ properties: { label: 'Region' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Region');
    });

    it('generator forwards size from properties', () => {
      const els = selectStory.generator?.({ properties: { size: 'sm' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.size).toBe('sm');
    });

    it('generator forwards disabled from properties', () => {
      const els = selectStory.generator?.({ properties: { disabled: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });

    it('generator forwards required from properties', () => {
      const els = selectStory.generator?.({ properties: { required: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.required).toBe(true);
    });

    it('generator forwards error from properties', () => {
      const els = selectStory.generator?.({ properties: { error: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.error).toBe(true);
    });

    it('generator omits placeholder when empty string', () => {
      const els = selectStory.generator?.({ properties: { placeholder: '' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.placeholder).toBeUndefined();
    });

    it('generator forwards non-empty placeholder', () => {
      const els = selectStory.generator?.({ properties: { placeholder: 'Pick one' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.placeholder).toBe('Pick one');
    });
  });

  // ── propDefinitions ────────────────────────────────────────────────────────

  describe('selectPropDefinitions', () => {
    it('is non-empty', () => {
      expect(selectPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of selectPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of selectPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of selectPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of selectPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = selectPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('contains expected prop names', () => {
      const names = selectPropDefinitions.map((d) => d.name);
      expect(names).toContain('label');
      expect(names).toContain('size');
      expect(names).toContain('placeholder');
      expect(names).toContain('disabled');
      expect(names).toContain('required');
      expect(names).toContain('state');
      expect(names).toContain('message');
      expect(names).toContain('helperText');
    });

    it('size prop has sm, md, lg options', () => {
      const sizeDef = selectPropDefinitions.find((d) => d.name === 'size');
      expect(((sizeDef as unknown as { options: string[] } | undefined))?.options).toEqual(expect.arrayContaining(['sm', 'md', 'lg']));
    });

    it('calling generator with each select option does not throw', () => {
      for (const def of selectPropDefinitions.filter((d) => d.type === 'select')) {
        for (const option of (def as unknown as { options: string[] }).options) {
          expect(() =>
            selectStory.generator?.({ properties: { [def.name]: option } }),
          ).not.toThrow();
        }
      }
    });
  });

  // ── Named stories ──────────────────────────────────────────────────────────

  describe('selectStoryDefault', () => {
    it('generator returns non-empty array', () => {
      const els = selectStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(selectStoryDefault.state?.properties).toBeDefined();
    });

    it('first element has tag io-select', () => {
      const els = selectStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-select');
    });
  });

  describe('selectStoryPlaceholder', () => {
    it('generator returns non-empty array', () => {
      const els = selectStoryPlaceholder.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has a non-empty placeholder', () => {
      const els = selectStoryPlaceholder.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(typeof first.properties.placeholder).toBe('string');
      expect((first.properties.placeholder as string).length).toBeGreaterThan(0);
    });
  });

  describe('selectStoryError', () => {
    it('generator returns non-empty array', () => {
      const els = selectStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has error true', () => {
      const els = selectStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.error).toBe(true);
    });

    it('has errorMessage', () => {
      const els = selectStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(typeof first.properties.errorMessage).toBe('string');
      expect((first.properties.errorMessage as string).length).toBeGreaterThan(0);
    });
  });

  describe('selectStoryDisabled', () => {
    it('generator returns non-empty array', () => {
      const els = selectStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has disabled true', () => {
      const els = selectStoryDisabled.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });
  });

  describe('selectStorySizes', () => {
    it('generator returns non-empty array', () => {
      const els = selectStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('renders three size variants', () => {
      const els = selectStorySizes.generator?.() ?? [];
      expect(els.length).toBe(3);
    });

    it('size variants are sm, md, lg', () => {
      const els = selectStorySizes.generator?.() ?? [];
      const sizes = (els as Array<{ properties: Record<string, unknown> }>).map(
        (el) => el.properties.size,
      );
      expect(sizes).toContain('sm');
      expect(sizes).toContain('md');
      expect(sizes).toContain('lg');
    });
  });

  describe('selectStoryCombobox', () => {
    it('generator returns non-empty array', () => {
      const els = selectStoryCombobox.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has custom true', () => {
      const els = selectStoryCombobox.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.custom).toBe(true);
    });
  });

  describe('selectStoryMultiple', () => {
    it('generator returns non-empty array', () => {
      const els = selectStoryMultiple.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has multiple true', () => {
      const els = selectStoryMultiple.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.multiple).toBe(true);
    });
  });

  describe('selectStoryFilter', () => {
    it('generator returns non-empty array', () => {
      const els = selectStoryFilter.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has filter true', () => {
      const els = selectStoryFilter.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.filter).toBe(true);
    });
  });

  describe('selectStoryMultipleFilter', () => {
    it('generator returns non-empty array', () => {
      const els = selectStoryMultipleFilter.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('has both multiple and filter true', () => {
      const els = selectStoryMultipleFilter.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.multiple).toBe(true);
      expect(first.properties.filter).toBe(true);
    });
  });
});
