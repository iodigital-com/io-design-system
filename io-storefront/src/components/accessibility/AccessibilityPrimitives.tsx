import type { ReactNode } from 'react';

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
          className="text-xl font-bold"
          style={{ color: 'var(--io-text-primary)', letterSpacing: 'var(--io-heading-tracking-3, -0.015em)' }}
        >
          {title}
        </h2>
      </div>
      <p className="ml-3 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
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
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {children}
        </p>
      </div>
    </div>
  );
}

export type KeyboardRow = { key: ReactNode; action: string };

export function KeyboardTable({ rows }: { rows: KeyboardRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--io-border)' }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: 'var(--io-bg-surface)', borderBottom: '1px solid var(--io-border)' }}>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-widest w-48"
              style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}>
              Key
            </th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-widest"
              style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 1 ? 'var(--io-bg-raised)' : 'transparent',
                borderBottom: i < rows.length - 1 ? '1px solid var(--io-border)' : 'none',
              }}
            >
              <td className="px-4 py-3 font-mono align-top">{row.key}</td>
              <td className="px-4 py-3 align-top" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
                {row.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono"
      style={{
        background: 'var(--io-bg-surface)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-primary)',
        boxShadow: '0 1px 0 var(--io-border)',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </kbd>
  );
}

export type AriaRow = { attribute: string; value: ReactNode; description: string };

export function AriaTable({ rows }: { rows: AriaRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--io-border)' }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: 'var(--io-bg-surface)', borderBottom: '1px solid var(--io-border)' }}>
            {['Attribute', 'Value', 'Description'].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-widest"
                style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 1 ? 'var(--io-bg-raised)' : 'transparent',
                borderBottom: i < rows.length - 1 ? '1px solid var(--io-border)' : 'none',
              }}
            >
              <td className="px-4 py-3 align-top">
                <code
                  className="text-xs px-1.5 py-0.5 rounded font-mono"
                  style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}
                >
                  {row.attribute}
                </code>
              </td>
              <td className="px-4 py-3 align-top" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>
                {row.value}
              </td>
              <td className="px-4 py-3 align-top" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type Level = 'A' | 'AA' | 'AAA';

export function ComplianceCard({
  criterion,
  level,
  title,
  note,
}: {
  criterion: string;
  level: Level;
  title: string;
  note: string;
}) {
  return (
    <div
      className="p-5 rounded-lg flex flex-col gap-3"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-mono font-semibold px-2 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
          >
            {criterion}
          </span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-muted)' }}
          >
            {level}
          </span>
        </div>
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'color-mix(in srgb, var(--io-color-success) 12%, transparent)', color: 'var(--io-color-success)' }}
        >
          Pass
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--io-text-primary)' }}>
          {title}
        </p>
        <p className="text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {note}
        </p>
      </div>
    </div>
  );
}
