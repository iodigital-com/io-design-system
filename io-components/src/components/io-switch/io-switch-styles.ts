/**
 * io-switch CSS-in-JS style generator.
 *
 * Returns a <style> string for the switch component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getSwitchStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .switch-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Label row ──────────────────────────────────────── */

    .switch-label {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-2);
      cursor: pointer;
      min-height: var(--io-touch-target-min);
      user-select: none;
    }

    /* ── Control area (native input + custom track/thumb) ─ */

    .switch-control {
      position: relative;
      width: var(--io-switch-track-width);
      height: var(--io-switch-track-height);
      flex-shrink: 0;
    }

    /* Visually hidden but focusable native input */
    .switch-native {
      position: absolute;
      opacity: 0;
      inset: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      margin: 0;
      z-index: 1;
    }

    /* Block pointer events when loading */
    .switch-native--loading {
      pointer-events: none;
    }

    /* Custom track */
    .switch-track {
      position: absolute;
      inset: 0;
      border-radius: var(--io-switch-track-radius);
      background-color: var(--io-border-interactive);
      transition: background-color var(--io-motion-fast);
      pointer-events: none;
      display: flex;
      align-items: center;
    }

    .switch-track--checked {
      background-color: var(--io-color-primary);
    }

    /* Error state: track uses error color */
    .switch-wrapper--error .switch-track:not(.switch-track--checked) {
      background-color: var(--io-color-error);
    }

    /* FACE :invalid pseudo-class — browser sets this via setValidity({ valueMissing }) */
    :host(:invalid) .switch-track:not(.switch-track--checked) {
      background-color: var(--io-color-error);
    }

    /* Error state forced-colors / high-contrast: use border width token for non-color indicator.
       WCAG 1.4.1 — error must not rely on color alone in high-contrast contexts. */
    @media (forced-colors: active) {
      .switch-wrapper--error .switch-track:not(.switch-track--checked),
      :host(:invalid) .switch-track:not(.switch-track--checked) {
        border-width: var(--io-switch-border-error-width);
        border-color: LinkText;
      }
    }

    /* ── Hover states (WCAG 1.4.11) ─────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      .switch-wrapper:not(.switch-wrapper--error) .switch-native:not(:disabled):not(.switch-native--loading):hover ~ .switch-track {
        background-color: var(--io-border-hover);
      }

      .switch-wrapper:not(.switch-wrapper--error) .switch-native:not(:disabled):not(.switch-native--loading):checked:hover ~ .switch-track {
        background-color: var(--io-color-primary-hover);
      }
    }

    /* Thumb */
    .switch-thumb {
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateX(var(--io-switch-thumb-offset-off));
      width: var(--io-switch-thumb-size);
      height: var(--io-switch-thumb-size);
      border-radius: var(--io-switch-thumb-radius);
      background-color: var(--io-color-white);
      transition: transform var(--io-motion-fast);
      pointer-events: none;
      box-shadow: var(--io-switch-thumb-shadow);
    }

    .switch-track--checked .switch-thumb {
      transform: translateY(-50%) translateX(var(--io-switch-thumb-offset-on));
    }

    /* Focus ring on native input → show on track */
    .switch-native:focus-visible + .switch-track {
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Loading overlay ────────────────────────────────── */

    .switch-loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    /* ── Label text ─────────────────────────────────────── */

    .switch-text {
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
    }

    .switch-text--sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .switch-required {
      color: var(--io-color-error);
    }

    /* ── Helper / error messages ────────────────────────── */

    .switch-error {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .switch-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    /* ── Loading message (visually hidden aria-live region) ── */

    .switch-loading-message {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* ── Compact density ────────────────────────────────── */

    :host([compact]) .switch-control {
      width: var(--io-switch-track-width-compact);
      height: var(--io-switch-track-height-compact);
    }

    :host([compact]) .switch-thumb {
      width: var(--io-switch-thumb-size-compact);
      height: var(--io-switch-thumb-size-compact);
    }

    :host([compact]) .switch-track--checked .switch-thumb {
      transform: translateY(-50%) translateX(calc(var(--io-switch-track-width-compact) - var(--io-switch-thumb-size-compact) - 2px));
    }

    @media (prefers-reduced-motion: reduce) {
      .switch-track { transition: none; }
      .switch-thumb { transition: none; }
    }

    /* ── Forced-colors / Windows High Contrast Mode (WCAG 1.4.11) ── */

    @media (forced-colors: active) {
      .switch-track {
        border: 2px solid ButtonText;
        background-color: ButtonFace;
        forced-color-adjust: none;
      }

      .switch-track--checked {
        background-color: Highlight;
        border-color: Highlight;
      }

      .switch-thumb {
        background-color: ButtonText;
        forced-color-adjust: none;
      }

      .switch-native:disabled ~ .switch-track {
        border-color: GrayText;
      }

      .switch-native:disabled ~ .switch-track .switch-thumb {
        background-color: GrayText;
      }
    }
  `;
}
