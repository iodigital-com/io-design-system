import { describe, it, expect } from 'vitest';
import {
  buttonStory,
  buttonPropDefinitions,
  buttonStorySolid,
  buttonStoryGhost,
  buttonStoryGhostWhite,
  buttonStoryArrows,
  buttonStorySizes,
  buttonStoryIconOnly,
  buttonStoryLoading,
  buttonStoryStates,
} from './io-button.stories';

describe('io-button storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('buttonStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => buttonStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = buttonStory.generator?.(buttonStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStory.generator?.(buttonStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(buttonStory.state?.properties).toBeDefined();
    });

    it('generator with variant=solid does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, variant: 'solid' } }),
      ).not.toThrow();
    });

    it('generator with variant=ghost does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, variant: 'ghost' } }),
      ).not.toThrow();
    });

    it('generator with color=blue does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'blue' } }),
      ).not.toThrow();
    });

    it('generator with color=white does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'white' } }),
      ).not.toThrow();
    });

    it('generator with color=black does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'black' } }),
      ).not.toThrow();
    });

    it('generator with color=antraciet does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'antraciet' } }),
      ).not.toThrow();
    });

    it('generator with color=orange does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'orange' } }),
      ).not.toThrow();
    });

    it('generator with color=pink does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'pink' } }),
      ).not.toThrow();
    });

    it('generator with color=rouge does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'rouge' } }),
      ).not.toThrow();
    });

    it('generator with color=yellow does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'yellow' } }),
      ).not.toThrow();
    });

    it('generator with color=beige does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'beige' } }),
      ).not.toThrow();
    });

    it('generator with color=grey does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, color: 'grey' } }),
      ).not.toThrow();
    });

    it('generator with size=sm does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, size: 'sm' } }),
      ).not.toThrow();
    });

    it('generator with size=md does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, size: 'md' } }),
      ).not.toThrow();
    });

    it('generator with size=lg does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, size: 'lg' } }),
      ).not.toThrow();
    });

    it('generator with size=xl does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, size: 'xl' } }),
      ).not.toThrow();
    });

    it('generator with arrow=none does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, arrow: 'none' } }),
      ).not.toThrow();
    });

    it('generator with arrow=forward does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, arrow: 'forward' } }),
      ).not.toThrow();
    });

    it('generator with arrow=back does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, arrow: 'back' } }),
      ).not.toThrow();
    });

    it('generator with arrow=down does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, arrow: 'down' } }),
      ).not.toThrow();
    });

    it('generator with arrowPlacement=right does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, arrowPlacement: 'right' } }),
      ).not.toThrow();
    });

    it('generator with arrowPlacement=left does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, arrowPlacement: 'left' } }),
      ).not.toThrow();
    });

    it('generator with disabled=true does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, disabled: true } }),
      ).not.toThrow();
    });

    it('generator with disabled=false does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, disabled: false } }),
      ).not.toThrow();
    });

    it('generator with loading=true does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, loading: true } }),
      ).not.toThrow();
    });

    it('generator with fullWidth=true does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, fullWidth: true } }),
      ).not.toThrow();
    });

    it('generator with iconOnly=true does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, iconOnly: true } }),
      ).not.toThrow();
    });

    it('generator with empty label does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, label: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty label does not throw', () => {
      expect(() =>
        buttonStory.generator?.({ properties: { ...buttonStory.state?.properties, label: 'Submit' } }),
      ).not.toThrow();
    });

    it('configurator story produces io-button as root element', () => {
      const els = buttonStory.generator?.(buttonStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-button');
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('buttonPropDefinitions', () => {
    it('is non-empty', () => {
      expect(buttonPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of buttonPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of buttonPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of buttonPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of buttonPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = buttonPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  // ── Named stories ───────────────────────────────────────────────────────
  describe('buttonStorySolid', () => {
    it('generator returns non-empty array', () => {
      const els = buttonStorySolid.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStorySolid.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonStoryGhost', () => {
    it('generator returns non-empty array', () => {
      const els = buttonStoryGhost.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStoryGhost.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonStoryGhostWhite', () => {
    it('generator returns non-empty array', () => {
      const els = buttonStoryGhostWhite.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStoryGhostWhite.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonStoryArrows', () => {
    it('generator returns non-empty array', () => {
      const els = buttonStoryArrows.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStoryArrows.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonStorySizes', () => {
    it('generator returns non-empty array', () => {
      const els = buttonStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStorySizes.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonPropDefinitions — variant includes link (#582)', () => {
    it('variant options include link', () => {
      const variantDef = buttonPropDefinitions.find((d) => d.name === 'variant');
      const opts = (variantDef as unknown as { options: string[] })?.options ?? [];
      expect(opts).toContain('link');
    });

    it('variant options include solid and ghost', () => {
      const variantDef = buttonPropDefinitions.find((d) => d.name === 'variant');
      const opts = (variantDef as unknown as { options: string[] })?.options ?? [];
      expect(opts).toContain('solid');
      expect(opts).toContain('ghost');
    });
  });

  describe('buttonStoryGhost — all 9 colors (#583)', () => {
    it('includes all 9 colors', () => {
      const els = buttonStoryGhost.generator?.() ?? [];
      const colors = els
        .filter((el) => el !== null && typeof el === 'object' && 'properties' in el)
        .map((el) => (el as unknown as { properties: { color: string } }).properties.color);
      expect(colors).toContain('orange');
      expect(colors).toContain('pink');
      expect(colors).toContain('rouge');
      expect(colors).toContain('yellow');
      expect(colors).toContain('beige');
      expect(colors).toContain('blue');
      expect(colors).toContain('black');
      expect(colors).toContain('antraciet');
      expect(colors).toContain('grey');
    });

    it('returns 9 elements', () => {
      const els = buttonStoryGhost.generator?.() ?? [];
      expect(els.length).toBe(9);
    });
  });

  describe('buttonStoryIconOnly — uses icon prop, no hardcoded × (#585)', () => {
    it('generator returns non-empty array', () => {
      const els = buttonStoryIconOnly.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStoryIconOnly.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('no element has × as slot content', () => {
      const els = buttonStoryIconOnly.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'children' in el) {
          const children = (el as { children: unknown[] }).children;
          expect(children).not.toContain('×');
        }
      }
    });

    it('icon-only elements with icon prop use icon not slot text', () => {
      const els = buttonStoryIconOnly.generator?.() ?? [];
      const withIcon = els.filter(
        (el) =>
          el !== null &&
          typeof el === 'object' &&
          'properties' in el &&
          (el as unknown as { properties: { icon?: string } }).properties.icon,
      );
      expect(withIcon.length).toBeGreaterThan(0);
    });
  });

  describe('buttonStoryLoading', () => {
    it('generator returns non-empty array', () => {
      const els = buttonStoryLoading.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStoryLoading.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('buttonStoryStates', () => {
    it('generator returns non-empty array', () => {
      const els = buttonStoryStates.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = buttonStoryStates.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });
});
