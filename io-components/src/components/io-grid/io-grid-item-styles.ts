/**
 * io-grid-item CSS generator.
 *
 * Returns a <style> string injected into the shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getGridItemStyles(): string {
  return `
    :host {
      display: block;
      box-sizing: border-box;
      min-width: 0;
    }
  `;
}
