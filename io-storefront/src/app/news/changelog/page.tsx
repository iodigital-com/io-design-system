'use client';

import { PageHeader } from '@/components/layout/PageHeader';

export default function ChangelogPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Changelog"
        description="A history of all notable changes to io Design System packages."
        tabs={[]}
      />

      <div
        className="rounded-lg p-8"
        style={{
          background: 'var(--io-bg-raised, #f5f5f5)',
          border: '1px solid var(--io-border, #e8e8e8)',
        }}
      >
        <p
          className="font-semibold mb-1"
          style={{ color: 'var(--io-text-primary, #242424)' }}
        >
          v0.1.0 — Initial release
        </p>
        <p className="text-sm mb-4" style={{ color: 'var(--io-text-muted, #9e9e9e)' }}>
          2025
        </p>
        <ul
          className="text-sm space-y-2 list-disc list-inside"
          style={{ color: 'var(--io-text-secondary, #6b6b6b)' }}
        >
          <li>Initial scaffold: Stencil 4 monorepo with React, Vue, and Angular wrappers</li>
          <li>io-button: 9 solid color variants, ghost, link, loading, and disabled states</li>
          <li>io-badge: 9 semantic and brand color variants</li>
          <li>io-input: Text input with label, error, helper text, and disabled states</li>
          <li>Full design token system with dark mode support</li>
          <li>Next.js storefront with 3-panel layout, configurators, and code generators</li>
        </ul>
      </div>
    </div>
  );
}
