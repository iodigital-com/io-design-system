/**
 * io-stepper + io-step CSS-in-JS style generator.
 *
 * Returns a <style> string for the stepper component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * Governance: Do not hardcode colors, spacing, or radii here.
 * Add new tokens to src/global/app.css first, then reference them.
 */
export function getStepperStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Nav wrapper ────────────────────────────────────── */

    .stepper-nav {
      display: block;
    }

    /* ── Ordered list ───────────────────────────────────── */

    .stepper {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .stepper--horizontal {
      flex-direction: row;
      align-items: flex-start;
    }

    .stepper--vertical {
      flex-direction: column;
      align-items: flex-start;
    }
  `;
}

/**
 * io-step CSS-in-JS style generator.
 *
 * Returns a <style> string for the step item component's Shadow DOM.
 */
export function getStepStyles(): string {
  return `
    :host {
      display: contents;
      font-family: var(--io-font-primary);
    }

    /* ── List item ──────────────────────────────────────── */

    .step {
      display: flex;
      align-items: center;
      position: relative;
    }

    /* ── Step button wrapper (WCAG 2.1.1/4.1.2) ────────── */

    .step__button {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      font: inherit;
      color: inherit;
      text-decoration: none;
      -webkit-appearance: none;
      appearance: none;
      flex: 1;
      min-width: 0;
    }

    .step__button[aria-disabled="true"] {
      cursor: default;
      pointer-events: none;
    }

    .step__button--disabled {
      cursor: not-allowed;
      opacity: var(--io-opacity-disabled, 0.4);
      pointer-events: none;
    }

    /* Focus-visible ring using io-focus tokens */
    .step__button:focus {
      outline: none;
    }

    .step__button:focus-visible {
      outline: 2px solid var(--io-focus-inner, #7D0034);
      outline-offset: 2px;
      box-shadow: 0 0 0 4px var(--io-focus-outer, #FFE4EE);
      border-radius: var(--io-border-radius-sm, 9px);
    }

    /* ── Step inner: circle + label stacked vertically ─── */

    .step__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--io-space-2, 8px);
      position: relative;
      z-index: 1;
    }

    /* ── Step circle ────────────────────────────────────── */

    .step__circle {
      width: var(--io-stepper-circle-size);
      height: var(--io-stepper-circle-size);
      border-radius: var(--io-border-radius-full, 9999px);
      border: var(--io-stepper-circle-border-width) solid var(--io-border, #e5e5e5);
      background: var(--io-bg-base, #fff);
      color: var(--io-text-secondary, #666);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--io-font-size-sm, 0.875rem);
      font-weight: var(--io-font-weight-semibold, 600);
      flex-shrink: 0;
      transition: background-color var(--io-motion-base, 300ms ease),
                  border-color     var(--io-motion-base, 300ms ease),
                  color            var(--io-motion-base, 300ms ease);
    }

    /* Complete: primary fill */
    .step--complete .step__circle {
      background: var(--io-color-primary, #0000D2);
      border-color: var(--io-color-primary, #0000D2);
      color: var(--io-color-white, #fff);
    }

    /* Current: primary border + tinted bg */
    .step--current .step__circle {
      border-color: var(--io-color-primary, #0000D2);
      background: var(--io-bg-base, #fff);
      color: var(--io-color-primary, #0000D2);
      font-weight: var(--io-font-weight-bold, 700);
    }

    /* Upcoming: muted */
    .step--upcoming .step__circle {
      border-color: var(--io-border, #e5e5e5);
      background: var(--io-bg-base, #fff);
      color: var(--io-text-muted, #999);
    }

    /* Warning: warning color border + icon */
    .step--warning .step__circle {
      border-color: var(--io-color-warning, #f59e0b);
      background: var(--io-bg-base, #fff);
      color: var(--io-color-warning, #f59e0b);
    }

    /* ── Checkmark SVG ──────────────────────────────────── */

    .step__check {
      width: 1em;
      height: 1em;
      display: block;
    }

    /* ── Warning icon SVG ───────────────────────────────── */

    .step__warning-icon {
      width: 1em;
      height: 1em;
      display: block;
    }

    /* ── Step label ─────────────────────────────────────── */

    .step__label {
      font-size: var(--io-font-size-sm, 0.875rem);
      line-height: var(--io-line-height-normal, 1.5);
      color: var(--io-text-secondary, #666);
      text-align: center;
      white-space: nowrap;
    }

    .step--complete .step__label {
      color: var(--io-text-secondary, #666);
    }

    .step--current .step__label {
      color: var(--io-text-primary, #111);
      font-weight: var(--io-font-weight-semibold, 600);
    }

    .step--upcoming .step__label {
      color: var(--io-text-muted, #999);
    }

    .step--warning .step__label {
      color: var(--io-color-warning, #f59e0b);
    }

    /* ── Visually hidden screen reader text ─────────────── */

    .step__sr {
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

    /* ── Connector line ─────────────────────────────────── */

    .step__connector {
      flex: 1;
      height: var(--io-stepper-connector-width);
      background: var(--io-border, #e5e5e5);
      transition: background-color var(--io-motion-base, 300ms ease);
      min-width: var(--io-space-6, 24px);
      align-self: flex-start;
      margin-top: var(--io-stepper-connector-offset); /* vertically center connector with circle */
    }

    .step--complete .step__connector {
      background: var(--io-color-primary, #0000D2);
    }

    /* Last step: hide connector */
    :host([data-last]) .step__connector {
      display: none;
    }

    /* ── Vertical orientation ───────────────────────────── */

    :host([data-orientation="vertical"]) .step {
      flex-direction: column;
      align-items: flex-start;
    }

    :host([data-orientation="vertical"]) .step__button {
      flex-direction: column;
      align-items: flex-start;
    }

    :host([data-orientation="vertical"]) .step__inner {
      flex-direction: row;
      align-items: center;
      gap: var(--io-space-3, 12px);
    }

    :host([data-orientation="vertical"]) .step__label {
      text-align: left;
    }

    :host([data-orientation="vertical"]) .step__connector {
      width: var(--io-stepper-connector-width);
      height: var(--io-space-6, 24px);
      min-width: unset;
      min-height: var(--io-space-4, 16px);
      margin-top: 0;
      margin-left: var(--io-stepper-connector-offset); /* align with center of circle */
      align-self: auto;
    }

    /* ── Reduced motion ─────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .step__circle,
      .step__connector {
        transition: none;
      }
    }
  `;
}
