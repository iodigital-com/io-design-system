import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Element,
  Host,
  Method,
  Watch,
  Listen,
  h,
} from '@stencil/core';

import { getSheetStyles } from './io-sheet-styles';
import {
  getPanelFocusableElements,
  lockBodyScroll,
  unlockBodyScroll,
  attachDialogFocusTrap,
  detachDialogFocusTrap,
} from '../../utils/dialog-utils';
import {
  attachSwipeToDismiss,
  detachSwipeToDismiss,
  type SwipeToDismissHandlers,
} from '../../utils/swipe-to-dismiss';

/**
 * io-sheet
 * ========
 * Bottom sheet overlay that slides up from the bottom of the viewport.
 * Use for contextual actions, confirmations, and secondary content that
 * needs more prominence than a popover but less than a full-screen modal.
 *
 * Focus trap uses document.activeElement — reliable for both Shadow DOM
 * and slotted light-DOM children. shadowRoot.activeElement returns the slot
 * host element, not the focused node, and must not be used here.
 *
 * @example
 * <io-sheet heading="Share" open>
 *   <p>Choose a sharing option.</p>
 *   <io-button slot="footer" variant="ghost">Cancel</io-button>
 * </io-sheet>
 *
 * <script>
 *   const sheet = document.querySelector('io-sheet');
 *   document.getElementById('open-btn').addEventListener('click', () => { sheet.open = true; });
 *   sheet.addEventListener('dismiss', () => console.log('dismissed'));
 * </script>
 */
@Component({
  tag: 'io-sheet',
  shadow: { delegatesFocus: true },
})
export class IoSheet {
  @Element() el!: HTMLElement;

  private panelEl?: HTMLDivElement;
  private backdropEl?: HTMLDivElement;
  private handleEl?: HTMLElement;
  private headingId!: string;
  private focusTrapHandler?: (ev: KeyboardEvent) => void;
  private animationEndHandler?: (ev: AnimationEvent) => void;
  private focusTrigger?: Element;
  private savedBodyOverflow = '';
  private swipeHandlers?: SwipeToDismissHandlers;

  // ── Props ─────────────────────────────────────────────────────

  /** Controls sheet visibility */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Heading text displayed in the sheet header */
  @Prop() heading?: string;

  /** When true, a close button is rendered in the header and backdrop click / Escape key dismiss the sheet */
  @Prop() dismissible = true;

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when the sheet is dismissed (close button, backdrop click, or Escape key) */
  @Event({ eventName: 'dismiss' }) dismissEvent!: EventEmitter<void>;

  /** Emitted after the open animation/transition has completed */
  @Event({ eventName: 'motionVisibleEnd' }) motionVisibleEndEvent!: EventEmitter<void>;

  /** Emitted after the close animation/transition has completed */
  @Event({ eventName: 'motionHiddenEnd' }) motionHiddenEndEvent!: EventEmitter<void>;

  // ── Public methods ────────────────────────────────────────────

  /** Opens the sheet programmatically */
  @Method() async show() {
    this.open = true;
  }

  /** Closes the sheet programmatically */
  @Method() async close() {
    this.open = false;
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const seed = Math.random().toString(36).slice(2);
    this.headingId = `io-sheet-heading-${seed}`;

    if (!this.heading && !this.el.getAttribute('aria-label')) {
      console.error(
        '[io-sheet] Accessible name missing. Provide a "heading" prop or set aria-label on the host element.',
      );
    }
  }

  componentDidLoad() {
    this.attachAnimationEndListener();
    if (this.open) {
      this.applyOpenState();
    }
  }

  disconnectedCallback() {
    this.detachFocusTrap();
    this.detachAnimationEndListener();
    unlockBodyScroll(this.savedBodyOverflow);
  }

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('open')
  onOpenChange(newVal: boolean) {
    if (newVal) {
      this.applyOpenState();
    } else {
      this.applyClosedState();
    }
  }

  // ── Global listeners ──────────────────────────────────────────

  /**
   * Close on Escape key when sheet is open and dismissible.
   */
  @Listen('keydown', { target: 'document' })
  handleKeydown(ev: KeyboardEvent) {
    if (!this.open) return;
    if (!this.dismissible) return;
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      this.handleDismiss();
    }
  }

  // ── Private helpers ───────────────────────────────────────────

  private applyOpenState() {
    this.focusTrigger = document.activeElement as Element;
    this.savedBodyOverflow = document.body.style.overflow;
    lockBodyScroll();

    this.attachFocusTrap();

    requestAnimationFrame(() => {
      const focusable = this.getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        // No focusable children — focus the panel as fallback
        this.panelEl?.focus();
      }
    });
  }

  private applyClosedState() {
    unlockBodyScroll(this.savedBodyOverflow);
    this.savedBodyOverflow = '';
    this.detachFocusTrap();

    // Restore focus to trigger
    if (this.focusTrigger instanceof HTMLElement) {
      this.focusTrigger.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    if (!this.panelEl) return [];
    return getPanelFocusableElements(this.panelEl);
  }

  private attachFocusTrap() {
    if (!this.panelEl) return;
    // Always call detach first to prevent listener leak on re-open
    this.detachFocusTrap();

    // When a shadow-DOM child has focus, document.activeElement returns the
    // host element. Fall back to :focus query within the shadow root to get
    // the actual focused element so first/last comparisons work correctly.
    const getActiveElement = (): HTMLElement | null => {
      let active = document.activeElement as HTMLElement | null;
      if (active === this.el) {
        active =
          (this.el.shadowRoot?.querySelector(':focus') as HTMLElement | null) ?? active;
      }
      return active;
    };

    this.focusTrapHandler = attachDialogFocusTrap(
      this.panelEl,
      () => this.getFocusableElements(),
      { getActiveElement },
    );
  }

  private detachFocusTrap() {
    detachDialogFocusTrap(this.panelEl, this.focusTrapHandler);
    this.focusTrapHandler = undefined;
  }

  private attachAnimationEndListener() {
    if (!this.panelEl) return;
    this.animationEndHandler = () => {
      if (this.open) {
        this.motionVisibleEndEvent.emit();
      } else {
        this.motionHiddenEndEvent.emit();
      }
    };
    this.panelEl.addEventListener('animationend', this.animationEndHandler);
  }

  private detachAnimationEndListener() {
    if (!this.panelEl || !this.animationEndHandler) return;
    this.panelEl.removeEventListener('animationend', this.animationEndHandler);
    this.animationEndHandler = undefined;
  }

  // ── Handlers ──────────────────────────────────────────────────

  private handleDismiss = () => {
    this.open = false;
    this.dismissEvent.emit();
  };

  private handleBackdropClick = (ev: MouseEvent) => {
    if (!this.dismissible) return;
    if (ev.target === this.backdropEl) {
      this.handleDismiss();
    }
  };

  private attachSwipeHandlers() {
    if (!this.handleEl) return;
    this.swipeHandlers = attachSwipeToDismiss({
      el: this.handleEl,
      onDismiss: () => { this.handleDismiss(); },
    });
  }

  private detachSwipeHandlers() {
    if (!this.handleEl || !this.swipeHandlers) return;
    detachSwipeToDismiss(this.handleEl, this.swipeHandlers);
    this.swipeHandlers = undefined;
  }

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot - Default slot. Body content of the sheet panel.
   * @slot header - Replaces the built-in heading area.
   * @slot footer - Action area at the bottom of the sheet. Typically 1–2 io-button elements.
   */
  render() {
    const { heading, headingId, dismissible } = this;

    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    return (
      <Host
        role="dialog"
        aria-modal="true"
        {...(heading ? { 'aria-labelledby': headingId } : {})}
      >
        <style>{getSheetStyles()}</style>

        {/* Backdrop */}
        <div
          class="sheet__backdrop"
          ref={(el?: HTMLDivElement) => { this.backdropEl = el; }}
          onClick={this.handleBackdropClick}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          class="sheet__panel"
          tabIndex={-1}
          ref={(el?: HTMLDivElement) => { this.panelEl = el; }}
        >
          <div
            class="sheet__handle"
            ref={(el?: HTMLDivElement) => { this.handleEl = el; }}
            aria-hidden="true"
          />

          <div class="sheet__header">
            <div class="sheet__header-slot">
              <slot name="header">
                {heading && (
                  <h2 id={headingId} class="sheet__heading">
                    {heading}
                  </h2>
                )}
              </slot>
            </div>
            {dismissible && (
              <button
                type="button"
                class="sheet__close"
                aria-label="Close"
                onClick={this.handleDismiss}
                innerHTML={closeIcon}
              />
            )}
          </div>

          <div class="sheet__body">
            <slot />
          </div>

          <div class="sheet__footer">
            <slot name="footer" />
          </div>
        </div>
      </Host>
    );
  }
}
