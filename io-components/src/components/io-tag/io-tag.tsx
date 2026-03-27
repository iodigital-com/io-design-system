import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';
import type { IoTagSize, IoTagColor } from './types';
import { getTagStyles } from './io-tag-styles';

/**
 * io-tag
 * =======
 * Interactive toggle chip / filter pill.
 *
 * Used for filter bars, multi-select interfaces, and category labels.
 * Distinct from io-badge (which is non-interactive status text).
 *
 * @example
 * <io-tag>Design</io-tag>
 * <io-tag selected>Amsterdam</io-tag>
 * <io-tag removable>React</io-tag>
 */
@Component({
  tag: 'io-tag',
  shadow: { delegatesFocus: true },
})
export class IoTag {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Active/selected state — filled primary colour when true */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /** Renders a remove (×) button alongside the tag */
  @Prop() removable = false;

  /** Disables all interaction */
  @Prop({ reflect: true }) disabled = false;

  /** Size preset */
  @Prop({ reflect: true }) size: IoTagSize = 'md';

  /** Background colour of the unselected state */
  @Prop({ reflect: true }) color: IoTagColor = 'default';

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the tag is toggled. Payload is the new selected value. */
  @Event() ioToggle!: EventEmitter<boolean>;

  /** Fires when the remove button is clicked (removable only). */
  @Event() ioRemove!: EventEmitter<void>;

  // ── Handlers ─────────────────────────────────────────────────

  private handleToggle = (ev: MouseEvent) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.selected = !this.selected;
    this.ioToggle.emit(this.selected);
  };

  private handleRemove = (ev: MouseEvent) => {
    ev.stopPropagation();
    if (this.disabled) {
      ev.preventDefault();
      return;
    }
    this.ioRemove.emit();
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { selected, removable, disabled, size, color } = this;
    const tagClass = [
      'tag',
      `tag--${size}`,
      `tag--${color}`,
      selected ? 'tag--selected' : '',
      disabled ? 'tag--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    if (removable) {
      return (
        <Host>
          <style>{getTagStyles()}</style>
          <div
            class={`tag-group tag-group--${size} tag-group--${color}${selected ? ' tag-group--selected' : ''}${disabled ? ' tag-group--disabled' : ''}`}
            role="none"
          >
            <button
              class={`${tagClass} tag--removable-main`}
              disabled={disabled}
              aria-pressed={String(selected)}
              onClick={this.handleToggle}
            >
              <slot />
            </button>
            <button
              class={`tag tag--${size} tag--${color} tag__remove tag__remove--${size}${selected ? ' tag--selected' : ''}${disabled ? ' tag--disabled' : ''}`}
              aria-label="Remove"
              disabled={disabled}
              onClick={this.handleRemove}
            >
              <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <style>{getTagStyles()}</style>
        <button
          class={tagClass}
          disabled={disabled}
          aria-pressed={String(selected)}
          onClick={this.handleToggle}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
