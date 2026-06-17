import { describe, it, expect } from 'vitest';
import {
  checkboxStory,
  checkboxPropDefinitions,
  checkboxStoryDefault,
  checkboxStoryChecked,
  checkboxStoryIndeterminate,
  checkboxStoryError,
  checkboxStoryDisabled,
  checkboxStoryCompact,
} from './io-checkbox.stories';

describe('io-checkbox storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('checkboxStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => checkboxStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = checkboxStory.generator?.(checkboxStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxStory.generator?.(checkboxStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(checkboxStory.state?.properties).toBeDefined();
    });

    it('generator with checked=true does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, checked: true } }),
      ).not.toThrow();
    });

    it('generator with checked=false does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, checked: false } }),
      ).not.toThrow();
    });

    it('generator with indeterminate=true does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, indeterminate: true } }),
      ).not.toThrow();
    });

    it('generator with indeterminate=false does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, indeterminate: false } }),
      ).not.toThrow();
    });

    it('generator with required=true does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, required: true } }),
      ).not.toThrow();
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, disabled: true } }),
      ).not.toThrow();
    });

    it('generator with state=none does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, state: 'none' } }),
      ).not.toThrow();
    });

    it('generator with state=error does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, state: 'error' } }),
      ).not.toThrow();
    });

    it('generator with state=success does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, state: 'success' } }),
      ).not.toThrow();
    });

    it('generator with state=warning does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, state: 'warning' } }),
      ).not.toThrow();
    });

    it('generator with empty label does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, label: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty label does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, label: 'I agree to the terms' } }),
      ).not.toThrow();
    });

    it('generator with empty message does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, message: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty message does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, message: 'This field is required' } }),
      ).not.toThrow();
    });

    it('generator with empty helperText does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, helperText: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty helperText does not throw', () => {
      expect(() =>
        checkboxStory.generator?.({ properties: { ...checkboxStory.state?.properties, helperText: 'Optional supporting text' } }),
      ).not.toThrow();
    });

    it('configurator story produces io-checkbox as root element', () => {
      const els = checkboxStory.generator?.(checkboxStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-checkbox');
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('checkboxPropDefinitions', () => {
    it('is non-empty', () => {
      expect(checkboxPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of checkboxPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of checkboxPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of checkboxPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of checkboxPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = checkboxPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });

    it('state definition includes none, error, success, warning options', () => {
      const stateDef = checkboxPropDefinitions.find((d) => d.name === 'state');
      expect(stateDef).toBeDefined();
      expect(((stateDef as unknown as { options: string[] })).options).toContain('none');
      expect(((stateDef as unknown as { options: string[] })).options).toContain('error');
      expect(((stateDef as unknown as { options: string[] })).options).toContain('success');
      expect(((stateDef as unknown as { options: string[] })).options).toContain('warning');
    });

    it('includes compact boolean definition', () => {
      const compactDef = checkboxPropDefinitions.find((d) => d.name === 'compact');
      expect(compactDef).toBeDefined();
      expect(compactDef?.type).toBe('boolean');
      expect(compactDef?.defaultValue).toBe(false);
    });
  });

  // ── Named stories ───────────────────────────────────────────────────────
  describe('checkboxStoryDefault', () => {
    it('generator returns non-empty array', () => {
      const els = checkboxStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('checkboxStoryChecked', () => {
    it('generator returns non-empty array', () => {
      const els = checkboxStoryChecked.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxStoryChecked.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('checkboxStoryIndeterminate', () => {
    it('generator returns non-empty array', () => {
      const els = checkboxStoryIndeterminate.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxStoryIndeterminate.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('checkboxStoryError', () => {
    it('generator returns non-empty array', () => {
      const els = checkboxStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxStoryError.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('checkboxStoryDisabled', () => {
    it('generator returns non-empty array', () => {
      const els = checkboxStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxStoryDisabled.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('checkboxStoryCompact', () => {
    it('generator returns non-empty array', () => {
      const els = checkboxStoryCompact.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = checkboxStoryCompact.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('story sets compact to true', () => {
      const els = checkboxStoryCompact.generator?.() ?? [];
      const first = els[0] as { tag: string; properties: Record<string, unknown> };
      expect(first.properties.compact).toBe(true);
    });
  });
});
