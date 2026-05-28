import { describe, it, expect } from 'vitest';

import { bannerPropDefinitions, bannerStory } from './io-banner.stories';

describe('bannerStory — generator', () => {
  it('generates a non-empty array', () => {
    const nodes = bannerStory.generator?.();
    expect(nodes).toBeDefined();
    expect(nodes!.length).toBeGreaterThan(0);
  });

  it('generates an io-banner element', () => {
    const nodes = bannerStory.generator?.();
    expect(nodes![0].tag).toBe('io-banner');
  });

  it('applies properties from state', () => {
    const nodes = bannerStory.generator?.({ properties: { variant: 'error', open: true } });
    expect((nodes![0].properties as Record<string, unknown>).variant).toBe('error');
    expect((nodes![0].properties as Record<string, unknown>).open).toBe(true);
  });

  it.each(['info', 'success', 'warning', 'error'])('renders variant %s', (variant) => {
    const nodes = bannerStory.generator?.({ properties: { variant, open: true } });
    expect(nodes![0].tag).toBe('io-banner');
  });

  it('renders with heading', () => {
    const nodes = bannerStory.generator?.({ properties: { heading: 'Maintenance', open: true } });
    expect(nodes).toBeDefined();
  });

  it('renders with dismissible', () => {
    const nodes = bannerStory.generator?.({ properties: { dismissible: true, open: true } });
    expect(nodes).toBeDefined();
  });
});

describe('bannerPropDefinitions', () => {
  it('is a non-empty array', () => {
    expect(bannerPropDefinitions.length).toBeGreaterThan(0);
  });

  it('has no duplicate names', () => {
    const names = bannerPropDefinitions.map(p => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every definition has a name, type, and defaultValue', () => {
    for (const def of bannerPropDefinitions) {
      expect(def.name).toBeTruthy();
      expect(def.type).toBeTruthy();
      expect('defaultValue' in def).toBe(true);
    }
  });

  it('variant definition has all four options', () => {
    const variantDef = bannerPropDefinitions.find(p => p.name === 'variant');
    expect(variantDef?.type).toBe('select');
    expect(variantDef?.options).toEqual(expect.arrayContaining(['info', 'success', 'warning', 'error']));
  });

  it('open definition is boolean', () => {
    const openDef = bannerPropDefinitions.find(p => p.name === 'open');
    expect(openDef?.type).toBe('boolean');
  });

  it('dismissible definition is boolean', () => {
    const dismissibleDef = bannerPropDefinitions.find(p => p.name === 'dismissible');
    expect(dismissibleDef?.type).toBe('boolean');
  });
});
