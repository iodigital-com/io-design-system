/**
 * io-icon CSS-in-JS style generator.
 *
 * Returns a <style> string for the icon component's Shadow DOM.
 * ALL sizing references use var(--io-icon-size-*) custom properties.
 *
 * --io-icon-size: per-instance CSS variable override (takes precedence over size prop).
 * fixedWidth: forces :host width to match size dimension for consistent column alignment.
 * size="inherit": icon dimensions match parent font-size (useful for inline-with-text).
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
    :host([size="xs"]) svg { width: var(--io-icon-size, var(--io-icon-size-xs, 12px)); height: var(--io-icon-size, var(--io-icon-size-xs, 12px)); }
    :host([size="sm"]) svg { width: var(--io-icon-size, var(--io-icon-size-sm, 16px)); height: var(--io-icon-size, var(--io-icon-size-sm, 16px)); }
    :host([size="md"]) svg { width: var(--io-icon-size, var(--io-icon-size-md, 20px)); height: var(--io-icon-size, var(--io-icon-size-md, 20px)); }
    :host([size="lg"]) svg { width: var(--io-icon-size, var(--io-icon-size-lg, 24px)); height: var(--io-icon-size, var(--io-icon-size-lg, 24px)); }
    :host([size="xl"]) svg { width: var(--io-icon-size, var(--io-icon-size-xl, 32px)); height: var(--io-icon-size, var(--io-icon-size-xl, 32px)); }
    :host([size="inherit"]) svg { width: var(--io-icon-size, 1em); height: var(--io-icon-size, 1em); }
    :host([fixed-width][size="xs"]) { width: var(--io-icon-size, var(--io-icon-size-xs, 12px)); }
    :host([fixed-width][size="sm"]) { width: var(--io-icon-size, var(--io-icon-size-sm, 16px)); }
    :host([fixed-width][size="md"]) { width: var(--io-icon-size, var(--io-icon-size-md, 20px)); }
    :host([fixed-width][size="lg"]) { width: var(--io-icon-size, var(--io-icon-size-lg, 24px)); }
    :host([fixed-width][size="xl"]) { width: var(--io-icon-size, var(--io-icon-size-xl, 32px)); }
    :host([fixed-width][size="inherit"]) { width: var(--io-icon-size, 1em); }
    :host([name="arrow-right"]:dir(rtl)) svg,
    :host([name="arrow-left"]:dir(rtl)) svg,
    :host([name="chevron-right"]:dir(rtl)) svg,
    :host([name="chevron-left"]:dir(rtl)) svg,
    :host([name="log-out"]:dir(rtl)) svg,
    :host([flip]) svg { transform: scaleX(-1); }
  `;
}
