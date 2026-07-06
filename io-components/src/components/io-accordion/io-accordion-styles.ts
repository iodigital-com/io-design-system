/**
 * io-accordion CSS-in-JS style generator.
 *
 * Returns a <style> string for the accordion component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getAccordionStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
      width: 100%;
    }

    /* ── Item ───────────────────────────────────────────── */

    .accordion-item {
      border-bottom: 1px solid var(--io-accordion-border-color, var(--io-text-primary));
    }

    .accordion-item--first {
      border-top: 1px solid var(--io-accordion-border-color, var(--io-text-primary));
    }

    /* ── Trigger button ─────────────────────────────────── */

    .accordion-trigger {
      position: relative;
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
      align-items: center;
      justify-content: space-between;
      gap: var(--io-space-4);
      padding: var(--io-accordion-py, var(--io-space-6)) var(--io-accordion-px, 0);
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
    }

    .accordion-trigger:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Title ──────────────────────────────────────────── */

    /*
     * The heading element acts as a flex row:
     * [summary-before slot][trigger button][summary-after slot]
     * summary-before and summary-after are rendered outside the trigger
     * button so interactive children (edit/delete buttons) remain independently operable.
     */
    .accordion-heading {
      display: flex;
      align-items: center;
      margin: 0;
    }

    .accordion-title {
      display: inline-block;
      font-size: var(--io-font-size-lg);
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-primary);
      transition: transform var(--io-motion-base);
    }

    @media (hover: hover) and (pointer: fine) {
      .accordion-trigger:hover .accordion-title {
        transform: translateX(var(--io-space-5));
      }
    }

    /* ── +/− icon ───────────────────────────────────────── */

    .accordion-icon {
      flex-shrink: 0;
      position: relative;
      width: var(--io-space-6);
      height: var(--io-space-6);
      transition: transform var(--io-motion-base);
    }

    @media (hover: hover) and (pointer: fine) {
      .accordion-trigger:hover .accordion-icon {
        transform: scale(0.7);
      }
    }

    .accordion-icon::before,
    .accordion-icon::after {
      content: '';
      position: absolute;
      background: var(--io-color-primary);
      transition: transform var(--io-motion-base), left var(--io-motion-base), right var(--io-motion-base);
    }

    /* Vertical bar */
    .accordion-icon::before {
      width: var(--io-accordion-icon-bar-thickness);
      top: var(--io-accordion-icon-bar-inset);
      bottom: var(--io-accordion-icon-bar-inset);
      left: var(--io-accordion-icon-bar-axis-offset);
    }

    /* Horizontal bar */
    .accordion-icon::after {
      height: var(--io-accordion-icon-bar-thickness);
      left: var(--io-accordion-icon-bar-inset);
      right: var(--io-accordion-icon-bar-inset);
      top: var(--io-accordion-icon-bar-axis-offset);
    }

    /* Open: vertical bar rotates to horizontal; horizontal bar collapses */
    .accordion-item--open .accordion-icon::before {
      transform: rotate(90deg);
    }

    .accordion-item--open .accordion-icon::after {
      left: var(--io-accordion-icon-horizontal-collapsed-side);
      right: var(--io-accordion-icon-horizontal-collapsed-side);
    }

    /* ── Panel — grid-template-rows animation ───────────── */

    /*
     * Uses grid-template-rows: 0fr -> 1fr to animate to true content height
     * without a fixed cap. visibility: hidden is a fallback for browsers
     * without full inert support, preventing collapsed content from being
     * reachable via Tab navigation.
     */
    .accordion-panel {
      display: grid;
      grid-template-rows: 0fr;
      overflow: hidden;
      visibility: hidden;
      transition: grid-template-rows var(--io-motion-slow);
    }

    .accordion-item--open .accordion-panel {
      grid-template-rows: 1fr;
      visibility: visible;
    }

    /* ── Disabled ────────────────────────────────────────── */

    .accordion-item--disabled {
      opacity: var(--io-state-disabled-opacity, 0.4);
      pointer-events: none;
    }

    .accordion-item--disabled .accordion-trigger {
      cursor: not-allowed;
    }

    /*
     * padding-bottom is applied only in the open state (below), not here.
     * An unconditional padding-bottom would add to this element's min-content
     * contribution, preventing the grid-template-rows: 0fr -> 1fr trick above
     * from fully collapsing the panel to 0 height when closed.
     */
    .accordion-panel-inner {
      min-height: 0;
    }

    .accordion-item--open .accordion-panel-inner {
      padding-bottom: var(--io-space-16);
    }

    .accordion-body {
      font-size: var(--io-font-size-base);
      line-height: var(--io-line-height-relaxed);
      color: var(--io-text-primary);
    }

    /* ── Size variants ──────────────────────────────────── */

    /* sm — compact: tighter padding, smaller title font */
    :host([size="sm"]) .accordion-trigger {
      padding-top: var(--io-accordion-py, var(--io-space-3));
      padding-bottom: var(--io-accordion-py, var(--io-space-3));
    }

    :host([size="sm"]) .accordion-title {
      font-size: var(--io-font-size-base);
    }

    /* md — default (explicitly restated so overriding parent density is clean) */
    :host([size="md"]) .accordion-trigger {
      padding-top: var(--io-accordion-py, var(--io-space-6));
      padding-bottom: var(--io-accordion-py, var(--io-space-6));
    }

    :host([size="md"]) .accordion-title {
      font-size: var(--io-font-size-lg);
    }

    /* lg — comfortable: generous padding, larger title font */
    :host([size="lg"]) .accordion-trigger {
      padding-top: var(--io-accordion-py, var(--io-space-8));
      padding-bottom: var(--io-accordion-py, var(--io-space-8));
    }

    :host([size="lg"]) .accordion-title {
      font-size: var(--io-font-size-xl);
    }

    /* ── Compact prop — dense layout independent of size ─── */

    :host([compact]) .accordion-trigger {
      padding-top: var(--io-accordion-py, var(--io-space-2));
      padding-bottom: var(--io-accordion-py, var(--io-space-2));
    }

    :host([compact]) .accordion-title {
      font-size: var(--io-font-size-sm);
    }

    /* ── Align marker ────────────────────────────────────── */

    /* start: icon appears before the title (left side in LTR) */
    :host([align-marker='start']) .accordion-icon {
      order: -1;
    }

    @media (prefers-reduced-motion: reduce) {
      .accordion-title,
      .accordion-icon,
      .accordion-icon::before,
      .accordion-icon::after,
      .accordion-panel { transition: none; }
    }

    /* ── Disabled: no hover effects ──────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      .accordion-item--disabled .accordion-trigger:hover .accordion-title {
        transform: none;
      }
      .accordion-item--disabled .accordion-trigger:hover .accordion-icon {
        transform: none;
      }
    }

    /* ── Background variants ─────────────────────────────── */

    :host([background="surface"]) {
      background-color: var(--io-bg-surface);
    }

    :host([background="canvas"]) {
      background-color: var(--io-bg-page);
    }

    /* transparent is the default — no fill needed */
    :host([background="transparent"]) {
      background-color: transparent;
    }

    /* frosted — semi-transparent blur for accordions over image/video backdrops */
    :host([background="frosted"]) {
      background-color: var(--io-accordion-bg-frosted, color-mix(in srgb, var(--io-bg-surface) 70%, transparent));
      backdrop-filter: blur(12px) saturate(1.4);
      -webkit-backdrop-filter: blur(12px) saturate(1.4);
    }

    /* ── Indent prop — align panel content with summary text ─ */

    .accordion-panel-inner--indent {
      padding-inline-start: var(--io-accordion-indent, calc(var(--io-space-6) + var(--io-space-4)));
    }

    /* ── Sticky trigger ──────────────────────────────────── */

    /*
     * Sticky is only meaningful when background is surface or canvas.
     * The :host([sticky]) selector applies only when the reflected
     * boolean attribute is present.
     *
     * The accordion-heading wraps the trigger button; both need to be
     * sticky to ensure the full header row sticks together.
     */
    :host([sticky]) .accordion-heading {
      position: sticky;
      top: var(--io-accordion-summary-top, 0);
      z-index: var(--io-z-sticky);
      background-color: inherit;
    }
  `;
}
