/**
 * io-file-upload CSS-in-JS style generator.
 *
 * Returns a <style> string for the file upload component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getFileUploadStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Visually hidden (screen reader only) ───────────── */

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* ── Hidden native file input ────────────────────────── */

    .file-upload__input {
      position: absolute;
      opacity: 0;
      width: 1px;
      height: 1px;
      pointer-events: none;
    }

    /* ── Drop zone ───────────────────────────────────────── */

    .file-upload__zone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--io-space-2);
      padding: var(--io-space-6);
      border: 2px dashed var(--io-border);
      border-radius: var(--io-border-radius-sm);
      background: var(--io-bg-base);
      cursor: pointer;
      text-align: center;
      transition: border-color var(--io-motion-base), background var(--io-motion-base);
      outline: none;
    }

    .file-upload__zone:focus-visible {
      box-shadow: var(--io-focus-ring-active);
      outline-offset: 2px;
    }

    @media (hover: hover) and (pointer: fine) {
      .file-upload__zone:hover:not(.file-upload__zone--disabled) {
        border-color: var(--io-color-primary);
        background: var(--io-bg-raised);
      }
    }

    .file-upload__zone--drag-over {
      border-color: var(--io-color-primary);
      background: var(--io-bg-raised);
    }

    .file-upload__zone--error {
      border-color: var(--io-border-error);
    }

    .file-upload__zone--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
      cursor: default;
    }

    /* ── Upload icon ─────────────────────────────────────── */

    .file-upload__icon {
      width: 40px;
      height: 40px;
      color: var(--io-text-secondary);
      flex-shrink: 0;
    }

    .file-upload__zone--drag-over .file-upload__icon {
      color: var(--io-color-primary);
    }

    /* ── Zone label ──────────────────────────────────────── */

    .file-upload__label {
      font-size: var(--io-font-size-base);
      font-weight: 600;
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
    }

    .file-upload__sublabel {
      font-size: var(--io-font-size-sm);
      color: var(--io-text-secondary);
      line-height: var(--io-line-height-normal);
    }

    /* ── Helper / error messages ─────────────────────────── */

    .file-upload__error {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .file-upload__helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    /* ── File list ───────────────────────────────────────── */

    .file-upload__list {
      list-style: none;
      margin: var(--io-space-3) 0 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--io-space-2);
    }

    .file-upload__file {
      display: flex;
      align-items: center;
      gap: var(--io-space-2);
      padding: var(--io-space-2) var(--io-space-3);
      border-radius: var(--io-border-radius-sm);
      border: 1px solid var(--io-border);
      background: var(--io-bg-raised);
    }

    .file-upload__file-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--io-text-secondary);
    }

    .file-upload__file-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .file-upload__file-name {
      font-size: var(--io-font-size-sm);
      font-weight: 500;
      color: var(--io-text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-upload__file-size {
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    .file-upload__remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--io-border-radius-xs);
      background: transparent;
      cursor: pointer;
      color: var(--io-text-secondary);
      flex-shrink: 0;
      transition: color var(--io-motion-fast), background var(--io-motion-fast);
      outline: none;
    }

    .file-upload__remove:focus-visible {
      box-shadow: var(--io-focus-ring-active);
    }

    @media (hover: hover) and (pointer: fine) {
      .file-upload__remove:hover {
        color: var(--io-color-error);
        background: var(--io-color-error-soft);
      }
    }

    .file-upload__remove-icon {
      width: 16px;
      height: 16px;
      pointer-events: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .file-upload__zone,
      .file-upload__remove {
        transition: none;
      }
    }
  `;
}
