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

    /* ── Colour variants (unselected state) ─────────────── */

    .tag--default {
      background: transparent;
      border-color: var(--io-border);
    }

    .tag--blue {
      background: var(--io-color-primary-bg);
      border-color: var(--io-color-primary);
      color: var(--io-color-primary);
    }

    .tag--beige {
      background: var(--io-color-off-white);
      border-color: var(--io-color-beige);
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
      .tag--default:hover:not(.tag--disabled):not(.tag--selected) {
        background: var(--io-state-hover);
        border-color: var(--io-border-hover);
      }

      .tag--blue:hover:not(.tag--disabled):not(.tag--selected) {
        background: var(--io-color-primary-muted);
      }

      .tag--beige:hover:not(.tag--disabled):not(.tag--selected) {
        background: var(--io-color-beige);
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

    /* ── Reduced motion ─────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .tag,
      .tag-group,
      .tag__remove {
        transition: none;
      }
    }
  `;
}
