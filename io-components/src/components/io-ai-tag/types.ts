/**
 * Variant controls which form of the AI disclosure is shown.
 *
 * - 'abbreviation' — renders <abbr title="artificial intelligence">AI</abbr>
 * - 'generated'    — renders the locale-specific "AI-generated" string
 * - 'modified'     — renders the locale-specific "AI-modified" string
 */
export type IoAiTagVariant = 'abbreviation' | 'generated' | 'modified';

/** BCP 47-style locale key — only 'en' and 'nl' are currently shipped. */
export type IoAiTagLocale = 'en' | 'nl';
