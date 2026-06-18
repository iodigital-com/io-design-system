/**
 * io-divider CSS-in-JS style generator.
 *
 * Returns a <style> string for the divider component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or sizes here.
 *     Add new tokens to src/global/app.css first, then reference them.
 *
 * Color variants map to border tokens:
 *   subtle  → rgba(var(--io-border-rgb), 0.5)  — 50% opacity of the standard border
 *   default → var(--io-divider-color)           — resolves to var(--io-border)
 *   strong  → var(--io-border-hover)            — more prominent separation
 */
export function getDividerStyles(): string {
  return `
    :host {
      display: block;
    }

    :host([orientation="vertical"]) {
      display: inline-flex;
      align-self: stretch;
    }

    /* ── Color variants ─────────────────────────────────────── */

    :host([color="subtle"]) {
      --io-divider-color-resolved: rgba(var(--io-border-rgb), 0.5);
    }

    :host([color="strong"]) {
      --io-divider-color-resolved: var(--io-border-hover);
    }

    :host([color="default"]),
    :host {
      --io-divider-color-resolved: var(--io-divider-color);
    }

    /* ── Horizontal divider (default) ───────────────────────── */

    .divider {
      border: none;
      border-top: var(--io-divider-thickness) solid var(--io-divider-color-resolved);
      margin: 0;
      width: 100%;
    }

    /* ── Vertical divider ───────────────────────────────────── */

    .divider--vertical {
      border: none;
      border-left: var(--io-divider-thickness) solid var(--io-divider-color-resolved);
      height: 100%;
      width: 0;
      align-self: stretch;
    }

    /* ── Labeled divider ────────────────────────────────────── */

    .divider--labeled {
      display: flex;
      align-items: center;
      gap: var(--io-divider-gap);
      border: none;
      width: 100%;
    }

    .divider__line {
      flex: 1;
      display: block;
      height: var(--io-divider-thickness);
      background: var(--io-divider-color-resolved);
    }

    .divider__label {
      font-family: var(--io-font-primary);
      font-size: var(--io-divider-label-size);
      color: var(--io-text-secondary);
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Windows High Contrast Mode (forced-colors) ──────────── */

    @media (forced-colors: active) {
      .divider {
        border-top-color: ButtonText;
      }

      .divider--vertical {
        border-left-color: ButtonText;
      }

      .divider__line {
        background: ButtonText;
      }
    }
  `;
}
