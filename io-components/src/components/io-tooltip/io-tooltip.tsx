import { Component, Prop, Element, Host, Watch, h } from '@stencil/core';

import type { IoTooltipPlacement } from './types';

const PREV_TOOLTIP_VALUE_ATTR = 'data-io-tooltip-prev-value';
const PREV_TOOLTIP_HAD_ATTR = 'data-io-tooltip-prev-had';
const PREV_PLACEMENT_VALUE_ATTR = 'data-io-tooltip-placement-prev-value';
const PREV_PLACEMENT_HAD_ATTR = 'data-io-tooltip-placement-prev-had';

/**
 * io-tooltip
 * ===========
 * Compatibility wrapper around the global [io-tooltip] attribute API.
 *
 * New usage should place `io-tooltip` and `io-tooltip-placement` attributes
 * directly on the trigger element. This wrapper is kept to avoid breaking
 * existing markup and simply maps props to attributes on the first child.
 *
 * @example
 * <io-tooltip content="More information">
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

    trigger.removeAttribute(PREV_TOOLTIP_HAD_ATTR);
    trigger.removeAttribute(PREV_TOOLTIP_VALUE_ATTR);
    trigger.removeAttribute(PREV_PLACEMENT_HAD_ATTR);
    trigger.removeAttribute(PREV_PLACEMENT_VALUE_ATTR);
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
