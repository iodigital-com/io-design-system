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
 * <io-segment value="map" label="Map" icon-source="/icons/map.svg" />
 * <io-segment value="all" label="All" hide-label>
 *   <io-badge slot="badge">12</io-badge>
 * </io-segment>
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

  /**
   * URL to a custom SVG or image for the segment icon.
   * Takes precedence over the `icon` prop when both are set.
   * Use for brand icons or third-party glyphs not in the built-in icon set.
   */
  @Prop() iconSource: string | undefined;

  /**
   * When true, renders only the icon (or iconSource image) and uses the
   * `label` prop as the button's `aria-label` for screen readers.
   * The label is visually hidden but announced by AT.
   * Requires either `icon` or `iconSource` to be set.
   */
  @Prop({ reflect: true }) hideLabel = false;

  // ── State ─────────────────────────────────────────────────────

  /** Whether this segment is the currently selected option — set by parent */
  @State() selected = false;

  /** Whether slotted badge content is present */
  @State() private hasBadge = false;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    // Stamp initial disabled state onto the host element so the parent can
    // read it after syncChildren() has overwritten the @Prop.
    (this.el as HTMLElement & { ownDisabled?: boolean }).ownDisabled = this.disabled;
    this.hasBadge = this.el.querySelector('[slot="badge"]') !== null;
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

  private handleBadgeSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasBadge = slot.assignedNodes({ flatten: true }).length > 0;
  };

  // ── Private helpers ───────────────────────────────────────────

  private renderIcon() {
    const { icon, iconSource } = this;
    if (iconSource) {
      return (
        <span class="segment__icon" aria-hidden="true">
          <img src={iconSource} class="segment__icon-source" alt="" />
        </span>
      );
    }
    if (icon) {
      return (
        <span class="segment__icon" aria-hidden="true">
          <io-icon name={icon} size="sm" />
        </span>
      );
    }
    return null;
  }

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot badge - Optional numeric/badge content rendered after the label (e.g. counts, notifications).
   *              Slotted content is excluded from the button's aria-label to avoid duplicate announcements.
   */
  render() {
    const { label, disabled, selected, hideLabel, hasBadge } = this;
    const hasIcon = !!(this.icon || this.iconSource);

    const btnClass = [
      'segment',
      selected ? 'segment--selected' : '',
      disabled ? 'segment--disabled' : '',
      hideLabel ? 'segment--icon-only' : '',
    ]
      .filter(Boolean)
      .join(' ');

    // When hideLabel is true, use label as aria-label on the button and suppress
    // visible label text. When badge content exists, aria-label is set explicitly
    // so screen readers read the label only (not badge text).
    const buttonAriaLabel = hideLabel
      ? label
      : hasBadge
        ? label
        : undefined;

    return (
      // Host carries no ARIA role — all semantics live on the inner button
      // to prevent double-announcement by screen readers (#1084).
      <Host>
        <style>{getSegmentStyles()}</style>
        {/* Hidden badge slot — must exist in DOM for slotchange detection */}
        <slot name="badge" onSlotchange={this.handleBadgeSlotChange} />
        <button
          type="button"
          role="radio"
          class={btnClass}
          disabled={disabled}
          tabIndex={this.el.tabIndex ?? -1}
          aria-checked={String(selected)}
          aria-label={buttonAriaLabel}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
        >
          {hasIcon && this.renderIcon()}
          {!hideLabel && <span class="segment__label">{label}</span>}
          {hasBadge && (
            <span class="segment__badge" aria-hidden="true" data-slot="badge">
              <slot name="badge" />
            </span>
          )}
        </button>
      </Host>
    );
  }
}
