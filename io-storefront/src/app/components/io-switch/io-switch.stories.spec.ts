import { describe, it, expect } from 'vitest';
import {
  switchStory,
  switchPropDefinitions,
  switchStoryDefault,
  switchStoryChecked,
  switchStoryWithHelper,
  switchStoryError,
  switchStoryDisabled,
} from './io-switch.stories';

describe('io-switch storefront stories', () => {
  describe('switchStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => switchStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = switchStory.generator?.(switchStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = switchStory.generator?.(switchStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(switchStory.state?.properties).toBeDefined();
    });

    it('generator produces io-switch tag', () => {
      const els = switchStory.generator?.(switchStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-switch');
    });

    it('generator respects checked property override', () => {
      const els = switchStory.generator?.({ properties: { checked: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.checked).toBe(true);
    });

    it('generator respects label property override', () => {
      const els = switchStory.generator?.({ properties: { label: 'Custom label' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Custom label');
    });

    it('generator respects disabled property override', () => {
      const els = switchStory.generator?.({ properties: { disabled: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });

    it('state.properties includes label', () => {
      expect((switchStory.state?.properties as Record<string, unknown>).label).toBeDefined();
    });

    it('state.properties includes checked', () => {
      expect((switchStory.state?.properties as Record<string, unknown>).checked).toBeDefined();
    });
  });

  describe('switchPropDefinitions', () => {
    it('is non-empty', () => {
      expect(switchPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of switchPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of switchPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of switchPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue', () => {
      for (const def of switchPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = switchPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes label definition', () => {
      const labelDef = switchPropDefinitions.find((d) => d.name === 'label');
      expect(labelDef).toBeDefined();
      expect(labelDef!.type).toBe('string');
    });

    it('includes checked definition', () => {
      const checkedDef = switchPropDefinitions.find((d) => d.name === 'checked');
      expect(checkedDef).toBeDefined();
      expect(checkedDef!.type).toBe('boolean');
    });

    it('includes disabled definition', () => {
      const disabledDef = switchPropDefinitions.find((d) => d.name === 'disabled');
      expect(disabledDef).toBeDefined();
      expect(disabledDef!.type).toBe('boolean');
    });

    it('includes state definition', () => {
      const stateDef = switchPropDefinitions.find((d) => d.name === 'state');
      expect(stateDef).toBeDefined();
      expect(stateDef!.type).toBe('select');
    });
  });

  describe('switchStoryDefault', () => {
    it('generator does not throw', () => {
      expect(() => switchStoryDefault.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = switchStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-switch tag', () => {
      const els = switchStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-switch');
    });

    it('state.properties has label', () => {
      expect((switchStoryDefault.state?.properties as Record<string, unknown>).label).toBeDefined();
    });
  });

  describe('switchStoryChecked', () => {
    it('generator does not throw', () => {
      expect(() => switchStoryChecked.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = switchStoryChecked.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has checked=true', () => {
      const els = switchStoryChecked.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.checked).toBe(true);
    });
  });

  describe('switchStoryWithHelper', () => {
    it('generator does not throw', () => {
      expect(() => switchStoryWithHelper.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = switchStoryWithHelper.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has helperText set', () => {
      const els = switchStoryWithHelper.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.helperText).toBeTruthy();
    });
  });

  describe('switchStoryError', () => {
    it('generator does not throw', () => {
      expect(() => switchStoryError.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = switchStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has state=error', () => {
      const els = switchStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.state).toBe('error');
    });

    it('element has message set', () => {
      const els = switchStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.message).toBeTruthy();
    });
  });

  describe('switchStoryDisabled', () => {
    it('generator does not throw', () => {
      expect(() => switchStoryDisabled.generator?.()).not.toThrow();
    });

    it('generator returns two elements (off + on disabled)', () => {
      const els = switchStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(2);
    });

    it('all elements have disabled=true', () => {
      const els = switchStoryDisabled.generator?.() ?? [];
      for (const el of els) {
        const element = el as { properties: Record<string, unknown> };
        expect(element.properties.disabled).toBe(true);
      }
    });
  });
});
