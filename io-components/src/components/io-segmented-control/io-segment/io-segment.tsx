import { Component, Prop, Event, EventEmitter, Method, Element, Host, State, h } from '@stencil/core';

import { getSegmentStyles } from './io-segment-styles';

import type { IoIconName } from '../../../utils/icons';

/**
 * io-segment
 * ===========
 * A single option within an io-segmented-control bar.
 * Renders as a button with role="radio" on the inner button — selected state
 * and tabIndex are managed by the parent io-segmented-control.
 *
 * The Host element is purely structural (no ARIA role). All radio semantics
 * live on the inner button so screen readers announce a single element and
 * avoid double-announcement (Host role + button role). The parent fieldset
 * carries role="radiogroup" to wire the group semantics.
 *
 * #1084 — previously `role="radio" aria-checked` were on the Host while the
 * inner button was also focusable. That caused NVDA/VoiceOver to announce
 * "radio button, button" twice per item. Moving role+aria-checked onto the
 * button and making the Host presentational fixes the double-announcement.
 *
 * Do not use standalone — always nest inside io-segmented-control.
 *
 * @example
 * <io-segment value="list" label="List" />
 * <io-segment value="grid" label="Grid" icon="grid" />
 */
@Component({
  tag: 'io-segment',
  shadow: { delegatesFocus: true },
})
export class IoSegment {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Value submitted when this segment is selected */
  @Prop() value!: string;

  /** Accessible label text for this segment */
  @Prop() label!: string;

  /** Disables this segment (also set by parent on group disable) */
  @Prop({ mutable: true, reflect: true }) disabled = false;

  /** Optional icon name to display alongside the label */
  @Prop() icon: IoIconName | undefined;

  // ── State ─────────────────────────────────────────────────────

  /** Whether this segment is the currently selected option — set by parent */
  @State() selected = false;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    // Stamp initial disabled state onto the host element so the parent can
    // read it after syncChildren() has overwritten the @Prop.
    (this.el as HTMLElement & { ownDisabled?: boolean }).ownDisabled = this.disabled;
  }

  // ── Events ────────────────────────────────────────────────────

  /** Fires when this segment is activated by click or keyboard */
  @Event({ bubbles: true, composed: true }) segmentSelect!: EventEmitter<{ value: string }>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the segment button */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const btn = this.el.shadowRoot?.querySelector<HTMLButtonElement>('button');
    btn?.focus(options);
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = () => {
    if (this.disabled) return;
    this.segmentSelect.emit({ value: this.value });
  };

  private handleKeydown = (ev: KeyboardEvent) => {
    if (this.disabled) return;
    // Enter or Space activates the segment
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.segmentSelect.emit({ value: this.value });
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, disabled, icon, selected } = this;

    const btnClass = [
      'segment',
      selected ? 'segment--selected' : '',
      disabled ? 'segment--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      // Host carries no ARIA role — all semantics live on the inner button
      // to prevent double-announcement by screen readers (#1084).
      <Host>
        <style>{getSegmentStyles()}</style>
        <button
          type="button"
          role="radio"
          class={btnClass}
          disabled={disabled}
          tabIndex={this.el.tabIndex ?? -1}
          aria-checked={String(selected)}
          aria-label={label}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          {icon && (
            <span class="segment__icon" aria-hidden="true">
              <io-icon name={icon} size="sm" />
            </span>
          )}
          {label}
        </button>
      </Host>
    );
  }
}
