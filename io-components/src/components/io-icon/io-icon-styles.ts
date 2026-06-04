/**
 * io-icon CSS-in-JS style generator.
 *
 * Returns a <style> string for the icon component's Shadow DOM.
 * ALL sizing references use var(--io-icon-size-*) custom properties.
 *
 * GOVERNANCE: Do not hardcode px values — add tokens to src/global/app.css first.
 */
export function getIconStyles(): string {
  return `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      color: currentColor;
    }
    :host([size="xs"]) { width: var(--io-icon-size-xs, 12px); height: var(--io-icon-size-xs, 12px); }
    :host([size="sm"]) { width: var(--io-icon-size-sm, 16px); height: var(--io-icon-size-sm, 16px); }
    :host([size="md"]) { width: var(--io-icon-size-md, 20px); height: var(--io-icon-size-md, 20px); }
    :host([size="lg"]) { width: var(--io-icon-size-lg, 24px); height: var(--io-icon-size-lg, 24px); }
    :host([size="xl"]) { width: var(--io-icon-size-xl, 32px); height: var(--io-icon-size-xl, 32px); }
    svg { width: 100%; height: 100%; display: block; }
  `;
}
