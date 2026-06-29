/**
 * io-tag-dismissible CSS-in-JS style generator.
 *
 * Returns a <style> string for the tag-dismissible component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getTagDismissibleStyles(): string {
  return `
    :host {
      display: inline-flex;
      font-family: var(--io-font-primary);
    }

    /* ── Tag group wrapper ──────────────────────────────────── */

    .tag-dismissible {
      display: inline-flex;
      align-items: stretch;
      border-radius: var(--io-border-radius-pill);
      border: 1px solid var(--io-border);
      overflow: hidden;
      transition: border-color var(--io-motion-fast), background-color var(--io-motion-fast);
      min-height: var(--io-touch-target-min);
    }

    /* ── Colour variants ────────────────────────────────────── */

    .tag-dismissible--default {
      background: transparent;
      border-color: var(--io-border);
    }

    .tag-dismissible--blue {
      background: var(--io-color-primary-bg);
      border-color: var(--io-color-primary);
      color: var(--io-color-primary);
    }

    .tag-dismissible--beige {
      background: var(--io-color-off-white);
      border-color: var(--io-color-beige);
      color: var(--io-text-primary);
    }

    /* 'dark' variant: intentionally inverted — uses semantic strong tokens
       so the background/foreground flip correctly in dark mode */
    .tag-dismissible--dark {
      background: var(--io-tag-strong-bg);
      border-color: var(--io-tag-strong-bg);
      color: var(--io-tag-strong-fg);
    }

    .tag-dismissible--orange {
      background: var(--io-color-orange);
      border-color: var(--io-color-orange);
      color: var(--io-color-white);
    }

    .tag-dismissible--rouge {
      background: var(--io-color-rouge);
      border-color: var(--io-color-rouge);
      color: var(--io-color-white);
    }

    .tag-dismissible--success {
      background: var(--io-color-success-soft);
      border-color: var(--io-color-success);
      color: var(--io-color-success);
    }

    .tag-dismissible--warning {
      background: var(--io-color-warning-soft);
      border-color: var(--io-color-warning);
      color: var(--io-color-warning);
    }

    .tag-dismissible--error {
      background: var(--io-color-error-soft);
      border-color: var(--io-color-error);
      color: var(--io-color-error);
    }

    .tag-dismissible--outline {
      background: transparent;
      border-color: var(--io-border);
      color: var(--io-text-primary);
    }

    /* ── Label span ─────────────────────────────────────────── */

    .tag-dismissible__label {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-1);
      padding: var(--io-space-1) var(--io-space-2) var(--io-space-1) var(--io-space-3);
      font-family: var(--io-font-primary);
      font-weight: var(--io-font-weight-medium);
      font-size: var(--io-font-size-sm);
      white-space: nowrap;
      color: inherit;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Dismiss button ─────────────────────────────────────── */

    .tag-dismissible__dismiss {
      border: none;
      border-left: 1px solid var(--io-border);
      border-radius: 0;
      background: transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--io-text-secondary);
      transition: color var(--io-motion-fast), background-color var(--io-motion-fast);
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
      padding: 0 var(--io-space-2);
    }

    /* Colour-variant border overrides for the dismiss divider */
    .tag-dismissible--blue .tag-dismissible__dismiss {
      border-left-color: var(--io-color-primary);
      color: var(--io-color-primary);
    }

    .tag-dismissible--orange .tag-dismissible__dismiss,
    .tag-dismissible--rouge .tag-dismissible__dismiss {
      border-left-color: var(--io-color-white-alpha-30);
      color: var(--io-color-white);
    }

    /* dark variant: divider and icon use the strong-fg semantic token so
       they remain legible when strong-bg flips in dark mode */
    .tag-dismissible--dark .tag-dismissible__dismiss {
      border-left-color: color-mix(in srgb, var(--io-tag-strong-fg) 30%, transparent);
      color: var(--io-tag-strong-fg);
    }

    .tag-dismissible--success .tag-dismissible__dismiss {
      border-left-color: var(--io-color-success);
      color: var(--io-color-success);
    }

    .tag-dismissible--warning .tag-dismissible__dismiss {
      border-left-color: var(--io-color-warning);
      color: var(--io-color-warning);
    }

    .tag-dismissible--error .tag-dismissible__dismiss {
      border-left-color: var(--io-color-error);
      color: var(--io-color-error);
    }

    @media (hover: hover) and (pointer: fine) {
      .tag-dismissible__dismiss:hover {
        color: var(--io-text-primary);
        background: var(--io-state-hover);
      }

      .tag-dismissible--outline .tag-dismissible__dismiss:hover {
        color: var(--io-text-primary);
        background: var(--io-state-hover);
      }

      .tag-dismissible--dark .tag-dismissible__dismiss:hover {
        opacity: 0.85;
        color: var(--io-tag-strong-fg);
      }

      .tag-dismissible--orange .tag-dismissible__dismiss:hover,
      .tag-dismissible--rouge .tag-dismissible__dismiss:hover {
        opacity: 0.85;
        color: var(--io-color-white);
      }
    }

    .tag-dismissible__dismiss:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Disabled state ─────────────────────────────────────── */

    :host([disabled]) {
      cursor: not-allowed;
    }

    .tag-dismissible--disabled {
      opacity: var(--io-opacity-disabled, 0.4);
      pointer-events: none;
    }

    /* ── Reduced motion ─────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .tag-dismissible,
      .tag-dismissible__dismiss {
        transition: none;
      }
    }
  `;
}
