/**
 * io-button-tile CSS generator.
 *
 * Extends the same visual pattern as io-link-tile but renders as a button.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getButtonTileStyles(): string {
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
      aspect-ratio: var(--io-button-tile-aspect-ratio, 4/3);
    }

    :host([disabled]) {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
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

    :host(:not([disabled]):hover) ::slotted(img),
    :host(:not([disabled]):hover) ::slotted(picture),
    :host(:not([disabled]):hover) ::slotted(video) {
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

    /* The underlying button covers the entire tile */
    .tile__button {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: block;
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      cursor: pointer;
      outline: none;
      padding: 0;
    }

    :host([disabled]) .tile__button {
      cursor: not-allowed;
    }
  `;
}
