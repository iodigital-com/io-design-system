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
    .mark-svg--inherit { height: inherit; }

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
    .lockup-svg--inherit { height: inherit; }

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
