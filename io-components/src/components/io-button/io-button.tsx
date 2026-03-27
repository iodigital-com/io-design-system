import { Component, Prop, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';
import type { IoButtonVariant, IoButtonColor, IoButtonSize, IoButtonType, IoButtonArrow, IoButtonArrowPlacement } from './types';
import { getButtonAriaAttrs, getButtonClassList } from './io-button-utils';
import { getButtonStyles } from './io-button-styles';

/**
 * io-button
 * ==========
 * Primary interactive element for io Digital's design system.
 *
 * Supports 9 color themes × 3 variants (solid, ghost, link) × 3 sizes.
 * Renders as <button> by default, or <a> when `href` is provided.
 *
 * @example
 * <io-button color="blue" variant="solid" size="md">Get started</io-button>
 * <io-button color="blue" variant="ghost" size="md">Learn more</io-button>
 * <io-button href="/pricing" color="blue" variant="link">See pricing</io-button>
 */
@Component({
  tag: 'io-button',
  shadow: { delegatesFocus: true },
})
export class IoButton {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Visual fill style */
  @Prop({ reflect: true }) variant: IoButtonVariant = 'solid';

  /** Color theme */
  @Prop({ reflect: true }) color: IoButtonColor = 'blue';

  /** Size preset */
  @Prop({ reflect: true }) size: IoButtonSize = 'md';

  /** Native button type (irrelevant when href is set) */
  @Prop() type: IoButtonType = 'button';

  /** Renders the button as an anchor tag with this href */
  @Prop() href: string | undefined;

  /** Link target — only used when href is set */
  @Prop() target: string | undefined = '_self';

  /** Rel attribute — only used when href is set */
  @Prop() rel: string | undefined;

  /** Disables the button and applies reduced opacity */
  @Prop({ reflect: true }) disabled = false;

  /** Shows a loading spinner and disables interaction */
  @Prop({ reflect: true }) loading = false;

  /** Stretches button to fill its container width */
  @Prop() fullWidth = false;

  /** Accessible label — required for icon-only buttons */
  @Prop() label: string | undefined;

  /** Direction of the optional animated arrow icon. Omit to hide the arrow. */
  @Prop({ reflect: true }) arrow: IoButtonArrow | undefined;

  /** Side on which the arrow is rendered. Defaults to 'right'. */
  @Prop({ reflect: true }) arrowPlacement: IoButtonArrowPlacement = 'right';

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fires on user click/Enter/Space activation.
   * Not fired when disabled or loading.
   */
  @Event() ioClick!: EventEmitter<MouseEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the button */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const inner = this.el.shadowRoot?.querySelector<HTMLElement>('.btn');
    inner?.focus(options);
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled || this.loading) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.ioClick.emit(ev);
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.href && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      this.handleClick(ev as unknown as MouseEvent);
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { variant, color, size, disabled, loading, fullWidth, href, target, rel, type, label, arrowPlacement } = this;
    // 'none' and null are UI sentinels — treat as undefined so no arrow is rendered.
    // null arrives when React explicitly resets the DOM property (vs. deleting the prop).
    const rawArrow = this.arrow as string | null | undefined;
    const arrow = rawArrow === 'none' || rawArrow === null ? undefined : this.arrow;

    const ariaAttrs = getButtonAriaAttrs({ disabled, loading, href });
    const classList = getButtonClassList({ variant, color, size, disabled, loading, fullWidth });

    const Tag = href ? 'a' : 'button';

    const innerProps: Record<string, unknown> = {
      class: `btn btn--${variant} btn--${color} btn--${size}${disabled ? ' btn--disabled' : ''}${loading ? ' btn--loading' : ''}${fullWidth ? ' btn--full-width' : ''}`,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      ...ariaAttrs,
    };

    if (href) {
      innerProps['href'] = disabled || loading ? undefined : href;
      innerProps['target'] = target;
      innerProps['rel'] = rel;
    } else {
      innerProps['type'] = type;
      innerProps['disabled'] = disabled || loading;
    }

    if (label) {
      innerProps['aria-label'] = label;
    }

    return (
      <Host class={classList}>
        <style>{getButtonStyles()}</style>
        <Tag {...innerProps}>
          {loading && <span class="btn__spinner" aria-hidden="true" />}
          {arrow !== undefined && arrowPlacement === 'left' && (
            <span
              class={`btn__arrow${arrow === 'back' ? ' btn__arrow--back' : ''}${arrow === 'down' ? ' btn__arrow--down' : ''}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 26 16" fill="currentColor">
                <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" />
              </svg>
            </span>
          )}
          <span class="btn__label"><slot /></span>
          {arrow !== undefined && arrowPlacement === 'right' && (
            <span
              class={`btn__arrow${arrow === 'back' ? ' btn__arrow--back' : ''}${arrow === 'down' ? ' btn__arrow--down' : ''}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 26 16" fill="currentColor">
                <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" />
              </svg>
            </span>
          )}
        </Tag>
      </Host>
    );
  }
}
