'use client';

import type { ReactNode } from 'react';

export type DoOrDont = 'do' | 'dont';

export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="block w-1 h-5 rounded-full shrink-0"
          style={{ background: 'var(--io-accent)' }}
          aria-hidden="true"
        />
        <h2
          className="text-lg font-bold text-io-text-primary"
          style={{ letterSpacing: 'var(--io-heading-tracking-3, -0.015em)' }}
        >
          {title}
        </h2>
      </div>
      <p className="ml-3 text-sm text-io-text-secondary leading-[1.6]">
        {description}
      </p>
    </div>
  );
}

export function SubsectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase mb-3 text-io-text-muted tracking-[0.08em]">
      {children}
    </h3>
  );
}

export function RuleCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      className="flex gap-4 p-5 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <span
        className="block w-1 shrink-0 rounded-full mt-0.5"
        style={{ background: 'var(--io-accent)', height: '1rem' }}
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-semibold mb-1 text-io-text-primary">
          {label}
        </p>
        <p className="text-sm text-io-text-secondary leading-[1.6]">
          {children}
        </p>
      </div>
    </div>
  );
}

export function DoOrDontCard({ type, children }: { type: DoOrDont; children: ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <span
        className="block w-1 shrink-0 rounded-full mt-0.5"
        style={{
          background: type === 'do' ? 'var(--io-color-success)' : 'var(--io-color-error)',
          height: '1rem',
        }}
        aria-hidden="true"
      />
      <p className="text-sm text-io-text-secondary leading-[1.6]">
        {children}
      </p>
    </div>
  );
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code
      className="text-xs font-mono px-1.5 py-0.5 rounded text-io-text-primary"
      style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}
    >
      {children}
    </code>
  );
}