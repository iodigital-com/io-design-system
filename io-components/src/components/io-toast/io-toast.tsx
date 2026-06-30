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
 * ARIA live-region strategy (issue #1003):
 *   - Host always carries role="status" aria-live="polite" so the live region
 *     is stable — screen readers register it on mount and never lose track of it.
 *   - A secondary <div role="alert" aria-live="assertive"> is rendered
 *     unconditionally inside the host. Its text content is populated only when
 *     a persistent/error toast is active, triggering an assertive announcement
 *     without mutating the host's role attribute.
 *
 * Stacked toasts (issue #994):
 *   - Up to `maxVisible` (default 3) toasts are shown simultaneously.
 *   - Each <io-toast-item> carries its own role="status" for independent a11y.
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

  @State() private visibleMsgs: IoToastEntry[] = [];

  // ── Lifecycle ─────────────────────────────────────────────────

  connectedCallback() {
    toastManager.register((msgs) => {
      this.visibleMsgs = msgs;
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

  /**
   * Dismiss a specific toast by id, or the oldest visible one when no id given.
   */
  @Method()
  async dismissToast(id?: number): Promise<void> {
    toastManager.dismiss(id);
  }

  /** Dismiss all visible and queued toasts immediately. */
  @Method()
  async dismissAll(): Promise<void> {
    toastManager.dismissAll();
  }

  private handleItemDismiss = (id: number) => {
    toastManager.dismiss(id);
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    // Collect text of any currently-visible persistent/error toasts so the
    // assertive live region can announce them without mutating the host role.
    const assertiveText = this.visibleMsgs
      .filter((m) => isToastPersistent(m))
      .map((m) => m.text)
      .join(' ');

    return (
      <Host
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-position={this.position}
      >
        <style>{getToastStyles()}</style>

        {/* Assertive region: always present, populated only for persistent/error toasts */}
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          class="toast__assertive-region"
        >
          {assertiveText}
        </div>

        {/* Stacked toast items — each carries its own status live region */}
        {this.visibleMsgs.map((msg) => (
          <io-toast-item
            key={msg.id}
            text={msg.text}
            variant={getToastItemVariant(msg)}
            actionLabel={msg.actionLabel}
            actionHref={msg.actionHref}
            actions={msg.actions}
            showProgress={msg.showProgress}
            duration={msg.duration ?? 6000}
            onDismiss={() => this.handleItemDismiss(msg.id)}
          />
        ))}
      </Host>
    );
  }
}
