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
