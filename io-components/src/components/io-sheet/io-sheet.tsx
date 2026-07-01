import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Element,
  Host,
  Listen,
  Method,
  Watch,
  h,
} from '@stencil/core';

import { getSheetStyles } from './io-sheet-styles';
import { acquireScrollLock, releaseScrollLock } from '../../utils/scroll-lock';
import type { IoSheetBackground } from './types';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Returns all focusable elements inside the sheet panel, including both
 * shadow DOM elements and slotted light DOM elements.
 */
function getSheetFocusableElements(panelEl: HTMLElement): HTMLElement[] {
  const shadowFocusable = Array.from(panelEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

  const slots = Array.from(panelEl.querySelectorAll('slot')) as HTMLSlotElement[];
  const slottedFocusable = slots.flatMap(slot =>
    Array.from(slot.assignedElements({ flatten: true })).flatMap(el => {
      const matches: HTMLElement[] = [];
      if ((el as HTMLElement).matches(FOCUSABLE_SELECTORS)) matches.push(el as HTMLElement);
      matches.push(...Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)));
      return matches;
    }),
  );

  return [...shadowFocusable, ...slottedFocusable];
}

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
  private headingId!: string;
  private focusTrapHandler?: (ev: KeyboardEvent) => void;
  private animationEndHandler?: (ev: AnimationEvent) => void;
  private focusTrigger?: Element;
  private _scrollLockHeld = false;

  // ── Props ─────────────────────────────────────────────────────

  /** Controls sheet visibility */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Heading text displayed in the sheet header */
  @Prop() heading?: string;

  /**
   * @deprecated Use `dismissButton` and `disableBackdropClick` instead.
   * When true, a close button is rendered in the header and backdrop click / Escape key dismiss the sheet.
   * This prop is kept for one minor version for backwards compatibility.
   */
  @Prop() dismissible = true;

  /**
   * When true (default), the close (×) button is rendered in the sheet header
   * and pressing ESC will close the sheet. Set to false to hide the close button
   * and suppress ESC dismissal — useful for confirmation flows where the user must
   * explicitly choose an action.
   *
   * @default true
   */
  @Prop() dismissButton = true;

  /**
   * When true, clicking the backdrop will NOT dismiss the sheet. The close button
   * and ESC key are still controlled by `dismissButton`.
   * Useful for confirmation flows that must not be accidentally dismissed.
   *
   * @default false
   */
  @Prop() disableBackdropClick = false;

  /**
   * Background surface level for the sheet panel.
   * Matches sibling overlay APIs (io-modal, io-drawer, io-flyout).
   * - canvas:   var(--io-bg-page) — default page background
   * - surface:  var(--io-bg-surface) — slightly elevated surface
   * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
   *
   * @default 'canvas'
   */
  @Prop({ reflect: true }) background: IoSheetBackground = 'canvas';

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

    // Deprecation warning for legacy dismissible prop when it was explicitly set to false.
    // (default true is safe — new dismissButton=true matches the old behaviour)
    if (!this.dismissible) {
      console.warn(
        '[io-sheet] The "dismissible" prop is deprecated. Use "dismissButton" and "disableBackdropClick" instead.',
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
    if (this._scrollLockHeld) {
      releaseScrollLock();
      this._scrollLockHeld = false;
    }
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
   * Close on Escape key when sheet is open and dismiss is enabled.
   * Respects both legacy `dismissible` prop and new `dismissButton` prop.
   */
  @Listen('keydown', { target: 'document' })
  handleKeydown(ev: KeyboardEvent) {
    if (!this.open) return;
    // Support both legacy dismissible and new dismissButton prop.
    // dismissButton takes precedence; fall back to dismissible for BC.
    const canDismiss = this.dismissButton && this.dismissible;
    if (!canDismiss) return;
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      this.handleDismiss();
    }
  }


  // ── Private helpers ───────────────────────────────────────────

  private applyOpenState() {
    this.focusTrigger = document.activeElement as Element;
    if (!this._scrollLockHeld) {
      acquireScrollLock();
      this._scrollLockHeld = true;
    }

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
    if (this._scrollLockHeld) {
      releaseScrollLock();
      this._scrollLockHeld = false;
    }
    this.detachFocusTrap();

    // Restore focus to trigger
    if (this.focusTrigger instanceof HTMLElement) {
      this.focusTrigger.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    if (!this.panelEl) return [];
    return getSheetFocusableElements(this.panelEl);
  }

  private attachFocusTrap() {
    if (!this.panelEl) return;
    // Always call detach first to prevent listener leak on re-open
    this.detachFocusTrap();

    this.focusTrapHandler = (ev: KeyboardEvent) => {
      if (ev.key !== 'Tab') return;
      const focusable = this.getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      // When a shadow-DOM child has focus, document.activeElement returns the
      // host element. Fall back to :focus query within the shadow root to get
      // the actual focused element so first/last comparisons work correctly.
      let active = document.activeElement as HTMLElement | null;
      if (active === this.el) {
        active = (this.el.shadowRoot?.querySelector(':focus') as HTMLElement | null) ?? active;
      }

      if (ev.shiftKey && active === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && active === last) {
        ev.preventDefault();
        first.focus();
      }
    };

    this.panelEl.addEventListener('keydown', this.focusTrapHandler);
  }

  private detachFocusTrap() {
    if (!this.panelEl || !this.focusTrapHandler) return;
    this.panelEl.removeEventListener('keydown', this.focusTrapHandler);
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
    // New prop: disableBackdropClick takes priority.
    // Legacy: dismissible=false also disables backdrop click.
    if (this.disableBackdropClick || !this.dismissible) return;
    if (ev.target === this.backdropEl) {
      this.handleDismiss();
    }
  };

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot - Default slot. Body content of the sheet panel.
   * @slot header - Replaces the built-in heading area.
   * @slot footer - Action area at the bottom of the sheet. Typically 1–2 io-button elements.
   */
  render() {
    const { heading, headingId, background } = this;
    // Resolve effective dismiss-button visibility:
    // Legacy dismissible=false overrides dismissButton for backwards compat.
    const showDismissButton = this.dismissButton && this.dismissible;

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
          class={`sheet__panel sheet__panel--bg-${background}`}
          tabIndex={-1}
          ref={(el?: HTMLDivElement) => { this.panelEl = el; }}
        >
          <div class="sheet__handle" aria-hidden="true" />

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
            {showDismissButton && (
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
