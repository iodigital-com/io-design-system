/**
 * io-ai-tag CSS-in-JS style generator.
 *
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getAiTagStyles(): string {
  return `
    :host {
      display: inline-flex;
      font-family: var(--io-font-primary);
      vertical-align: middle;
    }

    .ai-tag {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-1);
      padding: var(--io-ai-tag-padding-y, var(--io-space-1)) var(--io-ai-tag-padding-x, var(--io-space-2));
      border-radius: var(--io-border-radius-pill);
      border: 1px solid var(--io-ai-tag-border-color, var(--io-color-primary));
      background: var(--io-ai-tag-bg, var(--io-color-primary-bg));
      color: var(--io-ai-tag-color, var(--io-color-primary));
      font-size: var(--io-ai-tag-font-size, var(--io-font-size-xs));
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-tight);
      white-space: nowrap;
      -webkit-font-smoothing: antialiased;
    }

    /* Sparkle icon */
    .ai-tag__icon {
      display: inline-flex;
      flex-shrink: 0;
    }

    abbr {
      text-decoration: none;
      cursor: help;
    }
  `;
}
