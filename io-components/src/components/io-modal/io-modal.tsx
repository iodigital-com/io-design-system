import { Component, Prop, Event, EventEmitter, Method, Element, Host, State, Watch, h } from '@stencil/core';

import { getModalStyles } from './io-modal-styles';
import { createModalHeadingId, getModalCloseIcon, isBackdropClick } from './io-modal-utils';
import { applyAriaProp } from '../../utils/aria-prop';

import type { IoModalAriaProps, IoModalBackdrop, IoModalBackground, IoModalSize } from './types';

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
  // Set to true before any user-action handler sets open=false so openChanged
  // can distinguish user-initiated closes from programmatic ones (#1011).
  private _userInitiatedClose = false;

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
   * Restricted to attributes that are meaningful on a dialog: `aria-label`,
   * `aria-labelledby`, and `aria-describedby`. Unknown keys are ignored with
   * a `console.warn` in development.
   *
   * @example
   * // Sets aria-label on the native <dialog> when no heading prop is used
   * <io-modal .aria={{ 'aria-label': 'Confirm deletion' }}>...</io-modal>
   */
  @Prop() aria?: IoModalAriaProps;

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
   * When `true`, the modal expands to fill the full viewport at or below
   * `--io-modal-fullscreen-breakpoint` (default 640px). At larger viewports
   * the modal remains centered and respects the `size` prop.
   *
   * @default false
   */
  @Prop({ reflect: true }) fullscreen = false;

  /**
   * @default 'blur' (kept for API compat)
   */
  @Prop({ reflect: true }) backdrop: IoModalBackdrop = 'blur';

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

  /** Emitted when the modal is dismissed by a user action (close button, backdrop click, or ESC key). NOT emitted on programmatic close via the `open` prop or `close()` method. */
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
   * Does NOT emit the `dismiss` event (programmatic close is silent).
   * Equivalent to setting `open = false`.
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
          // Porsche pattern: inert briefly prevents the browser's auto-focus from
          // conflicting with the CSS open animation, then focus the dialog directly.
          // (#984: no setTimeout — deterministic focus on dialog element itself)
          this.dialogEl.inert = true;
          this.dialogEl.showModal();
          this.dialogEl.inert = false;
        }
        this.dialogEl.focus();           // Safari: explicit focus prevents transition bug
        this.dialogEl.scrollTop = 0;     // reset scroll position on each open
      }

      document.body.style.overflow = 'hidden';

      // Apply inert to background elements to prevent screen reader navigation.
      // (#992: preventTopLayer=false relies on native showModal() top-layer inertness;
      //  preventTopLayer=true walks document.body.children with escape-hatch support)
      this.applyBackgroundInert();

      // Set up focus trap for keyboard navigation
      this.setupFocusTrap();
    } else {
      // Only emit dismiss for user-initiated closes (close button, backdrop, ESC).
      // Programmatic close via open=false or close() is intentionally silent. (#1011)
      if (this._userInitiatedClose) {
        this.dismissEvent.emit();
      }
      this._userInitiatedClose = false;

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
   * Apply inert attribute to background elements when modal opens.
   *
   * When `preventTopLayer=false` the modal uses `showModal()` which promotes the
   * dialog to the browser's top layer — the browser itself makes everything behind
   * the dialog unreachable, so no manual inert walk is needed (#992).
   *
   * When `preventTopLayer=true` (default) we walk `document.body.children`
   * (not just the modal's parent siblings, which misses outer `<header>` etc.) and
   * skip elements that have `data-io-allow-during-modal="true"` — this escape hatch
   * lets io-toast and similar live-region elements remain interactive (#992).
   *
   * We also skip any element that is an ancestor of io-modal. Applying inert to
   * an ancestor propagates inertness to all its descendants, which would make
   * io-modal itself and its slotted footer buttons inert in framework apps where
   * io-modal is nested inside a React/Vue/Angular root div (#1180).
   */
  private applyBackgroundInert() {
    // Native showModal() inertness handles everything — no manual walk needed.
    if (!this.preventTopLayer) return;

    if (typeof document === 'undefined') return;

    Array.from(document.body.children).forEach((child) => {
      if (child === this.el) return;
      const el = child as HTMLElement;
      // Honour escape hatch: toasts and other live-region elements can opt-out.
      if (el.hasAttribute('data-io-allow-during-modal')) return;
      // Skip ancestors of io-modal — inert propagates to all descendants, so
      // making an ancestor inert would also block footer button clicks inside the modal.
      if (el.contains(this.el)) return;
      if (!el.hasAttribute('inert')) {
        el.setAttribute('inert', '');
        this.inertElements.push(el);
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
   *
   * The selector covers all standard interactive content including elements missed
   * by the previous implementation (#1083): contenteditable, audio/video[controls],
   * iframe, and summary elements.
   *
   * No `setTimeout` is used — the dialog itself is already focused via
   * `dialogEl.focus()` before this method is called, so initial focus is already
   * deterministic without a timer race (#984).
   *
   * Uses `document.activeElement` (not `shadowRoot.activeElement`) — per the
   * never-do-list, `shadowRoot.activeElement` returns the slot host, not the
   * slotted node.
   */
  private setupFocusTrap() {
    if (!this.dialogEl) return;

    // Always call clearFocusTrap first to prevent listener leak on re-open.
    this.clearFocusTrap();

    // Extended selector that covers all interactive content categories (#1083).
    const focusableSelector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]:not([contenteditable="false"])',
      'audio[controls]',
      'video[controls]',
      'iframe',
      'summary',
    ].join(', ');

    const focusableElements = Array.from(
      this.dialogEl.querySelectorAll<HTMLElement>(focusableSelector)
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement === lastElement) {
      // Only one focusable element — no wrap-around needed.
      return;
    }

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key !== 'Tab') return;

      // Use document.activeElement — works for both Shadow DOM and slotted
      // light-DOM children (shadowRoot.activeElement returns the slot host)
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
        this._userInitiatedClose = true;
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
        this._userInitiatedClose = true;
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
  // Coordinate-based check (isBackdropClick) is used as a secondary gate to
  // handle edge cases where ev.target may differ (e.g. synthetic events in tests).
  private handleDialogClick = (ev: MouseEvent) => {
    if (!this.closeOnBackdrop) return;
    const dialog = ev.currentTarget as HTMLDialogElement;
    const targetIsDialog = ev.target === dialog;
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop = targetIsDialog || isBackdropClick(rect, ev.clientX, ev.clientY);
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
    const { size, background, backdrop, fullscreen, heading, headingId, description } = this;
    const closeIcon = getModalCloseIcon();
    const descriptionId = description ? `${headingId}-description` : undefined;

    const dialog = (
      <dialog
        ref={(el?: HTMLDialogElement) => {
          this.dialogEl = el;
          applyAriaProp(this.aria, el ?? null);
        }}
        class={`modal--${size} modal--bg-${background}${fullscreen ? ' modal--fullscreen' : ''}`}
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
            class={`modal__backdrop modal__backdrop--${backdrop}`}
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
