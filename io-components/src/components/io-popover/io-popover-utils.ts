import type { Middleware, Placement } from '@floating-ui/dom';
import { arrow, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';

import type { IoPopoverPlacement } from './types';

const POPOVER_LABEL_ID_PREFIX = 'io-popover-label-';
const POPOVER_PANEL_ID_PREFIX = 'io-popover-panel-';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function createPopoverLabelId(randomValue: string): string {
  return `${POPOVER_LABEL_ID_PREFIX}${randomValue}`;
}

export function createPopoverPanelId(randomValue: string): string {
  return `${POPOVER_PANEL_ID_PREFIX}${randomValue}`;
}

/**
 * Returns whether the native Popover API is available in this environment.
 * Uses `showPopover` as the feature-detect signal.
 */
export function supportsPopoverApi(el: HTMLElement): boolean {
  return typeof (el as HTMLElement & { showPopover?: () => void }).showPopover === 'function';
}

/**
 * Maps IoPopoverPlacement to @floating-ui/dom Placement.
 * 'auto' maps to 'bottom' as the preferred placement — floating-ui flip() will
 * override it when there is insufficient space.
 */
export function toFloatingUiPlacement(placement: IoPopoverPlacement): Placement {
  if (placement === 'auto') return 'bottom';
  return placement as Placement;
}

/**
 * Builds the floating-ui middleware stack for io-popover.
 * When `arrowEl` is provided the arrow() middleware is included.
 */
export function buildPopoverMiddleware(
  gap: number = 16,
  arrowEl?: HTMLElement | null,
): Middleware[] {
  const middlewares: Middleware[] = [
    offset(gap),
    flip(),
    shift({ padding: 8, limiter: limitShift() }),
  ];
  if (arrowEl) {
    middlewares.push(arrow({ element: arrowEl }));
  }
  return middlewares;
}

/**
 * Applies floating-ui computed position to the panel element.
 * Also updates the arrow element's position and direction when present.
 */
export async function applyFloatingPosition(
  triggerEl: HTMLElement,
  panelEl: HTMLElement,
  placement: IoPopoverPlacement,
  arrowEl?: HTMLElement | null,
): Promise<void> {
  const resolvedPlacement = toFloatingUiPlacement(placement);
  const middleware = buildPopoverMiddleware(16, arrowEl);

  const result = await computePosition(triggerEl, panelEl, {
    placement: resolvedPlacement,
    strategy: 'fixed',
    middleware,
  });

  Object.assign(panelEl.style, {
    position: 'fixed',
    top: `${result.y}px`,
    left: `${result.x}px`,
  });

  // Update arrow position when the arrow element is present
  if (arrowEl && result.middlewareData.arrow) {
    const { x: ax, y: ay } = result.middlewareData.arrow;
    const side = result.placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';

    const staticSideMap: Record<typeof side, string> = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    };
    const staticSide = staticSideMap[side];

    Object.assign(arrowEl.style, {
      left: ax != null ? `${ax}px` : '',
      top: ay != null ? `${ay}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-6px',
    });

    arrowEl.setAttribute('data-placement', side);
  }
}

/**
 * Legacy fallback — kept for tests and direct callers that don't yet use
 * the async floating-ui path. Do NOT use this for new positioning logic.
 *
 * getBoundingClientRect() already returns viewport coords — do NOT add scrollY/scrollX.
 */
export function computeFallbackPosition(
  triggerRect: DOMRect,
  panelWidth: number,
  panelHeight: number,
  placement: IoPopoverPlacement,
  gap: number = 8,
): { top: number; left: number } {
  // 'auto' unconditionally resolves to 'bottom' — viewport-aware selection is not yet implemented.
  // If smart detection is added in future, replace this line with space-measurement logic.
  const resolvedPlacement = placement === 'auto' ? 'bottom' : placement;

  switch (resolvedPlacement) {
    case 'top':
      return {
        top: triggerRect.top - panelHeight - gap,
        left: triggerRect.left + triggerRect.width / 2 - panelWidth / 2,
      };
    case 'bottom':
      return {
        top: triggerRect.bottom + gap,
        left: triggerRect.left + triggerRect.width / 2 - panelWidth / 2,
      };
    case 'left':
      return {
        top: triggerRect.top + triggerRect.height / 2 - panelHeight / 2,
        left: triggerRect.left - panelWidth - gap,
      };
    case 'right':
      return {
        top: triggerRect.top + triggerRect.height / 2 - panelHeight / 2,
        left: triggerRect.right + gap,
      };
  }
}

/**
 * Returns the first focusable element inside the given container, or null.
 */
export function getFirstFocusable(container: HTMLElement | ShadowRoot): HTMLElement | null {
  return (container.querySelector(FOCUSABLE_SELECTORS) as HTMLElement | null);
}

/**
 * Returns all focusable elements inside a popover panel, including both
 * shadow DOM elements and slotted light DOM elements.
 */
export function getPanelFocusableElements(panelEl: HTMLElement): HTMLElement[] {
  const shadowFocusable = Array.from(panelEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

  const slot = panelEl.querySelector('slot:not([name])') as HTMLSlotElement | null;
  const slottedFocusable = slot
    ? Array.from(slot.assignedElements({ flatten: true })).flatMap(el => {
        const matches: HTMLElement[] = [];
        if ((el as HTMLElement).matches(FOCUSABLE_SELECTORS)) matches.push(el as HTMLElement);
        matches.push(...Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)));
        return matches;
      })
    : [];

  return [...shadowFocusable, ...slottedFocusable];
}
