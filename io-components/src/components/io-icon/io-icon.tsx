import { Component, Host, Prop, State, Watch, h } from '@stencil/core';

import type { IoIconName } from '../../utils/icons';
import { getIconSvg, getIconUseRef, ensureIconSprite, escapeAttr } from '../../utils/icons';
import { getIconStyles } from './io-icon-styles';
import type { IoIconColor, IoIconSize } from './types';

const svgCache = new Map<string, string>();

const COLOR_TOKEN_MAP: Record<Exclude<IoIconColor, 'inherit'>, string> = {
  primary: 'var(--io-color-primary)',
  'contrast-high': 'var(--io-text-primary)',
  'contrast-medium': 'var(--io-text-secondary)',
  success: 'var(--io-color-success)',
  warning: 'var(--io-color-warning)',
  error: 'var(--io-color-error)',
  info: 'var(--io-color-info)',
};

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
  shadow: { delegatesFocus: true },
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

  /** Semantic color of the icon. Maps to design-system tokens. Defaults to 'inherit' (currentColor). */
  @Prop({ reflect: true }) color: IoIconColor = 'inherit';

  /** Mirror the icon horizontally. Useful for explicit RTL overrides. */
  @Prop({ reflect: true }) flip = false;

  /** Forces the host element width to match the icon size. Useful for consistent column alignment in lists and navigation menus. */
  @Prop({ reflect: true }) fixedWidth = false;

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

  private get hostStyle(): { '--io-icon-color': string } | undefined {
    if (this.color === 'inherit') return undefined;
    const token = COLOR_TOKEN_MAP[this.color as Exclude<IoIconColor, 'inherit'>];
    return token ? { '--io-icon-color': token } : undefined;
  }

  /** Size in px used for width/height attributes on the rendered SVG. */
  private get svgSize(): number {
    const sizeMap: Record<string, number> = { sm: 16, md: 20, lg: 24 };
    return sizeMap[this.size] ?? 20;
  }

  render() {
    if (this.iconSource) {
      if (!this.fetchedSvg) return null;
      return (
        <Host style={this.hostStyle}>
          <style>{getIconStyles()}</style>
          <span innerHTML={this.patchAria(this.fetchedSvg)} />
        </Host>
      );
    }

    // Named icon: use sprite deduplication when the document is available.
    // ensureIconSprite injects the <symbol> once into the document body so all
    // instances of the same icon share one copy of the SVG path data.
    // Falls back to inline SVG (SSR / jsdom test environments).
    const size = this.svgSize;
    const spriteAvailable = ensureIconSprite(this.name);
    const svgMarkup = spriteAvailable
      ? getIconUseRef(this.name, size, this.label)
      : (() => {
          const svg = getIconSvg(this.name, size);
          if (!svg) return null;
          return this.patchAria(svg);
        })();

    if (!svgMarkup) return null;

    return (
      <Host style={this.hostStyle}>
        <style>{getIconStyles()}</style>
        <span innerHTML={svgMarkup} />
      </Host>
    );
  }
}
