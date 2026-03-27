'use client';

import { PageHeader } from '@/components/layout/PageHeader';

export default function DesigningPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Designing with io"
        description="Figma foundations, brand principles, and visual language for io Digital products."
        tabs={[]}
      />

      <div
        className="rounded-lg p-8 text-center"
        style={{
          background: 'var(--io-bg-raised)',
          border: '1px solid var(--io-border)',
        }}
      >
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--io-text-primary)' }}>
          Figma library coming in Q3
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)' }}>
          The Figma component library and token documentation are coming in Q3. In the meantime, browse the component API docs and the token reference in Design Tokens.
        </p>
      </div>
    </div>
  );
}
