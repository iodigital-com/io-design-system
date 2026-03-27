/**
 * io-link CSS-in-JS style generator.
 *
 * Returns a <style> string for the link component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getLinkStyles(): string {
  return `
    :host {
      display: inline;
      font-family: var(--io-font-primary);
    }

    :host([disabled]) {
      cursor: not-allowed;
      pointer-events: none;
    }

    .link {
      display: inline;
      position: relative;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      font-weight: var(--io-font-weight-medium);
      text-decoration: none;
      cursor: pointer;
      -webkit-font-smoothing: antialiased;
    }

    /* Animated underline via ::after pseudo-element */
    .link::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: currentColor;
      transition: transform 350ms var(--io-motion-easing-bounce);
    }

    /* STANDALONE: no underline at rest → grows from left on hover */
    .link--standalone::after {
      transform-origin: left;
      transform: scaleX(0);
    }

    @media (hover: hover) and (pointer: fine) {
      .link--standalone:hover:not(.link--disabled)::after {
        transform: scaleX(1);
      }
    }

    /* INLINE: underline at rest → slides out to the right on hover */
    .link--inline::after {
      transform-origin: right;
      transform: scaleX(1);
    }

    @media (hover: hover) and (pointer: fine) {
      .link--inline:hover:not(.link--disabled)::after {
        transform: scaleX(0);
      }
    }

    /* Colour variants */
    .link--blue  { color: var(--io-color-primary); }
    .link--black { color: var(--io-color-grey-6); }
    .link--white { color: var(--io-color-white); }

    /* Disabled */
    .link--disabled {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
    }

    /* Focus visible */
    .link:focus-visible {
      outline: none;
      border-radius: var(--io-border-radius-xs);
      box-shadow: var(--io-focus-ring-active);
    }

    @media (prefers-reduced-motion: reduce) {
      .link::after {
        transition: none;
      }
    }
  `;
}
