import Link from 'next/link';
import type { ReactNode } from 'react';

/** Inline `<code>` element styled with design-system tokens. */
export function C({ children }: { children: ReactNode }) {
  return (
    <code
      className="text-xs font-mono px-1.5 py-0.5 rounded"
      style={{
        background: 'var(--io-bg-surface)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-primary)',
      }}
    >
      {children}
    </code>
  );
}

/** Pre-formatted code block for shell commands or markup snippets. */
export function CodeSnippet({ children }: { children: string }) {
  return (
    <pre
      className="rounded-lg p-4 text-sm overflow-x-auto"
      style={{
        background: 'var(--io-bg-raised)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-secondary)',
      }}
    >
      {children}
    </pre>
  );
}

/**
 * A titled step section with an optional prose description and arbitrary body
 * content (e.g. a `<CodeSnippet>`).
 */
export function StepBlock({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
        {title}
      </h2>
      {description && (
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {description}
        </p>
      )}
      {children}
    </section>
  );
}

/** General-purpose informational note / callout card. */
export function NoteCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div
      className="rounded-lg p-5"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
    >
      {title && (
        <p className="font-semibold text-sm mb-2" style={{ color: 'var(--io-text-primary)' }}>
          {title}
        </p>
      )}
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {children}
      </p>
    </div>
  );
}

/** Roadmap placeholder note for integration guides that are not yet published. */
export function RoadmapNote({ children }: { children: ReactNode }) {
  return <NoteCard title="Roadmap">{children}</NoteCard>;
}

export type TroubleshootingItem = {
  problem: string;
  solution: ReactNode;
};

/** Vertically stacked list of troubleshooting problem/solution pairs. */
export function TroubleshootingList({ items }: { items: TroubleshootingItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map(({ problem, solution }, i) => (
        <li
          key={i}
          className="rounded-lg p-5"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--io-text-primary)' }}>
            {problem}
          </p>
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            {solution}
          </p>
        </li>
      ))}
    </ul>
  );
}

export type NextAction = {
  label: string;
  description: string;
  href: string;
};

/** A responsive grid of follow-up action link cards. */
export function NextActionsBlock({ actions }: { actions: NextAction[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {actions.map(({ label, description, href }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col gap-1 p-5 rounded-lg transition-colors"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <span className="font-semibold text-sm" style={{ color: 'var(--io-text-primary)' }}>
            {label}
          </span>
          <span className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            {description}
          </span>
        </Link>
      ))}
    </div>
  );
}
