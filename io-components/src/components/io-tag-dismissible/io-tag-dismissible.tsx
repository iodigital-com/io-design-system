import { Component, Element, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';

import { getTagDismissibleStyles } from './io-tag-dismissible-styles';
import type { IoIconName } from '../../utils/icons';
import type { IoTagDismissibleVariant } from './types';

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
 * Modes:
 * 1. Simple text chip: `<io-tag-dismissible label="React" />`
 * 2. Rich content chip: `<io-tag-dismissible>Region: <strong>EU</strong></io-tag-dismissible>`
 *    — label is optional when slot content is provided.
 *
 * Accessibility:
 * - The dismiss button carries `aria-label="Remove {label}"` so screen
 *   reader users hear an unambiguous action label.
 * - When `label` is omitted, the dismiss button's aria-label falls back to
 *   the slot's text content, then to "Remove" as a last resort.
 * - Delete and Backspace keyboard shortcuts on the host fire dismiss,
 *   matching common dismissible chip patterns.
 * - Dismiss button meets WCAG 2.5.8 minimum touch target (var(--io-touch-target-min)).
 *
 * @example
 * <io-tag-dismissible label="React"></io-tag-dismissible>
 * <io-tag-dismissible label="TypeScript" variant="blue"></io-tag-dismissible>
 * <io-tag-dismissible>Region: <strong>EU</strong></io-tag-dismissible>
 */
@Component({
  tag: 'io-tag-dismissible',
  shadow: { delegatesFocus: true },
})
export class IoTagDismissible {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /**
   * Visible label text for the chip — also used to build the dismiss
   * button's accessible name ("Remove {label}").
   * Optional: when omitted, the default slot is rendered as chip content
   * and the dismiss button's aria-label is derived from slot text content.
   */
  @Prop() label?: string;

  /** Colour variant of the chip */
  @Prop({ reflect: true }) variant: IoTagDismissibleVariant = 'default';

  /** Optional leading icon name (from the io icon set) */
  @Prop() icon?: IoIconName;

  /** When true, disables the dismiss button and prevents dismiss events */
  @Prop({ reflect: true }) disabled = false;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the dismiss button is clicked or Delete/Backspace is pressed */
  @Event() dismiss!: EventEmitter<void>;

  // ── Keyboard ──────────────────────────────────────────────────

  @Listen('keydown')
  handleKeydown(ev: KeyboardEvent) {
    if (this.disabled) return;
    if (ev.key === 'Delete' || ev.key === 'Backspace') {
      this.handleDismiss();
    }
  }

  // ── Helpers ──────────────────────────────────────────────────

  /**
   * Derives the dismiss button's accessible name.
   * Priority: label prop → slot text content → 'Remove'
   */
  private getDismissLabel(): string {
    if (this.label) return `Remove ${this.label}`;
    // Fallback: use the host's visible text content from slotted nodes
    const slotText = this.el?.textContent?.trim();
    if (slotText) return `Remove ${slotText}`;
    return 'Remove';
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleDismiss = () => {
    if (this.disabled) return;
    this.dismiss.emit();
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, variant, icon, disabled } = this;

    return (
      <Host>
        <style>{getTagDismissibleStyles()}</style>
        <span class={`tag-dismissible tag-dismissible--${variant}${disabled ? ' tag-dismissible--disabled' : ''}`}>
          <span class="tag-dismissible__label">
            {icon && (
              <io-icon name={icon} size="xs" aria-hidden="true" />
            )}
            {label !== undefined ? label : <slot />}
          </span>
          <button
            type="button"
            class="tag-dismissible__dismiss"
            aria-label={this.getDismissLabel()}
            aria-disabled={disabled ? 'true' : undefined}
            disabled={disabled}
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
