import { describe, it, expect } from 'vitest';

import { IoAiTag } from './io-ai-tag';
import { getAiTagLabel, getAiTagTranslation } from './io-ai-tag-utils';

describe('io-ai-tag — default props and render contract', () => {
  it('has generated as the default variant', () => {
    const component = new IoAiTag();
    expect(component.variant).toBe('generated');
  });

  it('has en as the default locale', () => {
    const component = new IoAiTag();
    expect(component.locale).toBe('en');
  });

  it('renders without throwing for each variant', () => {
    const variants = ['abbreviation', 'generated', 'modified'] as const;
    for (const variant of variants) {
      const component = new IoAiTag();
      component.variant = variant;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for each supported locale', () => {
    const locales = ['en', 'nl'] as const;
    for (const locale of locales) {
      const component = new IoAiTag();
      component.locale = locale;
      expect(() => component.render()).not.toThrow();
    }
  });
});

describe('io-ai-tag — utils', () => {
  it('returns English translation for locale=en', () => {
    const t = getAiTagTranslation('en');
    expect(t.short).toBe('AI');
    expect(t.long).toBe('artificial intelligence');
    expect(t.generated).toBe('AI-generated');
    expect(t.modified).toBe('AI-modified');
  });

  it('returns Dutch translation for locale=nl', () => {
    const t = getAiTagTranslation('nl');
    expect(t.short).toBe('AI');
    expect(t.long).toBe('kunstmatige intelligentie');
    expect(t.generated).toBe('AI-gegenereerd');
    expect(t.modified).toBe('AI-aangepast');
  });

  it('falls back to English for unknown locale', () => {
    const t = getAiTagTranslation('fr');
    expect(t.long).toBe('artificial intelligence');
  });

  it('getAiTagLabel returns short for abbreviation', () => {
    expect(getAiTagLabel('abbreviation', 'en')).toBe('AI');
  });

  it('getAiTagLabel returns generated string', () => {
    expect(getAiTagLabel('generated', 'en')).toBe('AI-generated');
    expect(getAiTagLabel('generated', 'nl')).toBe('AI-gegenereerd');
  });

  it('getAiTagLabel returns modified string', () => {
    expect(getAiTagLabel('modified', 'en')).toBe('AI-modified');
    expect(getAiTagLabel('modified', 'nl')).toBe('AI-aangepast');
  });
});
