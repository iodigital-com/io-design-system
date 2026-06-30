/**
 * io-flag CSS-in-JS style generator.
 *
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getFlagStyles(): string {
  return `
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .flag {
      display: inline-block;
      border-radius: var(--io-flag-border-radius, 2px);
      overflow: hidden;
      flex-shrink: 0;
      line-height: 0;
    }

    .flag img {
      display: block;
      width: 100%;
      height: auto;
    }

    /* ── Size scale (matches io-icon) ───────────────────────── */

    .flag--xs  { width: var(--io-icon-size-xs,  1rem); }
    .flag--sm  { width: var(--io-icon-size-sm,  1.25rem); }
    .flag--md  { width: var(--io-icon-size-md,  1.5rem); }
    .flag--lg  { width: var(--io-icon-size-lg,  2rem); }
    .flag--xl  { width: var(--io-icon-size-xl,  2.5rem); }
    .flag--inherit { width: 1em; }
  `;
}
