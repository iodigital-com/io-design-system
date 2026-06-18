import { Component, Prop, Host, State, h } from '@stencil/core';

import { getDividerStyles } from './io-divider-styles';

import type { IoDividerColor, IoDividerOrientation } from './types';

/**
 * io-divider
 * ==========
 * Visual separator between sections of content.
 *
 * Horizontal (default): renders as `<hr>` (implicit role="separator", no explicit attribute needed).
 * Vertical: renders as `<div role="separator" aria-orientation="vertical">`.
 * With label: renders a flex row with a centered text label flanked by lines.
 *
 * @example
 * <io-divider />
 * <io-divider orientation="vertical" />
 * <io-divider label="or" />
 * <io-divider color="subtle" />
 * <io-divider color="strong" />
 * <io-divider>Custom separator content</io-divider>
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
   * Color contrast level for the divider line.
   * - `subtle`  — 50% opacity of the standard border color; very light separation.
   * - `default` — `var(--io-border)` (standard decorative border token; current behavior).
   * - `strong`  — `var(--io-border-hover)` (more prominent separation).
   *
   * Dark mode: all variants resolve automatically via existing semantic tokens.
   */
  @Prop({ reflect: true }) color: IoDividerColor = 'default';

  /**
   * Optional label centered within the divider line.
   * Common use case: "or", "and", date headings.
   * When set, the component uses a flex row layout regardless of orientation.
   * Alternatively, use the default slot for rich content (overrides label prop text).
   */
  @Prop() label: string | undefined;

  // ── State ────────────────────────────────────────────────────

  /**
   * Tracks whether the default slot has content.
   * When true, the slot replaces the label prop text while keeping aria-label.
   */
  @State() private hasSlotContent = false;

  // ── Methods ──────────────────────────────────────────────────

  private handleSlotchange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasSlotContent = slot.assignedNodes().length > 0;
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { orientation, label, hasSlotContent } = this;
    const isVertical = orientation === 'vertical';

    if (label) {
      // The labeled variant always renders a horizontal flex layout regardless
      // of the orientation prop. aria-orientation is therefore always
      // "horizontal" — setting it to "vertical" here would be misleading to AT.
      return (
        <Host>
          <style>{getDividerStyles()}</style>
          <div
            class="divider divider--labeled"
            role="separator"
            aria-orientation="horizontal"
            aria-label={label || undefined}
          >
            <span class="divider__line" aria-hidden="true" />
            <span class="divider__label">
              <slot onSlotchange={this.handleSlotchange}>
                {!hasSlotContent && label}
              </slot>
            </span>
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

    // Default horizontal — use semantic <hr> element.
    // <hr> has an implicit role="separator"; no need for an explicit role attribute.
    return (
      <Host>
        <style>{getDividerStyles()}</style>
        <hr class="divider" />
      </Host>
    );
  }
}
