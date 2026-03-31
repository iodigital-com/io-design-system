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
      border-bottom: 1px solid var(--io-text-primary);
    }

    .accordion-item--first {
      border-top: 1px solid var(--io-text-primary);
    }

    /* ── Trigger button ─────────────────────────────────── */

    .accordion-trigger {
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: var(--io-space-4);
      padding: var(--io-space-6) 0;
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

    .accordion-heading {
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
      width: 8%;
      top: 1%;
      bottom: 1%;
      left: 44%;
    }

    /* Horizontal bar */
    .accordion-icon::after {
      height: 8%;
      left: 1%;
      right: 1%;
      top: 44%;
    }

    /* Open: vertical bar rotates to horizontal; horizontal bar collapses */
    .accordion-item--open .accordion-icon::before {
      transform: rotate(90deg);
    }

    .accordion-item--open .accordion-icon::after {
      left: 50%;
      right: 50%;
    }

    /* ── Panel ──────────────────────────────────────────── */

    .accordion-panel {
      max-height: 0;
      overflow: hidden;
      transition: max-height var(--io-motion-slow);
    }

    .accordion-item--open .accordion-panel {
      max-height: 600px;
    }

    .accordion-panel-inner {
      padding-bottom: var(--io-space-16);
    }

    .accordion-body {
      font-size: var(--io-font-size-base);
      line-height: var(--io-line-height-relaxed);
      color: var(--io-text-primary);
    }

    @media (prefers-reduced-motion: reduce) {
      .accordion-title,
      .accordion-icon,
      .accordion-icon::before,
      .accordion-icon::after,
      .accordion-panel { transition: none; }
    }
  `;
}
