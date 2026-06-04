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
      document.body.style.overflow = 'hidden';
      this.dialogEl.scrollTop = 0;     // reset scroll position on each open
      this.applyBackgroundInert();
      this.setupFocusTrap();
    }
  }

  disconnectedCallback() {
    document.body.style.overflow = '';
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

      document.body.style.overflow = 'hidden';

      // Apply inert to background elements to prevent screen reader navigation
      this.applyBackgroundInert();

      // Set up focus trap for keyboard navigation
      this.setupFocusTrap();
    } else {
      if (this.dialogEl.open) {
        this.dialogEl.close();
      }

      document.body.style.overflow = '';

      this.detachBackdropHostListener();
      this.detachEscHandler();
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
    if (!this.backdropEl) return;
    this.backdropHostHandler = () => {
      if (!this.closeOnBackdrop) return;
      this.open = false;
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

  /**
   * @slot - Default slot. Body content of the modal dialog.
   * @slot header - Replaces the built-in heading area. Use when you need custom heading markup or an io-heading element.
   * @slot footer - Action area rendered at the bottom of the dialog. Typically 1–2 io-button elements.
   */
  render() {
    const { size, background, heading, headingId, description } = this;
    const closeIcon = getModalCloseIcon();
    const descriptionId = description ? `${headingId}-description` : undefined;

    return (
      <Host>
        <style>{getModalStyles()}</style>
        {this.preventTopLayer && (
          <div
            class="modal__backdrop"
            ref={(el?: HTMLDivElement) => { this.backdropEl = el; }}
          />
        )}
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
