import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import { getTagStyles } from './io-tag-styles';
import { getTagClassName, shouldBlockTagInteraction } from './io-tag-utils';
import type { IoIconName } from '../../utils/icons';

import type { IoTagSize, IoTagVariant, IoTagAppearance } from './types';

/**
 * io-tag
 * =======
 * Interactive toggle chip / filter pill.
 *
 * Used for filter bars, multi-select interfaces, and category labels.
 * Distinct from io-badge (which is non-interactive status text).
 *
 * Modes:
 * 1. Toggle chip (default): `<io-tag>Label</io-tag>` — renders as `<button aria-pressed>`
 * 2. Display chip: Add `role="none"` externally; wrap in `<ul role="listbox">` for a
 *    selectable group. Use `aria-selected` via role="option" for listbox patterns.
 * 3. Removable: `<io-tag removable>` — deprecated. Use `<io-tag-dismissible>` instead.
 * 4. Navigation chip: slot an `<a>` or `<button>` inside `<io-tag interactive="false">`.
 *
 * @example
 * <io-tag>Design</io-tag>
 * <io-tag variant="primary" selected>Amsterdam</io-tag>
 * <io-tag variant="info" appearance="soft">React</io-tag>
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

  /** Disables all interaction */
  @Prop({ reflect: true }) disabled = false;

  /** Size preset */
  @Prop({ reflect: true }) size: IoTagSize = 'md';

  /**
   * Semantic colour variant.
   */
  @Prop({ reflect: true }) variant: IoTagVariant = 'neutral';

  /**
   * Appearance modifier — controls background fill style.
   * - solid: full filled background
   * - soft: translucent tinted background (default)
   * - frosted: backdrop-filter blur with translucent fill
   */
  @Prop({ reflect: true }) appearance: IoTagAppearance = 'soft';

  /** Accessible label for the tag content — used to build the remove button's aria-label. */
  @Prop() label = '';

  /** Compact density — reduces vertical padding for dense UI contexts */
  @Prop({ reflect: true }) compact = false;

  /**
   * Optional leading icon name (from the io icon set).
   * Renders with `aria-hidden="true"` and `size="xs"`.
   */
  @Prop() icon?: IoIconName;

  /**
   * Custom SVG URL for the leading icon.
   * When set alongside `icon`, this URL takes precedence as the icon source.
   */
  @Prop() iconSource?: string;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the tag is toggled. Payload is the new selected value. */
  @Event() toggle!: EventEmitter<boolean>;

  // ── Handlers ─────────────────────────────────────────────────

  private handleToggle = (ev: MouseEvent) => {
    if (shouldBlockTagInteraction(this.disabled)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.selected = !this.selected;
    this.toggle.emit(this.selected);
  };


  // ── Render ───────────────────────────────────────────────────

  render() {
    const { selected, disabled, size, compact, variant, appearance, icon, iconSource } = this;

    const tagClass = getTagClassName(size, variant, appearance, selected, disabled, compact);

    const iconEl = (icon || iconSource) ? (
      <io-icon
        name={icon ?? 'x'}
        iconSource={iconSource}
        size="xs"
        aria-hidden="true"
      />
    ) : null;

    return (
      <Host>
        <style>{getTagStyles()}</style>
        <button
          type="button"
          class={tagClass}
          aria-disabled={disabled ? 'true' : undefined}
          aria-pressed={String(selected)}
          onClick={this.handleToggle}
        >
          {iconEl}
          <slot />
        </button>
      </Host>
    );
  }
}
