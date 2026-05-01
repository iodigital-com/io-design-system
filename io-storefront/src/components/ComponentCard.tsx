import Link from 'next/link';

import type { ComponentStatus } from '@/sitemap';
import type { ReactNode } from 'react';

import { StatusBadge } from '@/components/StatusBadge';

type ComponentCardProps = {
  name: string;
  href: string;
  status?: ComponentStatus;
  description?: string;
  tag?: string;
  children?: ReactNode;
};

export function ComponentCard({ name, href, status, description, tag, children }: ComponentCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${name} – view configurator`}
      className="flex flex-col rounded-xl border border-[var(--io-border)] bg-[var(--io-bg-raised)] overflow-hidden transition-colors hover:bg-[var(--io-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--io-border-focus)]"
    >
      <div className="flex-1 p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-[var(--io-text-primary)]">{name}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {tag ? (
              <code
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  background: 'var(--io-accent-bg)',
                  color: 'var(--io-accent-text)',
                  fontFamily: 'ui-monospace, "Cascadia Mono", "Fira Code", monospace',
                }}
              >
                {tag}
              </code>
            ) : null}
            <StatusBadge status={status} />
          </div>
        </div>
        {description ? (
          <p className="text-xs leading-relaxed text-[var(--io-text-secondary)]">{description}</p>
        ) : null}
        {children ? (
          <div className="min-h-[64px] w-full flex items-center justify-center">
            {children}
          </div>
        ) : null}
      </div>
      <div className="px-4 py-3 border-t border-[var(--io-border)]">
        <span className="text-xs font-medium text-[var(--io-accent-text)]">Open configurator</span>
      </div>
    </Link>
  );
}
