import { describe, it, expect } from 'vitest';
import {
  linkStory,
  linkStoryStandalone,
  linkStoryInline,
  linkStoryColors,
  linkStoryDisabled,
  linkPropDefinitions,
} from './io-link.stories';

describe('io-link storefront stories', () => {
  describe('linkStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => linkStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = linkStory.generator?.(linkStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = linkStory.generator?.(linkStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(linkStory.state.properties).toBeDefined();
    });

    it('state.properties is an object', () => {
      expect(typeof linkStory.state.properties).toBe('object');
    });

    it('generator with variant=standalone does not throw', () => {
      expect(() =>
        linkStory.generator?.({ properties: { ...linkStory.state.properties, variant: 'standalone' } })
      ).not.toThrow();
    });

    it('generator with variant=inline does not throw', () => {
      expect(() =>
        linkStory.generator?.({ properties: { ...linkStory.state.properties, variant: 'inline' } })
      ).not.toThrow();
    });

    it('generator with color=blue does not throw', () => {
      expect(() =>
        linkStory.generator?.({ properties: { ...linkStory.state.properties, color: 'blue' } })
      ).not.toThrow();
    });

    it('generator with color=black does not throw', () => {
      expect(() =>
        linkStory.generator?.({ properties: { ...linkStory.state.properties, color: 'black' } })
      ).not.toThrow();
    });

    it('generator with color=white does not throw', () => {
      expect(() =>
        linkStory.generator?.({ properties: { ...linkStory.state.properties, color: 'white' } })
      ).not.toThrow();
    });

    it('generator with external=true does not throw', () => {
      expect(() =>
        linkStory.generator?.({ properties: { ...linkStory.state.properties, external: true } })
      ).not.toThrow();
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        linkStory.generator?.({ properties: { ...linkStory.state.properties, disabled: true } })
      ).not.toThrow();
    });

    it('configurator story produces io-link as root element', () => {
      const els = linkStory.generator?.(linkStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-link');
    });
  });

  describe('linkPropDefinitions', () => {
    it('is non-empty', () => {
      expect(linkPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of linkPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of linkPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of linkPropDefinitions.filter((d) => d.type === 'select')) {
        expect(def.options).toBeDefined();
        expect((def.options as string[]).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of linkPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = linkPropDefinitions.map((d) => d.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('variant select options include standalone and inline', () => {
      const variantDef = linkPropDefinitions.find((d) => d.name === 'variant');
      expect(variantDef).toBeDefined();
      expect(variantDef!.options).toContain('standalone');
      expect(variantDef!.options).toContain('inline');
    });

    it('color select options include blue, black, and white', () => {
      const colorDef = linkPropDefinitions.find((d) => d.name === 'color');
      expect(colorDef).toBeDefined();
      expect(colorDef!.options).toContain('blue');
      expect(colorDef!.options).toContain('black');
      expect(colorDef!.options).toContain('white');
    });
  });

  describe('linkStoryStandalone (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = linkStoryStandalone.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = linkStoryStandalone.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => linkStoryStandalone.generator?.()).not.toThrow();
    });
  });

  describe('linkStoryInline (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = linkStoryInline.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = linkStoryInline.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => linkStoryInline.generator?.()).not.toThrow();
    });
  });

  describe('linkStoryColors (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = linkStoryColors.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = linkStoryColors.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => linkStoryColors.generator?.()).not.toThrow();
    });

    it('returns an element for each color variant', () => {
      const els = linkStoryColors.generator?.() ?? [];
      expect(els.length).toBe(2);
    });
  });

  describe('linkStoryDisabled (named story)', () => {
    it('generator with no args returns non-empty array', () => {
      const els = linkStoryDisabled.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = linkStoryDisabled.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('does not throw', () => {
      expect(() => linkStoryDisabled.generator?.()).not.toThrow();
    });
  });
});
