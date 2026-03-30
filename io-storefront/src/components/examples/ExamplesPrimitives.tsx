import type { ReactNode } from 'react';

export function ExamplesSectionHeader({
  title,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="mb-4">
      <h2
        className="text-lg font-bold"
        style={{ color: 'var(--io-text-primary)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm mt-1" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {description}
        </p>
      )}
    </div>
  );
}
