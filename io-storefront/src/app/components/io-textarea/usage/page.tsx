'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTextareaUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-textarea is a multi-line text field. Use it whenever the expected input is longer than a single line — descriptions, messages, feedback, and freeform notes."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for freeform text entries that are likely to span multiple lines — feedback forms, support messages, product descriptions, and bio fields.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set a meaningful <C>rows</C> value that reflects the expected input length. A short bio field might use 3 rows; a long description field might use 8.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a <C>label</C> prop. The floating label is the accessible name — there is no fallback.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use <C>resize=&quot;auto&quot;</C> when the field content grows dynamically and you want the textarea to expand with the content automatically.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use for short, single-line entries — names, email addresses, phone numbers. Use <C>{'<io-input>'}</C> instead.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use a very small <C>rows</C> value (1 or 2) for content that will commonly exceed it. Users should be able to see at least half their content at a glance.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Show <C>error</C> state before the user has had a chance to interact. Validate on blur or on form submit, not on mount.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use <C>resize=&quot;none&quot;</C> unless the height is genuinely fixed and appropriate for all content lengths. Blocking resize removes user control.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Resize behaviour ─────────────────────────────────────── */}
      <section id="resize-behaviour" className="space-y-6">
        <SectionHeader
          title="Resize behaviour"
          description="The resize prop controls how the textarea can be resized by users and programmatically."
        />
        <div className="space-y-3">
          <RuleCard label="vertical (default) — user-resizable vertically">
            The user can drag the resize handle to increase or decrease the height of the textarea. Width remains fixed. This is the default and is recommended for most multi-line text fields.
          </RuleCard>
          <RuleCard label="none — fixed dimensions">
            The resize handle is hidden. The textarea dimensions are fixed to the initial <C>rows</C> height. Use only when the field is part of a tightly constrained layout where overflow is handled by scrolling.
          </RuleCard>
          <RuleCard label="auto — grows with content">
            The textarea height increases automatically as the user types. No resize handle is shown. Use for comment fields, inline editors, or chat inputs where a growing surface feels natural. Set a minimum height via <C>rows</C>.
          </RuleCard>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────────────── */}
      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-textarea shares the same state model as io-input, with the full 4-side border design instead of underline-only."
        />
        <div className="space-y-3">
          <RuleCard label="Default — label at rest">
            The label sits inside the field at body size. The border is 1px on all four sides in the neutral colour.
          </RuleCard>
          <RuleCard label="Focused / filled — label floats">
            On focus, the border changes to the accent colour and the label animates to the floating position. Once text is typed, the label stays floating after blur.
          </RuleCard>
          <RuleCard label="Error — validation feedback">
            Set <C>error=true</C> and provide <C>errorMessage</C>. The border and label turn red. The error message appears below with <C>role=&quot;alert&quot;</C>.
          </RuleCard>
          <RuleCard label="Disabled — unavailable">
            Set <C>disabled=true</C>. The field renders at 40% opacity and pointer events are blocked.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Good label and helper text copy sets clear expectations and reduces abandonment in open-ended text fields."
        />
        <div className="space-y-3">
          <RuleCard label="Labels — describe what the user should write">
            Use a clear noun phrase: &ldquo;Message&rdquo;, &ldquo;Description&rdquo;, &ldquo;Feedback&rdquo;, &ldquo;Additional notes&rdquo;. Avoid vague labels like &ldquo;Text&rdquo; or &ldquo;Input&rdquo;.
          </RuleCard>
          <RuleCard label="Placeholder — example content, not instructions">
            Use placeholder text to show an example of what to write: &ldquo;E.g. I need help with my account login…&rdquo;. Never use it for instructions the user needs before typing — those belong in <C>helperText</C>.
          </RuleCard>
          <RuleCard label="Helper text — character limits and format guidance">
            Use helper text to communicate constraints: &ldquo;Maximum 500 characters&rdquo;. If using <C>maxLength</C>, always tell users the limit upfront — discovering it through truncation is frustrating.
          </RuleCard>
          <RuleCard label="Error messages — specific and actionable">
            Error messages must tell the user exactly what went wrong: &ldquo;Message must be at least 20 characters&rdquo;. Avoid generic messages like &ldquo;Invalid input&rdquo;.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
