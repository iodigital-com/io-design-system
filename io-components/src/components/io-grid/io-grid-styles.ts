/**
 * io-grid CSS generator.
 *
 * Returns a <style> string injected into the shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getGridStyles(): string {
  return `
    :host {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(var(--io-grid-columns, 12), 1fr);
      gap: var(--io-grid-gap-md);
      align-items: start;
      justify-items: stretch;
      box-sizing: border-box;
    }

    :host([gap="none"]) { gap: var(--io-grid-gap-none); }
    :host([gap="sm"])   { gap: var(--io-grid-gap-sm); }
    :host([gap="md"])   { gap: var(--io-grid-gap-md); }
    :host([gap="lg"])   { gap: var(--io-grid-gap-lg); }

    :host([align="start"])   { align-items: start; }
    :host([align="center"])  { align-items: center; }
    :host([align="end"])     { align-items: end; }
    :host([align="stretch"]) { align-items: stretch; }

    :host([justify="start"])   { justify-items: start; }
    :host([justify="center"])  { justify-items: center; }
    :host([justify="end"])     { justify-items: end; }
    :host([justify="stretch"]) { justify-items: stretch; }
  `;
}
