import type { IoPopoverPlacement } from './types';

const POPOVER_LABEL_ID_PREFIX = 'io-popover-label-';

export function createPopoverLabelId(randomValue: string): string {
  return `${POPOVER_LABEL_ID_PREFIX}${randomValue}`;
}

/**
 * Returns whether the native Popover API is available in this environment.
 * Uses `showPopover` as the feature-detect signal.
 */
export function supportsPopoverApi(el: HTMLElement): boolean {
  return typeof (el as HTMLElement & { showPopover?: () => void }).showPopover === 'function';
}

/**
 * Computes viewport-relative coordinates for the fallback fixed-position panel.
 * getBoundingClientRect() already returns viewport coords — do NOT add scrollY/scrollX.
 */
export function computeFallbackPosition(
  triggerRect: DOMRect,
  panelWidth: number,
  panelHeight: number,
  placement: IoPopoverPlacement,
  gap: number = 8,
): { top: number; left: number } {
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
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return (container.querySelector(selectors) as HTMLElement | null);
}
