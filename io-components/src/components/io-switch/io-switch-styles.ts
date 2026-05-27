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

    /* ── Label text ─────────────────────────────────────── */

    .switch-text {
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
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

    @media (prefers-reduced-motion: reduce) {
      .switch-track { transition: none; }
      .switch-thumb { transition: none; }
    }
  `;
}
