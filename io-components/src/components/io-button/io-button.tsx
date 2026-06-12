import { AttachInternals, Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';

import { getButtonStyles } from './io-button-styles';
import { getButtonAriaAttrs, getButtonClassList } from './io-button-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import type { IoIconName } from '../../utils/icons';
import type { IoIconSize } from '../io-icon/types';

import type { IoButtonVariant, IoButtonColor, IoButtonSize, IoButtonType, IoButtonArrow, IoButtonArrowPlacement } from './types';

/** Shared path data for the iO brand arrow SVG — avoids duplication across render sites. */
const BRAND_ARROW_PATH = 'M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z';

const VALID_VARIANTS: readonly IoButtonVariant[] = ['solid', 'ghost', 'link'];
const VALID_COLORS: readonly IoButtonColor[] = ['blue', 'white', 'black', 'antraciet', 'orange', 'pink', 'rouge', 'yellow', 'beige', 'grey'];
const VALID_SIZES: readonly IoButtonSize[] = ['sm', 'md', 'lg', 'xl'];

const ICON_SIZE_MAP: Record<IoButtonSize, IoIconSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

let _idCounter = 0;

/**
 * io-button
 * ==========
 * Primary interactive element for io Digital's design system.
 *
 * Supports 9 color themes × 3 variants (solid, ghost, link) × 4 sizes.
 * Renders as <button> by default, or <a> when `href` is provided.
 *
 * Default type is 'button'. Set type="submit" or type="reset" explicitly
 * when placing inside a form — this deviates from the HTML default of 'submit'.
 *
 * @example
 * <io-button color="blue" variant="solid" size="md">Get started</io-button>
 * <io-button color="blue" variant="ghost" size="md">Learn more</io-button>
 * <io-button href="/pricing" color="blue" variant="link">See pricing</io-button>
 * <io-button type="submit" color="blue" variant="solid">Submit form</io-button>
 */
@Component({
  tag: 'io-button',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoButton {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Visual fill style */
  @Prop({ reflect: true }) variant: IoButtonVariant = 'solid';

  /** Color theme */
  @Prop({ reflect: true }) color: IoButtonColor = 'blue';

  /** Size preset */
  @Prop({ reflect: true }) size: IoButtonSize = 'md';

  /**
   * Native button type.
   * Note: defaults to 'button' (unlike the HTML default of 'submit') — set
   * type="submit" or type="reset" explicitly when placing inside a form.
   * Irrelevant when href is set.
   */
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

  /**
   * Submitted as a name/value pair with form data when type="submit".
   * Also used by io-button-group to identify this item.
   */
  @Prop({ reflect: true }) value: string | undefined;

  /**
   * The name submitted as form data when type="submit".
   * Only relevant when button is associated with a form.
   */
  @Prop({ reflect: true }) name: string | undefined;

  /**
   * Associates the button with a form element by its ID.
   * Allows the button to submit/reset a form it is not a descendant of.
   */
  @Prop({ reflect: true }) form: string | undefined;

  /** Renders a square icon-only button and suppresses text label rendering */
  @Prop({ reflect: true, attribute: 'icon-only' }) iconOnly = false;

  /** Direction of the optional animated arrow icon. Omit to hide the arrow. */
  @Prop({ reflect: true }) arrow: IoButtonArrow | undefined;

  /** Side on which the arrow is rendered. Defaults to 'right'. */
  @Prop({ reflect: true }) arrowPlacement: IoButtonArrowPlacement = 'right';

  /** Name of a Lucide icon to render inside the button. */
  @Prop() icon?: IoIconName;

  /** Custom SVG string for a non-library icon (mutually exclusive with `icon`). */
  @Prop() iconSource?: string;

  /** Hides the text label visually (icon-only mode with accessible label via `label` prop). */
  @Prop({ reflect: true }) hideLabel = false;

  /** Side on which the icon is rendered relative to the label. Defaults to 'left'. */
  @Prop({ reflect: true }) iconPosition: 'left' | 'right' = 'left';

  /**
   * Custom ARIA attributes to inject onto the inner trigger element (`<button>` or `<a>`).
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * // Sets aria-controls="panel-id" on the inner <button>
   * <io-button .aria={{ controls: 'panel-id', haspopup: 'dialog' }}>Open panel</io-button>
   */
  @Prop() aria?: Record<string, string>;

  private hasWarnedIconOnlyLabel = false;
  private btnEl?: HTMLElement;
  private readonly loadingId: string;

  /** True once `loading` has transitioned to true at least once after mount. Guards live-region announcement. */
  @State() private loadingTransitioned = false;

  constructor() {
    this.loadingId = `io-btn-loading-${++_idCounter}`;
  }

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fires on user click/Enter/Space activation.
   * Not fired when disabled or loading.
   */
  @Event() click!: EventEmitter<MouseEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the button */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const inner = this.el.shadowRoot?.querySelector<HTMLElement>('.btn');
    inner?.focus(options);
  }

  // ── Lifecycle ────────────────────────────────────────────────

  componentWillLoad(): void {
    if (this.name !== undefined) {
      this.internals?.setFormValue?.(this.value ?? '');
    }
  }

  componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return newVal !== oldVal;
  }

  // ── Watchers ─────────────────────────────────────────────────

  @Watch('value')
  onValueChange(newValue: string | undefined): void {
    if (this.name !== undefined) {
      this.internals?.setFormValue?.(newValue ?? '');
    }
  }

  @Watch('loading')
  onLoadingChange(newVal: boolean): void {
    if (newVal) this.loadingTransitioned = true;
  }

  @Watch('aria')
  onAriaChange(): void {
    applyAriaProp(this.aria, this.btnEl ?? null);
  }

  // ── Form callbacks ───────────────────────────────────────────

  formResetCallback(): void {
    // Buttons have no user-controlled state to reset.
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = (ev: MouseEvent) => {
    // Stop native shadow-DOM click from propagating to the host element.
    // Consumers should listen to the Stencil 'click' event emitted below,
    // not the inner button's native click — prevents double-fire in
    // framework wrappers that listen on the host element.
    ev.stopPropagation();
    if (this.disabled || this.loading) {
      ev.preventDefault();
      return;
    }
    this.click.emit(ev);

    // FACE form integration — only for button (not anchor) mode.
    if (!this.href) {
      const form = this.internals?.form;
      if (form) {
        if (this.type === 'submit') {
          form.requestSubmit();
        } else if (this.type === 'reset') {
          form.reset();
        }
      }
    }
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.href && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      this.handleClick(ev as unknown as MouseEvent);
    }
  };

  private getAccessibleLabel(): string | undefined {
    const hostAriaLabel = this.el.getAttribute('aria-label') ?? undefined;
    return this.label ?? hostAriaLabel;
  }

  private warnIconOnlyLabelMissing(): void {
    if (!this.iconOnly || this.hasWarnedIconOnlyLabel || this.getAccessibleLabel()) {
      return;
    }

    const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (!isStencilProd) {
      console.warn('io-button: icon-only buttons require an accessible label via the label prop or aria-label attribute.');
    }
    this.hasWarnedIconOnlyLabel = true;
  }

  private validatePropValues(): void {
    const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (isStencilProd) return;

    if (!VALID_VARIANTS.includes(this.variant)) {
      console.warn(`io-button: Invalid value "${this.variant}" for prop "variant". Expected: ${VALID_VARIANTS.join(' | ')}.`);
    }
    if (!VALID_COLORS.includes(this.color)) {
      console.warn(`io-button: Invalid value "${this.color}" for prop "color". Expected: ${VALID_COLORS.join(' | ')}.`);
    }
    if (!VALID_SIZES.includes(this.size)) {
      console.warn(`io-button: Invalid value "${this.size}" for prop "size". Expected: ${VALID_SIZES.join(' | ')}.`);
    }
  }

  // ── Render helpers ───────────────────────────────────────────

  private renderIcon() {
    if (!this.icon && !this.iconSource) return null;

    if (this.iconSource) {
      return <span class="btn__icon-wrap" aria-hidden="true" innerHTML={this.iconSource} />;
    }

    return <io-icon name={this.icon!} size={ICON_SIZE_MAP[this.size] ?? 'sm'} aria-hidden="true" />;
  }

  private renderIconOnlyContent() {
    if (this.icon || this.iconSource) {
      return <span class="btn__icon">{this.renderIcon()}</span>;
    }
    return (
      <span class="btn__icon btn__icon--brand-arrow" aria-hidden="true">
        <svg viewBox="0 0 26 16" fill="currentColor">
          <path d={BRAND_ARROW_PATH} />
        </svg>
      </span>
    );
  }

  render() {
    const { variant, color, size, disabled, loading, fullWidth, href, target, rel, type, iconOnly, arrowPlacement, hideLabel, iconPosition } = this;
    // 'none' and null are UI sentinels — treat as undefined so no arrow is rendered.
    // null arrives when React explicitly resets the DOM property (vs. deleting the prop).
    const rawArrow = this.arrow as string | null | undefined;
    const arrow = rawArrow === 'none' || rawArrow === null ? undefined : this.arrow;

    this.validatePropValues();

    const ariaAttrs = getButtonAriaAttrs({ disabled, loading, href });
    const classList = getButtonClassList({ variant, color, size, disabled, loading, fullWidth, iconOnly });
    const accessibleLabel = this.getAccessibleLabel();
    this.warnIconOnlyLabelMissing();

    const Tag = href ? 'a' : 'button';
    const hasIcon = Boolean(this.icon || this.iconSource);

    const innerProps: Record<string, unknown> = {
      class: `btn btn--${variant} btn--${color} btn--${size}${disabled ? ' btn--disabled' : ''}${loading ? ' btn--loading' : ''}${fullWidth ? ' btn--full-width' : ''}${iconOnly ? ' btn--icon-only' : ''}`,
      ref: (el?: HTMLElement) => {
        this.btnEl = el;
        applyAriaProp(this.aria, el ?? null);
      },
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

    if (accessibleLabel) {
      innerProps['aria-label'] = accessibleLabel;
    }

    if (loading && this.loadingTransitioned) {
      innerProps['aria-describedby'] = this.loadingId;
    }

    const labelSlot = iconOnly
      ? this.renderIconOnlyContent()
      : (
        <span class={hideLabel ? 'btn__label btn__label--hidden' : 'btn__label'}>
          <slot />
        </span>
      );

    return (
      <Host class={classList}>
        <style>{getButtonStyles()}</style>
        <Tag {...innerProps}>
          {loading && <span class="btn__spinner" aria-hidden="true" />}
          {!iconOnly && arrow !== undefined && arrowPlacement === 'left' && (
            <span
              class={`btn__arrow${arrow === 'back' ? ' btn__arrow--back' : ''}${arrow === 'down' ? ' btn__arrow--down' : ''}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 26 16" fill="currentColor">
                <path d={BRAND_ARROW_PATH} />
              </svg>
            </span>
          )}
          {hasIcon && !iconOnly && iconPosition === 'left' && this.renderIcon()}
          {labelSlot}
          {hasIcon && !iconOnly && iconPosition === 'right' && this.renderIcon()}
          {!iconOnly && arrow !== undefined && arrowPlacement === 'right' && (
            <span
              class={`btn__arrow${arrow === 'back' ? ' btn__arrow--back' : ''}${arrow === 'down' ? ' btn__arrow--down' : ''}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 26 16" fill="currentColor">
                <path d={BRAND_ARROW_PATH} />
              </svg>
            </span>
          )}
        </Tag>
        {/* Loading live region — sibling to button so it's outside the interactive element's accessible subtree */}
        <span
          id={this.loadingId}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class="btn__loading-sr"
        >
          {loading && this.loadingTransitioned ? 'Loading' : ''}
        </span>
      </Host>
    );
  }
}
