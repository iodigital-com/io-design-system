import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

import { getButtonPureStyles } from './io-button-pure-styles';
import { getButtonPureClassList } from './io-button-pure-utils';
import type { IoIconName } from '../../utils/icons';

import type { IoButtonPureAlignLabel, IoButtonPureType } from './types';

/**
 * io-button-pure
 * ===============
 * Link-styled inline action button that inherits surrounding font-size.
 *
 * Designed for toolbar triggers, table row actions, inline body-copy CTAs,
 * and anywhere io-button's fixed sizing is not appropriate.
 *
 * Distinct from io-button variant='link', which has independent sizing.
 *
 * @example
 * <io-button-pure>View details</io-button-pure>
 * <io-button-pure underline active>Active link</io-button-pure>
 * <io-button-pure href="/pricing">See pricing</io-button-pure>
 */
@Component({
  tag: 'io-button-pure',
  shadow: { delegatesFocus: true },
})
export class IoButtonPure {
  // ── Props ─────────────────────────────────────────────────────

  /** Disables the button */
  @Prop({ reflect: true }) disabled = false;

  /** Renders a persistent underline (also applied on hover) */
  @Prop({ reflect: true }) underline = false;

  /** Marks the button as the currently active item (adds active colour) */
  @Prop({ reflect: true }) active = false;

  /** Stretches the button to fill its parent container width */
  @Prop({ reflect: true }) stretch = false;

  /**
   * Controls the side on which the icon is rendered relative to the label.
   * 'start' — icon precedes label (left in LTR); 'end' — icon follows label.
   */
  @Prop({ reflect: true }) alignLabel: IoButtonPureAlignLabel = 'start';

  /** Native button type. Irrelevant when href is set. */
  @Prop() type: IoButtonPureType = 'button';

  /** When provided, renders the component as an anchor tag. */
  @Prop() href: string | undefined;

  /** Link target — only used when href is set. */
  @Prop() target: string | undefined = '_self';

  /** Rel attribute — only used when href is set. */
  @Prop() rel: string | undefined;

  /** Accessible label — required for icon-only buttons */
  @Prop() label: string | undefined;

  /** Name of a Lucide icon to render alongside the label. */
  @Prop() icon?: IoIconName;

  // ── Events ────────────────────────────────────────────────────

  /** Fires on user click/Enter/Space activation. Not fired when disabled. */
  @Event() click!: EventEmitter<MouseEvent>;

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    if (this.disabled) {
      ev.preventDefault();
      return;
    }
    this.click.emit(ev);
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.href && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      this.handleClick(ev as unknown as MouseEvent);
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { disabled, active, underline, stretch, alignLabel, href, target, rel, type, icon, label } = this;

    const classList = getButtonPureClassList({ disabled, active, underline, stretch, alignLabel });
    const Tag = href ? 'a' : 'button';

    const innerProps: Record<string, unknown> = {
      class: classList,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
    };

    if (label) {
      innerProps['aria-label'] = label;
    }

    if (href) {
      innerProps['href'] = disabled ? undefined : href;
      innerProps['target'] = target;
      innerProps['rel'] = rel;
      innerProps['aria-disabled'] = disabled ? 'true' : undefined;
      if (disabled) innerProps['tabIndex'] = 0;
    } else {
      innerProps['type'] = type;
      innerProps['disabled'] = disabled;
    }

    const iconEl = icon ? (
      <io-icon name={icon} size="inherit" aria-hidden="true" />
    ) : null;

    return (
      <Host>
        <style>{getButtonPureStyles()}</style>
        <Tag {...innerProps}>
          {iconEl}
          <span class="btn-pure__label">
            <slot />
          </span>
        </Tag>
      </Host>
    );
  }
}
