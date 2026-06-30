/**
 * io-link-tile CSS generator.
 *
 * Returns a <style> string injected into the Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getLinkTileStyles(): string {
  return `
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      border-radius: var(--io-border-radius-md);
      background-color: var(--io-bg-surface);
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      aspect-ratio: var(--io-link-tile-aspect-ratio, 4/3);
    }

    :host(:focus-visible) {
      box-shadow: var(--io-focus-ring-active);
    }

    .tile__media {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    ::slotted(img),
    ::slotted(picture),
    ::slotted(video) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform var(--io-motion-duration-md) var(--io-motion-easing-standard);
    }

    :host(:hover) ::slotted(img),
    :host(:hover) ::slotted(picture),
    :host(:hover) ::slotted(video) {
      transform: scale(1.04);
    }

    .tile__gradient {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    :host([gradient]) .tile__gradient {
      background: linear-gradient(
        to bottom,
        transparent 30%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }

    .tile__overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      padding: var(--io-space-5);
      box-sizing: border-box;
      pointer-events: none;
    }

    :host([align="top"]) .tile__overlay {
      justify-content: flex-start;
    }

    :host([align="bottom"]) .tile__overlay,
    .tile__overlay {
      justify-content: flex-end;
    }

    .tile__header {
      margin-bottom: auto;
    }

    :host([align="bottom"]) .tile__header {
      margin-bottom: 0;
      order: 3;
    }

    .tile__footer {
      margin-top: var(--io-space-2);
    }

    .tile__label {
      display: block;
      font-family: var(--io-font-primary);
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-color-white, #fff);
      line-height: var(--io-line-height-tight);
      margin-bottom: var(--io-space-1);
    }

    :host([size="sm"]) .tile__label { font-size: var(--io-text-sm); }
    :host([size="md"]) .tile__label,
    .tile__label               { font-size: var(--io-text-md); }
    :host([size="lg"]) .tile__label { font-size: var(--io-text-lg); }

    :host([weight="regular"])  .tile__label { font-weight: var(--io-font-weight-regular); }
    :host([weight="medium"])   .tile__label { font-weight: var(--io-font-weight-medium); }
    :host([weight="semibold"]) .tile__label { font-weight: var(--io-font-weight-semibold); }
    :host([weight="bold"])     .tile__label { font-weight: var(--io-font-weight-bold); }

    .tile__description {
      display: block;
      font-family: var(--io-font-primary);
      font-size: var(--io-text-sm);
      font-weight: var(--io-font-weight-regular);
      color: rgba(255, 255, 255, 0.85);
      line-height: var(--io-line-height-normal);
    }

    .tile__action {
      pointer-events: auto;
      display: inline-flex;
      margin-top: var(--io-space-3);
    }

    /* The underlying anchor covers the entire tile for the clickable area */
    .tile__link {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: block;
      outline: none;
    }

    .tile__link:focus {
      outline: none;
    }
  `;
}
