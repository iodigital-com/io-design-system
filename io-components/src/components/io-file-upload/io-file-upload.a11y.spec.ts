import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-file-upload
 *
 * Tests the native HTML patterns rendered inside io-file-upload's Shadow DOM.
 * The drop zone uses role="button" with aria-label, aria-disabled, and aria-invalid.
 * The live region uses aria-live="polite" for screen reader announcements.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-file-upload — a11y (ARIA patterns)', () => {
  it('drop zone with aria-label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <div
          role="button"
          tabindex="0"
          aria-label="Upload documents"
        >
          Click to browse or drag &amp; drop
        </div>
        <div aria-live="polite" aria-atomic="true"></div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('drop zone in error state has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <div
          role="button"
          tabindex="0"
          aria-label="Upload documents"
          aria-invalid="true"
          aria-describedby="upload-error"
        >
          Click to browse or drag &amp; drop
        </div>
        <p id="upload-error" role="alert">File type not supported</p>
        <div aria-live="polite" aria-atomic="true"></div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('drop zone in disabled state has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <div
          role="button"
          tabindex="-1"
          aria-label="Upload documents"
          aria-disabled="true"
        >
          Click to browse or drag &amp; drop
        </div>
        <div aria-live="polite" aria-atomic="true"></div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('drop zone with helper text linked via aria-describedby has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <div
          role="button"
          tabindex="0"
          aria-label="Upload documents"
          aria-describedby="upload-helper"
        >
          Click to browse or drag &amp; drop
        </div>
        <p id="upload-helper">Accepted formats: PDF, DOCX. Max size: 10 MB.</p>
        <div aria-live="polite" aria-atomic="true"></div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('file list with remove buttons has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <div
          role="button"
          tabindex="0"
          aria-label="Upload documents"
        >
          Click to browse or drag &amp; drop
        </div>
        <ul aria-label="Selected files">
          <li>
            <span>report.pdf</span>
            <span>124 KB</span>
            <button type="button" aria-label="Remove report.pdf">
              <span aria-hidden="true">&times;</span>
            </button>
          </li>
        </ul>
        <div aria-live="polite" aria-atomic="true"></div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
