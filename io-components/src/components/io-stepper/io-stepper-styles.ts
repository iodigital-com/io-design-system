/**
 * io-stepper + io-step CSS-in-JS style generator.
 *
 * Returns a <style> string for the stepper component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * Governance: Do not hardcode colors, spacing, or radii here.
 * Add new tokens to src/global/app.css first, then reference them.
 */
import { getSrOnlyStyles } from '../../utils/sr-only';

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

    /* ── Horizontal: scrollable with active-step centering ── */

    .stepper--horizontal {
      flex-direction: row;
      align-items: flex-start;
      overflow-x: auto;
      /* Hide scrollbar visually but keep it accessible */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 11 */
    }

    .stepper--horizontal::-webkit-scrollbar {
      display: none; /* WebKit */
    }

    /* ── Vertical: full first-class layout ─────────────── */

    .stepper--vertical {
      flex-direction: column;
      align-items: stretch;
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
    }

    .step__button--disabled {
      cursor: not-allowed;
      opacity: var(--io-state-disabled-opacity);
    }

    /* Focus-visible ring using io-focus token convention */
    .step__button:focus {
      outline: none;
    }

    .step__button:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Step inner: circle + label-group stacked vertically ─── */

    .step__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--io-space-2, 8px);
      position: relative;
      z-index: 1;
    }

    /* ── Label group: label + optional description ──────── */

    .step__label-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--io-space-1, 4px);
    }

    /* ── Step circle ────────────────────────────────────── */

    .step__circle {
      width: var(--io-stepper-circle-size);
      height: var(--io-stepper-circle-size);
      border-radius: var(--io-border-radius-pill);
      border: var(--io-stepper-circle-border-width) solid var(--io-border);
      background: var(--io-bg-base);
      color: var(--io-text-secondary);
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
      background: var(--io-color-primary);
      border-color: var(--io-color-primary);
      color: var(--io-color-white);
    }

    /* Current: primary border + tinted bg */
    .step--current .step__circle {
      border-color: var(--io-color-primary);
      background: var(--io-bg-base);
      color: var(--io-color-primary);
      font-weight: var(--io-font-weight-bold, 700);
    }

    /* Upcoming: muted */
    .step--upcoming .step__circle {
      border-color: var(--io-border);
      background: var(--io-bg-base);
      color: var(--io-text-muted);
    }

    /* Warning: warning color border + icon */
    .step--warning .step__circle {
      border-color: var(--io-color-warning);
      background: var(--io-bg-base);
      color: var(--io-color-warning);
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

    /* ── Error icon SVG ─────────────────────────────────── */

    .step__error-icon {
      width: 1em;
      height: 1em;
      display: block;
    }

    /* ── Step label ─────────────────────────────────────── */

    .step__label {
      font-size: var(--io-font-size-sm, 0.875rem);
      line-height: var(--io-line-height-normal, 1.5);
      color: var(--io-text-secondary);
      text-align: center;
      white-space: nowrap;
    }

    .step--complete .step__label {
      color: var(--io-text-secondary);
    }

    .step--current .step__label {
      color: var(--io-text-primary);
      font-weight: var(--io-font-weight-semibold, 600);
    }

    .step--upcoming .step__label {
      color: var(--io-text-muted);
    }

    .step--warning .step__label {
      color: var(--io-color-warning);
    }

    /* Error: error color border + X icon */
    .step--error .step__circle {
      border-color: var(--io-step-error-color, var(--io-text-error, var(--io-color-error)));
      background: var(--io-bg-base);
      color: var(--io-step-error-color, var(--io-text-error, var(--io-color-error)));
    }

    .step--error .step__label {
      color: var(--io-step-error-color, var(--io-text-error, var(--io-color-error)));
    }

    /* ── Step description ───────────────────────────────── */

    .step__description {
      font-size: var(--io-font-size-xs, 0.75rem);
      line-height: var(--io-line-height-normal, 1.5);
      color: var(--io-step-description-color, var(--io-text-secondary));
      text-align: center;
    }

    /* Hide description container when no content is slotted */
    .step__description--empty {
      display: none;
    }

    /* ── Visually hidden screen reader text ─────────────── */

    .step__sr {
      ${getSrOnlyStyles()}
    }

    /* ── Connector line ─────────────────────────────────── */

    .step__connector {
      flex: 1;
      height: var(--io-stepper-connector-width);
      background: var(--io-border);
      transition: background-color var(--io-motion-base, 300ms ease);
      min-width: var(--io-space-6, 24px);
      align-self: flex-start;
      margin-top: var(--io-stepper-connector-offset); /* vertically center connector with circle */
    }

    .step--complete .step__connector {
      background: var(--io-color-primary);
    }

    /* Last step: hide connector */
    :host([data-last]) .step__connector {
      display: none;
    }

    /* ── Vertical orientation — first-class layout ──────── */

    /* Step: full-width column, connector below inner content */
    :host([data-orientation="vertical"]) .step {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    /* Button spans full width so label area is clickable */
    :host([data-orientation="vertical"]) .step__button {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    /* Inner: circle left, label-group to the right */
    :host([data-orientation="vertical"]) .step__inner {
      flex-direction: row;
      align-items: flex-start;
      gap: var(--io-space-3, 12px);
      min-height: var(--io-stepper-circle-size); /* WCAG 2.5.8 — 44px min touch target */
    }

    /* Label group: left-aligned in vertical mode */
    :host([data-orientation="vertical"]) .step__label-group {
      align-items: flex-start;
      padding-top: var(--io-space-1, 4px);
    }

    :host([data-orientation="vertical"]) .step__label {
      text-align: left;
    }

    :host([data-orientation="vertical"]) .step__description {
      text-align: left;
    }

    /* Connector: vertical line from circle centre down to next step */
    :host([data-orientation="vertical"]) .step__connector {
      width: var(--io-stepper-connector-width);
      height: var(--io-space-8, 32px);
      min-width: unset;
      min-height: var(--io-space-4, 16px);
      margin-top: 0;
      margin-left: var(--io-stepper-connector-offset); /* align centre with circle */
      align-self: auto;
      flex: none;
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
