import { Component, Prop, Host, h } from '@stencil/core';
import type { IoBadgeVariant } from './types';

/**
 * io-badge
 * =========
 * Small label/tag for categorizing content or showing status.
 *
 * @example
 * <io-badge variant="blue">New</io-badge>
 * <io-badge variant="success">Active</io-badge>
 * <io-badge variant="error">Error</io-badge>
 */
@Component({
  tag: 'io-badge',
  shadow: true,
})
export class IoBadge {
  /** Color/semantic variant */
  @Prop({ reflect: true }) variant: IoBadgeVariant = 'blue';

  render() {
    return (
      <Host>
        <style>{this.getStyles()}</style>
        <span class={`badge badge--${this.variant}`}>
          <slot />
        </span>
      </Host>
    );
  }

  private getStyles(): string {
    return `
      :host {
        display: inline-flex;
        font-family: var(--io-font-primary);
      }

      .badge {
        display: inline-flex;
        align-items: center;
        padding: var(--io-space-1) var(--io-space-3);
        font-size: var(--io-font-size-xs);
        font-weight: var(--io-font-weight-semibold);
        line-height: var(--io-line-height-tight);
        border-radius: var(--io-border-radius-pill);
        border: 1px solid transparent;
        white-space: nowrap;
      }

      .badge--blue {
        background-color: var(--io-accent-bg);
        color: var(--io-accent-text);
        border-color: color-mix(in srgb, var(--io-accent-text) 25%, transparent);
      }

      .badge--beige {
        background-color: var(--io-color-beige);
        color: var(--io-color-grey-6);
        border-color: var(--io-color-beige);
      }

      .badge--dark {
        background-color: var(--io-color-grey-6);
        color: var(--io-color-white);
        border-color: var(--io-color-grey-6);
      }

      .badge--orange {
        background-color: var(--io-color-orange);
        color: var(--io-color-white);
        border-color: var(--io-color-orange);
      }

      .badge--rouge {
        background-color: var(--io-color-rouge);
        color: var(--io-color-white);
        border-color: var(--io-color-rouge);
      }

      .badge--success {
        background-color: var(--io-color-success-soft);
        color: var(--io-color-success);
        border-color: var(--io-color-success);
      }

      .badge--warning {
        background-color: var(--io-color-warning-soft);
        color: var(--io-color-warning);
        border-color: var(--io-color-warning);
      }

      .badge--error {
        background-color: var(--io-color-error-soft);
        color: var(--io-color-error);
        border-color: var(--io-color-error);
      }

      .badge--outline {
        background-color: transparent;
        color: var(--io-text-primary);
        border-color: var(--io-border);
      }

      @media (prefers-reduced-motion: reduce) {
        .badge { transition: none; }
      }
    `;
  }
}
