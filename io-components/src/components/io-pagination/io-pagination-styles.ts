/**
 * io-pagination CSS-in-JS style generator.
 *
 * Returns a <style> string for the pagination component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
import { getSrOnlyStyles } from '../../utils/sr-only';

export function getPaginationStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Visually hidden live region ────────────────────── */

    .sr-only {
      ${getSrOnlyStyles()}
    }

    /* ── Container ──────────────────────────────────────── */

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--io-space-4);
      flex-wrap: wrap;
    }

    /* ── Shared button base ─────────────────────────────── */

    .page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-space-12);
      height: var(--io-space-12);
      border-radius: var(--io-border-radius-pill);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-medium);
      cursor: pointer;
      transition:
        border-color var(--io-motion-fast),
        color var(--io-motion-fast),
        background-color var(--io-motion-fast);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Number buttons ─────────────────────────────────── */

    .page-btn--number {
      border: 1px solid var(--io-text-disabled);
      background: transparent;
      color: var(--io-text-disabled);
    }

    @media (hover: hover) and (pointer: fine) {
      .page-btn--number:hover:not(:disabled) {
        border: 2px solid var(--io-color-beige);
        color: var(--io-color-beige);
        background: transparent;
      }
    }

    /* ── Active page ────────────────────────────────────── */

    .page-btn--active {
      border: 2px solid var(--io-color-beige);
      color: var(--io-color-beige);
      font-weight: var(--io-font-weight-bold);
      background: transparent;
      cursor: default;
    }

    /* ── Nav arrow buttons ──────────────────────────────── */

    .page-btn--nav {
      border: 1px solid var(--io-text-disabled);
      background: var(--io-color-beige);
      color: var(--io-text-primary);
    }

    @media (hover: hover) and (pointer: fine) {
      .page-btn--nav:hover:not(:disabled) {
        background: transparent;
        border: 2px solid var(--io-color-beige);
        color: var(--io-color-beige);
      }
    }

    .page-btn--nav:disabled {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
    }

    /* ── Ellipsis ───────────────────────────────────────── */

    .page-dots {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-space-12);
      height: var(--io-space-12);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-secondary);
      font-weight: var(--io-font-weight-bold);
    }

    /* ── Focus visible ──────────────────────────────────── */

    .page-btn:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Compact variant ────────────────────────────────── */
    /* Use :host([compact]) to reduce button size to ~32px for dense contexts.
       Targets all button and ellipsis elements — keeps pill shape intact.   */

    :host([compact]) .pagination {
      gap: var(--io-space-2);
    }

    :host([compact]) .page-btn {
      min-width: var(--io-space-8);
      width: var(--io-space-8);
      height: var(--io-space-8);
      font-size: var(--io-font-size-xs);
      /* WCAG 2.5.5 touch-target mitigation: compact visual size is 32×32px which
         is below the 44×44px minimum. Expand the invisible hit area via a
         ::before pseudo-element so pointer-device contexts remain unaffected. */
      position: relative;
    }

    :host([compact]) .page-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 44px;
      min-height: 44px;
      transform: translate(-50%, -50%);
    }

    :host([compact]) .page-dots {
      min-width: var(--io-space-8);
      width: var(--io-space-8);
      height: var(--io-space-8);
      font-size: var(--io-font-size-xs);
    }

    @media (prefers-reduced-motion: reduce) {
      .page-btn { transition: none; }
    }

    /* ── Per-page / page-jump addons ────────────────────────── */

    .pagination-addon {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-2);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-secondary);
    }

    .pagination-addon__label {
      white-space: nowrap;
    }

    .pagination-addon__select {
      height: var(--io-space-10);
      padding: 0 var(--io-space-2);
      border: 1px solid var(--io-border-interactive);
      border-radius: var(--io-border-radius-sm);
      background: transparent;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      cursor: pointer;
    }

    .pagination-addon__select:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .pagination-addon__input {
      width: var(--io-space-16);
      height: var(--io-space-10);
      padding: 0 var(--io-space-2);
      border: 1px solid var(--io-border-interactive);
      border-radius: var(--io-border-radius-sm);
      background: transparent;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      text-align: center;
      /* Remove spinner arrows in Chrome/Safari */
      -webkit-appearance: none;
      -moz-appearance: textfield;
    }

    .pagination-addon__input:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Range display ──────────────────────────────────────── */

    .pagination-range {
      display: inline-block;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-secondary);
    }
  `;
}
