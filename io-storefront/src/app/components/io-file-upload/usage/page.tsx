'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoFileUploadUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-file-upload is a drag-and-drop file input with built-in validation. Use it whenever users need to attach or upload one or more files."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for single or multiple file uploads — set <C>multiple</C> when users need to select several files at once.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always set <C>accept</C> to restrict the formats your backend supports. This prevents frustration from unsupported file rejections after upload.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Set <C>maxFileSize</C> to match your server limit. Validate client-side first to give immediate feedback before the network round-trip.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Always provide a descriptive <C>label</C> — it is the only accessible name for the drop zone. Use <C>helperText</C> for format or size hints.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Don&apos;t use for avatar or profile photo uploads without clearly communicating the expected dimensions in <C>helperText</C>.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t show <C>error</C> state before the user has interacted. Validate on drop, on picker confirmation, or on form submission.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t rely solely on colour to communicate validation feedback — the error border is always accompanied by a text <C>errorMessage</C>.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Don&apos;t disable the component silently. If upload is unavailable for contextual reasons, explain why with surrounding content.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── States ───────────────────────────────────────────────── */}
      <section id="states" className="space-y-6">
        <SectionHeader
          title="States"
          description="io-file-upload has five visual states. State transitions are driven by prop changes or user interaction."
        />
        <div className="space-y-3">
          <RuleCard label="Default — idle">
            The drop zone shows the upload icon, label, and &ldquo;Click to browse or drag &amp; drop&rdquo; sublabel. The border uses the decorative token.
          </RuleCard>
          <RuleCard label="Drag-over — active drop target">
            When files are dragged over the zone, the border and icon turn primary blue and the background is raised. The sublabel updates to &ldquo;Drop files here&rdquo;.
          </RuleCard>
          <RuleCard label="Error — validation feedback">
            Set <C>error=true</C> and provide an <C>errorMessage</C>. The border turns red. The message appears below with <C>role=&quot;alert&quot;</C> for immediate screen reader announcement.
          </RuleCard>
          <RuleCard label="Populated — files selected">
            After valid files are added, a file list appears below the drop zone with name, size, and a remove button for each file. Adding more files appends to the list when <C>multiple</C> is true.
          </RuleCard>
          <RuleCard label="Disabled — unavailable">
            Set <C>disabled=true</C>. The entire component renders at reduced opacity. Drag events and click interactions are blocked. Remove buttons are hidden.
          </RuleCard>
        </div>
      </section>

      {/* ── Content guidelines ───────────────────────────────────── */}
      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Clear labels and messages help users understand what files are expected and what went wrong."
        />
        <div className="space-y-3">
          <RuleCard label="Label — describe the expected content, not the action">
            &ldquo;Upload your CV&rdquo; or &ldquo;Attach supporting documents&rdquo; is better than &ldquo;Drop files here&rdquo;. The zone already communicates the drag-and-drop affordance visually.
          </RuleCard>
          <RuleCard label="helperText — list accepted formats and size limit">
            Use the pattern: &ldquo;Accepted formats: PDF, DOCX. Max size: 10 MB.&rdquo; This prevents the most common rejection errors before they happen.
          </RuleCard>
          <RuleCard label="errorMessage — be specific about the failure">
            &ldquo;Only PDF files are accepted&rdquo; is correct. &ldquo;Invalid file&rdquo; is insufficient — users cannot act on vague messages. For size rejections: &ldquo;File exceeds the 10 MB limit&rdquo;.
          </RuleCard>
          <RuleCard label="Remove button — accessible label pattern">
            Each file&apos;s remove button has an accessible label of <C>Remove [filename]</C>. This is generated automatically — do not override it.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
