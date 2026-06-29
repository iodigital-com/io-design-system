import { supportsOverlayTransition } from './supportsOverlayTransition';

export interface TopLayerController {
  requestShow(): void;
  requestHide(): void;
  destroy(): void;
}

/**
 * Creates a controller that wraps `dialog.showModal()` / `dialog.close()` and
 * defers `close()` until the CSS exit transition completes on browsers that do
 * not support `transition-behavior: allow-discrete` (Safari, Firefox).
 *
 * @param dialog  - The native <dialog> element to control.
 * @param onHidden - Called after the dialog has been fully closed (after
 *                   `close()` executes, whether synchronous or deferred).
 */
export function createTopLayerController(
  dialog: HTMLDialogElement,
  onHidden: () => void,
): TopLayerController {
  let pendingTimeout: ReturnType<typeof setTimeout> | undefined;
  let pendingHandler: (() => void) | undefined;

  function clearPending() {
    if (pendingTimeout !== undefined) {
      clearTimeout(pendingTimeout);
      pendingTimeout = undefined;
    }
    if (pendingHandler) {
      dialog.removeEventListener('transitionend', pendingHandler);
      pendingHandler = undefined;
    }
  }

  function doClose() {
    clearPending();
    if (dialog.open) dialog.close();
    onHidden();
  }

  return {
    requestShow() {
      clearPending();
      if (!dialog.open) {
        dialog.showModal();
      }
    },

    requestHide() {
      if (!dialog.open) {
        onHidden();
        return;
      }
      if (supportsOverlayTransition()) {
        doClose();
        return;
      }
      // Defer close until exit transition completes (Safari / Firefox)
      clearPending();
      pendingHandler = () => {
        clearPending();
        if (dialog.open) dialog.close();
        onHidden();
      };
      dialog.addEventListener('transitionend', pendingHandler, { once: true });
      // Fallback: close after max transition duration + 50 ms buffer
      const maxMs = getMaxTransitionDurationMs(dialog);
      pendingTimeout = setTimeout(() => {
        if (pendingHandler) {
          dialog.removeEventListener('transitionend', pendingHandler);
          pendingHandler = undefined;
        }
        pendingTimeout = undefined;
        if (dialog.open) dialog.close();
        onHidden();
      }, maxMs + 50);
    },

    destroy() {
      clearPending();
    },
  };
}

function getMaxTransitionDurationMs(el: HTMLElement): number {
  if (typeof window === 'undefined') return 300;
  const style = window.getComputedStyle(el);
  const durations = (style.transitionDuration || '0s').split(',');
  const max = durations.reduce((acc, d) => {
    const trimmed = d.trim();
    const val = parseFloat(trimmed);
    if (isNaN(val)) return acc;
    const ms = trimmed.endsWith('ms') ? val : val * 1000;
    return Math.max(acc, ms);
  }, 0);
  return max || 300;
}
