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
  private focusTrigger?: Element;  // Track element that opened modal for focus restoration
  private inertElements: Element[] = [];  // Track elements with inert applied

  // ── Props ─────────────────────────────────────────────────────

  /** Controls dialog visibility; synced to showModal/close */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Heading text displayed in the modal header */
  @Prop() heading?: string;

  /** Width preset for the dialog */
  @Prop({ reflect: true }) size: IoModalSize = 'md';

  /** Close the modal when the backdrop is clicked */
  @Prop() closeOnBackdrop = true;

  /** Description text for accessibility (used in aria-describedby) */
  @Prop() description?: string;

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
      // Track the currently focused element (trigger button) for restoration on close
      this.focusTrigger = document.activeElement as Element;
      
      if (!this.dialogEl.open) {
        this.dialogEl.showModal();
      }
      
      // Apply inert to background elements to prevent screen reader navigation
      this.applyBackgroundInert();
      
      // Set up focus trap for keyboard navigation
      this.setupFocusTrap();
    } else {
      if (this.dialogEl.open) {
        this.dialogEl.close();
      }
      
      // Remove inert from background elements
      this.removeBackgroundInert();
      
      // Restore focus to trigger element
      if (this.focusTrigger && this.focusTrigger instanceof HTMLElement) {
        this.focusTrigger.focus();
      }
      
      this.dismissEvent.emit();
    }
  }

  // ── Private Helpers ───────────────────────────────────────────

  /**
   * Apply inert attribute to sibling and parent elements when modal opens.
   * This prevents screen reader users from navigating outside the modal.
   */
  private applyBackgroundInert() {
    if (!this.el || !this.el.parentElement) return;
    
    const parent = this.el.parentElement;
    const siblings = Array.from(parent.children).filter((child) => child !== this.el);
    
    siblings.forEach((sibling) => {
      if (!(sibling as HTMLElement).hasAttribute('inert')) {
        (sibling as HTMLElement).setAttribute('inert', '');
        this.inertElements.push(sibling);
      }
    });
  }

  /**
   * Remove inert attribute from background elements when modal closes.
   */
  private removeBackgroundInert() {
    this.inertElements.forEach((el) => {
      (el as HTMLElement).removeAttribute('inert');
    });
    this.inertElements = [];
  }

  /**
   * Set up focus trap: Tab/Shift+Tab within modal cycles through focusable elements.
   * Browser's native dialog focus trap may not work reliably in jsdom, so implement manual trap.
   */
  private setupFocusTrap() {
    if (!this.dialogEl) return;
    
    // Get all focusable elements within the modal (in shadow DOM and slots)
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(
      this.dialogEl.querySelectorAll(focusableSelector)
    ) as HTMLElement[];
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key !== 'Tab') return;
      
      const activeElement = this.dialogEl?.ownerDocument?.activeElement;
      
      // Shift+Tab on first element → focus last element
      if (ev.shiftKey && activeElement === firstElement) {
        ev.preventDefault();
        lastElement.focus();
      }
      // Tab on last element → focus first element
      else if (!ev.shiftKey && activeElement === lastElement) {
        ev.preventDefault();
        firstElement.focus();
      }
    };
    
    this.dialogEl.addEventListener('keydown', handleKeyDown);
    
    // Auto-focus first focusable element when modal opens
    // (browser's showModal may not focus correctly in all cases)
    if (firstElement && firstElement !== this.dialogEl.ownerDocument?.activeElement) {
      setTimeout(() => {
        firstElement.focus();
      }, 0);
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
    const { size, heading, headingId, description } = this;
    const closeIcon = getModalCloseIcon();
    const descriptionId = description ? `${headingId}-description` : undefined;

    return (
      <Host>
        <style>{getModalStyles()}</style>
        <dialog
          ref={(el) => (this.dialogEl = el as HTMLDialogElement)}
          class={`modal--${size}`}
          aria-labelledby={heading ? headingId : undefined}
          aria-describedby={descriptionId}
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
          <div class="modal__body" id={descriptionId}>
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
