import { describe, it, expect } from 'vitest';

import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

import { inlineNotificationPropDefinitions, inlineNotificationStory } from './io-inline-notification.stories';

function asElement(node: unknown): ElementConfig<HTMLTagOrComponent> {
  return node as ElementConfig<HTMLTagOrComponent>;
}

describe('inlineNotificationStory — generator', () => {
  it('generates a non-empty array', () => {
    const nodes = inlineNotificationStory.generator?.();
    expect(nodes).toBeDefined();
    expect(nodes!.length).toBeGreaterThan(0);
  });

  it('generates an io-inline-notification element', () => {
    const nodes = inlineNotificationStory.generator?.();
    expect(asElement(nodes![0]).tag).toBe('io-inline-notification');
  });

  it('applies properties from state', () => {
    const nodes = inlineNotificationStory.generator?.({ properties: { variant: 'error' } });
    expect((asElement(nodes![0]).properties as Record<string, unknown>).variant).toBe('error');
  });

  it.each(['info', 'success', 'warning', 'error'])('renders variant %s', (variant) => {
    const nodes = inlineNotificationStory.generator?.({ properties: { variant } });
    expect(asElement(nodes![0]).tag).toBe('io-inline-notification');
  });

  it('renders with heading', () => {
    const nodes = inlineNotificationStory.generator?.({ properties: { heading: 'Upload failed' } });
    expect(nodes).toBeDefined();
  });

  it('renders with dismissible', () => {
    const nodes = inlineNotificationStory.generator?.({ properties: { dismissible: true } });
    expect(nodes).toBeDefined();
  });
});

describe('inlineNotificationPropDefinitions', () => {
  it('is a non-empty array', () => {
    expect(inlineNotificationPropDefinitions.length).toBeGreaterThan(0);
  });

  it('has no duplicate names', () => {
    const names = inlineNotificationPropDefinitions.map(p => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('every definition has a name, type, and defaultValue', () => {
    for (const def of inlineNotificationPropDefinitions) {
      expect(def.name).toBeTruthy();
      expect(def.type).toBeTruthy();
      expect('defaultValue' in def).toBe(true);
    }
  });

  it('variant definition has all four options', () => {
    const variantDef = inlineNotificationPropDefinitions.find(p => p.name === 'variant');
    expect(variantDef?.type).toBe('select');
    expect((variantDef as unknown as { options: string[] })?.options).toEqual(
      expect.arrayContaining(['info', 'success', 'warning', 'error']),
    );
  });

  it('has no open prop (visibility controlled by mount/unmount)', () => {
    const openDef = inlineNotificationPropDefinitions.find(p => p.name === 'open');
    expect(openDef).toBeUndefined();
  });

  it('dismissible definition is boolean', () => {
    const dismissibleDef = inlineNotificationPropDefinitions.find(p => p.name === 'dismissible');
    expect(dismissibleDef?.type).toBe('boolean');
  });
});
