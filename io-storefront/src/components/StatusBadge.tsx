import type { ComponentStatus } from '@/sitemap';

export function StatusBadge({ status }: { status?: ComponentStatus }) {
  if (!status || status === 'stable') return null;

  if (status === 'beta') {
    return (
      <span
        aria-label="Status: Beta"
        role="img"
        className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
      />
    );
  }

  return (
    <span
      aria-label="Status: Deprecated"
      role="img"
      className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
    />
  );
}
