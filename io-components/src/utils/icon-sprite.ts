/**
 * io Design System — Icon Sprite Utility
 * ==========================================
 * Implements a lazy SVG sprite deduplication strategy for io-icon.
 *
 * Instead of stamping the full SVG markup on every io-icon instance,
 * each unique icon name is injected once as a <symbol> inside a hidden
 * <svg> appended to document.body. Subsequent io-icon instances for the
 * same name simply reference that symbol via <use href="#io-icon-{name}">.
 *
 * Cross-shadow-root compatibility: the sprite container lives in the
 * light DOM (document.body), so <use href="#..."> inside any shadow root
 * can resolve the symbol ID. This is the standard SVG sprite pattern for
 * Web Components.
 *
 * SSR guard: all functions are no-ops when typeof document === 'undefined'.
 */

import type { IoIconName } from './icons';
import { ICON_NODES } from './icons';

const SPRITE_CONTAINER_ID = 'io-icon-sprite';

function getSpriteContainer(): SVGSVGElement | null {
  if (typeof document === 'undefined') return null;
  return document.getElementById(SPRITE_CONTAINER_ID) as SVGSVGElement | null;
}

function createSpriteContainer(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = SPRITE_CONTAINER_ID;
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  document.body.appendChild(svg);
  return svg;
}

/**
 * Ensure that the <symbol id="io-icon-{name}"> for a given icon name
 * exists in the document-level sprite container. If the symbol already
 * exists, this is a fast no-op (one getElementById call). Otherwise it
 * creates the sprite container if needed and injects the symbol.
 */
export function ensureIconSymbol(name: IoIconName): void {
  if (typeof document === 'undefined') return;

  const symbolId = `io-icon-${name}`;
  if (document.getElementById(symbolId)) return;

  const nodes = ICON_NODES[name];
  if (!nodes) return;

  const container = getSpriteContainer() ?? createSpriteContainer();

  const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
  symbol.id = symbolId;
  symbol.setAttribute('viewBox', '0 0 24 24');
  symbol.setAttribute('fill', 'none');
  symbol.setAttribute('stroke', 'currentColor');
  symbol.setAttribute('stroke-width', '2');
  symbol.setAttribute('stroke-linecap', 'round');
  symbol.setAttribute('stroke-linejoin', 'round');

  for (const [tag, attrs] of nodes) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, String(v));
    }
    symbol.appendChild(el);
  }

  container.appendChild(symbol);
}

/**
 * Inject all icon symbols into the document-level sprite container at once.
 * Called from global/app.ts as a prefetch strategy for apps that render
 * many icons on first paint. Guards against SSR and double-injection.
 */
export function injectIconSprite(): void {
  if (typeof document === 'undefined') return;

  for (const name of Object.keys(ICON_NODES) as IoIconName[]) {
    ensureIconSymbol(name);
  }
}
