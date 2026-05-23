import { Component, Prop, Event, EventEmitter, Element, Host, State, h } from '@stencil/core';

import { getFileUploadStyles } from './io-file-upload-styles';
import { formatFileSize, validateFile } from './io-file-upload-utils';

import type { IoFileSelectDetail, IoFileRejectDetail } from './types';

/**
 * io-file-upload
 * ==============
 * Accessible file upload control with drag-and-drop zone,
 * click-to-browse, file type/size validation, and a removable file list.
 *
 * @example
 * <io-file-upload label="Upload documents" accept=".pdf,.docx" multiple />
 * <io-file-upload label="Profile photo" accept="image/*" max-file-size="2097152" />
 */
@Component({
  tag: 'io-file-upload',
  shadow: { delegatesFocus: true },
})
export class IoFileUpload {
  @Element() el!: HTMLElement;

  // ── Private refs ─────────────────────────────────────────

  private inputEl?: HTMLInputElement;
  private fallbackId!: string;
  private errorId!: string;
  private helperId!: string;
  private liveRegionId!: string;

  // ── Props ─────────────────────────────────────────────────────

  /** Visible label for the drop zone — also the accessible name */
  @Prop() label!: string;

  /** Accepted MIME types or file extensions, comma-separated. Defaults to all files. */
  @Prop() accept: string = '*';

  /** Allow multiple file selection */
  @Prop() multiple: boolean = false;

  /** Maximum file size in bytes. Undefined means no limit. */
  @Prop() maxFileSize: number | undefined;

  /** Disables all interactions */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Optional hint text shown below the drop zone */
  @Prop() helperText: string | undefined;

  /** Puts the component in error state */
  @Prop({ reflect: true }) error: boolean = false;

  /** Error message shown when error is true */
  @Prop() errorMessage: string | undefined;

  /** Form field name */
  @Prop() name: string | undefined;

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when valid files are selected or dropped */
  @Event() fileSelect!: EventEmitter<IoFileSelectDetail>;

  /** Emitted for each rejected file with the reason */
  @Event() fileReject!: EventEmitter<IoFileRejectDetail>;

  // ── State ─────────────────────────────────────────────────────

  @State() selectedFiles: File[] = [];
  @State() isDragOver: boolean = false;
  @State() liveMessage: string = '';

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.errorId = `io-file-upload-${this.fallbackId}-error`;
    this.helperId = `io-file-upload-${this.fallbackId}-helper`;
    this.liveRegionId = `io-file-upload-${this.fallbackId}-live`;
  }

  // ── Private helpers ───────────────────────────────────────────

  private processFiles(files: FileList | File[]) {
    const fileArray = Array.from(files);
    const accepted: File[] = [];

    for (const file of fileArray) {
      const result = validateFile(file, this.accept, this.maxFileSize);
      if (result === 'ok') {
        accepted.push(file);
      } else {
        this.fileReject.emit({ file, reason: result });
      }
    }

    if (accepted.length > 0) {
      const filesToAdd = this.multiple ? accepted : [accepted[0]];
      if (this.multiple) {
        this.selectedFiles = [...this.selectedFiles, ...filesToAdd];
      } else {
        this.selectedFiles = [filesToAdd[0]];
      }
      this.fileSelect.emit({ files: filesToAdd });
      this.liveMessage =
        accepted.length === 1
          ? `${accepted[0].name} added.`
          : `${accepted.length} files added.`;
    }
  }

  private removeFile(index: number) {
    const file = this.selectedFiles[index];
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    this.liveMessage = `${file.name} removed.`;
  }

  private openFilePicker() {
    if (this.disabled) return;
    this.inputEl?.click();
  }

  private getZoneClass(): string {
    return [
      'file-upload__zone',
      this.isDragOver ? 'file-upload__zone--drag-over' : '',
      this.error ? 'file-upload__zone--error' : '',
      this.disabled ? 'file-upload__zone--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  private getDescribedBy(): string | undefined {
    const ids: string[] = [];
    if (this.error && this.errorMessage) ids.push(this.errorId);
    if (!this.error && this.helperText) ids.push(this.helperId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  }

  // ── Drag handlers ─────────────────────────────────────────────

  private handleDragEnter = (ev: DragEvent) => {
    if (this.disabled) return;
    ev.preventDefault();
    this.isDragOver = true;
  };

  private handleDragOver = (ev: DragEvent) => {
    if (this.disabled) return;
    ev.preventDefault();
    this.isDragOver = true;
  };

  private handleDragLeave = (ev: DragEvent) => {
    if (this.disabled) return;
    // Only clear drag-over if leaving the zone itself (not child elements)
    const zone = ev.currentTarget as HTMLElement;
    const relatedTarget = ev.relatedTarget as Node | null;
    if (!zone.contains(relatedTarget)) {
      this.isDragOver = false;
    }
  };

  private handleDrop = (ev: DragEvent) => {
    if (this.disabled) return;
    ev.preventDefault();
    this.isDragOver = false;
    const files = ev.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    }
  };

  // ── Click / keyboard handlers ─────────────────────────────────

  private handleZoneClick = () => {
    this.openFilePicker();
  };

  private handleZoneKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.openFilePicker();
    }
  };

  private handleInputChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFiles(input.files);
    }
    // Reset input so the same file can be re-selected
    input.value = '';
  };

  // ── SVG icons (inline, aria-hidden) ──────────────────────────

  private renderUploadIcon() {
    return (
      <svg
        class="file-upload__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    );
  }

  private renderFileIcon() {
    return (
      <svg
        class="file-upload__file-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    );
  }

  private renderRemoveIcon() {
    return (
      <svg
        class="file-upload__remove-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }

  // ── Render ────────────────────────────────────────────────────

  render() {
    const { label, accept, multiple, disabled, error, errorMessage, helperText, name } = this;
    const describedBy = this.getDescribedBy();
    const acceptValue = accept === '*' ? undefined : accept;

    return (
      <Host>
        <style>{getFileUploadStyles()}</style>

        {/* Visually-hidden live region for screen reader announcements */}
        <div
          id={this.liveRegionId}
          class="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {this.liveMessage}
        </div>

        {/* Hidden native file input */}
        <input
          ref={(el) => (this.inputEl = el as HTMLInputElement)}
          class="file-upload__input"
          type="file"
          name={name}
          accept={acceptValue}
          multiple={multiple}
          disabled={disabled}
          aria-hidden="true"
          tabindex={-1}
          onChange={this.handleInputChange}
        />

        {/* Drop zone */}
        <div
          class={this.getZoneClass()}
          role="button"
          tabindex={disabled ? -1 : 0}
          aria-label={label}
          aria-disabled={disabled ? 'true' : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
          onClick={this.handleZoneClick}
          onKeyDown={this.handleZoneKeyDown}
        >
          {this.renderUploadIcon()}
          <span class="file-upload__label">{label}</span>
          <span class="file-upload__sublabel">
            {this.isDragOver ? 'Drop files here' : 'Click to browse or drag & drop'}
          </span>
        </div>

        {/* Error message */}
        {error && errorMessage && (
          <p id={this.errorId} class="file-upload__error" role="alert">
            {errorMessage}
          </p>
        )}

        {/* Helper text */}
        {!error && helperText && (
          <p id={this.helperId} class="file-upload__helper">
            {helperText}
          </p>
        )}

        {/* Selected file list */}
        {this.selectedFiles.length > 0 && (
          <ul class="file-upload__list" aria-label="Selected files">
            {this.selectedFiles.map((file, index) => (
              <li key={`${file.name}-${index}`} class="file-upload__file">
                {this.renderFileIcon()}
                <div class="file-upload__file-info">
                  <span class="file-upload__file-name">{file.name}</span>
                  <span class="file-upload__file-size">{formatFileSize(file.size)}</span>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    class="file-upload__remove"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => this.removeFile(index)}
                  >
                    {this.renderRemoveIcon()}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Host>
    );
  }
}
