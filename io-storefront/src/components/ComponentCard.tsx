'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { StatusBadge } from '@/components/StatusBadge';
import type { ComponentStatus } from '@/sitemap';

type ComponentCardProps = {
  name: string;
  href: string;
  status?: ComponentStatus;
  description?: string;
  children?: ReactNode;
};

export function ComponentCard({ name, href, status, description, children }: ComponentCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${name} – view configurator`}
      className="flex flex-col rounded-xl border border-[var(--io-border)] bg-[var(--io-bg-raised)] overflow-hidden transition-colors hover:bg-[var(--io-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--io-border-focus)]"
    >
      <div className="flex-1 p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-[var(--io-text-primary)]">{name}</span>
          <StatusBadge status={status} />
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
