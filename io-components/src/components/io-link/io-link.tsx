import { Component, Prop, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';

import { getLinkStyles } from './io-link-styles';
import { getLinkClassName, resolveLinkRel, resolveLinkTarget, shouldBlockLinkClick } from './io-link-utils';
import type { IoIconName } from '../../utils/icons';

import type { IoLinkVariant, IoLinkColor } from './types';

/**
 * io-link
 * ========
 * Animated underline hyperlink — io Digital's branded link element.
 *
 * Two variants:
 *  - standalone: no underline at rest, grows from left on hover (CTA links)
 *  - inline:     underline at rest, slides out on hover (body text links)
 *
 * Inherits font-size and line-height from surrounding text.
 *
 * @example
 * <io-link href="/about">Learn about us</io-link>
 * <io-link href="/contact" variant="inline">Contact us</io-link>
 * <io-link href="https://example.com" external>Open in new tab</io-link>
 */
@Component({
  tag: 'io-link',
  shadow: { delegatesFocus: true },
})
export class IoLink {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Underline animation behaviour */
  @Prop({ reflect: true }) variant: IoLinkVariant = 'standalone';

  /** Text colour */
  @Prop({ reflect: true }) color: IoLinkColor = 'blue';

  /** Destination URL */
  @Prop() href!: string;

  /** Link target. Overridden to '_blank' when external is true. */
  @Prop() target: string | undefined = '_self';

  /** Rel attribute. Overridden to 'noopener noreferrer' when external is true. */
  @Prop() rel: string | undefined;

  /** Automatically sets target="_blank" and rel="noopener noreferrer" */
  @Prop() external = false;

  /** Downloadable file name. Enables download behavior on click. */
  @Prop() download: string | undefined;

  /** Disables the link — removes href and blocks click */
  @Prop({ reflect: true }) disabled = false;

  /** Name of a Lucide icon to render before the label. Set to a valid IoIconName to show an icon. */
  @Prop() icon?: IoIconName;

  /** Custom SVG source string for a non-library icon. Takes precedence over `icon` when both are set. */
  @Prop() iconSource?: string;

  /** Hides the label text visually while keeping it available to screen readers. Requires icon or iconSource to be set for any visual affordance. */
  @Prop() hideLabel = false;

  // ── Events ────────────────────────────────────────────────────

  /** Fires on click. Not fired when disabled. */
  @Event() click!: EventEmitter<MouseEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the link */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const inner = this.el.shadowRoot?.querySelector<HTMLElement>('.link');
    inner?.focus(options);
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = (ev: MouseEvent) => {
    if (shouldBlockLinkClick(this.disabled)) {
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
      return <span class="link__icon" aria-hidden="true" innerHTML={this.iconSource} />;
    }

    return <io-icon class="link__icon" name={this.icon!} aria-hidden="true" />;
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { variant, color, href, target, rel, external, disabled, download, hideLabel } = this;
    const resolvedTarget = resolveLinkTarget(target, external);
    const resolvedRel = resolveLinkRel(rel, resolvedTarget, external);

    // Compute aria-label: append "(opens in new tab)" for external links
    const linkText = this.el.textContent?.trim() || '';
    const ariaLabel = external && linkText ? `${linkText}, opens in new tab` : undefined;

    const hasIcon = Boolean(this.icon || this.iconSource);

    return (
      <Host>
        <style>{getLinkStyles()}</style>
        <a
          class={getLinkClassName(variant, color, disabled)}
          href={disabled ? undefined : href}
          target={resolvedTarget}
          rel={resolvedRel}
          download={download}
          aria-label={ariaLabel}
          aria-disabled={disabled ? 'true' : undefined}
          tabIndex={disabled ? 0 : undefined}
          onClick={this.handleClick}
        >
          {hasIcon && this.renderIcon()}
          <span class={hideLabel && (this.icon || this.iconSource) ? 'link__label link__label--hidden' : 'link__label'}>
            <slot />
          </span>
        </a>
      </Host>
    );
  }
}
