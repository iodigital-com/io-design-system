import { Component, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';

import { getTagDismissibleStyles } from './io-tag-dismissible-styles';
import type { IoTagColor } from './types';
import type { IoIconName } from '../../utils/icons';

/**
 * io-tag-dismissible
 * ==================
 * A display chip with a built-in dismiss (remove) button.
 *
 * Unlike io-tag (which is a toggle chip), io-tag-dismissible is a static
 * label with a dedicated dismiss action. Use it wherever a selected value
 * can be removed — e.g. applied filters, multi-select value chips, or
 * active category pills.
 *
 * Accessibility:
 * - The dismiss button carries `aria-label="Remove {label}"` so screen
 *   reader users hear an unambiguous action label.
 * - Delete and Backspace keyboard shortcuts on the host fire dismiss,
 *   matching common dismissible chip patterns.
 * - Dismiss button meets WCAG 2.5.8 minimum touch target (24×24 px).
 *
 * @example
 * <io-tag-dismissible label="React">React</io-tag-dismissible>
 * <io-tag-dismissible label="TypeScript" variant="blue">TypeScript</io-tag-dismissible>
 */
@Component({
  tag: 'io-tag-dismissible',
  shadow: { delegatesFocus: true },
})
export class IoTagDismissible {
  // ── Props ─────────────────────────────────────────────────────

  /**
   * Visible label text for the chip — also used to build the dismiss
   * button's accessible name ("Remove {label}"). Required.
   */
  @Prop() label!: string;

  /** Colour variant of the chip */
  @Prop({ reflect: true }) variant: IoTagColor = 'neutral' as IoTagColor;

  /** Optional leading icon name (from the io icon set) */
  @Prop() icon?: IoIconName;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the dismiss button is clicked or Delete/Backspace is pressed */
  @Event() dismiss!: EventEmitter<void>;

  // ── Keyboard ──────────────────────────────────────────────────

  @Listen('keydown')
  handleKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Delete' || ev.key === 'Backspace') {
      this.handleDismiss();
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleDismiss = () => {
    this.dismiss.emit();
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, variant, icon } = this;

    return (
      <Host>
        <style>{getTagDismissibleStyles()}</style>
        <span class={`tag-dismissible tag-dismissible--${variant}`}>
          <span class="tag-dismissible__label">
            {icon && (
              <io-icon name={icon} size="xs" aria-hidden="true" />
            )}
            {label}
          </span>
          <button
            type="button"
            class="tag-dismissible__dismiss"
            aria-label={`Remove ${label}`}
            onClick={this.handleDismiss}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M1 1l8 8M9 1L1 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </span>
      </Host>
    );
  }
}
