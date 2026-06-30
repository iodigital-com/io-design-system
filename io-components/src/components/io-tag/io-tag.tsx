import { Component, Prop, Event, EventEmitter, Element, Host, h, Watch } from '@stencil/core';

import { getTagStyles } from './io-tag-styles';
import { getTagClassName, getTagGroupClassName, shouldBlockTagInteraction, resolveTagVariant, DEPRECATED_COLOR_MAP } from './io-tag-utils';
import type { IoIconName } from '../../utils/icons';

import type { IoTagSize, IoTagColor, IoTagVariant, IoTagAppearance } from './types';

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

  /**
   * @deprecated Use `<io-tag-dismissible>` instead.
   * Renders a remove (×) button alongside the tag.
   * Will emit a console.warn in dev mode when used.
   */
  @Prop() removable = false;

  /** Disables all interaction */
  @Prop({ reflect: true }) disabled = false;

  /** Size preset */
  @Prop({ reflect: true }) size: IoTagSize = 'md';

  /**
   * Semantic colour variant.
   * Replaces `color` — use this in new code.
   */
  @Prop({ reflect: true }) variant: IoTagVariant = 'neutral';

  /**
   * Appearance modifier — controls background fill style.
   * - solid: full filled background
   * - soft: translucent tinted background (default)
   * - frosted: backdrop-filter blur with translucent fill
   */
  @Prop({ reflect: true }) appearance: IoTagAppearance = 'soft';

  /**
   * @deprecated Use `variant` instead.
   * Background colour of the unselected state.
   * Brand-colour names will be mapped to semantic variants with a console.warn.
   */
  @Prop({ reflect: true }) color: IoTagColor = 'default';

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

  // ── Lifecycle ─────────────────────────────────────────────────

  @Watch('color')
  onColorChange(newColor: IoTagColor) {
    if (newColor !== 'default') {
      const mapped = DEPRECATED_COLOR_MAP[newColor];
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(
          `[io-tag] The 'color' prop is deprecated. Use 'variant="${mapped ?? 'neutral'}"' instead. ` +
          `'color="${newColor}"' will be removed in a future release.`
        );
      }
    }
  }

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the tag is toggled. Payload is the new selected value. */
  @Event() toggle!: EventEmitter<boolean>;

  /** Fires when the remove button is clicked (removable only). */
  @Event() remove!: EventEmitter<void>;

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

  private handleRemove = (ev: MouseEvent) => {
    ev.stopPropagation();
    if (shouldBlockTagInteraction(this.disabled)) {
      ev.preventDefault();
      return;
    }
    this.remove.emit();
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { selected, removable, disabled, size, color, label, compact, variant, appearance, icon, iconSource } = this;

    // Resolve effective variant: semantic `variant` takes precedence; fall back to color mapping
    const effectiveVariant = resolveTagVariant(variant, color);
    const tagClass = getTagClassName(size, effectiveVariant, appearance, selected, disabled, compact);

    const iconEl = (icon || iconSource) ? (
      <io-icon
        name={icon ?? 'x'}
        iconSource={iconSource}
        size="xs"
        aria-hidden="true"
      />
    ) : null;

    if (removable) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(
          '[io-tag] The `removable` prop is deprecated. Use `<io-tag-dismissible>` for chips with dismiss actions.'
        );
      }
      return (
        <Host>
          <style>{getTagStyles()}</style>
          <div
            class={getTagGroupClassName(size, effectiveVariant, appearance, selected, disabled)}
            role="none"
          >
            <button
              type="button"
              class={`${tagClass} tag--removable-main`}
              aria-disabled={disabled ? 'true' : undefined}
              aria-pressed={String(selected)}
              onClick={this.handleToggle}
            >
              {iconEl}
              <slot />
            </button>
            <button
              type="button"
              class={`tag tag--${size} tag--${effectiveVariant} tag--${appearance} tag__remove tag__remove--${size}${selected ? ' tag--selected' : ''}${disabled ? ' tag--disabled' : ''}`}
              aria-label={label ? `Remove ${label}` : 'Remove'}
              aria-disabled={disabled ? 'true' : undefined}
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
