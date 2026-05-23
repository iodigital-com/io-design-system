'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoAvatarUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Avatars represent a person or entity in the UI. Choose the appropriate fallback so there is always a meaningful visual regardless of whether an image is available."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use avatars in headers, comment threads, and member lists where a visual identity aids scanning.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>name</C> prop so initials are shown when the image fails to load or is not available.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use descriptive <C>alt</C> text for images that represent specific people. Pass <C>alt=""</C> only when the avatar is purely decorative and adjacent text already identifies the person.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Choose the <C>size</C> that matches the surrounding information density — <C>xs</C> and <C>sm</C> for compact lists, <C>lg</C> and <C>xl</C> for profile headers.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Rely on the image alone without a <C>name</C> fallback — network errors and missing uploads are common.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <C>alt=""</C> on an avatar that is the only identifier for a person in that context. Screen reader users must receive an equivalent accessible name.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Mix sizes arbitrarily within a list. Keep sizes consistent per context so the visual rhythm is not disrupted.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use an avatar as an interactive element on its own. Wrap it in a <C>{'<button>'}</C> or <C>{'<a>'}</C> with a clear accessible label if it must respond to clicks.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Alt text guidance ────────────────────────────────────── */}
      <section id="alt-text" className="space-y-6">
        <SectionHeader
          title="Alt text guidance"
          description="The alt attribute determines how assistive technologies describe the avatar to users."
        />
        <div className="space-y-3">
          <RuleCard label="Named person — use their name as alt text">
            When the avatar uniquely identifies a person, set <C>alt</C> to their full name (<C>alt="Jane Doe"</C>).
            This matches the visible image content and gives screen reader users the same information.
          </RuleCard>
          <RuleCard label="Decorative avatar — use alt=&quot;&quot;">
            If adjacent text already identifies the person (e.g. a name label next to the avatar), the image is
            decorative. Pass <C>alt=""</C> — the component will add <C>aria-hidden="true"</C> to the img automatically,
            preventing double-announcement.
          </RuleCard>
          <RuleCard label="Group of avatars — each needs its own alt">
            In an avatar group or list, every avatar must have its own descriptive alt so users can distinguish
            between individuals without visual context.
          </RuleCard>
        </div>
      </section>

      {/* ── Size selection ───────────────────────────────────────── */}
      <section id="size-selection" className="space-y-6">
        <SectionHeader
          title="Size selection"
          description="Pick the size that fits the information hierarchy and layout density."
        />
        <div className="space-y-3">
          <RuleCard label="xs (24 px) — Micro context">
            Use in very dense tables, inline mentions, or notification dots where a larger avatar would dominate.
          </RuleCard>
          <RuleCard label="sm (32 px) — Compact lists">
            Good for comment threads, chat message authors, and list rows where vertical space is limited.
          </RuleCard>
          <RuleCard label="md (40 px) — Default">
            The standard size for cards, form prefixes, and general-purpose usage.
          </RuleCard>
          <RuleCard label="lg (48 px) — Emphasised">
            Use when the person&apos;s identity is a primary focus, e.g. a comment author header or a team member card.
          </RuleCard>
          <RuleCard label="xl (64 px) — Profile header">
            Reserve for profile pages, user settings, and other contexts where the avatar is a hero element.
          </RuleCard>
        </div>
      </section>

      {/* ── Colour semantics ─────────────────────────────────────── */}
      <section id="colour-semantics" className="space-y-6">
        <SectionHeader
          title="Colour semantics"
          description="The colour prop controls the background of the initials and icon fallback only — not the image. Use colour consistently to aid recognition."
        />
        <div className="space-y-3">
          <RuleCard label="grey — Default neutral">
            Use when no specific colour coding is needed. Works on both light and dark surfaces.
          </RuleCard>
          <RuleCard label="blue — Brand primary">
            Use for active users, primary contacts, or members with elevated roles where the brand colour adds context.
          </RuleCard>
          <RuleCard label="orange / green / purple — Category coding">
            Use these colours consistently within a product to distinguish user groups, departments, or roles.
            Never use colour as the sole indicator — always pair with a visible label or tooltip.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
