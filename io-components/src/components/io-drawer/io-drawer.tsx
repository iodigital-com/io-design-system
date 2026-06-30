import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, h } from '@stencil/core';

import { getDrawerStyles } from './io-drawer-styles';
import { createDrawerHeadingId, getDrawerClass, getDrawerCloseIcon } from './io-drawer-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import { isBackdropClick, lockBodyScroll, unlockBodyScroll } from '../../utils/dialog';

import type { IoDrawerBackground, IoDrawerPlacement, IoDrawerSize } from './types';

const SWIPE_CLOSE_THRESHOLD = 80;

/**
 * io-drawer
 * =========
 * Accessible slide-out drawer overlay built on the native <dialog> element.
 * The browser handles focus trapping, ESC key, and role="dialog".
 *
 * When placement="bottom" the drawer renders as a mobile-optimised bottom
 * sheet with a drag handle affordance. Swiping the handle downward by more
 * than 80 px dismisses the drawer.
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
  private transitionEndHandler?: (ev: TransitionEvent) => void;
  private inertedElements: Element[] = [];

  // ── Touch / swipe state ────────────────────────────────────────
  private touchStartY = 0;
  private boundHandleTouchStart?: (ev: TouchEvent) => void;
  private boundHandleTouchMove?: (ev: TouchEvent) => void;
  private boundHandleTouchEnd?: (ev: TouchEvent) => void;

  // ── User-initiated close flag ─────────────────────────────────
  // Set to true before any user-action handler sets open=false so
  // onOpenChange can distinguish user-initiated closes from programmatic ones.
  private _userInitiatedClose = false;

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

  /**
   * When false, the built-in close button is not rendered and ESC-key
   * dismissal is suppressed. Use this for drawers where only an explicit
   * in-content action should close the panel (e.g. a wizard step).
   */
  @Prop() dismissButton = true;

  /**
   * Custom ARIA attributes to inject onto the native `<dialog>` element.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * // Sets aria-controls="main-content" on the native <dialog>
   * <io-drawer .aria={{ controls: 'main-content' }}>...</io-drawer>
   */
  @Prop() aria?: Record<string, string>;

  /**
   * Background surface level for the drawer panel.
   * - canvas:   var(--io-bg-page) — default page background
   * - surface:  var(--io-bg-surface) — slightly elevated surface
   * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
   */
  @Prop({ reflect: true }) background: IoDrawerBackground = 'canvas';

  // ── Events ────────────────────────────────────────────────────

  /** Emitted after the drawer is closed by a user action (close button, backdrop click, ESC key, or swipe-to-dismiss on bottom-sheet placement). NOT emitted on programmatic close via the `open` prop or `close()` method. */
  @Event({ eventName: 'dismiss' }) dismissEvent!: EventEmitter<void>;

  /** Emitted after the open animation/transition has completed (transitionend on the drawer panel) */
  @Event({ eventName: 'motionVisibleEnd' }) motionVisibleEndEvent!: EventEmitter<void>;

  /** Emitted after the close animation/transition has completed (transitionend on the drawer panel) */
  @Event({ eventName: 'motionHiddenEnd' }) motionHiddenEndEvent!: EventEmitter<void>;

  // ── Methods ───────────────────────────────────────────────────

  /**
   * Programmatically show (open) the drawer. No-op if already open.
   *
   * Named `show()` to mirror the native <dialog> API and avoid a
   * TypeScript duplicate-identifier conflict with the `open` boolean prop.
   *
   * For bottom-sheet placement, attaches swipe-to-dismiss touch listeners.
   *
   * @example
   *   const drawer = document.querySelector('io-drawer');
   *   drawer.show();
   */
  @Method()
  async show(): Promise<void> {
    if (this.open) return;
    this.open = true;
    if (this.placement === 'bottom') {
      this.attachSwipeListeners();
    }
  }

  /**
   * Programmatically close the drawer. No-op if already closed.
   * Does NOT emit the `dismiss` event (programmatic close).
   *
   * For bottom-sheet placement, removes swipe-to-dismiss touch listeners.
   *
   * @example
   *   const drawer = document.querySelector('io-drawer');
   *   drawer.close();
   */
  @Method()
  async close(): Promise<void> {
    if (!this.open) return;
    this.open = false;
    this.removeSwipeListeners();
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.headingId = createDrawerHeadingId(Math.random().toString(36).slice(2));

    const hasHeading = Boolean(this.heading);
    // Check the `aria` prop (not the host element attribute) because io-drawer
    // uses Shadow DOM — host aria-* attributes are NOT forwarded to the internal
    // <dialog>. The `aria` prop is the only way to supply aria-label to the dialog.
    const hasAriaLabel = Boolean(this.aria?.['label'] ?? this.aria?.['aria-label']);
    if (!hasHeading && !hasAriaLabel) {
      console.error(
        '[io-drawer] Missing accessible label: supply a `heading` prop or an `aria-label` attribute on the element.',
      );
    }
  }

  componentDidLoad() {
    this.attachTransitionEndListener();
    if (this.open && this.dialogEl) {
      this.dialogEl.showModal();
      this.applyInert();
    }
  }

  disconnectedCallback() {
    this.detachTransitionEndListener();
    this.removeInert();
  }

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('aria')
  onAriaChange() {
    applyAriaProp(this.aria, this.dialogEl ?? null);
  }

  @Watch('open')
  onOpenChange(newVal: boolean) {
    const dialog = this.el?.shadowRoot?.querySelector<HTMLDialogElement>('dialog');
    if (!dialog) return;
    if (newVal) {
      if (!dialog.open) {
        // Restart the slide-in CSS animation on every open so subsequent opens
        // animate correctly (not just the first one after mount).
        dialog.getAnimations?.().forEach((a) => a.cancel());
        void (dialog as HTMLElement).offsetWidth; // force reflow
        dialog.showModal();
      }
      this.applyInert();
    } else {
      if (dialog.open) {
        dialog.close();
      }
      this.removeInert();
      // Only emit dismiss for user-initiated closes (close button, backdrop, ESC).
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

  private applyInert() {
    this.inertedElements = Array.from(this.el.parentElement?.children ?? []).filter(
      (el) => el !== this.el && !['SCRIPT', 'STYLE'].includes(el.tagName),
    );
    this.inertedElements.forEach((el) => {
      if (!el.hasAttribute('inert')) el.setAttribute('inert', '');
    });
  }

  private removeInert() {
    this.inertedElements.forEach((el) => el.removeAttribute('inert'));
    this.inertedElements = [];
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleDialogClick = (ev: MouseEvent) => {
    if (!this.closeOnBackdrop) return;
    const dialog = ev.currentTarget as HTMLDialogElement;
    const rect = dialog.getBoundingClientRect();
    const clickedBackdrop = isBackdropClick(rect, ev.clientX, ev.clientY);
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

  // ── Swipe-to-dismiss (bottom sheet only) ──────────────────────

  private attachSwipeListeners(): void {
    const handle = this.el?.shadowRoot?.querySelector<HTMLElement>('.drawer__handle');
    if (!handle) return;

    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    this.boundHandleTouchEnd = this.handleTouchEnd.bind(this);

    handle.addEventListener('touchstart', this.boundHandleTouchStart, { passive: true });
    handle.addEventListener('touchmove', this.boundHandleTouchMove, { passive: true });
    handle.addEventListener('touchend', this.boundHandleTouchEnd, { passive: true });
  }

  private removeSwipeListeners(): void {
    const handle = this.el?.shadowRoot?.querySelector<HTMLElement>('.drawer__handle');
    if (!handle) return;

    if (this.boundHandleTouchStart) {
      handle.removeEventListener('touchstart', this.boundHandleTouchStart);
    }
    if (this.boundHandleTouchMove) {
      handle.removeEventListener('touchmove', this.boundHandleTouchMove);
    }
    if (this.boundHandleTouchEnd) {
      handle.removeEventListener('touchend', this.boundHandleTouchEnd);
    }

    this.boundHandleTouchStart = undefined;
    this.boundHandleTouchMove = undefined;
    this.boundHandleTouchEnd = undefined;
  }

  private handleTouchStart(ev: TouchEvent): void {
    this.touchStartY = ev.touches[0]?.clientY ?? 0;
  }

  private handleTouchMove(_ev: TouchEvent): void {
    // No-op: reserved for future visual drag feedback
  }

  private handleTouchEnd(ev: TouchEvent): void {
    const endY = ev.changedTouches[0]?.clientY ?? 0;
    const deltaY = endY - this.touchStartY;
    if (deltaY >= SWIPE_CLOSE_THRESHOLD) {
      this._userInitiatedClose = true;
      this.open = false;
      this.removeSwipeListeners();
    }
  }

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot - Default slot. Body content of the drawer panel.
   * @slot footer - Action area rendered at the bottom of the drawer. Typically 1–2 io-button elements.
   */
  render() {
    const { placement, size, background, heading, headingId } = this;
    const closeIcon = getDrawerCloseIcon();
    const isBottomSheet = placement === 'bottom';
    const drawerClass = isBottomSheet
      ? `${getDrawerClass(placement, size)} drawer--sheet drawer--bg-${background}`
      : `${getDrawerClass(placement, size)} drawer--bg-${background}`;

    return (
      <Host>
        <style>{getDrawerStyles()}</style>
        <dialog
          ref={(el?: HTMLDialogElement) => {
            this.dialogEl = el;
            applyAriaProp(this.aria, el ?? null);
          }}
          class={drawerClass}
          aria-labelledby={heading ? headingId : undefined}
          onClick={this.handleDialogClick}
          onCancel={this.handleCancel}
        >
          {isBottomSheet && <div class="drawer__handle" aria-hidden="true" />}
          <div class="drawer__header">
            {heading && (
              <h2 id={headingId} class="drawer__heading">
                {heading}
              </h2>
            )}
            {this.dismissButton && (
              <button
                type="button"
                class="drawer__close"
                aria-label={this.closeLabel}
                onClick={this.handleCloseClick}
                innerHTML={closeIcon}
              />
            )}
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
