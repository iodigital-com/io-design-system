import type { IoAiTagLocale, IoAiTagVariant } from './types';

/** Translation record for a single locale. */
export type AiTagTranslation = {
  /** Short abbreviation shown in 'abbreviation' variant — e.g. 'AI' */
  short: string;
  /** Full term used as the abbr title — e.g. 'artificial intelligence' */
  long: string;
  /** Full label for 'generated' variant — e.g. 'AI-generated' */
  generated: string;
  /** Full label for 'modified' variant — e.g. 'AI-modified' */
  modified: string;
};

/**
 * Translation map for supported locales.
 * EN is the fallback for unknown locales.
 */
export const AI_TAG_TRANSLATIONS: Record<IoAiTagLocale, AiTagTranslation> = {
  en: {
    short: 'AI',
    long: 'artificial intelligence',
    generated: 'AI-generated',
    modified: 'AI-modified',
  },
  nl: {
    short: 'AI',
    long: 'kunstmatige intelligentie',
    generated: 'AI-gegenereerd',
    modified: 'AI-aangepast',
  },
};

/**
 * Returns the translation record for a locale, falling back to English
 * if the locale is not recognised.
 */
export function getAiTagTranslation(locale: string): AiTagTranslation {
  return AI_TAG_TRANSLATIONS[locale as IoAiTagLocale] ?? AI_TAG_TRANSLATIONS['en'];
}

/**
 * Returns the visible text for the given variant and locale.
 */
export function getAiTagLabel(variant: IoAiTagVariant, locale: string): string {
  const t = getAiTagTranslation(locale);
  if (variant === 'abbreviation') return t.short;
  if (variant === 'generated') return t.generated;
  return t.modified;
}
