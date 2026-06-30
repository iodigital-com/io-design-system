import { Component, Prop, Event, EventEmitter, Method, Element, Host, State, Watch, h } from '@stencil/core';

import { getModalStyles } from './io-modal-styles';
import { createModalHeadingId, getModalCloseIcon } from './io-modal-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import { acquireScrollLock, releaseScrollLock } from '../../utils/scroll-lock';
import { supportsOverlayTransition } from '../../utils/top-layer/supportsOverlayTransition';

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

  // ── State ─────────────────────────────────────────────────────

  @State() private hasFooterSlot = false;

  private dialogEl?: HTMLDialogElement;
  private headingId!: string;
  private focusTrigger?: Element; // Track element that opened modal for focus restoration
  private inertElements: Element[] = []; // Track elements with inert applied
  private focusTrapHandler?: (ev: KeyboardEvent) => void;
  private transitionEndHandler?: (ev: TransitionEvent) => void;
  private backdropEl?: HTMLDivElement;
  private backdropHostHandler?: (ev: MouseEvent) => void;
  private escHandler?: (ev: KeyboardEvent) => void;
  private _scrollLockHeld = false;
  private _pendingCloseTimeout?: ReturnType<typeof setTimeout>;
  private _pendingCloseHandler?: () => void;

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
      acquireScrollLock();
      this._scrollLockHeld = true;
      this.dialogEl.scrollTop = 0;     // reset scroll position on each open
      this.applyBackgroundInert();
      this.setupFocusTrap();
    }
  }

  disconnectedCallback() {
    this._clearPendingClose();
    if (this._scrollLockHeld) {
      releaseScrollLock();
      this._scrollLockHeld = false;
    }
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

      if (!this._scrollLockHeld) {
        acquireScrollLock();
        this._scrollLockHeld = true;
      }

      // Apply inert to background elements to prevent screen reader navigation
      this.applyBackgroundInert();

      // Set up focus trap for keyboard navigation
      this.setupFocusTrap();
    } else {
      this.detachBackdropHostListener();
      this.detachEscHandler();
      this.clearFocusTrap();
      this.removeBackgroundInert();

      if (this._scrollLockHeld) {
        releaseScrollLock();
        this._scrollLockHeld = false;
      }

      // Restore focus to trigger element
      if (this.focusTrigger && this.focusTrigger instanceof HTMLElement) {
        this.focusTrigger.focus();
      }

      this.dismissEvent.emit();

      // Close the native dialog — defer in top-layer mode on browsers without
      // allow-discrete so the CSS exit transition completes before removal.
      if (this.dialogEl.open) {
        if (this.preventTopLayer || supportsOverlayTransition()) {
          this.dialogEl.close();
        } else {
          this._deferDialogClose(this.dialogEl);
        }
      }
    }
  }

  // ── Private Helpers ───────────────────────────────────────────

  /**
   * Attach a transitionend listener to the dialog element so we can emit
   * motionVisibleEnd / motionHiddenEnd after CSS transitions complete.
   */
  private _clearPendingClose() {
    if (this._pendingCloseTimeout !== undefined) {
      clearTimeout(this._pendingCloseTimeout);
      this._pendingCloseTimeout = undefined;
    }
    if (this._pendingCloseHandler && this.dialogEl) {
      this.dialogEl.removeEventListener('transitionend', this._pendingCloseHandler);
      this._pendingCloseHandler = undefined;
    }
  }

  private _deferDialogClose(dialog: HTMLDialogElement) {
    const maxMs = this._getMaxTransitionDurationMs(dialog);
    // No CSS transitions (e.g. jsdom) — close synchronously, nothing to defer.
    if (maxMs === 0) {
      if (dialog.open) dialog.close();
      return;
    }
    this._clearPendingClose();
    this._pendingCloseHandler = () => {
      this._clearPendingClose();
      if (dialog.open) dialog.close();
    };
    dialog.addEventListener('transitionend', this._pendingCloseHandler, { once: true });
    this._pendingCloseTimeout = setTimeout(() => {
      if (this._pendingCloseHandler) {
        dialog.removeEventListener('transitionend', this._pendingCloseHandler);
        this._pendingCloseHandler = undefined;
      }
      this._pendingCloseTimeout = undefined;
      if (dialog.open) dialog.close();
    }, maxMs + 50);
  }

  private _getMaxTransitionDurationMs(el: HTMLElement): number {
    if (typeof window === 'undefined') return 0;
    try {
      const style = window.getComputedStyle(el);
      const durations = (style.transitionDuration || '0s').split(',');
      return durations.reduce((acc, d) => {
        const trimmed = d.trim();
        const val = parseFloat(trimmed);
        if (isNaN(val)) return acc;
        const ms = trimmed.endsWith('ms') ? val : val * 1000;
        return Math.max(acc, ms);
      }, 0);
    } catch {
      return 0;
    }
  }

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
   * Includes both shadow-DOM elements and slotted light-DOM children (e.g. slot="footer"
   * io-button elements) which querySelectorAll alone does not traverse (#972).
   */
  private setupFocusTrap() {
    if (!this.dialogEl) return;

    this.clearFocusTrap();

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Shadow-DOM focusables (close button, etc.)
    const shadowFocusable = Array.from(
      this.dialogEl.querySelectorAll<HTMLElement>(focusableSelector),
    );

    // Slotted light-DOM focusables (e.g. <io-button slot="footer">)
    const slots = Array.from(this.dialogEl.querySelectorAll('slot')) as HTMLSlotElement[];
    const slottedFocusable = slots.flatMap((slot) =>
      Array.from(slot.assignedElements({ flatten: true })).flatMap((el) => {
        const matches: HTMLElement[] = [];
        if ((el as HTMLElement).matches?.(focusableSelector)) matches.push(el as HTMLElement);
        matches.push(...Array.from(el.querySelectorAll<HTMLElement>(focusableSelector)));
        return matches;
      }),
    );

    const focusableElements = [...shadowFocusable, ...slottedFocusable];

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Auto-focus first focusable element when modal opens.
    // setTimeout(0) defers focus until after current call stack — prevents Tab
    // key being consumed by the opener element instead of the modal (#984).
    if (firstElement && firstElement !== this.dialogEl.ownerDocument?.activeElement) {
      setTimeout(() => firstElement.focus(), 0);
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

  // ev.target === <dialog> means the click landed directly on the dialog padding
  // (backdrop area), not on any content descendant — geometrically correct even
  // at rounded corners where the bounding-rect check would give false negatives.
  private handleDialogClick = (ev: MouseEvent) => {
    if (!this.closeOnBackdrop) return;
    if (ev.target === ev.currentTarget) {
      this.open = false;
    }
  };

  private handleCancel = (ev: Event) => {
    ev.preventDefault();
    if (!this.dismissButton) return;
    this.open = false;
  };

  private handleCloseClick = () => {
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
