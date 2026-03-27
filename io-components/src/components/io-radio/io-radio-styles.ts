/**
 * io-radio CSS-in-JS style generator.
 *
 * Returns a <style> string for the radio component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getRadioStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .radio-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Label row ──────────────────────────────────────── */

    .radio-label {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-2);
      cursor: pointer;
      min-height: var(--io-touch-target-min);
      user-select: none;
    }

    /* ── Control area (native input + custom visual) ────── */

    .radio-control {
      position: relative;
      width: var(--io-radio-size);
      height: var(--io-radio-size);
      flex-shrink: 0;
    }

    /* Visually hidden but focusable native input */
    .radio-native {
      position: absolute;
      opacity: 0;
      inset: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      margin: 0;
      z-index: 1;
    }

    /* Custom visual circle */
    .radio-custom {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: var(--io-radio-border-width) solid var(--io-border-hover);
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      transition: border-color var(--io-motion-fast);
    }

    /* Inner dot — visible when checked */
    .radio-dot {
      width: var(--io-radio-dot-size);
      height: var(--io-radio-dot-size);
      border-radius: 50%;
      background: var(--io-color-primary);
      transform: scale(0);
      transition: transform var(--io-motion-fast);
    }

    .radio-custom--checked {
      border-color: var(--io-color-primary);
    }

    .radio-custom--checked .radio-dot {
      transform: scale(1);
    }

    /* Hover: tint border when unchecked */
    @media (hover: hover) and (pointer: fine) {
      .radio-label:hover .radio-custom:not(.radio-custom--checked) {
        border-color: var(--io-color-primary);
      }
    }

    /* Error border */
    .radio-wrapper--error .radio-custom:not(.radio-custom--checked) {
      border-color: var(--io-border-error);
    }

    /* Focus ring on native input → show on custom visual */
    .radio-native:focus-visible + .radio-custom {
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Label text ─────────────────────────────────────── */

    .radio-text {
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
    }

    .radio-required {
      color: var(--io-color-error);
    }

    /* ── Helper / error messages ────────────────────────── */

    .radio-error {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .radio-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    @media (prefers-reduced-motion: reduce) {
      .radio-custom,
      .radio-dot { transition: none; }
    }
  `;
}
