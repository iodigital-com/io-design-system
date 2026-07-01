export function getWordmarkStyles(): string {
  return `
    :host {
      display: inline-flex;
    }

    /* ── variant='mark' — geometric iO mark SVG ──────────────────── */

    .mark-svg {
      display: block;
      height: var(--io-wordmark-mark-height-md);
      width: auto;
    }

    .mark-svg--sm { height: var(--io-wordmark-mark-height-sm); }
    .mark-svg--md { height: var(--io-wordmark-mark-height-md); }
    .mark-svg--lg { height: var(--io-wordmark-mark-height-lg); }
    .mark-svg--xl { height: var(--io-wordmark-mark-height-xl); }

    /* size='inherit': no fixed height — consumer sets height on the host via CSS.
       The SVG stretches to fill the host via height: 100%.
       Usage: <io-wordmark size="inherit" style="height: 48px"> */
    :host([size="inherit"]) {
      height: 100%;
    }
    .mark-svg--inherit {
      height: 100%;
      width: auto;
    }

    /* ── variant='lockup' — full brand SVG (mark + text) ─────────── */

    .lockup-svg {
      display: block;
      height: var(--io-wordmark-lockup-height-md);
      width: auto;
    }

    .lockup-svg--sm { height: var(--io-wordmark-lockup-height-sm); }
    .lockup-svg--md { height: var(--io-wordmark-lockup-height-md); }
    .lockup-svg--lg { height: var(--io-wordmark-lockup-height-lg); }
    .lockup-svg--xl { height: var(--io-wordmark-lockup-height-xl); }
    .lockup-svg--inherit {
      height: 100%;
      width: auto;
    }

    /* ── variant='badge' — square brand mark for app icons ───────── */

    .badge-svg {
      display: block;
      width: var(--io-wordmark-badge-size-md);
      height: var(--io-wordmark-badge-size-md);
      border-radius: var(--io-wordmark-badge-border-radius);
    }

    .badge-svg--sm { width: var(--io-wordmark-badge-size-sm); height: var(--io-wordmark-badge-size-sm); }
    .badge-svg--md { width: var(--io-wordmark-badge-size-md); height: var(--io-wordmark-badge-size-md); }
    .badge-svg--lg { width: var(--io-wordmark-badge-size-lg); height: var(--io-wordmark-badge-size-lg); }
    .badge-svg--xl { width: var(--io-wordmark-badge-size-xl); height: var(--io-wordmark-badge-size-xl); }
    .badge-svg--inherit {
      width: 100%;
      height: 100%;
    }

    /* ── Color tokens for mark + lockup (drives SVG fill via currentColor) */

    :host([variant="mark"][color="blue"]),
    :host([variant="lockup"][color="blue"])  { color: var(--io-color-primary); }

    :host([variant="mark"][color="black"]),
    :host([variant="lockup"][color="black"]) { color: var(--io-color-grey-6); }

    :host([variant="mark"][color="white"]),
    :host([variant="lockup"][color="white"]) { color: var(--io-color-white); }

    /* beige: mark only (not a supported lockup colour, but rendered visibly as fallback) */
    :host([variant="mark"][color="beige"]),
    :host([variant="lockup"][color="beige"]) { color: var(--io-color-beige); }

    /* ── Color tokens for badge variant (background color via currentColor) */

    :host([variant="badge"][color="blue"])  { color: var(--io-color-primary); }
    :host([variant="badge"][color="black"]) { color: var(--io-color-grey-6); }
    :host([variant="badge"][color="white"]) { color: var(--io-color-white); }
    :host([variant="badge"][color="beige"]) { color: var(--io-color-beige); }

    /* Badge glyph fill — overridden via --io-wordmark-badge-glyph-color */
    .badge-glyph path {
      fill: var(--io-wordmark-badge-glyph-color);
    }

    /* ── Link mode (when href is set) ──────────────────────────────────── */

    a {
      display: inline-flex;
      text-decoration: none;
      color: inherit;
    }

    a:focus-visible {
      outline: var(--io-focus-ring-active);
      outline-offset: 2px;
      border-radius: var(--io-border-radius-2xs);
    }

  `;
}
