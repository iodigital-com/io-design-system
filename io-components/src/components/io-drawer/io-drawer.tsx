import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, h } from '@stencil/core';

import { getDrawerStyles } from './io-drawer-styles';
import { createDrawerHeadingId, getDrawerClass, getDrawerCloseIcon, isBackdropClick } from './io-drawer-utils';
import { applyAriaProp } from '../../utils/aria-prop';

import type { IoDrawerPlacement, IoDrawerSize } from './types';

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

  // ── Touch / swipe state ────────────────────────────────────────
  private touchStartY = 0;
  private boundHandleTouchStart?: (ev: TouchEvent) => void;
  private boundHandleTouchMove?: (ev: TouchEvent) => void;
  private boundHandleTouchEnd?: (ev: TouchEvent) => void;

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
   * Custom ARIA attributes to inject onto the native `<dialog>` element.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * // Sets aria-controls="main-content" on the native <dialog>
   * <io-drawer .aria={{ controls: 'main-content' }}>...</io-drawer>
   */
  @Prop() aria?: Record<string, string>;

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
   * Emits the `dismiss` event.
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
  }

  componentDidLoad() {
    if (this.open && this.dialogEl) {
      this.dialogEl.showModal();
    }
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
      this.open = false;
      this.removeSwipeListeners();
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { placement, size, heading, headingId } = this;
    const closeIcon = getDrawerCloseIcon();
    const isBottomSheet = placement === 'bottom';
    const drawerClass = isBottomSheet
      ? `${getDrawerClass(placement, size)} drawer--sheet`
      : getDrawerClass(placement, size);

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
