import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, h } from '@stencil/core';

import { getDrawerStyles } from './io-drawer-styles';
import { createDrawerHeadingId, getDrawerClass, getDrawerCloseIcon, isBackdropClick } from './io-drawer-utils';

import type { IoDrawerPlacement, IoDrawerSize } from './types';

/**
 * io-drawer
 * =========
 * Accessible slide-out drawer overlay built on the native <dialog> element.
 * The browser handles focus trapping, ESC key, and role="dialog".
 *
 * @example
 * <io-drawer heading="Settings" placement="right">
 *   <p>Drawer body content here.</p>
 *   <io-button slot="footer" variant="ghost">Cancel</io-button>
 *   <io-button slot="footer">Save</io-button>
 * </io-drawer>
 *
 * <script>
 *   const drawer = document.querySelector('io-drawer');
 *   document.getElementById('open-btn').addEventListener('click', () => { drawer.show(); });
 *   drawer.addEventListener('dismiss', () => console.log('dismissed'));
 * </script>
 */
@Component({
  tag: 'io-drawer',
  shadow: { delegatesFocus: true },
})
export class IoDrawer {
  @Element() el!: HTMLElement;

  private dialogEl?: HTMLDialogElement;
  private headingId!: string;

  // ── Props ─────────────────────────────────────────────────────

  /** Controls drawer visibility; synced to showModal/close */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Which edge the drawer attaches to */
  @Prop({ reflect: true }) placement: IoDrawerPlacement = 'right';

  /** Width preset (left/right) or height preset (bottom) */
  @Prop({ reflect: true }) size: IoDrawerSize = 'md';

  /** Heading text displayed in the drawer header */
  @Prop() heading?: string;

  /** Close the drawer when the backdrop is clicked */
  @Prop() closeOnBackdrop = true;

  /** Accessible label for the close button */
  @Prop() closeLabel = 'Close drawer';

  // ── Events ────────────────────────────────────────────────────

  /** Emitted after the drawer closes (any close path: button, backdrop, ESC) */
  @Event({ eventName: 'dismiss' }) dismissEvent!: EventEmitter<void>;

  // ── Methods ───────────────────────────────────────────────────

  /**
   * Programmatically show (open) the drawer. No-op if already open.
   *
   * Named `show()` to mirror the native <dialog> API and avoid a
   * TypeScript duplicate-identifier conflict with the `open` boolean prop.
   *
   * @example
   *   const drawer = document.querySelector('io-drawer');
   *   drawer.show();
   */
  @Method()
  async show(): Promise<void> {
    if (this.open) return;
    this.open = true;
  }

  /**
   * Programmatically close the drawer. No-op if already closed.
   * Emits the `dismiss` event.
   *
   * @example
   *   const drawer = document.querySelector('io-drawer');
   *   drawer.close();
   */
  @Method()
  async close(): Promise<void> {
    if (!this.open) return;
    this.open = false;
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.headingId = createDrawerHeadingId(Math.random().toString(36).slice(2));
  }

  componentDidLoad() {
    if (this.open && this.dialogEl) {
      this.dialogEl.showModal();
    }
  }

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('open')
  onOpenChange(newVal: boolean) {
    const dialog = this.el?.shadowRoot?.querySelector<HTMLDialogElement>('dialog');
    if (!dialog) return;
    if (newVal) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      this.dismissEvent.emit();
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleDialogClick = (ev: MouseEvent) => {
    if (!this.closeOnBackdrop) return;
    const dialog = ev.currentTarget as HTMLDialogElement;
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop = isBackdropClick(rect, ev.clientX, ev.clientY);
    if (clickedBackdrop) {
      this.open = false;
    }
  };

  private handleCancel = (ev: Event) => {
    ev.preventDefault();
    this.open = false;
  };

  private handleCloseClick = () => {
    this.open = false;
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { placement, size, heading, headingId } = this;
    const closeIcon = getDrawerCloseIcon();
    const drawerClass = getDrawerClass(placement, size);

    return (
      <Host>
        <style>{getDrawerStyles()}</style>
        <dialog
          ref={(el) => (this.dialogEl = el as HTMLDialogElement)}
          class={drawerClass}
          aria-labelledby={heading ? headingId : undefined}
          onClick={this.handleDialogClick}
          onCancel={this.handleCancel}
        >
          <div class="drawer__header">
            {heading && (
              <h2 id={headingId} class="drawer__heading">
                {heading}
              </h2>
            )}
            <button
              type="button"
              class="drawer__close"
              aria-label={this.closeLabel}
              onClick={this.handleCloseClick}
              innerHTML={closeIcon}
            />
          </div>
          <div class="drawer__body">
            <slot />
          </div>
          <div class="drawer__footer">
            <slot name="footer" />
          </div>
        </dialog>
      </Host>
    );
  }
}
