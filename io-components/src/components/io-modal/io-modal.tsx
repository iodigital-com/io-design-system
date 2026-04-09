import { Component, Prop, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';
import type { IoModalSize } from './types';
import { getModalStyles } from './io-modal-styles';
import { createModalHeadingId, getModalCloseIcon, isBackdropClick } from './io-modal-utils';

/**
 * io-modal
 * =========
 * Accessible modal dialog built on the native <dialog> element.
 * The browser handles focus trapping, ESC key, and role="dialog".
 *
 * @example
 * <io-modal heading="Confirm action">
 *   <p>Are you sure you want to delete this item?</p>
 *   <io-button slot="footer" variant="ghost" id="cancel-btn">Cancel</io-button>
 *   <io-button slot="footer" color="rouge">Delete</io-button>
 * </io-modal>
 *
 * <script>
 *   const modal = document.querySelector('io-modal');
 *   document.getElementById('open-btn').addEventListener('click', () => { modal.open = true; });
 *   document.getElementById('cancel-btn').addEventListener('click', () => { modal.open = false; });
 *   modal.addEventListener('dismiss', () => console.log('dismissed'));
 * </script>
 */
@Component({
  tag: 'io-modal',
  shadow: { delegatesFocus: true },
})
export class IoModal {
  @Element() el!: HTMLElement;

  private dialogEl?: HTMLDialogElement;
  private headingId!: string;

  // ── Props ─────────────────────────────────────────────────────

  /** Controls dialog visibility; synced to showModal/close */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Heading text displayed in the modal header */
  @Prop() heading?: string;

  /** Width preset for the dialog */
  @Prop({ reflect: true }) size: IoModalSize = 'md';

  /** Close the modal when the backdrop is clicked */
  @Prop() closeOnBackdrop = true;

  // ── Events ────────────────────────────────────────────────────

  /** Emitted after the modal closes (any close path: user-initiated or programmatic) */
  @Event({ eventName: 'dismiss' }) dismissEvent!: EventEmitter<void>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.headingId = createModalHeadingId(Math.random().toString(36).slice(2));
  }

  componentDidLoad() {
    if (this.open && this.dialogEl) {
      this.dialogEl.showModal();
    }
  }

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('open')
  openChanged(newVal: boolean) {
    if (!this.dialogEl) return;
    if (newVal) {
      if (!this.dialogEl.open) {
        this.dialogEl.showModal();
      }
    } else {
      if (this.dialogEl.open) {
        this.dialogEl.close();
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
    const { size, heading, headingId } = this;
    const closeIcon = getModalCloseIcon();

    return (
      <Host>
        <style>{getModalStyles()}</style>
        <dialog
          ref={(el) => (this.dialogEl = el as HTMLDialogElement)}
          class={`modal--${size}`}
          aria-labelledby={heading ? headingId : undefined}
          onClick={this.handleDialogClick}
          onCancel={this.handleCancel}
        >
          <div class="modal__header">
            <slot name="header">
              {heading && (
                <h2 id={headingId} class="modal__heading">
                  {heading}
                </h2>
              )}
            </slot>
            <button
              type="button"
              class="modal__close"
              aria-label="Close dialog"
              onClick={this.handleCloseClick}
              innerHTML={closeIcon}
            />
          </div>
          <div class="modal__body">
            <slot />
          </div>
          <div class="modal__footer">
            <slot name="footer" />
          </div>
        </dialog>
      </Host>
    );
  }
}
