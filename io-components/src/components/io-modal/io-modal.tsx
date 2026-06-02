import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, h } from '@stencil/core';

import { getModalStyles } from './io-modal-styles';
import { createModalHeadingId, getModalCloseIcon, isBackdropClick } from './io-modal-utils';
import { applyAriaProp } from '../../utils/aria-prop';

import type { IoModalBackground, IoModalSize } from './types';

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
  private focusTrigger?: Element; // Track element that opened modal for focus restoration
  private inertElements: Element[] = []; // Track elements with inert applied
  private focusTrapHandler?: (ev: KeyboardEvent) => void;
  private transitionEndHandler?: (ev: TransitionEvent) => void;
  private backdropHostHandler?: (ev: MouseEvent) => void;

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

  /**
   * Custom ARIA attributes to inject onto the native `<dialog>` element.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * // Sets aria-owns="step-panel" on the native <dialog>
   * <io-modal .aria={{ owns: 'step-panel' }}>...</io-modal>
   */
  @Prop() aria?: Record<string, string>;

  /**
   * Background surface level for the modal panel.
   * - canvas:   var(--io-bg-page) — default page background
   * - surface:  var(--io-bg-surface) — slightly elevated surface
   * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
   */
  @Prop({ reflect: true }) background: IoModalBackground = 'canvas';

  /**
   * When `true`, the native `<dialog>` is opened with `show()` instead of
   * `showModal()`. This prevents the element from entering the browser's
   * **top layer**, which is necessary for React 18 consumers.
   *
   * ### Why this matters for React 18
   *
   * `showModal()` promotes the `<dialog>` to the browser top layer — a
   * separate rendering layer that sits above all CSS stacking contexts.
   * React 18 delegates synthetic events (including `onClick`) to the root
   * container (`#root`). Composed click events from shadow-DOM children
   * inside a top-layer dialog **do not reliably bubble to the React root**,
   * causing slotted footer buttons to appear unclickable.
   *
   * Setting `preventTopLayer` to `true` keeps the dialog in the normal
   * document flow so React's event delegation works as expected. The
   * component handles its own backdrop, z-index, and focus-trap — all
   * accessibility guarantees remain in place.
   *
   * @example
   * // React 18 usage
   * <io-modal open={isOpen} prevent-top-layer heading="Confirm">
   *   <io-button slot="footer" onClick={handleClose}>Cancel</io-button>
   * </io-modal>
   */
  @Prop({ reflect: true }) preventTopLayer = false;

  // ── Events ────────────────────────────────────────────────────

  /** Emitted after the modal closes (any close path: user-initiated or programmatic) */
  @Event({ eventName: 'dismiss' }) dismissEvent!: EventEmitter<void>;

  /** Emitted after the open animation/transition has completed (transitionend on the dialog panel) */
  @Event({ eventName: 'motionVisibleEnd' }) motionVisibleEndEvent!: EventEmitter<void>;

  /** Emitted after the close animation/transition has completed (transitionend on the dialog panel) */
  @Event({ eventName: 'motionHiddenEnd' }) motionHiddenEndEvent!: EventEmitter<void>;

  // ── Methods ───────────────────────────────────────────────────

  /**
   * Programmatically show (open) the modal. No-op if already open.
   *
   * Named `show()` to mirror the native <dialog> API and avoid a
   * TypeScript duplicate-identifier conflict with the `open` boolean prop.
   * Equivalent to setting `open = true`.
   *
   * @example
   *   const modal = document.querySelector('io-modal');
   *   modal.show();
   */
  @Method()
  async show(): Promise<void> {
    if (this.open) return;
    this.open = true;
  }

  /**
   * Programmatically close the modal. No-op if already closed.
   * Equivalent to setting `open = false`. Emits the `dismiss` event.
   *
   * @example
   *   const modal = document.querySelector('io-modal');
   *   modal.close();
   */
  @Method()
  async close(): Promise<void> {
    if (!this.open) return;
    this.open = false;
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.headingId = createModalHeadingId(Math.random().toString(36).slice(2));
  }

  componentDidLoad() {
    this.attachTransitionEndListener();
    if (this.open && this.dialogEl) {
      this.focusTrigger = document.activeElement as Element;
      if (this.preventTopLayer) {
        this.dialogEl.show();
        this.attachBackdropHostListener();
      } else {
        this.dialogEl.showModal();
      }
      this.applyBackgroundInert();
      this.setupFocusTrap();
    }
  }

  disconnectedCallback() {
    this.clearFocusTrap();
    this.removeBackgroundInert();
    this.detachTransitionEndListener();
    this.detachBackdropHostListener();
  }

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('aria')
  onAriaChange() {
    applyAriaProp(this.aria, this.dialogEl ?? null);
  }

  @Watch('open')
  openChanged(newVal: boolean) {
    if (!this.dialogEl) return;
    if (newVal) {
      // Track the currently focused element (trigger button) for restoration on close
      this.focusTrigger = document.activeElement as Element;

      if (!this.dialogEl.open) {
        if (this.preventTopLayer) {
          this.dialogEl.show();
          this.attachBackdropHostListener();
        } else {
          this.dialogEl.showModal();
        }
      }

      // Apply inert to background elements to prevent screen reader navigation
      this.applyBackgroundInert();

      // Set up focus trap for keyboard navigation
      this.setupFocusTrap();
    } else {
      if (this.dialogEl.open) {
        this.dialogEl.close();
      }

      this.detachBackdropHostListener();
      this.clearFocusTrap();

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
   * Attach a transitionend listener to the dialog element so we can emit
   * motionVisibleEnd / motionHiddenEnd after CSS transitions complete.
   */
  private attachTransitionEndListener() {
    if (!this.dialogEl) return;
    this.transitionEndHandler = () => {
      if (this.open) {
        this.motionVisibleEndEvent.emit();
      } else {
        this.motionHiddenEndEvent.emit();
      }
    };
    this.dialogEl.addEventListener('transitionend', this.transitionEndHandler);
  }

  private detachTransitionEndListener() {
    if (!this.dialogEl || !this.transitionEndHandler) return;
    this.dialogEl.removeEventListener('transitionend', this.transitionEndHandler);
    this.transitionEndHandler = undefined;
  }

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

    this.clearFocusTrap();

    // Get all focusable elements within the modal (in shadow DOM and slots)
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(
      this.dialogEl.querySelectorAll(focusableSelector)
    ) as HTMLElement[];

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Auto-focus first focusable element when modal opens
    // (browser's showModal may not focus correctly in all cases)
    if (firstElement && firstElement !== this.dialogEl.ownerDocument?.activeElement) {
      setTimeout(() => {
        firstElement.focus();
      }, 0);
    }

    if (firstElement === lastElement) {
      return;
    }

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
    this.focusTrapHandler = handleKeyDown;
    this.dialogEl.addEventListener('keydown', handleKeyDown);
  }

  private clearFocusTrap() {
    if (!this.dialogEl || !this.focusTrapHandler) return;
    this.dialogEl.removeEventListener('keydown', this.focusTrapHandler);
    this.focusTrapHandler = undefined;
  }

  private attachBackdropHostListener() {
    this.backdropHostHandler = (ev: MouseEvent) => {
      if (!this.closeOnBackdrop) return;
      if (ev.target === this.el) {
        this.open = false;
      }
    };
    this.el.addEventListener('click', this.backdropHostHandler);
  }

  private detachBackdropHostListener() {
    if (!this.backdropHostHandler) return;
    this.el.removeEventListener('click', this.backdropHostHandler);
    this.backdropHostHandler = undefined;
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
    const { size, background, heading, headingId, description } = this;
    const closeIcon = getModalCloseIcon();
    const descriptionId = description ? `${headingId}-description` : undefined;

    return (
      <Host>
        <style>{getModalStyles()}</style>
        <dialog
          ref={(el?: HTMLDialogElement) => {
            this.dialogEl = el;
            applyAriaProp(this.aria, el ?? null);
          }}
          class={`modal--${size} modal--bg-${background}`}
          aria-labelledby={heading ? headingId : undefined}
          aria-describedby={descriptionId}
          aria-modal={this.preventTopLayer ? 'true' : undefined}
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
