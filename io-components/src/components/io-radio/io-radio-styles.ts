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

    .radio-wrapper--loading {
      pointer-events: none;
    }

    /* Loading: spinner replaces the radio control visual */
    .radio-control--loading {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-radio-size);
      height: var(--io-radio-size);
      flex-shrink: 0;
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

    /* #1092: ::after extends the clickable hit zone to at least 24×24 px
       (WCAG 2.5.8 Target Size Minimum) without affecting the visual indicator.
       --io-radio-touch-target-min defaults to 24px per the WCAG minimum. */
    .radio-control::after {
      content: '';
      position: absolute;
      inset: calc(
        -1 * max(0px, (var(--io-radio-touch-target-min, 24px) - var(--io-radio-size, 1rem)) / 2)
      );
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
      border: var(--io-radio-border-width) solid var(--io-border-interactive);
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

    /* Error border — 2px width satisfies WCAG 1.4.1 (non-color indicator) */
    .radio-wrapper--state-error .radio-custom:not(.radio-custom--checked) {
      border-color: var(--io-border-error);
      border-width: var(--io-radio-border-error-width);
    }

    .radio-wrapper--state-success .radio-custom:not(.radio-custom--checked) {
      border-color: var(--io-color-state-success);
      border-width: var(--io-radio-border-error-width);
    }

    .radio-wrapper--state-warning .radio-custom:not(.radio-custom--checked) {
      border-color: var(--io-color-state-warning);
      border-width: var(--io-radio-border-error-width);
    }

    /* FACE :invalid pseudo-class — browser sets this via setValidity({ valueMissing }) */
    :host(:invalid) .radio-custom:not(.radio-custom--checked) {
      border-color: var(--io-border-error);
      border-width: var(--io-radio-border-error-width);
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

    /* Visually hide label text while keeping it accessible to screen readers */
    .radio-text--sr-only {
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

    .radio-required {
      color: var(--io-color-error);
    }

    /* ── Helper / state messages ────────────────────────── */

    .radio-message {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
    }

    .radio-message--error {
      color: var(--io-color-state-error, var(--io-color-error));
    }

    .radio-message--success {
      color: var(--io-color-state-success);
    }

    .radio-message--warning {
      color: var(--io-color-state-warning);
    }

    .radio-error--hidden {
      display: none;
    }

    .radio-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    .radio-helper--hidden {
      display: none;
    }

    .radio-label__slot--hidden,
    .radio-message__slot--hidden,
    .radio-description__slot--hidden {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .radio-custom,
      .radio-dot { transition: none; }
    }
  `;
}
