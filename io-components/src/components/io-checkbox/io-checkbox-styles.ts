/**
 * io-checkbox CSS-in-JS style generator.
 *
 * Returns a <style> string for the checkbox component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
import { getSrOnlyStyles } from '../../utils/sr-only';

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

    /* #1092: ::after extends the clickable hit zone to at least 24×24 px
       (WCAG 2.5.8 Target Size Minimum) without affecting the visual indicator.
       The inset is computed as half the deficit between the minimum and the
       actual size so the tap target stays centred on the visual element.
       --io-checkbox-touch-target-min defaults to 24px per the WCAG minimum. */
    .checkbox-control::after {
      content: '';
      position: absolute;
      inset: calc(
        -1 * max(0px, (var(--io-checkbox-touch-target-min, 24px) - var(--io-checkbox-size, 1rem) * var(--_io-checkbox-scaling, 1)) / 2)
      );
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
      ${getSrOnlyStyles()}
    }

    .io-required {
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

    /* ============================================================
       FORCED COLORS (issue #1120 — WCAG 1.4.1 / 1.4.11 / 2.4.7)
       ============================================================ */

    @media (forced-colors: active) {
      .checkbox-custom {
        border: 1px solid ButtonText;
        background: Field;
        forced-color-adjust: none;
      }

      .checkbox-custom--checked {
        background: Highlight;
        border-color: Highlight;
      }

      .checkbox-custom--checked .checkbox-icon {
        color: HighlightText;
      }

      .checkbox-wrapper:focus-within .checkbox-custom {
        outline: 2px solid Highlight;
        outline-offset: 2px;
      }

      :host([disabled]) .checkbox-custom {
        border-color: GrayText;
        background: Field;
      }
    }
  `;
}
