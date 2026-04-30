import { Component, Prop, Host, h } from '@stencil/core';

import { getDividerStyles } from './io-divider-styles';

import type { IoDividerOrientation } from './types';

/**
 * io-divider
 * ==========
 * Visual separator between sections of content.
 *
 * Horizontal (default): renders as `<hr role="separator">`.
 * Vertical: renders as `<div role="separator" aria-orientation="vertical">`.
 * With label: renders a flex row with a centered text label flanked by lines.
 *
 * @example
 * <io-divider />
 * <io-divider orientation="vertical" />
 * <io-divider label="or" />
 */
@Component({
  tag: 'io-divider',
  shadow: true,
})
export class IoDivider {
  // ── Props ─────────────────────────────────────────────────────

  /**
   * Orientation of the separator.
   * `horizontal` (default) renders a horizontal rule.
   * `vertical` renders a vertical line (useful in flex row containers).
   */
  @Prop({ reflect: true }) orientation: IoDividerOrientation = 'horizontal';

  /**
   * Optional label centered within the divider line.
   * Common use case: "or", "and", date headings.
   * When set, the component uses a flex row layout regardless of orientation.
   */
  @Prop() label: string | undefined;

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { orientation, label } = this;
    const isVertical = orientation === 'vertical';

    if (label) {
      return (
        <Host>
          <style>{getDividerStyles()}</style>
          <div
            class="divider divider--labeled"
            role="separator"
            aria-orientation={orientation}
          >
            <span class="divider__line" aria-hidden="true" />
            <span class="divider__label">{label}</span>
            <span class="divider__line" aria-hidden="true" />
          </div>
        </Host>
      );
    }

    if (isVertical) {
      return (
        <Host>
          <style>{getDividerStyles()}</style>
          <div
            class="divider divider--vertical"
            role="separator"
            aria-orientation="vertical"
          />
        </Host>
      );
    }

    // Default horizontal — use semantic <hr> element
    return (
      <Host>
        <style>{getDividerStyles()}</style>
        <hr class="divider" role="separator" />
      </Host>
    );
  }
}
