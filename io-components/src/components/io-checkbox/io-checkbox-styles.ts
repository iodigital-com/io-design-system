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
      --_io-checkbox-scaling: 1;
    }

    :host([compact]) {
      --_io-checkbox-scaling: 0.75;
    }

    .checkbox-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    .checkbox-wrapper--loading {
      pointer-events: none;
    }

    /* ── Label row ──────────────────────────────────────── */

    .checkbox-label {
      display: inline-flex;
      align-items: center;
      gap: calc(var(--io-space-2) * var(--_io-checkbox-scaling, 1));
      cursor: pointer;
      min-height: var(--io-touch-target-min);
      user-select: none;
    }

    /* ── Control area (native input + custom visual) ────── */

    .checkbox-control {
      position: relative;
      width: calc(var(--io-checkbox-size, 1rem) * var(--_io-checkbox-scaling, 1));
      height: calc(var(--io-checkbox-size, 1rem) * var(--_io-checkbox-scaling, 1));
      flex-shrink: 0;
    }

    /* Visually hidden but focusable native input — always in DOM for stable form refs */
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

    /* Loading spinner overlay — absolutely positioned to match control size */
    .checkbox-custom-spinner {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    /* Custom visual square — consumer can override border/bg/icon-color via tokens */
    .checkbox-custom {
      position: absolute;
      inset: 0;
      border-radius: var(--io-checkbox-radius);
      border: var(--io-checkbox-border-width) solid var(--io-checkbox-border-color, var(--io-border-interactive));
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      transition: background-color var(--io-motion-fast), border-color var(--io-motion-fast);
    }

    .checkbox-custom--checked,
    .checkbox-custom--indeterminate {
      background-color: var(--io-checkbox-background-color, var(--io-color-primary));
      border-color: var(--io-checkbox-background-color, var(--io-color-primary));
      color: var(--io-checkbox-icon-color, var(--io-color-white));
    }

    .checkbox-icon {
      width: var(--io-checkbox-icon-size);
      height: auto;
      display: block;
    }

    /* Hover: tint border when unchecked */
    @media (hover: hover) and (pointer: fine) {
      .checkbox-label:hover .checkbox-custom:not(.checkbox-custom--checked):not(.checkbox-custom--indeterminate) {
        border-color: var(--io-checkbox-border-color, var(--io-color-primary));
      }
    }

    /* Error border — 2px width satisfies WCAG 1.4.1 (non-color indicator) */
    .checkbox-wrapper--state-error .checkbox-custom:not(.checkbox-custom--checked):not(.checkbox-custom--indeterminate) {
      border-color: var(--io-border-error);
      border-width: var(--io-checkbox-border-error-width);
    }

    .checkbox-wrapper--state-success .checkbox-custom:not(.checkbox-custom--checked):not(.checkbox-custom--indeterminate) {
      border-color: var(--io-color-state-success, var(--io-color-success));
      border-width: var(--io-checkbox-border-error-width);
    }

    .checkbox-wrapper--state-warning .checkbox-custom:not(.checkbox-custom--checked):not(.checkbox-custom--indeterminate) {
      border-color: var(--io-color-state-warning, var(--io-color-warning));
      border-width: var(--io-checkbox-border-error-width);
    }

    /* FACE :invalid pseudo-class — browser sets this via setValidity({ valueMissing }) */
    :host(:invalid) .checkbox-custom:not(.checkbox-custom--checked):not(.checkbox-custom--indeterminate) {
      border-color: var(--io-border-error);
      border-width: var(--io-checkbox-border-error-width);
    }

    /* Focus ring on native input -> show on custom visual */
    .checkbox-native:focus-visible + .checkbox-custom,
    .checkbox-native:focus-visible + .checkbox-custom-spinner + .checkbox-custom {
      box-shadow: var(--io-focus-ring-active);
    }

    /* Focus ring on native input -> show on spinner when loading */
    .checkbox-native:focus-visible ~ .checkbox-custom-spinner {
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Label text ─────────────────────────────────────── */

    .checkbox-text {
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
    }

    :host([compact]) .checkbox-text {
      font-size: var(--io-font-size-xs);
    }

    /* Visually hide label text while keeping it accessible to screen readers */
    .checkbox-text--sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    .checkbox-required {
      color: var(--io-color-error);
    }

    /* ── Helper / state messages ────────────────────────── */

    .checkbox-message {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
    }

    .checkbox-message--error {
      color: var(--io-color-state-error, var(--io-color-error));
    }

    .checkbox-message--success {
      color: var(--io-color-state-success, var(--io-color-success));
    }

    .checkbox-message--warning {
      color: var(--io-color-state-warning, var(--io-color-warning));
    }

    .checkbox-message--hidden {
      display: none;
    }

    .checkbox-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    .checkbox-helper--hidden {
      display: none;
    }

    .checkbox-label__slot--hidden,
    .checkbox-message__slot--hidden,
    .checkbox-description__slot--hidden {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .checkbox-custom { transition: none; }
    }
  `;
}
