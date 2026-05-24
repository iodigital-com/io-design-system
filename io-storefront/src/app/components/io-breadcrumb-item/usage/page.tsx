'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbItemUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-breadcrumb-item is always used as a direct child of io-breadcrumb. It is not a standalone component."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use <C>io-breadcrumb-item</C> exclusively inside an <C>io-breadcrumb</C> container — never as a standalone element.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>href</C> on every item except the current page. The current page should never be a link.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Either set <C>current</C> explicitly on the last item, or omit it entirely — <C>io-breadcrumb</C> infers it automatically.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the slot for the visible label text. Keep labels concise and matching the destination page title.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Set both <C>href</C> and <C>current</C> on the same item — when <C>current</C> is true the component always renders a span, never a link.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Set <C>current</C> on multiple items — only the last item should be the current page.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Place non-<C>io-breadcrumb-item</C> children directly inside <C>io-breadcrumb</C> — separators are only inserted between <C>io-breadcrumb-item</C> elements.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Slot-based API ───────────────────────────────────────── */}
      <section id="slot-api" className="space-y-6">
        <SectionHeader
          title="Declarative slot-based API"
          description="io-breadcrumb-item uses a default slot for the visible label, making the markup readable and framework-friendly."
        />
        <div className="space-y-3">
          <RuleCard label="Slot content is the visible label">
            Place the breadcrumb label as text content inside <C>io-breadcrumb-item</C>. Rich content (icons, emphasis) is also supported via the slot.
          </RuleCard>
          <RuleCard label="href renders a link">
            When <C>href</C> is set and <C>current</C> is false, the item renders as <C>{'<a href="...">'}</C> for native navigation behaviour.
          </RuleCard>
          <RuleCard label="current renders a span with aria-current">
            When <C>current</C> is true (or inferred), the item renders as <C>{'<span aria-current="page">'}</C>. The current page is never a link.
          </RuleCard>
          <RuleCard label="Separators are automatic">
            You do not need to add separators manually. The parent <C>io-breadcrumb</C> inserts <C>aria-hidden</C> separator spans between items on every <C>slotchange</C>.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
