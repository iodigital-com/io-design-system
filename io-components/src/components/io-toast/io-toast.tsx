import { Component, Element, Prop, State, Method, Host, h } from '@stencil/core';

import { toastManager } from './io-toast-manager';
import { getToastStyles } from './io-toast-styles';
import { getToastItemVariant, isToastPersistent } from './io-toast-utils';

import type { IoToastMessage, IoToastEntry, IoToastPosition } from './types';

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

  /**
   * Where on screen the toast stack appears.
   * @default 'bottom-end'
   */
  @Prop({ reflect: true }) position: IoToastPosition = 'bottom-end';

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

  private handleItemDismiss = () => {
    toastManager.dismiss();
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const persistent = this.currentMsg ? isToastPersistent(this.currentMsg) : false;
    const liveRole = persistent ? 'alertdialog' : 'status';
    const liveValue = persistent ? 'assertive' : 'polite';

    return (
      <Host
        role={liveRole}
        aria-live={liveValue}
        aria-atomic="true"
        data-position={this.position}
      >
        <style>{getToastStyles()}</style>
        {this.currentMsg && (
          <io-toast-item
            key={this.currentMsg.id}
            text={this.currentMsg.text}
            variant={getToastItemVariant(this.currentMsg)}
            actionLabel={this.currentMsg.actionLabel}
            actionHref={this.currentMsg.actionHref}
            onDismiss={this.handleItemDismiss}
          />
        )}
      </Host>
    );
  }
}
