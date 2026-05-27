export function getWordmarkStyles(): string {
  return `
    :host {
      display: inline-flex;
      font-family: var(--io-font-primary, 'Manrope', sans-serif);
    }

    /* ── variant='text' — link wrapper (rendered when href is set) ── */

    .wordmark-link {
      display: inline-flex;
      text-decoration: none;
      color: inherit;
      border-radius: var(--io-border-radius-xs);
      outline-offset: 2px;
    }

    .wordmark-link:focus-visible {
      outline: 2px solid var(--io-border-focus);
      outline-offset: 2px;
    }

    /* ── variant='text' — typographic wordmark ────────────────────── */

    .wordmark {
      display: inline-flex;
      align-items: baseline;
      font-family: var(--io-font-primary, 'Manrope', sans-serif);
      font-weight: 700;
      line-height: 1;
      white-space: nowrap;
      letter-spacing: var(--io-wordmark-letter-spacing);
    }

    .wordmark--sm { font-size: var(--io-wordmark-font-size-sm); }
    .wordmark--md { font-size: var(--io-wordmark-font-size-md); }
    .wordmark--lg { font-size: var(--io-wordmark-font-size-lg); }
    .wordmark--xl { font-size: var(--io-wordmark-font-size-xl); }

    /* Default: "io" in brand blue, "digital" in currentColor */
    .wordmark__io    { color: var(--io-color-primary, #0000D2); }
    .wordmark__digital { color: currentColor; }

    /* color='black' on text variant */
    :host([variant="text"][color="black"]) .wordmark__io,
    :host([variant="text"][color="black"]) .wordmark__digital { color: var(--io-color-grey-6, #242424); }

    /* color='white' on text variant */
    :host([variant="text"][color="white"]) .wordmark__io,
    :host([variant="text"][color="white"]) .wordmark__digital { color: var(--io-color-white, #ffffff); }

    /* mono mode — both parts use currentColor (backwards-compat, text only) */
    :host([mono]) .wordmark__io { color: currentColor; }

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

    /* ── Color tokens for mark + lockup (drives SVG fill via currentColor) */

    :host([variant="mark"][color="blue"]),
    :host([variant="lockup"][color="blue"])  { color: var(--io-color-primary, #0000D2); }

    :host([variant="mark"][color="black"]),
    :host([variant="lockup"][color="black"]) { color: var(--io-color-grey-6, #242424); }

    :host([variant="mark"][color="white"]),
    :host([variant="lockup"][color="white"]) { color: var(--io-color-white, #ffffff); }

    /* beige: mark only (not a supported lockup colour, but rendered visibly as fallback) */
    :host([variant="mark"][color="beige"]),
    :host([variant="lockup"][color="beige"]) { color: var(--io-color-beige, #DCCFC2); }

    @media (prefers-reduced-motion: reduce) {
      .wordmark { transition: none; }
    }
  `;
}
