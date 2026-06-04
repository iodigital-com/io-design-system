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
    span { display: contents; }
    svg { display: block; }
    :host([size="xs"]) svg { width: var(--io-icon-size-xs, 12px); height: var(--io-icon-size-xs, 12px); }
    :host([size="sm"]) svg { width: var(--io-icon-size-sm, 16px); height: var(--io-icon-size-sm, 16px); }
    :host([size="md"]) svg { width: var(--io-icon-size-md, 20px); height: var(--io-icon-size-md, 20px); }
    :host([size="lg"]) svg { width: var(--io-icon-size-lg, 24px); height: var(--io-icon-size-lg, 24px); }
    :host([size="xl"]) svg { width: var(--io-icon-size-xl, 32px); height: var(--io-icon-size-xl, 32px); }
    :host([name="arrow-right"]:dir(rtl)) svg,
    :host([name="arrow-left"]:dir(rtl)) svg,
    :host([name="chevron-right"]:dir(rtl)) svg,
    :host([name="chevron-left"]:dir(rtl)) svg,
    :host([name="log-out"]:dir(rtl)) svg,
    :host([flip]) svg { transform: scaleX(-1); }
  `;
}
