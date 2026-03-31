/**
 * io Digital Web Component JSX type augmentations.
 *
 * ⚠️  GOVERNANCE (RULE 3): When adding a new component (io-foo), add its
 *     interface here AND add 'io-foo' to IoTagNames in generator.tsx.
 *     NEVER use @ts-expect-error as a workaround.
 *
 * Attribute names use kebab-case as per HTML/Web Component convention.
 * Boolean attributes are typed as boolean | string | undefined.
 */

import type { HTMLAttributes, DetailedHTMLProps } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // ── io-button ──────────────────────────────────────────
      'io-button': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          variant?: 'solid' | 'ghost' | 'link';
          color?: 'blue' | 'white' | 'black' | 'antraciet' | 'orange' | 'pink' | 'rouge' | 'yellow' | 'beige' | 'grey';
          size?: 'sm' | 'md' | 'lg';
          type?: 'button' | 'submit' | 'reset';
          href?: string;
          target?: string;
          rel?: string;
          disabled?: boolean;
          loading?: boolean;
          'full-width'?: boolean;
          label?: string;
          arrow?: 'forward' | 'back' | 'down';
          'arrow-placement'?: 'left' | 'right';
        },
        HTMLElement
      >;

      // ── io-badge ──────────────────────────────────────────
      'io-badge': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          variant?: 'beige' | 'blue' | 'dark' | 'orange' | 'rouge' | 'success' | 'warning' | 'error' | 'outline';
        },
        HTMLElement
      >;

      // ── io-accordion ─────────────────────────────────────
      'io-accordion': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          /** Open state */
          open?: boolean;
          /** Heading text fallback */
          heading?: string;
          /** Semantic heading tag */
          'heading-tag'?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
          /** Prevents interaction */
          disabled?: boolean;
          onUpdate?: (ev: CustomEvent<{ open: boolean }>) => void;
        },
        HTMLElement
      >;

      // ── io-input ──────────────────────────────────────────
      'io-input': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          label?: string;
          type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
          name?: string;
          value?: string;
          placeholder?: string;
          required?: boolean;
          disabled?: boolean;
          error?: boolean;
          'error-message'?: string;
          'helper-text'?: string;
          'max-length'?: number;
          autocomplete?: string;
        },
        HTMLElement
      >;

      // ── io-carousel ──────────────────────────────────────
      'io-carousel': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          /** aria-label for previous nav button */
          'prev-label'?: string;
          /** aria-label for next nav button */
          'next-label'?: string;
          /** number of slides to move per step, or auto */
          'slides-per-page'?: number | 'auto';
          /** show or hide pagination bullets */
          pagination?: boolean;
          /** rewind navigation from ends */
          rewind?: boolean;
          /** zero-based active slide index */
          'active-slide-index'?: number;
        },
        HTMLElement
      >;

      // ── io-link ───────────────────────────────────────────
      'io-link': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          variant?: 'standalone' | 'inline';
          color?: 'blue' | 'black' | 'white';
          href?: string;
          target?: string;
          rel?: string;
          external?: boolean;
          disabled?: boolean;
        },
        HTMLElement
      >;

      // ── io-pagination ────────────────────────────────────
      'io-pagination': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          /** Current 1-based active page */
          page?: number;
          /** Total number of pages */
          'total-pages'?: number;
          /** aria-label for previous page button */
          'prev-label'?: string;
          /** aria-label for next page button */
          'next-label'?: string;
          onPageChange?: (ev: CustomEvent<{ page: number }>) => void;
        },
        HTMLElement
      >;

      // ── io-tag ────────────────────────────────────────────
      'io-tag': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          selected?: boolean;
          removable?: boolean;
          disabled?: boolean;
          size?: 'sm' | 'md';
          color?: 'default' | 'blue' | 'beige';
        },
        HTMLElement
      >;

      // ── io-checkbox ───────────────────────────────────────
      'io-checkbox': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          label?: string;
          name?: string;
          value?: string;
          checked?: boolean;
          indeterminate?: boolean;
          required?: boolean;
          disabled?: boolean;
          error?: boolean;
          'error-message'?: string;
          'helper-text'?: string;
        },
        HTMLElement
      >;

      // ── io-select ─────────────────────────────────────────
      'io-select': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          label?: string;
          name?: string;
          value?: string;
          placeholder?: string;
          options?: unknown;
          required?: boolean;
          disabled?: boolean;
          error?: boolean;
          'error-message'?: string;
          'helper-text'?: string;
        },
        HTMLElement
      >;

      // ── io-textarea ───────────────────────────────────────
      'io-textarea': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          label?: string;
          name?: string;
          value?: string;
          placeholder?: string;
          required?: boolean;
          disabled?: boolean;
          error?: boolean;
          'error-message'?: string;
          'helper-text'?: string;
          'max-length'?: number;
          rows?: number;
          autocomplete?: string;
          resize?: 'none' | 'vertical' | 'auto';
        },
        HTMLElement
      >;

      // ── io-spinner ────────────────────────────────────────
      'io-spinner': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          size?: 'sm' | 'md' | 'lg';
          color?: 'primary' | 'white' | 'current';
          label?: string;
        },
        HTMLElement
      >;

      // ── io-radio ──────────────────────────────────────────
      'io-radio': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          label?: string;
          name?: string;
          value?: string;
          checked?: boolean;
          required?: boolean;
          disabled?: boolean;
          error?: boolean;
          'error-message'?: string;
          'helper-text'?: string;
        },
        HTMLElement
      >;

      // ── io-tabs ───────────────────────────────────────────
      'io-tabs': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          tabs?: unknown;
          'active-tab'?: string;
          activeTab?: string;
          onChange?: (e: CustomEvent<string>) => void;
        },
        HTMLElement
      >;

      // ── io-modal ──────────────────────────────────────────
      'io-modal': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          open?: boolean;
          heading?: string;
          size?: 'sm' | 'md' | 'lg';
          'close-on-backdrop'?: boolean;
          onOpen?: (e: CustomEvent<void>) => void;
          onClose?: (e: CustomEvent<void>) => void;
        },
        HTMLElement
      >;

      // ── io-tooltip ────────────────────────────────────────
      'io-tooltip': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          content?: string;
          placement?: 'top' | 'bottom' | 'left' | 'right';
        },
        HTMLElement
      >;

      // ── io-toast ──────────────────────────────────────────
      'io-toast': DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;

      // ── io-toast-item ─────────────────────────────────────
      'io-toast-item': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          text?: string;
          variant?: 'neutral' | 'success' | 'error' | 'warning' | 'info';
          onDismiss?: (e: CustomEvent<void>) => void;
        },
        HTMLElement
      >;
    }
  }
}
