import { Component, Prop, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';

import { getLinkPureStyles } from './io-link-pure-styles';
import { getLinkPureClassName, resolveLinkPureRel, resolveLinkPureTarget, shouldBlockLinkPureClick } from './io-link-pure-utils';
import type { IoIconName } from '../../utils/icons';
import type { IoLinkPureAlignLabel, IoLinkPureSize } from './types';

/**
 * io-link-pure
 * =============
 * Icon + label tertiary CTA link. No underline at rest, underline on hover.
 * Renders a native `<a>` anchor element (or `<button>` when no `href` is set).
 * Shares anchor/external/disabled/icon plumbing with io-link but is purpose-built
 * for navigation, card CTAs, list actions, and icon-only affordances.
 *
 * @example
 * <io-link-pure href="/docs" icon="arrow-right">Read the docs</io-link-pure>
 * <io-link-pure href="/profile" icon="user" hide-label>Profile</io-link-pure>
 * <io-link-pure href="/dashboard" icon="layout-dashboard" stretch>Dashboard</io-link-pure>
 */
@Component({
  tag: 'io-link-pure',
  shadow: { delegatesFocus: true },
})
export class IoLinkPure {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Destination URL. When absent the component renders as a `<button>` element. */
  @Prop() href?: string;

  /** Link target. Overridden to '_blank' when external is true. */
  @Prop() target: string | undefined = '_self';

  /** Rel attribute. Overridden to 'noopener noreferrer' when external is true. */
  @Prop() rel: string | undefined;

  /** Automatically sets target="_blank" and rel="noopener noreferrer". */
  @Prop() external = false;

  /** Downloadable file name. Enables download behavior on click. */
  @Prop() download: string | undefined;

  /** Disables the link — removes href and blocks click. */
  @Prop({ reflect: true }) disabled = false;

  /** Icon position relative to the label. */
  @Prop({ reflect: true }) alignLabel: IoLinkPureAlignLabel = 'start';

  /**
   * When true, the component fills its container width.
   * The label and icon are pushed to opposite ends of the container.
   */
  @Prop({ reflect: true }) stretch = false;

  /**
   * Marks the link as the active/current navigation item.
   * Applies active visual treatment and sets aria-current="page" by default.
   */
  @Prop({ reflect: true }) active = false;

  /** Text size variant. */
  @Prop({ reflect: true }) size: IoLinkPureSize = 'md';

  /** Name of a Lucide icon to render. */
  @Prop() icon?: IoIconName;

  /** Custom SVG source string for a non-library icon. Takes precedence over `icon`. */
  @Prop() iconSource?: string;

  /**
   * Hides the label text visually while keeping it accessible to screen readers.
   * The visible label becomes the element's aria-label.
   * Requires `icon` or `iconSource` to be set for any visual affordance.
   */
  @Prop() hideLabel = false;

  // ── Events ────────────────────────────────────────────────────

  /** Fires on click. Not fired when disabled. */
  @Event() click!: EventEmitter<MouseEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the link. */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const inner = this.el.shadowRoot?.querySelector<HTMLElement>('.link-pure');
    inner?.focus(options);
  }

  // ── Lifecycle ────────────────────────────────────────────────

  componentWillLoad() {
    if (!this.href && !this.disabled) {
      console.warn('[io-link-pure] No `href` set. The component will render as a <button> element.');
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = (ev: MouseEvent) => {
    if (shouldBlockLinkPureClick(this.disabled)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.click.emit(ev);
  };

  // ── Render helpers ───────────────────────────────────────────

  private renderIcon() {
    if (!this.icon && !this.iconSource) return null;

    if (this.iconSource) {
      return <span class="link-pure__icon" aria-hidden="true" innerHTML={this.iconSource} />;
    }

    return <io-icon class="link-pure__icon" name={this.icon!} aria-hidden="true" />;
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { href, target, rel, external, disabled, download, hideLabel, active, alignLabel, size, stretch } = this;
    const resolvedTarget = resolveLinkPureTarget(target, external);
    const resolvedRel = resolveLinkPureRel(rel, resolvedTarget, external);

    const hasIcon = Boolean(this.icon || this.iconSource);

    // When hideLabel is active, use the visible text as aria-label on the element
    const labelText = this.el.textContent?.trim() || '';
    const ariaLabelForHidden = hideLabel && hasIcon && labelText ? labelText : undefined;

    // External link aria augmentation
    const externalAriaLabel = external && labelText && !hideLabel
      ? `${labelText}, opens in new tab`
      : undefined;

    const ariaCurrent = active ? 'page' : undefined;

    const resolvedHref = disabled ? undefined : href;

    const className = getLinkPureClassName(size, alignLabel, disabled, active, stretch);

    // Render as <button> when no href
    if (!href) {
      return (
        <Host>
          <style>{getLinkPureStyles()}</style>
          <button
            type="button"
            class={className}
            disabled={disabled}
            aria-label={ariaLabelForHidden}
            aria-current={ariaCurrent}
            onClick={this.handleClick}
          >
            {hasIcon && this.renderIcon()}
            <span class={hideLabel && hasIcon ? 'link-pure__label link-pure__label--hidden' : 'link-pure__label'}>
              <slot />
            </span>
          </button>
        </Host>
      );
    }

    return (
      <Host>
        <style>{getLinkPureStyles()}</style>
        <a
          class={className}
          href={resolvedHref}
          target={resolvedTarget}
          rel={resolvedRel}
          download={download}
          aria-label={ariaLabelForHidden ?? externalAriaLabel}
          aria-current={ariaCurrent}
          aria-disabled={disabled ? 'true' : undefined}
          tabIndex={disabled ? 0 : undefined}
          onClick={this.handleClick}
        >
          {hasIcon && this.renderIcon()}
          <span class={hideLabel && hasIcon ? 'link-pure__label link-pure__label--hidden' : 'link-pure__label'}>
            <slot />
          </span>
        </a>
      </Host>
    );
  }
}
