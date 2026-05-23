'use client';

import type { Metadata } from 'next';

import { SectionHeader, InlineCode, ApiTable } from '@/components/api/ApiPrimitives';
import { PageHeader } from '@/components/layout/PageHeader';

// Metadata cannot be exported from 'use client' pages — kept here as reference.
// Add to a parent layout.tsx if SSR metadata is required.
// export const metadata: Metadata = { ... };

// ── Public CSS API data ────────────────────────────────────────────────────────

const PUBLIC_API_GROUPS: Record<string, { cssVar: string; description: string }[]> = {
  'io-accordion': [
    { cssVar: '--io-accordion-max-height', description: 'Maximum height of an open accordion panel. Override to control how tall expanded content can grow before scrolling.' },
    { cssVar: '--io-accordion-icon-bar-thickness', description: 'Thickness of the +/− icon bars. Override to adjust the visual weight of the toggle icon.' },
    { cssVar: '--io-accordion-icon-bar-inset', description: 'Inset distance of the +/− icon bars from the edge of the icon container.' },
    { cssVar: '--io-accordion-icon-bar-axis-offset', description: 'Axis offset that centres the vertical/horizontal bars of the +/− icon.' },
    { cssVar: '--io-accordion-icon-horizontal-collapsed-side', description: 'Side value applied to the horizontal bar when the accordion is open, collapsing it to a point.' },
  ],
  'io-button': [
    { cssVar: '--io-button-xl-padding-y', description: 'Vertical padding for the xl button size.' },
    { cssVar: '--io-button-arrow-width-default', description: 'Width of the arrow icon in default (sm/md/lg) button sizes.' },
    { cssVar: '--io-button-arrow-height-default', description: 'Height of the arrow icon in default (sm/md/lg) button sizes.' },
    { cssVar: '--io-button-arrow-xl-width', description: 'Width of the arrow icon in the xl button size.' },
    { cssVar: '--io-button-arrow-xl-height', description: 'Height of the arrow icon in the xl button size.' },
    { cssVar: '--io-button-arrow-shift-forward', description: 'Translation distance of the forward/back arrow on hover.' },
    { cssVar: '--io-button-arrow-shift-down', description: 'Translation distance of the down-pointing arrow on hover.' },
    { cssVar: '--io-button-link-underline-height', description: 'Height of the animated underline on link-variant buttons.' },
    { cssVar: '--io-button-icon-padding', description: 'Padding for icon-only buttons. Override to adjust the icon button touch target area.' },
    { cssVar: '--io-button-spinner-border-width', description: 'Border width of the loading spinner ring inside a button.' },
    { cssVar: '--io-button-spinner-duration', description: 'Duration of one full loading spinner rotation.' },
  ],
  'io-button-group': [
    { cssVar: '--io-button-group-bg', description: 'Background color of unselected buttons in the group. Overridden in dark mode.' },
    { cssVar: '--io-button-group-color', description: 'Text color of unselected buttons in the group. Overridden in dark mode.' },
    { cssVar: '--io-button-group-border-width', description: 'Border width of each button in the group. Used for border collapse calculation.' },
    { cssVar: '--io-button-group-border-color', description: 'Border color of unselected buttons in the group. Overridden in dark mode.' },
    { cssVar: '--io-button-group-border-radius', description: 'Border radius applied to the outer corners of the first and last button.' },
    { cssVar: '--io-button-group-padding-y', description: 'Vertical padding for each button in the group.' },
    { cssVar: '--io-button-group-padding-x', description: 'Horizontal padding for each button in the group.' },
    { cssVar: '--io-button-group-font-size', description: 'Font size of the button group label text.' },
    { cssVar: '--io-button-group-active-bg', description: 'Background of the active/selected button in the group. Override to apply a custom brand active state.' },
    { cssVar: '--io-button-group-active-color', description: 'Text color of the active/selected button in the group.' },
    { cssVar: '--io-button-group-active-border', description: 'Border color of the active/selected button in the group.' },
    { cssVar: '--io-button-group-hover-bg', description: 'Background color of a hovered unselected button.' },
    { cssVar: '--io-button-group-disabled-opacity', description: 'Opacity applied to the entire group or an individual disabled button.' },
    { cssVar: '--io-button-group-min-height', description: 'Minimum height (touch target) for each button in the group.' },
    { cssVar: '--io-button-group-transition', description: 'Transition shorthand applied to button group buttons for smooth state changes.' },
  ],
  'io-carousel': [
    { cssVar: '--io-carousel-scrollbar-height', description: 'Height of the custom horizontal scrollbar track of the carousel. Override to adjust scrollbar visual weight.' },
  ],
  'io-checkbox': [
    { cssVar: '--io-checkbox-size', description: 'Width and height of the checkbox control area.' },
    { cssVar: '--io-checkbox-radius', description: 'Border radius of the checkbox control square.' },
    { cssVar: '--io-checkbox-border-width', description: 'Default border width of the checkbox control.' },
    { cssVar: '--io-checkbox-border-error-width', description: 'Border width applied to the checkbox control in an error state (2px satisfies WCAG 1.4.1).' },
    { cssVar: '--io-checkbox-icon-size', description: 'Size of the check/indeterminate icon inside the checkbox.' },
  ],
  'io-divider': [
    { cssVar: '--io-divider-color', description: 'Color of the divider line. Override to match your surface or accent color.' },
    { cssVar: '--io-divider-thickness', description: 'Thickness of the divider line.' },
    { cssVar: '--io-divider-gap', description: 'Gap between the divider line and the label text in a labeled divider.' },
    { cssVar: '--io-divider-label-size', description: 'Font size of the label in a labeled divider.' },
  ],
  'io-input': [
    { cssVar: '--io-input-border-width', description: 'Default border-bottom width of the input field underline.' },
    { cssVar: '--io-input-border-width-focus', description: 'Border-bottom width when the input field is focused.' },
    { cssVar: '--io-input-padding-y', description: 'Vertical padding of the input field.' },
    { cssVar: '--io-input-padding-right', description: 'Right padding of the input field, allowing space for icons.' },
    { cssVar: '--io-label-font-size', description: 'Font size of the floating label at rest.' },
    { cssVar: '--io-label-font-size-float', description: 'Font size of the floating label when it has floated above the field.' },
    { cssVar: '--io-label-font-weight', description: 'Font weight of the floating label.' },
  ],
  'io-modal': [
    { cssVar: '--io-modal-width-sm', description: 'Width of the modal in the sm size variant.' },
    { cssVar: '--io-modal-width-md', description: 'Width of the modal in the md size variant.' },
    { cssVar: '--io-modal-width-lg', description: 'Width of the modal in the lg size variant.' },
    { cssVar: '--io-modal-max-height', description: 'Maximum height of the modal dialog. Override to control vertical overflow behavior.' },
  ],
  'io-radio': [
    { cssVar: '--io-radio-size', description: 'Width and height of the radio control area.' },
    { cssVar: '--io-radio-border-width', description: 'Default border width of the radio control circle.' },
    { cssVar: '--io-radio-border-error-width', description: 'Border width of the radio control in an error state (2px satisfies WCAG 1.4.1).' },
    { cssVar: '--io-radio-dot-size', description: 'Size of the inner filled dot when the radio is in the checked state.' },
  ],
  'io-select': [
    { cssVar: '--io-select-padding-right', description: 'Right padding of the select field, leaving space for the chevron icon.' },
    { cssVar: '--io-select-chevron-offset-y', description: 'Vertical offset used to fine-position the chevron icon in the select field.' },
    { cssVar: '--io-combobox-max-height', description: 'Maximum height of the dropdown listbox before it becomes scrollable.' },
    { cssVar: '--io-combobox-option-height', description: 'Minimum height of each option item in the dropdown.' },
    { cssVar: '--io-combobox-z', description: 'Z-index of the combobox dropdown panel.' },
    { cssVar: '--io-option-hover-bg', description: 'Background color of a hovered or keyboard-focused option. Overridden in dark mode.' },
    { cssVar: '--io-field-focus-offset-y', description: 'Negative top margin applied when a field is focused to compensate for border-width growth.' },
  ],
  'io-skeleton': [
    { cssVar: '--io-skeleton-bg', description: 'Background shimmer gradient of the skeleton. Overridden in dark mode. Override to match your brand shimmer color.' },
    { cssVar: '--io-skeleton-bg-size', description: 'Background size for the shimmer animation gradient sweep.' },
    { cssVar: '--io-skeleton-duration', description: 'Duration of one full shimmer animation cycle. Override to speed up or slow down the pulse.' },
    { cssVar: '--io-skeleton-border-radius-text', description: 'Border radius of the text line skeleton variant.' },
    { cssVar: '--io-skeleton-border-radius-rounded', description: 'Border radius of the rounded rectangle skeleton variant.' },
  ],
  'io-tabs': [
    { cssVar: '--io-tabs-track-color', description: 'Color of the inactive track border below the tab list. Override to match your surface.' },
    { cssVar: '--io-tabs-indicator-color', description: 'Color of the active tab bottom-border indicator. Override to apply a custom brand accent.' },
    { cssVar: '--io-tabs-icon-gap', description: 'Gap between the icon and label text inside a tab button.' },
  ],
  'io-toast': [
    { cssVar: '--io-toast-max-width', description: 'Maximum width of the toast container. Override to widen or narrow the notification region.' },
  ],
  'io-toast-item': [
    { cssVar: '--io-toast-item-enter-duration', description: 'Duration of the slide-in entrance animation for a toast item.' },
    { cssVar: '--io-toast-item-accent-border-width', description: 'Width of the left accent border on a toast notification.' },
    { cssVar: '--io-toast-item-icon-offset-top', description: 'Top margin offset that fine-aligns the status icon in a toast item.' },
    { cssVar: '--io-toast-item-close-size', description: 'Width and height of the close button in a toast item.' },
    { cssVar: '--io-toast-item-close-offset-top', description: 'Top margin offset that aligns the close button within the toast item.' },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CustomisationPage() {
  const overrideExample = `/* Override a public CSS API token at host level */
io-skeleton {
  --io-skeleton-duration: 0.8s;      /* faster shimmer */
  --io-skeleton-bg: linear-gradient(
    90deg,
    #f0e6ff 25%,
    #d8baff 50%,
    #f0e6ff 75%
  );
}

/* Override scoped to a specific page section */
.my-modal-container io-modal {
  --io-modal-width-md: 720px;
}

/* Override accordion panel height on a compact sidebar */
.sidebar io-accordion {
  --io-accordion-max-height: 300px;
}`;

  return (
    <div className="space-y-16">
      <PageHeader
        title="CSS Custom Property Override API"
        description="A curated set of component-level CSS custom properties explicitly supported for consumer override. Treat changes to these tokens as breaking changes under semver."
        tabs={[]}
      />

      {/* Introduction */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Public vs Internal tokens"
          description="Not all --io-* tokens are equal. Understanding the distinction prevents unintentional coupling to implementation details."
        />
        <div className="space-y-4">
          <div
            className="p-4 rounded-lg"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Public API tokens
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              Component-specific tokens such as{' '}
              <InlineCode>--io-skeleton-duration</InlineCode>,{' '}
              <InlineCode>--io-modal-width-md</InlineCode>, or{' '}
              <InlineCode>--io-tabs-indicator-color</InlineCode>.
              These are the component{"'"}s override surface — they exist to be overridden. Any removal
              or rename is a <strong style={{ color: 'var(--io-text-primary)' }}>breaking change</strong>{' '}
              that requires a semver major bump.
            </p>
          </div>
          <div
            className="p-4 rounded-lg"
            style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Internal tokens
            </p>
            <p className="text-sm leading-6" style={{ color: 'var(--io-text-secondary)' }}>
              Global primitive and semantic tokens such as{' '}
              <InlineCode>--io-color-primary</InlineCode>,{' '}
              <InlineCode>--io-space-4</InlineCode>, or{' '}
              <InlineCode>--io-motion-base</InlineCode>.
              Components consume these from the design system token set. You may override them globally,
              but that is a design-system-wide change — not a component API contract.
            </p>
          </div>
        </div>
      </section>

      {/* Override example */}
      <section id="usage" className="space-y-6">
        <SectionHeader
          title="How to override"
          description="Set the CSS custom property on the component host element or any ancestor selector."
        />
        <pre
          className="text-xs font-mono leading-6 p-5 rounded-lg overflow-x-auto"
          style={{
            background: 'var(--io-bg-raised)',
            border: '1px solid var(--io-border)',
            color: 'var(--io-text-secondary)',
          }}
        >
          {overrideExample}
        </pre>
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Overrides follow standard CSS cascade rules — more specific selectors win. All overrides
          are scoped to the Shadow DOM of that component instance via CSS custom property inheritance.
        </p>
      </section>

      {/* Semver policy */}
      <section id="semver" className="space-y-4">
        <SectionHeader
          title="Semver policy"
          description="Public CSS API tokens follow the same semver contract as props, events, and methods."
        />
        <ApiTable
          columns={[
            { label: 'Change type', width: '240px' },
            { label: 'Bump level' },
          ]}
          rows={[
            [<InlineCode key="add">Adding a new public-api token</InlineCode>, 'minor'],
            [<InlineCode key="rename">Renaming or removing a public-api token</InlineCode>, 'major'],
            [<InlineCode key="default">Changing a token default value</InlineCode>, 'minor or patch (see changelog)'],
            [<InlineCode key="internal">Adding or removing an internal token</InlineCode>, 'patch'],
          ]}
        />
      </section>

      {/* Component API tables */}
      <section id="api-reference" className="space-y-12">
        <SectionHeader
          title="Component API reference"
          description="Complete listing of all public CSS custom property override points, grouped by component."
        />
        {Object.entries(PUBLIC_API_GROUPS).map(([component, vars]) => (
          <section key={component} id={component} className="space-y-4">
            <h3
              className="text-base font-semibold"
              style={{ color: 'var(--io-text-primary)' }}
            >
              {component}
            </h3>
            <ApiTable
              columns={[
                { label: 'Property', width: '320px' },
                { label: 'Description' },
              ]}
              rows={vars.map((v) => [
                <InlineCode key={v.cssVar}>{v.cssVar}</InlineCode>,
                v.description,
              ])}
            />
          </section>
        ))}
      </section>
    </div>
  );
}
