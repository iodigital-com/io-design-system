/**
 * io-button CSS-in-JS style generator.
 *
 * Returns a <style> string for the button component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
import { getTransition } from '../../utils/motion';

export function getButtonStyles(): string {
  return `
    :host {
      display: inline-flex;
      align-self: flex-start;
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
      transition: background-color var(--io-duration-lg) var(--io-ease-snappy),
                  border-color     var(--io-duration-lg) var(--io-ease-snappy),
                  color            var(--io-duration-lg) var(--io-ease-snappy),
                  opacity          var(--io-duration-lg) var(--io-ease-snappy),
                  transform        var(--io-duration-xs) var(--io-ease-out);
      white-space: nowrap;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Active press feedback ──────────────────────────── */

    /* scale(0.98) press feedback — distinct from translateY (which is prohibited).
       Applies only when not disabled/loading, composing cleanly with focus-visible
       and arrow transforms. Reduced-motion resets this via the transition:none rule. */
    .btn:active:not(.btn--disabled):not(.btn--loading) {
      transform: scale(0.98);
    }

    /* ── Size variants ──────────────────────────────────── */

    /* sm  ≈ 31px  (4px V + 21px text + 4px V + 2px border) */
    .btn--sm {
      padding: var(--io-space-1) var(--io-space-5);
      font-size: var(--io-font-size-sm);
    }

    /* md  = 42px  (8px V + 24px text + 8px V + 2px border) */
    .btn--md {
      padding: var(--io-spacing-component-y) var(--io-spacing-component-x);
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
      padding: var(--io-button-xl-padding-y) var(--io-space-10);
      font-size: var(--io-font-size-lg);
    }

    .btn--xl .btn__arrow {
      width: var(--io-button-arrow-xl-width);
      height: var(--io-button-arrow-xl-height);
    }

    /* Icon-only contract */
    .btn--icon-only {
      aspect-ratio: 1;
      padding: var(--io-button-icon-padding, var(--io-space-2));
      width: var(--io-size-button-md);
      height: var(--io-size-button-md);
    }

    .btn--sm.btn--icon-only {
      width: var(--io-size-button-sm);
      height: var(--io-size-button-sm);
      /* WCAG 2.5.5 AA floor: ensure sm icon-only never renders below 24x24px
         even when --io-size-button-sm is overridden by a consumer. */
      min-width: var(--io-button-sm-icon-only-min, 24px);
      min-height: var(--io-button-sm-icon-only-min, 24px);
    }

    .btn--lg.btn--icon-only {
      width: var(--io-size-button-lg);
      height: var(--io-size-button-lg);
    }

    .btn--xl.btn--icon-only {
      width: var(--io-size-button-xl);
      height: var(--io-size-button-xl);
    }

    .btn--icon-only .btn__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .btn--icon-only .btn__arrow {
      display: none;
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
    /*
     * Issue #1086: WCAG 2.4.11 — focus ring must achieve ≥3:1 contrast against
     * the element it surrounds. The previous box-shadow approach placed the inner
     * ring (#7D0034) directly on the button fill (e.g. #0000D2 blue), giving only
     * ~1.5:1 contrast.
     *
     * Fix: use outline + outline-offset: 3px so the ring sits in the PAGE
     * background (white / #181818 dark), where:
     *   #7D0034 vs white (#fff)    = 8.0:1 ✓
     *   #ff9eb5 vs dark (#181818) = 9.5:1 ✓ (dark-mode focus inner)
     *
     * CSS :focus-visible already restricts the ring to keyboard navigation in
     * modern browsers. The outer outline (3px, page-bg facing) + the inner
     * box-shadow (2px via --io-focus-ring-active) together form the double-ring
     * that was previously fully box-shadow based. initFocusVisible() still
     * controls --io-focus-ring-active so pointer clicks suppress the inner ring;
     * the outer outline is scoped to :focus-visible which browsers already
     * suppress for pointer input on non-form elements.
     */
    .btn:focus-visible {
      outline: 3px solid var(--io-focus-inner);
      outline-offset: 3px;
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

    /* Orange */
    .btn--ghost.btn--orange {
      color: var(--io-color-orange);
      border-color: var(--io-color-orange);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--orange:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-orange);
        color: var(--io-color-white);
      }
    }

    /* Pink — hover text matches solid (grey-6) */
    .btn--ghost.btn--pink {
      color: var(--io-color-pink);
      border-color: var(--io-color-pink);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--pink:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-pink);
        color: var(--io-color-grey-6);
      }
    }

    /* Rouge */
    .btn--ghost.btn--rouge {
      color: var(--io-color-rouge);
      border-color: var(--io-color-rouge);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--rouge:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-rouge);
        color: var(--io-color-white);
      }
    }

    /* Yellow — hover text matches solid (grey-6) */
    .btn--ghost.btn--yellow {
      color: var(--io-color-yellow);
      border-color: var(--io-color-yellow);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--yellow:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-yellow);
        color: var(--io-color-grey-6);
      }
    }

    /* Beige — hover text matches solid (grey-6) */
    .btn--ghost.btn--beige {
      color: var(--io-color-beige);
      border-color: var(--io-color-beige);
    }
    @media (hover: hover) and (pointer: fine) {
      .btn--ghost.btn--beige:hover:not(.btn--disabled):not(.btn--loading) {
        background-color: var(--io-color-beige);
        color: var(--io-color-grey-6);
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
      height: var(--io-button-link-underline-height);
      background-color: var(--io-color-primary);
      transition: ${getTransition('width', 'md', 'in-out')};
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
      width: var(--io-button-arrow-width-default);
      height: var(--io-button-arrow-height-default);
      flex-shrink: 0;
      transition: transform var(--io-duration-lg) var(--io-ease-snappy);
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
        transform: translateX(var(--io-button-arrow-shift-forward));
      }

      /* back: slide left (reversed) */
      .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow--back {
        transform: rotate(180deg) translateX(var(--io-button-arrow-shift-forward));
      }

      /* down: slide down */
      .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow--down {
        transform: rotate(90deg) translateX(var(--io-button-arrow-shift-down));
      }
    }

    /* ── Label / arrow fade on loading ─────────────────── */

    .btn__label {
      display: inline-flex;
      align-items: center;
      transition: opacity var(--io-duration-xs) var(--io-ease-standard);
    }

    io-icon,
    .btn__icon-wrap {
      transition: opacity var(--io-duration-xs) var(--io-ease-standard);
    }

    /* #1043 — size the iconSource wrapper to match io-icon's size map.
       data-size mirrors ICON_SIZE_MAP so iconSource SVGs share the same
       dimensions as named icons at each button size. */
    .btn__icon-wrap[data-size="sm"] {
      width: var(--io-icon-size-sm);
      height: var(--io-icon-size-sm);
    }

    .btn__icon-wrap[data-size="md"] {
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
    }

    .btn__icon-wrap[data-size="lg"] {
      width: var(--io-icon-size-lg);
      height: var(--io-icon-size-lg);
    }

    .btn__icon-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      color: currentColor;
    }

    .btn__icon-wrap svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    /* Visually hidden label for icon+hideLabel mode — preserves accessible text */
    .btn__label--hidden {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    .btn--loading .btn__label,
    .btn--loading .btn__arrow,
    .btn--loading io-icon,
    .btn--loading .btn__icon-wrap {
      opacity: 0;
    }

    /* ── Loading live region (screen-reader only) ──────── */

    .btn__loading-sr {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    /* ── Loading spinner ────────────────────────────────── */

    .btn__spinner {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 1em;
      height: 1em;
      border: var(--io-button-spinner-border-width) solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: io-btn-spin var(--io-button-spinner-duration) linear infinite;
    }

    @keyframes io-btn-spin {
      to { transform: rotate(360deg); }
    }

    /* ── Reduced motion ─────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .btn,
      .btn::after,
      .btn__label,
      .btn__arrow,
      io-icon,
      .btn__icon-wrap {
        transition: none;
      }
      /* Also suppress :active scale in reduced-motion environments */
      .btn:active:not(.btn--disabled):not(.btn--loading) {
        transform: none;
      }
      .btn__spinner {
        animation: none;
      }
    }

    /* ============================================================
       RTL SUPPORT
       Targets components inside a [dir="rtl"] ancestor.
       Uses :host-context([dir="rtl"]) to traverse the Shadow DOM
       boundary and reach ancestor dir attributes.
       ============================================================ */

    /* forward arrow: points left in RTL */
    :host-context([dir="rtl"]) .btn__arrow:not(.btn__arrow--back):not(.btn__arrow--down) {
      transform: scaleX(-1);
    }

    /* back arrow: points right in RTL — match LTR transform order, apply scaleX after rotation */
    :host-context([dir="rtl"]) .btn__arrow--back {
      transform: rotate(180deg) scaleX(-1);
    }

    /* Hover animation: reverse shift direction in RTL */
    @media (hover: hover) and (pointer: fine) {
      /* forward: slide left in RTL (negate translateX) */
      :host-context([dir="rtl"]) .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow:not(.btn__arrow--back):not(.btn__arrow--down) {
        transform: scaleX(-1) translateX(var(--io-button-arrow-shift-forward));
      }

      /* back: slide right in RTL — match transform axis ordering with LTR */
      :host-context([dir="rtl"]) .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow--back {
        transform: rotate(180deg) scaleX(-1) translateX(var(--io-button-arrow-shift-forward));
      }
    }

    /* Link underline: anchor from right edge in RTL */
    :host-context([dir="rtl"]) .btn--link::after {
      left: auto;
      right: 0;
    }

    /* ============================================================
       FORCED COLORS (issue #1120 — WCAG 1.4.1 / 1.4.11 / 2.4.7)
       Windows High Contrast Mode strips custom colors and shadows.
       Restore interactive boundaries with system color keywords.
       ============================================================ */

    @media (forced-colors: active) {
      .btn {
        border: 1px solid ButtonText;
        color: ButtonText;
        background: ButtonFace;
        forced-color-adjust: none;
      }

      .btn--solid {
        border-color: ButtonText;
        color: ButtonText;
        background: ButtonFace;
      }

      :host([variant="solid"]) .btn:hover,
      .btn--solid:hover {
        border-color: Highlight;
        color: Highlight;
      }

      .btn:focus-visible {
        outline: 2px solid Highlight;
        outline-offset: 3px;
        box-shadow: none;
      }

      :host([disabled]) .btn,
      .btn--disabled {
        color: GrayText;
        border-color: GrayText;
      }
    }
  `;
}
