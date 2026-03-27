/**
 * io-button CSS-in-JS style generator.
 *
 * Returns a <style> string for the button component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getButtonStyles(): string {
  return `
    :host {
      display: inline-flex;
      cursor: pointer;
      font-family: var(--io-font-primary);
    }

    :host([disabled]),
    :host([loading]) {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Base inner element ──────────────────────────────── */

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--io-space-2);
      font-family: var(--io-font-primary);
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-normal);
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      border-radius: var(--io-border-radius-pill);
      position: relative;
      transition: background-color 500ms var(--io-motion-easing-snappy),
                  border-color     500ms var(--io-motion-easing-snappy),
                  color            500ms var(--io-motion-easing-snappy),
                  opacity          500ms var(--io-motion-easing-snappy);
      white-space: nowrap;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Size variants ──────────────────────────────────── */

    /* sm  ≈ 31px  (4px V + 21px text + 4px V + 2px border) */
    .btn--sm {
      padding: var(--io-space-1) var(--io-space-5);
      font-size: var(--io-font-size-sm);
    }

    /* md  = 42px  (8px V + 24px text + 8px V + 2px border) */
    .btn--md {
      padding: var(--io-space-2) var(--io-space-6);
      font-size: var(--io-font-size-base);
    }

    /* lg  = 50px  (12px V + 24px text + 12px V + 2px border) */
    .btn--lg {
      height: var(--io-space-12);
      padding: var(--io-space-2) var(--io-space-8);
      font-size: var(--io-font-size-base);
    }

    /* xl  = 56px  (18px V + 18px text + 18px V + 2px border) */
    .btn--xl {
      height: var(--io-space-14);
      padding: 1.125rem var(--io-space-10);
      font-size: var(--io-font-size-lg);
    }

    .btn--xl .btn__arrow {
      width: 1.5rem;
      height: 0.923rem;
    }

    /* ── Full width ─────────────────────────────────────── */

    :host(.io-button--full-width) {
      width: 100%;
    }

    :host(.io-button--full-width) .btn {
      width: 100%;
    }

    /* ── Disabled / Loading ─────────────────────────────── */

    .btn--disabled,
    .btn--loading {
      opacity: var(--io-state-disabled-opacity);
    }

    /* ── Focus visible ──────────────────────────────────── */

    .btn:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ============================================================
       SOLID VARIANTS
       ============================================================ */

    /* Blue (primary) */
    .btn--solid.btn--blue {
      background-color: var(--io-color-primary);
      color: var(--io-color-white);
      border-color: var(--io-color-primary);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--blue:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-primary-hover);
        border-color: var(--io-color-primary-hover);
      }
    }

    /* White */
    .btn--solid.btn--white {
      background-color: var(--io-color-white);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-white);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--white:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-grey-2);
        border-color: var(--io-color-grey-2);
      }
    }

    /* Black */
    .btn--solid.btn--black {
      background-color: var(--io-color-black);
      color: var(--io-color-white);
      border-color: var(--io-color-black);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--black:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-antraciet-hover);
        border-color: var(--io-color-antraciet-hover);
      }
    }

    /* Antraciet */
    .btn--solid.btn--antraciet {
      background-color: var(--io-color-antraciet);
      color: var(--io-color-white);
      border-color: var(--io-color-antraciet);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--antraciet:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-antraciet-hover);
        border-color: var(--io-color-antraciet-hover);
      }
    }

    /* Orange */
    .btn--solid.btn--orange {
      background-color: var(--io-color-orange);
      color: var(--io-color-white);
      border-color: var(--io-color-orange);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--orange:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-orange-hover);
        border-color: var(--io-color-orange-hover);
      }
    }

    /* Pink */
    .btn--solid.btn--pink {
      background-color: var(--io-color-pink);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-pink);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--pink:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-pink-hover);
        border-color: var(--io-color-pink-hover);
      }
    }

    /* Rouge */
    .btn--solid.btn--rouge {
      background-color: var(--io-color-rouge);
      color: var(--io-color-white);
      border-color: var(--io-color-rouge);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--rouge:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-rouge-hover);
        border-color: var(--io-color-rouge-hover);
      }
    }

    /* Yellow */
    .btn--solid.btn--yellow {
      background-color: var(--io-color-yellow);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-yellow);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--yellow:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-yellow-hover);
        border-color: var(--io-color-yellow-hover);
      }
    }

    /* Beige */
    .btn--solid.btn--beige {
      background-color: var(--io-color-beige);
      color: var(--io-color-grey-6);
      border-color: var(--io-color-beige);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--solid.btn--beige:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-beige-hover);
        border-color: var(--io-color-beige-hover);
      }
    }

    /* ============================================================
       GHOST VARIANTS (transparent fill, colored border + text)
       ============================================================ */

    .btn--ghost {
      background-color: transparent;
    }

    .btn--ghost.btn--blue {
      color: var(--io-color-primary);
      border-color: var(--io-color-primary);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--blue:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-primary);
        color: var(--io-color-white);
      }
    }

    .btn--ghost.btn--black {
      color: var(--io-color-black);
      border-color: var(--io-color-black);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--black:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-black);
        color: var(--io-color-white);
      }
    }

    .btn--ghost.btn--antraciet {
      color: var(--io-color-antraciet);
      border-color: var(--io-color-antraciet);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--antraciet:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-antraciet);
        color: var(--io-color-white);
      }
    }

    .btn--ghost.btn--white {
      color: var(--io-color-white);
      border-color: var(--io-color-white);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--white:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-white);
        color: var(--io-color-grey-6);
      }
    }

    /* Grey — ghost only */
    .btn--ghost.btn--grey {
      color: var(--io-color-grey-4);
      border-color: var(--io-color-grey-4);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--grey:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-grey-4);
        color: var(--io-color-white);
        border-color: var(--io-color-grey-4);
      }
    }

    /* ============================================================
       LINK VARIANT (no fill, no border, animated underline)
       ============================================================ */

    .btn--link {
      background-color: transparent;
      border-color: transparent;
      padding-left: 0;
      padding-right: 0;
      color: var(--io-color-primary);
      font-weight: var(--io-font-weight-medium);
      text-decoration: none;
      position: relative;
    }

    .btn--link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background-color: var(--io-color-primary);
      transition: width var(--io-motion-base) var(--io-motion-easing-bounce);
    }

    @media (hover: hover) and (pointer: fine) {
      .btn--link:hover:not(.btn--disabled):not(.btn--loading)::after {
        width: 100%;
      }
    }

    /* ── Arrow icon ─────────────────────────────────────── */

    .btn__arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 0.875rem;
      height: 0.54rem;
      flex-shrink: 0;
      transition: transform 500ms var(--io-motion-easing-snappy);
    }

    .btn__arrow svg {
      width: 100%;
      height: 100%;
    }

    /* back direction: rotate 180° at rest */
    .btn__arrow--back {
      transform: rotate(180deg);
    }

    /* down direction: rotate 90° at rest */
    .btn__arrow--down {
      transform: rotate(90deg);
    }

    @media (hover: hover) and (pointer: fine) {
      /* forward: slide right */
      .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow:not(.btn__arrow--back):not(.btn__arrow--down) {
        transform: translateX(6px);
      }

      /* back: slide left (reversed) */
      .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow--back {
        transform: rotate(180deg) translateX(6px);
      }

      /* down: slide down */
      .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow--down {
        transform: rotate(90deg) translateX(5px);
      }
    }

    /* ── Label / arrow fade on loading ─────────────────── */

    .btn__label {
      display: inline-flex;
      align-items: center;
      transition: opacity 150ms ease;
    }

    .btn--loading .btn__label,
    .btn--loading .btn__arrow {
      opacity: 0;
    }

    /* ── Loading spinner ────────────────────────────────── */

    .btn__spinner {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: io-btn-spin 0.6s linear infinite;
    }

    @keyframes io-btn-spin {
      to { transform: rotate(360deg); }
    }

    /* ── Reduced motion ─────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .btn,
      .btn::after,
      .btn__arrow {
        transition: none;
      }
      .btn__spinner {
        animation: none;
      }
    }
  `;
}
