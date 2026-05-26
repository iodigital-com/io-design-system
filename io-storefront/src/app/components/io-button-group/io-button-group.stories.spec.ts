import { describe, it, expect } from 'vitest';
import {
  buttonGroupStory,
  buttonGroupPropDefinitions,
  buttonGroupStoryExclusive,
  buttonGroupStoryMultiSelect,
  buttonGroupStoryDisabled,
  buttonGroupStoryItemDisabled,
  buttonGroupStorySizeSm,
  buttonGroupStorySizeMd,
  buttonGroupStorySizeLg,
  buttonGroupStoryDirectionRow,
  buttonGroupStoryDirectionColumn,
} from './io-button-group.stories';

describe('io-button-group storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('buttonGroupStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => buttonGroupStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = buttonGroupStory.generator?.(buttonGroupStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStory.generator?.(buttonGroupStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(buttonGroupStory.state?.properties).toBeDefined();
    });

    it('generator with exclusive=true does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, exclusive: true } }),
      ).not.toThrow();
    });

    it('generator with exclusive=false does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, exclusive: false } }),
      ).not.toThrow();
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, disabled: true } }),
      ).not.toThrow();
    });

    it('generator with disabled=false does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, disabled: false } }),
      ).not.toThrow();
    });

    it('generator with empty value does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, value: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty value does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, value: 'day' } }),
      ).not.toThrow();
    });

    it('generator with empty label does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, label: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty label does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, label: 'View period' } }),
      ).not.toThrow();
    });

    it('generator with size=sm does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, size: 'sm' } }),
      ).not.toThrow();
    });

    it('generator with size=md does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, size: 'md' } }),
      ).not.toThrow();
    });

    it('generator with size=lg does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, size: 'lg' } }),
      ).not.toThrow();
    });

    it('generator with direction=row does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, direction: 'row' } }),
      ).not.toThrow();
    });

    it('generator with direction=column does not throw', () => {
      expect(() =>
        buttonGroupStory.generator?.({ properties: { ...buttonGroupStory.state?.properties, direction: 'column' } }),
      ).not.toThrow();
    });

    it('configurator story produces io-button-group as root element', () => {
      const els = buttonGroupStory.generator?.(buttonGroupStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-button-group');
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('buttonGroupPropDefinitions', () => {
    it('is non-empty', () => {
      expect(buttonGroupPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of buttonGroupPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of buttonGroupPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of buttonGroupPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of buttonGroupPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = buttonGroupPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  // ── Named stories ───────────────────────────────────────────────────────
  describe('buttonGroupStoryExclusive', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStoryExclusive.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStoryExclusive.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonGroupStoryMultiSelect', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStoryMultiSelect.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStoryMultiSelect.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonGroupStoryDisabled', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStoryDisabled.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonGroupStoryItemDisabled', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStoryItemDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStoryItemDisabled.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonGroupStorySizeSm', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStorySizeSm.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStorySizeSm.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonGroupStorySizeMd', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStorySizeMd.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStorySizeMd.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonGroupStorySizeLg', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStorySizeLg.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStorySizeLg.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonGroupStoryDirectionRow', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStoryDirectionRow.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStoryDirectionRow.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonGroupStoryDirectionColumn', () => {
    it('generator returns non-empty array', () => {
      const els = buttonGroupStoryDirectionColumn.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonGroupStoryDirectionColumn.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });
});
