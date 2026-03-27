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
          onIoChange?: (e: CustomEvent<string>) => void;
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
          onIoOpen?: (e: CustomEvent<void>) => void;
          onIoClose?: (e: CustomEvent<void>) => void;
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
          onIoToastDismiss?: (e: CustomEvent<void>) => void;
        },
        HTMLElement
      >;
    }
  }
}
