/**
 * Focus-trap utilities for overlay components (modal, drawer, flyout, sheet).
 *
 * Attaches a keydown listener to a container element that cycles Tab/Shift+Tab
 * through focusable children, preventing keyboard focus from leaving the overlay.
 */

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface FocusTrap {
  /** Remove the trap and clean up listeners. */
  detach(): void;
}

/**
 * Attach a focus trap to `container`.
 *
 * @param container - The dialog/panel element to trap focus within.
 * @param onAutoFocus - Optional callback called when the trap auto-focuses the first element.
 * @returns A handle with a `detach()` method to remove the trap.
 */
export function attachFocusTrap(
  container: HTMLElement,
  onAutoFocus?: () => void,
): FocusTrap {
  const getFocusable = (): HTMLElement[] =>
    Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key !== 'Tab') return;

    const focusable = getFocusable();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (ev.shiftKey) {
      if (active === first) {
        ev.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        ev.preventDefault();
        first.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Auto-focus first element
  const focusable = getFocusable();
  if (focusable.length > 0) {
    // defer so CSS transitions don't fight focus
    setTimeout(() => {
      focusable[0].focus();
      onAutoFocus?.();
    }, 0);
  }

  return {
    detach() {
      container.removeEventListener('keydown', handleKeyDown);
    },
  };
}
