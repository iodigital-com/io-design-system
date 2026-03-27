import { Component, Prop, Event, EventEmitter, Element, Host, Method, Watch, h } from '@stencil/core';
import type { IoModalSize } from './types';
import { getModalStyles } from './io-modal-styles';

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
 *   modal.show();
 *   document.getElementById('cancel-btn').addEventListener('click', () => modal.hide());
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

  /** Fires after the modal opens */
  @Event() ioOpen!: EventEmitter<void>;

  /** Fires after the modal closes */
  @Event() ioClose!: EventEmitter<void>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.headingId = `io-modal-heading-${Math.random().toString(36).slice(2)}`;
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
        this.ioOpen.emit();
      }
    } else {
      if (this.dialogEl.open) {
        this.dialogEl.close();
        this.ioClose.emit();
      }
    }
  }

  // ── Methods ───────────────────────────────────────────────────

  /** Opens the modal dialog */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  /** Closes the modal dialog */
  @Method()
  async hide(): Promise<void> {
    this.open = false;
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleDialogClick = (ev: MouseEvent) => {
    if (!this.closeOnBackdrop) return;
    const dialog = ev.currentTarget as HTMLDialogElement;
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop =
      ev.clientX < rect.left ||
      ev.clientX > rect.right ||
      ev.clientY < rect.top ||
      ev.clientY > rect.bottom;
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

    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

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
