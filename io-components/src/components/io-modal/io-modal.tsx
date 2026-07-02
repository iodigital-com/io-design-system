import { Component, Prop, Event, EventEmitter, Method, Element, Host, State, Watch, h } from '@stencil/core';

import { getModalStyles } from './io-modal-styles';
import { createModalHeadingId, getModalCloseIcon, isBackdropClick } from './io-modal-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/dialog-utils';

import type { IoModalBackground, IoModalBackdrop, IoModalSize } from './types';

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

  // ── State ─────────────────────────────────────────────────────

  @State() private hasFooterSlot = false;

  private dialogEl?: HTMLDialogElement;
  private headingId!: string;
  private focusTrigger?: Element; // Track element that opened modal for focus restoration
  private inertElements: Element[] = []; // Track elements with inert applied
  private focusTrapHandler?: (ev: KeyboardEvent) => void;
  private _userInitiatedClose = false;
  private transitionEndHandler?: (ev: TransitionEvent) => void;
  private backdropEl?: HTMLDivElement;
  private backdropHostHandler?: (ev: MouseEvent) => void;
  private escHandler?: (ev: KeyboardEvent) => void;

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
   * Backdrop style behind the modal dialog.
   * - blur:    backdrop-filter blur (default)
   * - shading: solid overlay color only
   */
  @Prop({ reflect: true }) backdrop: IoModalBackdrop = 'blur';

  /**
   * When `true` (default), the built-in close (×) button is rendered in the
   * modal header and pressing ESC will close the modal.
   *
   * Set to `false` to hide the close button and suppress ESC dismissal —
   * useful for confirmation dialogs or multi-step flows where the user must
   * explicitly choose an action to proceed.
   *
   * @default true
   */
  @Prop() dismissButton = true;

  /**
   * When `true` (default), the native `<dialog>` is opened with `show()`
   * instead of `showModal()`. The component manages its own backdrop,
   * focus-trap, ESC key, and `inert` management — behavior is identical to
   * the `showModal()` path but compatible with every JavaScript framework.
   *
   * ### Why `true` is the default
   *
   * `showModal()` promotes `<dialog>` to the browser top layer. React 18
   * delegates synthetic events to `#root`; composed click events from
   * shadow-DOM children inside a top-layer dialog do not reliably reach the
   * React root, causing slotted `slot="footer"` buttons to be non-clickable.
   * Vue 3, Angular, and Svelte attach listeners directly so they are
   * unaffected — but they receive the same fully-featured behavior either
   * way, so the default `true` is safe for all consumers.
   *
   * Set to `false` only when native top-layer stacking is strictly required,
   * for example to guarantee the dialog appears above Popover API elements or
   * fullscreen video on the same page.
   *
   * @default true
   */
  @Prop({ reflect: true }) preventTopLayer = true;

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
    this.hasFooterSlot = Array.from(this.el?.children ?? []).some(
      c => c.getAttribute('slot') === 'footer',
    );

    const hasLabel = this.aria?.['aria-label'] || this.aria?.['aria-labelledby'];
    if (!this.heading && !hasLabel) {
      console.error(
        '[io-modal] No accessible name provided. Set heading, aria-label, or aria-labelledby prop for WCAG 4.1.2 compliance.',
      );
    }
  }

  componentDidLoad() {
    this.attachTransitionEndListener();
    if (this.open && this.dialogEl) {
      this.focusTrigger = document.activeElement as Element;
      if (this.preventTopLayer) {
        this.dialogEl.show();
        this.attachBackdropHostListener();
        this.attachEscHandler();
      } else {
        this.dialogEl.inert = true;    // prevent autofocus conflicting with open animation
        this.dialogEl.showModal();
        this.dialogEl.inert = false;
      }
      this.dialogEl.focus();           // Safari: explicit focus prevents transition bug
      lockBodyScroll();
      this.dialogEl.scrollTop = 0;     // reset scroll position on each open
      this.applyBackgroundInert();
      this.setupFocusTrap();
    }
  }

  disconnectedCallback() {
    unlockBodyScroll();
    this.clearFocusTrap();
    this.removeBackgroundInert();
    this.detachTransitionEndListener();
    this.detachBackdropHostListener();
    this.detachEscHandler();
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
          this.attachEscHandler();
        } else {
          this.dialogEl.inert = true;    // prevent autofocus conflicting with open animation
          this.dialogEl.showModal();
          this.dialogEl.inert = false;
        }
        this.dialogEl.focus();           // Safari: explicit focus prevents transition bug
        this.dialogEl.scrollTop = 0;     // reset scroll position on each open
      }

      lockBodyScroll();

      // Apply inert to background elements to prevent screen reader navigation
      this.applyBackgroundInert();

      // Set up focus trap for keyboard navigation
      this.setupFocusTrap();
    } else {
      if (this.dialogEl.open) {
        this.dialogEl.close();
      }

      unlockBodyScroll();

      this.detachBackdropHostListener();
      this.detachEscHandler();
      this.clearFocusTrap();

      // Remove inert from background elements
      this.removeBackgroundInert();

      // Restore focus to trigger element
      if (this.focusTrigger && this.focusTrigger instanceof HTMLElement) {
        this.focusTrigger.focus();
      }

      if (this._userInitiatedClose) {
        this.dismissEvent.emit();
      }
      this._userInitiatedClose = false;
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
   * Apply inert attribute to sibling elements when modal opens.
   * Walks document.body.children so inertness is applied at the top level
   * regardless of how deeply the modal is nested in framework wrapper divs.
   * Skips elements that contain this.el (ancestors) so slotted footer buttons remain interactive.
   * No-op when preventTopLayer=false — showModal() handles inertness natively via top-layer.
   */
  private applyBackgroundInert() {
    if (!this.preventTopLayer) return;
    this.inertElements = [];
    Array.from(document.body.children).forEach((child) => {
      const el = child as HTMLElement;
      if (el === this.el) return;
      if (el.contains(this.el)) return;
      if (el.hasAttribute('data-io-allow-during-modal')) return;
      if (el.hasAttribute('inert')) return;
      el.setAttribute('inert', '');
      this.inertElements.push(el);
    });
  }

  /**
   * Remove inert attribute from background elements when modal closes.
   */
  private removeBackgroundInert() {
    this.inertElements.forEach((el) => (el as HTMLElement).removeAttribute('inert'));
    this.inertElements = [];
  }

  /**
   * Set up focus trap: Tab/Shift+Tab within modal cycles through focusable elements.
   * Browser's native dialog focus trap may not work reliably in jsdom, so implement manual trap.
   */
  private setupFocusTrap() {
    if (!this.dialogEl) return;

    this.clearFocusTrap();

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable]:not([contenteditable="false"]), summary';

    // Walk the shadow tree in DOM order, resolving <slot> elements to their assigned
    // light-DOM nodes. This ensures both shadow-DOM elements (e.g. the close button)
    // and slotted footer/body elements are included in the correct tab order.
    const focusableElements: HTMLElement[] = [];
    const collect = (el: Element) => {
      if (el.tagName === 'SLOT') {
        (el as HTMLSlotElement).assignedElements({ flatten: true }).forEach(collect);
      } else {
        if ((el as HTMLElement).matches?.(focusableSelector)) {
          focusableElements.push(el as HTMLElement);
        }
        Array.from(el.children).forEach(collect);
      }
    };
    Array.from(this.dialogEl.children).forEach(collect);

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
    if (!this.backdropEl) return;
    this.backdropHostHandler = (ev: MouseEvent) => {
      if (!this.closeOnBackdrop) return;
      // Only close when clicking the backdrop area itself, not elements inside the dialog.
      // ev.target is the backdrop div only when clicking outside the dialog panel.
      if (ev.target === this.backdropEl) {
        this.open = false;
      }
    };
    this.backdropEl.addEventListener('click', this.backdropHostHandler);
  }

  private detachBackdropHostListener() {
    if (!this.backdropHostHandler || !this.backdropEl) return;
    this.backdropEl.removeEventListener('click', this.backdropHostHandler);
    this.backdropHostHandler = undefined;
  }

  private attachEscHandler() {
    this.escHandler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        if (!this.dismissButton) return;
        this.open = false;
      }
    };
    document.addEventListener('keydown', this.escHandler);
  }

  private detachEscHandler() {
    if (!this.escHandler) return;
    document.removeEventListener('keydown', this.escHandler);
    this.escHandler = undefined;
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleDialogClick = (ev: MouseEvent) => {
    if (!this.closeOnBackdrop) return;
    const dialog = ev.currentTarget as HTMLDialogElement;
    const isTarget = ev.target === ev.currentTarget;
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop = isTarget || isBackdropClick(rect, ev.clientX, ev.clientY);
    if (clickedBackdrop) {
      this._userInitiatedClose = true;
      this.open = false;
    }
  };

  private handleCancel = (ev: Event) => {
    ev.preventDefault();
    if (!this.dismissButton) return;
    this._userInitiatedClose = true;
    this.open = false;
  };

  private handleCloseClick = () => {
    this._userInitiatedClose = true;
    this.open = false;
  };

  private handleFooterSlotChange = () => {
    this.hasFooterSlot = Array.from(this.el.children).some(
      c => c.getAttribute('slot') === 'footer',
    );
  };

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot - Default slot. Body content of the modal dialog.
   * @slot header - Replaces the built-in heading area. Use when you need custom heading markup or an io-heading element.
   * @slot footer - Action area rendered at the bottom of the dialog. Typically 1–2 io-button elements.
   */
  render() {
    const { size, background, heading, headingId, description } = this;
    const closeIcon = getModalCloseIcon();
    const descriptionId = description ? `${headingId}-description` : undefined;

    const dialog = (
      <dialog
        ref={(el?: HTMLDialogElement) => {
          this.dialogEl = el;
          applyAriaProp(this.aria, el ?? null);
        }}
        class={`modal--${size} modal--bg-${background}`}
        aria-labelledby={heading ? headingId : undefined}
        aria-describedby={descriptionId}
        aria-modal="true"
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
          {this.dismissButton && (
            <button
              type="button"
              class="modal__close"
              aria-label="Close dialog"
              onClick={this.handleCloseClick}
              innerHTML={closeIcon}
            />
          )}
        </div>
        <div class="modal__body" id={descriptionId}>
          <slot />
        </div>
        <div class={`modal__footer${this.hasFooterSlot ? '' : ' modal__footer--hidden'}`}>
          <slot name="footer" onSlotchange={this.handleFooterSlotChange} />
        </div>
      </dialog>
    );

    return (
      <Host>
        <style>{getModalStyles()}</style>
        {this.preventTopLayer ? (
          /* Backdrop is the fixed flex-centering container; dialog is its child.
             This avoids giving the dialog an elevated z-index, which would cause
             the shadow DOM element to intercept pointer events intended for
             slotted light-DOM children (slot="footer" IoButton elements). */
          <div
            class="modal__backdrop"
            ref={(el?: HTMLDivElement) => { this.backdropEl = el; }}
          >
            {dialog}
          </div>
        ) : (
          dialog
        )}
      </Host>
    );
  }
}
