export default function IndexPage() {
  return (
    <main>
      <h1>io Design System — React 19 / Next.js 15 Playground</h1>
      <p style={{ color: 'var(--io-text-secondary)', fontSize: '0.875rem' }}>
        Use the nav links to test each component. These pages exist to catch framework-specific
        regressions — e.g. shadow DOM pointer event interception in React 18/19, FACE form
        participation, custom event delegation.
      </p>
    </main>
  );
}
