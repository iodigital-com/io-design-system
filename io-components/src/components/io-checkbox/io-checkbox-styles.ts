/**
 * io-checkbox CSS-in-JS style generator.
 *
 * Returns a <style> string for the checkbox component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getCheckboxStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .checkbox-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Label row ──────────────────────────────────────── */

    .checkbox-label {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-2);
      cursor: pointer;
      min-height: var(--io-touch-target-min);
      user-select: none;
    }

    /* ── Control area (native input + custom visual) ────── */

    .checkbox-control {
      position: relative;
      width: var(--io-checkbox-size);
      height: var(--io-checkbox-size);
      flex-shrink: 0;
    }

    /* Visually hidden but focusable native input */
    .checkbox-native {
      position: absolute;
      opacity: 0;
      inset: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      margin: 0;
      z-index: 1;
    }

    /* Custom visual square */
    .checkbox-custom {
      position: absolute;
      inset: 0;
      border-radius: var(--io-checkbox-radius);
      border: var(--io-checkbox-border-width) solid var(--io-border-hover);
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      transition: background-color var(--io-motion-fast), border-color var(--io-motion-fast);
    }

    .checkbox-custom--checked,
    .checkbox-custom--indeterminate {
      background-color: var(--io-color-primary);
      border-color: var(--io-color-primary);
      color: var(--io-color-white);
    }

    .checkbox-icon {
      width: var(--io-checkbox-icon-size);
      height: auto;
      display: block;
    }

    /* Hover: tint border when unchecked */
    @media (hover: hover) and (pointer: fine) {
      .checkbox-label:hover .checkbox-custom:not(.checkbox-custom--checked):not(.checkbox-custom--indeterminate) {
        border-color: var(--io-color-primary);
      }
    }

    /* Error border */
    .checkbox-wrapper--error .checkbox-custom:not(.checkbox-custom--checked):not(.checkbox-custom--indeterminate) {
      border-color: var(--io-border-error);
    }

    /* Focus ring on native input → show on custom visual */
    .checkbox-native:focus-visible + .checkbox-custom {
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Label text ─────────────────────────────────────── */

    .checkbox-text {
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
    }

    .checkbox-required {
      color: var(--io-color-error);
    }

    /* ── Helper / error messages ────────────────────────── */

    .checkbox-error {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .checkbox-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    @media (prefers-reduced-motion: reduce) {
      .checkbox-custom { transition: none; }
    }
  `;
}
