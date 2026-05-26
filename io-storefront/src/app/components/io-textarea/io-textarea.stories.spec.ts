import { describe, it, expect } from 'vitest';
import {
  textareaStory,
  textareaPropDefinitions,
  textareaStoryDefault,
  textareaStoryResize,
  textareaStoryError,
  textareaStoryDisabled,
  textareaStorySizes,
  textareaStoryReadOnly,
  textareaStoryLoading,
  textareaStoryCounter,
} from './io-textarea.stories';

describe('io-textarea storefront stories', () => {
  describe('textareaStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => textareaStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = textareaStory.generator?.(textareaStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = textareaStory.generator?.(textareaStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(textareaStory.state?.properties).toBeDefined();
    });

    it('generator produces io-textarea tag', () => {
      const els = textareaStory.generator?.(textareaStory.state) ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-textarea');
    });

    it('generator respects label override', () => {
      const els = textareaStory.generator?.({ properties: { label: 'Notes' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.label).toBe('Notes');
    });

    it('generator respects disabled override', () => {
      const els = textareaStory.generator?.({ properties: { disabled: true } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });

    it('generator respects resize override', () => {
      const els = textareaStory.generator?.({ properties: { resize: 'none' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.resize).toBe('none');
    });

    it('generator respects state override', () => {
      const els = textareaStory.generator?.({ properties: { state: 'error' } }) ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.state).toBe('error');
    });

    it('state.properties includes label', () => {
      expect((textareaStory.state?.properties as Record<string, unknown>).label).toBeDefined();
    });

    it('state.properties includes size', () => {
      expect((textareaStory.state?.properties as Record<string, unknown>).size).toBeDefined();
    });

    it('state.properties includes rows', () => {
      expect((textareaStory.state?.properties as Record<string, unknown>).rows).toBeDefined();
    });

    it('state.properties includes resize', () => {
      expect((textareaStory.state?.properties as Record<string, unknown>).resize).toBeDefined();
    });

    it('state.properties includes readOnly', () => {
      expect((textareaStory.state?.properties as Record<string, unknown>).readOnly).toBeDefined();
    });
  });

  describe('textareaPropDefinitions', () => {
    it('is non-empty', () => {
      expect(textareaPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of textareaPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of textareaPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options', () => {
      for (const def of textareaPropDefinitions.filter((d) => d.type === 'select')) {
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('most definitions have defaultValue (allows intentionally-undefined entries)', () => {
      const withDefault = textareaPropDefinitions.filter((d) => d.defaultValue !== undefined);
      expect(withDefault.length).toBeGreaterThan(0);
    });

    it('no duplicate names', () => {
      const names = textareaPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('includes label definition of type string', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'label');
      expect(def).toBeDefined();
      expect(def!.type).toBe('string');
    });

    it('includes size select with sm/md/lg', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'size');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('sm');
      expect(((def as unknown as { options: string[] })).options).toContain('md');
      expect(((def as unknown as { options: string[] })).options).toContain('lg');
      expect(def!.defaultValue).toBe('md');
    });

    it('includes rows definition of type number', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'rows');
      expect(def).toBeDefined();
      expect(def!.type).toBe('number');
    });

    it('includes resize select with none/vertical/auto options', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'resize');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('none');
      expect(((def as unknown as { options: string[] })).options).toContain('vertical');
      expect(((def as unknown as { options: string[] })).options).toContain('auto');
      expect(def!.defaultValue).toBe('vertical');
    });

    it('includes disabled definition of type boolean', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'disabled');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });

    it('includes readOnly definition of type boolean', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'readOnly');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });

    it('includes loading definition of type boolean', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'loading');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });

    it('includes counter definition of type boolean', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'counter');
      expect(def).toBeDefined();
      expect(def!.type).toBe('boolean');
    });

    it('includes state select with error/success/warning/none options', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'state');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('none');
      expect(((def as unknown as { options: string[] })).options).toContain('error');
      expect(((def as unknown as { options: string[] })).options).toContain('success');
      expect(((def as unknown as { options: string[] })).options).toContain('warning');
      expect(def!.defaultValue).toBe('none');
    });

    it('includes wrap select definition', () => {
      const def = textareaPropDefinitions.find((d) => d.name === 'wrap');
      expect(def).toBeDefined();
      expect(def!.type).toBe('select');
      expect(((def as unknown as { options: string[] })).options).toContain('soft');
      expect(((def as unknown as { options: string[] })).options).toContain('hard');
      expect(((def as unknown as { options: string[] })).options).toContain('off');
    });
  });

  describe('textareaStoryDefault', () => {
    it('generator does not throw', () => {
      expect(() => textareaStoryDefault.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = textareaStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('produces io-textarea tag', () => {
      const els = textareaStoryDefault.generator?.() ?? [];
      const first = els[0] as { tag: string };
      expect(first.tag).toBe('io-textarea');
    });
  });

  describe('textareaStoryResize', () => {
    it('generator does not throw', () => {
      expect(() => textareaStoryResize.generator?.()).not.toThrow();
    });

    it('generator returns 3 elements (one per resize mode)', () => {
      const els = textareaStoryResize.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(3);
    });

    it('covers none, vertical, and auto resize', () => {
      const els = textareaStoryResize.generator?.() ?? [];
      const resizes = els.map((el) => (el as { properties: Record<string, unknown> }).properties.resize);
      expect(resizes).toContain('none');
      expect(resizes).toContain('vertical');
      expect(resizes).toContain('auto');
    });
  });

  describe('textareaStoryError', () => {
    it('generator does not throw', () => {
      expect(() => textareaStoryError.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = textareaStoryError.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has state=error', () => {
      const els = textareaStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.state).toBe('error');
    });

    it('element has message set', () => {
      const els = textareaStoryError.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.message).toBeTruthy();
    });
  });

  describe('textareaStoryDisabled', () => {
    it('generator does not throw', () => {
      expect(() => textareaStoryDisabled.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = textareaStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has disabled=true', () => {
      const els = textareaStoryDisabled.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.disabled).toBe(true);
    });
  });

  describe('textareaStorySizes', () => {
    it('generator does not throw', () => {
      expect(() => textareaStorySizes.generator?.()).not.toThrow();
    });

    it('generator returns 3 elements (one per size)', () => {
      const els = textareaStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBe(3);
    });

    it('covers sm, md, and lg sizes', () => {
      const els = textareaStorySizes.generator?.() ?? [];
      const sizes = els.map((el) => (el as { properties: Record<string, unknown> }).properties.size);
      expect(sizes).toContain('sm');
      expect(sizes).toContain('md');
      expect(sizes).toContain('lg');
    });
  });

  describe('textareaStoryReadOnly', () => {
    it('generator does not throw', () => {
      expect(() => textareaStoryReadOnly.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = textareaStoryReadOnly.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has readOnly=true', () => {
      const els = textareaStoryReadOnly.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.readOnly).toBe(true);
    });
  });

  describe('textareaStoryLoading', () => {
    it('generator does not throw', () => {
      expect(() => textareaStoryLoading.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = textareaStoryLoading.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has loading=true', () => {
      const els = textareaStoryLoading.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.loading).toBe(true);
    });
  });

  describe('textareaStoryCounter', () => {
    it('generator does not throw', () => {
      expect(() => textareaStoryCounter.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = textareaStoryCounter.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('element has counter=true', () => {
      const els = textareaStoryCounter.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.counter).toBe(true);
    });

    it('element has maxLength set', () => {
      const els = textareaStoryCounter.generator?.() ?? [];
      const first = els[0] as { properties: Record<string, unknown> };
      expect(first.properties.maxLength).toBeDefined();
    });
  });
});
