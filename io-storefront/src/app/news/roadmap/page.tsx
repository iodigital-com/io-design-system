'use client';

import { PageHeader } from '@/components/layout/PageHeader';

const PLANNED = [
{ name: 'io-modal', description: 'Accessible dialog component with focus trap and scroll lock.' },
  { name: 'io-toast', description: 'Non-blocking notification toasts with severity levels.' },
  { name: 'io-tabs', description: 'Tabbed navigation with keyboard support and ARIA roles.' },
  { name: 'io-select', description: 'Custom styled select dropdown replacing native <select>.' },
  { name: 'io-checkbox', description: 'Checkbox and checkbox group with indeterminate state.' },
  { name: 'io-radio', description: 'Radio button group with label and error state support.' },
  { name: 'io-spinner', description: 'Loading spinner in multiple sizes and colors.' },
  { name: 'io-avatar', description: 'User avatar with image, initials, and icon fallbacks.' },
  { name: 'io-tooltip', description: 'Accessible tooltip anchored to trigger elements.' },
];

export default function RoadmapPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Roadmap"
        description="Planned components and features for future releases of io Design System."
        tabs={[]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLANNED.map(({ name, description }) => (
          <div
            key={name}
            className="p-4 rounded-lg flex items-start gap-3"
            style={{
              background: 'var(--io-bg-raised, #f5f5f5)',
              border: '1px solid var(--io-border, #e8e8e8)',
            }}
          >
            <span
              className="mt-0.5 w-2 h-2 rounded-full shrink-0"
              style={{ background: 'var(--io-color-primary, #0000D2)', marginTop: '6px' }}
            />
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--io-text-primary, #242424)' }}>
                {name}
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--io-text-secondary, #6b6b6b)' }}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
