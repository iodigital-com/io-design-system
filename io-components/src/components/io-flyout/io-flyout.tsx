import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Method,
  Element,
  Host,
  Watch,
  Listen,
  h,
} from '@stencil/core';

import { getFlyoutStyles } from './io-flyout-styles';
import type { IoFlyoutPosition } from './types';

/**
 * io-flyout
 * =========
 * Side-anchored flyout panel for navigation menus and complex UI panels.
 * Fills the gap between io-popover (small) and io-drawer (full-height).
 *
 * Focus trap uses document.activeElement — works for both Shadow DOM and
 * slotted light-DOM children.
 *
 * @example
 * <io-flyout heading="Navigation" position="right">
 *   <p>Flyout body content here.</p>
 *   <io-button slot="footer" variant="ghost">Close</io-button>
 * </io-flyout>
 *
 * <script>
 *   const flyout = document.querySelector('io-flyout');
 *   document.getElementById('open-btn').addEventListener('click', () => { flyout.show(); });
 *   flyout.addEventListener('dismiss', () => console.log('dismissed'));
 * </script>
 */
@Component({
  tag: 'io-flyout',
  shadow: { delegatesFocus: true },
})
export class IoFlyout {
  @Element() el!: HTMLElement;

  private panelEl?: HTMLDivElement;
  private backdropEl?: HTMLDivElement;
  private headingId!: string;
  private focusTrapHandler?: (ev: KeyboardEvent) => void;
  private focusTrigger?: Element;

  // ── Props ─────────────────────────────────────────────────────

  /** Controls flyout visibility */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Heading text displayed in the flyout header */
  @Prop() heading?: string;

  /** Which side the flyout panel is anchored to */
  @Prop({ reflect: true }) position: IoFlyoutPosition = 'right';

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when the flyout is dismissed (close button, backdrop click, or Escape key) */
  @Event({ eventName: 'dismiss' }) dismissEvent!: EventEmitter<void>;

  // ── Methods ───────────────────────────────────────────────────

  /**
   * Programmatically open the flyout. No-op if already open.
   *
   * @example
   *   const flyout = document.querySelector('io-flyout');
   *   flyout.show();
   */
  @Method()
  async show(): Promise<void> {
    if (this.open) return;
    this.open = true;
  }

  /**
   * Programmatically close the flyout. No-op if already closed.
   * Does NOT emit the dismiss event (programmatic close).
   *
   * @example
   *   const flyout = document.querySelector('io-flyout');
   *   flyout.close();
   */
  @Method()
  async close(): Promise<void> {
    if (!this.open) return;
    this.open = false;
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const seed = Math.random().toString(36).slice(2);
    this.headingId = `io-flyout-heading-${seed}`;
  }

  componentDidLoad() {
    if (this.open) {
      this.applyOpenState();
    }
  }

  disconnectedCallback() {
    this.detachFocusTrap();
    document.body.style.overflow = '';
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
   * Close on Escape key when flyout is open.
   */
  @Listen('keydown', { target: 'document' })
  handleKeydown(ev: KeyboardEvent) {
    if (!this.open) return;
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      this.handleDismiss();
    }
  }

  // ── Private helpers ───────────────────────────────────────────

  private applyOpenState() {
    this.focusTrigger = document.activeElement as Element;
    document.body.style.overflow = 'hidden';

    if (this.panelEl) {
      this.panelEl.removeAttribute('aria-hidden');
    }

    this.attachFocusTrap();

    requestAnimationFrame(() => {
      const shadow = this.el?.shadowRoot;
      if (!shadow) return;
      const focusable = this.getFocusableElements();
      focusable[0]?.focus();
    });
  }

  private applyClosedState() {
    document.body.style.overflow = '';
    this.detachFocusTrap();

    if (this.panelEl) {
      this.panelEl.setAttribute('aria-hidden', 'true');
    }

    // Restore focus to trigger
    if (this.focusTrigger instanceof HTMLElement) {
      this.focusTrigger.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    if (!this.panelEl) return [];
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(this.panelEl.querySelectorAll<HTMLElement>(selector));
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
      // Use document.activeElement — works for both Shadow DOM and slotted
      // light-DOM children (shadowRoot.activeElement returns the slot host)
      const active = document.activeElement as HTMLElement | null;

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

  // ── Handlers ──────────────────────────────────────────────────

  private handleDismiss = () => {
    this.open = false;
    this.dismissEvent.emit();
  };

  private handleBackdropClick = (ev: MouseEvent) => {
    if (ev.target === this.backdropEl) {
      this.handleDismiss();
    }
  };

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot - Default slot. Body content of the flyout panel.
   * @slot header - Replaces the built-in heading area.
   * @slot footer - Action area at the bottom of the flyout. Typically 1–2 io-button elements.
   */
  render() {
    const { open, position, heading, headingId } = this;
    const panelClass = [
      'flyout__panel',
      `flyout__panel--${position}`,
      open ? 'flyout__panel--open' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const ariaHidden = open ? undefined : 'true';

    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    return (
      <Host>
        <style>{getFlyoutStyles()}</style>

        {/* Backdrop — only rendered when open */}
        {open && (
          <div
            class="flyout__backdrop"
            ref={(el?: HTMLDivElement) => { this.backdropEl = el; }}
            onClick={this.handleBackdropClick}
            aria-hidden="true"
          />
        )}

        {/* Panel */}
        <div
          class={panelClass}
          role="dialog"
          aria-modal="true"
          aria-labelledby={heading ? headingId : undefined}
          aria-hidden={ariaHidden}
          ref={(el?: HTMLDivElement) => { this.panelEl = el; }}
        >
          <div class="flyout__header">
            <div class="flyout__header-slot">
              <slot name="header">
                {heading && (
                  <h2 id={headingId} class="flyout__heading">
                    {heading}
                  </h2>
                )}
              </slot>
            </div>
            <button
              type="button"
              class="flyout__close"
              aria-label="Close"
              onClick={this.handleDismiss}
              innerHTML={closeIcon}
            />
          </div>

          <div class="flyout__body">
            <slot />
          </div>

          <div class="flyout__footer">
            <slot name="footer" />
          </div>
        </div>
      </Host>
    );
  }
}
