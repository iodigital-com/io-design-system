import { Component, Prop, Element, Host, Watch, h } from '@stencil/core';

import type { IoTooltipPlacement, IoTooltipTheme } from './types';

const PREV_TOOLTIP_VALUE_ATTR = 'data-io-tooltip-prev-value';
const PREV_TOOLTIP_HAD_ATTR = 'data-io-tooltip-prev-had';
const PREV_PLACEMENT_VALUE_ATTR = 'data-io-tooltip-placement-prev-value';
const PREV_PLACEMENT_HAD_ATTR = 'data-io-tooltip-placement-prev-had';
const PREV_THEME_HAD_ATTR = 'data-io-tooltip-theme-prev-had';
const PREV_THEME_VALUE_ATTR = 'data-io-tooltip-theme-prev-value';

/**
 * io-tooltip
 * ===========
 * Compatibility wrapper around the global [io-tooltip] attribute API.
 *
 * New usage should place `io-tooltip`, `io-tooltip-placement`, and
 * `io-tooltip-theme` attributes directly on the trigger element. This wrapper
 * maps props to attributes on the first child element.
 *
 * Token API (override via CSS custom properties):
 *   --io-tooltip-max-width    Max width of the tooltip overlay. Default: 20rem.
 *   --io-tooltip-bg           Tooltip background color (dark theme default).
 *   --io-tooltip-color        Tooltip text color (dark theme default).
 *   --io-tooltip-show-delay   Delay before showing tooltip on hover. Default: 500ms.
 *   --io-tooltip-hide-delay   Delay before hiding tooltip after pointer leaves. Default: 150ms.
 *
 * @example
 * <io-tooltip content="More information">
 *   <io-button>Info</io-button>
 * </io-tooltip>
 *
 * @example Light theme
 * <io-tooltip content="Light tooltip" theme="light">
 *   <io-button>Info</io-button>
 * </io-tooltip>
 */
@Component({
  tag: 'io-tooltip',
  shadow: false,
})
export class IoTooltip {
  @Element() el!: HTMLElement;

  private trigger?: HTMLElement;
  private observer?: MutationObserver;

  // ── Props ─────────────────────────────────────────────────────

  /** Tooltip text content */
  @Prop() content = '';

  /** Preferred placement of the tooltip relative to the trigger */
  @Prop() placement: IoTooltipPlacement = 'top';

  /**
   * Colour theme for the tooltip overlay.
   * - `'dark'` (default) — dark background, white text.
   * - `'light'` — white background, primary text (use on dark surfaces).
   */
  @Prop() theme: IoTooltipTheme = 'dark';

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad() {
    this.syncTriggerAttributes();

    // Keep compatibility wrapper stable when frameworks replace the first child.
    this.observer = new MutationObserver(() => this.syncTriggerAttributes());
    this.observer.observe(this.el, { childList: true });
  }

  disconnectedCallback() {
    this.observer?.disconnect();
    this.observer = undefined;
    this.clearTriggerAttributes();
  }

  @Watch('content')
  onContentChange() {
    this.syncTriggerAttributes();
  }

  @Watch('placement')
  onPlacementChange() {
    this.syncTriggerAttributes();
  }

  @Watch('theme')
  onThemeChange() {
    this.syncTriggerAttributes();
  }

  private getTrigger(): HTMLElement | undefined {
    const first = this.el.firstElementChild;
    return first instanceof HTMLElement ? first : undefined;
  }

  private syncTriggerAttributes() {
    const trigger = this.getTrigger();
    if (!trigger) return;

    if (this.trigger && this.trigger !== trigger) {
      this.clearTriggerAttributes();
    }

    this.trigger = trigger;
    this.backupTriggerAttributes(trigger);
    trigger.setAttribute('io-tooltip', this.content);
    trigger.setAttribute('io-tooltip-placement', this.placement);
    if (this.theme === 'light') {
      trigger.setAttribute('io-tooltip-theme', 'light');
    } else {
      trigger.removeAttribute('io-tooltip-theme');
    }
  }

  private backupTriggerAttributes(trigger: HTMLElement) {
    if (!trigger.hasAttribute(PREV_TOOLTIP_HAD_ATTR)) {
      trigger.setAttribute(PREV_TOOLTIP_HAD_ATTR, trigger.hasAttribute('io-tooltip') ? '1' : '0');
      trigger.setAttribute(PREV_TOOLTIP_VALUE_ATTR, trigger.getAttribute('io-tooltip') ?? '');
    }

    if (!trigger.hasAttribute(PREV_PLACEMENT_HAD_ATTR)) {
      trigger.setAttribute(PREV_PLACEMENT_HAD_ATTR, trigger.hasAttribute('io-tooltip-placement') ? '1' : '0');
      trigger.setAttribute(PREV_PLACEMENT_VALUE_ATTR, trigger.getAttribute('io-tooltip-placement') ?? '');
    }

    if (!trigger.hasAttribute(PREV_THEME_HAD_ATTR)) {
      trigger.setAttribute(PREV_THEME_HAD_ATTR, trigger.hasAttribute('io-tooltip-theme') ? '1' : '0');
      trigger.setAttribute(PREV_THEME_VALUE_ATTR, trigger.getAttribute('io-tooltip-theme') ?? '');
    }
  }

  private restoreTriggerAttributes(trigger: HTMLElement) {
    const hadTooltip = trigger.getAttribute(PREV_TOOLTIP_HAD_ATTR) === '1';
    const previousTooltip = trigger.getAttribute(PREV_TOOLTIP_VALUE_ATTR) ?? '';
    if (hadTooltip) {
      trigger.setAttribute('io-tooltip', previousTooltip);
    } else {
      trigger.removeAttribute('io-tooltip');
    }

    const hadPlacement = trigger.getAttribute(PREV_PLACEMENT_HAD_ATTR) === '1';
    const previousPlacement = trigger.getAttribute(PREV_PLACEMENT_VALUE_ATTR) ?? '';
    if (hadPlacement) {
      trigger.setAttribute('io-tooltip-placement', previousPlacement);
    } else {
      trigger.removeAttribute('io-tooltip-placement');
    }

    const hadTheme = trigger.getAttribute(PREV_THEME_HAD_ATTR) === '1';
    const previousTheme = trigger.getAttribute(PREV_THEME_VALUE_ATTR) ?? '';
    if (hadTheme) {
      trigger.setAttribute('io-tooltip-theme', previousTheme);
    } else {
      trigger.removeAttribute('io-tooltip-theme');
    }

    trigger.removeAttribute(PREV_TOOLTIP_HAD_ATTR);
    trigger.removeAttribute(PREV_TOOLTIP_VALUE_ATTR);
    trigger.removeAttribute(PREV_PLACEMENT_HAD_ATTR);
    trigger.removeAttribute(PREV_PLACEMENT_VALUE_ATTR);
    trigger.removeAttribute(PREV_THEME_HAD_ATTR);
    trigger.removeAttribute(PREV_THEME_VALUE_ATTR);
  }

  private clearTriggerAttributes() {
    if (!this.trigger) return;
    this.restoreTriggerAttributes(this.trigger);
    this.trigger = undefined;
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
