import { describe, it, expect } from 'vitest';

import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

import { inlineBannerPropDefinitions, inlineBannerStory } from './io-inline-banner.stories';

function asElement(node: unknown): ElementConfig<HTMLTagOrComponent> {
  return node as ElementConfig<HTMLTagOrComponent>;
}

describe('inlineBannerStory — generator', () => {
  it('generates a non-empty array', () => {
    const nodes = inlineBannerStory.generator?.();
    expect(nodes).toBeDefined();
    expect(nodes!.length).toBeGreaterThan(0);
  });

  it('generates an io-inline-banner element', () => {
    const nodes = inlineBannerStory.generator?.();
    expect(asElement(nodes![0]).tag).toBe('io-inline-banner');
  });

  it('applies properties from state', () => {
    const nodes = inlineBannerStory.generator?.({ properties: { variant: 'error' } });
    expect((asElement(nodes![0]).properties as Record<string, unknown>).variant).toBe('error');
  });

  it.each(['info', 'success', 'warning', 'error'])('renders variant %s', (variant) => {
    const nodes = inlineBannerStory.generator?.({ properties: { variant } });
    expect(asElement(nodes![0]).tag).toBe('io-inline-banner');
  });

  it('renders with heading', () => {
    const nodes = inlineBannerStory.generator?.({ properties: { heading: 'Upload failed' } });
    expect(nodes).toBeDefined();
  });

  it('renders with dismissible', () => {
    const nodes = inlineBannerStory.generator?.({ properties: { dismissible: true } });
    expect(nodes).toBeDefined();
  });
});

describe('inlineBannerPropDefinitions', () => {
  it('is a non-empty array', () => {
    expect(inlineBannerPropDefinitions.length).toBeGreaterThan(0);
  });

  it('has no duplicate names', () => {
    const names = inlineBannerPropDefinitions.map(p => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every definition has a name, type, and defaultValue', () => {
    for (const def of inlineBannerPropDefinitions) {
      expect(def.name).toBeTruthy();
      expect(def.type).toBeTruthy();
      expect('defaultValue' in def).toBe(true);
    }
  });

  it('variant definition has all four options', () => {
    const variantDef = inlineBannerPropDefinitions.find(p => p.name === 'variant');
    expect(variantDef?.type).toBe('select');
    expect((variantDef as unknown as { options: string[] })?.options).toEqual(
      expect.arrayContaining(['info', 'success', 'warning', 'error']),
    );
  });

  it('has no open prop (visibility controlled by mount/unmount)', () => {
    const openDef = inlineBannerPropDefinitions.find(p => p.name === 'open');
    expect(openDef).toBeUndefined();
  });

  it('dismissible definition is boolean', () => {
    const dismissibleDef = inlineBannerPropDefinitions.find(p => p.name === 'dismissible');
    expect(dismissibleDef?.type).toBe('boolean');
  });
});
