'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTagDismissibleUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-tag-dismissible is a static display chip with a built-in dismiss action. Use it when a value has already been selected or applied and the user should be able to remove it."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use in applied-filter bars where each active filter can be cleared individually — e.g. &ldquo;React&rdquo;, &ldquo;Remote&rdquo;, &ldquo;Full time&rdquo; filters that have been activated.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use in multi-select value chips once the user has confirmed a selection. The chip represents the confirmed value; the dismiss button removes it from the selection.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>label</C> to the visible text of the chip. The dismiss button&apos;s accessible name is built from it: &ldquo;Remove {'{label}'}&rdquo;.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Do not use io-tag-dismissible for toggle/filter chips where the user clicks the whole chip to activate or deactivate it. Use <C>{'<io-tag>'}</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not use io-tag-dismissible as a read-only status label — for that, use <C>{'<io-badge>'}</C>.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not omit the <C>label</C> prop. It is required — the dismiss button&apos;s accessible name depends on it (WCAG 4.1.2).
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Dismiss interaction ───────────────────────────────────── */}
      <section id="dismiss-interaction" className="space-y-6">
        <SectionHeader
          title="Dismiss interaction"
          description="io-tag-dismissible fires the dismiss event when the user clicks the dismiss button, or presses Delete or Backspace while the host element is focused."
        />
        <div className="space-y-3">
          <RuleCard label="Listen to the dismiss event">
            Handle <C>dismiss</C> to remove the chip from your data model. The component emits the event but does not remove itself from the DOM — the consumer is responsible for controlling visibility.
          </RuleCard>
          <RuleCard label="Keyboard shortcuts Delete and Backspace">
            When the host element has focus, pressing Delete or Backspace fires <C>dismiss</C>. This matches the keyboard pattern of common tag-input libraries and browser-native tag behaviours.
          </RuleCard>
        </div>
      </section>

      {/* ── Colour variants ──────────────────────────────────────── */}
      <section id="colour-variants" className="space-y-6">
        <SectionHeader
          title="Colour variants"
          description="Variants communicate semantic meaning or category. Use consistently within a set of chips."
        />
        <div className="space-y-3">
          <RuleCard label="default">
            Use for general-purpose dismissible chips with no semantic colour coding. Works on all standard background surfaces.
          </RuleCard>
          <RuleCard label="blue, beige, dark, orange, rouge — brand colours">
            Use to align with category colour coding in a filter system. Pair with <C>{'<io-tag>'}</C> unselected/selected states for a consistent filter experience.
          </RuleCard>
          <RuleCard label="success, warning, error — semantic colours">
            Use when the chip communicates a semantic state — e.g. an error filter that is currently active. Prefer <C>{'<io-badge>'}</C> for purely read-only status labels.
          </RuleCard>
        </div>
      </section>

      {/* ── Relationship to io-tag ────────────────────────────────── */}
      <section id="relationship-to-io-tag" className="space-y-6">
        <SectionHeader
          title="Relationship to io-tag"
          description="io-tag-dismissible and io-tag are separate components with complementary roles."
        />
        <div className="space-y-3">
          <RuleCard label="io-tag — toggle chip">
            <C>{'<io-tag>'}</C> is a toggle chip. The user clicks the whole chip to activate or deactivate it. Use in filter bars where the user is selecting from options.
          </RuleCard>
          <RuleCard label="io-tag-dismissible — applied value chip">
            <C>{'<io-tag-dismissible>'}</C> is a confirmed-selection chip. The value is already active; the dismiss button removes it. Use after a selection has been confirmed.
          </RuleCard>
          <RuleCard label="Common pattern — filter selection flow">
            Show <C>{'<io-tag>'}</C> for available filters; when the user activates a filter, show the active value as an <C>{'<io-tag-dismissible>'}</C> chip so it can be individually cleared.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
