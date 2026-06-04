import { Component, Host, Prop, State, Watch, h } from '@stencil/core';

import type { IoIconName } from '../../utils/icons';
import { getIconSvg, escapeAttr } from '../../utils/icons';
import { getIconStyles } from './io-icon-styles';
import type { IoIconSize } from './types';

const svgCache = new Map<string, string>();

/**
 * io-icon
 * ========
 * Renders a Lucide icon as an inline SVG within Shadow DOM.
 *
 * Sizing is controlled by the `size` prop which maps to --io-icon-size-*
 * CSS custom properties. The SVG inherits `color: currentColor` so it
 * adopts the text color of its parent.
 *
 * @example
 * <io-icon name="check" size="md"></io-icon>
 * <io-icon name="arrow-right" size="sm" label="Navigate forward"></io-icon>
 * <io-icon icon-source="/assets/custom.svg" label="Custom icon"></io-icon>
 */
@Component({
  tag: 'io-icon',
  shadow: true,
})
export class IoIcon {
  /** Name of the Lucide icon to render. */
  @Prop({ reflect: true }) name!: IoIconName;

  /** Visual size of the icon. Defaults to 'md' (20px). */
  @Prop({ reflect: true }) size: IoIconSize = 'md';

  /** Accessible label. When provided, replaces aria-hidden with role="img" + aria-label. */
  @Prop() label?: string;

  /** URL of a custom SVG to render instead of the built-in registry. Overrides name. */
  @Prop() iconSource?: string;

  /** Mirror the icon horizontally. Useful for explicit RTL overrides. */
  @Prop({ reflect: true }) flip = false;

  @State() private fetchedSvg?: string;

  @Watch('iconSource')
  async loadIconSource(url?: string) {
    if (!url) {
      this.fetchedSvg = undefined;
      return;
    }
    if (svgCache.has(url)) {
      this.fetchedSvg = svgCache.get(url);
      return;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
      const text = await res.text();
      svgCache.set(url, text);
      this.fetchedSvg = text;
    } catch {
      this.fetchedSvg = undefined;
    }
  }

  componentWillLoad() {
    if (this.iconSource) return this.loadIconSource(this.iconSource);
  }

  private patchAria(svg: string): string {
    if (!this.label) return svg;
    const safe = escapeAttr(this.label);
    return svg.replace('aria-hidden="true"', `role="img" aria-label="${safe}"`);
  }

  render() {
    if (this.iconSource) {
      if (!this.fetchedSvg) return null;
      return (
        <Host>
          <style>{getIconStyles()}</style>
          <span innerHTML={this.patchAria(this.fetchedSvg)} />
        </Host>
      );
    }

    const svg = getIconSvg(this.name);
    if (!svg) return null;

    return (
      <Host>
        <style>{getIconStyles()}</style>
        <span innerHTML={this.patchAria(svg)} />
      </Host>
    );
  }
}
