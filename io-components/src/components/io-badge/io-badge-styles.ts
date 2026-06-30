/**
 * io-badge CSS-in-JS style generator.
 *
 * Returns a <style> string for the badge component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getBadgeStyles(): string {
  return `
    :host {
      display: inline-flex;
      font-family: var(--io-font-primary);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-1);
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-tight);
      border-radius: var(--io-border-radius-pill);
      border: 1px solid transparent;
      white-space: nowrap;
    }

    .badge--sm {
      padding: var(--io-space-1) var(--io-space-3);
      font-size: var(--io-font-size-xs);
      min-height: var(--io-space-6);
    }

    .badge--md {
      padding: var(--io-space-2) var(--io-space-4);
      font-size: var(--io-font-size-sm);
      min-height: var(--io-space-10);
    }

    .badge--lg {
      padding: var(--io-space-3) var(--io-space-5);
      font-size: var(--io-font-size-base);
      min-height: var(--io-space-12);
    }

    /* ── Semantic variant × appearance combinations ─────── */

    .badge--beige {
      background-color: var(--io-color-beige);
      color: var(--io-text-primary);
      border-color: var(--io-color-beige);
    }

    /* 'dark' variant: intentionally inverted — uses semantic strong tokens
       so the background/foreground flip correctly in dark mode */
    .badge--dark {
      background-color: var(--io-tag-strong-bg);
      color: var(--io-tag-strong-fg);
      border-color: var(--io-tag-strong-bg);
    }

    /* neutral */
    .badge--neutral.badge--soft {
      background-color: var(--io-state-hover);
      color: var(--io-text-primary);
      border-color: var(--io-border);
    }
    .badge--neutral.badge--solid {
      background-color: var(--io-color-grey-6);
      color: var(--io-color-white);
      border-color: var(--io-color-grey-6);
    }
    .badge--neutral.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-grey-6) 12%, transparent);
      color: var(--io-text-primary);
      border-color: var(--io-border);
      backdrop-filter: blur(8px);
    }

    /* primary */
    .badge--primary.badge--soft {
      background-color: var(--io-accent-bg);
      color: var(--io-accent-text);
      border-color: color-mix(in srgb, var(--io-accent-text) 25%, transparent);
    }
    .badge--primary.badge--solid {
      background-color: var(--io-color-primary);
      color: var(--io-color-white);
      border-color: var(--io-color-primary);
    }
    .badge--primary.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-primary) 12%, transparent);
      color: var(--io-color-primary);
      border-color: color-mix(in srgb, var(--io-color-primary) 40%, transparent);
      backdrop-filter: blur(8px);
    }

    /* info */
    .badge--info.badge--soft {
      background-color: color-mix(in srgb, var(--io-color-info, #0077CC) 12%, transparent);
      color: var(--io-color-info, #0077CC);
      border-color: var(--io-color-info, #0077CC);
    }
    .badge--info.badge--solid {
      background-color: var(--io-color-info, #0077CC);
      color: var(--io-color-white);
      border-color: var(--io-color-info, #0077CC);
    }
    .badge--info.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-info, #0077CC) 12%, transparent);
      color: var(--io-color-info, #0077CC);
      border-color: color-mix(in srgb, var(--io-color-info, #0077CC) 40%, transparent);
      backdrop-filter: blur(8px);
    }

    /* success */
    .badge--success.badge--soft {
      background-color: var(--io-color-success-soft);
      color: var(--io-color-success);
      border-color: var(--io-color-success);
    }
    .badge--success.badge--solid {
      background-color: var(--io-color-success);
      color: var(--io-color-white);
      border-color: var(--io-color-success);
    }
    .badge--success.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-success) 12%, transparent);
      color: var(--io-color-success);
      border-color: color-mix(in srgb, var(--io-color-success) 40%, transparent);
      backdrop-filter: blur(8px);
    }

    /* warning */
    .badge--warning.badge--soft {
      background-color: var(--io-color-warning-soft);
      color: var(--io-color-warning);
      border-color: var(--io-color-warning);
    }
    .badge--warning.badge--solid {
      background-color: var(--io-color-warning);
      color: var(--io-color-white);
      border-color: var(--io-color-warning);
    }
    .badge--warning.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-warning) 12%, transparent);
      color: var(--io-color-warning);
      border-color: color-mix(in srgb, var(--io-color-warning) 40%, transparent);
      backdrop-filter: blur(8px);
    }

    /* error */
    .badge--error.badge--soft {
      background-color: var(--io-color-error-soft);
      color: var(--io-color-error);
      border-color: var(--io-color-error);
    }
    .badge--error.badge--solid {
      background-color: var(--io-color-error);
      color: var(--io-color-white);
      border-color: var(--io-color-error);
    }
    .badge--error.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-error) 12%, transparent);
      color: var(--io-color-error);
      border-color: color-mix(in srgb, var(--io-color-error) 40%, transparent);
      backdrop-filter: blur(8px);
    }

    /* subtle */
    .badge--subtle.badge--soft {
      background-color: var(--io-color-off-white);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-beige);
    }
    .badge--subtle.badge--solid {
      background-color: var(--io-color-beige);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-beige);
    }
    .badge--subtle.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-beige) 30%, transparent);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-beige);
      backdrop-filter: blur(8px);
    }

    /* ── Deprecated brand-colour aliases ────────────────── */
    /* These map to semantic equivalents for backwards compatibility */

    .badge--blue.badge--soft {
      background-color: var(--io-accent-bg);
      color: var(--io-accent-text);
      border-color: color-mix(in srgb, var(--io-accent-text) 25%, transparent);
    }
    .badge--blue.badge--solid {
      background-color: var(--io-color-primary);
      color: var(--io-color-white);
      border-color: var(--io-color-primary);
    }
    .badge--blue.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-primary) 12%, transparent);
      color: var(--io-color-primary);
      border-color: color-mix(in srgb, var(--io-color-primary) 40%, transparent);
      backdrop-filter: blur(8px);
    }

    .badge--beige.badge--soft,
    .badge--beige.badge--solid {
      background-color: var(--io-color-beige);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-beige);
    }
    .badge--beige.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-beige) 30%, transparent);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-beige);
      backdrop-filter: blur(8px);
    }

    .badge--dark.badge--soft,
    .badge--dark.badge--solid {
      background-color: var(--io-color-grey-6);
      color: var(--io-color-white);
      border-color: var(--io-color-grey-6);
    }
    .badge--dark.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-grey-6) 30%, transparent);
      color: var(--io-text-primary);
      border-color: var(--io-border);
      backdrop-filter: blur(8px);
    }

    .badge--orange.badge--soft,
    .badge--orange.badge--solid {
      background-color: var(--io-color-orange);
      color: var(--io-color-white);
      border-color: var(--io-color-orange);
    }
    .badge--orange.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-orange) 15%, transparent);
      color: var(--io-color-orange);
      border-color: var(--io-color-orange);
      backdrop-filter: blur(8px);
    }

    .badge--rouge.badge--soft,
    .badge--rouge.badge--solid {
      background-color: var(--io-color-rouge);
      color: var(--io-color-white);
      border-color: var(--io-color-rouge);
    }
    .badge--rouge.badge--frosted {
      background-color: color-mix(in srgb, var(--io-color-rouge) 15%, transparent);
      color: var(--io-color-rouge);
      border-color: var(--io-color-rouge);
      backdrop-filter: blur(8px);
    }

    .badge--outline.badge--soft,
    .badge--outline.badge--solid,
    .badge--outline.badge--frosted {
      background-color: transparent;
      color: var(--io-text-primary);
      border-color: var(--io-border);
    }

    @media (prefers-reduced-motion: reduce) {
      .badge { transition: none; }
    }

    /* ── Forced colors (issue #1120) ────────────────────── */

    @media (forced-colors: active) {
      .badge {
        border: 1px solid ButtonText;
        color: ButtonText;
        background: ButtonFace;
      }
    }
  `;
}
