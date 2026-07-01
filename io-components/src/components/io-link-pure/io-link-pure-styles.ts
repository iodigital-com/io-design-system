/**
 * io-link-pure CSS-in-JS style generator.
 *
 * Returns a <style> string for the link-pure component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getLinkPureStyles(): string {
  return `
    :host {
      display: inline-block;
      font-family: var(--io-font-primary);
    }

    :host([stretch]) {
      display: block;
      width: 100%;
    }

    :host([disabled]) {
      cursor: not-allowed;
      pointer-events: none;
    }

    .link-pure {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-2);
      position: relative;
      font-family: inherit;
      text-decoration: none;
      cursor: pointer;
      color: var(--io-color-primary);
      font-weight: var(--io-font-weight-medium);
      -webkit-font-smoothing: antialiased;
    }

    /* Stretch: fills available width, icon and label pushed to opposite ends */
    .link-pure--stretch {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    /* align-start: icon before label (default) — flex row */
    .link-pure--align-start {
      flex-direction: row;
    }

    /* align-end: icon after label */
    .link-pure--align-end {
      flex-direction: row-reverse;
    }

    /* Size variants */
    .link-pure--xs {
      font-size: var(--io-font-size-xs);
    }

    .link-pure--sm {
      font-size: var(--io-font-size-sm);
    }

    .link-pure--md {
      font-size: var(--io-font-size-md);
    }

    /* Icon wrapper */
    .link-pure__icon {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }

    /* Visually hidden label */
    .link-pure__label--hidden {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    /* No underline at rest by default */
    .link-pure__label {
      text-decoration: none;
    }

    /* Underline on hover */
    @media (hover: hover) and (pointer: fine) {
      .link-pure:hover:not(.link-pure--disabled) .link-pure__label {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    }

    /* Active / current nav item */
    .link-pure--active {
      color: var(--io-link-pure-active-color, var(--io-color-primary));
      font-weight: var(--io-font-weight-bold);
    }

    .link-pure--active .link-pure__label {
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    /* Disabled */
    .link-pure--disabled {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
    }

    /* Focus visible */
    .link-pure:focus-visible {
      outline: none;
      border-radius: var(--io-border-radius-xs);
      box-shadow: var(--io-focus-ring-active);
    }

    @media (prefers-reduced-motion: reduce) {
      .link-pure__label {
        transition: none;
      }
    }
  `;
}
