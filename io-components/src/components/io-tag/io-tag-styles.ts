/**
 * io-tag CSS-in-JS style generator.
 *
 * Returns a <style> string for the tag component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getTagStyles(): string {
  return `
    :host {
      display: inline-flex;
      font-family: var(--io-font-primary);
    }

    /* ── Base tag button ─────────────────────────────────── */

    .tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--io-space-1);
      border-radius: var(--io-border-radius-pill);
      border: 1px solid var(--io-border);
      background: transparent;
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      font-weight: var(--io-font-weight-medium);
      cursor: pointer;
      white-space: nowrap;
      transition:
        background-color var(--io-motion-fast),
        border-color     var(--io-motion-fast),
        color            var(--io-motion-fast);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Sizes ──────────────────────────────────────────── */

    .tag--sm {
      padding: var(--io-space-1) var(--io-space-3);
      font-size: var(--io-font-size-xs);
      min-height: var(--io-space-6);
    }

    .tag--md {
      padding: var(--io-space-2) var(--io-space-4);
      font-size: var(--io-font-size-sm);
      min-height: var(--io-space-10);
    }

    /* ── Semantic variant × appearance combinations ─────── */

    /* neutral */
    .tag--neutral.tag--soft {
      background: transparent;
      border-color: var(--io-border);
      color: var(--io-text-primary);
    }
    .tag--neutral.tag--solid {
      background: var(--io-color-grey-6);
      border-color: var(--io-color-grey-6);
      color: var(--io-color-white);
    }

    .tag--blue {
      background: var(--io-color-primary-bg);
      border-color: var(--io-color-primary);
      color: var(--io-color-primary);
    }

    .tag--beige {
      background: var(--io-color-off-white);
      border-color: var(--io-color-beige);
      color: var(--io-text-primary);
    }

    /* 'dark' variant: intentionally inverted — uses semantic strong tokens
       so the background/foreground flip correctly in dark mode */
    .tag--dark {
      background: var(--io-tag-strong-bg);
      border-color: var(--io-tag-strong-bg);
      color: var(--io-tag-strong-fg);
    }
    .tag--neutral.tag--frosted {
      background: color-mix(in srgb, var(--io-color-grey-6) 12%, transparent);
      border-color: var(--io-border);
      backdrop-filter: blur(8px);
      color: var(--io-text-primary);
    }

    /* primary */
    .tag--primary.tag--soft {
      background: var(--io-color-primary-bg);
      border-color: var(--io-color-primary);
      color: var(--io-color-primary);
    }
    .tag--primary.tag--solid {
      background: var(--io-color-primary);
      border-color: var(--io-color-primary);
      color: var(--io-color-white);
    }
    .tag--primary.tag--frosted {
      background: color-mix(in srgb, var(--io-color-primary) 12%, transparent);
      border-color: color-mix(in srgb, var(--io-color-primary) 40%, transparent);
      backdrop-filter: blur(8px);
      color: var(--io-color-primary);
    }

    /* info */
    .tag--info.tag--soft {
      background: color-mix(in srgb, var(--io-color-info, #0077CC) 12%, transparent);
      border-color: var(--io-color-info, #0077CC);
      color: var(--io-color-info, #0077CC);
    }
    .tag--info.tag--solid {
      background: var(--io-color-info, #0077CC);
      border-color: var(--io-color-info, #0077CC);
      color: var(--io-color-white);
    }
    .tag--info.tag--frosted {
      background: color-mix(in srgb, var(--io-color-info, #0077CC) 12%, transparent);
      border-color: color-mix(in srgb, var(--io-color-info, #0077CC) 40%, transparent);
      backdrop-filter: blur(8px);
      color: var(--io-color-info, #0077CC);
    }

    /* success */
    .tag--success.tag--soft {
      background: var(--io-color-success-soft);
      border-color: var(--io-color-success);
      color: var(--io-color-success);
    }
    .tag--success.tag--solid {
      background: var(--io-color-success);
      border-color: var(--io-color-success);
      color: var(--io-color-white);
    }
    .tag--success.tag--frosted {
      background: color-mix(in srgb, var(--io-color-success) 12%, transparent);
      border-color: color-mix(in srgb, var(--io-color-success) 40%, transparent);
      backdrop-filter: blur(8px);
      color: var(--io-color-success);
    }

    /* warning */
    .tag--warning.tag--soft {
      background: var(--io-color-warning-soft);
      border-color: var(--io-color-warning);
      color: var(--io-color-warning);
    }
    .tag--warning.tag--solid {
      background: var(--io-color-warning);
      border-color: var(--io-color-warning);
      color: var(--io-color-white);
    }
    .tag--warning.tag--frosted {
      background: color-mix(in srgb, var(--io-color-warning) 12%, transparent);
      border-color: color-mix(in srgb, var(--io-color-warning) 40%, transparent);
      backdrop-filter: blur(8px);
      color: var(--io-color-warning);
    }

    /* error */
    .tag--error.tag--soft {
      background: var(--io-color-error-soft);
      border-color: var(--io-color-error);
      color: var(--io-color-error);
    }
    .tag--error.tag--solid {
      background: var(--io-color-error);
      border-color: var(--io-color-error);
      color: var(--io-color-white);
    }
    .tag--error.tag--frosted {
      background: color-mix(in srgb, var(--io-color-error) 12%, transparent);
      border-color: color-mix(in srgb, var(--io-color-error) 40%, transparent);
      backdrop-filter: blur(8px);
      color: var(--io-color-error);
    }

    /* subtle */
    .tag--subtle.tag--soft {
      background: var(--io-color-off-white);
      border-color: var(--io-color-beige);
      color: var(--io-color-grey-6);
    }
    .tag--subtle.tag--solid {
      background: var(--io-color-beige);
      border-color: var(--io-color-beige);
      color: var(--io-color-grey-6);
    }
    .tag--subtle.tag--frosted {
      background: color-mix(in srgb, var(--io-color-beige) 30%, transparent);
      border-color: var(--io-color-beige);
      backdrop-filter: blur(8px);
      color: var(--io-color-grey-6);
    }

    /* ── Selected state ─────────────────────────────────── */

    .tag--selected {
      background: var(--io-color-primary);
      border-color: var(--io-color-primary);
      color: var(--io-color-white);
    }

    /* ── Hover states ───────────────────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      .tag--neutral.tag--soft:hover:not(.tag--disabled):not(.tag--selected) {
        background: var(--io-state-hover);
        border-color: var(--io-border-hover);
      }
      .tag--neutral.tag--solid:hover:not(.tag--disabled):not(.tag--selected),
      .tag--neutral.tag--frosted:hover:not(.tag--disabled):not(.tag--selected) {
        opacity: 0.85;
      }

      .tag--primary.tag--soft:hover:not(.tag--disabled):not(.tag--selected) {
        background: var(--io-color-primary-muted);
      }
      .tag--primary.tag--solid:hover:not(.tag--disabled):not(.tag--selected),
      .tag--primary.tag--frosted:hover:not(.tag--disabled):not(.tag--selected) {
        background: var(--io-color-primary-hover);
        border-color: var(--io-color-primary-hover);
        color: var(--io-color-white);
      }

      .tag--info:hover:not(.tag--disabled):not(.tag--selected),
      .tag--success:hover:not(.tag--disabled):not(.tag--selected),
      .tag--warning:hover:not(.tag--disabled):not(.tag--selected),
      .tag--error:hover:not(.tag--disabled):not(.tag--selected) {
        opacity: 0.85;
      }

      .tag--subtle.tag--soft:hover:not(.tag--disabled):not(.tag--selected) {
        background: var(--io-color-beige);
      }
      .tag--subtle.tag--solid:hover:not(.tag--disabled):not(.tag--selected),
      .tag--subtle.tag--frosted:hover:not(.tag--disabled):not(.tag--selected) {
        opacity: 0.85;
      }

      .tag--selected:hover:not(.tag--disabled) {
        background: var(--io-color-primary-hover);
        border-color: var(--io-color-primary-hover);
      }
    }

    /* ── Disabled ───────────────────────────────────────── */

    .tag--disabled {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Focus visible ──────────────────────────────────── */

    .tag:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Removable layout ───────────────────────────────── */

    .tag-group {
      display: inline-flex;
      align-items: stretch;
      border-radius: var(--io-border-radius-pill);
      border: 1px solid var(--io-border);
      overflow: hidden;
      transition: border-color var(--io-motion-fast), background-color var(--io-motion-fast);
      min-height: var(--io-touch-target-min);
    }

    .tag-group--selected {
      border-color: var(--io-color-primary);
    }

    .tag-group--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    .tag-group .tag--removable-main {
      border: none;
      border-radius: 0;
      padding-right: var(--io-space-2);
    }

    .tag__remove {
      border: none;
      border-left: 1px solid var(--io-border);
      border-radius: 0;
      background: transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--io-text-secondary);
      transition: color var(--io-motion-fast), border-left-color var(--io-motion-fast);
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
    }

    .tag__remove--sm { padding: 0 var(--io-space-2); }
    .tag__remove--md { padding: 0 var(--io-space-3); }

    .tag__remove.tag--selected {
      border-left-color: var(--io-color-white-alpha-30);
      background: var(--io-color-primary);
      color: var(--io-color-white);
    }

    @media (hover: hover) and (pointer: fine) {
      .tag__remove:hover:not(.tag--disabled) {
        color: var(--io-text-primary);
      }
      .tag__remove.tag--selected:hover:not(.tag--disabled) {
        background: var(--io-color-primary-hover);
      }
    }

    .tag__remove:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Compact density override ───────────────────────── */

    .tag--compact.tag--sm,
    .tag--compact.tag--md {
      padding-top: var(--io-tag-compact-padding-y);
      padding-bottom: var(--io-tag-compact-padding-y);
    }

    /* ── Reduced motion ─────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .tag,
      .tag-group,
      .tag__remove {
        transition: none;
      }
    }

    /* ── Forced colors (issue #1120) ────────────────────── */

    @media (forced-colors: active) {
      .tag {
        border: 1px solid ButtonText;
        color: ButtonText;
        background: ButtonFace;
      }

      .tag--selected {
        border-color: Highlight;
        color: HighlightText;
        background: Highlight;
      }

      .tag:focus-visible,
      .tag__remove:focus-visible {
        outline: 2px solid Highlight;
        outline-offset: 2px;
        box-shadow: none;
      }

      .tag--disabled {
        color: GrayText;
        border-color: GrayText;
      }
    }
  `;
}
