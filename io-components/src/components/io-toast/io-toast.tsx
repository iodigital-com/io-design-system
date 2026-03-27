import { Component, Element, State, Method, Host, h } from '@stencil/core';
import type { IoToastMessage, IoToastEntry } from './types';
import { toastManager } from './io-toast-manager';
import { getToastStyles } from './io-toast-styles';

/**
 * io-toast
 * =========
 * Fixed-position toast notification container. Place once in your app shell.
 * Call `addToast()` imperatively to enqueue notifications.
 *
 * Only one <io-toast> element may exist per page (singleton pattern).
 *
 * @example
 * <!-- App shell -->
 * <io-toast id="toast"></io-toast>
 *
 * <script>
 *   // Anywhere in your app:
 *   document.querySelector('io-toast').addToast({
 *     text: 'Settings saved.',
 *     variant: 'success',
 *   });
 * </script>
 */
@Component({
  tag: 'io-toast',
  shadow: true,
})
export class IoToast {
  @Element() el!: HTMLElement;

  @State() private currentMsg: IoToastEntry | null = null;

  // ── Lifecycle ─────────────────────────────────────────────────

  connectedCallback() {
    toastManager.register((msg) => {
      this.currentMsg = msg;
    });
  }

  disconnectedCallback() {
    toastManager.unregister();
  }

  // ── Methods ───────────────────────────────────────────────────

  /** Enqueue a toast notification */
  @Method()
  async addToast(message: IoToastMessage): Promise<void> {
    toastManager.addToast(message);
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    return (
      <Host role="status" aria-live="polite" aria-atomic="false">
        <style>{getToastStyles()}</style>
        {this.currentMsg && (
          <io-toast-item
            key={this.currentMsg.id}
            text={this.currentMsg.text}
            variant={this.currentMsg.variant ?? 'neutral'}
            onIoToastDismiss={() => toastManager.dismiss()}
          />
        )}
      </Host>
    );
  }
}
