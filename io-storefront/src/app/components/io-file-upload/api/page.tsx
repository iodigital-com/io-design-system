'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoFileUploadApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-file-upload Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>label</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Visible label for the drop zone. Also serves as the accessible name (aria-label). It must always be set.',
            ],
            [
              <InlineCode key="n">accept</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;*&apos;</InlineCode>,
              'Comma-separated list of accepted MIME types or file extensions (e.g. ".pdf,image/*"). Wildcards are supported (image/*, video/*). Pass "*" to accept all types.',
            ],
            [
              <InlineCode key="n">multiple</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, users can select multiple files at once. When false, each new selection replaces the current file list.',
            ],
            [
              <InlineCode key="n">maxFileSize</InlineCode>,
              <InlineCode key="t">number | undefined</InlineCode>,
              '—',
              'Maximum allowed file size in bytes. Files exceeding this limit emit a fileReject event with reason="size". Undefined means no size limit.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables all drag, click, and keyboard interactions. Renders at reduced opacity. Remove buttons are hidden.',
            ],
            [
              <span key="n"><InlineCode>error</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the component in error state. The drop zone border turns red. Sets aria-invalid="true" on the zone.',
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Error message shown below the drop zone when error is true. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the drop zone when error is false. Hidden when the error state is active.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML name attribute forwarded to the hidden native file input. Used when the component is inside a native form.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-file-upload."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '260px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">fileSelect</InlineCode>,
              <InlineCode key="t">{'{ files: File[] }'}</InlineCode>,
              'No',
              'Emitted when one or more valid files are selected (via picker or drop). The detail contains only the files that passed type and size validation.',
            ],
            [
              <InlineCode key="n">fileReject</InlineCode>,
              <InlineCode key="t">{"{ file: File; reason: 'size' | 'type' }"}</InlineCode>,
              'No',
              'Emitted once per rejected file. The reason field indicates whether the file was too large ("size") or an unsupported type ("type"). Listen to this event to show contextual error messages.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const uploader = document.querySelector('io-file-upload');
uploader.addEventListener('fileSelect', (e) => {
  console.log('valid files:', e.detail.files);
});
uploader.addEventListener('fileReject', (e) => {
  console.log('rejected:', e.detail.file.name, 'reason:', e.detail.reason);
  uploader.error = true;
  uploader.errorMessage = e.detail.reason === 'size'
    ? 'File exceeds the size limit'
    : 'File type not supported';
});

// React
<IoFileUpload
  label="Upload CV"
  accept=".pdf"
  onFileSelect={(e) => handleFiles(e.detail.files)}
  onFileReject={(e) => setError(e.detail.reason)}
/>

// Angular
<io-file-upload
  label="Upload CV"
  accept=".pdf"
  (fileSelect)="onSelect($event)"
  (fileReject)="onReject($event)"
></io-file-upload>

// Vue
<io-file-upload
  label="Upload CV"
  accept=".pdf"
  @fileSelect="handleSelect"
  @fileReject="handleReject"
/>`}
        </CodeNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-file-upload."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-file-upload has no content slots.</strong>
          {' '}All content is passed through props:{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>helperText</code>,{' '}
          and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>.
        </EmptyNote>
      </section>

    </div>
  );
}
